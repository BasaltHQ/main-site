'use server'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import { Profile, Integration, Campaign, InvestorProfile, Transaction } from '@/lib/models'

export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getCurrentProfile() {
    const session = await getSession()
    if (!session?.user) return null
    await dbConnect()
    const p = await Profile.findById((session.user as any).id).lean()
    return JSON.parse(JSON.stringify(p))
}

export async function updateCurrentProfile(data: { full_name?: string, company_name?: string, wallet_address?: string }) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")
    await dbConnect()
    await Profile.findByIdAndUpdate((session.user as any).id, { ...data, updated_at: new Date() })
    return { success: true }
}

export async function getIntegrations() {
    await dbConnect()
    const integrations = await Integration.find({}).sort({ category: 1 }).lean()
    return JSON.parse(JSON.stringify(integrations))
}

export async function updateIntegrations(dataArray: { id: string, value: string }[]) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")
    await dbConnect()

    // Check if admin
    const p = await Profile.findById((session.user as any).id).lean()
    if (!['admin', 'superadmin'].includes(p?.role)) throw new Error("Forbidden")

    for (const item of dataArray) {
        await Integration.findByIdAndUpdate(item.id, { value: item.value, updated_at: new Date() })
    }
    return { success: true }
}

export async function getInvestorCampaigns() {
    await dbConnect()
    const activeCampaigns = await Campaign.find({ status: 'active' }).sort({ created_at: -1 }).limit(3).lean()
    return JSON.parse(JSON.stringify(activeCampaigns))
}

export async function getMedallions(userId: string) {
    if (!userId) return []
    await dbConnect()

    const { AdminRole, CapTable, Subsidiary } = await import('@/lib/models')

    const adminRoles = await AdminRole.find({ user_id: userId, revoked_at: null }).lean()
    const investments = await CapTable.find({ user_id: userId, shares: { $gt: 0 } }).lean()

    const map = new Map<string, any>()

    for (const role of adminRoles as any[]) {
        if (!role.subsidiary_id) continue
        const sub = await Subsidiary.findById(role.subsidiary_id).select('name').lean()
        map.set(role.subsidiary_id.toString(), {
            id: role.subsidiary_id.toString(),
            subsidiaryName: (sub as any)?.name || 'Unknown Entity',
            role: 'Admin'
        })
    }

    for (const inv of investments as any[]) {
        if (!inv.subsidiary_id) continue
        const subIdStr = inv.subsidiary_id.toString()
        if (!map.has(subIdStr)) {
            const sub = await Subsidiary.findById(inv.subsidiary_id).select('name').lean()
            map.set(subIdStr, {
                id: subIdStr,
                subsidiaryName: (sub as any)?.name || 'Unknown Entity',
                role: 'Investor',
                shares: inv.shares
            })
        }
    }

    return Array.from(map.values())
}

export async function updateInvestorProfile(data: any) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")
    await dbConnect()

    const { InvestorProfile } = await import('@/lib/models')

    const isUSPerson = data.country === 'United States' &&
        (data.citizenship === 'US Citizen' || data.citizenship === 'Permanent Resident')

    await InvestorProfile.findOneAndUpdate(
        { id: (session.user as any).id },
        {
            residence_state: data.state || 'NM',
            residence_country: data.country,
            is_us_person: isUSPerson,
            onboarding_step: 'accreditation',
            updated_at: new Date()
        },
        { upsert: true, new: true }
    )
    return { success: true }
}

export async function getSubsidiaries() {
    await dbConnect()
    const { Subsidiary } = await import('@/lib/models')
    const subs = await Subsidiary.find({}).sort({ name: 1 }).lean()

    // Sort so 'network' is first if exists
    const sorted = subs.sort((a: any, b: any) => {
        if (a.id === 'network') return -1
        if (b.id === 'network') return 1
        return 0 // The initial DB sort handles the name string comparison
    })

    return JSON.parse(JSON.stringify(sorted))
}

export async function getCampaigns(subsidiaryId: string) {
    await dbConnect()
    const { Campaign } = await import('@/lib/models')
    const camps = await Campaign.find({ subsidiary: subsidiaryId }).sort({ created_at: -1 }).lean()
    return JSON.parse(JSON.stringify(camps.map((c: any) => ({ ...c, id: c._id.toString() }))))
}

export async function deleteCampaign(campaignId: string) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")

    await dbConnect()
    const { Profile, Campaign } = await import('@/lib/models')

    // Check if admin
    const p = await Profile.findById((session.user as any).id).lean()
    if (!['admin', 'superadmin'].includes(p?.role)) throw new Error("Forbidden")

    await Campaign.findByIdAndDelete(campaignId)
    return { success: true }
}

