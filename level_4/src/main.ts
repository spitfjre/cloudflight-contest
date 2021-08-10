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
  console.log(
    `numberOfHyperloopConnections: ${input.numberOfHyperloopConnections}\n`,
  );

  const output: OutputFormat = solve(input);

  console.log(`startLocationName: ${output.startLocationName}`);
  console.log(`endLocationName: ${output.endLocationName}\n`);
}

main("level4-eg.txt");
main("level4-1.txt");
main("level4-2.txt");
main("level4-3.txt");
main("level4-4.txt");
