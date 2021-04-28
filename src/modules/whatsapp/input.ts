import { Field, InputType } from "type-graphql";

@InputType()
export default class WhatsAppArgs {
    @Field()
    phoneNumber: string;

    @Field()
    body: string;
}
