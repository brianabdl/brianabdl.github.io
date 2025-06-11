import { NextResponse } from 'next/server';

export async function GET() {
  const apkUrl = 'https://github.com/brianabdl/WicaraSatwa/releases/latest/download/wicarasatwa.apk';
  return NextResponse.redirect(apkUrl, 302);
}