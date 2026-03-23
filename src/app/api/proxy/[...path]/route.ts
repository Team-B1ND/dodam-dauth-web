import { NextRequest, NextResponse } from "next/server";
import { createAuthApi } from "@/shared/server/api";

async function proxyRequest(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const url = "/" + path.join("/") + req.nextUrl.search;

  const hasBody = !["GET", "HEAD"].includes(req.method);
  const contentType = req.headers.get("content-type") || undefined;

  const { request, applyTokens } = createAuthApi(req);

  const res = await request<string>({
    url,
    method: req.method,
    data: hasBody ? await req.text() : undefined,
    headers: { ...(contentType && { "Content-Type": contentType }) },
    transformResponse: [(data) => data],
  });

  const response = new NextResponse(res.data, {
    status: res.status,
    headers: { "Content-Type": res.headers["content-type"] || "application/json" },
  });

  applyTokens(response);
  return response;
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
