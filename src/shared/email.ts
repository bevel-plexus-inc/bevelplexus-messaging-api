// eslint-disable-next-line max-classes-per-file
import { Field, InputType, registerEnumType } from "type-graphql";

@InputType()
export default class Recipient {
    @Field()
    name: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;
}

// tslint:disable-next-line:max-classes-per-file
@InputType()
export class EmailParameter {
    @Field({ nullable: true })
    otp?: string;

    @Field({ nullable: true })
    verificationUrl?: string;

    @Field(returns => [Recipient])
    receivers: Array<Recipient>;
}

export enum EmailType {
    TransactionConfirmation = "TransactionConfirmation",
    SignUpSuccess = "SignUpSuccess",
    KYCVerificationSuccess = "KYCVerificationSuccess",
    KYCVerification = "KYCVerification",
    EmailVerification = "EmailVerification",
    RequestHelp = "RequestHelp",
    ResetPassword = "ResetPassword",
}

registerEnumType(EmailType, {
    name:        "EmailType",
    description: "types of email",
});

// FIXME: replace with relevant template id
export function getTemplateID(type: EmailType): number {
    const templates = {
        [EmailType.TransactionConfirmation]: 1,
        [EmailType.SignUpSuccess]:           1,
        [EmailType.KYCVerificationSuccess]:  8,
        [EmailType.KYCVerification]:         4,
        [EmailType.EmailVerification]:       12,
        [EmailType.RequestHelp]:             10,
        [EmailType.ResetPassword]:           3,
    };

    return templates[type];
}
