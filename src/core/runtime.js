export function isExternalUrl(path) {
	return /^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith("//");
}

// Relative paths in config.yaml (avatar, images) are resolved against the
// page that uses Wall, so assets can live next to the user's own index.html.
export function resolveAssetUrl(path) {
	if (!path || isExternalUrl(path) || path.startsWith("#")) {
		return path;
	}

	return new URL(path, window.location.href).href;
}
