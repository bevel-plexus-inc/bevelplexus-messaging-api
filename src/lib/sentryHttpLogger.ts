import * as Sentry from "@sentry/node";
import { Request } from "express";

export default function sentryHttpLogger(err: Error, req?: Request, level?: Sentry.Severity): void {
    Sentry.withScope(scope => {
        scope.setLevel(level || Sentry.Severity.Error);
        scope.setExtra("name", err.name);

        if (req) {
            scope.setTag("kind", req.method);
            scope.setExtra("body", req.body);
            scope.setExtra("origin", req.originalUrl);
            scope.setExtra("origin", req.originalUrl);

            const transactionId = req.headers ? req.headers["x-transaction-id"] : null;
            if (transactionId) {
                scope.setTransactionName(transactionId as string);
            }
        }

        Sentry.captureException(err);
    });
}
