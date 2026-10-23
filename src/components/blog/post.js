// Loading and describing one Markdown post.
function parseFrontmatter(raw) {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

	if (!match) {
		return { metadata: {}, content: raw };
	}

	const metadata = {};

	match[1].split(/\r?\n/).forEach((line) => {
		const [key, ...rest] = line.split(":");

		if (key.trim()) {
			metadata[key.trim()] = rest.join(":").trim();
		}
	});

	return { metadata, content: match[2] };
}

export async function loadPost(url) {
	try {
		const res = await fetch(new URL(`${url}.md`, window.location.href));

		if (!res.ok) {
			return null;
		}

		const { metadata, content } = parseFrontmatter(await res.text());

		return {
			url,
			content,
			title: metadata.title || "Untitled Post",
			description: metadata.description || "",
			date: metadata.date || "",
			tags: metadata.tags ? metadata.tags.split(",").map((t) => t.trim()) : [],
		};
	} catch (err) {
		console.error(err);

		return null;
	}
}

export function readingTime(content) {
	return `${Math.max(1, Math.round(content.trim().split(/\s+/).length / 200))} min read`;
}
