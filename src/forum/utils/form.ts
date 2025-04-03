export const getFormIsError = (value: unknown[]) => value.length > 0 && value[0] !== null && value[0] !== undefined;
export const getFormErrorHelperText = (value: ({ message: string } | undefined)[]) =>
  getFormIsError(value)
    ? value
        .filter((e) => e !== undefined)
        .map(({ message }) => message)
        .join(", ")
    : null;
