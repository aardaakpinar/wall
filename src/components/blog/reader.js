// The reading panel that opens beside the grid.
import { escapeAttribute, escapeHtml, sanitizeHtml } from "../../core/html.js";
import { markdownToHtml } from "../../core/markdown.js";
import { readingTime } from "./post.js";

let opener = null;

export function closePost() {
	const panel = document.getElementById("blog-modal");

	if (!panel) {
		return;
	}

	panel.remove();
	document.body.style.overflow = "";
	document.removeEventListener("keydown", onKey);
	opener?.focus?.();
}

function onKey(e) {
	if (e.key === "Escape") {
		closePost();
		return;
	}

	if (e.key !== "Tab") {
		return;
	}

	const items = document.querySelectorAll("#blog-modal button, #blog-modal a[href]");
	const first = items[0];
	const last = items[items.length - 1];

	if (e.shiftKey && document.activeElement === first) {
		e.preventDefault();
		last.focus();
	} else if (!e.shiftKey && document.activeElement === last) {
		e.preventDefault();
		first.focus();
	}
}

export function openPost(post, trigger) {
	closePost();
	opener = trigger ?? document.activeElement;

	const body = sanitizeHtml(markdownToHtml(post.content));
	const hasHeading = /^\s*#\s/.test(post.content);
	const panel = document.createElement("div");

	panel.id = "blog-modal";
	panel.innerHTML = `
		<div class="blog-modal-overlay">
			<article class="blog-modal-content" role="dialog" aria-modal="true" aria-label="${escapeAttribute(post.title)}">
				<header class="blog-modal-head">
					<span class="blog-post-meta">
						${post.date ? `<span>${escapeHtml(post.date)}</span>` : ""}
						<span>${readingTime(post.content)}</span>
					</span>
					<button class="blog-modal-close" aria-label="Close post">&times;</button>
				</header>
				<div class="blog-modal-body justify">
					${hasHeading ? "" : `<h1>${escapeHtml(post.title)}</h1>`}
					${body}
				</div>
			</article>
		</div>
	`;

	panel.querySelector(".blog-modal-overlay").addEventListener("click", (e) => {
		if (e.target === e.currentTarget) closePost();
	});
	panel.querySelector(".blog-modal-close").addEventListener("click", closePost);

	document.body.appendChild(panel);
	document.body.style.overflow = "hidden";
	document.addEventListener("keydown", onKey);
	panel.querySelector(".blog-modal-close").focus();
}
