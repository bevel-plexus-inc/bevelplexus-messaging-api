interface SmsResponse {
    to: string;
    body: string;
    status: string;
    sid: string;
}

export default function sendSms(arg: { body: string, phoneNumber: string }): SmsResponse {
    return {
        to:     arg.phoneNumber,
        body:   arg.body,
        status: "Queued",
        sid:    "sid",
    };
}
