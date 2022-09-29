import { fileURLToPath } from "url";
import load from '@proload/core'
/**
 * Adapted from astro's astro-i18nex integration:
 * https://github.com/yassinedoghri/astro-i18next/tree/main
 */
export async function getUserConfig(root: URL, configPath?: string): Promise<any>{
  const resolvedRoot = fileURLToPath(new URL(root.href).href)
  let userConfigPath: string | undefined;
	if (configPath) {
		const configPathWithLeadingSlash = /^\.*\//.test(configPath) ? configPath : `./${configPath}`;
		userConfigPath = fileURLToPath(new URL(configPathWithLeadingSlash, root));
	}
  const astro = 'astro.i18n'
	return await load(astro, { mustExist: false, cwd: resolvedRoot, filePath: userConfigPath });
}
/**
 * Adapted from astro's astro-i18nex integration:
 * https://github.com/yassinedoghri/astro-i18next/blob/beta/src/utils.ts
 */
export const deeplyStringifyObject = (obj: Record<any,any>): string => {
  const isArray = Array.isArray(obj);
  let str = isArray ? "[" : "{";
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      continue;
    }

    let value = null;

    // see typeof result: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description
    switch (typeof obj[key]) {
      case "string": {
        value = `"${obj[key]}"`;
        break;
      }
      case "number":
      case "boolean": {
        value = obj[key];
        break;
      }
      case "object": {
        value = deeplyStringifyObject(obj[key]);
        break;
      }
      case "function": {
        value = obj[key].toString().replace(/\s+/g, " ");
        break;
      }
      case "symbol": {
        value = `Symbol("${obj[key].description}")`;
        break;
      }
      /* c8 ignore start */
      default:
        break;
      /* c8 ignore stop */
    }

    str += isArray ? `${value},` : `"${key}": ${value},`;
  }
  return `${str}${isArray ? "]" : "}"}`;
};