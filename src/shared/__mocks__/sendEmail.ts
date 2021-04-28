import EmailArgs from "../../modules/email/input";

export default async function sendEmail(templateId: number, arg: EmailArgs): Promise<{ body: { messageId: string } }> {
    return { body: { messageId: "message-id" } };
}
