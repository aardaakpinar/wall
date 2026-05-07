export async function loadConfig() {
  const res = await fetch("config.yaml");
  const text = await res.text();

  return jsyaml.load(text);
}