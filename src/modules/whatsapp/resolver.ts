import { isInstanceOfError } from "@lib/instanceChecker";
import { ErrorResponse } from "@shared/types";
import {
    Arg, Authorized, Mutation, Query, Resolver,
} from "type-graphql";
import WhatsAppArgs from "./input";
import WhatsAppProvider from "./provider";
import WhatsApp from "./types";

@Resolver(of => WhatsApp)
export default class WhatsAppResolver {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly whatsAppProvider: WhatsAppProvider) {}

    @Query(returns => WhatsApp, { nullable: true })
    getWhatsApp(@Arg("whatsAppId") whatsAppId: string): Promise<WhatsApp | null> {
        return this.whatsAppProvider.getWhatsApp(whatsAppId);
    }

    @Authorized()
    @Query(returns => [WhatsApp])
    getAllWhatsApp(): Promise<Array<WhatsApp>> {
        return this.whatsAppProvider.getAllWhatsApp();
    }

    @Mutation(returns => WhatsApp)
    async whatsApp(@Arg("whatsAppArgs", returns => WhatsAppArgs) whatsAppArgs: WhatsAppArgs): Promise<WhatsApp> {
        const response = await this.whatsAppProvider.sendWhatsAppMessage(whatsAppArgs);

        if (isInstanceOfError(response)) {
            throw new Error((response as ErrorResponse).error);
        }

        return response as WhatsApp;
    }

    @Authorized()
    @Mutation(returns => WhatsApp)
    async resendWhatsApp(@Arg("whatsAppId") whatsAppId: string): Promise<WhatsApp> {
        const response = await this.whatsAppProvider.resendWhatsApp(whatsAppId);

        if (isInstanceOfError(response)) {
            throw new Error((response as ErrorResponse).error);
        }

        return response as WhatsApp;
    }

    @Authorized()
    @Mutation(returns => WhatsApp)
    async deleteWhatsApp(@Arg("whatsAppId") whatsAppId: string): Promise<WhatsApp> {
        const response = await this.whatsAppProvider.deleteWhatsApp(whatsAppId);

        if (isInstanceOfError(response)) {
            throw new Error((response as ErrorResponse).error);
        }

        return response as WhatsApp;
    }
}
