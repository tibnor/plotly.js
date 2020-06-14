import { AttributeConfig, PlotSchema, ValType } from "./plot-schema";
import * as fs from "fs";

export class PlotlyTypeGen {
  dept = 0;

  constructor(private schema: PlotSchema, private writer: fs.WriteStream) {}

  generate() {
    const axis = this.parseAxis();
    this.parseLayout(axis);
    this.parseConfig();
    this.parseTraces();
  }

  private parseAxis() {
    const axis = this.schema.layout.layoutAttributes.xaxis;
    this.mergeAxis(this.schema.layout.layoutAttributes.yaxis, axis);
    this.mergeAxis(this.schema.layout.layoutAttributes.scene.xaxis, axis);
    this.mergeAxis(this.schema.layout.layoutAttributes.scene.yaxis, axis);
    this.mergeAxis(this.schema.layout.layoutAttributes.scene.zaxis, axis);
    return axis;
  }

  private mergeAxis(newaxis: any, axis: any) {
    for (let key in newaxis) {
      if (!(key in axis)) axis[key] = newaxis[key];
    }
  }

  private parseTraces() {
    this.write("declare module plotly.traces {");
    this.dept++;
    this.write("export interface BaseTrace {}");
    for (let [tracesName, trace] of Object.entries(this.schema.traces)) {
      this.write(`/** ${trace.meta.description} */`);
      tracesName = tracesName[0].toUpperCase() + tracesName.slice(1);
      this.write(`export interface ${tracesName}Trace extends BaseTrace {`);
      this.dept++;
      for (let [attributeName, attribute] of Object.entries(trace.attributes)) {
        this.writeAttribute(attribute, attributeName);
      }
      this.dept--;
      this.write("}");
    }
    this.dept--;
    this.write("}");
  }

  private parseLayout(axis: any) {
    this.write("declare module plotly.layout {");
    this.dept++;
    this.write("export interface PlotlyAxis {");
    this.dept++;
    for (let [attributeName, attribute] of Object.entries(axis)) {
      this.writeAttribute(attribute, attributeName);
    }
    this.dept--;
    this.write("}");
    this.write("export interface Layout {");
    this.dept++;
    for (let [attributeName, attribute] of Object.entries(
      this.schema.layout.layoutAttributes
    )) {
      if (attributeName === "xaxis" || attributeName === "yaxis") {
        this.write(`${attributeName}?: PlotlyAxis;`);
        this.write(`${attributeName}2?: PlotlyAxis;`);
        this.write(`${attributeName}3?: PlotlyAxis;`);
        this.write(`${attributeName}4?: PlotlyAxis;`);
      } else {
        this.writeAttribute(attribute, attributeName);
      }
    }
    this.dept--;
    this.write("}");

    this.dept--;
    this.write("}");
  }

  private parseConfig() {
    this.write("declare module plotly {");
    this.dept++;
    this.write("export interface PlotConfig {");
    this.dept++;
    for (let [attributeName, attribute] of Object.entries(this.schema.config)) {
      this.writeAttribute(attribute, attributeName);
    }
    this.dept--;
    this.write("}");

    this.dept--;
    this.write("}");
  }

  private writeAttribute(
    attribute: string | AttributeConfig,
    attributeName: string
  ) {
    if (typeof attribute === "string") {
      this.write(`${attributeName}: "${attribute}";`);
    } else if (!(attribute instanceof Object)) {
      this.write(`${attributeName}: ${attribute};`);
    } else if (
      !("valType" in attribute) &&
      (attributeName === "xaxis" ||
        attributeName === "yaxis" ||
        attributeName === "zaxis")
    ) {
      this.write(`${attributeName}?: PlotlyAxis;`);
    } else if ("valType" in attribute) {
      this.write(`/**`);
      if (attribute.description !== undefined)
        this.write(`* ${attribute.description}`);
      this.write(`* Plotly @type: ${attribute.valType}`);
      if (attribute.dflt !== undefined)
        this.write(`* @default: '${attribute.dflt}'`);
      this.write(`*/`);
      const type = this.getType(attribute);
      this.write(`${attributeName}?: ${type};`);
    } else {
      this.write(`${attributeName}?: {`);
      this.dept++;
      for (let [attributeName2, attribute2] of Object.entries(attribute)) {
        this.writeAttribute(attribute2, attributeName2);
      }
      this.dept--;
      this.write(`}`);
    }
  }

  getType(attr: AttributeConfig) {
    switch (attr.valType) {
      case ValType.Any:
        return "any";
      case ValType.Angle:
        return "number";
      case ValType.Boolean:
        return "boolean";
      case ValType.Color:
        return "string";
      case ValType.Colorlist:
        return "string[]";
      case ValType.Colorscale:
        return "plotly.types.PlotlyColorScale";
      case ValType.DataArray:
        return "any[]";
      case ValType.Enumerated:
        let s = "";
        for (let v in attr.values) {
          s += v + " | ";
        }
        return s.slice(0, s.length - 3);
      case ValType.Flaglist:
        let s1 = "";
        for (let v in attr.flags) {
          s1 += v + " | ";
        }
        return s1 + "string";
      case ValType.InfoArray:
        if (attr.items === undefined) {
          return "any";
        }
        let s2 = "[";
        for (let [k, v] of Object.entries(attr.items)) {
          s2 += this.getType(v as AttributeConfig) + ",";
        }
        return s2.slice(0, s2.length - 1) + "]";
      case ValType.Integer:
        return "number";
      case ValType.Number:
        return "number";
      case ValType.String:
        return "string";
      case ValType.Subplotid:
        return "string";
      default:
        console.log("Misssing valType:", attr.valType, attr);
    }
  }

  write(s: string) {
    for (let i = 0; i < this.dept; i++) {
      s = "  " + s;
    }
    this.writer.write(s + "\n");
  }
}
