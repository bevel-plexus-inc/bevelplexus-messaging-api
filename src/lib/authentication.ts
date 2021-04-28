import { Request } from "express";
import { AuthenticationError } from "apollo-server-express";

export async function authResolver({ req }: { req: Request }): Promise<{req: Request, user: null | string}> {
    if (!process.env.APP_KEY) {
        throw new Error("missing parameter app key");
    }

    if (!req.headers || !req.headers.apikey) {
        return {
            req,
            user: null,
        };
    }

    return {
        req,
        // tslint:disable-next-line:tsr-detect-possible-timing-attacks
        user: req.headers.apikey === process.env.APP_KEY ? process.env.APP_KEY : null,
    };
}

export function authorizationChecker({ context: { user } }: { context: { user: string | null }}): boolean {
    if (user) {
        return true;
    }
    throw new AuthenticationError("Authentication error");
}
