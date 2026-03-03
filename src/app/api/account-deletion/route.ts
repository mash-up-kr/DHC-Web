import { NextRequest, NextResponse } from 'next/server';

const DHC_API_URL = 'https://dhc-2.duckdns.org';

export async function DELETE(req: NextRequest) {
  const encodedUserId = req.nextUrl.searchParams.get('userId');

  if (!encodedUserId) {
    return NextResponse.json({ error: '사용자 ID가 필요합니다.' }, { status: 400 });
  }

  // 앱에서 Base64로 인코딩된 userId를 디코딩 (Android Base64.DEFAULT는 줄바꿈 포함)
  const userId = Buffer.from(encodedUserId, 'base64').toString('utf8').trim();

  const response = await fetch(`${DHC_API_URL}/api/users/${userId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const body = await response.text();
    return NextResponse.json({ error: body }, { status: response.status });
  }

  return new NextResponse(null, { status: 204 });
}
