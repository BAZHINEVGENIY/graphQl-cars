export function uniqValueClosure<T>(): (data: T) => Set<T> {
  const uniqSet = new Set<T>();

  return (notUniqValue: T) => {
    if (notUniqValue) uniqSet.add(notUniqValue);
    return uniqSet;
  };
}

export function uniqValues<T>(notUniqValues: T[]): Set<T> {
  const uniqValues = new Set<T>();

  notUniqValues.forEach((value) => {
    if (value) uniqValues.add(value);
  });

  return uniqValues;
}
