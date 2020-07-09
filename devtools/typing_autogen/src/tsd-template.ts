export function moduleStart(moduleName: string) {
  return `declare module ${moduleName} {`;
}

export function moduleEnd() {
  return "}";
}

export function interfaceStart(
  interfaceName: string,
  extendsFrom: string = null
) {
  let result = `export interface ${interfaceName}`;
  if (extendsFrom) result += ` extends ${extendsFrom}`;
  return `${result} {`;
}

export function interfaceEnd() {
  return "}";
}
