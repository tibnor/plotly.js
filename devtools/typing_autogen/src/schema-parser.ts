import { PlotSchema, ValObject } from "./plot-schema";

export class SchemaParser {
  editTypes: { traces: any[]; layout: any[] } = { traces: [], layout: [] };
  roles: Set<string> = new Set();
  valTypes: Set<string> = new Set();
  traceTypes: Set<string> = new Set();
  standardKeys: Set<string> = new Set();
  constructor(private schema: PlotSchema) {}

  parseSchema() {
    this.buildReferenceLists();
    //this.parseLayout()
    //this.parseTraces()
  }

  public get valObjects(): { [key: string]: ValObject } {
    return this.schema.defs.valObjects;
  }

  buildReferenceLists() {
    for (let [key, value] of Object.entries(
      this.schema.layout.layoutAttributes
    )) {
      if (key == "editType") {
        this.editTypes.layout.push(value);
      } else if (!(value instanceof Object) || !("role" in value)) {
        console.log(`Value for layout key ${key} has no role: ${value}`);
      } else {
        if (value.role != "object") {
          this.roles.add(value.role);
        }
        if (!(value.valType in this.valTypes)) {
          this.valTypes.add(value.valType);
        }
      }
    }

    for (let [traceName, traceConfig] of Object.entries(this.schema.traces)) {
      for (let [key, value] of Object.entries(traceConfig.attributes)) {
        if (key == "editType" && !(value in this.editTypes.traces)) {
          this.editTypes.traces.push(value);
        } else if (key == "type") {
          // @ts-ignore
          this.traceTypes.add(value);
        } else if (!(value instanceof Object) || !("role" in value)) {
          console.warn(
            `Value for ${traceName} key ${key} has no role: ${value}`
          );
        } else {
          // @ts-ignore
          value = value as { role: any; valType: any };
          // @ts-ignore
          if (value.role != "object" && !(value.role in this.roles)) {
            //@ts-ignore
            this.roles.add(value.role);

            for (let [key2, value2] of Object.entries(value)) {
              if (!(key2 in this.standardKeys)) {
                this.standardKeys.add(key2);
              }
            }
          }
          //@ts-ignore
          if (!(value.valType in this.valTypes)) {
            //@ts-ignore
            this.valTypes.add(value.valType);
          }
        }
      }
    }
  }
}
