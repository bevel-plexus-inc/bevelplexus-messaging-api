import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class SMS {
    @Field()
    phoneNumber: string;

    @Field()
    body: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
