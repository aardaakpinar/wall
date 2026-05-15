export async function checkUpdates(config) {
  const res = await fetch(
    `https://api.github.com/repos/aardaakpinar/wall/releases/latest`
  );

  const release = await res.json();

  const current = config.wall.version.replace("v", "");
  const latest = release.tag_name.replace("v", "");

  if (isNewer(latest, current)) {
    showUpdate(release);
  }
}