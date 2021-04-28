import { Injectable } from "@graphql-modules/di";
import sentryHttpLogger from "@lib/sentryHttpLogger";
import SmsMessage from "@models/smsMessage";
import sendSms from "@shared/sendSms";
import { ErrorResponse } from "@shared/types";
import SmsArgs from "./input";
import Sms from "./types";

@Injectable()
export default class SmsProvider {
    async sendSms(arg: SmsArgs): Promise<Sms | ErrorResponse> {
        try {
            const response = await sendSms(arg);

            return SmsMessage.create({
                fromNumber:  process.env.TWILIO_MESSAGING_SID,
                phoneNumber: response.to,
                body:        response.body,
                status:      response.status,
                twilioSid:   response.sid,
            });
        } catch (e) {
            sentryHttpLogger(e);

            await SmsMessage.create({
                fromNumber:  process.env.TWILIO_MESSAGING_SID,
                phoneNumber: arg.phoneNumber,
                body:        arg.body,
                status:      "Failed",
            });

            return {
                message:    "failed to send sms message",
                identifier: arg.phoneNumber,
                error:      "twilio service failure",
            };
        }
    }

    async getSms(smsId: string): Promise<SmsMessage | null> {
        return SmsMessage.findByPk(smsId);
    }

    async getAllSms(): Promise<Array<SmsMessage>> {
        return SmsMessage.findAll();
    }

    async resendSms(smsId: string): Promise<Sms | ErrorResponse> {
        const sms = await this.getSms(smsId);
        if (!sms) {
            return {
                message:    "Record not found",
                identifier: smsId,
                error:      `Sms record with id ${smsId} not found`,
            };
        }

        return this.sendSms({
            phoneNumber: sms.getDataValue("phoneNumber"),
            body:        sms.getDataValue("body"),
        });
    }

    async deleteSms(smsId: string): Promise<Sms | ErrorResponse> {
        const sms = await this.getSms(smsId);
        if (!sms) {
            return {
                message:    "Record not found",
                identifier: smsId,
                error:      `Sms record with id ${smsId} not found`,
            };
        }

        await sms.destroy();

        return sms;
    }
}
