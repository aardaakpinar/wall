import { escapeHtml } from "./html.js";

// Minimal Markdown renderer: headings, paragraphs, lists, quotes, rules,
// fenced code, and inline code/bold/italic/strike/links/images.
// All text is escaped first, so raw HTML in a post is shown as text.
const SAFE_URL = /^(?:https?:|mailto:|[/.#]|[^:]*$)/i;
const LIST_ITEM = /^\s*([-*+]|\d+\.)\s+/;
const RULE = /^\s*([-*_])(\s*\1){2,}\s*$/;

function inline(text) {
	const stash = [];
	const hold = (html) => `\u0000${stash.push(html) - 1}\u0000`;

	let s = text.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g, (_, __, code) => hold(`<code>${escapeHtml(code.trim())}</code>`));

	s = escapeHtml(s);

	s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^)]*&quot;)?\)/g, (_, alt, url) =>
		SAFE_URL.test(url) ? hold(`<img src="${url}" alt="${alt}" loading="lazy">`) : alt,
	);

	s = s.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^)]*&quot;)?\)/g, (_, label, url) =>
		SAFE_URL.test(url) ? `${hold(`<a href="${url}" target="_blank" rel="noopener">`)}${label}${hold("</a>")}` : label,
	);

	s = s
		.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, "<strong>$1</strong>")
		.replace(/(^|[^\w])__(?=\S)([\s\S]*?\S)__(?!\w)/g, "$1<strong>$2</strong>")
		.replace(/\*(?=\S)([\s\S]*?\S)\*/g, "<em>$1</em>")
		.replace(/(^|[^\w])_(?=\S)([\s\S]*?\S)_(?!\w)/g, "$1<em>$2</em>")
		.replace(/~~(?=\S)([\s\S]*?\S)~~/g, "<del>$1</del>");

	return s.replace(/\u0000(\d+)\u0000/g, (_, n) => stash[n]);
}

export function markdownToHtml(markdown) {
	const lines = String(markdown).replace(/\r\n?/g, "\n").split("\n");
	const out = [];
	let i = 0;

	while (i < lines.length) {
		const line = lines[i];
		let m;

		if (!line.trim()) {
			i++;
		} else if ((m = line.match(/^\s*(`{3,}|~{3,})\s*([\w-]*)/))) {
			const fence = m[1][0].repeat(m[1].length);
			const code = [];

			for (i++; i < lines.length && !lines[i].trim().startsWith(fence); i++) {
				code.push(lines[i]);
			}

			i++;
			out.push(`<pre><code${m[2] ? ` class="language-${escapeHtml(m[2])}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
		} else if ((m = line.match(/^(#{1,6})\s+(.*?)(?:\s+#+)?\s*$/))) {
			out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`);
			i++;
		} else if (RULE.test(line)) {
			out.push("<hr>");
			i++;
		} else if (line.startsWith(">")) {
			const quote = [];

			for (; i < lines.length && lines[i].startsWith(">"); i++) {
				quote.push(lines[i].replace(/^>\s?/, ""));
			}

			out.push(`<blockquote>${markdownToHtml(quote.join("\n"))}</blockquote>`);
		} else if (LIST_ITEM.test(line)) {
			const ordered = /^\s*\d+\./.test(line);
			const items = [];

			while (i < lines.length) {
				const row = lines[i];
				const item = row.match(/^\s*([-*+]|\d+\.)\s+(.*)$/);

				if (item && /^\s*\d+\./.test(row) === ordered) {
					items.push(item[2]);
					i++;
				} else if (row.trim() && /^\s+\S/.test(row) && !LIST_ITEM.test(row)) {
					items[items.length - 1] += ` ${row.trim()}`;
					i++;
				} else if (!row.trim() && LIST_ITEM.test(lines[i + 1] ?? "")) {
					i++;
				} else {
					break;
				}
			}

			const tag = ordered ? "ol" : "ul";

			out.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</${tag}>`);
		} else {
			const para = [lines[i++]];

			while (i < lines.length && lines[i].trim() && !/^(\s*(`{3,}|~{3,})|#{1,6}\s|>)/.test(lines[i]) && !LIST_ITEM.test(lines[i]) && !RULE.test(lines[i])) {
				para.push(lines[i++]);
			}

			out.push(`<p>${inline(para.join("\n")).replace(/ {2,}\n/g, "<br>").replace(/\n/g, " ")}</p>`);
		}
	}

	return out.join("\n");
}
