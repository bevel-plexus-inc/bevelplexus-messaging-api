// eslint-disable-next-line max-classes-per-file
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class RecipientOutput {
    @Field()
    name: string;

    @Field()
    email: string;
}

// tslint:disable-next-line:max-classes-per-file
@ObjectType()
class EmailOutputParameter {
    @Field({ nullable: true })
    verificationUrl?: string;

    @Field(returns => [RecipientOutput])
    receivers: Array<RecipientOutput>;
}

// tslint:disable-next-line:max-classes-per-file
@ObjectType()
export default class Email {
    @Field()
    id: string;

    @Field()
    fromEmail: string;

    @Field(returns => EmailOutputParameter)
    parameters: EmailOutputParameter;

    @Field()
    templateId: number;

    @Field()
    sibMessageId: string;

    @Field()
    emailType: string;

    @Field()
    status: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
