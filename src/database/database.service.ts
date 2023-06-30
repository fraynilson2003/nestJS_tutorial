import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "../config/config.module"
import { ConfigService } from "../config/config.service"
import { ConnectOptions } from "typeorm"
import { Configuration } from "../config/config.keys"
import { config } from "dotenv"
config()
export const dataBaseProvider = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                //ssl: true,
                type: "postgres",
                port: 5001,
                host: config.get(Configuration.HOST),
                database: config.get(Configuration.DATABASE),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                entities: [__dirname + "/../**/*.entity{.ts,.js}"],
                migrations: [__dirname + "/migrations/*{.ts,.js}"]
            } as ConnectOptions
        }
    })
]