import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class WhatsApp {
    @Field()
    phoneNumber: string;

    @Field()
    body: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
