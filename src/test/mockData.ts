import { EmailType } from "../shared/email";

export const mockEmailData = {
    emailType:  EmailType.TransactionConfirmation,
    parameters: {
        verificationUrl: "234455",
        receivers:       [
            {
                name:  "john",
                email: "john@test.com",
            },
        ],
    },
};

export const mockSmsData = {
    phoneNumber: "+2349999999999",
    body:        "hello who am i?",
};

export const mockSmsResponseData = {
    fromNumber:  "+2349999999999",
    phoneNumber: "+2349999999999",
    body:        "hello who am i?",
    status:      "In Progress",
    twilioSid:   "twilioSid",
};

export const mockWhatsAppData = {
    phoneNumber: "+2349999999999",
    body:        "hello who am i?",
};

export const mockWhatsAppResponseData = {
    fromNumber:  "+2349999999999",
    phoneNumber: "+2349999999999",
    body:        "hello who am i?",
    status:      "In Progress",
    twilioSid:   "twilioSid",
};
