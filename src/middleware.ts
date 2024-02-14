import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const headers = req.headers;
  const hostname = req.headers.get("host");
  const domainParts = hostname?.split(".") as string[];
  const searchParams = url.searchParams.toString();
  let subdomain = null;

  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // if localhost then 1 else 2
  const isLocalhost = headers.get("host")?.includes("localhost") ? 1 : 2;

  if (domainParts?.length > isLocalhost) {
    subdomain = domainParts[0]; // assuming subdomain is the first part
  }

  if (subdomain === "www") {
    const rewriteUrl = new URL(`/${pathWithSearchParams}`, req.url);
    return NextResponse.rewrite(rewriteUrl);
  }

  if (subdomain) {
    const rewriteUrl = new URL(`/${subdomain}${pathWithSearchParams}`, req.url);
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}
