/* eslint-disable @typescript-eslint/no-explicit-any */
type Normalized<T> = Omit<T, "_id"> & { id: string };

const normalizeMongoDoc = <T extends { _id: any }>(doc: T): Normalized<T> => {
  const { _id, ...rest } = doc;

  return {
    id: _id.toString(),
    ...(rest as Omit<T, "_id">)
  };
};

export default normalizeMongoDoc;
