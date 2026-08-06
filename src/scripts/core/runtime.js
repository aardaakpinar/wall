let packageBaseUrl = new URL("../../../", import.meta.url).href;

export function setPackageBaseUrl(url) {
  packageBaseUrl = new URL(url).href;
}

export function getPackageBaseUrl() {
  return packageBaseUrl;
}

export function resolvePackageUrl(path) {
  if (!path || isExternalUrl(path) || path.startsWith("#")) {
    return path;
  }

  return new URL(path, packageBaseUrl).href;
}

export function isExternalUrl(path) {
  return /^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith("//");
}
