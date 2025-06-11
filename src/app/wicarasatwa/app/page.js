"use client";
import { useEffect } from 'react';

export default function AppRedirect() {
  useEffect(() => {
    window.location.href = '/api/download-apk';
  }, []);
  return (
    <div>
      <p>Redirecting to download...</p>
      <p>
        If the download does not start automatically,&nbsp;
        <a href="/api/download-apk">click here to download the APK manually</a>.
      </p>
    </div>
  );
}