'use client';

import { useState, useEffect } from 'react';
import { FileText, Upload, Trash2, Eye, Download, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { getAllDocuments, uploadDocumentRecord } from '../../../actions';

export default function DocumentManagerPage() {
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);

    // Upload state
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [docTitle, setDocTitle] = useState('');
    const [docType, setDocType] = useState('report'); // report, contract, tax

    const fetchDocs = async () => {
        try {
            const data = await getAllDocuments();
            setDocs(data || []);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !docTitle) return;
        setUploading(true);

        try {
            // Note: Since we are moving to standard MongoDB entirely, direct upload to Supabase Storage
            // must be replaced by whatever cloud storage mechanism BasaltHQ uses (like AWS S3).
            // For MVP, if we don't have an S3 upload action, we can simulate an external
            // URL or require an S3 endpoint integration.
            // Temporary fake URL to pass flow if no physical upload is coded yet:
            const fileExt = file.name.split('.').pop();
            const fakePath = `https://cdn.basalthq.com/docs/${Date.now()}.${fileExt}`;

            // Create Record
            await uploadDocumentRecord(
                docTitle,
                docType,
                fakePath, // This needs to be replaced with actual uploaded file path
                undefined // No specific user for general
            );

            setShowUpload(false);
            setFile(null);
            setDocTitle('');
            fetchDocs();
        } catch (error: any) {
            console.error('Upload failed:', error);
            alert(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-rajdhani font-bold text-white uppercase tracking-wider flex items-center gap-3">
                        <FileText className="text-[#119dff]" size={32} />
                        Document Center
                    </h1>
                    <p className="text-white/40 text-sm mt-1">
                        Repository for investor reports, legal agreements, and tax documents.
                    </p>
                </div>
                {!showUpload && (
                    <button
                        onClick={() => setShowUpload(true)}
                        className="px-6 py-2.5 bg-[#119dff] hover:bg-[#0d7acc] text-white font-semibold rounded-lg transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
                    >
                        <Upload size={18} />
                        Upload Document
                    </button>
                )}
            </header>

            {showUpload && (
                <div className="bg-black/40 border border-white/10 p-6 rounded-2xl animate-fadeInUp">
                    <h3 className="text-lg font-bold font-rajdhani text-white mb-4">Upload New Document</h3>
                    <form onSubmit={handleUpload} className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-xs font-mono tracking-wider text-white/40 mb-2">DOCUMENT TITLE</label>
                            <input
                                type="text"
                                value={docTitle}
                                onChange={e => setDocTitle(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#119dff] outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono tracking-wider text-white/40 mb-2">TYPE</label>
                            <select
                                value={docType}
                                onChange={e => setDocType(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#119dff] outline-none"
                            >
                                <option value="report">Investor Report</option>
                                <option value="contract">Legal Contract</option>
                                <option value="tax">Tax Document (K-1)</option>
                                <option value="pitch">Pitch Deck / Memo</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-mono tracking-wider text-white/40 mb-2">FILE</label>
                            <div className="border border-dashed border-white/20 rounded-lg p-8 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    onChange={e => setFile(e.target.files?.[0] || null)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    required
                                />
                                <Upload className="mx-auto text-white/40 mb-2" size={24} />
                                <p className="text-sm text-white/60">{file ? file.name : 'Drag & drop or click to select'}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowUpload(false)}
                                className="px-6 py-2 text-sm text-white/60 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="px-6 py-2 bg-[#119dff] hover:bg-[#0d7acc] text-white text-sm font-semibold rounded-lg flex items-center gap-2"
                            >
                                {uploading ? 'Uploading...' : 'Publish Document'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="text-white/40 text-center py-12">Loading documents...</div>
                ) : docs.length === 0 ? (
                    <div className="p-12 border border-dashed border-white/10 rounded-2xl text-center bg-white/[0.02]">
                        <p className="text-white/40">No documents uploaded.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {docs.map((doc) => (
                            <div key={doc.id} className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-[#119dff]/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.doc_type === 'tax' ? 'bg-orange-500/10 text-orange-400' :
                                        doc.doc_type === 'contract' ? 'bg-blue-500/10 text-blue-400' :
                                            'bg-white/5 text-white/60'
                                        }`}>
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold font-rajdhani text-white">{doc.title}</h3>
                                        <div className="flex items-center gap-3 text-xs text-white/40 mt-1">
                                            <span className="uppercase tracking-wider">{doc.doc_type}</span>
                                            <span>• {formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}</span>
                                            {doc.user_id && <span className="text-[#119dff]">• Private (Assigned)</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={doc.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                                        title="View"
                                    >
                                        <Eye size={18} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
