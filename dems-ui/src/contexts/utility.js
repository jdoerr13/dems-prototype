export const toSnakeCase = (input) => {
  if (Array.isArray(input)) {
    return input.map(toSnakeCase);
  }

  if (input !== null && typeof input === 'object') {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
        toSnakeCase(value),
      ])
    );
  }

  return input;
};

export const toCamelCase = (input) => {
  if (Array.isArray(input)) {
    return input.map(toCamelCase);
  }

  if (input !== null && typeof input === 'object') {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
        toCamelCase(value),
      ])
    );
  }

  return input;
};
