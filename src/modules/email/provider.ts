import { Injectable } from "@graphql-modules/di";
import sentryHttpLogger from "@lib/sentryHttpLogger";
import EmailMessage from "@models/emailMessages";
import { EmailParameter, EmailType, getTemplateID } from "@shared/email";
import sendEmail, { sendHelpEmail } from "@shared/sendEmail";
import { ErrorResponse } from "@shared/types";
import EmailArgs from "./input";

@Injectable()
export default class EmailProvider {
    async sendEmail(arg: EmailArgs, isAdmin?: boolean): Promise<EmailMessage | ErrorResponse> {
        const templateId = getTemplateID(arg.emailType);

        try {
            let response;
            // tslint:disable-next-line:prefer-conditional-expression
            if (isAdmin) {
                response = await sendHelpEmail(templateId, arg);
            } else {
                response = await sendEmail(templateId, arg);
            }
            const email = await EmailMessage.create({
                fromEmail:    process.env.SIB_REPLY_TO_EMAIL,
                sibMessageId: response.body.messageId,
                status:       "On Queue",
                templateId,
                emailType:    arg.emailType,
                parameters:   JSON.stringify(arg.parameters),
            }, { raw: true });

            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            return {
                id:           email.id,
                fromEmail:    email.fromEmail,
                templateId:   email.templateId,
                sibMessageId: email.sibMessageId,
                emailType:    email.emailType,
                status:       email.status,
                createdAt:    email.createdAt,
                updatedAt:    email.updatedAt,
                parameters:   JSON.parse(email.parameters),
            };
        } catch (e) {
            sentryHttpLogger(e);
        }

        await EmailMessage.create({
            fromEmail:    process.env.SIB_REPLY_TO_EMAIL,
            sibMessageId: "",
            status:       "Failed",
            templateId,
            emailType:    arg.emailType,
            parameters:   JSON.stringify(arg.parameters),
        });

        return {
            message:    "failed to send email message",
            identifier: arg.emailType,
            error:      "send in blue service failure",
        };
    }

    async getEmail(emailId: string): Promise<EmailMessage | null> {
        const email = await EmailMessage.findByPk(emailId, { raw: true });
        if (!email) {
            return null;
        }

        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        return {
            id:           email.id,
            fromEmail:    email.fromEmail,
            templateId:   email.templateId,
            sibMessageId: email.sibMessageId,
            status:       email.status,
            emailType:    email.emailType,
            parameters:   JSON.parse(email.parameters),
            createdAt:    email.createdAt,
            updatedAt:    email.updatedAt,
        };
    }

    async getAllEmail(): Promise<Array<EmailMessage>> {
        const emails = await EmailMessage.findAll();

        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        return emails.map(email => ({
            id:           email.id,
            fromEmail:    email.fromEmail,
            templateId:   email.templateId,
            sibMessageId: email.sibMessageId,
            status:       email.status,
            emailType:    email.emailType,
            parameters:   JSON.parse(email.parameters),
            createdAt:    email.createdAt,
            updatedAt:    email.updatedAt,
        }));
    }

    async resendEmail(emailId: string): Promise<EmailMessage | ErrorResponse> {
        const email = await this.getEmail(emailId);
        if (!email) {
            return {
                message:    "Record not found",
                identifier: emailId,
                error:      `Email record with id ${emailId} not found`,
            };
        }

        return this.sendEmail({
            emailType:  email.emailType as EmailType,
            parameters: email.parameters as unknown as EmailParameter,
        });
    }

    async sendHelpRequest(helpArgs: { name: string, email: string, message: string }): Promise<void> {
        await this.sendEmail({
            emailType:  EmailType.RequestHelp,
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            parameters: helpArgs,
        }, true);
    }

    async deleteEmail(emailId: string): Promise<EmailMessage | ErrorResponse> {
        const email = await EmailMessage.findByPk(emailId);
        if (!email) {
            return {
                message:    "Record not found",
                identifier: emailId,
                error:      `Email record with id ${emailId} not found`,
            };
        }

        await email.destroy();

        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        return {
            id:           email.getDataValue("id"),
            fromEmail:    email.getDataValue("fromEmail"),
            templateId:   email.getDataValue("templateId"),
            sibMessageId: email.getDataValue("sibMessageId"),
            status:       email.getDataValue("status"),
            emailType:    email.getDataValue("emailType"),
            parameters:   JSON.parse(email.getDataValue("parameters")),
            createdAt:    email.getDataValue("createdAt"),
            updatedAt:    email.getDataValue("updatedAt"),
        };
    }
}
