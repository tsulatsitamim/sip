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
