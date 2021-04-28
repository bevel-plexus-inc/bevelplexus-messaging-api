import { Twilio } from "twilio";

interface SmsResponse {
    to: string;
    body: string;
    status: string;
    sid: string;
}

export default function sendSms(arg: { body: string, phoneNumber: string }): Promise<SmsResponse> {
    const { TWILIO_MESSAGING_SID, TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID } = process.env;
    if (!TWILIO_MESSAGING_SID || !TWILIO_AUTH_TOKEN || !TWILIO_ACCOUNT_SID) {
        throw new Error("missing environmental variable");
    }

    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    return client.messages.create({
        body: arg.body,
        to:   arg.phoneNumber,
        messagingServiceSid: TWILIO_MESSAGING_SID,
    });
}
