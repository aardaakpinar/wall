import { defineComponent } from "../../core/component.js";
import { cardClass } from "../../core/card.js";
import { escapeHtml } from "../../core/html.js";
import { loadPost, readingTime } from "./post.js";
import { openPost } from "./reader.js";

export default defineComponent({
	type: "blog",
	styles: new URL("./blog.css", import.meta.url).href,

	async load(card) {
		const posts = await Promise.all((card.items ?? []).map((item) => loadPost(item.url)));

		return posts.filter(Boolean);
	},

	isEmpty(card, ctx, posts) {
		return !posts?.length;
	},

	render(card, ctx, posts) {
		// With exactly three posts the first one is featured (two rows tall).
		const feature = posts.length === 3 && !card.cols && !card.colSpan && !card.columns;
		const cols = card.cols ?? card.colSpan ?? card.columns ?? 2;

		return posts
			.map(
				(post, index) => `
			<div class="${cardClass({ ...card, cols }, "blog-post-card", feature && index === 0 ? "post-feature" : "")}"
				data-post-index="${index}" tabindex="0" role="button">
				<div class="card-inner">
					<div class="blog-post-meta">
						${post.date ? `<span>${escapeHtml(post.date)}</span>` : ""}
						<span>${readingTime(post.content)}</span>
					</div>
					<h3 class="project-name">${escapeHtml(post.title)}</h3>
					<p class="project-description justify">${escapeHtml(post.description)}</p>
					${post.tags.length ? `<div class="project-tags">${post.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>` : ""}
				</div>
			</div>`,
			)
			.join("");
	},

	mount(root, card, ctx, posts) {
		const open = (el) => {
			const post = posts[Number(el.dataset.postIndex)];

			if (post) openPost(post, el);
		};

		root.addEventListener("click", (e) => {
			const el = e.target.closest(".blog-post-card");

			if (el) open(el);
		});

		root.addEventListener("keydown", (e) => {
			const el = e.target.closest(".blog-post-card");

			if (el && (e.key === "Enter" || e.key === " ")) {
				e.preventDefault();
				open(el);
			}
		});
	},
});
