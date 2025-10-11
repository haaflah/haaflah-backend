import { config } from "./config/env.ts";
import { createApp } from "./createApp.ts";

const app = createApp();

app.listen(config.port, () => {
    console.log(`server running on http:localhost:${config.port}`)
});