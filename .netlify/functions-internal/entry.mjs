import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { defineComponent, h, createSSRApp, ref, onMounted, watch, mergeProps, useSSRContext, unref, withCtx, createVNode as createVNode$1, renderSlot as renderSlot$1, createTextVNode, toDisplayString, openBlock, createBlock, Fragment as Fragment$1, renderList } from 'vue';
import { renderToString as renderToString$1, ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { escape } from 'html-escaper';
import mime from 'mime';
import sharp$1 from 'sharp';
/* empty css                                         */import i18next, { changeLanguage, t } from 'i18next';
/* empty css                                */import { MenuItem, Menu, MenuButton, TransitionRoot, MenuItems } from '@headlessui/vue';
import { UnTyper } from 'untyper';
import 'kleur/colors';
import 'node:fs/promises';
import 'node:os';
import { extname } from 'node:path';
import 'node:url';
import 'magic-string';
import 'node:stream';
import 'slash';
import 'image-size';
/* empty css                                */import 'cookie';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

const setup = () => {};

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * This is the Vue + JSX equivalent of using `<div v-html="value" />`
 */
const StaticHtml = defineComponent({
	props: {
		value: String,
		name: String,
	},
	setup({ name, value }) {
		if (!value) return () => null;
		return () => h('astro-slot', { name, innerHTML: value });
	},
});

function check$1(Component) {
	return !!Component['ssrRender'] || !!Component['__ssrInlineRender'];
}

async function renderToStaticMarkup$1(Component, props, slotted) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		slots[key] = () => h(StaticHtml, { value, name: key === 'default' ? undefined : key });
	}
	const app = createSSRApp({ render: () => h(Component, props, slots) });
	await setup();
	const html = await renderToString$1(app);
	return { html };
}

const _renderer1 = {
	check: check$1,
	renderToStaticMarkup: renderToStaticMarkup$1,
};

function baseCreateComponent(cb, moduleId) {
  cb.isAstroComponentFactory = true;
  cb.moduleId = moduleId;
  return cb;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId);
  cb.propagation = opts.propagation;
  return cb;
}
function createComponent(arg1, moduleId) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId);
  } else {
    return createComponentWithOptions(arg1);
  }
}

const ASTRO_VERSION = "1.9.2";

function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLString extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const headAndContentSym = Symbol.for("astro.headAndContent");
function isHeadAndContent(obj) {
  return typeof obj === "object" && !!obj[headAndContentSym];
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}
function isPromise(value) {
  return !!value && typeof value === "object" && typeof value.then === "function";
}

