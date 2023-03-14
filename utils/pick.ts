export const pick = <T, Key extends keyof T>(
  model: T,
  keys: Key[]
): Pick<T, Key> => {
  for (let key of keys) {
    delete model[key];
  }
  return model;
};
