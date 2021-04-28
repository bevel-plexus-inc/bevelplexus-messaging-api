import WhatsApp from "@models/whatsappMessages";
import WhatsAppModule from "@modules/whatsapp";
import { execute } from "graphql";
import gql from "graphql-tag";
// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import { mockWhatsAppData, mockWhatsAppResponseData } from "./mockData";

jest.mock("../shared/sendWhatsApp");

describe("Testing WhatsAppModule Mutations", () => {
    it("Should send whatsApp", async () => {
        const { schema } = WhatsAppModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                mutation whatsApp($whatsAppArgs: WhatsAppArgs!) {
                    whatsApp(whatsAppArgs: $whatsAppArgs) {
                        phoneNumber
                        body
                    }
                }
            `,
            variableValues: { whatsAppArgs: mockWhatsAppData },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.whatsApp).toBeTruthy();
        expect(result.data!.whatsApp.phoneNumber).toBe(mockWhatsAppData.phoneNumber);
        expect(result.data!.whatsApp.body).toEqual(mockWhatsAppData.body);
    });

    it("Should resend whatsApp", async () => {
        const testWhatsApp = await WhatsApp.create(mockWhatsAppResponseData);
        const { schema } = WhatsAppModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                mutation resendWhatsApp($whatsAppId: String!) {
                    resendWhatsApp(whatsAppId: $whatsAppId) {
                        phoneNumber
                        body
                    }
                }
            `,
            variableValues: { whatsAppId: testWhatsApp.getDataValue("id") },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.resendWhatsApp).toBeTruthy();
        expect(result.data!.resendWhatsApp.phoneNumber).toBe(mockWhatsAppResponseData.phoneNumber);
        expect(result.data!.resendWhatsApp.body).toEqual(mockWhatsAppResponseData.body);
    });

    it("Should delete whatsApp", async () => {
        const testWhatsApp = await WhatsApp.create(mockWhatsAppResponseData);
        const { schema } = WhatsAppModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                mutation deleteWhatsApp($whatsAppId: String!) {
                    deleteWhatsApp(whatsAppId: $whatsAppId) {
                        phoneNumber
                        body
                    }
                }
            `,
            variableValues: { whatsAppId: testWhatsApp.getDataValue("id") },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.deleteWhatsApp).toBeTruthy();
        expect(result.data!.deleteWhatsApp.phoneNumber).toBe(mockWhatsAppResponseData.phoneNumber);
        expect(result.data!.deleteWhatsApp.body).toEqual(mockWhatsAppResponseData.body);
    });
});

describe("Testing WhatsAppModule Queries", () => {
    let testWhatsApp: WhatsApp;
    beforeAll(async () => {
        testWhatsApp = await WhatsApp.create(mockWhatsAppResponseData);
    });

    afterAll(async () => {
        await testWhatsApp.destroy({ force: true });
    });

    it("Should return matched whatsApp", async () => {
        const { schema } = WhatsAppModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                query getWhatsApp($whatsAppId: String!) {
                    getWhatsApp(whatsAppId: $whatsAppId) {
                        phoneNumber
                        body
                    }
                }
            `,
            variableValues: { whatsAppId: testWhatsApp.getDataValue("id") },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.getWhatsApp).toBeTruthy();
        expect(result.data!.getWhatsApp.phoneNumber).toBe(testWhatsApp.getDataValue("phoneNumber"));
        expect(result.data!.getWhatsApp.body).toEqual(testWhatsApp.getDataValue("body"));
    });

    it("Should return all whatsApp when fetched", async () => {
        const { schema } = WhatsAppModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                query {
                    getAllWhatsApp {
                        phoneNumber
                        body
                    }
                }
            `,
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.getAllWhatsApp).toBeTruthy();
        expect(result.data!.getAllWhatsApp.length).toBeGreaterThanOrEqual(1);
    });
});
