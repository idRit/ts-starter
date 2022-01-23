export default interface BaseRepository {
    getAll(): any;
    getOne(id: any): any;
    create(object: any): any;
    update(id: any, object: any): any;
    delete(id: any): any;
}