import { ResponseDirector, ResponseBuilder } from "../util/response.handler";
import { NextFunction, Request, Response } from 'express';

export default class BaseController {
    responseDirector: ResponseDirector;

    constructor(responseDirector: ResponseDirector) {
        this.responseDirector = responseDirector;
    } 

    async handle(req: Request, res: Response, next: NextFunction, repositoryFunction: Function) {
        this.responseDirector.setBuilder(   
            new ResponseBuilder(res)
        );

        let response: any

        try {
            response = await repositoryFunction();
        } catch (error) {
            return this.responseDirector.error()?.handleJson();
        }

        return this.responseDirector.success(response)?.handleJson();  
    }
} 