'use client';

// CryptoPayment stubbed out — install `thirdweb` package to restore wallet/payment features

export default function CryptoPayment() {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full p-8 border border-dashed border-white/10 rounded-2xl bg-white/[0.02] text-center">
                <p className="text-white/60 text-sm font-medium mb-2">Crypto Payment Gateway</p>
                <p className="text-white/30 text-xs">
                    Install the <code className="text-white/50">thirdweb</code> package to enable wallet connectivity and crypto payments.
                </p>
            </div>
            <p className="mt-4 text-xs text-white/40 uppercase tracking-widest text-center">
                Wallet integration pending
            </p>
        </div>
    );
}

