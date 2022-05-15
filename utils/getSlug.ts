const ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ID_LENGTH = 8;

export const getSlug = () => {
  let returnValue = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    returnValue += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }

  return returnValue;
};
