import { PlotSchema } from "./plot-schema";
import * as fs from "fs";

class TsdWriter {
  outFile: fs.WriteStream;
  schema: PlotSchema;

  constructor(outputPath: string, plotSchema: PlotSchema) {
    this.outFile = fs.createWriteStream(outputPath);
    this.schema = plotSchema;
  }

  generate() {
    this.writeHeader();
    // TODO: writeEventHelperComments()
    // TODO: writePlotlyDiv()
    // TODO: writePlotlyEvents()
    //this.writeLayout()
  }

  private writeHeader() {
    this.write("// Generated from Plotly.js", 0);
    this.write("");
    this.write("/* tslint:disable:max-line-length */");
    this.write("/* tslint:disable:member-ordering */");
    this.write("");
  }

  /*
    private writeLayout() {
        this.write(moduleStart("plotly.layout"), 0)
        let layoutContent = this.buildAttributeMapContent(this.schema.layout, 2)
        this.write(buildAxisContent(), 1)
        this.write(tsdTemplates.interfaceStart("Layout"), 1)
        this.write(layoutContent, 0)
        this.write(tsdTemplates.interfaceEnd(), 1)
        this.write(tsdTemplates.moduleEnd(), 0)
        this.write("", 0)
    }

    private buildAttributeMapContent(attributes: Layouts, depth: number) {
        let content = "";

        for (let attributesKey in attributes) {

        }
        {
            attName, attConfig ->
            // attribute
            if (attConfig instanceof AttributeConfig) {
                //content = appendLine( "// ATTRIBUTE ${attName} - Depth: ${depth}", depth, content )
                content += buildAttributeContent(attName, attConfig, depth)
            }
// nested object
            else if (attConfig instanceof Map) {
                //content = appendLine( "// NESTED OBJECT ${attName} - Depth: ${depth}", depth, content )
                content += buildNestedObjectContent(attName, attConfig, depth)
            } else {
                // writeToDefinition( "//standalone property: ${ attName }", depth )
            }
        }

        return content
    }

 */

  private write(value: string, depth: number = 0) {
    for (let i = 0; i < depth; i++) {
      this.outFile.write("  ");
    }
    this.outFile.write(value + "\n");
  }
}
