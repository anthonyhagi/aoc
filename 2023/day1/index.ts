import fs from "node:fs/promises";

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

async function main() {
  const input = (await fs.readFile("./input.txt")).toString("utf-8");

  const total = input
    .split("\n")
    .map((line) => {
      const part1: number[] = [];
      const part2: number[] = [];

      for (let i = 0; i < line.length; i++) {
        const digit = line[i];

        // We've found a digit, so let's use that
        if (digit && isDigit(digit)) {
          if (!part1[0]) {
            part1[0] = parseInt(digit, 10);
            part1[1] = parseInt(digit, 10);
          } else {
            part1[1] = parseInt(digit, 10);
          }

          if (!part2[0]) {
            part2[0] = parseInt(digit, 10);
            part2[1] = parseInt(digit, 10);
          } else {
            part2[1] = parseInt(digit, 10);
          }
        }

        wordedNumbers.forEach((word: string) => {
          if (line.startsWith(word, i)) {
            if (!part2[0]) {
              part2[0] = getWordedNumberMappingFor(word);
              part2[1] = getWordedNumberMappingFor(word);
            } else {
              part2[1] = getWordedNumberMappingFor(word);
            }
          }
        });
      }

      const joined1 = part1.reduce((prev, curr) => {
        return prev + curr.toString();
      }, "");

      const joined2 = part2.reduce((prev, curr) => {
        return prev + curr.toString();
      }, "");

      return [joined1, joined2];
    })
    .reduce((prev, curr) => {
      const part1 = curr[0];
      const part2 = curr[1];

      if (!part1 || !part2) {
        return prev;
      }

      return [
        (prev[0] ?? 0) + parseInt(part1, 10),
        (prev[1] ?? 0) + parseInt(part2, 10),
      ];
    }, [] as number[]);

  console.log(`Part 1:`, total[0]);
  console.log(`Part 2:`, total[1]);
}

main().catch((error) => {
  console.error(error);
});
