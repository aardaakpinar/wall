// Built-in components. To add your own: create a folder here and list it below.
import { registerComponent } from "../core/component.js";
import hero from "./hero/hero.js";
import image from "./image/image.js";
import links from "./links/links.js";
import projects from "./projects/projects.js";
import title from "./title/title.js";
import blog from "./blog/blog.js";

[hero, image, links, projects, title, blog].forEach(registerComponent);
