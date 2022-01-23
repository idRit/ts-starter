import { Router } from 'express';
import { injectable, singleton } from 'tsyringe';
import NoteController from '../controllers/note.controller';

@singleton()
@injectable()
export default class Routes {
    noteController: NoteController;
    router: Router;

    constructor(noteController: NoteController) {
        this.noteController = noteController;
        this.router = Router();
    }

    getRoutes(): Router {
        this.router.get('/', async (...handlers) => this.noteController.getAll(...handlers));
        this.router.get('/:id', async (...handlers) => this.noteController.getById(...handlers));
        this.router.post('/', async (...handlers) => this.noteController.create(...handlers));
        this.router.put('/:id', async (...handlers) => this.noteController.update(...handlers));
        this.router.delete('/:id', async (...handlers) => this.noteController.delete(...handlers));

        return this.router;
    }
}