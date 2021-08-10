import { InputFormat } from "./input-format.model.ts";
import { OutputFormat } from "./output-format.model.ts";
import { solve } from "./solver.ts";
import { parseInput } from "./input-parser.ts";

function main(fileName: string) {
  console.log(`Run for ${fileName}`);

  const filePath: string = `../input/${fileName}`;
  const input: InputFormat = parseInput(filePath);

  console.log(`numberOfLocations: ${input.numberOfLocations}`);
  console.log(`journeyStartLocationName: ${input.journeyStartLocationName}`);
  console.log(`journeyEndLocationName: ${input.journeyEndLocationName}`);
  console.log(`startLocationName: ${input.startLocationName}`);
  console.log(`endLocationName: ${input.endLocationName}\n`);

  const output: OutputFormat = solve(input);

  console.log(`journeyTime: ${output.journeyTime}\n`);
}

main("level2-eg.txt");
main("level2-1.txt");
main("level2-2.txt");
main("level2-3.txt");
main("level2-4.txt");
