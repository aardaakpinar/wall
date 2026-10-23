// Minimal YAML reader (the subset Wall's config uses): maps, lists, scalars,
// quoted strings, inline [a, b] lists, {a: b} maps, > and | blocks, # comments.
const KEY = /^("(?:[^"\\]|\\.)*"|'[^']*'|[^\s"'#\-\[{][^:]*?):(?:\s+|$)/;
const DASH = /^-(\s|$)/;

function stripComment(s) {
	let quote = null;

	for (let i = 0; i < s.length; i++) {
		const c = s[i];

		if (quote) {
			if (c === "\\" && quote === '"') i++;
			else if (c === quote) quote = null;
		} else if (c === '"' || c === "'") {
			if (i === 0 || /[\s:,[{]/.test(s[i - 1])) quote = c;
		} else if (c === "#" && (i === 0 || /\s/.test(s[i - 1]))) {
			return s.slice(0, i);
		}
	}

	return s;
}

function unquote(s) {
	if (s[0] === '"') {
		return s.slice(1, -1).replace(/\\(.)/g, (_, c) => ({ n: "\n", t: "\t" })[c] ?? c);
	}

	if (s[0] === "'") {
		return s.slice(1, -1).replace(/''/g, "'");
	}

	return s;
}

function splitFlow(s) {
	const out = [];
	let depth = 0;
	let quote = null;
	let cur = "";

	for (const c of s) {
		if (quote) {
			cur += c;
			if (c === quote) quote = null;
			continue;
		}

		if (c === '"' || c === "'") quote = c;
		if (c === "[" || c === "{") depth++;
		if (c === "]" || c === "}") depth--;

		if (c === "," && depth === 0) {
			out.push(cur);
			cur = "";
			continue;
		}

		cur += c;
	}

	if (cur.trim()) out.push(cur);

	return out;
}

function scalar(raw) {
	const s = stripComment(raw).trim();

	if (s === "") return null;
	if (s[0] === '"' || s[0] === "'") return unquote(s);
	if (s[0] === "[") return splitFlow(s.slice(1, s.lastIndexOf("]"))).map(scalar);

	if (s[0] === "{") {
		const obj = {};

		splitFlow(s.slice(1, s.lastIndexOf("}"))).forEach((pair) => {
			const p = pair.trim();
			const m = p.match(KEY);
			if (m) obj[unquote(m[1].trim())] = scalar(p.slice(m[0].length));
		});

		return obj;
	}

	if (/^(true|false)$/i.test(s)) return s.toLowerCase() === "true";
	if (/^(null|~)$/i.test(s)) return null;
	if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);

	return s;
}

export function parseYaml(source) {
	const lines = String(source).replace(/\r\n?/g, "\n").split("\n");
	let i = 0;

	const indentOf = (line) => line.length - line.trimStart().length;
	const isBlank = (line) => !line.trim() || line.trim().startsWith("#") || line.trim() === "---";
	const skip = () => {
		while (i < lines.length && isBlank(lines[i])) i++;
	};

	function block(min) {
		skip();

		if (i >= lines.length || indentOf(lines[i]) < min) return null;

		const indent = indentOf(lines[i]);

		return DASH.test(lines[i].trim()) ? sequence(indent) : mapping(indent);
	}

	function sequence(indent) {
		const out = [];

		for (skip(); i < lines.length && indentOf(lines[i]) === indent && DASH.test(lines[i].trim()); skip()) {
			const rest = lines[i].trim().slice(1).trim();

			if (!rest || rest[0] === "#") {
				i++;
				out.push(block(indent + 1));
			} else if (KEY.test(stripComment(rest).trim())) {
				const col = lines[i].indexOf(rest, indent + 1);

				lines[i] = " ".repeat(col) + rest;
				out.push(mapping(col));
			} else {
				i++;
				out.push(scalar(rest));
			}
		}

		return out;
	}

	function mapping(indent) {
		const out = {};

		for (skip(); i < lines.length && indentOf(lines[i]) >= indent; skip()) {
			if (indentOf(lines[i]) > indent) {
				throw new Error(`YAML: unexpected indentation on line ${i + 1}`);
			}

			const text = lines[i].trim();
			const m = text.match(KEY);

			if (!m) {
				if (DASH.test(text)) break;
				throw new Error(`YAML: cannot read line ${i + 1}`);
			}

			const key = unquote(m[1].trim());
			const rest = stripComment(text.slice(m[0].length)).trim();

			i++;

			if (/^[>|][+-]?$/.test(rest)) {
				out[key] = blockScalar(indent, rest[0]);
			} else if (rest) {
				out[key] = scalar(rest);
			} else {
				skip();

				const next = lines[i];
				const nested = i < lines.length && (indentOf(next) > indent || (indentOf(next) === indent && DASH.test(next.trim())));

				out[key] = nested ? block(indent) : null;
			}
		}

		return out;
	}

	function blockScalar(parent, style) {
		const body = [];

		while (i < lines.length && (!lines[i].trim() || indentOf(lines[i]) > parent)) {
			body.push(lines[i++]);
		}

		const first = body.find((l) => l.trim());
		const width = first ? indentOf(first) : 0;
		const rows = body.map((l) => l.slice(width));

		while (rows.length && !rows[rows.length - 1].trim()) rows.pop();

		if (style === "|") return rows.join("\n");

		let out = "";

		rows.forEach((row, k) => {
			if (!row.trim()) out += "\n";
			else out += (k && rows[k - 1].trim() ? " " : "") + row;
		});

		return out;
	}

	return block(0) ?? {};
}