export async function getRecentDocuments(limit: number = 5) {
    await dbConnect()
    const { Document } = await import('@/lib/models')
    const docs = await Document.find({}).sort({ created_at: -1 }).limit(limit).lean()
    return JSON.parse(JSON.stringify(docs))
}

export async function getDocuments(subsidiaryId: string) {
    await dbConnect()
    const { Document } = await import('@/lib/models')
    const docs = await Document.find({ subsidiary: subsidiaryId }).sort({ created_at: -1 }).lean()
    return JSON.parse(JSON.stringify(docs))
}

export async function updateProfile(data: any) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")

    await dbConnect()
    const { Profile } = await import('@/lib/models')

    await Profile.findByIdAndUpdate((session.user as any).id, data)
    return { success: true }
}

export async function getMessages() {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")

    await dbConnect()
    const { Message, Profile } = await import('@/lib/models')

    const userId = (session.user as any).id
    const messages = await Message.find({
        $or: [{ sender_id: userId }, { receiver_id: userId }]
    })
        .populate('sender_id', 'full_name email')
        .populate('receiver_id', 'full_name email')
        .sort({ created_at: -1 })
        .lean()

    // Map mapped sender_id to sender to match Supabase schema expectation
    const formatted = messages.map((m: any) => ({
        ...m,
        id: m._id.toString(),
        sender: m.sender_id,
        receiver: m.receiver_id,
        sender_id: m.sender_id?._id?.toString(),
        receiver_id: m.receiver_id?._id?.toString()
    }))

    return JSON.parse(JSON.stringify(formatted))
}

export async function sendMessage(content: string, subject: string, receiverId?: string) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")

    await dbConnect()
    const { Message, Profile } = await import('@/lib/models')

    let targetId = receiverId
    if (!targetId) {
        const admin = await Profile.findOne({ role: 'admin' }).lean()
        targetId = admin?._id?.toString()
    }

    await Message.create({
        sender_id: (session.user as any).id,
        receiver_id: targetId,
        content,
        subject
    })

    return { success: true }
}

export async function logActivity(activityType: string, action: string, resourceType: string, description: string) {
    const session = await getSession()
    if (!session?.user) return false

    // For MVP we might just do nothing or we could save it if we had an Activity model.
    // The previous code invoked a Supabase RPC. We'll just return success for now.
    return { success: true }
}

export async function getInvestorPortalData() {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")
    await dbConnect()
    const { Transaction, Campaign } = await import('@/lib/models')

    // Fetch investments
    const txs = await Transaction.find({ investor_id: (session.user as any).id, status: 'closed' }).lean()

    let totalInvested = 0
    const investments = await Promise.all(txs.map(async (t: any) => {
        const camp = await Campaign.findById(t.campaign_id).lean()
        totalInvested += t.amount || 0
        return {
            campaignName: camp?.name || 'Unknown Campaign',
            commitmentAmount: t.amount || 0,
            numberOfShares: t.shares || 0,
            sharePrice: t.price_per_share || 0,
            investmentDate: t.created_at,
            status: t.status,
            certificateNumber: t._id.toString().substring(0, 8).toUpperCase()
        }
    }))

    return JSON.parse(JSON.stringify({
        investments,
        updates: [], // Mock updates since we don't have a model yet
        totalInvested,
        portfolioValue: totalInvested // Mock portfolio value
    }))
}

// ------ Admin/Manage Server Actions ------

export async function getProfiles(role?: string) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")
    await dbConnect()
    const { Profile } = await import('@/lib/models')
    const query = role ? { role } : {}
    const profiles = await Profile.find(query).sort({ created_at: -1 }).lean()
    return JSON.parse(JSON.stringify(profiles.map((p: any) => ({ ...p, id: p._id.toString() }))))
}

export async function getProfileById(id: string) {
    await dbConnect()
    const { Profile } = await import('@/lib/models')
    const p = await Profile.findById(id).lean()
    if (!p) return null
    return JSON.parse(JSON.stringify({ ...(p as any), id: (p as any)._id.toString() }))
}

export async function updateProfileStatus(id: string, status: string) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")
    await dbConnect()
    const { Profile } = await import('@/lib/models')

    const p = await Profile.findById((session.user as any).id).lean()
    if (!['admin', 'superadmin'].includes(p?.role)) throw new Error("Forbidden")

    await Profile.findByIdAndUpdate(id, { status, updated_at: new Date() })
    return { success: true }
}

export async function updateProfileRole(id: string, role: string) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")
    await dbConnect()
    const { Profile } = await import('@/lib/models')
    await Profile.findByIdAndUpdate(id, { role, updated_at: new Date() })
    return { success: true }
}

