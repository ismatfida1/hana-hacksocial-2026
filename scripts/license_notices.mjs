import fs from "node:fs";

const inventory = JSON.parse(fs.readFileSync("dependency-license-inventory.json", "utf8"));
const lines = [
  "# HANA Third-Party Dependency Notices",
  "",
  "> Generated from the installed dependency inventory. This file is an attribution index, not a substitute for the complete license text of each package. Redistribute the exact license texts required by each package and review flagged metadata separately.",
  "",
  `Generated: ${inventory.generatedAt}`,
  `Installed package records: ${inventory.packageCount}`,
  "",
  "| Package | Version | License metadata | Source |",
  "|---|---|---|---|",
];
for (const pkg of inventory.packages) {
  const source = pkg.repository || pkg.homepage || "Not declared";
  lines.push(`| ${pkg.name.replaceAll("|", "\\|")} | ${pkg.version} | ${String(pkg.license).replaceAll("|", "\\|")} | ${source.replaceAll("|", "\\|")} |`);
}
lines.push("", "## Release handling", "", "1. Preserve the license and copyright notices shipped by every dependency in the final web and Android distribution.", "2. Re-run this generator after every lockfile change.", "3. Obtain targeted legal review for packages whose metadata is UNKNOWN, SEE LICENSE, BlueOak, CC-BY, MPL, Unlicense, or otherwise non-standard.");
fs.writeFileSync("THIRD_PARTY_NOTICES.md", lines.join("\n") + "\n");
console.log(`noticeRecords=${inventory.packages.length}`);
