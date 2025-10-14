import { config } from "./config/env.js";
import {createApp} from "./createApp.js";

const app = await createApp();

app.listen(config.port, () => {
    console.log(`server running on http:localhost:${config.port}`)
});