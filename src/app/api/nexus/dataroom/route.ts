import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { DataRoomFolder, DataRoomFile, DataRoomAccessLog } from '@/lib/models'

export async function GET(req: NextRequest) {
    try {
        const subsidiaryId = req.nextUrl.searchParams.get('subsidiaryId')
        const folderId = req.nextUrl.searchParams.get('folderId')
        const action = req.nextUrl.searchParams.get('action')
        if (!subsidiaryId) return NextResponse.json({ error: 'subsidiaryId required' }, { status: 400 })
        await dbConnect()

        if (action === 'analytics') {
            const allFiles = await DataRoomFile.find({ subsidiary_id: subsidiaryId }).lean()
            const totalViews = allFiles.reduce((sum: number, f: any) => sum + (f.view_count || 0), 0)
            const totalDownloads = allFiles.reduce((sum: number, f: any) => sum + (f.download_count || 0), 0)
            return NextResponse.json({ totalViews, totalDownloads, uniqueViewers: 0, totalFiles: allFiles.length })
        }

        if (folderId) {
            const files = await DataRoomFile.find({ folder_id: folderId }).sort({ created_at: -1 }).lean()
            return NextResponse.json({
                files: files.map((f: any) => ({
                    id: f._id.toString(), name: f.name, description: f.description || '',
                    fileSize: f.file_size || 0, fileType: f.file_type || 'unknown',
                    accessLevel: f.access_level, viewCount: f.view_count || 0,
                    downloadCount: f.download_count || 0, lastAccessedAt: f.last_accessed_at,
                    uploadedAt: f.created_at,
                }))
            })
        }

        const folders = await DataRoomFolder.find({ subsidiary_id: subsidiaryId, parent_id: null })
            .sort({ display_order: 1 }).lean()

        const foldersWithCounts = await Promise.all(folders.map(async (folder: any) => {
            const count = await DataRoomFile.countDocuments({ folder_id: folder._id.toString() })
            return {
                id: folder._id.toString(), name: folder.name, description: folder.description || '',
                icon: folder.icon || 'folder', accessLevel: folder.access_level,
                requiresNda: folder.requires_nda, fileCount: count,
            }
        }))

        return NextResponse.json({ folders: foldersWithCounts })
    } catch (error: any) {
        console.error('DataRoom fetch error:', error)
        return NextResponse.json({ folders: [], files: [] })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { type, ...data } = body
        await dbConnect()

        if (type === 'folder') {
            const folder = await DataRoomFolder.create(data)
            return NextResponse.json({ success: true, id: folder._id.toString() }, { status: 201 })
        }

        if (type === 'file') {
            const file = await DataRoomFile.create(data)
            return NextResponse.json({ success: true, id: file._id.toString() }, { status: 201 })
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    } catch (error: any) {
        console.error('DataRoom create error:', error)
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
    }
}
