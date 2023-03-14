export const mapToReactive = <T extends {}, Y extends T>(
  reactive: T,
  data: Y
) => {
  for (const key of Object.keys(reactive) as Array<keyof T>) {
    reactive[key] = data[key];
  }
};
