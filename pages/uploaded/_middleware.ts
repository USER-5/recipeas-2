import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Rewrite /images/... to /api/images/...
  const url = req.nextUrl.clone();
  url.pathname = "/api" + url.pathname;
  return NextResponse.rewrite(url);
}