var _a$2;
const renderTemplateResultSym = Symbol.for("astro.renderTemplateResult");
class RenderTemplateResult {
  constructor(htmlParts, expressions) {
    this[_a$2] = true;
    this.htmlParts = htmlParts;
    this.error = void 0;
    this.expressions = expressions.map((expression) => {
      if (isPromise(expression)) {
        return Promise.resolve(expression).catch((err) => {
          if (!this.error) {
            this.error = err;
            throw err;
          }
        });
      }
      return expression;
    });
  }
  get [(_a$2 = renderTemplateResultSym, Symbol.toStringTag)]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isRenderTemplateResult(obj) {
  return typeof obj === "object" && !!obj[renderTemplateResultSym];
}
async function* renderAstroTemplateResult(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
function renderTemplate(htmlParts, ...expressions) {
  return new RenderTemplateResult(htmlParts, expressions);
}

function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
async function renderToString(result, componentFactory, props, children) {
  const factoryResult = await componentFactory(result, props, children);
  if (factoryResult instanceof Response) {
    const response = factoryResult;
    throw response;
  }
  let parts = new HTMLParts();
  const templateResult = isHeadAndContent(factoryResult) ? factoryResult.content : factoryResult;
  for await (const chunk of renderAstroTemplateResult(templateResult)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
function isAPropagatingComponent(result, factory) {
  let hint = factory.propagation || "none";
  if (factory.moduleId && result.propagation.has(factory.moduleId) && hint === "none") {
    hint = result.propagation.get(factory.moduleId);
  }
  return hint === "in-tree" || hint === "self";
}

const defineErrors = (errs) => errs;
const AstroErrorData = defineErrors({
  UnknownCompilerError: {
    title: "Unknown compiler error.",
    code: 1e3
  },
  StaticRedirectNotAvailable: {
    title: "`Astro.redirect` is not available in static mode.",
    code: 3001,
    message: "Redirects are only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
  },
  ClientAddressNotAvailable: {
    title: "`Astro.clientAddress` is not available in current adapter.",
    code: 3002,
    message: (adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`
  },
  StaticClientAddressNotAvailable: {
    title: "`Astro.clientAddress` is not available in static mode.",
    code: 3003,
    message: "`Astro.clientAddress` is only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
  },
  NoMatchingStaticPathFound: {
    title: "No static path found for requested path.",
    code: 3004,
    message: (pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`,
    hint: (possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`
  },
  OnlyResponseCanBeReturned: {
    title: "Invalid type returned by Astro page.",
    code: 3005,
    message: (route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
  },
  MissingMediaQueryDirective: {
    title: "Missing value for `client:media` directive.",
    code: 3006,
    message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
  },
  NoMatchingRenderer: {
    title: "No matching renderer found.",
    code: 3007,
    message: (componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are." : "is."} ${validRenderersCount} renderer${plural ? "s." : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were." : "it was not."} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`,
    hint: (probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.`
  },
  NoClientEntrypoint: {
    title: "No client entrypoint specified in renderer.",
    code: 3008,
    message: (componentName, clientDirective, rendererName) => `\`${componentName}\` component has a \`client:${clientDirective}\` directive, but no client entrypoint was provided by \`${rendererName}\`.`,
    hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
  },
  NoClientOnlyHint: {
    title: "Missing hint on client:only directive.",
    code: 3009,
    message: (componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
    hint: (probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
  },
  InvalidGetStaticPathParam: {
    title: "Invalid value returned by a `getStaticPaths` path.",
    code: 3010,
    message: (paramType) => `Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${paramType}\``,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  InvalidGetStaticPathsReturn: {
    title: "Invalid value returned by getStaticPaths.",
    code: 3011,
    message: (returnType) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${returnType}\``,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsRemovedRSSHelper: {
    title: "getStaticPaths RSS helper is not available anymore.",
    code: 3012,
    message: "The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.",
    hint: "See https://docs.astro.build/en/guides/rss/ for more information."
  },
  GetStaticPathsExpectedParams: {
    title: "Missing params property on `getStaticPaths` route.",
    code: 3013,
    message: "Missing or empty required `params` property on `getStaticPaths` route.",
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsInvalidRouteParam: {
    title: "Invalid value for `getStaticPaths` route parameter.",
    code: 3014,
    message: (key, value, valueType) => `Invalid getStaticPaths route parameter for \`${key}\`. Expected undefined, a string or a number, received \`${valueType}\` (\`${value}\`)`,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsRequired: {
    title: "`getStaticPaths()` function required for dynamic routes.",
    code: 3015,
    message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
    hint: `See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.

Alternatively, set \`output: "server"\` in your Astro config file to switch to a non-static server build.
See https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.`
  },
  ReservedSlotName: {
    title: "Invalid slot name.",
    code: 3016,
    message: (slotName) => `Unable to create a slot named \`${slotName}\`. \`${slotName}\` is a reserved slot name. Please update the name of this slot.`
  },
  NoAdapterInstalled: {
    title: "Cannot use Server-side Rendering without an adapter.",
    code: 3017,
    message: `Cannot use \`output: 'server'\` without an adapter. Please install and configure the appropriate server adapter for your final deployment.`,
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information."
  },
  NoMatchingImport: {
    title: "No import found for component.",
    code: 3018,
    message: (componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`,
    hint: "Please make sure the component is properly imported."
  },
  InvalidPrerenderExport: {
    title: "Invalid prerender export.",
    code: 3019,
    message: (prefix, suffix) => {
      let msg = `A \`prerender\` export has been detected, but its value cannot be statically analyzed.`;
      if (prefix !== "const")
        msg += `
Expected \`const\` declaration but got \`${prefix}\`.`;
      if (suffix !== "true")
        msg += `
Expected \`true\` value but got \`${suffix}\`.`;
      return msg;
    },
    hint: "Mutable values declared at runtime are not supported. Please make sure to use exactly `export const prerender = true`."
  },
  UnknownViteError: {
    title: "Unknown Vite Error.",
    code: 4e3
  },
  FailedToLoadModuleSSR: {
    title: "Could not import file.",
    code: 4001,
    message: (importName) => `Could not import \`${importName}\`.`,
    hint: "This is often caused by a typo in the import path. Please make sure the file exists."
  },
  InvalidGlob: {
    title: "Invalid glob pattern.",
    code: 4002,
    message: (globPattern) => `Invalid glob pattern: \`${globPattern}\`. Glob patterns must start with './', '../' or '/'.`,
    hint: "See https://docs.astro.build/en/guides/imports/#glob-patterns for more information on supported glob patterns."
  },
  UnknownCSSError: {
    title: "Unknown CSS Error.",
    code: 5e3
  },
  CSSSyntaxError: {
    title: "CSS Syntax Error.",
    code: 5001
  },
  UnknownMarkdownError: {
    title: "Unknown Markdown Error.",
    code: 6e3
  },
  MarkdownFrontmatterParseError: {
    title: "Failed to parse Markdown frontmatter.",
    code: 6001
  },
  MarkdownContentSchemaValidationError: {
    title: "Content collection frontmatter invalid.",
    code: 6002,
    message: (collection, entryId, error) => {
      return [
        `${String(collection)} \u2192 ${String(entryId)} frontmatter does not match collection schema.`,
        ...error.errors.map((zodError) => zodError.message)
      ].join("\n");
    },
    hint: "See https://docs.astro.build/en/guides/content-collections/ for more information on content schemas."
  },
  UnknownConfigError: {
    title: "Unknown configuration error.",
    code: 7e3
  },
  ConfigNotFound: {
    title: "Specified configuration file not found.",
    code: 7001,
    message: (configFile) => `Unable to resolve \`--config "${configFile}"\`. Does the file exist?`
  },
  ConfigLegacyKey: {
    title: "Legacy configuration detected.",
    code: 7002,
    message: (legacyConfigKey) => `Legacy configuration detected: \`${legacyConfigKey}\`.`,
    hint: "Please update your configuration to the new format.\nSee https://astro.build/config for more information."
  },
  UnknownCLIError: {
    title: "Unknown CLI Error.",
    code: 8e3
  },
  GenerateContentTypesError: {
    title: "Failed to generate content types.",
    code: 8001,
    message: "`astro sync` command failed to generate content collection types.",
    hint: "Check your `src/content/config.*` file for typos."
  },
  UnknownError: {
    title: "Unknown Error.",
    code: 99999
  }
});

function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}
function getErrorDataByCode(code) {
  const entry = Object.entries(AstroErrorData).find((data) => data[1].code === code);
  if (entry) {
    return {
      name: entry[0],
      data: entry[1]
    };
  }
}

function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) {
    return "";
  }
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n = -2; n <= 2; n++) {
    if (lines[loc.line + n])
      visibleLines.push(loc.line + n);
  }
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w = `> ${lineNo}`;
    if (w.length > gutterWidth)
      gutterWidth = w.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine)
      output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({
        length: loc.column
      }).join(" ")}^
`;
  }
  return output;
}

class AstroError extends Error {
  constructor(props, ...params) {
    var _a;
    super(...params);
    this.type = "AstroError";
    const { code, name, title, message, stack, location, hint, frame } = props;
    this.errorCode = code;
    if (name && name !== "Error") {
      this.name = name;
    } else {
      this.name = ((_a = getErrorDataByCode(this.errorCode)) == null ? void 0 : _a.name) ?? "UnknownError";
    }
    this.title = title;
    if (message)
      this.message = message;
    this.stack = stack ? stack : this.stack;
    this.loc = location;
    this.hint = hint;
    this.frame = frame;
  }
  setErrorCode(errorCode) {
    this.errorCode = errorCode;
  }
  setLocation(location) {
    this.loc = location;
  }
  setName(name) {
    this.name = name;
  }
  setMessage(message) {
    this.message = message;
  }
  setHint(hint) {
    this.hint = hint;
  }
  setFrame(source, location) {
    this.frame = codeFrame(source, location);
  }
  static is(err) {
    return err.type === "AstroError";
  }
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(displayName, inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new AstroError(AstroErrorData.MissingMediaQueryDirective);
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

var _a$1;
const astroComponentInstanceSym = Symbol.for("astro.componentInstance");
class AstroComponentInstance {
  constructor(result, props, slots, factory) {
    this[_a$1] = true;
    this.result = result;
    this.props = props;
    this.factory = factory;
    this.slotValues = {};
    for (const name in slots) {
      this.slotValues[name] = slots[name]();
    }
  }
  async init() {
    this.returnValue = this.factory(this.result, this.props, this.slotValues);
    return this.returnValue;
  }
  async *render() {
    if (this.returnValue === void 0) {
      await this.init();
    }
    let value = this.returnValue;
    if (isPromise(value)) {
      value = await value;
    }
    if (isHeadAndContent(value)) {
      yield* value.content;
    } else {
      yield* renderChild(value);
    }
  }
}
_a$1 = astroComponentInstanceSym;
function validateComponentProps(props, displayName) {
  if (props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
function createAstroComponentInstance(result, displayName, factory, props, slots = {}) {
  validateComponentProps(props, displayName);
  const instance = new AstroComponentInstance(result, props, slots, factory);
  if (isAPropagatingComponent(result, factory) && !result.propagators.has(factory)) {
    result.propagators.set(factory, instance);
  }
  return instance;
}
function isAstroComponentInstance(obj) {
  return typeof obj === "object" && !!obj[astroComponentInstanceSym];
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (isHTMLString(child)) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (isRenderTemplateResult(child)) {
    yield* renderAstroTemplateResult(child);
  } else if (isAstroComponentInstance(child)) {
    yield* child.render();
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}

const slotString = Symbol.for("astro:slot-string");
class SlotString extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
    this[slotString] = true;
  }
}
function isSlotString(str) {
  return !!str[slotString];
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  return fallback;
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      if (isSlotString(chunk)) {
        let out = "";
        const c = chunk;
        if (c.instructions) {
          for (const instr of c.instructions) {
            out += stringifyChunk(result, instr);
          }
        }
        out += chunk.toString();
        return out;
      }
      return chunk.toString();
    }
  }
}
class HTMLParts {
  constructor() {
    this.parts = "";
  }
  append(part, result) {
    if (ArrayBuffer.isView(part)) {
      this.parts += decoder.decode(part);
    } else {
      this.parts += stringifyChunk(result, part);
    }
  }
  toString() {
    return this.parts;
  }
  toArrayBuffer() {
    return encoder.encode(this.parts);
  }
}

const ClientOnlyPlaceholder = "astro-client-only";
class Skip {
  constructor(vnode) {
    this.vnode = vnode;
    this.count = 0;
  }
  increment() {
    this.count++;
  }
  haveNoTried() {
    return this.count === 0;
  }
  isCompleted() {
    return this.count > 2;
  }
}
Skip.symbol = Symbol("astro:jsx:skip");
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  let skip;
  if (vnode.props) {
    if (vnode.props[Skip.symbol]) {
      skip = vnode.props[Skip.symbol];
    } else {
      skip = new Skip(vnode);
    }
  } else {
    skip = new Skip(vnode);
  }
  return renderJSXVNode(result, vnode, skip);
}
async function renderJSXVNode(result, vnode, skip) {
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement$1(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skip.increment();
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function") {
        if (skip.haveNoTried() || skip.isCompleted()) {
          useConsoleFilter();
          try {
            const output2 = await vnode.type(vnode.props ?? {});
            let renderResult;
            if (output2 && output2[AstroJSX]) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            } else if (!output2) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            }
          } catch (e) {
            if (skip.isCompleted()) {
              throw e;
            }
            skip.increment();
          } finally {
            finishUsingConsoleFilter();
          }
        } else {
          skip.increment();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      props[Skip.symbol] = skip;
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponentToIterable(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponentToIterable(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement$1(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid", "@astrojs/vue (jsx)"];
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid",
        "@astrojs/vue",
        "@astrojs/svelte"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment;
}
function isHTMLComponent(Component) {
  return Component && typeof Component === "object" && Component["astro:html"];
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  var _a, _b;
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(displayName, _props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers.filter((r) => r.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && validRenderers.length === 1) {
      renderer = validRenderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new AstroError({
        ...AstroErrorData.NoClientOnlyHint,
        message: AstroErrorData.NoClientOnlyHint.message(metadata.displayName),
        hint: AstroErrorData.NoClientOnlyHint.hint(
          probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")
        )
      });
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter(
        (r) => probableRendererNames.includes(r.name)
      );
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new AstroError({
          ...AstroErrorData.NoMatchingRenderer,
          message: AstroErrorData.NoMatchingRenderer.message(
            metadata.displayName,
            (_b = metadata == null ? void 0 : metadata.componentUrl) == null ? void 0 : _b.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: AstroErrorData.NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r) => "`" + r + "`"))
          )
        });
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new AstroError({
      ...AstroErrorData.NoClientEntrypoint,
      message: AstroErrorData.NoClientEntrypoint.message(
        displayName,
        metadata.hydrate,
        renderer.name
      )
    });
  }
  if (!html && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroTemplateResult(
      await renderTemplate`<${Tag}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    return async function* () {
      if (slotInstructions) {
        yield* slotInstructions;
      }
      if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
        yield html;
      } else {
        yield markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
      }
    }();
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement("astro-island", island, false));
  }
  return renderAll();
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/g;
  if (!unsafe.test(tag))
    return tag;
  return tag.trim().split(unsafe)[0].trim();
}
async function renderFragmentComponent(result, slots = {}) {
  const children = await renderSlot(result, slots == null ? void 0 : slots.default);
  if (children == null) {
    return children;
  }
  return markHTMLString(children);
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html = Component.render({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => stringifyChunk(result, instr)).join("") : "";
  return markHTMLString(hydrationHtml + html);
}
function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isPromise(Component)) {
    return Promise.resolve(Component).then((Unwrapped) => {
      return renderComponent(result, displayName, Unwrapped, props, slots);
    });
  }
  if (isFragmentComponent(Component)) {
    return renderFragmentComponent(result, slots);
  }
  if (isHTMLComponent(Component)) {
    return renderHTMLComponent(result, Component, props, slots);
  }
  if (isAstroComponentFactory(Component)) {
    return createAstroComponentInstance(result, displayName, Component, props, slots);
  }
  return renderFrameworkComponent(result, displayName, Component, props, slots);
}
function renderComponentToIterable(result, displayName, Component, props, slots = {}) {
  const renderResult = renderComponent(result, displayName, Component, props, slots);
  if (isAstroComponentInstance(renderResult)) {
    return renderResult.render();
  }
  return renderResult;
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
async function* renderExtraHead(result, base) {
  yield base;
  for (const part of result.extraHead) {
    yield* renderChild(part);
  }
}
function renderAllHeadContent(result) {
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement("link", link, false));
  const baseHeadContent = markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
  if (result.extraHead.length > 0) {
    return renderExtraHead(result, baseHeadContent);
  } else {
    return baseHeadContent;
  }
}
function createRenderHead(result) {
  result._metadata.hasRenderedHead = true;
  return renderAllHeadContent.bind(null, result);
}
const renderHead = createRenderHead;
async function* maybeRenderHead(result) {
  if (result._metadata.hasRenderedHead) {
    return;
  }
  yield createRenderHead(result)();
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (slotAttr) => slotAttr;
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

function isOutputFormat(value) {
  return ["avif", "jpeg", "png", "webp"].includes(value);
}
function isOutputFormatSupportsAlpha(value) {
  return ["avif", "png", "webp"].includes(value);
}
function isAspectRatioString(value) {
  return /^\d*:\d*$/.test(value);
}
function parseAspectRatio(aspectRatio) {
  if (!aspectRatio) {
    return void 0;
  }
  if (typeof aspectRatio === "number") {
    return aspectRatio;
  } else {
    const [width, height] = aspectRatio.split(":");
    return parseInt(width) / parseInt(height);
  }
}
function isSSRService(service) {
  return "transform" in service;
}

class SharpService {
  async getImageAttributes(transform) {
    const { width, height, src, format, quality, aspectRatio, fit, position, background, ...rest } = transform;
    return {
      ...rest,
      width,
      height
    };
  }
  serializeTransform(transform) {
    const searchParams = new URLSearchParams();
    if (transform.quality) {
      searchParams.append("q", transform.quality.toString());
    }
    if (transform.format) {
      searchParams.append("f", transform.format);
    }
    if (transform.width) {
      searchParams.append("w", transform.width.toString());
    }
    if (transform.height) {
      searchParams.append("h", transform.height.toString());
    }
    if (transform.aspectRatio) {
      searchParams.append("ar", transform.aspectRatio.toString());
    }
    if (transform.fit) {
      searchParams.append("fit", transform.fit);
    }
    if (transform.background) {
      searchParams.append("bg", transform.background);
    }
    if (transform.position) {
      searchParams.append("p", encodeURI(transform.position));
    }
    return { searchParams };
  }
  parseTransform(searchParams) {
    let transform = { src: searchParams.get("href") };
    if (searchParams.has("q")) {
      transform.quality = parseInt(searchParams.get("q"));
    }
    if (searchParams.has("f")) {
      const format = searchParams.get("f");
      if (isOutputFormat(format)) {
        transform.format = format;
      }
    }
    if (searchParams.has("w")) {
      transform.width = parseInt(searchParams.get("w"));
    }
    if (searchParams.has("h")) {
      transform.height = parseInt(searchParams.get("h"));
    }
    if (searchParams.has("ar")) {
      const ratio = searchParams.get("ar");
      if (isAspectRatioString(ratio)) {
        transform.aspectRatio = ratio;
      } else {
        transform.aspectRatio = parseFloat(ratio);
      }
    }
    if (searchParams.has("fit")) {
      transform.fit = searchParams.get("fit");
    }
    if (searchParams.has("p")) {
      transform.position = decodeURI(searchParams.get("p"));
    }
    if (searchParams.has("bg")) {
      transform.background = searchParams.get("bg");
    }
    return transform;
  }
  async transform(inputBuffer, transform) {
    const sharpImage = sharp$1(inputBuffer, { failOnError: false, pages: -1 });
    sharpImage.rotate();
    if (transform.width || transform.height) {
      const width = transform.width && Math.round(transform.width);
      const height = transform.height && Math.round(transform.height);
      sharpImage.resize({
        width,
        height,
        fit: transform.fit,
        position: transform.position,
        background: transform.background
      });
    }
    if (transform.format) {
      sharpImage.toFormat(transform.format, { quality: transform.quality });
      if (transform.background && !isOutputFormatSupportsAlpha(transform.format)) {
        sharpImage.flatten({ background: transform.background });
      }
    }
    const { data, info } = await sharpImage.toBuffer({ resolveWithObject: true });
    return {
      data,
      format: info.format
    };
  }
}
const service = new SharpService();
var sharp_default = service;

const sharp = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: sharp_default
}, Symbol.toStringTag, { value: 'Module' }));

const fnv1a52 = (str) => {
  const len = str.length;
  let i = 0, t0 = 0, v0 = 8997, t1 = 0, v1 = 33826, t2 = 0, v2 = 40164, t3 = 0, v3 = 52210;
  while (i < len) {
    v0 ^= str.charCodeAt(i++);
    t0 = v0 * 435;
    t1 = v1 * 435;
    t2 = v2 * 435;
    t3 = v3 * 435;
    t2 += v0 << 8;
    t3 += v1 << 8;
    t1 += t0 >>> 16;
    v0 = t0 & 65535;
    t2 += t1 >>> 16;
    v1 = t1 & 65535;
    v3 = t3 + (t2 >>> 16) & 65535;
    v2 = t2 & 65535;
  }
  return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
};
const etag = (payload, weak = false) => {
  const prefix = weak ? 'W/"' : '"';
  return prefix + fnv1a52(payload).toString(36) + payload.length.toString(36) + '"';
};

function isRemoteImage(src) {
  return /^http(s?):\/\//.test(src);
}

async function loadRemoteImage(src) {
  try {
    const res = await fetch(src);
    if (!res.ok) {
      return void 0;
    }
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return void 0;
  }
}
const get = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const transform = sharp_default.parseTransform(url.searchParams);
    let inputBuffer = void 0;
    const sourceUrl = isRemoteImage(transform.src) ? new URL(transform.src) : new URL(transform.src, url.origin);
    inputBuffer = await loadRemoteImage(sourceUrl);
    if (!inputBuffer) {
      return new Response("Not Found", { status: 404 });
    }
    const { data, format } = await sharp_default.transform(inputBuffer, transform);
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": mime.getType(format) || "",
        "Cache-Control": "public, max-age=31536000",
        ETag: etag(data.toString()),
        Date: new Date().toUTCString()
      }
    });
  } catch (err) {
    return new Response(`Server Error: ${err}`, { status: 500 });
  }
};

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	get
}, Symbol.toStringTag, { value: 'Module' }));

