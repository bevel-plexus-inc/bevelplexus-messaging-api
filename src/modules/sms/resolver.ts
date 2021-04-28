import { isInstanceOfError } from "@lib/instanceChecker";
import { ErrorResponse } from "@shared/types";
import {
    Arg, Authorized, Mutation, Query, Resolver,
} from "type-graphql";
import SmsArgs from "./input";
import SmsProvider from "./provider";
import Sms from "./types";

@Resolver(of => Sms)
export default class SmsResolver {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly smsProvider: SmsProvider) {}

    @Authorized()
    @Query(returns => Sms, { nullable: true })
    getSms(@Arg("smsId") smsId: string): Promise<Sms | null> {
        return this.smsProvider.getSms(smsId);
    }

    @Authorized()
    @Query(returns => [Sms])
    getAllSms(): Promise<Array<Sms>> {
        return this.smsProvider.getAllSms();
    }

    @Authorized()
    @Mutation(returns => Sms)
    async sms(@Arg("smsArgs", returns => SmsArgs) smsArgs: SmsArgs): Promise<Sms> {
        const response = await this.smsProvider.sendSms(smsArgs);

        if (isInstanceOfError(response)) {
            throw new Error((response as ErrorResponse).error);
        }

        return response as Sms;
    }

    @Authorized()
    @Mutation(returns => Sms)
    async resendSms(@Arg("smsId") smsId: string): Promise<Sms> {
        const response = await this.smsProvider.resendSms(smsId);

        if (isInstanceOfError(response)) {
            throw new Error((response as ErrorResponse).error);
        }

        return response as Sms;
    }

    @Authorized()
    @Mutation(returns => Sms)
    async deleteSms(@Arg("smsId") smsId: string): Promise<Sms> {
        const response = await this.smsProvider.deleteSms(smsId);

        if (isInstanceOfError(response)) {
            throw new Error((response as ErrorResponse).error);
        }

        return response as Sms;
    }
}
