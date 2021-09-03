export const makeBinaryFromObject = <T extends unknown>(data: T) =>
  new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
