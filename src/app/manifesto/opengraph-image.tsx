import { generateBasaltOG, alt, size, contentType } from '@/lib/og-template';

export { alt, size, contentType };

export default async function Image() {
    return generateBasaltOG({
        leftWing: (
            <div style={{
                fontSize: 54,
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                textShadow: '0 4px 30px rgba(0,0,0,0.9)'
            }}>
                <span style={{ color: '#119dff' }}>MANIFESTO</span>
            </div>
        ),
        rightWing: (
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10 }}>
                <div style={{ fontSize: 44, color: 'white', fontWeight: 300, lineHeight: 1.2, display: 'flex', flexDirection: 'column', maxWidth: 500, textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}>
                    <span>Why We Build</span>
                </div>
                <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12, borderLeft: '6px solid #119dff', paddingLeft: 30 }}>
                    <span style={{ fontSize: 24, color: '#D1D5DB', letterSpacing: '0.15em', fontWeight: 500, textShadow: '0 2px 10px black' }}>SANTA FE, NM</span>
                    <span style={{ fontSize: 24, color: '#119dff', letterSpacing: '0.15em', fontWeight: 700, textShadow: '0 2px 10px black' }}>basalthq.com</span>
                </div>
            </div>
        )
    });
}
