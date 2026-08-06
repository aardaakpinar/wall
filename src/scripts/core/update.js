export async function checkUpdates(config) {
  if (!config.wall?.version) {
    return;
  }

  const res = await fetch(
    `https://api.github.com/repos/aardaakpinar/wall/releases/latest`
  );

  if (!res.ok) {
    return;
  }

  const release = await res.json();

  const current = config.wall.version.replace("v", "");
  const latest = release.tag_name.replace("v", "");

  if (isNewer(latest, current)) {
    showUpdate(release);
  }
}

function isNewer(latest, current) {
  const latestParts = latest.split(".").map(Number);
  const currentParts = current.split(".").map(Number);
  const length = Math.max(latestParts.length, currentParts.length);

  for (let index = 0; index < length; index += 1) {
    const latestPart = latestParts[index] || 0;
    const currentPart = currentParts[index] || 0;

    if (latestPart > currentPart) {
      return true;
    }

    if (latestPart < currentPart) {
      return false;
    }
  }

  return false;
}

function showUpdate(release) {
  console.info(`Wall ${release.tag_name} is available: ${release.html_url}`);
}
