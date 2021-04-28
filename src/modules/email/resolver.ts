import { isInstanceOfError } from "@lib/instanceChecker";
import { ErrorResponse } from "@shared/types";
import {
    Arg, Authorized, Mutation, Query, Resolver,
} from "type-graphql";
import EmailArgs, { HelpArgs } from "./input";
import EmailProvider from "./provider";
import Email from "./types";

@Resolver(of => Email)
export default class EmailResolver {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly emailProvider: EmailProvider) {}

    @Authorized()
    @Query(returns => Email, { nullable: true })
    getEmail(@Arg("emailId") emailId: string): Promise<Email | null> {
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        return this.emailProvider.getEmail(emailId);
    }

    @Authorized()
    @Query(returns => [Email])
    getAllEmail(): Promise<Array<Email>> {
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        return this.emailProvider.getAllEmail();
    }

    @Authorized()
    @Mutation(returns => Email)
    async email(@Arg("emailArgs", returns => EmailArgs) emailArgs: EmailArgs): Promise<Email> {
        const response = await this.emailProvider.sendEmail(emailArgs);

        if (isInstanceOfError(response)) {
            throw new Error((response as ErrorResponse).error);
        }

        return response as unknown as Email;
    }

    @Authorized()
    @Mutation(returns => Boolean)
    async adminHelpRequest(@Arg("helpArgs", returns => HelpArgs) helpArgs: HelpArgs): Promise<boolean> {
        await this.emailProvider.sendHelpRequest(helpArgs);

        return true;
    }

    @Authorized()
    @Mutation(returns => Email)
    async resendEmail(@Arg("emailId") emailId: string): Promise<Email | ErrorResponse> {
        const response = await this.emailProvider.resendEmail(emailId);

        if (isInstanceOfError(response)) {
            throw new Error((response as ErrorResponse).error);
        }

        return response as unknown as Email;
    }

    @Authorized()
    @Mutation(returns => Email)
    async deleteEmail(@Arg("emailId") emailId: string): Promise<Email | ErrorResponse> {
        const response = await this.emailProvider.deleteEmail(emailId);

        if (isInstanceOfError(response)) {
            throw new Error((response as ErrorResponse).error);
        }

        return response as unknown as Email;
    }
}
