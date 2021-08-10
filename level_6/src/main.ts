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
  console.log(`neededFasterJourneys: ${input.neededFasterJourneys}`);
  console.log(`maximumRouteLength: ${input.maximumRouteLength}\n`);

  const output: OutputFormat = solve(input);

  console.log(
    `result: ${output.numberOfHyperloopLocations} ${
      output.hyperloopLocationNames.join(" ")
    }\n`,
  );
}

main("level6-eg.txt");
main("level6-1.txt");
main("level6-2.txt");
main("level6-3.txt");
main("level6-4.txt");