i18next.init({"debug": false,"supportedLngs": ["en","zh",],"fallbackLng": ["en","zh",],"resources": {"en": {"translation": {"seo": {"title": "i18next hello","description": "astro-i18next is an astro integration of i18next + some utility components to help you translate your astro websites!","ogTitle": "astro-i18next | Translate your Astro website with i18next!","ogImageAlt": "A test tube placed on the lower left corner spreading out the astro-i18next text with bubbles and country flags.",},"website": {"project": "Project","linehtml": "this is game<0>p</0><1>span</1>","blog": "Blog","source": "Source","rights": "All rights reserved.",},},},"zh": {"translation": {"seo": {"title": "i18next 你好","description": "这里是中文","ogTitle": "这里是标题","ogImageAlt": "这里是图片的说明",},"website": {"project": "项目","linehtml": "这是一个场游戏<0>p标签</0><1>span标签</1>","blog": "博客","source": "源码","rights": "版权所有.",},},},},});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$g = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/BaseHead.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const { title, description, image = "/placeholder-social.jpg" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<!-- Global Metadata --><meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n<meta name="generator"', ">\n\n<!-- Primary Meta Tags -->\n<title>", '</title>\n<meta name="title"', '>\n<meta name="description"', '>\n\n<!-- Open Graph / Facebook -->\n<meta property="og:type" content="website">\n<meta property="og:url"', '>\n<meta property="og:title"', '>\n<meta property="og:description"', '>\n<meta property="og:image"', '>\n\n<!-- Twitter -->\n<meta property="twitter:card" content="summary_large_image">\n<meta property="twitter:url"', '>\n<meta property="twitter:title"', '>\n<meta property="twitter:description"', '>\n<meta property="twitter:image"', ">\n\n\n\n<script>\n	const theme = (() => {\n		if(typeof localStorage !== 'undefined' && localStorage.getItem('theme')){\n			return localStorage.getItem('theme')\n		}\n		if(window.matchMedia('(prefers-color-scheme: dark)').matches) {\n			return 'dark'\n		}\n		return 'light'\n	})()\n	\n	if(theme === 'light'){\n		document.documentElement.classList.remove('dark')\n	} else {\n		document.documentElement.classList.add('dark')\n	}\n<\/script>\n"])), addAttribute(Astro2.generator, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"));
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/BaseHead.astro");

const $$Astro$f = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/HeaderLink.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$HeaderLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { href, class: className, ...props } = Astro2.props;
  const isActive = href === Astro2.url.pathname.replace(/\/$/, "");
  return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute([[className, { "underline underline-offset-4 hover:text-emerald-500 decoration-emerald-500": isActive }], "astro-7XQGHKSX"], "class:list")}${spreadAttributes(props)}>
	${renderSlot($$result, $$slots["default"])}
