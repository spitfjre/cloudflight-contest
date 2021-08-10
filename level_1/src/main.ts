import { InputFormat } from "./input-format.model.ts";
import { OutputFormat } from "./output-format.model.ts";
import { solve } from "./solver.ts";
import { parseInput } from "./input-parser.ts";

function main(fileName: string) {
  console.log(`Run for ${fileName}`);

  const filePath: string = `../input/${fileName}`;
  const input: InputFormat = parseInput(filePath);

  console.log(`numberOfLocations: ${input.numberOfLocations}`);
  console.log(`startLocationName: ${input.startLocationName}`);
  console.log(`endLocationName: ${input.endLocationName}\n`);

  const output: OutputFormat = solve(input);

  console.log(`travelTime: ${output.travelTime}\n`);
}

main("level1-eg.txt");
main("level1-1.txt");
main("level1-2.txt");
main("level1-3.txt");
main("level1-4.txt");
