import filesLoader from './loaders/fileLoader';

export const filesConfig = {
  useFactory: () => {
    return {
      maxSize: filesLoader().maxSize,
      totalSize: filesLoader().totalSize,
      filesDir: filesLoader().filesDir,
    };
  },
};