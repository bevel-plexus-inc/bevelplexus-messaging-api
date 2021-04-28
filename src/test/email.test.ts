import Email from "@models/emailMessages";
import EmailModule from "@modules/email";
import { execute } from "graphql";
import gql from "graphql-tag";
// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import { getTemplateID } from "../shared/email";
import { mockEmailData } from "./mockData";

jest.mock("../shared/sendEmail");

describe("Testing EmailModule Mutations", () => {
    it("Should send email", async () => {
        const { schema } = EmailModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                mutation email($emailArgs: EmailArgs!) {
                    email(emailArgs: $emailArgs) {
                        emailType
                        parameters {
                            verificationUrl
                            receivers {
                                name
                                email
                            }
                        }
                    }
                }
            `,
            variableValues: { emailArgs: mockEmailData },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.email).toBeTruthy();
        expect(result.data!.email.emailType).toBe(mockEmailData.emailType);
        expect(result.data!.email.parameters).toEqual(mockEmailData.parameters);
    });

    it("Should resend email", async () => {
        const testEmail = await Email.create({
            fromEmail:    "noreply@demo.com",
            sibMessageId: "sibMessage",
            status:       "On Queue",
            templateId:   getTemplateID(mockEmailData.emailType),
            emailType:    mockEmailData.emailType,
            parameters:   JSON.stringify(mockEmailData.parameters),
        });
        const { schema } = EmailModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                mutation resendEmail($emailId: String!) {
                    resendEmail(emailId: $emailId) {
                        emailType
                        parameters {
                            verificationUrl
                            receivers {
                                name
                                email
                            }
                        }
                    }
                }
            `,
            variableValues: { emailId: testEmail.getDataValue("id") },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.resendEmail).toBeTruthy();
        expect(result.data!.resendEmail.emailType).toBe(mockEmailData.emailType);
        expect(result.data!.resendEmail.parameters).toEqual(mockEmailData.parameters);
    });

    it("Should delete email", async () => {
        const testEmail = await Email.create({
            fromEmail:    "noreply@demo.com",
            sibMessageId: "sibMessage",
            status:       "On Queue",
            templateId:   getTemplateID(mockEmailData.emailType),
            emailType:    mockEmailData.emailType,
            parameters:   JSON.stringify(mockEmailData.parameters),
        });
        const { schema } = EmailModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                mutation deleteEmail($emailId: String!) {
                    deleteEmail(emailId: $emailId) {
                        emailType
                        parameters {
                            verificationUrl
                            receivers {
                                name
                                email
                            }
                        }
                    }
                }
            `,
            variableValues: { emailId: testEmail.getDataValue("id") },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.deleteEmail).toBeTruthy();
        expect(result.data!.deleteEmail.emailType).toBe(mockEmailData.emailType);
        expect(result.data!.deleteEmail.parameters).toEqual(mockEmailData.parameters);
    });
});

describe("Testing EmailModule Queries", () => {
    let testEmail: Email;
    beforeAll(async () => {
        testEmail = await Email.create({
            fromEmail:    "noreply@demo.com",
            sibMessageId: "sibMessage",
            status:       "On Queue",
            templateId:   getTemplateID(mockEmailData.emailType),
            emailType:    mockEmailData.emailType,
            parameters:   JSON.stringify(mockEmailData.parameters),
        });
    });

    afterAll(async () => {
        await testEmail.destroy({ force: true });
    });

    it("Should return matched email", async () => {
        const { schema } = EmailModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                query getEmail($emailId: String!) {
                    getEmail(emailId: $emailId) {
                        emailType
                        parameters {
                            verificationUrl
                            receivers {
                                name
                                email
                            }
                        }
                    }
                }
            `,
            variableValues: { emailId: testEmail.getDataValue("id") },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.getEmail).toBeTruthy();
        expect(result.data!.getEmail.emailType).toBe(mockEmailData.emailType);
        expect(result.data!.getEmail.parameters).toEqual(mockEmailData.parameters);
    });

    it("Should return all emails when fetched", async () => {
        const { schema } = EmailModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                query {
                    getAllEmail {
                        emailType
                        parameters {
                            verificationUrl
                            receivers {
                                name
                                email
                            }
                        }
                    }
                }
            `,
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.getAllEmail).toBeTruthy();
        expect(result.data!.getAllEmail.length).toBeGreaterThanOrEqual(1);
    });
});
