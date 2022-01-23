import { Request, Response, NextFunction } from 'express';

interface Builder {
    setStatus(status: number): void;
    setObject(object: any): void;
}

class ResponseHandler {
    #res: Response;
    #status: number = 200;
    #object: any;

    constructor (res: Response) {
        this.#res = res;
    }

    handleJson() {
        return this.#res?.status(this.#status).json(this.#object);
    }

    setStatus(status: number) {
        this.#status = status;
    }

    setObject(object: any) {
        this.#object = object;
    }
}

export class ResponseBuilder implements Builder{
    #responseHandler: ResponseHandler;

    constructor(res: Response<any, Record<string, any>>) {
        this.#responseHandler = new ResponseHandler(res);
    }

    setStatus(status: number): void {
        this.#responseHandler.setStatus(status);
    }

    setObject(object: any): void {
        this.#responseHandler.setObject(object);
    }

    build(): ResponseHandler | undefined {
        return this.#responseHandler;
    }
}

export class ResponseDirector {
    #builder?: ResponseBuilder;

    setBuilder(builder: ResponseBuilder) {
        this.#builder = builder;
    }

    #checkForBuilder() {
        if (typeof this.#builder == "undefined") 
            throw new Error("No Builder Present!");
    }

    success(object: any) {
        this.#checkForBuilder();
        this.#builder?.setStatus(200);
        this.#builder?.setObject(object);
        return this.#builder?.build();
    }

    notFound() {
        this.#checkForBuilder();
        this.#builder?.setStatus(404);
        this.#builder?.setObject({});
        return this.#builder?.build();
    }

    error() {
        this.#checkForBuilder();
        this.#builder?.setStatus(500);
        this.#builder?.setObject({});
        return this.#builder?.build();
    }
}