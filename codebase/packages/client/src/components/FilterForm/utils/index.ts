export const getName = ({ name, firstName, lastName }: any) => {
  if (name) return name;
  return `${firstName} ${lastName}`;
};
