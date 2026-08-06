import { build } from "esbuild";
import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "/");
const out = join(root, "public");

async function clean() {
	await rm(out, { recursive: true, force: true });
	await mkdir(out, { recursive: true });
}

async function bundleStyles() {
	const mainCssPath = join(root, "src", "styles", "main.css");
	const source = await readFile(mainCssPath, "utf8");
	const bundled = await inlineCssImports(source, join(root, "src", "styles"));
	const destPath = join(out, "main.css");
	await mkdir(dirname(destPath), { recursive: true });
	await writeFile(destPath, bundled, "utf8");
}

async function inlineCssImports(source, baseDir) {
	const importRegex = /@import\s+url\((['"]?)(.+?)\1\);?/g;
	let match;
	let result = "";
	let lastIndex = 0;

	while ((match = importRegex.exec(source)) !== null) {
		result += source.slice(lastIndex, match.index);
		const importedPath = match[2];

		if (/^(?:https?:)?\/\//i.test(importedPath)) {
			result += match[0];
			lastIndex = importRegex.lastIndex;
			continue;
		}

		const importedSource = await readFile(join(baseDir, importedPath), "utf8");
		result += await inlineCssImports(importedSource, dirname(join(baseDir, importedPath)));
		lastIndex = importRegex.lastIndex;
	}

	result += source.slice(lastIndex);
	return result;
}

async function buildApp() {
	await build({
		absWorkingDir: root,
		entryPoints: [join(root, "src", "scripts", "main.js")],
		bundle: true,
		format: "esm",
		minify: true,
		sourcemap: false,
		target: ["es2020"],
		outfile: join(out, "main.js"),
		define: {
			"process.env.NODE_ENV": JSON.stringify("production"),
		},
		loader: {
			".js": "js",
		},
		legalComments: "none",
	});
}

await clean();
await bundleStyles();
await buildApp();

console.log("Build completed successfully.");
