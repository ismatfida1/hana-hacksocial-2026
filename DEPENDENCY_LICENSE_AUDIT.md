# Hana Dependency License Audit

**Generated:** 2026-08-24T20:06:53.089Z
**Installed packages scanned:** 703
**Direct package names in package.json:** 91

> This is a license metadata and commercial-risk screen, not legal clearance. Package metadata can be incomplete or inaccurate; flagged items require review against the exact distributed artifact and applicable provider terms.

## Summary

| Declared license | Package count | Initial review |
|---|---:|---|
| (BSD-2-Clause OR MIT OR Apache-2.0) | 1 | Common permissive license; preserve notices |
| (MIT OR WTFPL) | 1 | Common permissive license; preserve notices |
| 0BSD | 2 | Common permissive license; preserve notices |
| Apache-2.0 | 48 | Common permissive license; preserve notices |
| BlueOak-1.0.0 | 12 | Manual review required |
| BSD-2-Clause | 9 | Common permissive license; preserve notices |
| BSD-3-Clause | 7 | Common permissive license; preserve notices |
| CC-BY-4.0 | 1 | Manual review required |
| ISC | 55 | Common permissive license; preserve notices |
| MIT | 555 | Common permissive license; preserve notices |
| MIT AND ISC | 1 | Common permissive license; preserve notices |
| MPL-2.0 | 3 | Manual review required |
| SEE LICENSE | 2 | Manual review required |
| UNKNOWN | 3 | Manual review required |
| Unlicense | 3 | Manual review required |

## Flagged packages

| Package | Version | Declared metadata | Runtime boundary | Source metadata |
|---|---|---|---|---|
| @builder.io/jsx-loc-internals | 0.0.1 | UNKNOWN | Development/tooling | Not declared |
| @builder.io/vite-plugin-jsx-loc | 0.1.1 | UNKNOWN | Development/tooling | Not declared |
| @trapezedev/gradle-parse | 7.1.9 | SEE LICENSE | Potential runtime/transitive | git+https://github.com/ionic-team/trapeze.git |
| @trapezedev/project | 7.1.9 | SEE LICENSE | Potential runtime/transitive | git+https://github.com/ionic-team/trapeze.git |
| big-integer | 1.6.52 | Unlicense | Potential runtime/transitive | git@github.com:peterolson/BigInteger.js.git |
| caniuse-lite | 1.0.30001748 | CC-BY-4.0 | Potential runtime/transitive | browserslist/caniuse-lite |
| chownr | 3.0.0 | BlueOak-1.0.0 | Potential runtime/transitive | git://github.com/isaacs/chownr.git |
| glob | 13.0.6 | BlueOak-1.0.0 | Potential runtime/transitive | git@github.com:isaacs/node-glob.git |
| lightningcss | 1.30.1 | MPL-2.0 | Potential runtime/transitive | https://github.com/parcel-bundler/lightningcss.git |
| lightningcss-linux-x64-gnu | 1.30.1 | MPL-2.0 | Potential runtime/transitive | https://github.com/parcel-bundler/lightningcss.git |
| lightningcss-linux-x64-musl | 1.30.1 | MPL-2.0 | Potential runtime/transitive | https://github.com/parcel-bundler/lightningcss.git |
| lru-cache | 11.5.2 | BlueOak-1.0.0 | Potential runtime/transitive | git+ssh://git@github.com/isaacs/node-lru-cache.git |
| minimatch | 10.2.6 | BlueOak-1.0.0 | Potential runtime/transitive | git@github.com:isaacs/minimatch |
| minipass | 7.1.3 | BlueOak-1.0.0 | Potential runtime/transitive | https://github.com/isaacs/minipass |
| package-json-from-dist | 1.0.1 | BlueOak-1.0.0 | Potential runtime/transitive | git+https://github.com/isaacs/package-json-from-dist.git |
| path-scurry | 1.11.1 | BlueOak-1.0.0 | Potential runtime/transitive | git+https://github.com/isaacs/path-scurry |
| path-scurry | 2.0.2 | BlueOak-1.0.0 | Potential runtime/transitive | git+https://github.com/isaacs/path-scurry |
| rimraf | 6.1.3 | BlueOak-1.0.0 | Potential runtime/transitive | git@github.com:isaacs/rimraf.git |
| sax | 1.6.1 | BlueOak-1.0.0 | Potential runtime/transitive | git+ssh://git@github.com/isaacs/sax-js.git |
| stream-buffers | 2.2.0 | Unlicense | Potential runtime/transitive | https://github.com/samcday/node-stream-buffer.git |
| tar | 7.5.22 | BlueOak-1.0.0 | Potential runtime/transitive | https://github.com/isaacs/node-tar.git |
| vite-plugin-manus-runtime | 0.0.59 | UNKNOWN | Development/tooling | Not declared |
| wouter | 3.7.1 | Unlicense | Potential runtime/transitive | git+https://github.com/molefrog/wouter.git |
| yallist | 5.0.0 | BlueOak-1.0.0 | Potential runtime/transitive | git+https://github.com/isaacs/yallist.git |

## Immediate conclusions

The scan found 703 installed package records. Most are declared MIT, Apache-2.0, BSD, ISC, or 0BSD. The remaining flagged records require targeted review before commercial distribution, even when they are transitive or development-only.

The previously identified `streamdown → mermaid → khroma` path was removed from the current dependency installation. The refreshed inventory should still be checked after every lockfile change.

Packages declared BlueOak, MPL-2.0, Unlicense, CC-BY-4.0, `SEE LICENSE`, or UNKNOWN require notice preservation and targeted review. A permissive package license does not remove the need to comply with trademarks, bundled assets, fonts, provider terms, or application privacy obligations.

## Recommended release actions

1. Freeze the lockfile and generate the notice index from the exact release build.
2. Obtain license/terms evidence for Manus runtime, Builder tooling, and every remaining flagged package.
3. Review each package marked BlueOak, `SEE LICENSE`, MPL-2.0, CC-BY-4.0, Unlicense, or UNKNOWN.
4. Include required copyright and license notices in web and Android distribution artifacts.
5. Have counsel review the final notice bundle and any copyleft or attribution obligations for the intended distribution model.

## Source artifacts

- `dependency-license-inventory.json` — full installed package metadata.
- `package.json` and `pnpm-lock.yaml` — declared dependency and resolution sources.
- Installed package license files — exact local artifacts inspected where metadata conflicted.
