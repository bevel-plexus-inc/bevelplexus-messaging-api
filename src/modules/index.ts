import { GraphQLModule } from "@graphql-modules/core";
import { authResolver } from "@lib/authentication";
import emailModule from "@modules/email";
import smsModule from "@modules/sms";
import whatsappModule from "@modules/whatsapp";

const rootModule = new GraphQLModule({
    imports: [
        smsModule,
        whatsappModule,
        emailModule,
    ],
    context: authResolver,
});

export default rootModule;
