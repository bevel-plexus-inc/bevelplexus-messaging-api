import { GraphQLModule } from "@graphql-modules/core";
import { authorizationChecker } from "@lib/authentication";
// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import SmsProvider from "./provider";
import SmsResolver from "./resolver";

const smsModule: GraphQLModule = new GraphQLModule({
    providers:    [SmsProvider, SmsResolver],
    extraSchemas: [
        buildSchemaSync({
            authChecker: authorizationChecker,
            resolvers:   [SmsResolver],
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            container:   ({ context }): Injector<Session> => smsModule.injector.getSessionInjector(context),
        }),
    ],
});

// TODO: make use of twilio copilot for large volume
export default smsModule;
