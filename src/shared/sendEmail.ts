import * as SibApiV3Sdk from "sib-api-v3-typescript";
import EmailArgs from "../modules/email/input";

export default async function sendEmail(templateId: number, arg: EmailArgs): Promise<{ body: { messageId: string } }> {
    const { SIB_API_KEY, SIB_REPLY_TO_EMAIL, SIB_REPLY_TO_NAME } = process.env;
    if (!SIB_API_KEY || !SIB_REPLY_TO_EMAIL || !SIB_REPLY_TO_NAME) {
        throw new Error("missing environmental variable for send in blue service");
    }

    const sibInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    sibInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, SIB_API_KEY);
    const client = new SibApiV3Sdk.SendSmtpEmail();

    client.templateId = templateId;
    client.to = arg.parameters.receivers;
    client.replyTo = { email: SIB_REPLY_TO_EMAIL, name: SIB_REPLY_TO_NAME };
    client.tags = [arg.emailType];
    client.params = {
        ...arg.parameters,
        firstName:  arg.parameters.receivers[0].firstName,
        lastName:  arg.parameters.receivers[0].lastName,
        name:  arg.parameters.receivers[0].name,
        email: arg.parameters.receivers[0].email,
    };

    return sibInstance.sendTransacEmail(client);
}

export async function sendHelpEmail(templateId: number, arg: EmailArgs): Promise<{ body: { messageId: string } }> {
    const { SIB_API_KEY, SIB_REPLY_TO_EMAIL, SIB_REPLY_TO_NAME } = process.env;
    if (!SIB_API_KEY || !SIB_REPLY_TO_EMAIL || !SIB_REPLY_TO_NAME) {
        throw new Error("missing environmental variable for send in blue service");
    }

    const sibInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    sibInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, SIB_API_KEY);
    const client = new SibApiV3Sdk.SendSmtpEmail();

    client.templateId = templateId;
    client.to = [{
        name:  SIB_REPLY_TO_NAME,
        email: SIB_REPLY_TO_EMAIL,
    }];
    client.replyTo = { email: SIB_REPLY_TO_EMAIL, name: SIB_REPLY_TO_NAME };
    client.tags = [arg.emailType];
    client.params = arg.parameters;

    return sibInstance.sendTransacEmail(client);
}
