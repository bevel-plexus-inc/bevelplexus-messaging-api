import { GraphQLModule } from "@graphql-modules/core";
import { authorizationChecker } from "@lib/authentication";
// tslint:disable-next-line:no-import-side-effect
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import EmailProvider from "./provider";
import EmailResolver from "./resolver";

const emailModule: GraphQLModule = new GraphQLModule({
    providers:    [EmailProvider, EmailResolver],
    extraSchemas: [
        buildSchemaSync({
            authChecker: authorizationChecker,
            resolvers:   [EmailResolver],
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            container:   ({ context }): Injector<Session> => emailModule.injector.getSessionInjector(context),
        }),
    ],
});

// TODO: make use of twilio copilot for large volume
export default emailModule;
