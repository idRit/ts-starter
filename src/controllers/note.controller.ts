import { injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { ResponseDirector } from "../util/response.handler";
import NoteRepository from '../repositories/note.repository';
import BaseController from './base.controller';

@injectable()
export default class NoteController extends BaseController {
    noteRepository: NoteRepository;

    constructor(
        responseDirector: ResponseDirector, 
        noteRepository: NoteRepository
    ) {
        super(responseDirector);
        this.noteRepository = noteRepository;
    }
    
    async getAll(req: Request, res: Response, next: NextFunction) {
        return this.handle(
            req,
            res,
            next,
            () => this.noteRepository.getAll()
        );  
    }
    
    async getById(req: Request, res: Response, next: NextFunction) {
        return this.handle(
            req,
            res,
            next,
            () => this.noteRepository.getOne(new Types.ObjectId(req.params.id))
        );
    }
    
    async create(req: Request, res: Response, next: NextFunction) {
        return this.handle(
            req,
            res,
            next,
            () => this.noteRepository.create(req.body)
        );
    }
    
    async update(req: Request, res: Response, next: NextFunction) {
        return this.handle(
            req,
            res,
            next,
            () => this.noteRepository.update(
                new Types.ObjectId(req.params.id), 
                req.body
            )
        );
    }
    
    async delete(req: Request, res: Response, next: NextFunction) {
        return this.handle(
            req,
            res,
            next,
            () => this.noteRepository.delete(new Types.ObjectId(req.params.id))
        );
    }
}