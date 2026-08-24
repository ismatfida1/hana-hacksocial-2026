import fs from "node:fs";

const inventory = JSON.parse(fs.readFileSync("dependency-license-inventory.json", "utf8"));
const permissive = new Set(["MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "0BSD", "MIT AND ISC", "(BSD-2-Clause OR MIT OR Apache-2.0)", "(MIT OR WTFPL)", "(MPL-2.0 OR Apache-2.0)"]);
const flagged = inventory.packages.filter((pkg) => !permissive.has(pkg.license));
const lines = [
  "# Hana Dependency License Audit",
  "",
  `**Generated:** ${inventory.generatedAt}`,
  `**Installed packages scanned:** ${inventory.packageCount}`,
  `**Direct package names in package.json:** ${inventory.directDependencyCount}`,
  "",
  "> This is a license metadata and commercial-risk screen, not legal clearance. Package metadata can be incomplete or inaccurate; flagged items require review against the exact distributed artifact and applicable provider terms.",
  "",
  "## Summary",
  "",
  "| Declared license | Package count | Initial review |",
  "|---|---:|---|",
];
for (const [license, count] of Object.entries(inventory.licenseSummary)) {
  const review = permissive.has(license) ? "Common permissive license; preserve notices" : "Manual review required";
  lines.push(`| ${license.replaceAll("|", "\\|")} | ${count} | ${review} |`);
}
lines.push("", "## Flagged packages", "", "| Package | Version | Declared metadata | Runtime boundary | Source metadata |", "|---|---|---|---|---|");
for (const pkg of flagged) {
  const runtime = ["@builder.io/jsx-loc-internals", "@builder.io/vite-plugin-jsx-loc", "vite-plugin-manus-runtime"].includes(pkg.name) ? "Development/tooling" : "Potential runtime/transitive";
  lines.push(`| ${pkg.name} | ${pkg.version} | ${pkg.license} | ${runtime} | ${pkg.repository || pkg.homepage || "Not declared"} |`);
}
lines.push(
  "",
  "## Immediate conclusions",
  "",
  `The scan found ${inventory.packageCount} installed package records. Most are declared MIT, Apache-2.0, BSD, ISC, or 0BSD. The remaining flagged records require targeted review before commercial distribution, even when they are transitive or development-only.`,
  "",
  "The previously identified `streamdown → mermaid → khroma` path was removed from the current dependency installation. The refreshed inventory should still be checked after every lockfile change.",
  "",
  "Packages declared BlueOak, MPL-2.0, Unlicense, CC-BY-4.0, `SEE LICENSE`, or UNKNOWN require notice preservation and targeted review. A permissive package license does not remove the need to comply with trademarks, bundled assets, fonts, provider terms, or application privacy obligations.",
  "",
  "## Recommended release actions",
  "",
  "1. Freeze the lockfile and generate the notice index from the exact release build.",
  "2. Obtain license/terms evidence for Manus runtime, Builder tooling, and every remaining flagged package.",
  "3. Review each package marked BlueOak, `SEE LICENSE`, MPL-2.0, CC-BY-4.0, Unlicense, or UNKNOWN.",
  "4. Include required copyright and license notices in web and Android distribution artifacts.",
  "5. Have counsel review the final notice bundle and any copyleft or attribution obligations for the intended distribution model.",
  "",
  "## Source artifacts",
  "",
  "- `dependency-license-inventory.json` — full installed package metadata.",
  "- `package.json` and `pnpm-lock.yaml` — declared dependency and resolution sources.",
  "- Installed package license files — exact local artifacts inspected where metadata conflicted.",
);
fs.writeFileSync("DEPENDENCY_LICENSE_AUDIT.md", lines.join("\n") + "\n");
console.log(`flagged=${flagged.length}`);
for (const pkg of flagged) console.log(`${pkg.name}@${pkg.version}\t${pkg.license}`);
