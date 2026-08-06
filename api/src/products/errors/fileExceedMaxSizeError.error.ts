export class FileExceedMaxSizeError extends Error {
  constructor() {
    super('Um dos arquivos selecionados excedeu o limite de 10 mb por arquivo.');
  }
}