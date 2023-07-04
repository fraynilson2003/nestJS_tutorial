import * as fs from "fs";
import { config, parse } from "dotenv"
import { Configuration } from "./config.keys";
config()
export class ConfigService {
    private readonly envConfig: { [key: string]: string }

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== "production"
        if (isDevelopmentEnv) {
            const envFilePath = __dirname + `./../../.env`
            //const envFilePath = __dirname + `../../../.env`

            const existPath = fs.existsSync(envFilePath)
            console.log("*********** ********************");
            console.log(__dirname + `../../../*.env`);
            console.log(process.env.HOST);

            console.log("*************************** ****");
            if (!existPath) {

                console.log(".env file does not exist sss");
                process.exit(0)
            }
            this.envConfig = parse(fs.readFileSync(envFilePath))
        } else {
            this.envConfig = {
                PORT: process.env.PORT
            }
        }
    }

    get(key: string): string {
        return this.envConfig[key]
    }
}