import React, { useEffect } from 'react';

interface GoogleAdsProps {
  client: string;
  slot: string;
}

const GoogleAds = ({ client, slot }: GoogleAdsProps) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      );
      console.log('Advertise is pushed');
    } catch (e) {
      console.error('AdvertiseError', e);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production')
    return (
      <div
        style={{
          background: '#e9e9e9',
          color: 'black',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          height: '280px',
          padding: '16px',
          marginBottom: '1rem',
        }}
      >
        광고 표시 영역
      </div>
    );

  return (
    <div className="google-ads">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', marginBottom: '1rem' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAds;
