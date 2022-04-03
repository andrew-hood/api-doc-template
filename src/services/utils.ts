export const transformObject = (response: object) => {
  const object: any = {};
  Object.entries(response).map(([key, value]) => {
    if ((value as any).type === "object") {
      object[key] = transformObject(value?.properties || value);
    } else if ((value as any).type === "array") {
      object[key] = [
        value?.items?.properties
          ? transformObject(value?.items?.properties)
          : value?.items?.format,
      ];
    } else {
      object[key] = value?.example || "";
    }
  });
  return object;
};

export const safeStringify = (obj: any, indent = 2) => {
  let cache: any = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return JSON.parse(retVal);
};
