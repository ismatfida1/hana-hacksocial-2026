import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inventory = JSON.parse(fs.readFileSync(path.join(root, "dependency-license-inventory.json"), "utf8"));
const permissive = new Set(["MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "0BSD", "MIT AND ISC", "(BSD-2-Clause OR MIT OR Apache-2.0)", "(MIT OR WTFPL)", "(MPL-2.0 OR Apache-2.0)"]);
const flagged = inventory.packages.filter((pkg) => !permissive.has(pkg.license));
const lines = [
  "# HANA Flagged Package License Evidence",
  "",
  `Generated from ${inventory.packageCount} installed records at ${inventory.generatedAt}.`,
  "",
  "> This is an evidence index for legal review. It does not decide whether a package is suitable for HANA’s intended commercial distribution.",
  "",
];
for (const pkg of flagged) {
  const packageJsonPath = path.join(root, pkg.path);
  const packageDir = path.dirname(packageJsonPath);
  let files = [];
  try {
    files = fs.readdirSync(packageDir).filter((name) => /^(licen[cs]e|copying|notice|unlicense|readme)/i.test(name)).slice(0, 12);
  } catch {}
  lines.push(`## ${pkg.name}@${pkg.version}`, "", `- Declared metadata: ${pkg.license}`, `- Source metadata: ${pkg.repository || pkg.homepage || "Not declared"}`, `- Package manifest: ${pkg.path}`, `- Candidate license files: ${files.length ? files.join(", ") : "None found by filename"}`, "");
  for (const file of files) {
    const filePath = path.join(packageDir, file);
    let text = "";
    try { text = fs.readFileSync(filePath, "utf8").slice(0, 12000); } catch { continue; }
    lines.push(`<details><summary>${file}</summary>`, "", "```text", text.replaceAll("```", "``\\`"), "```", "", "</details>", "");
  }
}
fs.writeFileSync(path.join(root, "FLAGGED_PACKAGE_LICENSE_EVIDENCE.md"), lines.join("\n"));
console.log(`flaggedEvidence=${flagged.length}`);
