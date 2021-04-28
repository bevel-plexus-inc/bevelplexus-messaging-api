import { Twilio } from "twilio";

interface WhatsAppResponse {
    to: string;
    body: string;
    status: string;
    sid: string;
    dateCreated: Date;
    dateUpdated: Date;
}

export default function sendWhatsApp(arg: { body: string, phoneNumber: string }): Promise<WhatsAppResponse> {
    const { TWILIO_PHONE_NUMBER, TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID } = process.env;
    if (!TWILIO_PHONE_NUMBER || !TWILIO_AUTH_TOKEN || !TWILIO_ACCOUNT_SID) {
        throw new Error("missing environmental variable");
    }

    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    return client.messages.create({
        body: arg.body,
        to:   `whatsapp:${arg.phoneNumber}`,
        from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
    });
}
