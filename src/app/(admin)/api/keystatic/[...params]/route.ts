import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../../keystatic.config";
import { adminDisabled } from "@/lib/keystatic-guard";

const handler = makeRouteHandler({ config });
const notFound = () => new Response("Not found", { status: 404 });

export const GET = adminDisabled ? notFound : handler.GET;
export const POST = adminDisabled ? notFound : handler.POST;
