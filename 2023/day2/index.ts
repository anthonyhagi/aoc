import fs from "node:fs";

const validGame = {
  red: 12,
  green: 13,
  blue: 14,
};

async function main() {
  const sum = fs
    .readFileSync("./input.txt")
    .toString("utf-8")
    .split("\n")
    .map((line) => {
      const gameId = line.split(":")[0].split(" ")[1];
      const games = line
        .split(":")[1]
        .trim()
        .split(";")
        .map((game) => {
          return game
            .trim()
            .split(", ")
            .map((round) => {
              const number = +round.trim().split(" ")[0];
              const colour = round.trim().split(" ")[1];

              return number <= validGame[colour as keyof typeof validGame];
            })
            .every((value) => value === true);
        })
        .every((value) => value === true);

      // Add the gameId to the sum if it is valid, otherwise do nothing.
      if (games === true) {
        return +gameId;
      }

      return 0;
    })
    .reduce((prev, curr) => prev + curr, 0);

  console.log("Sum:", sum);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
