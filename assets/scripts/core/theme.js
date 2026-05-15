export function applyTheme(theme) {
  const root = document.documentElement;

  const map = {
    background: "--background",
    foreground: "--foreground",
    card: "--card",
    cardForeground: "--card-foreground",
    primary: "--primary",
    primaryForeground: "--primary-foreground",
    muted: "--muted",
    mutedForeground: "--muted-foreground",
    border: "--border",
    radius: "--radius",
  };

  const applyTokens = (tokens = {}) => {
    Object.entries(map).forEach(([key, cssVar]) => {
      if (tokens?.[key]) {
        root.style.setProperty(cssVar, tokens[key]);
      }
    });
  };

  if (theme?.light || theme?.dark) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyMode = () => {
      const fallback = theme.light || theme.dark || {};
      const mode = media.matches
        ? theme.dark || fallback
        : theme.light || fallback;

      applyTokens(mode);
      root.style.colorScheme = media.matches ? "dark" : "light";
    };

    applyMode();
    media.addEventListener?.("change", applyMode);
    return;
  }

  applyTokens(theme);
}
