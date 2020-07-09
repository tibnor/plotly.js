import * as fs from "fs";

export interface Config {
  libraryName: string;
  outputPath: string;
  fileName: string;
  jsonSchema: string;
  jsSourceFile: string;
}
