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

  Object.entries(map).forEach(([key, cssVar]) => {
    if (theme?.[key]) {
      root.style.setProperty(cssVar, theme[key]);
    }
  });
}