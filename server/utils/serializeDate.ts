import dayjs from "dayjs";

type SerializedDate<Type> = {
  [Key in keyof Type]: Type[Key] extends Date
    ? string
    : Type[Key] extends Date | null
    ? string | null
    : Type[Key] extends Date | undefined
    ? string | undefined
    : Type[Key] extends Date | null | undefined
    ? string | null | undefined
    : Type[Key];
};

function isObject(value: any) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const formatDate = (value: any) => {
  if (!(value instanceof Date)) {
    return value;
  }

  const ISOString = value.toISOString();
  if (ISOString.substring(10) === "T00:00:00.000Z") {
    return dayjs(value).format("YYYY-MM-DD");
  }

  return ISOString;
};

export const serializeDate = <T extends object>(model: T) => {
  for (let key of Object.keys(model) as Array<keyof T>) {
    console.log(model[key]);

    model[key] =
      model[key] && model[key] instanceof Date
        ? formatDate(model[key])
        : // ? (dayjs(model[key] as Date).format("YYYY-MM-DD") as T[keyof T])
          model[key];
  }

  return model as SerializedDate<T>;
};
