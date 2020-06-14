import { PlotSchema } from "./plot-schema";
import * as fs from "fs";
import { PlotlyTypeGen } from "./typegen";

let schema = require("../../../dist/plot-schema.json") as PlotSchema;
let writer = fs.createWriteStream("out/index.d.ts");
const plotlyTypeGen = new PlotlyTypeGen(schema, writer);
plotlyTypeGen.generate();
let api = fs.readFileSync("static/types.d.ts");
writer.write(api);
