import { useState } from 'react'
import { Shield, ArrowRight, DollarSign, Send, FileText, CheckCircle, RefreshCcw, Loader2 } from 'lucide-react'
import { createCommitmentTransaction } from '@/app/nexus/actions'

interface FundingModalProps {
    round: any
    onClose: () => void
    onSuccess: () => void
}

export default function FundingModal({ round, onClose, onSuccess }: FundingModalProps) {
    const [step, setStep] = useState(1)
    const [amount, setAmount] = useState('')
    const [instrument, setInstrument] = useState<'safe' | 'equity' | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<'wire' | 'crypto' | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Crypto Checkout Flow States
    const [cryptoStatus, setCryptoStatus] = useState<'idle' | 'generating' | 'awaiting_payment' | 'confirmed'>('idle')

    const handleCommit = async () => {
        if (!instrument || !amount || !paymentMethod) return
        setLoading(true)
        setError(null)
        try {
            await createCommitmentTransaction({
                campaign_id: round._id,
                amount: parseFloat(amount),
                instrument,
                payment_method: paymentMethod
            })
            
            if (paymentMethod === 'crypto') {
                setStep(4) // Move to Crypto handler step
                setCryptoStatus('generating')
                setTimeout(() => setCryptoStatus('awaiting_payment'), 2500)
            } else {
                setStep(5) // Move to Wire Instructions step
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative">
                
                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-black/50 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold font-rajdhani text-white uppercase tracking-wider">
                            Commitment Protocol
                        </h2>
                        <p className="text-white/40 text-xs">Campaign: {round.name}</p>
                    </div>
                    <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors">
                        Cancel
                    </button>
                </div>

                <div className="p-8">
                    {/* Step 1: Instrument & Amount */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-3">
                                    Investment Instrument
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setInstrument('safe')}
                                        className={`p-4 border rounded-xl text-left transition-all ${
                                            instrument === 'safe' 
                                                ? 'bg-[#119dff]/10 border-[#119dff] text-[#119dff]' 
                                                : 'bg-black/50 border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <FileText size={18} />
                                            <span className="font-bold uppercase tracking-wider text-sm">Post-Money SAFE</span>
                                        </div>
                                        <p className="text-xs opacity-70">Standard YC template, specific terms apply.</p>
                                    </button>
                                    
                                    <button 
                                        onClick={() => setInstrument('equity')}
                                        className={`p-4 border rounded-xl text-left transition-all ${
                                            instrument === 'equity' 
                                                ? 'bg-[#119dff]/10 border-[#119dff] text-[#119dff]' 
                                                : 'bg-black/50 border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Shield size={18} />
                                            <span className="font-bold uppercase tracking-wider text-sm">Direct Equity</span>
                                        </div>
                                        <p className="text-xs opacity-70">Purchase shares at the current round valuation.</p>
                                    </button>
                                </div>
                            </div>
                            
                            {instrument && (
                                <div className="animate-in fade-in slide-in-from-top-2">
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-3">
                                        Commitment Amount (USD)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                                            <DollarSign size={24} />
                                        </div>
                                        <input 
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-3xl font-bold font-rajdhani text-white focus:outline-none focus:border-[#119dff] transition-colors"
                                            placeholder="50,000"
                                        />
                                    </div>
                                    <p className="text-[#119dff] text-xs font-bold mt-2 tracking-wide uppercase">Minimum allocation: $10,000</p>
                                </div>
                            )}

                            <button 
                                onClick={() => setStep(2)}
                                disabled={!instrument || parseFloat(amount || '0') < 10000}
                                className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-xl disabled:opacity-20 flex justify-center items-center gap-2 hover:bg-gray-200 transition-colors"
                            >
                                Review Documents <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Document Signing */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div className="p-6 bg-black/50 border border-white/10 rounded-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[#119dff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-start gap-4">
                                    <FileText className="text-[#119dff] shrink-0" size={32} />
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{instrument === 'safe' ? 'Post-Money SAFE' : 'Subscription Agreement'}</h3>
                                        <p className="text-white/60 text-sm mt-1 mb-4 leading-relaxed">
                                            Please review and sign the definitive agreements for your ${parseFloat(amount).toLocaleString()} investment.
                                        </p>
                                        <button className="px-6 py-2 bg-[#119dff]/10 hover:bg-[#119dff]/20 text-[#119dff] border border-[#119dff]/50 rounded text-xs font-bold uppercase tracking-widest transition-all">
                                            Sign via BasaltVigil
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-green-500" size={24} />
                                <span className="text-white text-sm">I have reviewed and executed the documents.</span>
                            </div>

                            <button 
                                onClick={() => setStep(3)}
                                className="w-full bg-[#119dff] text-white font-bold uppercase tracking-widest py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[#119dff]/90 transition-colors shadow-[0_0_15px_rgba(17,157,255,0.4)]"
                            >
                                Proceed to Funding <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* Step 3: Payment Method */}
                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
                                    Select Funding Route
                                </label>
                                <div className="space-y-3">
                                    <button 
                                        onClick={() => setPaymentMethod('wire')}
                                        className={`w-full p-5 border rounded-xl flex items-center justify-between transition-all ${
                                            paymentMethod === 'wire' 
                                                ? 'bg-[#119dff]/10 border-[#119dff] shadow-[0_0_20px_rgba(17,157,255,0.2)]'
                                                : 'bg-black/50 border-white/10 hover:border-white/30'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg ${paymentMethod === 'wire' ? 'bg-[#119dff] text-white' : 'bg-white/5 text-white/40'}`}>
                                                <DollarSign size={24} />
                                            </div>
                                            <div className="text-left">
                                                <h4 className={`font-bold uppercase tracking-widest text-sm ${paymentMethod === 'wire' ? 'text-white' : 'text-white/60'}`}>Fiat Wire Transfer</h4>
                                                <p className="text-white/40 text-[10px] uppercase mt-1">Processed via Mercury</p>
                                            </div>
                                        </div>
                                        {paymentMethod === 'wire' && <CheckCircle className="text-[#119dff]" />}
                                    </button>

                                    <button 
                                        onClick={() => setPaymentMethod('crypto')}
                                        className={`w-full p-5 border rounded-xl flex items-center justify-between transition-all ${
                                            paymentMethod === 'crypto' 
                                                ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                                                : 'bg-black/50 border-white/10 hover:border-white/30'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg ${paymentMethod === 'crypto' ? 'bg-purple-500 text-white' : 'bg-white/5 text-white/40'}`}>
                                                <Send size={24} />
                                            </div>
                                            <div className="text-left">
                                                <h4 className={`font-bold uppercase tracking-widest text-sm ${paymentMethod === 'crypto' ? 'text-white' : 'text-white/60'}`}>Crypto Onramp</h4>
                                                <p className="text-white/40 text-[10px] uppercase mt-1">Processed via Coinbase Commerce</p>
                                            </div>
                                        </div>
                                        {paymentMethod === 'crypto' && <CheckCircle className="text-purple-400" />}
                                    </button>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleCommit}
                                disabled={!paymentMethod || loading}
                                className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-20"
                            >
                                {loading ? <Loader2 className="animate-spin text-black" size={18} /> : 'Finalize Commitment'}
                            </button>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        </div>
                    )}

                    {/* Step 4: Crypto Coinbase Flow */}
                    {step === 4 && (
                        <div className="space-y-6 animate-in fade-in zoom-in-95 py-6 text-center">
                            {cryptoStatus === 'generating' && (
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 mb-6">
                                        <RefreshCcw className="text-purple-400 animate-spin" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold font-rajdhani text-white tracking-widest uppercase">Generating Terminal</h3>
                                    <p className="text-white/50 mt-2">Connecting to Coinbase Commerce API...</p>
                                </div>
                            )}

                            {cryptoStatus === 'awaiting_payment' && (
                                <div className="flex flex-col items-center">
                                    <div className="w-full max-w-sm bg-black border border-white/20 rounded-xl p-8 mb-6 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
                                        <h4 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-6">Coinbase Pay Checkout</h4>
                                        <div className="bg-white p-4 rounded-lg inline-block mb-6">
                                            {/* Fake QR code using grid */}
                                            <div className="grid grid-cols-5 gap-1 w-32 h-32 opacity-80">
                                                {Array.from({ length: 25 }).map((_, i) => (
                                                    <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-3xl font-rajdhani font-bold text-white mb-2">
                                            USDC <span className="text-purple-400">{parseFloat(amount).toLocaleString()}</span>
                                        </p>
                                        <p className="text-white/40 text-[10px] break-all">
                                            0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE
                                        </p>
                                        <button 
                                            onClick={() => setCryptoStatus('confirmed')}
                                            className="mt-6 w-full py-2 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-lg text-xs font-bold uppercase hover:bg-purple-500 hover:text-white transition-colors"
                                        >
                                            [DEV] Simulate Payment
                                        </button>
                                    </div>
                                </div>
                            )}

                            {cryptoStatus === 'confirmed' && (
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 mb-6">
                                        <CheckCircle className="text-green-500" size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold font-rajdhani text-white tracking-widest uppercase">Transaction Confirmed</h3>
                                    <p className="text-white/50 mt-2 mb-6">Your onchain deposit was successfully detected.</p>
                                    <button 
                                        onClick={onSuccess}
                                        className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        View Portfolio
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 5: Fiat Wire Instructions */}
                    {step === 5 && (
                        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-[#119dff]/10 rounded-full flex items-center justify-center border border-[#119dff]/30 mx-auto mb-4">
                                    <CheckCircle className="text-[#119dff]" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold font-rajdhani text-white tracking-widest uppercase">Commitment Recorded</h3>
                                <p className="text-white/50 mt-2">Please wire your funds to the account below.</p>
                            </div>
                            
                            <div className="bg-black/50 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#119dff]" />
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Bank Name</span>
                                        <span className="text-white font-medium text-sm">Mercury (Evolve Bank & Trust)</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Account Name</span>
                                        <span className="text-white font-medium text-sm">BasaltHQ Inc.</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Account Number</span>
                                        <span className="text-white font-medium font-mono text-sm">3819 0921 5518</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Routing Number</span>
                                        <span className="text-white font-medium font-mono text-sm">084105268</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={onSuccess}
                                className="w-full px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
