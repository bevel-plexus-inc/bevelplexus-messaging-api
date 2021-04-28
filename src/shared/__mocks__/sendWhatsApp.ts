interface WhatsAppResponse {
    to: string;
    body: string;
    status: string;
    sid: string;
}

export default function sendWhatsApp(arg: { body: string, phoneNumber: string }): WhatsAppResponse {
    return {
        to:     arg.phoneNumber,
        body:   arg.body,
        status: "Queued",
        sid:    "sid",
    };
}
