import { InputFormat } from "./input-format.model.ts";
import { OutputFormat } from "./output-format.model.ts";
import { solve } from "./solver.ts";
import { parseInput } from "./input-parser.ts";

function main(fileName: string) {
  console.log(`Run for ${fileName}`);

  const filePath: string = `../input/${fileName}`;
  const input: InputFormat = parseInput(filePath);

  console.log(`numberOfLocations: ${input.numberOfLocations}`);
  console.log(`numberOfJourneys: ${input.numberOfJourneys}`);
  console.log(`startLocationName: ${input.startLocationName}`);
  console.log(`endLocationName: ${input.endLocationName}\n`);

  const output: OutputFormat = solve(input);

  console.log(`numberOfFasterJourneys: ${output.numberOfFasterJourneys}\n`);
}

main("level3-eg.txt");
main("level3-1.txt");
main("level3-2.txt");
main("level3-3.txt");
main("level3-4.txt");
