// eslint-disable-next-line max-classes-per-file
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorResponse {
    @Field()
    message: string;

    @Field()
    identifier: string;

    @Field()
    error: string;
}

// tslint:disable-next-line:max-classes-per-file
@ObjectType()
export class SuccessResponse {
    @Field()
    message: string;

    @Field()
    identifier: string;
}
