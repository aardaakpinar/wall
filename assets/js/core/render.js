import { createHero } from "../components/hero.js";
import { createLinks } from "../components/links.js";
import { createProjects } from "../components/projects.js";
import { createImage } from "../components/image.js";
import { createTitle } from "../components/title.js";

export const cardRenderers = {
  hero: (card, config) => createHero(config.profile),

  links: (card) => createLinks(card),

  projects: (card) => createProjects(card),

  image: (card) => createImage(card),

  title: (card) => createTitle(card),

};