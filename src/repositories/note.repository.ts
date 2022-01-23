import { Types, Model } from 'mongoose';
import { injectable } from 'tsyringe';
import NoteEntity, {
  Note as NoteSignature
} from '../entities/note.entity';
import BaseRepository from './base.repository';

@injectable()
export default class NoteRepository implements BaseRepository{
  Note: Model<NoteSignature>;

  constructor(noteEntity: NoteEntity) {
    this.Note = noteEntity.getModel();
  }

  async getAll() {
    return await this.Note.find({});
  }

  async getOne(id: Types.ObjectId) {
    return await this.Note.findOne({ _id: id });
  }

  async create(note: NoteSignature) {
    return await this.Note.create(note);
  }

  async update(id: Types.ObjectId, note: NoteSignature) {
    return await this.Note.updateOne({ _id: id }, note, { new: true });
  }

  async delete(id: Types.ObjectId) {
    return await this.Note.deleteOne({ _id: id });
  }
}