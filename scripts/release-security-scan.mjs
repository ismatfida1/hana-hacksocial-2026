import fs from "node:fs";
import path from "node:path";

const roots = ["client", "server", "android", ".github", "dist"];
const secretPattern = /(sk-[A-Za-z0-9]{20,}|AIzaSy[A-Za-z0-9_-]{20,}|service_role|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]+ PRIVATE KEY-----)/;
const forbiddenNames = /(^|\/)(\.env($|\.)|.*\.(keystore|jks|pem|p12|mobileprovision))$/i;
const sourceMaps = [];
const forbidden = [];
const matches = [];

function walk(relativeDir) {
  if (!fs.existsSync(relativeDir)) return;
  for (const entry of fs.readdirSync(relativeDir, { withFileTypes: true })) {
    const relative = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) walk(relative);
    else {
      if (forbiddenNames.test(relative.replaceAll(path.sep, "/"))) forbidden.push(relative);
      if (relative.endsWith(".map")) sourceMaps.push(relative);
      if (!relative.endsWith(".lock") && !relative.endsWith("dependency-license-inventory.json")) {
        const content = fs.readFileSync(relative, "utf8");
        if (secretPattern.test(content)) matches.push(relative);
      }
    }
  }
}
for (const root of roots) walk(root);
if (forbidden.length || matches.length || sourceMaps.length) {
  console.error(JSON.stringify({ forbidden, secretMatches: matches, sourceMaps }, null, 2));
  process.exit(1);
}
console.log("Release security scan passed: no literal secret patterns, environment/signing files, or source maps found.");
