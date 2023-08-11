export const redactString = (str: string) => {
  return str.replace(/[\s\S]/g, '*');
};
