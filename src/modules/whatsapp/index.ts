import { GraphQLModule } from "@graphql-modules/core";
import { authorizationChecker } from "@lib/authentication";
// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import WhatsAppProvider from "./provider";
import WhatsAppResolver from "./resolver";

const whatsAppModule: GraphQLModule = new GraphQLModule({
    providers:    [WhatsAppProvider, WhatsAppResolver],
    extraSchemas: [
        buildSchemaSync({
            authChecker: authorizationChecker,
            resolvers:   [WhatsAppResolver],
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            container:   ({ context }): Injector<Session> => whatsAppModule.injector.getSessionInjector(context),
        }),
    ],
});

// TODO: make use of twilio copilot for large volume
export default whatsAppModule;
