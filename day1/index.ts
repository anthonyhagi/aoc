import fs from "node:fs/promises";
const eol = require("os").EOL;

type WordedNumber =
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"
  | {};

const wordedNumbers: WordedNumber[] = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function getWordedNumberMappingFor(str: WordedNumber) {
  switch (str) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      throw new Error(`Value: '${str}' is not a valid number`);
  }
}

function isDigit(str: string) {
  return !Number.isNaN(parseInt(str, 10));
}

function getFirstAndLastNumbers(inputString: string) {
  const numbers = inputString.match(/\d/g);

  if (numbers === null) {
    return 0;
  }

  const firstNumber = parseInt(numbers[0]);
  const lastNumber = parseInt(numbers[numbers.length - 1] ?? "");
  return parseInt(firstNumber + "" + lastNumber);
}

function replaceWordsWithNumbers(inputString) {
  const wordToNumber = {
    one: "one1one",
    two: "two2two",
    three: "three3three",
    four: "four4four",
    five: "five5five",
    six: "six6six",
    seven: "seven7seven",
    eight: "eight8eight",
    nine: "nine9nine",
  };

  for (const num in wordToNumber) {
    inputString = inputString.replaceAll(num, wordToNumber[num]);
  }

  return inputString;
}

async function main() {
  // const input = (await fs.readFile("./input.txt")).toString("utf-8").split(eol);
  const input = (await fs.readFile("./input.txt")).toString("utf-8");

  const total = input
    .split("\n")
    .map((line, idx) => {
      const values: number[] = [];

      for (let i = 0; i < line.length; i++) {
        const digit = line[i];

        // We've found a digit, so let's use that
        if (digit && isDigit(digit)) {
          if (!values[0]) {
            values[0] = parseInt(digit, 10);
            values[1] = parseInt(digit, 10);
          } else {
            values[1] = parseInt(digit, 10);
          }
        }

        wordedNumbers.forEach((word: string) => {
          if (line.startsWith(word, i)) {
            if (!values[0]) {
              values[0] = getWordedNumberMappingFor(word);
              values[1] = getWordedNumberMappingFor(word);
            } else {
              values[1] = getWordedNumberMappingFor(word);
            }
          }
        });
      }

      // console.log(`Values ${idx + 1}:`, values);

      const joined = values.reduce((prev, curr) => {
        return prev + curr.toString();
      }, "");

      // console.log("join:", joined);

      return joined;
    })
    .reduce((prev, curr) => {
      if (curr === "") {
        return prev;
      }

      return prev + parseInt(curr, 10);
    }, 0);

  console.log(total);

  // let part1 = 0;
  // let part2 = 0;

  // input.map((item) => {
  //   part1 += getFirstAndLastNumbers(item);
  //   part2 += getFirstAndLastNumbers(replaceWordsWithNumbers(item));
  // });

  // console.log("part1: ", part1), console.log("part2: ", part2);
}

main().catch((error) => {
  console.error(error);
});
