export class ProductDeleteError extends Error {
  constructor() {
    super('Error when deleting the product');
  }
}
