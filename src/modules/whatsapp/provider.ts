import { Injectable } from "@graphql-modules/di";
import sentryHttpLogger from "@lib/sentryHttpLogger";
import WhatsAppMessage from "@models/whatsappMessages";
import sendWhatsApp from "@shared/sendWhatsApp";
import { ErrorResponse } from "@shared/types";
import WhatsAppArgs from "./input";
import WhatsApp from "./types";

@Injectable()
export default class WhatsAppProvider {
    async sendWhatsAppMessage(arg: WhatsAppArgs): Promise<WhatsApp | ErrorResponse> {
        try {
            const response = await sendWhatsApp(arg);

            await WhatsAppMessage.create({
                fromNumber:  process.env.TWILIO_PHONE_NUMBER,
                phoneNumber: response.to,
                body:        response.body,
                status:      response.status,
                twilioSid:   response.sid,
            });

            return {
                phoneNumber: arg.phoneNumber,
                body:        response.body,
                createdAt:   response.dateCreated,
                updatedAt:   response.dateUpdated,
            };
        } catch (e) {
            sentryHttpLogger(e);

            await WhatsAppMessage.create({
                fromNumber:  process.env.TWILIO_PHONE_NUMBER,
                phoneNumber: arg.phoneNumber,
                body:        arg.body,
                status:      "failed",
            });

            return {
                message:    "failed to send whatsapp message",
                identifier: arg.phoneNumber,
                error:      "twilio service failure",
            };
        }
    }

    async getWhatsApp(whatsAppId: string): Promise<WhatsAppMessage | null> {
        return WhatsAppMessage.findByPk(whatsAppId);
    }

    async getAllWhatsApp(): Promise<Array<WhatsAppMessage>> {
        return WhatsAppMessage.findAll();
    }

    async resendWhatsApp(whatsAppId: string): Promise<WhatsApp | ErrorResponse> {
        const whatsApp = await this.getWhatsApp(whatsAppId);
        if (!whatsApp) {
            return {
                message:    "Record not found",
                identifier: whatsAppId,
                error:      `WhatsApp record with id ${whatsAppId} not found`,
            };
        }

        return this.sendWhatsAppMessage({
            phoneNumber: whatsApp.getDataValue("phoneNumber"),
            body:        whatsApp.getDataValue("body"),
        });
    }

    async deleteWhatsApp(whatsAppId: string): Promise<WhatsApp | ErrorResponse> {
        const whatsApp = await this.getWhatsApp(whatsAppId);
        if (!whatsApp) {
            return {
                message:    "Record not found",
                identifier: whatsAppId,
                error:      `WhatsApp record with id ${whatsAppId} not found`,
            };
        }

        await whatsApp.destroy();

        return whatsApp;
    }
}
