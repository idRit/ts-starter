import { connect, connection } from "mongoose";
import Config, {
    env
} from "../util/config";
import { singleton } from "tsyringe";

@singleton()
export default class MongooseConnection {
    public async connect() {
        return new Promise<void>((resolve, reject) => {
            connect(
                Config.get(env.mongoUrl),
                { dbName: Config.get(env.mongoDbName) }
            );
            connection
                .once("open", () => {
                    console.log("Connected to mongo");
                    resolve();
                })
                .on("error", error => {
                    console.log(`Error on mongo connection: ${error}`);
                    reject(error);
                });
        });
    }
}