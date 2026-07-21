export class CollectionDeleteError extends Error {
  constructor() {
    super('Error when deleting the collection');
  }
}
