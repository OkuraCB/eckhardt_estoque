export class ProductCreateError extends Error {
  constructor() {
    super('Error when creating the product');
  }
}
