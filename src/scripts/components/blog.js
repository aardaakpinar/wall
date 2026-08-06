import { cardClass } from "../core/card.js";
import { escapeAttribute, escapeHtml, sanitizeHtml } from "../core/html.js";
import { marked } from "marked";

function parseFrontmatter(raw) {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

	if (!match) {
		return {
			metadata: {},
			content: raw,
		};
	}

	const [, frontmatter, content] = match;

	const metadata = {};

	frontmatter.split(/\r?\n/).forEach((line) => {
		const [key, ...rest] = line.split(":");

		if (!key) {
			return;
		}

		metadata[key.trim()] = rest.join(":").trim();
	});

	return {
		metadata,
		content,
	};
}

async function renderMarkdown(md) {
	try {
		return sanitizeHtml(marked.parse(md));
	} catch (err) {
		console.error(err);

		return `
      <p>
        ${escapeHtml(md).replace(/\n\n/g, "</p><p>")}
      </p>
    `;
	}
}

async function openPostModal(post) {
	const existing = document.getElementById("blog-modal");

	if (existing) {
		existing.remove();
	}

	const body = await renderMarkdown(post.content);

	const modal = document.createElement("div");

	modal.id = "blog-modal";

	modal.innerHTML = `
    <div class="blog-modal-overlay">
      <div class="blog-modal-content">
        <button class="blog-modal-close">
          &times;
        </button>

        ${post.date ? `<small class="blog-post-date">${escapeHtml(post.date)}</small>` : ""}

        <div class="blog-modal-body">
          ${body}
        </div>
      </div>
    </div>
  `;

	modal.querySelector(".blog-modal-overlay").addEventListener("click", (e) => {
		if (e.target === e.currentTarget) {
			modal.remove();
		}
	});

	modal.querySelector(".blog-modal-close").addEventListener("click", () => {
		modal.remove();
	});

	document.body.appendChild(modal);
}

async function getPostMeta(url) {
	try {
		const res = await fetch(new URL(`${url}.md`, window.location.href));

		if (!res.ok) {
			return null;
		}

		const raw = await res.text();

		const { metadata, content } = parseFrontmatter(raw);

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

function createBlogId() {
	if (globalThis.crypto?.randomUUID) {
		return `blog-${globalThis.crypto.randomUUID()}`;
	}

	return `blog-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function createBlog(card) {
	const posts = (await Promise.all(card.items.map((item) => getPostMeta(item.url)))).filter(Boolean);
	const blogId = createBlogId();

	const html = posts
		.map(
			(post, index) => `
    <div
      class="${cardClass(card, "blog-post-card")}"
      data-blog-id="${escapeAttribute(blogId)}"
      data-post-index="${index}"
      tabindex="0"
      role="button"
    >
      <div class="card-inner">

        ${
			post.date
				? `
              <small class="blog-post-date">
                ${escapeHtml(post.date)}
              </small>
            `
				: ""
		}

        <h3 class="project-name">
          ${escapeHtml(post.title)}
        </h3>

        <p class="project-description">
          ${escapeHtml(post.description)}
        </p>

        ${
			post.tags?.length
				? `
              <div class="project-tags">
                ${post.tags
					.map(
						(tag) => `
                  <span class="tag">
                    ${escapeHtml(tag)}
                  </span>
                `,
					)
					.join("")}
              </div>
            `
				: ""
		}

      </div>
    </div>
  `,
		)
		.join("");

	requestAnimationFrame(() => {
		document.querySelectorAll(`.blog-post-card[data-blog-id="${blogId}"]`).forEach((el) => {
			const open = () => {
				const index = Number(el.dataset.postIndex);
				if (!posts[index]) {
					return;
				}

				openPostModal(posts[index]);
			};

			el.addEventListener("click", open);

			el.addEventListener("keydown", (e) => {
				if (e.key === "Enter" || e.key === " ") {
					open();
				}
			});
		});
	});

	return html;
}
