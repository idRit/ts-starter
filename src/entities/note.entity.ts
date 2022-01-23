import { Schema, model } from 'mongoose';
import { singleton } from 'tsyringe';
import BaseEntity from './base.entity';

const schema = new Schema({
    subject: {
        type: String,
        required: true
    },
    title: {
        type: String,
    }
});

export interface Note {
    subject: string;
    title: string;
}

@singleton()
export default class NoteEntity extends BaseEntity {
    constructor() {
        super(model<Note>('Note', schema));
    }
}