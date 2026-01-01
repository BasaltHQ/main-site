import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'BasaltHQ - Neuromimetic Business Architecture';
export const size = { width: 2400, height: 1260 };
export const contentType = 'image/png';

export type OGTemplateProps = {
    leftWing: React.ReactNode;
    rightWing: React.ReactNode;
    primaryColor?: string;
    medallionPath?: string;
    bgPath?: string;
};

export async function generateBasaltOG({
    leftWing,
    rightWing,
    primaryColor = '#119dff',
    medallionPath = 'Basalt.png',
    bgPath = 'basaltbg.png'
}: OGTemplateProps) {

    // Background - BasaltHQ
    const bgData = readFileSync(join(process.cwd(), 'public', bgPath));
    const bgBase64 = `data:image/png;base64,${bgData.toString('base64')}`;

    const medallionData = readFileSync(join(process.cwd(), 'public', medallionPath));
    const medallionBase64 = `data:image/png;base64,${medallionData.toString('base64')}`;

    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
                position: 'relative',
                fontFamily: 'Helvetica, Arial, sans-serif'
            }}>
                {/* 1. Base Background - explicit img to prevent tiling/distortion */}
                <img src={bgBase64} width={2400} height={1260} style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }} />

                {/* Subtle Darkening for readability */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />

                {/* 2. Left Wing (Glass) */}
                <div style={{
                    position: 'absolute',
                    left: 200,
                    top: 480,
                    width: 800,
                    height: 320,
                    borderRadius: '40px 0 0 40px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    padding: '40px 260px 40px 40px',
                    boxShadow: 'inset 2px 2px 20px rgba(255,255,255,0.2)', // Bevel
                }}>
                    {/* Fake Blur BG - Offset to match parent position */}
                    <img src={bgBase64} width={2400} height={1260} style={{
                        position: 'absolute',
                        left: -200,
                        top: -480,
                        width: 2400,
                        height: 1260,
                        objectFit: 'cover',
                        filter: 'blur(6px)', // Reduced blur 
                        transform: 'scale(1.05)',
                    }} />
                    {/* Glass Tint - Brighter */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,255,255,0.1)', borderRight: 'none', borderRadius: '40px 0 0 40px' }} />

                    {/* Content */}
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 10 }}>
                        {leftWing}
                    </div>
                </div>

                {/* 3. Right Wing (Glass) */}
                <div style={{
                    position: 'absolute',
                    right: 200,
                    top: 480,
                    width: 800,
                    height: 320,
                    borderRadius: '0 40px 40px 0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '40px 40px 40px 260px',
                    boxShadow: 'inset -2px 2px 20px rgba(255,255,255,0.2)', // Bevel
                }}>
                    {/* Fake Blur BG - Use right offset */}
                    <img src={bgBase64} width={2400} height={1260} style={{
                        position: 'absolute',
                        right: -200,
                        top: -480,
                        width: 2400,
                        height: 1260,
                        objectFit: 'cover',
                        filter: 'blur(6px)',
                        transform: 'scale(1.05)',
                    }} />
                    {/* Glass Tint */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,255,255,0.3)', borderLeft: 'none', borderRadius: '0 40px 40px 0' }} />

                    {/* Content */}
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10 }}>
                        {rightWing}
                    </div>
                </div>

                {/* 4. Center Medallion Ring (Blurred) */}
                <div style={{
                    position: 'absolute',
                    left: 810,
                    top: 240,
                    width: 780,
                    height: 780,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    zIndex: '40',
                    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3)',
                    border: `4px solid ${primaryColor}`
                }}>
                    <img src={bgBase64} width={2400} height={1260} style={{
                        position: 'absolute',
                        left: -810,
                        top: -240,
                        width: 2400,
                        height: 1260,
                        objectFit: 'cover',
                        filter: 'blur(12px)',
                        transform: 'scale(1.05)',
                    }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />
                </div>

                {/* 5. Center Medallion (Visual) */}
                <div style={{
                    position: 'absolute',
                    left: 850, // 1200 - 350
                    top: 280, // 630 - 350
                    width: 700,
                    height: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '50' // Top layer
                }}>
                    {/* Theme Ring */}
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `4px solid ${primaryColor}`, boxShadow: `0 0 50px ${primaryColor}60`, display: 'flex' }} />

                    <img src={medallionBase64} width={700} height={700} style={{ position: 'relative', width: 700, height: 700, objectFit: 'contain', padding: 30 }} />
                </div>

                {/* GLASS FRAME - TOP */}
                <div style={{ position: 'absolute', left: 40, top: 40, width: 2320, height: 40, overflow: 'hidden', borderRadius: '24px 24px 0 0', display: 'flex', zIndex: '5', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2)' }}>
                    <img src={bgBase64} width={2400} height={1260} style={{ position: 'absolute', left: -40, top: -40, objectFit: 'cover', filter: 'blur(6px)', transform: 'scale(1.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,255,255,0.3)', borderBottom: 'none' }} />
                </div>
                {/* GLASS FRAME - BOTTOM */}
                <div style={{ position: 'absolute', left: 40, top: 1180, width: 2320, height: 40, overflow: 'hidden', borderRadius: '0 0 24px 24px', display: 'flex', zIndex: '5', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2)' }}>
                    <img src={bgBase64} width={2400} height={1260} style={{ position: 'absolute', left: -40, top: -1180, objectFit: 'cover', filter: 'blur(6px)', transform: 'scale(1.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,255,255,0.3)', borderTop: 'none' }} />
                </div>
                {/* GLASS FRAME - LEFT */}
                <div style={{ position: 'absolute', left: 40, top: 80, width: 40, height: 1100, overflow: 'hidden', display: 'flex', zIndex: '5', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2)' }}>
                    <img src={bgBase64} width={2400} height={1260} style={{ position: 'absolute', left: -40, top: -80, objectFit: 'cover', filter: 'blur(6px)', transform: 'scale(1.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,255,255,0.3)', borderTop: 'none', borderBottom: 'none' }} />
                </div>
                {/* GLASS FRAME - RIGHT */}
                <div style={{ position: 'absolute', left: 2320, top: 80, width: 40, height: 1100, overflow: 'hidden', display: 'flex', zIndex: '5', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2)' }}>
                    <img src={bgBase64} width={2400} height={1260} style={{ position: 'absolute', left: -2320, top: -80, objectFit: 'cover', filter: 'blur(6px)', transform: 'scale(1.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,255,255,0.3)', borderTop: 'none', borderBottom: 'none' }} />
                </div>

                {/* HUD Corners */}
                <div style={{ position: 'absolute', top: 60, left: 60, width: 80, height: 80, borderTop: `8px solid ${primaryColor}`, borderLeft: `8px solid ${primaryColor}`, borderRadius: '24px 0 0 0', display: 'flex' }} />
                <div style={{ position: 'absolute', top: 60, right: 60, width: 80, height: 80, borderTop: `8px solid ${primaryColor}`, borderRight: `8px solid ${primaryColor}`, borderRadius: '0 24px 0 0', display: 'flex' }} />
                <div style={{ position: 'absolute', bottom: 60, left: 60, width: 80, height: 80, borderBottom: `8px solid ${primaryColor}`, borderLeft: `8px solid ${primaryColor}`, borderRadius: '0 0 0 24px', display: 'flex' }} />
                <div style={{ position: 'absolute', bottom: 60, right: 60, width: 80, height: 80, borderBottom: `8px solid ${primaryColor}`, borderRight: `8px solid ${primaryColor}`, borderRadius: '0 0 24px 0', display: 'flex' }} />

            </div>
        ),
        { ...size }
    );
}
