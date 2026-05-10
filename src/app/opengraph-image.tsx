import { ImageResponse } from 'next/og';

export const alt = 'JT HONG · NINEDRASILL';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a0c 0%, #1a1a24 100%)',
          color: '#e6e6e6',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: '0.4em', color: '#9b9b9b', marginBottom: 28 }}>
          — NINEDRASILL GROUP —
        </div>
        <div style={{ fontSize: 130, fontWeight: 300, letterSpacing: '0.05em' }}>
          JT HONG
        </div>
        <div style={{ fontSize: 36, color: '#cfcfcf', marginTop: 32, fontStyle: 'italic' }}>
          harmonize life
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            fontSize: 22,
            color: '#7a7a7a',
            letterSpacing: '0.2em',
          }}
        >
          jthong.io
        </div>
      </div>
    ),
    { ...size },
  );
}
