import mongoose from 'mongoose';

// ----------------------------------------------------------------------------
// Profile (Replaces Supabase profiles & auth)
// ----------------------------------------------------------------------------
const ProfileSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Hashed password
    role: { type: String, default: 'investor' },
    status: { type: String, enum: ['pending_approval', 'approved', 'suspended'], default: 'approved' },
    requested_role: { type: String }, // role user requested at signup (investor, team, director, officer)
    full_name: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

// ----------------------------------------------------------------------------
// InvestorProfile (Specific onboarding details)
// ----------------------------------------------------------------------------
const InvestorProfileSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // References Profile._id normally but stored as string to match old UUID logic maybe
    residence_state: { type: String },
    residence_country: { type: String },
    is_us_person: { type: Boolean },
    onboarding_step: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const InvestorProfile = mongoose.models.InvestorProfile || mongoose.model('InvestorProfile', InvestorProfileSchema);

// ----------------------------------------------------------------------------
// Subsidiary
// ----------------------------------------------------------------------------
const SubsidiarySchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const Subsidiary = mongoose.models.Subsidiary || mongoose.model('Subsidiary', SubsidiarySchema);

// ----------------------------------------------------------------------------
// Campaign
// ----------------------------------------------------------------------------
const CampaignSchema = new mongoose.Schema({
    name: { type: String },
    status: { type: String },
    target_amount: { type: Number },
    raised_amount: { type: Number, default: 0 },
    subsidiary_id: { type: String },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);

// ----------------------------------------------------------------------------
// Transaction
// ----------------------------------------------------------------------------
const TransactionSchema = new mongoose.Schema({
    investor_id: { type: String },
    campaign_id: { type: String },
    amount: { type: Number },
    status: { type: String },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

// ----------------------------------------------------------------------------
// Document
// ----------------------------------------------------------------------------
const DocumentSchema = new mongoose.Schema({
    title: { type: String },
    url: { type: String },
    investor_id: { type: String },
    campaign_id: { type: String },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const Document = mongoose.models.Document || mongoose.model('Document', DocumentSchema);

// ----------------------------------------------------------------------------
// Message
// ----------------------------------------------------------------------------
const MessageSchema = new mongoose.Schema({
    sender_id: { type: String },
    receiver_id: { type: String },
    content: { type: String },
    read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

// ----------------------------------------------------------------------------
// Integration
// ----------------------------------------------------------------------------
const IntegrationSchema = new mongoose.Schema({
    name: { type: String },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const Integration = mongoose.models.Integration || mongoose.model('Integration', IntegrationSchema);

// ----------------------------------------------------------------------------
// CapTable
// ----------------------------------------------------------------------------
const CapTableSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    subsidiary_id: { type: String, required: true },
    shares: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const CapTable = mongoose.models.CapTable || mongoose.model('CapTable', CapTableSchema);

// ----------------------------------------------------------------------------
// AdminRole
// ----------------------------------------------------------------------------
const AdminRoleSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    subsidiary_id: { type: String, required: true },
    role_type: { type: String },
    revoked_at: { type: Date },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const AdminRole = mongoose.models.AdminRole || mongoose.model('AdminRole', AdminRoleSchema);

// ----------------------------------------------------------------------------
// FinancialSnapshot
// ----------------------------------------------------------------------------
const FinancialSnapshotSchema = new mongoose.Schema({
    subsidiary_id: { type: String },
    period_start: { type: String },
    period_end: { type: String },
    total_revenue: { type: Number },
    mrr: { type: Number },
    arr: { type: Number },
    revenue_growth_rate: { type: Number },
    total_expenses: { type: Number },
    cash_balance: { type: Number },
    monthly_burn_rate: { type: Number },
    runway_months: { type: Number },
    total_users: { type: Number },
    paying_customers: { type: Number },
    cac: { type: Number },
    ltv: { type: Number },
    ltv_cac_ratio: { type: Number },
    rule_of_40: { type: Number }
}, { strict: false });

export const FinancialSnapshot = mongoose.models.FinancialSnapshot || mongoose.model('FinancialSnapshot', FinancialSnapshotSchema);

// ----------------------------------------------------------------------------
// CustomKPI
// ----------------------------------------------------------------------------
const CustomKPISchema = new mongoose.Schema({
    subsidiary_id: { type: String },
    name: { type: String },
    current_value: { type: Number },
    target_value: { type: Number },
    unit: { type: String },
    trend: { type: String },
    change_percent: { type: Number },
    category: { type: String },
    is_headline: { type: Boolean },
    display_order: { type: Number }
}, { strict: false });

export const CustomKPI = mongoose.models.CustomKPI || mongoose.model('CustomKPI', CustomKPISchema);

// ----------------------------------------------------------------------------
// DataRoomFolder
// ----------------------------------------------------------------------------
const DataRoomFolderSchema = new mongoose.Schema({
    subsidiary_id: { type: String },
    parent_id: { type: String },
    name: { type: String },
    description: { type: String },
    icon: { type: String },
    access_level: { type: String },
    requires_nda: { type: Boolean },
    display_order: { type: Number }
}, { strict: false });

export const DataRoomFolder = mongoose.models.DataRoomFolder || mongoose.model('DataRoomFolder', DataRoomFolderSchema);

// ----------------------------------------------------------------------------
// DataRoomFile
// ----------------------------------------------------------------------------
const DataRoomFileSchema = new mongoose.Schema({
    subsidiary_id: { type: String },
    folder_id: { type: String },
    name: { type: String },
    description: { type: String },
    file_size: { type: Number },
    file_type: { type: String },
    access_level: { type: String },
    view_count: { type: Number, default: 0 },
    download_count: { type: Number, default: 0 },
    last_accessed_at: { type: Date },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const DataRoomFile = mongoose.models.DataRoomFile || mongoose.model('DataRoomFile', DataRoomFileSchema);

// ----------------------------------------------------------------------------
// DataRoomAccessLog
// ----------------------------------------------------------------------------
const DataRoomAccessLogSchema = new mongoose.Schema({
    subsidiary_id: { type: String },
    file_id: { type: String },
    user_id: { type: String },
    action: { type: String },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const DataRoomAccessLog = mongoose.models.DataRoomAccessLog || mongoose.model('DataRoomAccessLog', DataRoomAccessLogSchema);

// ----------------------------------------------------------------------------
// CapTableProposal
// ----------------------------------------------------------------------------
const CapTableProposalSchema = new mongoose.Schema({
    subsidiary_id: { type: String },
    title: { type: String },
    description: { type: String },
    status: { type: String },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const CapTableProposal = mongoose.models.CapTableProposal || mongoose.model('CapTableProposal', CapTableProposalSchema);

// ----------------------------------------------------------------------------
// ComplianceTask
// ----------------------------------------------------------------------------
const ComplianceTaskSchema = new mongoose.Schema({
    subsidiary_id: { type: String },
    title: { type: String },
    description: { type: String },
    task_type: { type: String },
    jurisdiction: { type: String },
    due_date: { type: String },
    status: { type: String, default: 'pending' },
    priority: { type: String },
    filing_reference: { type: String },
    assigned_to: { type: String },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const ComplianceTask = mongoose.models.ComplianceTask || mongoose.model('ComplianceTask', ComplianceTaskSchema);

// ----------------------------------------------------------------------------
// GovernanceRule
// ----------------------------------------------------------------------------
const GovernanceRuleSchema = new mongoose.Schema({
    subsidiary_id: { type: String },
    rule_type: { type: String },
    title: { type: String },
    description: { type: String },
    requires_approval: { type: Boolean },
    approval_threshold: { type: Number },
    vote_weight_type: { type: String },
    eligible_voters: { type: [String] },
    voting_period_days: { type: Number },
    notice_period_days: { type: Number },
    founder_veto: { type: Boolean },
    board_approval_required: { type: Boolean },
    requires_unanimous: { type: Boolean },
    exemptions: { type: [String] },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const GovernanceRule = mongoose.models.GovernanceRule || mongoose.model('GovernanceRule', GovernanceRuleSchema);

// ----------------------------------------------------------------------------
// ActivityLog
// ----------------------------------------------------------------------------
const ActivityLogSchema = new mongoose.Schema({
    subsidiary_id: { type: String },
    user_id: { type: String },
    actor_email: { type: String },
    actor_role: { type: String },
    activity_type: { type: String },
    activity_category: { type: String },
    action: { type: String },
    resource_type: { type: String },
    resource_name: { type: String },
    description: { type: String },
    status: { type: String, default: 'success' },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);

// ----------------------------------------------------------------------------
// AccreditationResponse
// ----------------------------------------------------------------------------
const AccreditationResponseSchema = new mongoose.Schema({
    investor_id: { type: String },
    investor_type: { type: String },
    annual_income: { type: Number },
    joint_income: { type: Number },
    net_worth: { type: Number },
    has_series_7: { type: Boolean },
    has_series_65: { type: Boolean },
    has_series_82: { type: Boolean },
    entity_type: { type: String },
    entity_assets: { type: Number },
    trust_assets: { type: Number },
    trustor_accredited: { type: Boolean },
    responses: { type: mongoose.Schema.Types.Mixed },
    determination: { type: String },
    determination_reasoning: { type: String },
    verified_status: { type: String, default: 'pending' },
    verified_by: { type: String },
    verified_at: { type: Date },
    created_at: { type: Date, default: Date.now }
}, { strict: false });

export const AccreditationResponse = mongoose.models.AccreditationResponse || mongoose.model('AccreditationResponse', AccreditationResponseSchema);

// ----------------------------------------------------------------------------
// VerificationDocument
// ----------------------------------------------------------------------------
const VerificationDocumentSchema = new mongoose.Schema({
    accreditation_id: { type: String },
    document_type: { type: String },
    file_url: { type: String },
    file_name: { type: String },
    file_size: { type: Number },
    uploaded_at: { type: Date, default: Date.now }
}, { strict: false });

export const VerificationDocument = mongoose.models.VerificationDocument || mongoose.model('VerificationDocument', VerificationDocumentSchema);

// ----------------------------------------------------------------------------
// BoardMember (Directors)
// ----------------------------------------------------------------------------
const BoardMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    user_id: { type: String },
    seat_type: { type: String, enum: ['founder', 'at_large', 'observer', 'independent'], default: 'at_large' },
    seat_class: { type: String }, // e.g. 'F-1', 'F-2', 'F-3' for founder seats
    title: { type: String }, // e.g. 'Director', 'Chairman'
    committees: [{ type: String }], // e.g. ['audit', 'compensation', 'nominating']
    appointed_by: { type: String }, // stockholder class or board action
    term_start: { type: Date },
    term_end: { type: Date },
    is_active: { type: Boolean, default: true },
    voting_rights: { type: Boolean, default: true }, // observers = false
    equity_percentage: { type: Number }, // Fixed Algebra tracking
    bio: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const BoardMember = mongoose.models.BoardMember || mongoose.model('BoardMember', BoardMemberSchema);

// ----------------------------------------------------------------------------
// Officer (Corporate Officers)
// ----------------------------------------------------------------------------
const OfficerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    user_id: { type: String },
    title: { type: String, required: true }, // CEO, CTO, CRO, Secretary, Treasurer, CFO, etc.
    department: { type: String },
    appointed_by: { type: String, default: 'board' }, // board or specific resolution_id
    appointment_date: { type: Date },
    term_end: { type: Date },
    is_active: { type: Boolean, default: true },
    responsibilities: { type: String },
    compensation_reference: { type: String }, // reference to resolution approving comp
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const Officer = mongoose.models.Officer || mongoose.model('Officer', OfficerSchema);

// ----------------------------------------------------------------------------
// BoardMeeting
// ----------------------------------------------------------------------------
const BoardMeetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    meeting_type: { type: String, enum: ['regular', 'special', 'annual', 'organizational', 'committee'], default: 'regular' },
    date: { type: Date, required: true },
    time: { type: String },
    location: { type: String }, // physical or virtual link
    status: { type: String, enum: ['scheduled', 'in_progress', 'completed', 'cancelled'], default: 'scheduled' },
    agenda_items: [{
        title: { type: String },
        description: { type: String },
        presenter: { type: String },
        duration_minutes: { type: Number },
        status: { type: String, default: 'pending' }
    }],
    attendees: [{
        member_id: { type: String },
        name: { type: String },
        present: { type: Boolean, default: false },
        proxy: { type: String }
    }],
    quorum_required: { type: Number, default: 2 }, // majority of directors
    quorum_met: { type: Boolean, default: false },
    minutes: { type: String }, // Rich text minutes
    minutes_approved: { type: Boolean, default: false },
    minutes_approved_date: { type: Date },
    action_items: [{
        description: { type: String },
        assigned_to: { type: String },
        due_date: { type: Date },
        status: { type: String, default: 'pending' }
    }],
    attachments: [{
        name: { type: String },
        url: { type: String },
        type: { type: String }
    }],
    notice_sent_at: { type: Date }, // DGCL requires written notice for special meetings
    notice_waived: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const BoardMeeting = mongoose.models.BoardMeeting || mongoose.model('BoardMeeting', BoardMeetingSchema);

// ----------------------------------------------------------------------------
// Resolution (Board & Shareholder)
// ----------------------------------------------------------------------------
const ResolutionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    resolution_number: { type: String }, // e.g. 'BR-2026-001'
    resolution_type: { type: String, enum: ['board', 'written_consent', 'shareholder', 'unanimous_consent'], default: 'board' },
    category: {
        type: String, enum: [
            'general', 'officer_appointment', 'officer_removal', 'compensation',
            'stock_issuance', 'stock_option_grant', 'dividend_declaration',
            'bylaw_amendment', 'certificate_amendment', 'merger_acquisition',
            'debt_authorization', 'bank_account', 'contract_approval',
            'annual_meeting', 'budget_approval', 'committee_formation',
            'policy_adoption', 'other'
        ], default: 'general'
    },
    status: { type: String, enum: ['draft', 'pending_vote', 'voting', 'approved', 'rejected', 'withdrawn', 'archived'], default: 'draft' },
    description: { type: String },
    resolved_text: { type: String }, // The formal "RESOLVED, that..." text
    supporting_documents: [{
        name: { type: String },
        url: { type: String }
    }],
    attachments: [{
        file_name: { type: String },
        file_url: { type: String }
    }],
    // Delaware-specific governance gates
    requires_unanimous_consent: { type: Boolean, default: false }, // §4.4 protected actions
    requires_board_approval: { type: Boolean, default: true },
    requires_shareholder_approval: { type: Boolean, default: false },
    debt_amount: { type: Number }, // for §8.6A gating (>$50k threshold)
    protected_action_type: { type: String }, // which §4.4 provision is triggered
    // Voting
    votes: [{
        member_id: { type: String },
        member_name: { type: String },
        vote: { type: String, enum: ['for', 'against', 'abstain'] },
        voted_at: { type: Date },
        notes: { type: String }
    }],
    approval_threshold: { type: Number, default: 50 }, // percentage needed
    votes_for: { type: Number, default: 0 },
    votes_against: { type: Number, default: 0 },
    votes_abstain: { type: Number, default: 0 },
    // Lifecycle
    proposed_by: { type: String },
    proposed_at: { type: Date },
    voting_opens: { type: Date },
    voting_closes: { type: Date },
    approved_at: { type: Date },
    effective_date: { type: Date },
    meeting_id: { type: String }, // if adopted at a meeting
    // Delaware filing
    filed_with_state: { type: Boolean, default: false },
    filing_date: { type: Date },
    filing_reference: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const Resolution = mongoose.models.Resolution || mongoose.model('Resolution', ResolutionSchema);

// ----------------------------------------------------------------------------
// Bylaw (Corporate Charter & Bylaws)
// ----------------------------------------------------------------------------
const BylawSchema = new mongoose.Schema({
    document_type: { type: String, enum: ['certificate_of_incorporation', 'bylaws', 'stockholder_agreement', 'voting_agreement', 'rofr_agreement', 'board_policy'], default: 'bylaws' },
    article_number: { type: String }, // e.g. 'IV', '4'
    section_number: { type: String }, // e.g. '4.4'
    title: { type: String, required: true },
    content: { type: String }, // markdown or rich text
    is_protected: { type: Boolean, default: false }, // Fixed Algebra provisions
    protection_type: { type: String }, // 'unanimous_consent', 'supermajority', etc.
    effective_date: { type: Date },
    last_amended: { type: Date },
    amendment_history: [{
        amended_at: { type: Date },
        resolution_id: { type: String },
        previous_content: { type: String },
        description: { type: String }
    }],
    // Delaware filing tracking
    filed_with_delaware: { type: Boolean, default: false },
    delaware_filing_date: { type: Date },
    delaware_filing_number: { type: String },
    // Archive
    version: { type: Number, default: 1 },
    is_current: { type: Boolean, default: true },
    tags: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const Bylaw = mongoose.models.Bylaw || mongoose.model('Bylaw', BylawSchema);

// ----------------------------------------------------------------------------
// Notification (Governance Activity Alerts)
// ----------------------------------------------------------------------------
const NotificationSchema = new mongoose.Schema({
    recipient_email: { type: String, required: true },
    type: { type: String, enum: ['resolution', 'meeting', 'document', 'memo', 'proposal', 'report', 'signature', 'system'], default: 'system' },
    title: { type: String, required: true },
    body: { type: String },
    link: { type: String },
    read: { type: Boolean, default: false },
    source_id: { type: String }, // ID of the originating document/memo/resolution
    created_at: { type: Date, default: Date.now }
}, { strict: false });

// Force-refresh in dev: ensures schema updates (like new enum values) take effect without restart
if (mongoose.models.Notification) { delete mongoose.models.Notification; }
export const Notification = mongoose.model('Notification', NotificationSchema);

// ----------------------------------------------------------------------------
// SignatureRequest (Adobe-grade Fill & Sign)
// ----------------------------------------------------------------------------
const SignatureRequestSchema = new mongoose.Schema({
    document_id: { type: String, required: true, index: true }, // CorporateDocument._id
    document_title: { type: String },
    document_hash: { type: String }, // SHA-256 of original PDF for integrity
    requested_by: {
        email: { type: String, required: true },
        name: { type: String }
    },
    status: {
        type: String,
        enum: ['draft', 'pending', 'in_progress', 'completed', 'declined', 'voided'],
        default: 'draft'
    },
    message: { type: String }, // optional message to signatories
    // Fields placed on the PDF
    fields: [{
        field_id: { type: String, required: true },
        type: { type: String, enum: ['signature', 'initials', 'date', 'text', 'checkbox'], required: true },
        label: { type: String, default: '' },
        page: { type: Number, required: true },
        x: { type: Number, required: true },      // % of page width
        y: { type: Number, required: true },      // % of page height
        width: { type: Number, required: true },  // % of page width
        height: { type: Number, required: true }, // % of page height
        assigned_to: { type: String, required: true }, // email
        required: { type: Boolean, default: true },
        value: { type: String, default: '' }, // filled text, base64 sig, 'true'/'false' for checkbox
        filled_at: { type: Date },
        filled_by: { type: String } // email of who actually filled it
    }],
    // Signatories
    signatories: [{
        email: { type: String, required: true },
        name: { type: String, required: true },
        capacity: { type: String }, // e.g. "CEO", "Secretary"
        color: { type: String }, // hex color for field highlighting
        order: { type: Number, default: 0 }, // signing order (0 = any order)
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'signed', 'declined'],
            default: 'pending'
        },
        signature_data: { type: String }, // base64 PNG of drawn signature
        initials_data: { type: String },  // base64 PNG of initials
        signed_at: { type: Date },
        declined_at: { type: Date },
        decline_reason: { type: String },
        ip_address: { type: String },
        user_agent: { type: String }
    }],
    // Full audit trail
    audit_trail: [{
        action: { type: String, required: true }, // created, sent, viewed, field_filled, signed, declined, voided, completed, reminder_sent
        actor_email: { type: String },
        actor_name: { type: String },
        timestamp: { type: Date, default: Date.now },
        ip_address: { type: String },
        details: { type: String }
    }],
    completed_at: { type: Date },
    voided_at: { type: Date },
    voided_by: { type: String },
    expires_at: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const SignatureRequest = mongoose.models.SignatureRequest || mongoose.model('SignatureRequest', SignatureRequestSchema);

// ----------------------------------------------------------------------------
// CorporateDocument (PDF-based Corporate Filing System)
// ----------------------------------------------------------------------------
const CorporateDocumentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['charter', 'bylaws', 'agreement', 'filing', 'policy', 'resolution', 'financial', 'other'], default: 'other' },
    department: { type: String },
    file_url: { type: String },
    file_name: { type: String },
    file_size: { type: Number },
    file_type: { type: String, default: 'application/pdf' },
    uploaded_by: { type: String },
    notify_recipients: [{ type: String }], // emails of directors/officers to notify
    comments: [{
        user_email: { type: String },
        user_name: { type: String },
        text: { type: String },
        created_at: { type: Date, default: Date.now }
    }],
    status: { type: String, enum: ['draft', 'active', 'superseded', 'archived'], default: 'active' },
    effective_date: { type: Date },
    expiration_date: { type: Date },
    version: { type: Number, default: 1 },
    tags: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const CorporateDocument = mongoose.models.CorporateDocument || mongoose.model('CorporateDocument', CorporateDocumentSchema);

// ----------------------------------------------------------------------------
// GovernanceMemo (Memos, Proposals, Reports by Department)
// ----------------------------------------------------------------------------
const GovernanceMemoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['memo', 'proposal', 'report'], required: true },
    department: { type: String, required: true },
    author_email: { type: String },
    author_name: { type: String },
    content: { type: String }, // Rich text body
    summary: { type: String }, // Executive summary
    priority: { type: String, enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' },
    status: { type: String, enum: ['draft', 'under_review', 'published', 'approved', 'rejected', 'archived'], default: 'draft' },
    // Notification targeting
    notify_recipients: [{ type: String }], // emails of specific people
    notify_all_directors: { type: Boolean, default: false },
    notify_all_officers: { type: Boolean, default: false },
    notify_departments: [{ type: String }], // notify all personnel in these departments
    // Attachments (PDF uploads)
    attachments: [{
        file_name: { type: String },
        file_url: { type: String },
        file_size: { type: Number },
        uploaded_at: { type: Date, default: Date.now }
    }],
    // Response tracking
    requires_response: { type: Boolean, default: false },
    response_deadline: { type: Date },
    responses: [{
        user_email: { type: String },
        user_name: { type: String },
        response: { type: String, enum: ['acknowledged', 'approved', 'rejected', 'comment'] },
        comment: { type: String },
        responded_at: { type: Date, default: Date.now }
    }],
    // Metadata
    reference_number: { type: String }, // e.g. MEMO-2026-001
    related_resolution_id: { type: String },
    tags: [{ type: String }],
    // Message board
    messages: [{
        user_email: { type: String },
        user_name: { type: String },
        text: { type: String },
        created_at: { type: Date, default: Date.now }
    }],
    published_at: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

export const GovernanceMemo = mongoose.models.GovernanceMemo || mongoose.model('GovernanceMemo', GovernanceMemoSchema);

// Document Annotations — collaborative per-page highlights and comments on PDFs
const DocumentAnnotationSchema = new mongoose.Schema({
    document_key: { type: String, required: true, index: true }, // S3 key of the PDF
    page: { type: Number, required: true },
    type: { type: String, enum: ['highlight', 'comment'], required: true },
    // Position as percentage of page dimensions (0-100)
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, default: 0 },  // for highlights
    height: { type: Number, default: 0 }, // for highlights
    text: { type: String, default: '' },  // comment text or highlight note
    user_email: { type: String, required: true },
    user_name: { type: String },
    user_color: { type: String, required: true }, // deterministic hex per user
    created_at: { type: Date, default: Date.now }
});

export const DocumentAnnotation = mongoose.models.DocumentAnnotation || mongoose.model('DocumentAnnotation', DocumentAnnotationSchema);
