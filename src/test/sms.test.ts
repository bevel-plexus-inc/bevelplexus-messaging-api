import Sms from "@models/smsMessage";
import SmsModule from "@modules/sms";
import { execute } from "graphql";
import gql from "graphql-tag";
// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import { mockSmsData, mockSmsResponseData } from "./mockData";

jest.mock("../shared/sendSms");

describe("Testing SmsModule Mutations", () => {
    it("Should send sms", async () => {
        const { schema } = SmsModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                mutation sms($smsArgs: SmsArgs!) {
                    sms(smsArgs: $smsArgs) {
                        phoneNumber
                        body
                    }
                }
            `,
            variableValues: { smsArgs: mockSmsData },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.sms).toBeTruthy();
        expect(result.data!.sms.phoneNumber).toBe(mockSmsData.phoneNumber);
        expect(result.data!.sms.body).toEqual(mockSmsData.body);
    });

    it("Should resend sms", async () => {
        const testSms = await Sms.create(mockSmsResponseData);
        const { schema } = SmsModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                mutation resendSms($smsId: String!) {
                    resendSms(smsId: $smsId) {
                        phoneNumber
                        body
                    }
                }
            `,
            variableValues: { smsId: testSms.getDataValue("id") },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.resendSms).toBeTruthy();
        expect(result.data!.resendSms.phoneNumber).toBe(mockSmsResponseData.phoneNumber);
        expect(result.data!.resendSms.body).toEqual(mockSmsResponseData.body);
    });

    it("Should delete sms", async () => {
        const testSms = await Sms.create(mockSmsResponseData);
        const { schema } = SmsModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                mutation deleteSms($smsId: String!) {
                    deleteSms(smsId: $smsId) {
                        phoneNumber
                        body
                    }
                }
            `,
            variableValues: { smsId: testSms.getDataValue("id") },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.deleteSms).toBeTruthy();
        expect(result.data!.deleteSms.phoneNumber).toBe(mockSmsResponseData.phoneNumber);
        expect(result.data!.deleteSms.body).toEqual(mockSmsResponseData.body);
    });
});

describe("Testing SmsModule Queries", () => {
    let testSms: Sms;
    beforeAll(async () => {
        testSms = await Sms.create(mockSmsResponseData);
    });

    afterAll(async () => {
        await testSms.destroy({ force: true });
    });

    it("Should return matched sms", async () => {
        const { schema } = SmsModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                query getSms($smsId: String!) {
                    getSms(smsId: $smsId) {
                        phoneNumber
                        body
                    }
                }
            `,
            variableValues: { smsId: testSms.getDataValue("id") },
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.getSms).toBeTruthy();
        expect(result.data!.getSms.phoneNumber).toBe(testSms.getDataValue("phoneNumber"));
        expect(result.data!.getSms.body).toEqual(testSms.getDataValue("body"));
    });

    it("Should return all sms when fetched", async () => {
        const { schema } = SmsModule;

        const result = await execute({
            schema,
            contextValue: { user: true },
            document:     gql`
                query {
                    getAllSms {
                        phoneNumber
                        body
                    }
                }
            `,
        });

        expect(result.errors).toBeFalsy();
        expect(result.data!.getAllSms).toBeTruthy();
        expect(result.data!.getAllSms.length).toBeGreaterThanOrEqual(1);
    });
});