</a>
`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/HeaderLink.astro");

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ThemeToggleButton",
  __ssrInlineRender: true,
  setup(__props) {
    const isMounted = ref(false);
    const themes = ref(["light", "dark"]);
    const theme = ref(null);
    const setTheme = async (themeStatus) => {
      const themsStatus = async () => {
        {
          return void 0;
        }
      };
      theme.value = themeStatus || await themsStatus();
    };
    onMounted(async () => {
      await setTheme();
      isMounted.value = true;
    });
    watch(theme, (themeNew) => {
      const root = document && document.documentElement;
      if (themeNew === "light") {
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (isMounted.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ className: "inline-flex items-center p-[1px] rounded-3xl bg-orange-300 dark:bg-zinc-600" }, _attrs))}><!--[-->`);
        ssrRenderList(themes.value, (item, index) => {
          _push(`<button aria-label="Toggle theme" class="${ssrRenderClass([
            {
              "bg-white text-black": theme.value === item ? true : false
            },
            "cursor-pointer",
            "rounded-3xl",
            "p-2"
          ])}">`);
          if (item === "light") {
            _push(`<div flex i-carbon-sun></div>`);
          } else if (item === "dark") {
            _push(`<div flex i-carbon-moon></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/vue/ThemeToggleButton.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuItem",
  __ssrInlineRender: true,
  props: {
    href: { default: "" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenuItem), _attrs, {
        default: withCtx(({ active }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a class="${ssrRenderClass([
              { "bg-orange-200 dark:bg-zinc-700": active },
              "block",
              "px-4",
              "py-2",
              "text-sm"
            ])}"${ssrRenderAttr("href", props.href)}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</a>`);
          } else {
            return [
              createVNode$1("a", {
                class: [
                  { "bg-orange-200 dark:bg-zinc-700": active },
                  "block",
                  "px-4",
                  "py-2",
                  "text-sm"
                ],
                href: props.href
              }, [
                renderSlot$1(_ctx.$slots, "default")
              ], 10, ["href"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/vue/DropdownMenuItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenu",
  __ssrInlineRender: true,
  props: {
    tags: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const isShowing = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Menu), mergeProps({
        "md:hidden": "",
        onClick: ($event) => isShowing.value = !isShowing.value,
        as: "div",
        className: "relative inline-block text-left"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MenuButton), {
              className: "inline-flex justify-center rounded-md border border-zinc-400\n        dark:border-zinc-700 px-2 py-2 text-sm font-medium shadow-sm\n        hover:bg-orange-200 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500\n        focus:ring-offset-2 focus:ring-offset-gray-200 transition-all",
              "aria-label": "menu"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div i-carbon-menu aria-hidden="true"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode$1("div", {
                      "i-carbon-menu": "",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(TransitionRoot), {
              enter: "transition ease-out duration-100",
              "enter-from": "transition opacity-0 scale-95",
              "enter-to": "transition opacity-100 scale-100",
              leave: "transition ease-in duration-75",
              "leave-from": "transition opacity-100 scale-100",
              "leave-to": "transition opacity-0 scale-95"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(MenuItems), { class: "absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md border border-zinc-400 dark:border-zinc-700 bg-orange-50 dark:bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div className="py-1"${_scopeId3}><!--[-->`);
                        ssrRenderList(props.tags, (item, index) => {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_sfc_main$4, {
                            href: item.toLocaleLowerCase() === "project" ? "/projects/" + item.toLocaleLowerCase() : "/posts/" + item.toLocaleLowerCase()
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item[0].toLocaleUpperCase() + item.slice(1).toLocaleLowerCase())}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item[0].toLocaleUpperCase() + item.slice(1).toLocaleLowerCase()), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode$1("div", { className: "py-1" }, [
                            (openBlock(true), createBlock(Fragment$1, null, renderList(props.tags, (item, index) => {
                              return openBlock(), createBlock("div", { key: index }, [
                                createVNode$1(_sfc_main$4, {
                                  href: item.toLocaleLowerCase() === "project" ? "/projects/" + item.toLocaleLowerCase() : "/posts/" + item.toLocaleLowerCase()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item[0].toLocaleUpperCase() + item.slice(1).toLocaleLowerCase()), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]);
                            }), 128))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode$1(unref(MenuItems), { class: "absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md border border-zinc-400 dark:border-zinc-700 bg-orange-50 dark:bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700" }, {
                      default: withCtx(() => [
                        createVNode$1("div", { className: "py-1" }, [
                          (openBlock(true), createBlock(Fragment$1, null, renderList(props.tags, (item, index) => {
                            return openBlock(), createBlock("div", { key: index }, [
                              createVNode$1(_sfc_main$4, {
                                href: item.toLocaleLowerCase() === "project" ? "/projects/" + item.toLocaleLowerCase() : "/posts/" + item.toLocaleLowerCase()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item[0].toLocaleUpperCase() + item.slice(1).toLocaleLowerCase()), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode$1("div", null, [
                createVNode$1(unref(MenuButton), {
                  className: "inline-flex justify-center rounded-md border border-zinc-400\n        dark:border-zinc-700 px-2 py-2 text-sm font-medium shadow-sm\n        hover:bg-orange-200 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500\n        focus:ring-offset-2 focus:ring-offset-gray-200 transition-all",
                  "aria-label": "menu"
                }, {
                  default: withCtx(() => [
                    createVNode$1("div", {
                      "i-carbon-menu": "",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1
                })
              ]),
              createVNode$1(unref(TransitionRoot), {
                enter: "transition ease-out duration-100",
                "enter-from": "transition opacity-0 scale-95",
                "enter-to": "transition opacity-100 scale-100",
                leave: "transition ease-in duration-75",
                "leave-from": "transition opacity-100 scale-100",
                "leave-to": "transition opacity-0 scale-95"
              }, {
                default: withCtx(() => [
                  createVNode$1(unref(MenuItems), { class: "absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md border border-zinc-400 dark:border-zinc-700 bg-orange-50 dark:bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700" }, {
                    default: withCtx(() => [
                      createVNode$1("div", { className: "py-1" }, [
                        (openBlock(true), createBlock(Fragment$1, null, renderList(props.tags, (item, index) => {
                          return openBlock(), createBlock("div", { key: index }, [
                            createVNode$1(_sfc_main$4, {
                              href: item.toLocaleLowerCase() === "project" ? "/projects/" + item.toLocaleLowerCase() : "/posts/" + item.toLocaleLowerCase()
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item[0].toLocaleUpperCase() + item.slice(1).toLocaleLowerCase()), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]);
                        }), 128))
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/vue/DropdownMenu.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const $$Astro$e = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Header.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Header;
  const allBlogs = await Astro2.glob(/* #__PURE__ */ Object.assign({"../../pages/blog/blog-npm-pnpm.md": () => Promise.resolve().then(() => _page4),"../../pages/blog/git-untyper.md": () => Promise.resolve().then(() => _page6),"../../pages/blog/gitlab-ci-cd.md": () => Promise.resolve().then(() => _page5),"../../pages/blog/发布订阅模式.md": () => Promise.resolve().then(() => _page7)}), () => "../../pages/blog/*.md");
  const allTags = /* @__PURE__ */ new Set();
  allBlogs.sort(
    (a, b) => new Date(b.frontmatter.pubDate).valueOf() - new Date(a.frontmatter.pubDate).valueOf()
  ).map((blog) => {
    blog.frontmatter.tags && blog.frontmatter.tags.map((tag) => allTags.add(tag));
  });
  changeLanguage("en");
  return renderTemplate`${maybeRenderHead($$result)}<header class="fixed w-full p-2 z-20 backdrop-blur-md astro-4KNEVWRJ"> 
	<div class="mx-auto max-w-3xl astro-4KNEVWRJ">
	<nav class="flex items-center gap-3 text-base astro-4KNEVWRJ">
		<a href="/" class="group astro-4KNEVWRJ">
			<h2 class="font-semibold tracking-tighter p-2 font-ubuntu  text-lg m-0 astro-4KNEVWRJ">
				Songwuk
			</h2>
		</a>
		<div class="items-center gap-6 hidden md:flex astro-4KNEVWRJ">
			${Array.from(allTags).map((tag) => {
    const ti18 = `website.${tag.toLocaleLowerCase()}`;
    return renderTemplate`${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": tag.toLocaleLowerCase() === "project" ? "/projects/" + tag.toLocaleLowerCase() : "/posts/" + tag.toLocaleLowerCase(), "class": "astro-4KNEVWRJ" }, { "default": () => renderTemplate`${t(ti18)}` })}`;
  })}
			${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "https://github.com/songwuk/songwuk.cc", "target": "_blank", "class": "astro-4KNEVWRJ" }, { "default": () => renderTemplate`<div i-carbon-logo-github class="astro-4KNEVWRJ"></div>${t("website.source")}` })}
		</div>
		<div flex-1 class="astro-4KNEVWRJ"></div>
		${renderComponent($$result, "ThemeToggle", _sfc_main$5, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/ThemeToggleButton.vue", "client:component-export": "default", "class": "astro-4KNEVWRJ" })}
		<!-- <ThemeTranslations /> -->
		${renderComponent($$result, "DropdownMenu", _sfc_main$3, { "client:load": true, "tags": Array.from(allTags), "client:component-hydration": "load", "client:component-path": "/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/DropdownMenu.vue", "client:component-export": "default", "class": "astro-4KNEVWRJ" })}
	</nav>
</div>
</header>
`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Header.astro");

const $$Astro$d = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Content.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Content = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Content;
  const { className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute(`px-8 mx-auto max-w-3xl ${className}`, "class")}>
  ${renderSlot($$result, $$slots["default"])}
</article>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Content.astro");

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WriteTyperContent",
  __ssrInlineRender: true,
  props: {
    textStatus: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const languageCode = {
      "zh-CN": {
        text: '\u55E8\uFF0C\u6211\u6B63\u5728\u6210\u4E3A\u72EC\u7ACB<span style="color: rgb(253,186,116)">\u5F00\u53D1\u8005 !</span>'
      },
      "en-US": {
        text: 'Hi I&apos; becoming indie <span style="color: rgb(253,186,116)">developer !</span>'
      }
    };
    onMounted(async () => {
      const text = document.querySelector(".writetyper") || null;
      const unTyper = new UnTyper(text, { speed: 100, startDelay: 1e3 });
      if (props.textStatus) {
        const keys = Object.keys(languageCode);
        let i = 0;
        keys.forEach(async (key) => {
          i++;
          const textLine = languageCode[key].text;
          if (i === keys.length) {
            unTyper.add(textLine, { delay: 100 });
          } else {
            unTyper.add(textLine, { delay: 100 }).delete(15);
          }
        });
        unTyper.go();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "writetyper",
        "text-3xl": ""
      }, _attrs))}></div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/vue/WriteTyperContent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CanvasText",
  __ssrInlineRender: true,
  setup(__props) {
    const canvas = ref(null);
    const getBlock = ref(null);
    onMounted(() => {
      const ctx = canvas.value?.getContext("2d");
      const { clientWidth: width, clientHeight: height } = getBlock.value;
      const scale = 2;
      canvas.value.width = width * scale;
      canvas.value.height = height * scale;
      canvas.value.style.width = canvas.value.width / scale + "px";
      canvas.value.style.height = canvas.value.height / scale + "px";
      const markwidth = width * scale;
      const markHeight = height * scale;
      const bgData = Array.from(new Array(400)).map((v) => {
        return {
          x: Math.random() * markwidth,
          y: Math.random() * markHeight,
          step: Math.random() * 1 + 1
        };
      });
      const theme = (() => {
        if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
          return localStorage.getItem("theme");
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        }
        return "light";
      })();
      let fillColor = theme !== "light" ? "#ffffff" : "#000000";
      if (typeof window !== void 0) {
        const root = document.querySelector("html") || document.body;
        const observer = new MutationObserver((mutations) => {
          const attrs = getAttrs(mutations);
          if (attrs) {
            attrs.forEach((attr) => {
              if (!attr.getAttribute("class")) {
                fillColor = "#000000";
              } else {
                fillColor = "#ffffff";
              }
            });
          }
        });
        observer.observe(root, {
          childList: false,
          attributes: true,
          subtree: false
        });
      }
      const render = () => {
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.clearRect(0, 0, markwidth, markHeight);
        bgData.forEach((v) => {
          v.y = v.y > markHeight ? 0 : v.y + v.step;
          ctx.rect(v.x, v.y, 2 * scale, 2 * scale);
        });
        ctx.fill();
        requestAnimationFrame(render);
      };
      render();
    });
    function getAttrs(mutations) {
      return mutations.reduce((elemet, mutation) => {
        if (mutation.target instanceof Element) {
          if (!elemet.has(mutation.target)) {
            elemet.add(mutation.target);
          }
        }
        return elemet;
      }, /* @__PURE__ */ new Set());
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="absolute w-full h-80"></div><canvas></canvas><!--]-->`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/vue/CanvasText.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const $$Astro$c = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Masthead.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Masthead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Masthead;
  return renderTemplate`${maybeRenderHead($$result)}<section class="relative mb-6 h-80 flex justify-center items-center">
  <div class="absolute w-full h-full overflow-hidden">
    <img class="absolute h-auto left-1/2 top-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-50" src="/placeholder-about.jpg">
    ${renderComponent($$result, "CanavsText", _sfc_main$1, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/CanvasText.vue", "client:component-export": "default" })}
  </div>
  <div class="z-10 text-center px-8 drop-shadow-lg shadow-black m-t-15">
    <div class="text-4xl font-ubuntu font-medium pagetyper">
      ${renderComponent($$result, "WriteTyper", _sfc_main$2, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/WriteTyperContent.vue", "client:component-export": "default" })}
    </div>
  </div>
</section>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Masthead.astro");

const SITE_TITLE = "Songwuk - Homepage";
const SITE_DESCRIPTION = "Welcome to my website!";
const HOMEPAGE_URL = "https://www.songwuk.cc";

const $$Astro$b = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Footer.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Footer;
  const today = new Date();
  return renderTemplate`${maybeRenderHead($$result)}<footer class="text-zinc-500 p-4 text-center fixed left-0 right-0 bottom-0 mt10">
	&copy; ${today.getFullYear()} <a${addAttribute(HOMEPAGE_URL, "href")}>Songwuk </a>All rights reserved.
</footer>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Footer.astro");

const $$Astro$a = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Body.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Body = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Body;
  return renderTemplate`${maybeRenderHead($$result)}<body class="bg-orange-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300 breck-words leading-6 transition-colors duration-500">
  ${renderSlot($$result, $$slots["default"])}
</body>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Body.astro");

const $$Astro$9 = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/pages/index.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Index$1;
  const posts = (await Astro2.glob(/* #__PURE__ */ Object.assign({"./blog/blog-npm-pnpm.md": () => Promise.resolve().then(() => _page4),"./blog/git-untyper.md": () => Promise.resolve().then(() => _page6),"./blog/gitlab-ci-cd.md": () => Promise.resolve().then(() => _page5),"./blog/发布订阅模式.md": () => Promise.resolve().then(() => _page7)}), () => "./blog/*.{md,mdx}")).sort(
    (a, b) => new Date(b.frontmatter.pubDate).valueOf() - new Date(a.frontmatter.pubDate).valueOf()
  );
  changeLanguage("en");
  return renderTemplate`<html${addAttribute(i18next.language, "lang")}>
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}
	${renderHead($$result)}</head>
	${renderComponent($$result, "Body", $$Body, {}, { "default": () => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}<main class="pt-[56px]">
				${renderComponent($$result, "Masthead", $$Masthead, {})}
				${renderComponent($$result, "Content", $$Content, {}, { "default": () => renderTemplate`<section>
						<ul class="grid grid-cols-1 md:grid-cols-3 gap-4 md:cursor-pointer grid-text-left">
							${posts.map((post, i) => renderTemplate`<li class="flex justify-between md:text-center  md:block">
									<a${addAttribute(post.url, "href")}>
										<span>${post.frontmatter.title}</span>
										<span>${new Date(post.frontmatter.pubDate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}</span>
									</a>
								</li>`)}
						</ul>
						</section>` })}
		</main>${renderComponent($$result, "Footer", $$Footer, {})}` })}
</html>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/index.astro");

const $$file$3 = "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/index.astro";
const $$url$3 = "";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

function resolveSize(transform) {
  if (transform.width && transform.height) {
    return transform;
  }
  if (!transform.width && !transform.height) {
    throw new Error(`"width" and "height" cannot both be undefined`);
  }
  if (!transform.aspectRatio) {
    throw new Error(
      `"aspectRatio" must be included if only "${transform.width ? "width" : "height"}" is provided`
    );
  }
  let aspectRatio;
  if (typeof transform.aspectRatio === "number") {
    aspectRatio = transform.aspectRatio;
  } else {
    const [width, height] = transform.aspectRatio.split(":");
    aspectRatio = Number.parseInt(width) / Number.parseInt(height);
  }
  if (transform.width) {
    return {
      ...transform,
      width: transform.width,
      height: Math.round(transform.width / aspectRatio)
    };
  } else if (transform.height) {
    return {
      ...transform,
      width: Math.round(transform.height * aspectRatio),
      height: transform.height
    };
  }
  return transform;
}
async function resolveTransform(input) {
  if (typeof input.src === "string") {
    return resolveSize(input);
  }
  const metadata = "then" in input.src ? (await input.src).default : input.src;
  let { width, height, aspectRatio, background, format = metadata.format, ...rest } = input;
  if (!width && !height) {
    width = metadata.width;
    height = metadata.height;
  } else if (width) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    height = height || Math.round(width / ratio);
  } else if (height) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    width = width || Math.round(height * ratio);
  }
  return {
    ...rest,
    src: metadata.src,
    width,
    height,
    aspectRatio,
    format,
    background
  };
}
async function getImage(transform) {
  var _a, _b, _c;
  if (!transform.src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  let loader = (_a = globalThis.astroImage) == null ? void 0 : _a.loader;
  if (!loader) {
    const { default: mod } = await Promise.resolve().then(() => sharp).catch(() => {
      throw new Error(
        "[@astrojs/image] Builtin image loader not found. (Did you remember to add the integration to your Astro config?)"
      );
    });
    loader = mod;
    globalThis.astroImage = globalThis.astroImage || {};
    globalThis.astroImage.loader = loader;
  }
  const resolved = await resolveTransform(transform);
  const attributes = await loader.getImageAttributes(resolved);
  const isDev = (_b = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true},{SSR:true,}))) == null ? void 0 : _b.DEV;
  const isLocalImage = !isRemoteImage(resolved.src);
  const _loader = isDev && isLocalImage ? sharp_default : loader;
  if (!_loader) {
    throw new Error("@astrojs/image: loader not found!");
  }
  const { searchParams } = isSSRService(_loader) ? _loader.serializeTransform(resolved) : sharp_default.serializeTransform(resolved);
  let src;
  if (/^[\/\\]?@astroimage/.test(resolved.src)) {
    src = `${resolved.src}?${searchParams.toString()}`;
  } else {
    searchParams.set("href", resolved.src);
    src = `/_image?${searchParams.toString()}`;
  }
  if ((_c = globalThis.astroImage) == null ? void 0 : _c.addStaticImage) {
    src = globalThis.astroImage.addStaticImage(resolved);
  }
  return {
    ...attributes,
    src
  };
}

async function resolveAspectRatio({ src, aspectRatio }) {
  if (typeof src === "string") {
    return parseAspectRatio(aspectRatio);
  } else {
    const metadata = "then" in src ? (await src).default : src;
    return parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
  }
}
async function resolveFormats({ src, formats }) {
  const unique = new Set(formats);
  if (typeof src === "string") {
    unique.add(extname(src).replace(".", ""));
  } else {
    const metadata = "then" in src ? (await src).default : src;
    unique.add(extname(metadata.src).replace(".", ""));
  }
  return Array.from(unique).filter(Boolean);
}
async function getPicture(params) {
  const { src, widths, fit, position, background } = params;
  if (!src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  if (!widths || !Array.isArray(widths)) {
    throw new Error("[@astrojs/image] at least one `width` is required");
  }
  const aspectRatio = await resolveAspectRatio(params);
  if (!aspectRatio) {
    throw new Error("`aspectRatio` must be provided for remote images");
  }
  async function getSource(format) {
    const imgs = await Promise.all(
      widths.map(async (width) => {
        const img = await getImage({
          src,
          format,
          width,
          fit,
          position,
          background,
          height: Math.round(width / aspectRatio)
        });
        return `${img.src} ${width}w`;
      })
    );
    return {
      type: mime.getType(format) || format,
      srcset: imgs.join(",")
    };
  }
  const allFormats = await resolveFormats(params);
  const image = await getImage({
    src,
    width: Math.max(...widths),
    aspectRatio,
    fit,
    position,
    background,
    format: allFormats[allFormats.length - 1]
  });
  const sources = await Promise.all(allFormats.map((format) => getSource(format)));
  return {
    sources,
    image
  };
}

const $$Astro$8 = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/node_modules/.pnpm/@astrojs+image@0.7.1/node_modules/@astrojs/image/components/Image.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Image;
  const { loading = "lazy", decoding = "async", ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    warnForMissingAlt();
  }
  const attrs = await getImage(props);
  return renderTemplate`${maybeRenderHead($$result)}<img${spreadAttributes(attrs, "attrs", { "class": "astro-2UIKL63X" })}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}>

`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/node_modules/.pnpm/@astrojs+image@0.7.1/node_modules/@astrojs/image/components/Image.astro");

const $$Astro$7 = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/node_modules/.pnpm/@astrojs+image@0.7.1/node_modules/@astrojs/image/components/Picture.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Picture;
  const {
    src,
    alt,
    sizes,
    widths,
    aspectRatio,
    fit,
    background,
    position,
    formats = ["avif", "webp"],
    loading = "lazy",
    decoding = "async",
    ...attrs
  } = Astro2.props;
  if (alt === void 0 || alt === null) {
    warnForMissingAlt();
  }
  const { image, sources } = await getPicture({
    src,
    widths,
    formats,
    aspectRatio,
    fit,
    background,
    position
  });
  return renderTemplate`${maybeRenderHead($$result)}<picture${spreadAttributes(attrs, "attrs", { "class": "astro-LKJ6TF2O" })}>
	${sources.map((attrs2) => renderTemplate`<source${spreadAttributes(attrs2, "attrs", { "class": "astro-LKJ6TF2O" })}${addAttribute(sizes, "sizes")}>`)}
	<img${spreadAttributes(image, "image", { "class": "astro-LKJ6TF2O" })}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}${addAttribute(alt, "alt")}>
</picture>

`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/node_modules/.pnpm/@astrojs+image@0.7.1/node_modules/@astrojs/image/components/Picture.astro");

let altWarningShown = false;
function warnForMissingAlt() {
  if (altWarningShown === true) {
    return;
  }
  altWarningShown = true;
  console.warn(`
[@astrojs/image] "alt" text was not provided for an <Image> or <Picture> component.

A future release of @astrojs/image may throw a build error when "alt" text is missing.

The "alt" attribute holds a text description of the image, which isn't mandatory but is incredibly useful for accessibility. Set to an empty string (alt="") if the image is not a key part of the content (it's decoration or a tracking pixel).
`);
}

const $$Astro$6 = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Breadcrumb.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Breadcrumb = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Breadcrumb;
  return renderTemplate`${maybeRenderHead($$result)}<div class="my-4 flex items-center gap1">
  <a href="/" class="underfine underfine-offset-2">Index</a>
  <div class="i-material-symbols-arrow-forward-ios-rounded"></div>
  <span class="text-orange-500 font-ubuntu font-bold">${renderSlot($$result, $$slots["default"])}</span>
</div>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/components/astro/Breadcrumb.astro");

const $$Astro$5 = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/layouts/Projects.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Projects;
  Astro2.props;
  const posts = (await Astro2.glob(/* #__PURE__ */ Object.assign({"../pages/blog/blog-npm-pnpm.md": () => Promise.resolve().then(() => _page4),"../pages/blog/git-untyper.md": () => Promise.resolve().then(() => _page6),"../pages/blog/gitlab-ci-cd.md": () => Promise.resolve().then(() => _page5),"../pages/blog/发布订阅模式.md": () => Promise.resolve().then(() => _page7)}), () => "../pages/blog/*.md")).sort(
    (a, b) => new Date(b.frontmatter.createdAt).valueOf() - new Date(a.frontmatter.createdAt).valueOf()
  ).filter((item) => item.frontmatter.tags && item.frontmatter.tags.includes("Project"));
  return renderTemplate`<html lang="en">
  <head>
    ${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}
  ${renderHead($$result)}</head>
  ${renderComponent($$result, "Body", $$Body, {}, { "default": () => renderTemplate`${renderComponent($$result, "Header", $$Header, { "title": SITE_TITLE })}<main class="pt-[56px]">
      <!-- <Masthead /> -->
      ${renderComponent($$result, "Content", $$Content, {}, { "default": () => renderTemplate`${renderComponent($$result, "Breadcrumb", $$Breadcrumb, {}, { "default": () => renderTemplate`${"Project"}` })}<section>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${posts.map((post) => renderTemplate`<li class="text-center mb-4">
                  <a${addAttribute(post.url, "href")}>
                    ${renderComponent($$result, "Image", $$Image, { "class": "border border-slate-300 dark:border-zinc-700 rounded-xl", "src": post.frontmatter.heroImage, "width": 720 * 2, "aspectRatio": 2, "alt": "Thumbnail" })}
                    <div class="mt-3 text-xl font-bold">
                      ${post.frontmatter.title}
                    </div>
                    <div>${post.frontmatter.description}</div>
                  </a>
                </li>`)}
          </ul>
        </section>` })}
      ${renderComponent($$result, "Footer", $$Footer, {})}
    </main>` })}
</html>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/layouts/Projects.astro");

const $$Astro$4 = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/pages/projects/[id].astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const Astro$1 = $$Astro$4;
async function getStaticPaths$1() {
  const allPosts = await Astro$1.glob(/* #__PURE__ */ Object.assign({"../blog/blog-npm-pnpm.md": () => Promise.resolve().then(() => _page4),"../blog/git-untyper.md": () => Promise.resolve().then(() => _page6),"../blog/gitlab-ci-cd.md": () => Promise.resolve().then(() => _page5),"../blog/发布订阅模式.md": () => Promise.resolve().then(() => _page7)}), () => "../blog/*.md");
  const allTags = /* @__PURE__ */ new Set();
  allPosts.map((post) => {
    post.frontmatter.tags && post.frontmatter.tags.map((tag) => allTags.add(tag));
  });
  return Array.from(allTags).map((tag) => {
    return {
      params: { id: tag.toLowerCase() },
      props: { name: tag }
    };
  });
}
const $$id$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$id$1;
  const { name } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Projects", $$Projects, { "category": name })}`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/projects/[id].astro");

const $$file$2 = "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/projects/[id].astro";
const $$url$2 = "/projects/[id]";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getStaticPaths: getStaticPaths$1,
	default: $$id$1,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/layouts/Blog.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Blog;
  Astro2.props;
  const posts = (await Astro2.glob(/* #__PURE__ */ Object.assign({"../pages/blog/blog-npm-pnpm.md": () => Promise.resolve().then(() => _page4),"../pages/blog/git-untyper.md": () => Promise.resolve().then(() => _page6),"../pages/blog/gitlab-ci-cd.md": () => Promise.resolve().then(() => _page5),"../pages/blog/发布订阅模式.md": () => Promise.resolve().then(() => _page7)}), () => "../pages/blog/*.md")).sort(
    (a, b) => new Date(b.frontmatter.createdAt).valueOf() - new Date(a.frontmatter.createdAt).valueOf()
  ).filter((item) => item.frontmatter.tags && item.frontmatter.tags.includes("Blog"));
  return renderTemplate`<html lang="en">
  <head>
    ${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}
  ${renderHead($$result)}</head>
  ${renderComponent($$result, "Body", $$Body, {}, { "default": () => renderTemplate`${renderComponent($$result, "Header", $$Header, { "title": SITE_TITLE })}<main class="pt-[56px]">
      ${renderComponent($$result, "Masthead", $$Masthead, {})}
      ${renderComponent($$result, "Content", $$Content, {}, { "default": () => renderTemplate`${renderComponent($$result, "Breadcrumb", $$Breadcrumb, {}, { "default": () => renderTemplate`Blog` })}<section>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${posts.map((post) => renderTemplate`<li class="text-center mb-4">
                  <a${addAttribute(post.url, "href")}>
                    ${post.frontmatter.heroImage && renderTemplate`${renderComponent($$result, "Image", $$Image, { "class": "border border-slate-300 dark:border-zinc-700 rounded-xl", "src": post.frontmatter.heroImage, "width": 720 * 2, "aspectRatio": 2, "alt": "Thumbnail" })}`}
                    ${renderTemplate`<div class=" border border-slate-300 dark:border-zinc-700 rounded-xl pt5 pb9">
                        <div class="mt-3 text-xl font-bold">
                          ${post.frontmatter.title}
                        </div>
                        <div>${post.frontmatter.description}</div>
                      </div>`}
                   
                  </a>
                </li>`)}
          </ul>
        </section>` })}
      ${renderComponent($$result, "Footer", $$Footer, {})}
    </main>` })}
</html>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/layouts/Blog.astro");

const $$Astro$2 = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/pages/posts/[id].astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const Astro = $$Astro$2;
async function getStaticPaths() {
  const allPosts = await Astro.glob(/* #__PURE__ */ Object.assign({"../blog/blog-npm-pnpm.md": () => Promise.resolve().then(() => _page4),"../blog/git-untyper.md": () => Promise.resolve().then(() => _page6),"../blog/gitlab-ci-cd.md": () => Promise.resolve().then(() => _page5),"../blog/发布订阅模式.md": () => Promise.resolve().then(() => _page7)}), () => "../blog/*.md");
  const allTags = /* @__PURE__ */ new Set();
  allPosts.map((post) => {
    post.frontmatter.tags && post.frontmatter.tags.map((tag) => allTags.add(tag));
  });
  return Array.from(allTags).map((tag) => {
    return {
      params: { id: tag.toLowerCase() },
      props: { name: tag }
    };
  });
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$id;
  const { name } = Astro2.props;
  return renderTemplate`<!-- reject in => '../../layouts/Blog.astro' -->${renderComponent($$result, "Blog", $$Blog, { "category": name })}`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/posts/[id].astro");

const $$file$1 = "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/posts/[id].astro";
const $$url$1 = "/posts/[id]";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getStaticPaths,
	default: $$id,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/layouts/BlogPost.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$BlogPost = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const {
    content: { title, description, pubDate, updatedDate, heroImage }
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}
<html lang="en">
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}
	${renderHead($$result)}</head>
	${renderComponent($$result, "Body", $$Body, {}, { "default": () => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}<main class="pt-[56px]">
			${renderComponent($$result, "Content", $$Content, { "className": "pt-6" }, { "default": () => renderTemplate`<article class="mb-10">
					${heroImage && renderTemplate`<img class="border border-slate-300 dark:border-zinc-700 rounded-xl"${addAttribute(720, "width")}${addAttribute(360, "height")}${addAttribute(heroImage, "src")} alt="">`}
					<h1 class="text-3xl font-ubuntu my-1">${title}</h1>
					<div class="mb-2">${description}</div>
						${pubDate && renderTemplate`<time>${pubDate}</time>`}
						${updatedDate && renderTemplate`<div>Last updated on <time>${updatedDate}</time></div>`}
					<hr class="border-top border-zinc-400 my-4">
					${renderSlot($$result, $$slots["default"])}
					<a id="back" class="inline-flex items-center justify-start underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500 text-xl cursor-pointer my-5">
						<div class="inline-flex i-carbon-arrow-left"></div>
						back
					</a>
				</article>` })}
		</main>${renderComponent($$result, "Footer", $$Footer, {})}` })}
</html>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/layouts/BlogPost.astro");

const html$3 = "<p class=\"mb-6\"><a href=\"https://github.com/pnpm/pnpm\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\">pnpm</a>是 Node.js 的替代包管理器。 它是 npm 的直接替代品，但速度更快、效率更高。<br></p>\n<p class=\"mb-6\">为什么更高效,当你安装一个包时,他将安装到你当前所在目录上,之后我们会创建一个<code class=\"bg-zinc-300 dark:bg-black\">hard link</code>而不是复制,\n对于每个模块的每个版本我们只保存一个副本,如果你在npm中有100个使用lodash的包,磁盘中就会有100个副本，使用pnpm就可以解决臃肿的问题</p>\n<p class=\"mb-6\">因此，您在磁盘上节省了大量空间，这与项目和依赖项的数量成正比，并且安装速度要快得多！</p>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"相同的例子在pnpm中是这样的\">相同的例子在pnpm中是这样的</h3>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #c9d1d9\"></span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">├── foo</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">│   ├── node_modules</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">│   │   ├── dayjs@1.11.5 ----> Symoblic Link</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">│   ├── package.json</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">├── node_modules</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">│   ├── .pnpm</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">│   │   ├── dayjs@1.11.5</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">│   │   │   ├── node_modules -----this</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">│   ├── dayjs@1.11.5 ----> Symoblic Link</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">├── package.json</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">├── pnpm-lock.yaml</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">└── pnpm-workspace.yaml</span></span></code></pre>\n<p class=\"mb-6\">在上述中的foo包中有个<code class=\"bg-zinc-300 dark:bg-black\">dayjs</code>的库,在内部中都指向了<code class=\"bg-zinc-300 dark:bg-black\">.pnpm</code>中的<code class=\"bg-zinc-300 dark:bg-black\">dayjs</code> node_modules.\n所以在实现的时候能极大的节省硬盘的容量,在pnpm中会使所有依赖项保持平坦，使用符号链接将它们组合在一起,\n<code class=\"bg-zinc-300 dark:bg-black\">foo</code>所有已安装的软件包都不在自己的目录里,并且没有自己的 node_modules 而是在<code class=\"bg-zinc-300 dark:bg-black\">root</code>node_modules下</p>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"\"></h2>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"在npm中\">在npm中</h3>\n<p class=\"mb-6\">就会有多个<code class=\"bg-zinc-300 dark:bg-black\">dayjs</code>的node_modules的文件,无法对相同的重复利用,如果项目的依赖过多，会统一在<code class=\"bg-zinc-300 dark:bg-black\">root</code>的node_modules下\n出现,就可能会出现依赖的bug</p>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"最后\">最后</h3>\n<p class=\"mb-6\"><a href=\"https://twitter.com/xiaokedada/status/1471691763102679041/photo/1\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\">图片出处</a></p>\n<p class=\"mb-6\"><img src=\"https://pbs.twimg.com/media/FGx92b4aUAEAfn5?format=jpg&#x26;name=4096x4096\" alt=\"photo\" class=\"border border-slate-300 dark:border-zinc-700 rounded-xl mb-6\"></p>";

				const _internal$3 = {
					injectedFrontmatter: {},
				};
				const frontmatter$3 = {"layout":"../../layouts/BlogPost.astro","title":"npm vs pnpm","description":"why I use pnpm?","tags":["Blog"],"pubDate":"Oct 4, 2022","language":["zh"],"updatedDate":"Oct 5, 2022"};
				const file$3 = "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/blog/blog-npm-pnpm.md";
				const url$3 = "/blog/blog-npm-pnpm";
				function rawContent$3() {
					return "\n[pnpm](https://github.com/pnpm/pnpm)是 Node.js 的替代包管理器。 它是 npm 的直接替代品，但速度更快、效率更高。<br>\n\n为什么更高效,当你安装一个包时,他将安装到你当前所在目录上,之后我们会创建一个`hard link`而不是复制,\n对于每个模块的每个版本我们只保存一个副本,如果你在npm中有100个使用lodash的包,磁盘中就会有100个副本，使用pnpm就可以解决臃肿的问题\n\n因此，您在磁盘上节省了大量空间，这与项目和依赖项的数量成正比，并且安装速度要快得多！\n\n### 相同的例子在pnpm中是这样的\n\n```\n\n├── foo\n│   ├── node_modules\n│   │   ├── dayjs@1.11.5 ----> Symoblic Link\n│   ├── package.json\n├── node_modules\n│   ├── .pnpm\n│   │   ├── dayjs@1.11.5\n│   │   │   ├── node_modules -----this\n│   ├── dayjs@1.11.5 ----> Symoblic Link\n├── package.json\n├── pnpm-lock.yaml\n└── pnpm-workspace.yaml\n```\n\n在上述中的foo包中有个`dayjs`的库,在内部中都指向了`.pnpm`中的`dayjs` node_modules.\n所以在实现的时候能极大的节省硬盘的容量,在pnpm中会使所有依赖项保持平坦，使用符号链接将它们组合在一起,\n`foo`所有已安装的软件包都不在自己的目录里,并且没有自己的 node_modules 而是在`root`node_modules下\n##\n\n### 在npm中\n就会有多个`dayjs`的node_modules的文件,无法对相同的重复利用,如果项目的依赖过多，会统一在`root`的node_modules下\n出现,就可能会出现依赖的bug\n\n### 最后\n[图片出处](https://twitter.com/xiaokedada/status/1471691763102679041/photo/1)\n\n\n![photo](https://pbs.twimg.com/media/FGx92b4aUAEAfn5?format=jpg&name=4096x4096)\n\n\n\n\n\n";
				}
				function compiledContent$3() {
					return html$3;
				}
				function getHeadings$3() {
					return [{"depth":3,"slug":"相同的例子在pnpm中是这样的","text":"相同的例子在pnpm中是这样的"},{"depth":2,"slug":"","text":""},{"depth":3,"slug":"在npm中","text":"在npm中"},{"depth":3,"slug":"最后","text":"最后"}];
				}
				function getHeaders$3() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$3();
				}				async function Content$3() {
					const { layout, ...content } = frontmatter$3;
					content.file = file$3;
					content.url = url$3;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$3 });
					return createVNode($$BlogPost, {
									file: file$3,
									url: url$3,
									content,
									frontmatter: content,
									headings: getHeadings$3(),
									rawContent: rawContent$3,
									compiledContent: compiledContent$3,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$3[Symbol.for('astro.needsHeadRendering')] = false;

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	_internal: _internal$3,
	frontmatter: frontmatter$3,
	file: file$3,
	url: url$3,
	rawContent: rawContent$3,
	compiledContent: compiledContent$3,
	getHeadings: getHeadings$3,
	getHeaders: getHeaders$3,
	Content: Content$3,
	default: Content$3
}, Symbol.toStringTag, { value: 'Module' }));

const html$2 = "<p class=\"mb-6\">记录在windows10下安装 gitlab 并且运行成功运行gitlab-runner</p>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"1-下载-docker\">1. 下载 docker</h2>\n<ul>\n<li>windows -> <a href=\"https://docs.docker.com/desktop/install/windows-install/\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\">下载</a></li>\n<li>macos -> <a href=\"https://docs.docker.com/desktop/install/mac-install/\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\">下载</a></li>\n<li>linux -> <a href=\"https://docs.docker.com/desktop/install/linux-install/\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\">下载</a></li>\n</ul>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"2-安装-gitlab-docker-images\">2. 安装 gitlab docker images</h2>\n<p class=\"mb-6\">使用以下命令就可以安装</p>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #C9D1D9\">docker run --detach \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> --env DOCKER_HOST=tcp://docker:2376 \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> --env DOCKER_CERT_PATH=/certs/client \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> --env DOCKER_TLS_VERIFY=1 \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> --hostname gitlab.example.com \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> --publish 443:443 --publish 80:80 --publish 22:22 \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> --name gitlab \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> --restart always \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> -v gitlab-config:/etc/gitlab \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> -v gitlab-logs:/var/log/gitlab \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> -v gitlab-data:/var/opt/gitlab \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> --shm-size 256m \\</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\"> gitlab/gitlab-ee:latest</span></span></code></pre>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"注释\">注释</h3>\n<ul>\n<li><code class=\"bg-zinc-300 dark:bg-black\">--env</code> 定义环境变量的</li>\n<li><code class=\"bg-zinc-300 dark:bg-black\">--hostname</code> 绑定你的域名(本地开发为你的本地ip)</li>\n<li><code class=\"bg-zinc-300 dark:bg-black\">--publish</code> 端口号映射</li>\n<li><code class=\"bg-zinc-300 dark:bg-black\">--name</code> docker 启动的name</li>\n<li><code class=\"bg-zinc-300 dark:bg-black\">--restart</code> 重新启动时</li>\n<li><code class=\"bg-zinc-300 dark:bg-black\">-v</code> —volume 管理卷</li>\n<li><code class=\"bg-zinc-300 dark:bg-black\">--shm-size</code> 共享内存定义大小</li>\n</ul>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"安装完成\">安装完成</h3>\n<p class=\"mb-6\">等安装好了,打开你本地的ip访问应该会出现下面这个页面👇🏻(刷新下)</p>\n<p class=\"mb-6\"><img src=\"../../../docker-gitlab/docker-gitlab-index.png\" alt=\"docker-gitlab-index\" class=\"border border-slate-300 dark:border-zinc-700 rounded-xl mb-6\"></p>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"获取密码\">获取密码</h3>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #C9D1D9\">docker </span><span style=\"color: #79C0FF\">exec</span><span style=\"color: #C9D1D9\"> -it gitlab bash</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">cat /etc/gitlab/initial_root_password</span></span></code></pre>\n<p class=\"mb-6\"><code class=\"bg-zinc-300 dark:bg-black\">warn: 密码24小时之后就会自动删除,建议提前更改或者保存下来</code> <br></p>\n<p class=\"mb-6\">到这一步你的gitlab就算安装完成了，是不是很简单<code class=\"bg-zinc-300 dark:bg-black\">-></code></p>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"3-安装-gitlab-runner-docker-image\">3. 安装 gitlab-runner docker image</h2>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"推荐使用docker-volumes-启动-runner-container\">推荐使用docker volumes 启动 runner container</h3>\n<p class=\"mb-6\">使用管理员模式打开下面代码👇🏻</p>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #C9D1D9\">docker run -d --name gitlab-runner --restart always -v gitlab-runner-config:/etc/gitlab-runner -v /var/run/docker.sock:/var/run/docker.sock gitlab/gitlab-runner</span></span></code></pre>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"启动好了runner我们需要register-to-runner\">启动好了runner,我们需要register to runner</h3>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #C9D1D9\">docker run --rm -it -v gitlab-runner-config:/etc/gitlab-runner gitlab/gitlab-runner register</span></span></code></pre>\n<ul>\n<li>1.输入gitlab的地址(本地请填写ip)</li>\n<li>2.输入获取的token注册runner</li>\n<li>3.输入runner的描述</li>\n<li>4.输入runner的tags</li>\n<li>5.输入runner的维护说明</li>\n<li>6.提供一个runner的执行方式</li>\n<li>~7.如果在runner的执行中输入docker 系统会要你输入在<code class=\"bg-zinc-300 dark:bg-black\">.gitlab-ci.yml</code>中使用的默认镜像\nend</li>\n</ul>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"你的第一个gitlab-runner-就注册好了接下来你就可以在gitlab看到实际效果\">你的第一个gitlab-runner 就注册好了，接下来你就可以在gitlab看到实际效果</h3>\n<p class=\"mb-6\"><img src=\"../../../docker-gitlab/docker-gitlab-runner-image.png\" alt=\"docker-gitlab-runner-image\" class=\"border border-slate-300 dark:border-zinc-700 rounded-xl mb-6\">\n<img src=\"../../../docker-gitlab/docker-gitlab-runner-image-pipelines.png\" alt=\"docker-gitlab-runner-image-pipelines\" class=\"border border-slate-300 dark:border-zinc-700 rounded-xl mb-6\">\n这里有很多详细的配置<a href=\"https://gitlab.com/gitlab-org/gitlab-foss/tree/master/lib/gitlab/ci/templates\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\"><code class=\"bg-zinc-300 dark:bg-black\">.gitlab-ci.yml</code></a></p>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"总结\">总结</h2>\n<p class=\"mb-6\">刚开始在本地配置ip的时候翻车了，找了好多资料，最终才发现不能绑定localhost，只能用ip绑定runner，\n还在获取密码的时候翻车了，通过官方的例子无法获取，无奈只能进入到镜像内部 cat获取了，至此我的gitlab-runner的安装工作完成了。</p>";

				const _internal$2 = {
					injectedFrontmatter: {},
				};
				const frontmatter$2 = {"layout":"../../layouts/BlogPost.astro","title":"gitlab、gitlab-runner、docker","description":"gitlab、gitlab-runner、docker deploy on windows 10","tags":["Blog"],"pubDate":"Nov 3, 2022","language":["zh"],"updatedDate":"Nov 3, 2022"};
				const file$2 = "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/blog/gitlab-ci-cd.md";
				const url$2 = "/blog/gitlab-ci-cd";
				function rawContent$2() {
					return "\n记录在windows10下安装 gitlab 并且运行成功运行gitlab-runner\n\n\n## 1. 下载 docker\n- windows -> [下载](https://docs.docker.com/desktop/install/windows-install/)\n- macos -> [下载](https://docs.docker.com/desktop/install/mac-install/)\n- linux -> [下载](https://docs.docker.com/desktop/install/linux-install/)\n\n## 2. 安装 gitlab docker images\n使用以下命令就可以安装\n\n```sh\ndocker run --detach \\\n --env DOCKER_HOST=tcp://docker:2376 \\\n --env DOCKER_CERT_PATH=/certs/client \\\n --env DOCKER_TLS_VERIFY=1 \\\n --hostname gitlab.example.com \\\n --publish 443:443 --publish 80:80 --publish 22:22 \\\n --name gitlab \\\n --restart always \\\n -v gitlab-config:/etc/gitlab \\\n -v gitlab-logs:/var/log/gitlab \\\n -v gitlab-data:/var/opt/gitlab \\\n --shm-size 256m \\\n gitlab/gitlab-ee:latest\n```\n### 注释\n- `--env` 定义环境变量的\n- `--hostname` 绑定你的域名(本地开发为你的本地ip)\n- `--publish` 端口号映射\n- `--name` docker 启动的name\n- `--restart` 重新启动时 \n- `-v` --volume 管理卷\n- `--shm-size` 共享内存定义大小\n### 安装完成\n等安装好了,打开你本地的ip访问应该会出现下面这个页面👇🏻(刷新下)\n\n![docker-gitlab-index](../../../docker-gitlab/docker-gitlab-index.png)\n\n\n### 获取密码\n\n```sh\ndocker exec -it gitlab bash\ncat /etc/gitlab/initial_root_password\n```\n`warn: 密码24小时之后就会自动删除,建议提前更改或者保存下来` <br>\n\n到这一步你的gitlab就算安装完成了，是不是很简单`->`\n\n## 3. 安装 gitlab-runner docker image\n\n### 推荐使用docker volumes 启动 runner container\n使用管理员模式打开下面代码👇🏻\n```sh\ndocker run -d --name gitlab-runner --restart always -v gitlab-runner-config:/etc/gitlab-runner -v /var/run/docker.sock:/var/run/docker.sock gitlab/gitlab-runner\n```\n### 启动好了runner,我们需要register to runner\n```sh\ndocker run --rm -it -v gitlab-runner-config:/etc/gitlab-runner gitlab/gitlab-runner register\n```\n\n- 1.输入gitlab的地址(本地请填写ip)\n- 2.输入获取的token注册runner\n- 3.输入runner的描述\n- 4.输入runner的tags\n- 5.输入runner的维护说明\n- 6.提供一个runner的执行方式\n- ~7.如果在runner的执行中输入docker 系统会要你输入在`.gitlab-ci.yml`中使用的默认镜像\nend \n\n### 你的第一个gitlab-runner 就注册好了，接下来你就可以在gitlab看到实际效果\n![docker-gitlab-runner-image](../../../docker-gitlab/docker-gitlab-runner-image.png)\n![docker-gitlab-runner-image-pipelines](../../../docker-gitlab/docker-gitlab-runner-image-pipelines.png)\n这里有很多详细的配置[`.gitlab-ci.yml`](https://gitlab.com/gitlab-org/gitlab-foss/tree/master/lib/gitlab/ci/templates)\n\n\n## 总结\n刚开始在本地配置ip的时候翻车了，找了好多资料，最终才发现不能绑定localhost，只能用ip绑定runner，\n还在获取密码的时候翻车了，通过官方的例子无法获取，无奈只能进入到镜像内部 cat获取了，至此我的gitlab-runner的安装工作完成了。\n\n\n";
				}
				function compiledContent$2() {
					return html$2;
				}
				function getHeadings$2() {
					return [{"depth":2,"slug":"1-下载-docker","text":"1. 下载 docker"},{"depth":2,"slug":"2-安装-gitlab-docker-images","text":"2. 安装 gitlab docker images"},{"depth":3,"slug":"注释","text":"注释"},{"depth":3,"slug":"安装完成","text":"安装完成"},{"depth":3,"slug":"获取密码","text":"获取密码"},{"depth":2,"slug":"3-安装-gitlab-runner-docker-image","text":"3. 安装 gitlab-runner docker image"},{"depth":3,"slug":"推荐使用docker-volumes-启动-runner-container","text":"推荐使用docker volumes 启动 runner container"},{"depth":3,"slug":"启动好了runner我们需要register-to-runner","text":"启动好了runner,我们需要register to runner"},{"depth":3,"slug":"你的第一个gitlab-runner-就注册好了接下来你就可以在gitlab看到实际效果","text":"你的第一个gitlab-runner 就注册好了，接下来你就可以在gitlab看到实际效果"},{"depth":2,"slug":"总结","text":"总结"}];
				}
				function getHeaders$2() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$2();
				}				async function Content$2() {
					const { layout, ...content } = frontmatter$2;
					content.file = file$2;
					content.url = url$2;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$2 });
					return createVNode($$BlogPost, {
									file: file$2,
									url: url$2,
									content,
									frontmatter: content,
									headings: getHeadings$2(),
									rawContent: rawContent$2,
									compiledContent: compiledContent$2,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$2[Symbol.for('astro.needsHeadRendering')] = false;

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	_internal: _internal$2,
	frontmatter: frontmatter$2,
	file: file$2,
	url: url$2,
	rawContent: rawContent$2,
	compiledContent: compiledContent$2,
	getHeadings: getHeadings$2,
	getHeaders: getHeaders$2,
	Content: Content$2,
	default: Content$2
}, Symbol.toStringTag, { value: 'Module' }));

const html$1 = "<p class=\"mb-6\"><a href=\"https://www.npmjs.com/package/untyper\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\"><img src=\"https://img.shields.io/npm/v/untyper?color=a1b858&#x26;label=\" alt=\"NPM version\" class=\"border border-slate-300 dark:border-zinc-700 rounded-xl mb-6\"></a></p>\n<p class=\"mb-6\"><img src=\"../../..//gif/CPT2209191551-397x87.gif\" alt=\"untyper\" class=\"border border-slate-300 dark:border-zinc-700 rounded-xl mb-6\"></p>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"live-demo\"><a href=\"https://stackblitz.com/edit/vitejs-vite-2qxcej?file=main.js\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\">Live demo</a></h2>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"-todo\">🛹 TODO</h2>\n<ul class=\"contains-task-list\">\n<li class=\"task-list-item\"><input type=\"checkbox\" checked disabled> support custom typing effect</li>\n<li class=\"task-list-item\"><input type=\"checkbox\" checked disabled> support custom cursor</li>\n<li class=\"task-list-item\"><input type=\"checkbox\" checked disabled> support move cursor</li>\n<li class=\"task-list-item\"><input type=\"checkbox\" disabled> support add any document node</li>\n</ul>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"-feature\">🚀 Feature</h2>\n<ol>\n<li>use <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/Animation\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\">Web Animations API</a> Api to achieve typing effect</li>\n<li>Support custom typing speed</li>\n<li>Support chained methods</li>\n</ol>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"-install\">📦 Install</h2>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #C9D1D9\">  npm install untyper</span></span></code></pre>\n<h1 class=\"text-4xl font-bold font-ubuntu my-2\" id=\"usage\">Usage</h1>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #FF7B72\">import</span><span style=\"color: #C9D1D9\"> { UnTyper } </span><span style=\"color: #FF7B72\">from</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #A5D6FF\">'untyper'</span></span>\n<span class=\"line\"><span style=\"color: #FF7B72\">const</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #79C0FF\">text</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #FF7B72\">=</span><span style=\"color: #C9D1D9\"> document.</span><span style=\"color: #D2A8FF\">querySelector</span><span style=\"color: #C9D1D9\">(</span><span style=\"color: #A5D6FF\">'#text'</span><span style=\"color: #C9D1D9\">)</span></span>\n<span class=\"line\"><span style=\"color: #FF7B72\">const</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #79C0FF\">unTyper</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #FF7B72\">=</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #FF7B72\">new</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #D2A8FF\">UnTyper</span><span style=\"color: #C9D1D9\">(text, { speed: </span><span style=\"color: #79C0FF\">100</span><span style=\"color: #C9D1D9\">, startDelay: </span><span style=\"color: #79C0FF\">1000</span><span style=\"color: #C9D1D9\"> })</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">unTyper.</span><span style=\"color: #D2A8FF\">type</span><span style=\"color: #C9D1D9\">(</span><span style=\"color: #A5D6FF\">'hi'</span><span style=\"color: #C9D1D9\">, { delay: </span><span style=\"color: #79C0FF\">200</span><span style=\"color: #C9D1D9\"> }).</span><span style=\"color: #D2A8FF\">go</span><span style=\"color: #C9D1D9\">()</span></span>\n<span class=\"line\"></span></code></pre>\n<h2 class=\"text-2xl font-bold font-ubuntu my-2\" id=\"inspired-by\">Inspired by</h2>\n<ul>\n<li><a href=\"https://github.com/alexmacarthur/typeit\" class=\"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500\">typeit</a></li>\n</ul>";

				const _internal$1 = {
					injectedFrontmatter: {},
				};
				const frontmatter$1 = {"layout":"../../layouts/BlogPost.astro","title":"untyper ","description":"A simple typewriter for browser,Typing effects can be achieved using chained methods","tags":["Project"],"pubDate":"Oct 1 2022","language":["en"],"updatedDate":"Oct 1 2022","heroImage":"/untyper.png"};
				const file$1 = "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/blog/git-untyper.md";
				const url$1 = "/blog/git-untyper";
				function rawContent$1() {
					return "\n\n[![NPM version](https://img.shields.io/npm/v/untyper?color=a1b858&label=)](https://www.npmjs.com/package/untyper)\n\n![untyper](../../..//gif/CPT2209191551-397x87.gif)\n\n## [Live demo](https://stackblitz.com/edit/vitejs-vite-2qxcej?file=main.js)\n\n## 🛹 TODO\n- [x] support custom typing effect\n- [x] support custom cursor\n- [x] support move cursor\n- [ ] support add any document node\n\n## 🚀 Feature\n  1. use [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Animation) Api to achieve typing effect\n  2. Support custom typing speed\n  3. Support chained methods\n## 📦 Install\n\n```bash\n  npm install untyper\n```\n# Usage\n\n```ts\nimport { UnTyper } from 'untyper'\nconst text = document.querySelector('#text')\nconst unTyper = new UnTyper(text, { speed: 100, startDelay: 1000 })\nunTyper.type('hi', { delay: 200 }).go()\n\n```\n\n\n## Inspired by \n - [typeit](https://github.com/alexmacarthur/typeit)\n\n";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [{"depth":2,"slug":"live-demo","text":"Live demo"},{"depth":2,"slug":"-todo","text":"🛹 TODO"},{"depth":2,"slug":"-feature","text":"🚀 Feature"},{"depth":2,"slug":"-install","text":"📦 Install"},{"depth":1,"slug":"usage","text":"Usage"},{"depth":2,"slug":"inspired-by","text":"Inspired by"}];
				}
				function getHeaders$1() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$1();
				}				async function Content$1() {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$1 });
					return createVNode($$BlogPost, {
									file: file$1,
									url: url$1,
									content,
									frontmatter: content,
									headings: getHeadings$1(),
									rawContent: rawContent$1,
									compiledContent: compiledContent$1,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$1[Symbol.for('astro.needsHeadRendering')] = false;

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	_internal: _internal$1,
	frontmatter: frontmatter$1,
	file: file$1,
	url: url$1,
	rawContent: rawContent$1,
	compiledContent: compiledContent$1,
	getHeadings: getHeadings$1,
	getHeaders: getHeaders$1,
	Content: Content$1,
	default: Content$1
}, Symbol.toStringTag, { value: 'Module' }));

const html = "<p class=\"mb-6\"><img src=\"/pubsub/20240509-pubsub.png\" alt=\"20240509-pubsub\" class=\"border border-slate-300 dark:border-zinc-700 rounded-xl mb-6\"></p>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"介绍\">介绍</h3>\n<p>发布/订阅模式是一种通用的单向消息传递模式，其中发布者生成数据/消息，订阅者注册以接收特定类型的消息。它可以使用点对点架构或消息代理来实现以调解通信。</p>\n<p class=\"mb-6\">在日常生活中，我们有没有类似的经历呢，答案是有的。就比如在你某一天入住到一个酒店，交了400块押金，跟酒店前台说明天早上我有个朋友来找我，到了可以直接打电话给我。这种情况下，你跟酒店说这一动作就是<code class=\"bg-zinc-300 dark:bg-black\">订阅</code>，而酒店前台接待就是<code class=\"bg-zinc-300 dark:bg-black\">事件中心</code>、明天早上朋友来了喊你就是<code class=\"bg-zinc-300 dark:bg-black\">发布</code>.</p>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"应用场景\">应用场景</h3>\n<ul class=\"contains-task-list\">\n<li class=\"task-list-item\"><input type=\"checkbox\" checked disabled> 1.事件通知：当某个组件发生了变化或者需要通知其他组件时，可以使用发布-订阅模式。例如，在一个购物车应用中，当用户添加商品到购物车时，可以发布一个“商品已添加”事件，其他页面或组件可以订阅这个事件，以便更新相应的 UI 或执行相关操作。</li>\n<li class=\"task-list-item\"><input type=\"checkbox\" checked disabled> 2.消息总线：在大型应用中，可能有多个模块或组件需要进行通信，此时可以使用发布-订阅模式来创建一个消息总线。各个模块可以发布和订阅消息，以实现模块间的解耦和灵活的通信方式。</li>\n<li class=\"task-list-item\"><input type=\"checkbox\" checked disabled> 3.全局状态管理：在前端开发中，常常需要管理全局状态，比如用户登录状态、主题切换等。可以使用发布-订阅模式来管理这些全局状态，当状态发生变化时，发布一个事件通知所有订阅者更新状态。</li>\n<li class=\"task-list-item\"><input type=\"checkbox\" checked disabled> 4.解耦组件间关系：发布-订阅模式可以帮助解耦组件间的关系，使得各个组件之间更加独立和可维护。例如，一个评论组件可以发布一个“新增评论”事件，其他组件可以订阅这个事件来更新评论列表，而不需要直接调用评论组件的方法。</li>\n</ul>\n<h3 class=\"text-xl font-bold font-ubuntu my-2\" id=\"代码\">代码</h3>\n<ul>\n<li>简单实现</li>\n</ul>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #8B949E\">// 定义事件管理器</span></span>\n<span class=\"line\"><span style=\"color: #FF7B72\">class</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #FFA657\">EventManager</span><span style=\"color: #C9D1D9\"> {</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">  </span><span style=\"color: #FF7B72\">constructor</span><span style=\"color: #C9D1D9\">() {</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">    </span><span style=\"color: #79C0FF\">this</span><span style=\"color: #C9D1D9\">.events </span><span style=\"color: #FF7B72\">=</span><span style=\"color: #C9D1D9\"> {};</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">  }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">  </span><span style=\"color: #8B949E\">// 订阅事件</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">  </span><span style=\"color: #D2A8FF\">subscribe</span><span style=\"color: #C9D1D9\">(</span><span style=\"color: #FFA657\">event</span><span style=\"color: #C9D1D9\">, </span><span style=\"color: #FFA657\">callback</span><span style=\"color: #C9D1D9\">) {</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">    </span><span style=\"color: #FF7B72\">if</span><span style=\"color: #C9D1D9\"> (</span><span style=\"color: #FF7B72\">!</span><span style=\"color: #79C0FF\">this</span><span style=\"color: #C9D1D9\">.events[event]) {</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">      </span><span style=\"color: #79C0FF\">this</span><span style=\"color: #C9D1D9\">.events[event] </span><span style=\"color: #FF7B72\">=</span><span style=\"color: #C9D1D9\"> [];</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">    }</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">    </span><span style=\"color: #79C0FF\">this</span><span style=\"color: #C9D1D9\">.events[event].</span><span style=\"color: #D2A8FF\">push</span><span style=\"color: #C9D1D9\">(callback);</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">  }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">  </span><span style=\"color: #8B949E\">// 发布事件</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">  </span><span style=\"color: #D2A8FF\">publish</span><span style=\"color: #C9D1D9\">(</span><span style=\"color: #FFA657\">event</span><span style=\"color: #C9D1D9\">, </span><span style=\"color: #FFA657\">data</span><span style=\"color: #C9D1D9\">) {</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">    </span><span style=\"color: #FF7B72\">if</span><span style=\"color: #C9D1D9\"> (</span><span style=\"color: #FF7B72\">!</span><span style=\"color: #79C0FF\">this</span><span style=\"color: #C9D1D9\">.events[event]) {</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">      </span><span style=\"color: #FF7B72\">return</span><span style=\"color: #C9D1D9\">;</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">    }</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">    </span><span style=\"color: #79C0FF\">this</span><span style=\"color: #C9D1D9\">.events[event].</span><span style=\"color: #D2A8FF\">forEach</span><span style=\"color: #C9D1D9\">(</span><span style=\"color: #FFA657\">callback</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #FF7B72\">=></span><span style=\"color: #C9D1D9\"> {</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">      </span><span style=\"color: #D2A8FF\">callback</span><span style=\"color: #C9D1D9\">(data);</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">    });</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">  }</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">}</span></span>\n<span class=\"line\"><span style=\"color: #8B949E\">// 创建事件管理器实例</span></span>\n<span class=\"line\"><span style=\"color: #FF7B72\">const</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #79C0FF\">eventManager</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #FF7B72\">=</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #FF7B72\">new</span><span style=\"color: #C9D1D9\"> </span><span style=\"color: #D2A8FF\">EventManager</span><span style=\"color: #C9D1D9\">();</span></span>\n<span class=\"line\"><span style=\"color: #8B949E\">// 订阅事件</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">eventManager.</span><span style=\"color: #D2A8FF\">subscribe</span><span style=\"color: #C9D1D9\">(</span><span style=\"color: #A5D6FF\">'userLoggedIn'</span><span style=\"color: #C9D1D9\">, (</span><span style=\"color: #FFA657\">data</span><span style=\"color: #C9D1D9\">) </span><span style=\"color: #FF7B72\">=></span><span style=\"color: #C9D1D9\"> {</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">  console.</span><span style=\"color: #D2A8FF\">log</span><span style=\"color: #C9D1D9\">(</span><span style=\"color: #A5D6FF\">'User logged in:'</span><span style=\"color: #C9D1D9\">, data.username);</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">});</span></span>\n<span class=\"line\"><span style=\"color: #8B949E\">// 发布事件</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">eventManager.</span><span style=\"color: #D2A8FF\">publish</span><span style=\"color: #C9D1D9\">(</span><span style=\"color: #A5D6FF\">'userLoggedIn'</span><span style=\"color: #C9D1D9\">, { username: </span><span style=\"color: #A5D6FF\">'JohnDoe'</span><span style=\"color: #C9D1D9\"> });</span></span></code></pre>\n<p class=\"mb-6\">cd ..</p>";

				const _internal = {
					injectedFrontmatter: {},
				};
				const frontmatter = {"layout":"../../layouts/BlogPost.astro","title":"发布订阅模式","description":"发布订阅者模式（Publish-Subscribe Pattern）是一种常见的设计模式","tags":["Blog"],"pubDate":"May 9, 2024","language":["zh"],"updatedDate":"May 9, 2024"};
				const file = "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/blog/发布订阅模式.md";
				const url = "/blog/发布订阅模式";
				function rawContent() {
					return "\n![20240509-pubsub](/pubsub/20240509-pubsub.png)\n### 介绍\n<p>发布/订阅模式是一种通用的单向消息传递模式，其中发布者生成数据/消息，订阅者注册以接收特定类型的消息。它可以使用点对点架构或消息代理来实现以调解通信。</p>\n\n在日常生活中，我们有没有类似的经历呢，答案是有的。就比如在你某一天入住到一个酒店，交了400块押金，跟酒店前台说明天早上我有个朋友来找我，到了可以直接打电话给我。这种情况下，你跟酒店说这一动作就是`订阅`，而酒店前台接待就是`事件中心`、明天早上朋友来了喊你就是`发布`.\n\n### 应用场景 \n\n- [x] 1.事件通知：当某个组件发生了变化或者需要通知其他组件时，可以使用发布-订阅模式。例如，在一个购物车应用中，当用户添加商品到购物车时，可以发布一个“商品已添加”事件，其他页面或组件可以订阅这个事件，以便更新相应的 UI 或执行相关操作。\n- [x] 2.消息总线：在大型应用中，可能有多个模块或组件需要进行通信，此时可以使用发布-订阅模式来创建一个消息总线。各个模块可以发布和订阅消息，以实现模块间的解耦和灵活的通信方式。\n- [x] 3.全局状态管理：在前端开发中，常常需要管理全局状态，比如用户登录状态、主题切换等。可以使用发布-订阅模式来管理这些全局状态，当状态发生变化时，发布一个事件通知所有订阅者更新状态。\n- [x] 4.解耦组件间关系：发布-订阅模式可以帮助解耦组件间的关系，使得各个组件之间更加独立和可维护。例如，一个评论组件可以发布一个“新增评论”事件，其他组件可以订阅这个事件来更新评论列表，而不需要直接调用评论组件的方法。\n### 代码\n- 简单实现\n```js\n// 定义事件管理器\nclass EventManager {\n  constructor() {\n    this.events = {};\n  }\n\n  // 订阅事件\n  subscribe(event, callback) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(callback);\n  }\n\n  // 发布事件\n  publish(event, data) {\n    if (!this.events[event]) {\n      return;\n    }\n    this.events[event].forEach(callback => {\n      callback(data);\n    });\n  }\n}\n// 创建事件管理器实例\nconst eventManager = new EventManager();\n// 订阅事件\neventManager.subscribe('userLoggedIn', (data) => {\n  console.log('User logged in:', data.username);\n});\n// 发布事件\neventManager.publish('userLoggedIn', { username: 'JohnDoe' });\n```\ncd ..\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":3,"slug":"介绍","text":"介绍"},{"depth":3,"slug":"应用场景","text":"应用场景"},{"depth":3,"slug":"代码","text":"代码"}];
				}
				function getHeaders() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings();
				}				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return createVNode($$BlogPost, {
									file,
									url,
									content,
									frontmatter: content,
									headings: getHeadings(),
									rawContent,
									compiledContent,
									'server:root': true,
									children: contentFragment
								});
				}
				Content[Symbol.for('astro.needsHeadRendering')] = false;

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	_internal,
	frontmatter,
	file,
	url,
	rawContent,
	compiledContent,
	getHeadings,
	getHeaders,
	Content,
	default: Content
}, Symbol.toStringTag, { value: 'Module' }));

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "inline-flex" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/vue/WebLanguage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Weblanguage = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro("/Users/songwufan/Downloads/github/songwuk.cc/src/pages/zh/index.astro", "https://www.songwuk.cc/", "file:///Users/songwufan/Downloads/github/songwuk.cc/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = (await Astro2.glob(/* #__PURE__ */ Object.assign({"../blog/blog-npm-pnpm.md": () => Promise.resolve().then(() => _page4),"../blog/git-untyper.md": () => Promise.resolve().then(() => _page6),"../blog/gitlab-ci-cd.md": () => Promise.resolve().then(() => _page5),"../blog/发布订阅模式.md": () => Promise.resolve().then(() => _page7)}), () => "../blog/*.{md,mdx}")).sort(
    (a, b) => new Date(b.frontmatter.pubDate).valueOf() - new Date(a.frontmatter.pubDate).valueOf()
  ).filter((page) => page.frontmatter.language && page.frontmatter.language.includes("zh"));
  changeLanguage("zh");
  return renderTemplate`<html${addAttribute(i18next.language, "lang")}>
	<head>
		${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}
	${renderHead($$result)}</head>
	${renderComponent($$result, "Body", $$Body, {}, { "default": () => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}<main class="pt-[56px]">
				${renderComponent($$result, "Masthead", $$Masthead, {})}
				<!-- <Transform i18nKey="website.linehtml" ns='zh' >
					这是一个场游戏<p class='c-orange-400'>p</p><span>span</span>
				</Transform> -->
				${renderComponent($$result, "Content", $$Content, {}, { "default": () => renderTemplate`<section>
						<ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
							${posts.map((post) => renderTemplate`<li class="text-center mb-4">
									<a${addAttribute(post.url, "href")}>
										${renderComponent($$result, "Image", $$Image, { "class": "border border-slate-300 dark:border-zinc-700 rounded-xl", "src": post.frontmatter.heroImage, "width": 720 * 2, "aspectRatio": 2, "alt": "Thumbnail" })}
										<div class="mt-3 text-xl">
											${post.frontmatter.title}
											${post.frontmatter.language ? renderTemplate`${renderComponent($$result, "Weblanguage", Weblanguage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/WebLanguage.vue", "client:component-export": "default" }, { "default": () => renderTemplate`${post.frontmatter.language}` })}` : ""}
										</div>
										<div class="opacity-70">${post.frontmatter.description}</div>
										<time${addAttribute(post.frontmatter.pubDate, "datetime")}>
											${new Date(post.frontmatter.pubDate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}
										</time>
									</a>
								</li>`)}
						</ul>
						</section>` })}
		</main>${renderComponent($$result, "Footer", $$Footer, {})}` })}
</html>`;
}, "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/zh/index.astro");

const $$file = "/Users/songwufan/Downloads/github/songwuk.cc/src/pages/zh/index.astro";
const $$url = "/zh";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([["node_modules/.pnpm/@astrojs+image@0.7.1/node_modules/@astrojs/image/dist/endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/projects/[id].astro", _page2],["src/pages/posts/[id].astro", _page3],["src/pages/blog/blog-npm-pnpm.md", _page4],["src/pages/blog/gitlab-ci-cd.md", _page5],["src/pages/blog/git-untyper.md", _page6],["src/pages/blog/发布订阅模式.md", _page7],["src/pages/zh/index.astro", _page8],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/vue","clientEntrypoint":"@astrojs/vue/client.js","serverEntrypoint":"@astrojs/vue/server.js"}, { ssr: _renderer1 }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/@astrojs+image@0.7.1/node_modules/@astrojs/image/dist/endpoint.js","pathname":"/_image","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/blog-npm-pnpm.c3d7f5fc.css","assets/_id_.e3fa308a.css"],"scripts":[{"type":"inline","value":"const o=document.querySelector(\"#back\");o?.addEventListener(\"click\",e=>{e.stopPropagation(),history.go(-1)},!1);\n"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/blog-npm-pnpm.c3d7f5fc.css","assets/_id_.de83282a.css","assets/_id_.e3fa308a.css"],"scripts":[{"type":"inline","value":"const o=document.querySelector(\"#back\");o?.addEventListener(\"click\",e=>{e.stopPropagation(),history.go(-1)},!1);\n"}],"routeData":{"route":"/projects/[id]","type":"page","pattern":"^\\/projects\\/([^/]+?)\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/projects/[id].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/_id_.e3fa308a.css","assets/_id_.de83282a.css","assets/blog-npm-pnpm.c3d7f5fc.css"],"scripts":[{"type":"inline","value":"const o=document.querySelector(\"#back\");o?.addEventListener(\"click\",e=>{e.stopPropagation(),history.go(-1)},!1);\n"}],"routeData":{"route":"/posts/[id]","type":"page","pattern":"^\\/posts\\/([^/]+?)\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/posts/[id].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/blog-npm-pnpm.c3d7f5fc.css","assets/_id_.e3fa308a.css"],"scripts":[{"type":"inline","value":"const o=document.querySelector(\"#back\");o?.addEventListener(\"click\",e=>{e.stopPropagation(),history.go(-1)},!1);\n"}],"routeData":{"route":"/blog/blog-npm-pnpm","type":"page","pattern":"^\\/blog\\/blog-npm-pnpm\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"blog-npm-pnpm","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/blog-npm-pnpm.md","pathname":"/blog/blog-npm-pnpm","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/blog-npm-pnpm.c3d7f5fc.css","assets/_id_.e3fa308a.css"],"scripts":[{"type":"inline","value":"const o=document.querySelector(\"#back\");o?.addEventListener(\"click\",e=>{e.stopPropagation(),history.go(-1)},!1);\n"}],"routeData":{"route":"/blog/gitlab-ci-cd","type":"page","pattern":"^\\/blog\\/gitlab-ci-cd\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"gitlab-ci-cd","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/gitlab-ci-cd.md","pathname":"/blog/gitlab-ci-cd","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/blog-npm-pnpm.c3d7f5fc.css","assets/_id_.e3fa308a.css"],"scripts":[{"type":"inline","value":"const o=document.querySelector(\"#back\");o?.addEventListener(\"click\",e=>{e.stopPropagation(),history.go(-1)},!1);\n"}],"routeData":{"route":"/blog/git-untyper","type":"page","pattern":"^\\/blog\\/git-untyper\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"git-untyper","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/git-untyper.md","pathname":"/blog/git-untyper","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/blog-npm-pnpm.c3d7f5fc.css","assets/_id_.e3fa308a.css"],"scripts":[{"type":"inline","value":"const o=document.querySelector(\"#back\");o?.addEventListener(\"click\",e=>{e.stopPropagation(),history.go(-1)},!1);\n"}],"routeData":{"route":"/blog/发布订阅模式","type":"page","pattern":"^\\/blog\\/发布订阅模式\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"发布订阅模式","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/发布订阅模式.md","pathname":"/blog/发布订阅模式","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/blog-npm-pnpm.c3d7f5fc.css","assets/_id_.e3fa308a.css","assets/_id_.de83282a.css"],"scripts":[{"type":"inline","value":"const o=document.querySelector(\"#back\");o?.addEventListener(\"click\",e=>{e.stopPropagation(),history.go(-1)},!1);\n"}],"routeData":{"route":"/zh","type":"page","pattern":"^\\/zh\\/?$","segments":[[{"content":"zh","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/zh/index.astro","pathname":"/zh","_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.songwuk.cc/","base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[[null,{"h1":"text-4xl font-bold font-ubuntu my-2","h2":"text-2xl font-bold font-ubuntu my-2","h3":"text-xl font-bold font-ubuntu my-2","h4":"text-lg font-bold font-ubuntu my-2","h5":"font-bold font-ubuntu my-2","h6":"font-bold font-ubuntu my-2","img":"border border-slate-300 dark:border-zinc-700 rounded-xl mb-6","p":"mb-6","code":"bg-zinc-300 dark:bg-black","a":"underline underline-offset-2 hover:text-emerald-500 decoration-emerald-500"}]],"remarkRehype":{},"extendDefaultPlugins":true,"isAstroFlavoredMd":false,"isExperimentalContentCollections":false,"contentDir":"file:///Users/songwufan/Downloads/github/songwuk.cc/src/content/"},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/WebLanguage.vue":"WebLanguage.1d4f084b.js","/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/ThemeToggleButton.vue":"ThemeToggleButton.63497a9d.js","/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/DropdownMenu.vue":"DropdownMenu.d7b2dd06.js","/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/CanvasText.vue":"CanvasText.83c79970.js","/Users/songwufan/Downloads/github/songwuk.cc/src/components/vue/WriteTyperContent.vue":"WriteTyperContent.d7d601e2.js","@astrojs/vue/client.js":"client.b68236b2.js","/astro/hoisted.js?q=0":"hoisted.2040e381.js","astro:scripts/before-hydration.js":""},"assets":["/assets/_id_.de83282a.css","/assets/_id_.e3fa308a.css","/assets/blog-npm-pnpm.c3d7f5fc.css","/CanvasText.83c79970.js","/DropdownMenu.d7b2dd06.js","/ThemeToggleButton.63497a9d.js","/WebLanguage.1d4f084b.js","/WriteTyperContent.d7d601e2.js","/client.b68236b2.js","/favicon.svg","/npmVspnpm.png","/placeholder-about.jpg","/placeholder-hero.jpg","/placeholder-social.jpg","/untyper.png","/webpack-v4-optimization.jpeg","/chunks/runtime-core.esm-bundler.34fd2442.js","/docker-gitlab/docker-gitlab-index.png","/docker-gitlab/docker-gitlab-runner-image-pipelines.png","/docker-gitlab/docker-gitlab-runner-image.png","/gif/CPT2209191551-397x87.gif","/pubsub/20240509-pubsub.png"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
