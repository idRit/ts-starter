import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../../.env' });

export enum env {
    port = 'PORT',
    mongoUrl = 'MONGO_URL',
    mongoDbName = 'MONGO_DB_NAME',
};

export default class Environment {
    public static get(key: string): string {
        return process.env[key] ?? '';
    }
}