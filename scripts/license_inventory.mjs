import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const modules = path.join(root, "node_modules");
const packageDirs = [];

function addPackageDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name.startsWith("@") && entry.isDirectory()) {
      addPackageDir(path.join(dir, entry.name));
      continue;
    }
    if (entry.isDirectory()) packageDirs.push(path.join(dir, entry.name));
  }
}

addPackageDir(modules);
const pnpmStore = path.join(modules, ".pnpm");
if (fs.existsSync(pnpmStore)) {
  for (const entry of fs.readdirSync(pnpmStore, { withFileTypes: true })) {
    if (entry.isDirectory()) addPackageDir(path.join(pnpmStore, entry.name, "node_modules"));
  }
}
const rows = [];
for (const dir of packageDirs) {
  const file = path.join(dir, "package.json");
  if (!fs.existsSync(file)) continue;
  try {
    const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
    const license = typeof pkg.license === "string" ? pkg.license : pkg.license?.type || "UNKNOWN";
    const licenses = Array.isArray(pkg.licenses) ? pkg.licenses.map((item) => item.type || item).join(" OR ") : "";
    rows.push({
      name: pkg.name || path.basename(dir),
      version: pkg.version || "UNKNOWN",
      license: licenses || license,
      repository: typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url || "",
      homepage: pkg.homepage || "",
      path: path.relative(root, file),
    });
  } catch {
    rows.push({ name: path.basename(dir), version: "UNKNOWN", license: "UNREADABLE", repository: "", homepage: "", path: path.relative(root, file) });
  }
}
rows.sort((a, b) => a.name.localeCompare(b.name) || a.version.localeCompare(b.version));
const direct = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const directNames = new Set([...Object.keys(direct.dependencies || {}), ...Object.keys(direct.devDependencies || {})]);
const summary = new Map();
for (const row of rows) summary.set(row.license, (summary.get(row.license) || 0) + 1);
const output = {
  generatedAt: new Date().toISOString(),
  packageCount: rows.length,
  directDependencyCount: directNames.size,
  directDependencies: [...directNames].sort(),
  licenseSummary: Object.fromEntries([...summary.entries()].sort((a, b) => a[0].localeCompare(b[0]))),
  packages: rows,
};
fs.writeFileSync(path.join(root, "dependency-license-inventory.json"), JSON.stringify(output, null, 2) + "\n");
console.log(`packages=${rows.length}`);
console.log(`directDependencies=${directNames.size}`);
for (const [license, count] of Object.entries(output.licenseSummary)) console.log(`${count}\t${license}`);
