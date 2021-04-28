import { Field, InputType } from "type-graphql";

@InputType()
export default class SmsArgs {
    @Field()
    phoneNumber: string;

    @Field()
    body: string;
}
