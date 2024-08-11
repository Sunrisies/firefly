export function toSpongebobCase(str: string): string {
  const singleCharacter = /[a-zA-Z]/; // any word character
  const lowerCaseLetters = /[a-z]+/;

  return str.split('').reduce((acc, currChar): string => {
    // check if currChar is a word character
    if (singleCharacter.test(currChar)) {
      const existingWordChars = acc.match(/[a-zA-Z]/g) ?? [''];
      const lastMatch = existingWordChars[existingWordChars.length - 1];

      // if lastMatch is lowercase
      return lowerCaseLetters.test(lastMatch) ? acc + currChar.toUpperCase() : acc + currChar.toLowerCase();
    } else {
      return acc + currChar;
    }
  }, '');
}

// import { TimeUpdater, upTimeType } from './utils/timer'
// export { TimeUpdater, upTimeType }

export const add = (a: number, b: number): number => a + b;

export const subtract = (a: number, b: number): number => a - b;

export const multiply = (a: number, b: number): number => a * b;

export const divide = (a: number, b: number): number => a / b;