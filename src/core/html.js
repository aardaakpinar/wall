const htmlEscapes = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

export function escapeHtml(value) {
	return String(value ?? "").replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

export function escapeAttribute(value) {
	return escapeHtml(value);
}

export function escapeCssUrl(value) {
	return String(value ?? "").replace(/['"\\\n\r\f]/g, "\\$&");
}

export function safeUrl(value, fallback = "#") {
	const url = String(value ?? "").trim();

	if (!url) {
		return fallback;
	}

	if (/^(?:javascript|data):/i.test(url)) {
		return fallback;
	}

	return url;
}

export function sanitizeHtml(html) {
	const template = document.createElement("template");
	template.innerHTML = html;

	template.content.querySelectorAll("script, iframe, object, embed, link, meta").forEach((node) => {
		node.remove();
	});

	template.content.querySelectorAll("*").forEach((node) => {
		for (const attr of Array.from(node.attributes)) {
			const name = attr.name.toLowerCase();
			const value = attr.value.trim();

			if (name.startsWith("on")) {
				node.removeAttribute(attr.name);
				continue;
			}

			if ((name === "href" || name === "src") && /^(?:javascript|data):/i.test(value)) {
				node.removeAttribute(attr.name);
			}
		}
	});

	return template.innerHTML;
}
