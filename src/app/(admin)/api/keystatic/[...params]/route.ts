import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../../keystatic.config";
import { adminDisabled } from "@/lib/keystatic-guard";

// Never prerender: the GitHub App secrets only exist at runtime, not at build time.
export const dynamic = "force-dynamic";

// Created lazily so `next build` (no secrets) doesn't evaluate the GitHub config.
let handler: ReturnType<typeof makeRouteHandler> | undefined;
const getHandler = () => (handler ??= makeRouteHandler({ config }));

const notFound = () => new Response("Not found", { status: 404 });

// In the standalone server `request.url` reflects HOSTNAME:PORT (e.g. http://0.0.0.0:3000),
// not the public domain. Keystatic builds the GitHub OAuth redirect_uri from it, so in
// production we rewrite the origin to the public site URL.
function withPublicOrigin(req: Request): Request {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NODE_ENV !== "production" || !site) return req;
  const orig = new URL(req.url);
  const url = new URL(orig.pathname + orig.search, new URL(site).origin);
  return new Request(url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
    duplex: "half",
  } as RequestInit);
}

export const GET = (req: Request) =>
  adminDisabled ? notFound() : getHandler().GET(withPublicOrigin(req));
export const POST = (req: Request) =>
  adminDisabled ? notFound() : getHandler().POST(withPublicOrigin(req));
