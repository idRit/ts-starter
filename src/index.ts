import 'reflect-metadata';
import { container } from 'tsyringe';

import express from 'express';
import cors from 'cors';

import MongooseConnection from './util/mongo.connector';
import Router from './routes/router';

import Config, {
    env
} from './util/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(Config.get(env.port) || 3000, async () => {
    console.log(`Listening on port ${Config.get(env.port) || 3000}`);
    const mongooseConnector = container.resolve(MongooseConnection);

    try {
        await mongooseConnector.connect();
    } catch (error) {
        process.exit(1);
    } finally {
        const routerContainer = container.createChildContainer();
        const router = routerContainer.resolve(Router);
        app.use('/api', router.getRoutes());
    }
});