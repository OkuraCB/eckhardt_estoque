export class FileExceedTotalSizeError extends Error {
  constructor() {
    super('Seus arquivos somam mais do que os 40 mb permitidos por produto.');
  }
}