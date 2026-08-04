export class SaleDeleteError extends Error {
  constructor() {
    super('Error when deleting the sale');
  }
}
