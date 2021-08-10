import { InputFormat } from "./input-format.model.ts";
import { OutputFormat } from "./output-format.model.ts";
import { solve } from "./solver.ts";
import { parseInput } from "./input-parser.ts";

function main(fileName: string) {
  console.log(`Run for ${fileName}`);

  const filePath: string = `../input/${fileName}`;
  const input: InputFormat = parseInput(filePath);

  console.log(`numberOfLocations: ${input.numberOfLocations}`);
  console.log(
    `numberOfHyperloopLocations: ${input.numberOfHyperloopLocations}\n`,
  );

  const output: OutputFormat = solve(input);

  console.log(`journeyTime: ${output.journeyTime}\n`);
}

main("level5-eg.txt");
main("level5-1.txt");
main("level5-2.txt");
main("level5-3.txt");
main("level5-4.txt");
