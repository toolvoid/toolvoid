import { NextResponse } from 'next/server';

const TRACKING_PARAMS = new Set([
  'ref',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid',
  'igshid',
  'mc_cid',
  'mc_eid',
]);

export function middleware(request) {
  const url = new URL(request.url);
  const cleanedUrl = new URL(request.url);
  let hasTrackingParams = false;

  for (const key of [...cleanedUrl.searchParams.keys()]) {
    if (TRACKING_PARAMS.has(key)) {
      hasTrackingParams = true;
      cleanedUrl.searchParams.delete(key);
    }
  }

  if (!hasTrackingParams) {
    return NextResponse.next();
  }

  const target = cleanedUrl.pathname + (cleanedUrl.search ? cleanedUrl.search : '');
  return NextResponse.redirect(new URL(target, request.url), 308);
}

export const config = {
  matcher: ['/((?!api|_next|.*\..*).*)'],
};