export async function getAllCampaigns() {
    await dbConnect()
    const { Campaign } = await import('@/lib/models')
    const camps = await Campaign.find({}).sort({ created_at: -1 }).lean()
    return JSON.parse(JSON.stringify(camps.map((c: any) => ({ ...c, id: c._id.toString() }))))
}

export async function getCampaignById(id: string) {
    await dbConnect()
    const { Campaign } = await import('@/lib/models')
    const c = await Campaign.findById(id).lean()
    if (!c) return null
    return JSON.parse(JSON.stringify({ ...(c as any), id: (c as any)._id.toString() }))
}

export async function getTransactionsByCampaign(id: string) {
    await dbConnect()
    const { Transaction } = await import('@/lib/models')
    const txs = await Transaction.find({ campaign_id: id }).populate('investor_id', 'full_name email').sort({ created_at: -1 }).lean()
    return JSON.parse(JSON.stringify(txs.map((t: any) => ({ ...t, id: t._id.toString() }))))
}

export async function getIntegrationByKey(key: string) {
    await dbConnect()
    const { Integration } = await import('@/lib/models')
    const int = await Integration.findOne({ key }).lean()
    return JSON.parse(JSON.stringify(int))
}

export async function getAllDocuments() {
    await dbConnect()
    const { Document, Profile } = await import('@/lib/models')
    const docs = await Document.find({}).populate('user_id', 'full_name').sort({ created_at: -1 }).lean()
    const formatted = docs.map((d: any) => ({
        ...d,
        id: d._id.toString(),
        profiles: d.user_id ? { full_name: d.user_id.full_name } : null
    }))
    return JSON.parse(JSON.stringify(formatted))
}

export async function uploadDocumentRecord(title: string, docType: string, fileUrl: string, userId?: string) {
    const session = await getSession()
    if (!session?.user) throw new Error("Unauthorized")
    await dbConnect()
    const { Document, Profile } = await import('@/lib/models')

    const p = await Profile.findById((session.user as any).id).lean()
    if (!['admin', 'superadmin'].includes(p?.role)) throw new Error("Forbidden")

    await Document.create({
        title,
        doc_type: docType,
        file_url: fileUrl,
        user_id: userId || null
    })
    return { success: true }
}

// ============================================
// COMPONENT SPECIFIC ACTIONS
// ============================================

export async function getBankAccounts() {
    await dbConnect()
    const { Integration } = await import('@/lib/models')
    // We can use Integration for wire instructions if no BankAccount model exists
    return []
}

export async function createCampaign(data: any) {
    await dbConnect()
    const { Campaign } = await import('@/lib/models')
    const c = await Campaign.create(data)
    return JSON.parse(JSON.stringify(c))
}

export async function getCapTableTransactions(subsidiaryId: string) {
    await dbConnect()
    const { Campaign, Transaction } = await import('@/lib/models')

    // 1. Get Campaigns
    const campaigns = await Campaign.find({ subsidiary: subsidiaryId }).select('_id')
    const campaignIds = campaigns.map(c => c._id)

    // 2. Get txs that are initial_grant OR (investment AND status=completed AND campaign_id in campaignIds)
    const txs = await Transaction.find({
        $or: [
            { type: 'initial_grant' },
            { type: 'investment', status: 'completed', campaign_id: { $in: campaignIds } }
        ]
    }).populate('investor_id', 'full_name email').lean()

    return JSON.parse(JSON.stringify(txs.map((tx: any) => ({
        ...tx,
        user: tx.investor_id
    }))))
}

export async function getCapTableInvites(subsidiaryId: string) {
    return []
}

export async function createCapTableInvite(data: any) {
    return { success: true }
}

export async function getOrCreateGenesisCampaign(subsidiaryId: string) {
    await dbConnect()
    const { Campaign } = await import('@/lib/models')
    let genesis = await Campaign.findOne({ subsidiary: subsidiaryId, name: 'Genesis Allocation' }).lean()
    if (!genesis) {
        genesis = await Campaign.create({
            subsidiary: subsidiaryId,
            name: 'Genesis Allocation',
            status: 'closed',
            round_type: 'Equity',
            target_amount: 0,
            description: 'Initial Cap Table Setup'
        })
        genesis = genesis.toObject()
    }
    return JSON.parse(JSON.stringify(genesis))
}

export async function createInitialGrantTransaction(data: any) {
    await dbConnect()
    const { Transaction } = await import('@/lib/models')
    const tx = await Transaction.create(data)
    return JSON.parse(JSON.stringify(tx))
}

export async function getCurrentUserInvestorStatus() {
    const session = await getSession()
    if (!session?.user) return null
    const { getInvestorStatus } = await import('@/lib/investment-limits')
    return await getInvestorStatus((session.user as any).id)
}

