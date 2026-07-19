import { Client as WorkflowClient } from "@upstash/workflow";

import { QSTASH_URL, QSTASH_TOKEN } from "./env.js";

// Create a new instance of the WorkflowClient with the provided base URL and token. This client will be used to interact with Upstash's workflow services.
export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN
})