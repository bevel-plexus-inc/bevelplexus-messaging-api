// eslint-disable-next-line max-classes-per-file
import { EmailParameter, EmailType } from "@shared/email";
import { Field, InputType } from "type-graphql";

@InputType()
export default class EmailArgs {
    @Field(returns => EmailParameter)
    parameters: EmailParameter;

    @Field(returns => EmailType)
    emailType: EmailType;
}

// tslint:disable-next-line:max-classes-per-file
@InputType()
export class HelpArgs {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    message: string;
}
