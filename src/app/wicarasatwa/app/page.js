"use client";
import { useEffect } from 'react';

const APK_URL = 'https://github.com/brianabdl/WicaraSatwa/releases/latest/download/wicarasatwa.apk';
export default function AppRedirect() {
  useEffect(() => {
    window.location.href = APK_URL;
  }, []);
  return (
    <div>
      <p>Redirecting to download...</p>
      <p>
        If the download does not start automatically,&nbsp;
        <a href={APK_URL}>click here to download the APK manually</a>.
      </p>
    </div>
  );
}