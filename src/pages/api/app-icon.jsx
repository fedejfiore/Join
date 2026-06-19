import { ImageResponse } from 'next/og';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const origin = new URL(req.url).origin;

  return new ImageResponse(
    (
      <div
        style={{
          width: '512px',
          height: '512px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#660033',
          padding: '90px',
        }}
      >
        <img
          src={`${origin}/images/JOIN-Blanco.png`}
          width="332"
          height="332"
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { width: 512, height: 512 }
  );
}
