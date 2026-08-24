# HANA Flagged Package License Evidence

Generated from 703 installed records at 2026-08-24T20:06:53.089Z.

> This is an evidence index for legal review. It does not decide whether a package is suitable for HANA’s intended commercial distribution.

## @builder.io/jsx-loc-internals@0.0.1

- Declared metadata: UNKNOWN
- Source metadata: Not declared
- Package manifest: node_modules/.pnpm/@builder.io+jsx-loc-internals@0.0.1/node_modules/@builder.io/jsx-loc-internals/package.json
- Candidate license files: README.md

<details><summary>README.md</summary>

```text
# JSX Location Internals

This package contains shared utilities for JSX location data injection used by:
- [@builder.io/vite-plugin-jsx-loc](../vite-plugin-jsx-loc)
- [@builder.io/webpack-plugin-jsx-loc](../webpack-plugin-jsx-loc)

## About

This package provides the core functionality to transform JSX code by adding `data-loc` attributes that specify the location (file and line number) of each JSX element. This information can be useful for debugging, component tracking, and tool integration.

## Usage

This package is not intended to be used directly. Instead, use one of the plugin packages mentioned above.

## API

The main functionality is provided by the `transformJsxCode` function:

``\`typescript
function transformJsxCode(
  source: string,
  filePath: string,
  options?: {
    parserOptions?: ParserOptions;
  }
): { code: string; map: SourceMap } | null;
``\`

- `source`: The source code string to transform
- `filePath`: The path to the file being processed
- `options`: Optional configuration options
  - `parserOptions`: Custom Babel parser options to use

## How It Works

The transformation works by:
1. Parsing the JSX/TSX code using Babel's parser
2. Walking the AST to find JSX elements
3. Adding a `data-loc` attribute to each element with the file path and line number
4. Generating a source map for the transformation

## License

MIT 
```

</details>

## @builder.io/vite-plugin-jsx-loc@0.1.1

- Declared metadata: UNKNOWN
- Source metadata: Not declared
- Package manifest: node_modules/.pnpm/@builder.io+vite-plugin-jsx-loc@0.1.1_vite@7.1.9_@types+node@24.7.0_jiti@2.6.1_lightningcss@1.30.1_tsx@4.20.6_/node_modules/@builder.io/vite-plugin-jsx-loc/package.json
- Candidate license files: README.md

<details><summary>README.md</summary>

```text
# vite-plugin-jsx-loc

A Vite plugin that adds location data attributes to JSX elements for debugging and development purposes.

## Installation

``\`bash
npm install @builder.io/vite-plugin-jsx-loc
# or
yarn add @builder.io/vite-plugin-jsx-loc
# or
pnpm add @builder.io/vite-plugin-jsx-loc
``\`

## Usage

Add the plugin to your `vite.config.ts`:

``\`typescript
import { defineConfig } from 'vite';
import { jsxLocPlugin } from '@builder.io/vite-plugin-jsx-loc';

export default defineConfig({
  plugins: [jsxLocPlugin()],
});
``\`

This will add a `data-loc` attribute to all JSX elements in your code, containing the relative file path and line number where the element is defined. For example:

``\`jsx
// Input: src/components/Button.tsx
export function Button() {
  return <button>Click me</button>;
}

// Output (during development):
export function Button() {
  return <button data-loc="src/components/Button.tsx:2">Click me</button>;
}
``\`

## Features

- Adds source location information to JSX elements
- Works with both `.jsx` and `.tsx` files
- Skips processing of `node_modules`
- Preserves source maps
- Minimal performance impact
- No configuration required

## License

MIT 
```

</details>

## @trapezedev/gradle-parse@7.1.9

- Declared metadata: SEE LICENSE
- Source metadata: git+https://github.com/ionic-team/trapeze.git
- Package manifest: node_modules/.pnpm/@trapezedev+gradle-parse@7.1.9/node_modules/@trapezedev/gradle-parse/package.json
- Candidate license files: LICENSE

<details><summary>LICENSE</summary>

```text
Copyright 2015-present Drifty Co.
http://drifty.com/

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

</details>

## @trapezedev/project@7.1.9

- Declared metadata: SEE LICENSE
- Source metadata: git+https://github.com/ionic-team/trapeze.git
- Package manifest: node_modules/.pnpm/@trapezedev+project@7.1.9/node_modules/@trapezedev/project/package.json
- Candidate license files: LICENSE

<details><summary>LICENSE</summary>

```text
Copyright 2015-present Drifty Co.
http://drifty.com/

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

</details>

## big-integer@1.6.52

- Declared metadata: Unlicense
- Source metadata: git@github.com:peterolson/BigInteger.js.git
- Package manifest: node_modules/.pnpm/big-integer@1.6.52/node_modules/big-integer/package.json
- Candidate license files: LICENSE, README.md

<details><summary>LICENSE</summary>

```text
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>

```

</details>

<details><summary>README.md</summary>

```text
# BigInteger.js [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Monthly Downloads][downloads-img]][downloads-url]

[travis-url]: https://travis-ci.org/peterolson/BigInteger.js
[travis-img]: https://travis-ci.org/peterolson/BigInteger.js.svg?branch=master
[coveralls-url]: https://coveralls.io/github/peterolson/BigInteger.js?branch=master
[coveralls-img]: https://coveralls.io/repos/peterolson/BigInteger.js/badge.svg?branch=master&service=github
[downloads-url]: https://www.npmjs.com/package/big-integer
[downloads-img]: https://img.shields.io/npm/dm/big-integer.svg

**BigInteger.js** is an arbitrary-length integer library for Javascript, allowing arithmetic operations on integers of unlimited size, notwithstanding memory and time limitations.

**Update (December 2, 2018):** [`BigInt` is being added as a native feature of JavaScript](https://tc39.github.io/proposal-bigint/). This library now works as a polyfill: if the environment supports the native `BigInt`, this library acts as a thin wrapper over the native implementation.

## Installation

If you are using a browser, you can download [BigInteger.js from GitHub](http://peterolson.github.com/BigInteger.js/BigInteger.min.js) or just hotlink to it:

	<script src="https://peterolson.github.io/BigInteger.js/BigInteger.min.js"></script>

If you are using node, you can install BigInteger with [npm](https://npmjs.org/).

    npm install big-integer

Then you can include it in your code:

	var bigInt = require("big-integer");


## Usage
### `bigInt(number, [base], [alphabet], [caseSensitive])`

You can create a bigInt by calling the `bigInt` function. You can pass in

 - a string, which it will parse as an bigInt and throw an `"Invalid integer"` error if the parsing fails.
 - a Javascript number, which it will parse as an bigInt and throw an `"Invalid integer"` error if the parsing fails.
 - another bigInt.
 - nothing, and it will return `bigInt.zero`.

 If you provide a second parameter, then it will parse `number` as a number in base `base`. Note that `base` can be any bigInt (even negative or zero). The letters "a-z" and "A-Z" will be interpreted as the numbers 10 to 35. Higher digits can be specified in angle brackets (`<` and `>`). The default `base` is `10`.

 You can specify a custom alphabet for base conversion with the third parameter. The default `alphabet` is `"0123456789abcdefghijklmnopqrstuvwxyz"`.

 The fourth parameter specifies whether or not the number string should be case-sensitive, i.e. whether `a` and `A` should be treated as different digits. By default `caseSensitive` is `false`.

Examples:

    var zero = bigInt();
    var ninetyThree = bigInt(93);
	var largeNumber = bigInt("75643564363473453456342378564387956906736546456235345");
	var googol = bigInt("1e100");
	var bigNumber = bigInt(largeNumber);

	var maximumByte = bigInt("FF", 16);
	var fiftyFiveGoogol = bigInt("<55>0", googol);

Note that Javascript numbers larger than `9007199254740992` and smaller than `-9007199254740992` are not precisely represented numbers and will not produce exact results. If you are dealing with numbers outside that range, it is better to pass in strings.

### Method Chaining

Note that bigInt operations return bigInts, which allows you to chain methods, for example:

    var salary = bigInt(dollarsPerHour).times(hoursWorked).plus(randomBonuses)

### Constants

There are three named constants already stored that you do not have to construct with the `bigInt` function yourself:

 - `bigInt.one`, equivalent to `bigInt(1)`
 - `bigInt.zero`, equivalent to `bigInt(0)`
 - `bigInt.minusOne`, equivalent to `bigInt(-1)`

The numbers from -999 to 999 are also already prestored and can be accessed using `bigInt[index]`, for example:

 - `bigInt[-999]`, equivalent to `bigInt(-999)`
 - `bigInt[256]`, equivalent to `bigInt(256)`

### Methods

#### `abs()`

Returns the absolute value of a bigInt.

 - `bigInt(-45).abs()` => `45`
 - `bigInt(45).abs()` => `45`

#### `add(number)`

Performs addition.

 - `bigInt(5).add(7)` => `12`

[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Addition)

#### `and(number)`

Performs the bitwise AND operation. The operands are treated as if they were represented using [two's complement representation](http://en.wikipedia.org/wiki/Two%27s_complement).

 - `bigInt(6).and(3)` => `2`
 - `bigInt(6).and(-3)` => `4`

#### `bitLength()`

Returns the number of digits required to represent a bigInt in binary.

 - `bigInt(5)` => `3` (since 5 is `101` in binary, which is three digits long)

#### `compare(number)`

Performs a comparison between two numbers. If the numbers are equal, it returns `0`. If the first number is greater, it returns `1`. If the first number is lesser, it returns `-1`.

 - `bigInt(5).compare(5)` => `0`
 - `bigInt(5).compare(4)` => `1`
 - `bigInt(4).compare(5)` => `-1`

#### `compareAbs(number)`

Performs a comparison between the absolute value of two numbers.

 - `bigInt(5).compareAbs(-5)` => `0`
 - `bigInt(5).compareAbs(4)` => `1`
 - `bigInt(4).compareAbs(-5)` => `-1`

#### `compareTo(number)`

Alias for the `compare` method.

#### `divide(number)`

Performs integer division, disregarding the remainder.

 - `bigInt(59).divide(5)` => `11`

[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Division)

#### `divmod(number)`

Performs division and returns an object with two properties: `quotient` and `remainder`. The sign of the remainder will match the sign of the dividend.

 - `bigInt(59).divmod(5)` => `{quotient: bigInt(11), remainder: bigInt(4) }`
 - `bigInt(-5).divmod(2)` => `{quotient: bigInt(-2), remainder: bigInt(-1) }`

[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Division)

#### `eq(number)`

Alias for the `equals` method.

#### `equals(number)`

Checks if two numbers are equal.

 - `bigInt(5).equals(5)` => `true`
 - `bigInt(4).equals(7)` => `false`

#### `geq(number)`

Alias for the `greaterOrEquals` method.


#### `greater(number)`

Checks if the first number is greater than the second.

 - `bigInt(5).greater(6)` => `false`
 - `bigInt(5).greater(5)` => `false`
 - `bigInt(5).greater(4)` => `true`

#### `greaterOrEquals(number)`

Checks if the first number is greater than or equal to the second.

 - `bigInt(5).greaterOrEquals(6)` => `false`
 - `bigInt(5).greaterOrEquals(5)` => `true`
 - `bigInt(5).greaterOrEquals(4)` => `true`

#### `gt(number)`

Alias for the `greater` method.

#### `isDivisibleBy(number)`

Returns `true` if the first number is divisible by the second number, `false` otherwise.

 - `bigInt(999).isDivisibleBy(333)` => `true`
 - `bigInt(99).isDivisibleBy(5)` => `false`

#### `isEven()`

Returns `true` if the number is even, `false` otherwise.

 - `bigInt(6).isEven()` => `true`
 - `bigInt(3).isEven()` => `false`

#### `isNegative()`

Returns `true` if the number is negative, `false` otherwise.
Returns `false` for `0` and `-0`.

 - `bigInt(-23).isNegative()` => `true`
 - `bigInt(50).isNegative()` => `false`

#### `isOdd()`

Returns `true` if the number is odd, `false` otherwise.

 - `bigInt(13).isOdd()` => `true`
 - `bigInt(40).isOdd()` => `false`

#### `isPositive()`

Return `true` if the number is positive, `false` otherwise.
Returns `false` for `0` and `-0`.

 - `bigInt(54).isPositive()` => `true`
 - `bigInt(-1).isPositive()` => `false`

#### `isPrime(strict?)`

Returns `true` if the number is prime, `false` otherwise.
Set "strict" boolean to true to force GRH-supported lower bound of 2*log(N)^2.

 - `bigInt(5).isPrime()` => `true`
 - `bigInt(6).isPrime()` => `false`

#### `isProbablePrime([iterations], [rng])`

Returns `true` if the number is very likely to be prime, `false` otherwise.
Supplying `iterations` is optional - it determines the number of iterations of the test (default: `5`). The more iterations, the lower chance of getting a false positive.
This uses the [Miller Rabin test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test).

 - `bigInt(5).isProbablePrime()` => `true`
 - `bigInt(49).isProbablePrime()` => `false`
 - `bigInt(1729).isProbablePrime()` => `false`

Note that this function is not deterministic, since it relies on random sampling of factors, so the result for some numbers is not always the same - unless you pass a predictable random number generator as `rng`. The behavior and requirements are the same as with `randBetween`.

 - `bigInt(1729).isProbablePrime(1, () => 0.1)` => `false`
 - `bigInt(1729).isProbablePrime(1, () => 0.2)` => `true`

If the number is composite then the Miller–Rabin primality test declares the number probably prime with a probability at most `4` to the power `−iterations`.
If the number is prime, this function always returns `true`.

#### `isUnit()`

Returns `true` if the number is `1` or `-1`, `false` otherwise.

 - `bigInt.one.isUnit()` => `true`
 - `bigInt.minusOne.isUnit()` => `true`
 - `bigInt(5).isUnit()` => `false`

#### `isZero()`

Return `true` if the number is `0` or `-0`, `false` otherwise.

 - `bigInt.zero.isZero()` => `true`
 - `bigInt("-0").isZero()` => `true`
 - `bigInt(50).isZero()` => `false`

#### `leq(number)`

Alias for the `lesserOrEquals` method.

#### `lesser(number)`

Checks if the first number is lesser than the second.

 - `bigInt(5).lesser(6)` => `true`
 - `bigInt(5).lesser(5)` => `false`
 - `bigInt(5).lesser(4)` => `false`

#### `lesserOrEquals(number)`

Checks if the first number is less than or equal to the second.

 - `bigInt(5).lesserOrEquals(6)` => `true`
 - `bigInt(5).lesserOrEquals(5)` => `true`
 - `bigInt(5).lesserOrEquals(4)` => `false`

#### `lt(number)`

Alias for the `lesser` method.

#### `minus(number)`

Alias for the `subtract` method.

 - `bigInt(3).minus(5)` => `-2`

[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Subtraction)

#### `mod(number)`

Performs division and returns the remainder, disregarding the quotient. The sign of the remainder will match the sign of the dividend.

 - `bigInt(59).mod(5)` =>  `4`
 - `bigInt(-5).mod(2)` => `-1`

[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Division)

#### `modInv(mod)`

Finds the [multiplicative inverse](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse) of the number modulo `mod`.

 - `bigInt(3).modInv(11)` => `4`
 - `bigInt(42).modInv(2017)` => `1969`

#### `modPow(exp, mod)`

Takes the number to the power `exp` modulo `mod`.

 - `bigInt(10).modPow(3, 30)` => `10`

#### `multiply(number)`

Performs multiplication.

 - `bigInt(111).multiply(111)` => `12321`

[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Multiplication)

#### `neq(number)`

Alias for the `notEquals` method.

#### `next()`

Adds one to the number.

 - `bigInt(6).next()` => `7`

#### `not()`

Performs the bitwise NOT operation. The operands are treated as if they were represented using [two's complement representation](http://en.wikipedia.org/wiki/Two%27s_complement).

 - `bigInt(10).not()` => `-11`
 - `bigInt(0).not()` => `-1`

#### `notEquals(number)`

Checks if two numbers are not equal.

 - `bigInt(5).notEquals(5)` => `false`
 - `bigInt(4).notEquals(7)` => `true`

#### `or(number)`

Performs the bitwise OR operation. The operands are treated as if they were represented using [two's complement representation](http://en.wikipedia.org/wiki/Two%27s_complement).

 - `bigInt(13).or(10)` => `15`
 - `bigInt(13).or(-8)` => `-3`

#### `over(number)`

Alias for the `divide` method.

 - `bigInt(59).over(5)` => `11`

[View be
```

</details>

## caniuse-lite@1.0.30001748

- Declared metadata: CC-BY-4.0
- Source metadata: browserslist/caniuse-lite
- Package manifest: node_modules/.pnpm/caniuse-lite@1.0.30001748/node_modules/caniuse-lite/package.json
- Candidate license files: LICENSE, README.md

<details><summary>LICENSE</summary>

```text
Attribution 4.0 International

=======================================================================

Creative Commons Corporation ("Creative Commons") is not a law firm and
does not provide legal services or legal advice. Distribution of
Creative Commons public licenses does not create a lawyer-client or
other relationship. Creative Commons makes its licenses and related
information available on an "as-is" basis. Creative Commons gives no
warranties regarding its licenses, any material licensed under their
terms and conditions, or any related information. Creative Commons
disclaims all liability for damages resulting from their use to the
fullest extent possible.

Using Creative Commons Public Licenses

Creative Commons public licenses provide a standard set of terms and
conditions that creators and other rights holders may use to share
original works of authorship and other material subject to copyright
and certain other rights specified in the public license below. The
following considerations are for informational purposes only, are not
exhaustive, and do not form part of our licenses.

     Considerations for licensors: Our public licenses are
     intended for use by those authorized to give the public
     permission to use material in ways otherwise restricted by
     copyright and certain other rights. Our licenses are
     irrevocable. Licensors should read and understand the terms
     and conditions of the license they choose before applying it.
     Licensors should also secure all rights necessary before
     applying our licenses so that the public can reuse the
     material as expected. Licensors should clearly mark any
     material not subject to the license. This includes other CC-
     licensed material, or material used under an exception or
     limitation to copyright. More considerations for licensors:
	wiki.creativecommons.org/Considerations_for_licensors

     Considerations for the public: By using one of our public
     licenses, a licensor grants the public permission to use the
     licensed material under specified terms and conditions. If
     the licensor's permission is not necessary for any reason--for
     example, because of any applicable exception or limitation to
     copyright--then that use is not regulated by the license. Our
     licenses grant only permissions under copyright and certain
     other rights that a licensor has authority to grant. Use of
     the licensed material may still be restricted for other
     reasons, including because others have copyright or other
     rights in the material. A licensor may make special requests,
     such as asking that all changes be marked or described.
     Although not required by our licenses, you are encouraged to
     respect those requests where reasonable. More_considerations
     for the public: 
	wiki.creativecommons.org/Considerations_for_licensees

=======================================================================

Creative Commons Attribution 4.0 International Public License

By exercising the Licensed Rights (defined below), You accept and agree
to be bound by the terms and conditions of this Creative Commons
Attribution 4.0 International Public License ("Public License"). To the
extent this Public License may be interpreted as a contract, You are
granted the Licensed Rights in consideration of Your acceptance of
these terms and conditions, and the Licensor grants You such rights in
consideration of benefits the Licensor receives from making the
Licensed Material available under these terms and conditions.


Section 1 -- Definitions.

  a. Adapted Material means material subject to Copyright and Similar
     Rights that is derived from or based upon the Licensed Material
     and in which the Licensed Material is translated, altered,
     arranged, transformed, or otherwise modified in a manner requiring
     permission under the Copyright and Similar Rights held by the
     Licensor. For purposes of this Public License, where the Licensed
     Material is a musical work, performance, or sound recording,
     Adapted Material is always produced where the Licensed Material is
     synched in timed relation with a moving image.

  b. Adapter's License means the license You apply to Your Copyright
     and Similar Rights in Your contributions to Adapted Material in
     accordance with the terms and conditions of this Public License.

  c. Copyright and Similar Rights means copyright and/or similar rights
     closely related to copyright including, without limitation,
     performance, broadcast, sound recording, and Sui Generis Database
     Rights, without regard to how the rights are labeled or
     categorized. For purposes of this Public License, the rights
     specified in Section 2(b)(1)-(2) are not Copyright and Similar
     Rights.

  d. Effective Technological Measures means those measures that, in the
     absence of proper authority, may not be circumvented under laws
     fulfilling obligations under Article 11 of the WIPO Copyright
     Treaty adopted on December 20, 1996, and/or similar international
     agreements.

  e. Exceptions and Limitations means fair use, fair dealing, and/or
     any other exception or limitation to Copyright and Similar Rights
     that applies to Your use of the Licensed Material.

  f. Licensed Material means the artistic or literary work, database,
     or other material to which the Licensor applied this Public
     License.

  g. Licensed Rights means the rights granted to You subject to the
     terms and conditions of this Public License, which are limited to
     all Copyright and Similar Rights that apply to Your use of the
     Licensed Material and that the Licensor has authority to license.

  h. Licensor means the individual(s) or entity(ies) granting rights
     under this Public License.

  i. Share means to provide material to the public by any means or
     process that requires permission under the Licensed Rights, such
     as reproduction, public display, public performance, distribution,
     dissemination, communication, or importation, and to make material
     available to the public including in ways that members of the
     public may access the material from a place and at a time
     individually chosen by them.

  j. Sui Generis Database Rights means rights other than copyright
     resulting from Directive 96/9/EC of the European Parliament and of
     the Council of 11 March 1996 on the legal protection of databases,
     as amended and/or succeeded, as well as other essentially
     equivalent rights anywhere in the world.

  k. You means the individual or entity exercising the Licensed Rights
     under this Public License. Your has a corresponding meaning.


Section 2 -- Scope.

  a. License grant.

       1. Subject to the terms and conditions of this Public License,
          the Licensor hereby grants You a worldwide, royalty-free,
          non-sublicensable, non-exclusive, irrevocable license to
          exercise the Licensed Rights in the Licensed Material to:

            a. reproduce and Share the Licensed Material, in whole or
               in part; and

            b. produce, reproduce, and Share Adapted Material.

       2. Exceptions and Limitations. For the avoidance of doubt, where
          Exceptions and Limitations apply to Your use, this Public
          License does not apply, and You do not need to comply with
          its terms and conditions.

       3. Term. The term of this Public License is specified in Section
          6(a).

       4. Media and formats; technical modifications allowed. The
          Licensor authorizes You to exercise the Licensed Rights in
          all media and formats whether now known or hereafter created,
          and to make technical modifications necessary to do so. The
          Licensor waives and/or agrees not to assert any right or
          authority to forbid You from making technical modifications
          necessary to exercise the Licensed Rights, including
          technical modifications necessary to circumvent Effective
          Technological Measures. For purposes of this Public License,
          simply making modifications authorized by this Section 2(a)
          (4) never produces Adapted Material.

       5. Downstream recipients.

            a. Offer from the Licensor -- Licensed Material. Every
               recipient of the Licensed Material automatically
               receives an offer from the Licensor to exercise the
               Licensed Rights under the terms and conditions of this
               Public License.

            b. No downstream restrictions. You may not offer or impose
               any additional or different terms or conditions on, or
               apply any Effective Technological Measures to, the
               Licensed Material if doing so restricts exercise of the
               Licensed Rights by any recipient of the Licensed
               Material.

       6. No endorsement. Nothing in this Public License constitutes or
          may be construed as permission to assert or imply that You
          are, or that Your use of the Licensed Material is, connected
          with, or sponsored, endorsed, or granted official status by,
          the Licensor or others designated to receive attribution as
          provided in Section 3(a)(1)(A)(i).

  b. Other rights.

       1. Moral rights, such as the right of integrity, are not
          licensed under this Public License, nor are publicity,
          privacy, and/or other similar personality rights; however, to
          the extent possible, the Licensor waives and/or agrees not to
          assert any such rights held by the Licensor to the limited
          extent necessary to allow You to exercise the Licensed
          Rights, but not otherwise.

       2. Patent and trademark rights are not licensed under this
          Public License.

       3. To the extent possible, the Licensor waives any right to
          collect royalties from You for the exercise of the Licensed
          Rights, whether directly or through a collecting society
          under any voluntary or waivable statutory or compulsory
          licensing scheme. In all other cases the Licensor expressly
          reserves any right to collect such royalties.


Section 3 -- License Conditions.

Your exercise of the Licensed Rights is expressly made subject to the
following conditions.

  a. Attribution.

       1. If You Share the Licensed Material (including in modified
          form), You must:

            a. retain the following if it is supplied by the Licensor
               with the Licensed Material:

                 i. identification of the creator(s) of the Licensed
                    Material and any others designated to receive
                    attribution, in any reasonable manner requested by
                    the Licensor (including by pseudonym if
                    designated);

                ii. a copyright notice;

               iii. a notice that refers to this Public License;

                iv. a notice that refers to the disclaimer of
                    warranties;

                 v. a URI or hyperlink to the Licensed Material to the
                    extent reasonably practicable;

            b. indicate if You modified the Licensed Material and
               retain an indication of any previous modifications; and

            c. indicate the Licensed Material is licensed under this
               Public License, and include the text of, or the URI or
               hyperlink to, this Public License.

       2. You may satisfy the conditions in Section 3(a)(1) in any
          reasonable manner based on the medium, means, and context in
          which You Share the Licensed Material. For example, it may be
          reasonable to satisfy the conditions by providing a URI or
          hyperlink to a resource t
```

</details>

<details><summary>README.md</summary>

```text
# caniuse-lite

A smaller version of caniuse-db, with only the essentials!

## Docs
Read full docs **[here](https://github.com/browserslist/caniuse-lite#readme)**.

```

</details>

## chownr@3.0.0

- Declared metadata: BlueOak-1.0.0
- Source metadata: git://github.com/isaacs/chownr.git
- Package manifest: node_modules/.pnpm/chownr@3.0.0/node_modules/chownr/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
All packages under `src/` are licensed according to the terms in
their respective `LICENSE` or `LICENSE.md` files.

The remainder of this project is licensed under the Blue Oak
Model License, as follows:

-----

# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
Like `chown -R`.

Takes the same arguments as `fs.chown()`

```

</details>

## glob@13.0.6

- Declared metadata: BlueOak-1.0.0
- Source metadata: git@github.com:isaacs/node-glob.git
- Package manifest: node_modules/.pnpm/glob@13.0.6/node_modules/glob/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
All packages under `src/` are licensed according to the terms in
their respective `LICENSE` or `LICENSE.md` files.

The remainder of this project is licensed under the Blue Oak
Model License, as follows:

-----

# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
# Glob

Match files using the patterns the shell uses.

The most correct and second fastest glob implementation in
JavaScript. (See [**Comparison to Other JavaScript Glob
Implementations**](#comparisons-to-other-fnmatchglob-implementations)
at the bottom of this readme.)

![a fun cartoon logo made of glob
characters](https://github.com/isaacs/node-glob/raw/main/logo/glob.png)

## Usage

Install with npm

``\`
npm i glob
``\`

> [!NOTE]
> The npm package name is _not_ `node-glob` that's a
> different thing that was abandoned years ago. Just `glob`.

``\`js
// load using import
import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'
// or using commonjs, that's fine, too
const {
  glob,
  globSync,
  globStream,
  globStreamSync,
  Glob,
} = require('glob')

// the main glob() and globSync() resolve/return array of filenames

// all js files, but don't look in node_modules
const jsfiles = await glob('**/*.js', { ignore: 'node_modules/**' })

// pass in a signal to cancel the glob walk
const stopAfter100ms = await glob('**/*.css', {
  signal: AbortSignal.timeout(100),
})

// multiple patterns supported as well
const images = await glob(['css/*.{png,jpeg}', 'public/*.{png,jpeg}'])

// but of course you can do that with the glob pattern also
// the sync function is the same, just returns a string[] instead
// of Promise<string[]>
const imagesAlt = globSync('{css,public}/*.{png,jpeg}')

// you can also stream them, this is a Minipass stream
const filesStream = globStream(['**/*.dat', 'logs/**/*.log'])

// construct a Glob object if you wanna do it that way, which
// allows for much faster walks if you have to look in the same
// folder multiple times.
const g = new Glob('**/foo', {})
// glob objects are async iterators, can also do globIterate() or
// g.iterate(), same deal
for await (const file of g) {
  console.log('found a foo file:', file)
}
// pass a glob as the glob options to reuse its settings and caches
const g2 = new Glob('**/bar', g)
// sync iteration works as well
for (const file of g2) {
  console.log('found a bar file:', file)
}

// you can also pass withFileTypes: true to get Path objects
// these are like a fs.Dirent, but with some more added powers
// check out https://isaacs.github.io/path-scurry/classes/PathBase.html
// for more info on their API
const g3 = new Glob('**/baz/**', { withFileTypes: true })
g3.stream().on('data', path => {
  console.log(
    'got a path object',
    path.fullpath(),
    path.isDirectory(),
    path.readdirSync().map(e => e.name),
  )
})

// if you use stat:true and withFileTypes, you can sort results
// by things like modified time, filter by permission mode, etc.
// All Stats fields will be available in that case. Slightly
// slower, though.
// For example:
const results = await glob('**', { stat: true, withFileTypes: true })

const timeSortedFiles = results
  .sort((a, b) => a.mtimeMs - b.mtimeMs)
  .map(path => path.fullpath())

const groupReadableFiles = results
  .filter(path => path.mode & 0o040)
  .map(path => path.fullpath())

// custom ignores can be done like this, for example by saying
// you'll ignore all markdown files, and all folders named 'docs'
const customIgnoreResults = await glob('**', {
  ignore: {
    ignored: p => /\.md$/.test(p.name),
    childrenIgnored: p => p.isNamed('docs'),
  },
})

// another fun use case, only return files with the same name as
// their parent folder, plus either `.ts` or `.js`
const folderNamedModules = await glob('**/*.{ts,js}', {
  ignore: {
    ignored: p => {
      const pp = p.parent
      return !(p.isNamed(pp.name + '.ts') || p.isNamed(pp.name + '.js'))
    },
  },
})

// find all files edited in the last hour, to do this, we ignore
// all of them that are more than an hour old
const newFiles = await glob('**', {
  // need stat so we have mtime
  stat: true,
  // only want the files, not the dirs
  nodir: true,
  ignore: {
    ignored: p => {
      return new Date() - p.mtime > 60 * 60 * 1000
    },
    // could add similar childrenIgnored here as well, but
    // directory mtime is inconsistent across platforms, so
    // probably better not to, unless you know the system
    // tracks this reliably.
  },
})
``\`

> [!NOTE]
> Glob patterns should always use `/` as a path separator,
> even on Windows systems, as `\` is used to escape glob
> characters. If you wish to use `\` as a path separator _instead
> of_ using it as an escape character on Windows platforms, you may
> set `windowsPathsNoEscape:true` in the options. In this mode,
> special glob characters cannot be escaped, making it impossible
> to match a literal `*` `?` and so on in filenames.

## Command Line Interface

The glob CLI has been moved to the `glob-bin` package, and must
be installed separately, as of version 13.

``\`
npm install glob-bin
``\`

## `glob(pattern: string | string[], options?: GlobOptions) => Promise<string[] | Path[]>`

Perform an asynchronous glob search for the pattern(s) specified.
Returns
[Path](https://isaacs.github.io/path-scurry/classes/PathBase)
objects if the `withFileTypes` option is set to `true`. See below
for full options field desciptions.

## `globSync(pattern: string | string[], options?: GlobOptions) => string[] | Path[]`

Synchronous form of `glob()`.

Alias: `glob.sync()`

## `globIterate(pattern: string | string[], options?: GlobOptions) => AsyncGenerator<string>`

Return an async iterator for walking glob pattern matches.

Alias: `glob.iterate()`

## `globIterateSync(pattern: string | string[], options?: GlobOptions) => Generator<string>`

Return a sync iterator for walking glob pattern matches.

Alias: `glob.iterate.sync()`, `glob.sync.iterate()`

## `globStream(pattern: string | string[], options?: GlobOptions) => Minipass<string | Path>`

Return a stream that emits all the strings or `Path` objects and
then emits `end` when completed.

Alias: `glob.stream()`

## `globStreamSync(pattern: string | string[], options?: GlobOptions) => Minipass<string | Path>`

Syncronous form of `globStream()`. Will read all the matches as
fast as you consume them, even all in a single tick if you
consume them immediately, but will still respond to backpressure
if they're not consumed immediately.

Alias: `glob.stream.sync()`, `glob.sync.stream()`

## `hasMagic(pattern: string | string[], options?: GlobOptions) => boolean`

Returns `true` if the provided pattern contains any "magic" glob
characters, given the options provided.

Brace expansion is not considered "magic" unless the
`magicalBraces` option is set, as brace expansion just turns one
string into an array of strings. So a pattern like `'x{a,b}y'`
would return `false`, because `'xay'` and `'xby'` both do not
contain any magic glob characters, and it's treated the same as
if you had called it on `['xay', 'xby']`. When
`magicalBraces:true` is in the options, brace expansion _is_
treated as a pattern having magic.

## `escape(pattern: string, options?: GlobOptions) => string`

Escape all magic characters in a glob pattern, so that it will
only ever match literal strings

If the `windowsPathsNoEscape` option is used, then characters are
escaped by wrapping in `[]`, because a magic character wrapped in
a character class can only be satisfied by that exact character.

Slashes (and backslashes in `windowsPathsNoEscape` mode) cannot
be escaped or unescaped.

## `unescape(pattern: string, options?: GlobOptions) => string`

Un-escape a glob string that may contain some escaped characters.

If the `windowsPathsNoEscape` option is used, then square-brace
escapes are removed, but not backslash escapes. For example, it
will turn the string `'[*]'` into `*`, but it will not turn
`'\\*'` into `'*'`, because `\` is a path separator in
`windowsPathsNoEscape` mode.

When `windowsPathsNoEscape` is not set, then both brace escapes
and backslash escapes are removed.

Slashes (and backslashes in `windowsPathsNoEscape` mode) cannot
be escaped or unescaped.

## Class `Glob`

An object that can perform glob pattern traversals.

### `const g = new Glob(pattern: string | string[], options: GlobOptions)`

Options object is required.

See full options descriptions below.

> [!NOTE]
> A previous `Glob` object can be passed as the
> `GlobOptions` to another `Glob` instantiation to re-use settings
> and caches with a new pattern.

Traversal functions can be called multiple times to run the walk
again.

### `g.stream()`

Stream results asynchronously.

### `g.streamSync()`

Stream results synchronously.

### `g.iterate()`

Default async iteration function. Returns an AsyncGenerator that
iterates over the results.

### `g.iterateSync()`

Default sync iteration function. Returns a Generator that
iterates over the results.

### `g.walk()`

Returns a Promise that resolves to the results array.

### `g.walkSync()`

Returns a results array.

### Properties

All options are stored as properties on the `Glob` object.

- `opts` The options provided to the constructor.
- `patterns` An array of parsed immutable `Pattern` objects.

## Options

Exported as `GlobOptions` TypeScript interface. A `GlobOptions`
object may be provided to any of the exported methods, and must
be provided to the `Glob` constructor.

All options are optional, boolean, and false by default, unless
otherwise noted.

All resolved options are added to the Glob object as properties.

If you are running many `glob` operations, you can pass a Glob
object as the `options` argument to a subsequent operation to
share the previously loaded cache.

- `cwd` String path or `file://` string or URL object. The
  current working directory in which to search. Defaults to
  `process.cwd()`. See also: "Windows, CWDs, Drive Letters, and
  UNC Paths", below.

  This option may be either a string path or a `file://` URL
  object or string.

- `root` A string path resolved against the `cwd` option, which
  is used as the starting point for absolute patterns that start
  with `/`, (but not drive letters or UNC paths on Windows).

  To start absolute and non-absolute patterns in the same path,
  you can use `{root:''}`. However, be aware that on Windows
  systems, a pattern like `x:/*` or `//host/share/*` will
  _always_ start in the `x:/` or `//host/share` directory,
  regardless of the `root` setting.

> [!NOTE] This _doesn't_ necessarily limit the walk to the
> `root` directory, and doesn't affect the cwd starting point
> for non-absolute patterns. A pattern containing `..` will
> still be able to traverse out of the root directory, if it
> is not an actual root directory on the filesystem, and any
> non-absolute patterns will be matched in the `cwd`. For
> example, the pattern `/../*` with `{root:'/some/path'}`
> will return all files in `/some`, not all files in
> `/some/path`. The pattern `*` with `{root:'/some/path'}`
> will return all the entries in the cwd, not the entries in
> `/some/path`.

- `windowsPathsNoEscape` Use `\\` as a path separator _only_, and
  _never_ as an escape character. If set, all `\\` characters are
  replaced with `/` in the pattern.

> [!NOTE]
> This makes it **impossible** to match against paths
> containing literal glob pattern characters, but allows matching
> with patterns constructed using `path.join()` and
> `path.resolve()` on Windows platforms, mimicking the (buggy!)
> behavior of Glob v7 and before on Windows. Please use with
> caution, and be mindful of [the caveat below about Windows
> paths](#windows). (For legacy reasons, this is also set if
> `allowWindowsEscape` is set to the exact value `false`.)

- `dot` Include `.dot` files in normal matches and `globstar`
  matches. Note that an explicit dot in a portion of the pattern
  will always match dot files.

- `magicalBraces` Treat brace expansion like `{a,b}` as a "magic"
  pattern. Has no effect if {@link nobrace} is set.

  Only has effect on the {@link hasMagic} function, no effect on
  glob pattern matching itself.

- `dotRelative` Prepend all relative path strings with `./` (or
  `.\` on Windows).

  Without this 
```

</details>

## lightningcss@1.30.1

- Declared metadata: MPL-2.0
- Source metadata: https://github.com/parcel-bundler/lightningcss.git
- Package manifest: node_modules/.pnpm/lightningcss@1.30.1/node_modules/lightningcss/package.json
- Candidate license files: LICENSE, README.md

<details><summary>LICENSE</summary>

```text
 Mozilla Public License Version 2.0
==================================

1. Definitions
--------------

1.1. "Contributor"
means each individual or legal entity that creates, contributes to
the creation of, or owns Covered Software.

1.2. "Contributor Version"
means the combination of the Contributions of others (if any) used
by a Contributor and that particular Contributor's Contribution.

1.3. "Contribution"
means Covered Software of a particular Contributor.

1.4. "Covered Software"
means Source Code Form to which the initial Contributor has attached
the notice in Exhibit A, the Executable Form of such Source Code
Form, and Modifications of such Source Code Form, in each case
including portions thereof.

1.5. "Incompatible With Secondary Licenses"
means

(a) that the initial Contributor has attached the notice described
in Exhibit B to the Covered Software; or

(b) that the Covered Software was made available under the terms of
version 1.1 or earlier of the License, but not also under the
terms of a Secondary License.

1.6. "Executable Form"
means any form of the work other than Source Code Form.

1.7. "Larger Work"
means a work that combines Covered Software with other material, in
a separate file or files, that is not Covered Software.

1.8. "License"
means this document.

1.9. "Licensable"
means having the right to grant, to the maximum extent possible,
whether at the time of the initial grant or subsequently, any and
all of the rights conveyed by this License.

1.10. "Modifications"
means any of the following:

(a) any file in Source Code Form that results from an addition to,
deletion from, or modification of the contents of Covered
Software; or

(b) any new file in Source Code Form that contains any Covered
Software.

1.11. "Patent Claims" of a Contributor
means any patent claim(s), including without limitation, method,
process, and apparatus claims, in any patent Licensable by such
Contributor that would be infringed, but for the grant of the
License, by the making, using, selling, offering for sale, having
made, import, or transfer of either its Contributions or its
Contributor Version.

1.12. "Secondary License"
means either the GNU General Public License, Version 2.0, the GNU
Lesser General Public License, Version 2.1, the GNU Affero General
Public License, Version 3.0, or any later versions of those
licenses.

1.13. "Source Code Form"
means the form of the work preferred for making modifications.

1.14. "You" (or "Your")
means an individual or a legal entity exercising rights under this
License. For legal entities, "You" includes any entity that
controls, is controlled by, or is under common control with You. For
purposes of this definition, "control" means (a) the power, direct
or indirect, to cause the direction or management of such entity,
whether by contract or otherwise, or (b) ownership of more than
fifty percent (50%) of the outstanding shares or beneficial
ownership of such entity.

2. License Grants and Conditions
--------------------------------

2.1. Grants

Each Contributor hereby grants You a world-wide, royalty-free,
non-exclusive license:

(a) under intellectual property rights (other than patent or trademark)
Licensable by such Contributor to use, reproduce, make available,
modify, display, perform, distribute, and otherwise exploit its
Contributions, either on an unmodified basis, with Modifications, or
as part of a Larger Work; and

(b) under Patent Claims of such Contributor to make, use, sell, offer
for sale, have made, import, and otherwise transfer either its
Contributions or its Contributor Version.

2.2. Effective Date

The licenses granted in Section 2.1 with respect to any Contribution
become effective for each Contribution on the date the Contributor first
distributes such Contribution.

2.3. Limitations on Grant Scope

The licenses granted in this Section 2 are the only rights granted under
this License. No additional rights or licenses will be implied from the
distribution or licensing of Covered Software under this License.
Notwithstanding Section 2.1(b) above, no patent license is granted by a
Contributor:

(a) for any code that a Contributor has removed from Covered Software;
or

(b) for infringements caused by: (i) Your and any other third party's
modifications of Covered Software, or (ii) the combination of its
Contributions with other software (except as part of its Contributor
Version); or

(c) under Patent Claims infringed by Covered Software in the absence of
its Contributions.

This License does not grant any rights in the trademarks, service marks,
or logos of any Contributor (except as may be necessary to comply with
the notice requirements in Section 3.4).

2.4. Subsequent Licenses

No Contributor makes additional grants as a result of Your choice to
distribute the Covered Software under a subsequent version of this
License (see Section 10.2) or under the terms of a Secondary License (if
permitted under the terms of Section 3.3).

2.5. Representation

Each Contributor represents that the Contributor believes its
Contributions are its original creation(s) or it has sufficient rights
to grant the rights to its Contributions conveyed by this License.

2.6. Fair Use

This License is not intended to limit any rights You have under
applicable copyright doctrines of fair use, fair dealing, or other
equivalents.

2.7. Conditions

Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted
in Section 2.1.

3. Responsibilities
-------------------

3.1. Distribution of Source Form

All distribution of Covered Software in Source Code Form, including any
Modifications that You create or to which You contribute, must be under
the terms of this License. You must inform recipients that the Source
Code Form of the Covered Software is governed by the terms of this
License, and how they can obtain a copy of this License. You may not
attempt to alter or restrict the recipients' rights in the Source Code
Form.

3.2. Distribution of Executable Form

If You distribute Covered Software in Executable Form then:

(a) such Covered Software must also be made available in Source Code
Form, as described in Section 3.1, and You must inform recipients of
the Executable Form how they can obtain a copy of such Source Code
Form by reasonable means in a timely manner, at a charge no more
than the cost of distribution to the recipient; and

(b) You may distribute such Executable Form under the terms of this
License, or sublicense it under different terms, provided that the
license for the Executable Form does not attempt to limit or alter
the recipients' rights in the Source Code Form under this License.

3.3. Distribution of a Larger Work

You may create and distribute a Larger Work under terms of Your choice,
provided that You also comply with the requirements of this License for
the Covered Software. If the Larger Work is a combination of Covered
Software with a work governed by one or more Secondary Licenses, and the
Covered Software is not Incompatible With Secondary Licenses, this
License permits You to additionally distribute such Covered Software
under the terms of such Secondary License(s), so that the recipient of
the Larger Work may, at their option, further distribute the Covered
Software under the terms of either this License or such Secondary
License(s).

3.4. Notices

You may not remove or alter the substance of any license notices
(including copyright notices, patent notices, disclaimers of warranty,
or limitations of liability) contained within the Source Code Form of
the Covered Software, except that You may alter any license notices to
the extent required to remedy known factual inaccuracies.

3.5. Application of Additional Terms

You may choose to offer, and to charge a fee for, warranty, support,
indemnity or liability obligations to one or more recipients of Covered
Software. However, You may do so only on Your own behalf, and not on
behalf of any Contributor. You must make it absolutely clear that any
such warranty, support, indemnity, or liability obligation is offered by
You alone, and You hereby agree to indemnify every Contributor for any
liability incurred by such Contributor as a result of warranty, support,
indemnity or liability terms You offer. You may include additional
disclaimers of warranty and limitations of liability specific to any
jurisdiction.

4. Inability to Comply Due to Statute or Regulation
---------------------------------------------------

If it is impossible for You to comply with any of the terms of this
License with respect to some or all of the Covered Software due to
statute, judicial order, or regulation then You must: (a) comply with
the terms of this License to the maximum extent possible; and (b)
describe the limitations and the code they affect. Such description must
be placed in a text file included with all distributions of the Covered
Software under this License. Except to the extent prohibited by statute
or regulation, such description must be sufficiently detailed for a
recipient of ordinary skill to be able to understand it.

5. Termination
--------------

5.1. The rights granted under this License will terminate automatically
if You fail to comply with any of its terms. However, if You become
compliant, then the rights granted under this License from a particular
Contributor are reinstated (a) provisionally, unless and until such
Contributor explicitly and finally terminates Your grants, and (b) on an
ongoing basis, if such Contributor fails to notify You of the
non-compliance by some reasonable means prior to 60 days after You have
come back into compliance. Moreover, Your grants from a particular
Contributor are reinstated on an ongoing basis if such Contributor
notifies You of the non-compliance by some reasonable means, this is the
first time You have received notice of non-compliance with this License
from such Contributor, and You become compliant prior to 30 days after
Your receipt of the notice.

5.2. If You initiate litigation against any entity by asserting a patent
infringement claim (excluding declaratory judgment actions,
counter-claims, and cross-claims) alleging that a Contributor Version
directly or indirectly infringes any patent, then the rights granted to
You by any and all Contributors for the Covered Software under Section
2.1 of this License shall terminate.

5.3. In the event of termination under Sections 5.1 or 5.2 above, all
end user license agreements (excluding distributors and resellers) which
have been validly granted by You or Your distributors under this License
prior to termination shall survive termination.

************************************************************************
* *
* 6. Disclaimer of Warranty *
* ------------------------- *
* *
* Covered Software is provided under this License on an "as is" *
* basis, without warranty of any kind, either expressed, implied, or *
* statutory, including, without limitation, warranties that the *
* Covered Software is free of defects, merchantable, fit for a *
* particular purpose or non-infringing. The entire risk as to the *
* quality and performance of the Covered Software is with You. *
* Should any Covered Software prove defective in any respect, You *
* (not any Contributor) assume the cost of any necessary servicing, *
* repair, or correction. This disclaimer of warranty constitutes an *
* essential part of this License. No use of any Covered Software is *
* authorized under this License except under this disclaimer. *
* *
************************************************************************

************************************************************************
* *
* 7. Limitation of Liability *
* -------------------------- *
* *
* Under no circumstances and under no legal theory, whether tort *
* (including negligence), contract, or otherwise, shall any *
* Contributor, or anyone who distributes Covered Software as *
* permitted above, be liable to You for any direct, indirect, *

```

</details>

<details><summary>README.md</summary>

```text
# ⚡️ Lightning CSS

An extremely fast CSS parser, transformer, and minifier written in Rust. Use it with [Parcel](https://parceljs.org), as a standalone library or CLI, or via a plugin with any other tool.

<img width="680" alt="performance and build size charts" src="https://user-images.githubusercontent.com/19409/189022599-28246659-f94a-46a4-9de0-b6d17adb0e22.png#gh-light-mode-only">
<img width="680" alt="performance and build size charts" src="https://user-images.githubusercontent.com/19409/189022693-6956b044-422b-4f56-9628-d59c6f791095.png#gh-dark-mode-only">

## Features

- **Extremely fast** – Parsing and minifying large files is completed in milliseconds, often with significantly smaller output than other tools. See [benchmarks](#benchmarks) below.
- **Typed property values** – many other CSS parsers treat property values as an untyped series of tokens. This means that each transformer that wants to do something with these values must interpret them itself, leading to duplicate work and inconsistencies. Lightning CSS parses all values using the grammar from the CSS specification, and exposes a specific value type for each property.
- **Browser-grade parser** – Lightning CSS is built on the [cssparser](https://github.com/servo/rust-cssparser) and [selectors](https://github.com/servo/stylo/tree/main/selectors) crates created by Mozilla and used by Firefox and Servo. These provide a solid general purpose CSS-parsing foundation on top of which Lightning CSS implements support for all specific CSS rules and properties.
- **Minification** – One of the main purposes of Lightning CSS is to minify CSS to make it smaller. This includes many optimizations including:
  - Combining longhand properties into shorthands where possible.
  - Merging adjacent rules with the same selectors or declarations when it is safe to do so.
  - Combining CSS transforms into a single matrix or vice versa when smaller.
  - Removing vendor prefixes that are not needed, based on the provided browser targets.
  - Reducing `calc()` expressions where possible.
  - Converting colors to shorter hex notation where possible.
  - Minifying gradients.
  - Minifying CSS grid templates.
  - Normalizing property value order.
  - Removing default property sub-values which will be inferred by browsers.
  - Many micro-optimizations, e.g. converting to shorter units, removing unnecessary quotation marks, etc.
- **Vendor prefixing** – Lightning CSS accepts a list of browser targets, and automatically adds (and removes) vendor prefixes.
- **Browserslist configuration** – Lightning CSS supports opt-in browserslist configuration discovery to resolve browser targets and integrate with your existing tools and config setup.
- **Syntax lowering** – Lightning CSS parses modern CSS syntax, and generates more compatible output where needed, based on browser targets.
  - CSS Nesting
  - Custom media queries (draft spec)
  - Logical properties
  * [Color Level 5](https://drafts.csswg.org/css-color-5/)
    - `color-mix()` function
    - Relative color syntax, e.g. `lab(from purple calc(l * .8) a b)`
  - [Color Level 4](https://drafts.csswg.org/css-color-4/)
    - `lab()`, `lch()`, `oklab()`, and `oklch()` colors
    - `color()` function supporting predefined color spaces such as `display-p3` and `xyz`
    - Space separated components in `rgb` and `hsl` functions
    - Hex with alpha syntax
    - `hwb()` color syntax
    - Percent syntax for opacity
    - `#rgba` and `#rrggbbaa` hex colors
  - Selectors
    - `:not` with multiple arguments
    - `:lang` with multiple arguments
    - `:dir`
    - `:is`
  - Double position gradient stops (e.g. `red 40% 80%`)
  - `clamp()`, `round()`, `rem()`, and `mod()` math functions
  - Alignment shorthands (e.g. `place-items`)
  - Two-value `overflow` shorthand
  - Media query range syntax (e.g. `@media (width <= 100px)` or `@media (100px < width < 500px)`)
  - Multi-value `display` property (e.g. `inline flex`)
  - `system-ui` font family fallbacks
- **CSS modules** – Lightning CSS supports compiling a subset of [CSS modules](https://github.com/css-modules/css-modules) features.
  - Locally scoped class and id selectors
  - Locally scoped custom identifiers, e.g. `@keyframes` names, grid lines/areas, `@counter-style` names, etc.
  - Opt-in support for locally scoped CSS variables and other dashed identifiers.
  - `:local()` and `:global()` selectors
  - The `composes` property
- **Custom transforms** – The Lightning CSS visitor API can be used to implement custom transform plugins.

## Documentation

Lightning CSS can be used from [Parcel](https://parceljs.org), as a standalone library from JavaScript or Rust, using a standalone CLI, or wrapped as a plugin within any other tool. See the [Lightning CSS website](https://lightningcss.dev/docs.html) for documentation.

## Benchmarks

<img width="680" alt="performance and build size charts" src="https://user-images.githubusercontent.com/19409/189022599-28246659-f94a-46a4-9de0-b6d17adb0e22.png#gh-light-mode-only">
<img width="680" alt="performance and build size charts" src="https://user-images.githubusercontent.com/19409/189022693-6956b044-422b-4f56-9628-d59c6f791095.png#gh-dark-mode-only">

``\`
$ node bench.js bootstrap-4.css
cssnano: 544.809ms
159636 bytes

esbuild: 17.199ms
160332 bytes

lightningcss: 4.16ms
143091 bytes


$ node bench.js animate.css
cssnano: 283.105ms
71723 bytes

esbuild: 11.858ms
72183 bytes

lightningcss: 1.973ms
23666 bytes


$ node bench.js tailwind.css
cssnano: 2.198s
1925626 bytes

esbuild: 107.668ms
1961642 bytes

lightningcss: 43.368ms
1824130 bytes
``\`

For more benchmarks comparing more tools and input, see [here](http://goalsmashers.github.io/css-minification-benchmark/). Note that some of the tools shown perform unsafe optimizations that may change the behavior of the original CSS in favor of smaller file size. Lightning CSS does not do this – the output CSS should always behave identically to the input. Keep this in mind when comparing file sizes between tools.

```

</details>

## lightningcss-linux-x64-gnu@1.30.1

- Declared metadata: MPL-2.0
- Source metadata: https://github.com/parcel-bundler/lightningcss.git
- Package manifest: node_modules/.pnpm/lightningcss-linux-x64-gnu@1.30.1/node_modules/lightningcss-linux-x64-gnu/package.json
- Candidate license files: LICENSE, README.md

<details><summary>LICENSE</summary>

```text
 Mozilla Public License Version 2.0
==================================

1. Definitions
--------------

1.1. "Contributor"
means each individual or legal entity that creates, contributes to
the creation of, or owns Covered Software.

1.2. "Contributor Version"
means the combination of the Contributions of others (if any) used
by a Contributor and that particular Contributor's Contribution.

1.3. "Contribution"
means Covered Software of a particular Contributor.

1.4. "Covered Software"
means Source Code Form to which the initial Contributor has attached
the notice in Exhibit A, the Executable Form of such Source Code
Form, and Modifications of such Source Code Form, in each case
including portions thereof.

1.5. "Incompatible With Secondary Licenses"
means

(a) that the initial Contributor has attached the notice described
in Exhibit B to the Covered Software; or

(b) that the Covered Software was made available under the terms of
version 1.1 or earlier of the License, but not also under the
terms of a Secondary License.

1.6. "Executable Form"
means any form of the work other than Source Code Form.

1.7. "Larger Work"
means a work that combines Covered Software with other material, in
a separate file or files, that is not Covered Software.

1.8. "License"
means this document.

1.9. "Licensable"
means having the right to grant, to the maximum extent possible,
whether at the time of the initial grant or subsequently, any and
all of the rights conveyed by this License.

1.10. "Modifications"
means any of the following:

(a) any file in Source Code Form that results from an addition to,
deletion from, or modification of the contents of Covered
Software; or

(b) any new file in Source Code Form that contains any Covered
Software.

1.11. "Patent Claims" of a Contributor
means any patent claim(s), including without limitation, method,
process, and apparatus claims, in any patent Licensable by such
Contributor that would be infringed, but for the grant of the
License, by the making, using, selling, offering for sale, having
made, import, or transfer of either its Contributions or its
Contributor Version.

1.12. "Secondary License"
means either the GNU General Public License, Version 2.0, the GNU
Lesser General Public License, Version 2.1, the GNU Affero General
Public License, Version 3.0, or any later versions of those
licenses.

1.13. "Source Code Form"
means the form of the work preferred for making modifications.

1.14. "You" (or "Your")
means an individual or a legal entity exercising rights under this
License. For legal entities, "You" includes any entity that
controls, is controlled by, or is under common control with You. For
purposes of this definition, "control" means (a) the power, direct
or indirect, to cause the direction or management of such entity,
whether by contract or otherwise, or (b) ownership of more than
fifty percent (50%) of the outstanding shares or beneficial
ownership of such entity.

2. License Grants and Conditions
--------------------------------

2.1. Grants

Each Contributor hereby grants You a world-wide, royalty-free,
non-exclusive license:

(a) under intellectual property rights (other than patent or trademark)
Licensable by such Contributor to use, reproduce, make available,
modify, display, perform, distribute, and otherwise exploit its
Contributions, either on an unmodified basis, with Modifications, or
as part of a Larger Work; and

(b) under Patent Claims of such Contributor to make, use, sell, offer
for sale, have made, import, and otherwise transfer either its
Contributions or its Contributor Version.

2.2. Effective Date

The licenses granted in Section 2.1 with respect to any Contribution
become effective for each Contribution on the date the Contributor first
distributes such Contribution.

2.3. Limitations on Grant Scope

The licenses granted in this Section 2 are the only rights granted under
this License. No additional rights or licenses will be implied from the
distribution or licensing of Covered Software under this License.
Notwithstanding Section 2.1(b) above, no patent license is granted by a
Contributor:

(a) for any code that a Contributor has removed from Covered Software;
or

(b) for infringements caused by: (i) Your and any other third party's
modifications of Covered Software, or (ii) the combination of its
Contributions with other software (except as part of its Contributor
Version); or

(c) under Patent Claims infringed by Covered Software in the absence of
its Contributions.

This License does not grant any rights in the trademarks, service marks,
or logos of any Contributor (except as may be necessary to comply with
the notice requirements in Section 3.4).

2.4. Subsequent Licenses

No Contributor makes additional grants as a result of Your choice to
distribute the Covered Software under a subsequent version of this
License (see Section 10.2) or under the terms of a Secondary License (if
permitted under the terms of Section 3.3).

2.5. Representation

Each Contributor represents that the Contributor believes its
Contributions are its original creation(s) or it has sufficient rights
to grant the rights to its Contributions conveyed by this License.

2.6. Fair Use

This License is not intended to limit any rights You have under
applicable copyright doctrines of fair use, fair dealing, or other
equivalents.

2.7. Conditions

Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted
in Section 2.1.

3. Responsibilities
-------------------

3.1. Distribution of Source Form

All distribution of Covered Software in Source Code Form, including any
Modifications that You create or to which You contribute, must be under
the terms of this License. You must inform recipients that the Source
Code Form of the Covered Software is governed by the terms of this
License, and how they can obtain a copy of this License. You may not
attempt to alter or restrict the recipients' rights in the Source Code
Form.

3.2. Distribution of Executable Form

If You distribute Covered Software in Executable Form then:

(a) such Covered Software must also be made available in Source Code
Form, as described in Section 3.1, and You must inform recipients of
the Executable Form how they can obtain a copy of such Source Code
Form by reasonable means in a timely manner, at a charge no more
than the cost of distribution to the recipient; and

(b) You may distribute such Executable Form under the terms of this
License, or sublicense it under different terms, provided that the
license for the Executable Form does not attempt to limit or alter
the recipients' rights in the Source Code Form under this License.

3.3. Distribution of a Larger Work

You may create and distribute a Larger Work under terms of Your choice,
provided that You also comply with the requirements of this License for
the Covered Software. If the Larger Work is a combination of Covered
Software with a work governed by one or more Secondary Licenses, and the
Covered Software is not Incompatible With Secondary Licenses, this
License permits You to additionally distribute such Covered Software
under the terms of such Secondary License(s), so that the recipient of
the Larger Work may, at their option, further distribute the Covered
Software under the terms of either this License or such Secondary
License(s).

3.4. Notices

You may not remove or alter the substance of any license notices
(including copyright notices, patent notices, disclaimers of warranty,
or limitations of liability) contained within the Source Code Form of
the Covered Software, except that You may alter any license notices to
the extent required to remedy known factual inaccuracies.

3.5. Application of Additional Terms

You may choose to offer, and to charge a fee for, warranty, support,
indemnity or liability obligations to one or more recipients of Covered
Software. However, You may do so only on Your own behalf, and not on
behalf of any Contributor. You must make it absolutely clear that any
such warranty, support, indemnity, or liability obligation is offered by
You alone, and You hereby agree to indemnify every Contributor for any
liability incurred by such Contributor as a result of warranty, support,
indemnity or liability terms You offer. You may include additional
disclaimers of warranty and limitations of liability specific to any
jurisdiction.

4. Inability to Comply Due to Statute or Regulation
---------------------------------------------------

If it is impossible for You to comply with any of the terms of this
License with respect to some or all of the Covered Software due to
statute, judicial order, or regulation then You must: (a) comply with
the terms of this License to the maximum extent possible; and (b)
describe the limitations and the code they affect. Such description must
be placed in a text file included with all distributions of the Covered
Software under this License. Except to the extent prohibited by statute
or regulation, such description must be sufficiently detailed for a
recipient of ordinary skill to be able to understand it.

5. Termination
--------------

5.1. The rights granted under this License will terminate automatically
if You fail to comply with any of its terms. However, if You become
compliant, then the rights granted under this License from a particular
Contributor are reinstated (a) provisionally, unless and until such
Contributor explicitly and finally terminates Your grants, and (b) on an
ongoing basis, if such Contributor fails to notify You of the
non-compliance by some reasonable means prior to 60 days after You have
come back into compliance. Moreover, Your grants from a particular
Contributor are reinstated on an ongoing basis if such Contributor
notifies You of the non-compliance by some reasonable means, this is the
first time You have received notice of non-compliance with this License
from such Contributor, and You become compliant prior to 30 days after
Your receipt of the notice.

5.2. If You initiate litigation against any entity by asserting a patent
infringement claim (excluding declaratory judgment actions,
counter-claims, and cross-claims) alleging that a Contributor Version
directly or indirectly infringes any patent, then the rights granted to
You by any and all Contributors for the Covered Software under Section
2.1 of this License shall terminate.

5.3. In the event of termination under Sections 5.1 or 5.2 above, all
end user license agreements (excluding distributors and resellers) which
have been validly granted by You or Your distributors under this License
prior to termination shall survive termination.

************************************************************************
* *
* 6. Disclaimer of Warranty *
* ------------------------- *
* *
* Covered Software is provided under this License on an "as is" *
* basis, without warranty of any kind, either expressed, implied, or *
* statutory, including, without limitation, warranties that the *
* Covered Software is free of defects, merchantable, fit for a *
* particular purpose or non-infringing. The entire risk as to the *
* quality and performance of the Covered Software is with You. *
* Should any Covered Software prove defective in any respect, You *
* (not any Contributor) assume the cost of any necessary servicing, *
* repair, or correction. This disclaimer of warranty constitutes an *
* essential part of this License. No use of any Covered Software is *
* authorized under this License except under this disclaimer. *
* *
************************************************************************

************************************************************************
* *
* 7. Limitation of Liability *
* -------------------------- *
* *
* Under no circumstances and under no legal theory, whether tort *
* (including negligence), contract, or otherwise, shall any *
* Contributor, or anyone who distributes Covered Software as *
* permitted above, be liable to You for any direct, indirect, *

```

</details>

<details><summary>README.md</summary>

```text
This is the x86_64-unknown-linux-gnu build of lightningcss. See https://github.com/parcel-bundler/lightningcss for details.
```

</details>

## lightningcss-linux-x64-musl@1.30.1

- Declared metadata: MPL-2.0
- Source metadata: https://github.com/parcel-bundler/lightningcss.git
- Package manifest: node_modules/.pnpm/lightningcss-linux-x64-musl@1.30.1/node_modules/lightningcss-linux-x64-musl/package.json
- Candidate license files: LICENSE, README.md

<details><summary>LICENSE</summary>

```text
 Mozilla Public License Version 2.0
==================================

1. Definitions
--------------

1.1. "Contributor"
means each individual or legal entity that creates, contributes to
the creation of, or owns Covered Software.

1.2. "Contributor Version"
means the combination of the Contributions of others (if any) used
by a Contributor and that particular Contributor's Contribution.

1.3. "Contribution"
means Covered Software of a particular Contributor.

1.4. "Covered Software"
means Source Code Form to which the initial Contributor has attached
the notice in Exhibit A, the Executable Form of such Source Code
Form, and Modifications of such Source Code Form, in each case
including portions thereof.

1.5. "Incompatible With Secondary Licenses"
means

(a) that the initial Contributor has attached the notice described
in Exhibit B to the Covered Software; or

(b) that the Covered Software was made available under the terms of
version 1.1 or earlier of the License, but not also under the
terms of a Secondary License.

1.6. "Executable Form"
means any form of the work other than Source Code Form.

1.7. "Larger Work"
means a work that combines Covered Software with other material, in
a separate file or files, that is not Covered Software.

1.8. "License"
means this document.

1.9. "Licensable"
means having the right to grant, to the maximum extent possible,
whether at the time of the initial grant or subsequently, any and
all of the rights conveyed by this License.

1.10. "Modifications"
means any of the following:

(a) any file in Source Code Form that results from an addition to,
deletion from, or modification of the contents of Covered
Software; or

(b) any new file in Source Code Form that contains any Covered
Software.

1.11. "Patent Claims" of a Contributor
means any patent claim(s), including without limitation, method,
process, and apparatus claims, in any patent Licensable by such
Contributor that would be infringed, but for the grant of the
License, by the making, using, selling, offering for sale, having
made, import, or transfer of either its Contributions or its
Contributor Version.

1.12. "Secondary License"
means either the GNU General Public License, Version 2.0, the GNU
Lesser General Public License, Version 2.1, the GNU Affero General
Public License, Version 3.0, or any later versions of those
licenses.

1.13. "Source Code Form"
means the form of the work preferred for making modifications.

1.14. "You" (or "Your")
means an individual or a legal entity exercising rights under this
License. For legal entities, "You" includes any entity that
controls, is controlled by, or is under common control with You. For
purposes of this definition, "control" means (a) the power, direct
or indirect, to cause the direction or management of such entity,
whether by contract or otherwise, or (b) ownership of more than
fifty percent (50%) of the outstanding shares or beneficial
ownership of such entity.

2. License Grants and Conditions
--------------------------------

2.1. Grants

Each Contributor hereby grants You a world-wide, royalty-free,
non-exclusive license:

(a) under intellectual property rights (other than patent or trademark)
Licensable by such Contributor to use, reproduce, make available,
modify, display, perform, distribute, and otherwise exploit its
Contributions, either on an unmodified basis, with Modifications, or
as part of a Larger Work; and

(b) under Patent Claims of such Contributor to make, use, sell, offer
for sale, have made, import, and otherwise transfer either its
Contributions or its Contributor Version.

2.2. Effective Date

The licenses granted in Section 2.1 with respect to any Contribution
become effective for each Contribution on the date the Contributor first
distributes such Contribution.

2.3. Limitations on Grant Scope

The licenses granted in this Section 2 are the only rights granted under
this License. No additional rights or licenses will be implied from the
distribution or licensing of Covered Software under this License.
Notwithstanding Section 2.1(b) above, no patent license is granted by a
Contributor:

(a) for any code that a Contributor has removed from Covered Software;
or

(b) for infringements caused by: (i) Your and any other third party's
modifications of Covered Software, or (ii) the combination of its
Contributions with other software (except as part of its Contributor
Version); or

(c) under Patent Claims infringed by Covered Software in the absence of
its Contributions.

This License does not grant any rights in the trademarks, service marks,
or logos of any Contributor (except as may be necessary to comply with
the notice requirements in Section 3.4).

2.4. Subsequent Licenses

No Contributor makes additional grants as a result of Your choice to
distribute the Covered Software under a subsequent version of this
License (see Section 10.2) or under the terms of a Secondary License (if
permitted under the terms of Section 3.3).

2.5. Representation

Each Contributor represents that the Contributor believes its
Contributions are its original creation(s) or it has sufficient rights
to grant the rights to its Contributions conveyed by this License.

2.6. Fair Use

This License is not intended to limit any rights You have under
applicable copyright doctrines of fair use, fair dealing, or other
equivalents.

2.7. Conditions

Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted
in Section 2.1.

3. Responsibilities
-------------------

3.1. Distribution of Source Form

All distribution of Covered Software in Source Code Form, including any
Modifications that You create or to which You contribute, must be under
the terms of this License. You must inform recipients that the Source
Code Form of the Covered Software is governed by the terms of this
License, and how they can obtain a copy of this License. You may not
attempt to alter or restrict the recipients' rights in the Source Code
Form.

3.2. Distribution of Executable Form

If You distribute Covered Software in Executable Form then:

(a) such Covered Software must also be made available in Source Code
Form, as described in Section 3.1, and You must inform recipients of
the Executable Form how they can obtain a copy of such Source Code
Form by reasonable means in a timely manner, at a charge no more
than the cost of distribution to the recipient; and

(b) You may distribute such Executable Form under the terms of this
License, or sublicense it under different terms, provided that the
license for the Executable Form does not attempt to limit or alter
the recipients' rights in the Source Code Form under this License.

3.3. Distribution of a Larger Work

You may create and distribute a Larger Work under terms of Your choice,
provided that You also comply with the requirements of this License for
the Covered Software. If the Larger Work is a combination of Covered
Software with a work governed by one or more Secondary Licenses, and the
Covered Software is not Incompatible With Secondary Licenses, this
License permits You to additionally distribute such Covered Software
under the terms of such Secondary License(s), so that the recipient of
the Larger Work may, at their option, further distribute the Covered
Software under the terms of either this License or such Secondary
License(s).

3.4. Notices

You may not remove or alter the substance of any license notices
(including copyright notices, patent notices, disclaimers of warranty,
or limitations of liability) contained within the Source Code Form of
the Covered Software, except that You may alter any license notices to
the extent required to remedy known factual inaccuracies.

3.5. Application of Additional Terms

You may choose to offer, and to charge a fee for, warranty, support,
indemnity or liability obligations to one or more recipients of Covered
Software. However, You may do so only on Your own behalf, and not on
behalf of any Contributor. You must make it absolutely clear that any
such warranty, support, indemnity, or liability obligation is offered by
You alone, and You hereby agree to indemnify every Contributor for any
liability incurred by such Contributor as a result of warranty, support,
indemnity or liability terms You offer. You may include additional
disclaimers of warranty and limitations of liability specific to any
jurisdiction.

4. Inability to Comply Due to Statute or Regulation
---------------------------------------------------

If it is impossible for You to comply with any of the terms of this
License with respect to some or all of the Covered Software due to
statute, judicial order, or regulation then You must: (a) comply with
the terms of this License to the maximum extent possible; and (b)
describe the limitations and the code they affect. Such description must
be placed in a text file included with all distributions of the Covered
Software under this License. Except to the extent prohibited by statute
or regulation, such description must be sufficiently detailed for a
recipient of ordinary skill to be able to understand it.

5. Termination
--------------

5.1. The rights granted under this License will terminate automatically
if You fail to comply with any of its terms. However, if You become
compliant, then the rights granted under this License from a particular
Contributor are reinstated (a) provisionally, unless and until such
Contributor explicitly and finally terminates Your grants, and (b) on an
ongoing basis, if such Contributor fails to notify You of the
non-compliance by some reasonable means prior to 60 days after You have
come back into compliance. Moreover, Your grants from a particular
Contributor are reinstated on an ongoing basis if such Contributor
notifies You of the non-compliance by some reasonable means, this is the
first time You have received notice of non-compliance with this License
from such Contributor, and You become compliant prior to 30 days after
Your receipt of the notice.

5.2. If You initiate litigation against any entity by asserting a patent
infringement claim (excluding declaratory judgment actions,
counter-claims, and cross-claims) alleging that a Contributor Version
directly or indirectly infringes any patent, then the rights granted to
You by any and all Contributors for the Covered Software under Section
2.1 of this License shall terminate.

5.3. In the event of termination under Sections 5.1 or 5.2 above, all
end user license agreements (excluding distributors and resellers) which
have been validly granted by You or Your distributors under this License
prior to termination shall survive termination.

************************************************************************
* *
* 6. Disclaimer of Warranty *
* ------------------------- *
* *
* Covered Software is provided under this License on an "as is" *
* basis, without warranty of any kind, either expressed, implied, or *
* statutory, including, without limitation, warranties that the *
* Covered Software is free of defects, merchantable, fit for a *
* particular purpose or non-infringing. The entire risk as to the *
* quality and performance of the Covered Software is with You. *
* Should any Covered Software prove defective in any respect, You *
* (not any Contributor) assume the cost of any necessary servicing, *
* repair, or correction. This disclaimer of warranty constitutes an *
* essential part of this License. No use of any Covered Software is *
* authorized under this License except under this disclaimer. *
* *
************************************************************************

************************************************************************
* *
* 7. Limitation of Liability *
* -------------------------- *
* *
* Under no circumstances and under no legal theory, whether tort *
* (including negligence), contract, or otherwise, shall any *
* Contributor, or anyone who distributes Covered Software as *
* permitted above, be liable to You for any direct, indirect, *

```

</details>

<details><summary>README.md</summary>

```text
This is the x86_64-unknown-linux-musl build of lightningcss. See https://github.com/parcel-bundler/lightningcss for details.
```

</details>

## lru-cache@11.5.2

- Declared metadata: BlueOak-1.0.0
- Source metadata: git+ssh://git@github.com/isaacs/node-lru-cache.git
- Package manifest: node_modules/.pnpm/lru-cache@11.5.2/node_modules/lru-cache/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
# lru-cache

A cache object that deletes the least-recently-used items.

Specify a max number of the most recently used items that you
want to keep, and this cache will keep that many of the most
recently accessed items.

This is not primarily a TTL cache, and does not make strong TTL
guarantees. There is no preemptive pruning of expired items by
default, but you _may_ set a TTL on the cache or on a single
`set`. If you do so, it will treat expired items as missing, and
delete them when fetched. If you are more interested in TTL
caching than LRU caching, check out
[@isaacs/ttlcache](http://npm.im/@isaacs/ttlcache).

As of version 7, this is one of the most performant LRU
implementations available in JavaScript, and supports a wide
diversity of use cases. However, note that using some of the
features will necessarily impact performance, by causing the
cache to have to do more work. See the "Performance" section
below.

## Installation

``\`bash
npm install lru-cache --save
``\`

## Usage

``\`js
// hybrid module, either works
import { LRUCache } from 'lru-cache'
// or:
const { LRUCache } = require('lru-cache')
// or in minified form for web browsers:
import { LRUCache } from 'http://unpkg.com/lru-cache@9/dist/mjs/index.min.mjs'

// At least one of 'max', 'ttl', or 'maxSize' is required, to prevent
// unsafe unbounded storage.
//
// In most cases, it's best to specify a max for performance, so all
// the required memory allocation is done up-front.
//
// All the other options are optional, see the sections below for
// documentation on what each one does.  Most of them can be
// overridden for specific items in get()/set()
const options = {
  max: 500,

  // for use with tracking overall storage size
  maxSize: 5000,
  sizeCalculation: (value, key) => {
    return 1
  },

  // for use when you need to clean up something when objects
  // are evicted from the cache
  dispose: (value, key, reason) => {
    freeFromMemoryOrWhatever(value)
  },

  // for use when you need to know that an item is being inserted
  // note that this does NOT allow you to prevent the insertion,
  // it just allows you to know about it.
  onInsert: (value, key, reason) => {
    logInsertionOrWhatever(key, value)
  },

  // how long to live in ms
  ttl: 1000 * 60 * 5,

  // return stale items before removing from cache?
  allowStale: false,

  updateAgeOnGet: false,
  updateAgeOnHas: false,

  // async method to use for cache.fetch(), for
  // stale-while-revalidate type of behavior
  fetchMethod: async (key, staleValue, { options, signal, context }) => {},
}

const cache = new LRUCache(options)

cache.set('key', 'value')
cache.get('key') // "value"

// non-string keys ARE fully supported
// but note that it must be THE SAME object, not
// just a JSON-equivalent object.
var someObject = { a: 1 }
cache.set(someObject, 'a value')
// Object keys are not toString()-ed
cache.set('[object Object]', 'a different value')
assert.equal(cache.get(someObject), 'a value')
// A similar object with same keys/values won't work,
// because it's a different object identity
assert.equal(cache.get({ a: 1 }), undefined)

cache.clear() // empty the cache
``\`

If you put more stuff in the cache, then less recently used items
will fall out. That's what an LRU cache is.

For full description of the API and all options, please see [the
LRUCache typedocs](https://isaacs.github.io/node-lru-cache/)

## Storage Bounds Safety

This implementation aims to be as flexible as possible, within
the limits of safe memory consumption and optimal performance.

At initial object creation, storage is allocated for `max` items.
If `max` is set to zero, then some performance is lost, and item
count is unbounded. Either `maxSize` or `ttl` _must_ be set if
`max` is not specified.

If `maxSize` is set, then this creates a safe limit on the
maximum storage consumed, but without the performance benefits of
pre-allocation. When `maxSize` is set, every item _must_ provide
a size, either via the `sizeCalculation` method provided to the
constructor, or via a `size` or `sizeCalculation` option provided
to `cache.set()`. The size of every item _must_ be a positive
integer.

If neither `max` nor `maxSize` are set, then `ttl` tracking must
be enabled. Note that, even when tracking item `ttl`, items are
_not_ preemptively deleted when they become stale, unless
`ttlAutopurge` is enabled. Instead, they are only purged the
next time the key is requested. Thus, if `ttlAutopurge`, `max`,
and `maxSize` are all not set, then the cache will potentially
grow unbounded.

In this case, a warning is printed to standard error. Future
versions may require the use of `ttlAutopurge` if `max` and
`maxSize` are not specified.

If you truly wish to use a cache that is bound _only_ by TTL
expiration, consider using a `Map` object, and calling
`setTimeout` to delete entries when they expire. It will perform
much better than an LRU cache.

Here is an implementation you may use, under the same
[license](./LICENSE) as this package:

``\`js
// a storage-unbounded ttl cache that is not an lru-cache
const cache = {
  data: new Map(),
  timers: new Map(),
  set: (k, v, ttl) => {
    if (cache.timers.has(k)) {
      clearTimeout(cache.timers.get(k))
    }
    cache.timers.set(
      k,
      setTimeout(() => cache.delete(k), ttl),
    )
    cache.data.set(k, v)
  },
  get: k => cache.data.get(k),
  has: k => cache.data.has(k),
  delete: k => {
    if (cache.timers.has(k)) {
      clearTimeout(cache.timers.get(k))
    }
    cache.timers.delete(k)
    return cache.data.delete(k)
  },
  clear: () => {
    cache.data.clear()
    for (const v of cache.timers.values()) {
      clearTimeout(v)
    }
    cache.timers.clear()
  },
}
``\`

If that isn't to your liking, check out
[@isaacs/ttlcache](http://npm.im/@isaacs/ttlcache).

## Storing Undefined Values

This cache never stores undefined values, as `undefined` is used
internally in a few places to indicate that a key is not in the
cache.

You may call `cache.set(key, undefined)`, but this is just
an alias for `cache.delete(key)`. Note that this has the effect
that `cache.has(key)` will return _false_ after setting it to
undefined.

``\`js
cache.set(myKey, undefined)
cache.has(myKey) // false!
``\`

If you need to track `undefined` values, and still note that the
key is in the cache, an easy workaround is to use a sigil object
of your own.

``\`js
import { LRUCache } from 'lru-cache'
const undefinedValue = Symbol('undefined')
const cache = new LRUCache(...)
const mySet = (key, value) =>
  cache.set(key, value === undefined ? undefinedValue : value)
const myGet = (key, value) => {
  const v = cache.get(key)
  return v === undefinedValue ? undefined : v
}
``\`

## Tracing and Observability

Most methods can accept a `status` option, which is an
[`LRUCache.Status`](https://isaacs.github.io/node-lru-cache/interfaces/LRUCache.LRUCache.Status.html)
object that will be decorated along the operation with
indications about what was done and why.

Additionally, this library is instrumented using the
[`node:diagnostics_channel`](https://nodejs.org/api/diagnostics_channel.html)
module on Node and other platforms that support it. In order to
get diagnostics metrics, listen on the
`channel('lru-cache:metrics')`. To get Tracing Channel traces,
subscribe to the `tracingChannel('lru-cache')`. The
[`LRUCache.Status`](https://isaacs.github.io/node-lru-cache/interfaces/LRUCache.LRUCache.Status.html)
objects will be provided as the message context to those channel
listeners.

For example, you could do the following to get comprehensive
information about every LRUCache instance in your application:

``\`ts
import { tracingChannel, subscribe } from 'node:diagnostics_channel'

subscribe('lru-cache:metrics', (message, name) => {
  // name will always be 'lru-cache:metrics'
  // message will be the LRUCache.Status object for whatever
  // synchronous operation was performed.
  console.error('LRUCache Metrics', message)
})

tracingChannel('lru-cache').subscribe({
  start: status => {
    // a traced operation is starting
  },
  asyncStart: status => {
    // an async traced operation is starting
  },
  asyncEnd: status => {
    // an async traced operation is ending
  }
  error: status => {
    // a traced operation failed
  },
  end: status => {
    // a traced operation is complete
  },
})
``\`

The async `cache.fetch()` and `cache.forceFetch` methods are
covered by `tracingChannels`. All the other operations are
covered by the `lru-cache:metrics` channel, because they are
strictly synchronous, and thus don't have an asynchronous
lifecycle to track.

Note that using `status` objects or using
`node:diagnostics_channel` listeners _will_ impose a modest
performance penalty. Creating data objects is not ever free; do
not believe anyone who tells you otherwise. But it is as small as
possible.

### Platform Compatibility Caveat

Not all platforms support the `node:diagnostics_channel` module.
Currently, this is only available in Node, Bun, and Deno, and
some edge computing platforms that provide a Node compatibility
layer.

To work around this, if you are loading in a non-Node
environment, the package.json exports will direct your module
loader to pull in a version that starts out with a dummy
implementation, then does a conditional dynamic `import` of the
`node:diagnostics_channel` module, and then swaps out those
dummy objects with the real thing if it succeeds. This means that
cache metrics and tracing channels started in the first load-time
tick of your application will _not_ be covered, except in
environments that load using the `require` import
condition, or both the `node` and `esm` import conditions
together.

Top-level await _could_ be used to remove this caveat, but that
feature is dead on arrival, unfortunately. See
[#397](https://github.com/isaacs/node-lru-cache/issues/397) and
[#398](https://github.com/isaacs/node-lru-cache/issues/398) for
more details.

## Performance

As of April 2026, version 11 of this library is one of the most
performant LRU cache implementations in JavaScript.

Benchmarks can be extremely difficult to get right. In
particular, the performance of set/get/delete operations on
objects will vary _wildly_ depending on the type of key used. V8
is highly optimized for objects with keys that are short strings,
especially integer numeric strings. Thus any benchmark which
tests _solely_ using numbers as keys will tend to find that an
object-based approach performs the best.

Note that coercing _anything_ to strings to use as object keys is
unsafe, unless you can be 100% certain that no other type of
value will be used. For example:

``\`js
const myCache = {}
const set = (k, v) => (myCache[k] = v)
const get = k => myCache[k]

set({}, 'please hang onto this for me')
set('[object Object]', 'oopsie')
``\`

Also beware of "Just So" stories regarding performance. Garbage
collection of large (especially: deep) object graphs can be
incredibly costly, with several "tipping points" where it
increases exponentially. As a result, putting that off until
later can make it much worse, and less predictable. If a library
performs well, but only in a scenario where the object graph is
kept shallow, then that won't help you if you are using large
objects as keys.

In general, when attempting to use a library to improve
performance (such as a cache like this one), it's best to choose
an option that will perform well in the sorts of scenarios where
you'll actually use it.

This library is optimized for repeated gets and minimizing
eviction time, since that is the expected need of a LRU. Set
operations are somewhat slower on average than a few other
options, in part because of that optimization. It is assumed
that you'll be caching some costly operation, ideally as rarely
as possible, so optimizing set over get would be unwise.

If performance matters to you:

1. If it's at all possible to use small integer values as keys,
   and you can guarantee that no other types of values 
```

</details>

## minimatch@10.2.6

- Declared metadata: BlueOak-1.0.0
- Source metadata: git@github.com:isaacs/minimatch
- Package manifest: node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules. The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice. If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

**_As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim._**

```

</details>

<details><summary>README.md</summary>

```text
# minimatch

A minimal matching utility.

This is the matching library used internally by npm.

It works by converting glob expressions into JavaScript `RegExp`
objects.

## Important Security Consideration!

> [!WARNING]  
> This library uses JavaScript regular expressions. Please read
> the following warning carefully, and be thoughtful about what
> you provide to this library in production systems.

_Any_ library in JavaScript that deals with matching string
patterns using regular expressions will be subject to
[ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
if the pattern is generated using untrusted input.

Efforts have been made to mitigate risk as much as is feasible in
such a library, providing maximum recursion depths and so forth,
but these measures can only ultimately protect against accidents,
not malice. A dedicated attacker can _always_ find patterns that
cannot be defended against by a bash-compatible glob pattern
matching system that uses JavaScript regular expressions.

To be extremely clear:

> [!WARNING]  
> **If you create a system where you take user input, and use
> that input as the source of a Regular Expression pattern, in
> this or any extant glob matcher in JavaScript, you will be
> pwned.**

A future version of this library _may_ use a different matching
algorithm which does not exhibit backtracking problems. If and
when that happens, it will likely be a sweeping change, and those
improvements will **not** be backported to legacy versions.

In the near term, it is not reasonable to continue to play
whack-a-mole with security advisories, and so any future ReDoS
reports will be considered "working as intended", and resolved
entirely by this warning.

## Usage

``\`js
// hybrid module, load with require() or import
import { minimatch } from 'minimatch'
// or:
const { minimatch } = require('minimatch')

minimatch('bar.foo', '*.foo') // true!
minimatch('bar.foo', '*.bar') // false!
minimatch('bar.foo', '*.+(bar|foo)', { debug: true }) // true, and noisy!
``\`

## Features

Supports these glob features:

- Brace Expansion
- Extended glob matching
- "Globstar" `**` matching
- [Posix character
  classes](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html),
  like `[[:alpha:]]`, supporting the full range of Unicode
  characters. For example, `[[:alpha:]]` will match against
  `'é'`, though `[a-zA-Z]` will not. Collating symbol and set
  matching is not supported, so `[[=e=]]` will _not_ match `'é'`
  and `[[.ch.]]` will not match `'ch'` in locales where `ch` is
  considered a single character.

See:

- `man sh`
- `man bash` [Pattern
  Matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html)
- `man 3 fnmatch`
- `man 5 gitignore`

## Windows

**Please only use forward-slashes in glob expressions.**

Though windows uses either `/` or `\` as its path separator, only `/`
characters are used by this glob implementation. You must use
forward-slashes **only** in glob expressions. Back-slashes in patterns
will always be interpreted as escape characters, not path separators.

Note that `\` or `/` _will_ be interpreted as path separators in paths on
Windows, and will match against `/` in glob expressions.

So just always use `/` in patterns.

### UNC Paths

On Windows, UNC paths like `//?/c:/...` or
`//ComputerName/Share/...` are handled specially.

- Patterns starting with a double-slash followed by some
  non-slash characters will preserve their double-slash. As a
  result, a pattern like `//*` will match `//x`, but not `/x`.
- Patterns staring with `//?/<drive letter>:` will _not_ treat
  the `?` as a wildcard character. Instead, it will be treated
  as a normal string.
- Patterns starting with `//?/<drive letter>:/...` will match
  file paths starting with `<drive letter>:/...`, and vice versa,
  as if the `//?/` was not present. This behavior only is
  present when the drive letters are a case-insensitive match to
  one another. The remaining portions of the path/pattern are
  compared case sensitively, unless `nocase:true` is set.

Note that specifying a UNC path using `\` characters as path
separators is always allowed in the file path argument, but only
allowed in the pattern argument when `windowsPathsNoEscape: true`
is set in the options.

## Minimatch Class

Create a minimatch object by instantiating the `minimatch.Minimatch` class.

``\`javascript
var Minimatch = require('minimatch').Minimatch
var mm = new Minimatch(pattern, options)
``\`

### Properties

- `pattern` The original pattern the minimatch object represents.
- `options` The options supplied to the constructor.
- `set` A 2-dimensional array of regexp or string expressions.
  Each row in the
  array corresponds to a brace-expanded pattern. Each item in the row
  corresponds to a single path-part. For example, the pattern
  `{a,b/c}/d` would expand to a set of patterns like:

        [ [ a, d ]
        , [ b, c, d ] ]

  If a portion of the pattern doesn't have any "magic" in it
  (that is, it's something like `"foo"` rather than `fo*o?`), then it
  will be left as a string rather than converted to a regular
  expression.

- `regexp` Created by the `makeRe` method. A single regular expression
  expressing the entire pattern. This is useful in cases where you wish
  to use the pattern somewhat like `fnmatch(3)` with `FNM_PATH` enabled.
- `negate` True if the pattern is negated.
- `comment` True if the pattern is a comment.
- `empty` True if the pattern is `""`.

### Methods

- `makeRe()` Generate the `regexp` member if necessary, and return it.
  Will return `false` if the pattern is invalid.
- `match(fname)` Return true if the filename matches the pattern, or
  false otherwise.
- `matchOne(fileArray, patternArray, partial)` Take a `/`-split
  filename, and match it against a single row in the `regExpSet`. This
  method is mainly for internal use, but is exposed so that it can be
  used by a glob-walker that needs to avoid excessive filesystem calls.
- `hasMagic()` Returns true if the parsed pattern contains any
  magic characters. Returns false if all comparator parts are
  string literals. If the `magicalBraces` option is set on the
  constructor, then it will consider brace expansions which are
  not otherwise magical to be magic. If not set, then a pattern
  like `a{b,c}d` will return `false`, because neither `abd` nor
  `acd` contain any special glob characters.

  This does **not** mean that the pattern string can be used as a
  literal filename, as it may contain magic glob characters that
  are escaped. For example, the pattern `\\*` or `[*]` would not
  be considered to have magic, as the matching portion parses to
  the literal string `'*'` and would match a path named `'*'`,
  not `'\\*'` or `'[*]'`. The `minimatch.unescape()` method may
  be used to remove escape characters.

All other methods are internal, and will be called as necessary.

### minimatch(path, pattern, options)

Main export. Tests a path against the pattern using the options.

``\`javascript
var isJS = minimatch(file, '*.js', { matchBase: true })
``\`

### minimatch.filter(pattern, options)

Returns a function that tests its
supplied argument, suitable for use with `Array.filter`. Example:

``\`javascript
var javascripts = fileList.filter(
  minimatch.filter('*.js', { matchBase: true }),
)
``\`

### minimatch.escape(pattern, options = {})

Escape all magic characters in a glob pattern, so that it will
only ever match literal strings.

If the `windowsPathsNoEscape` option is used, then characters are
escaped by wrapping in `[]`, because a magic character wrapped in
a character class can only be satisfied by that exact character.

Slashes (and backslashes in `windowsPathsNoEscape` mode) cannot
be escaped or unescaped.

### minimatch.unescape(pattern, options = {})

Un-escape a glob string that may contain some escaped characters.

If the `windowsPathsNoEscape` option is used, then square-brace
escapes are removed, but not backslash escapes. For example, it
will turn the string `'[*]'` into `*`, but it will not turn
`'\\*'` into `'*'`, because `\` is a path separator in
`windowsPathsNoEscape` mode.

When `windowsPathsNoEscape` is not set, then both brace escapes
and backslash escapes are removed.

Slashes (and backslashes in `windowsPathsNoEscape` mode) cannot
be escaped or unescaped.

### minimatch.match(list, pattern, options)

Match against the list of
files, in the style of fnmatch or glob. If nothing is matched, and
options.nonull is set, then return a list containing the pattern itself.

``\`javascript
var javascripts = minimatch.match(fileList, '*.js', { matchBase: true })
``\`

### minimatch.makeRe(pattern, options)

Make a regular expression object from the pattern.

## Options

All options are `false` by default.

### debug

Dump a ton of stuff to stderr.

### nobrace

Do not expand `{a,b}` and `{1..3}` brace sets.

### noglobstar

Disable `**` matching against multiple folder names.

### dot

Allow patterns to match filenames starting with a period, even if
the pattern does not explicitly have a period in that spot.

Note that by default, `a/**/b` will **not** match `a/.d/b`, unless `dot`
is set.

### noext

Disable "extglob" style patterns like `+(a|b)`.

### nocase

Perform a case-insensitive match.

### nocaseMagicOnly

When used with `{nocase: true}`, create regular expressions that
are case-insensitive, but leave string match portions untouched.
Has no effect when used without `{nocase: true}`.

Useful when some other form of case-insensitive matching is used,
or if the original string representation is useful in some other
way.

### nonull

When a match is not found by `minimatch.match`, return a list containing
the pattern itself if this option is set. When not set, an empty list
is returned if there are no matches.

### magicalBraces

This only affects the results of the `Minimatch.hasMagic` method.

If the pattern contains brace expansions, such as `a{b,c}d`, but
no other magic characters, then the `Minimatch.hasMagic()` method
will return `false` by default. When this option set, it will
return `true` for brace expansion as well as other magic glob
characters.

### matchBase

If set, then patterns without slashes will be matched
against the basename of the path if it contains slashes. For example,
`a?b` would match the path `/xyz/123/acb`, but not `/xyz/acb/123`.

### nocomment

Suppress the behavior of treating `#` at the start of a pattern as a
comment.

### nonegate

Suppress the behavior of treating a leading `!` character as negation.

### flipNegate

Returns from negate expressions the same as if they were not negated.
(Ie, true on a hit, false on a miss.)

### partial

Compare a partial path to a pattern. As long as the parts of the path that
are present are not contradicted by the pattern, it will be treated as a
match. This is useful in applications where you're walking through a
folder structure, and don't yet have the full path, but want to ensure that
you do not walk down paths that can never be a match.

For example,

``\`js
minimatch('/a/b', '/a/*/c/d', { partial: true }) // true, might be /a/b/c/d
minimatch('/a/b', '/**/d', { partial: true }) // true, might be /a/b/.../d
minimatch('/x/y/z', '/a/**/z', { partial: true }) // false, because x !== a
``\`

### windowsPathsNoEscape

Use `\\` as a path separator _only_, and _never_ as an escape
character. If set, all `\\` characters are replaced with `/` in
the pattern. Note that this makes it **impossible** to match
against paths containing literal glob pattern characters, but
allows matching with patterns constructed using `path.join()` and
`path.resolve()` on Windows platforms, mimicking the (buggy!)
behavior of earlier versions on Windows. Please use with
caution, and be mindful of [the caveat about Windows
paths](#windows).

For legacy reasons, this is also set if
`options.allowWindowsEscape` is set to the exact value `false`.

### windowsNoMagicRoot


```

</details>

## minipass@7.1.3

- Declared metadata: BlueOak-1.0.0
- Source metadata: https://github.com/isaacs/minipass
- Package manifest: node_modules/.pnpm/minipass@7.1.3/node_modules/minipass/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
# minipass

A _very_ minimal implementation of a [PassThrough
stream](https://nodejs.org/api/stream.html#stream_class_stream_passthrough)

[It's very
fast](https://docs.google.com/spreadsheets/d/1K_HR5oh3r80b8WVMWCPPjfuWXUgfkmhlX7FGI6JJ8tY/edit?usp=sharing)
for objects, strings, and buffers.

Supports `pipe()`ing (including multi-`pipe()` and backpressure
transmission), buffering data until either a `data` event handler
or `pipe()` is added (so you don't lose the first chunk), and
most other cases where PassThrough is a good idea.

There is a `read()` method, but it's much more efficient to
consume data from this stream via `'data'` events or by calling
`pipe()` into some other stream. Calling `read()` requires the
buffer to be flattened in some cases, which requires copying
memory.

If you set `objectMode: true` in the options, then whatever is
written will be emitted. Otherwise, it'll do a minimal amount of
Buffer copying to ensure proper Streams semantics when `read(n)`
is called.

`objectMode` can only be set at instantiation. Attempting to
write something other than a String or Buffer without having set
`objectMode` in the options will throw an error.

This is not a `through` or `through2` stream. It doesn't
transform the data, it just passes it right through. If you want
to transform the data, extend the class, and override the
`write()` method. Once you're done transforming the data however
you want, call `super.write()` with the transform output.

For some examples of streams that extend Minipass in various
ways, check out:

- [minizlib](http://npm.im/minizlib)
- [fs-minipass](http://npm.im/fs-minipass)
- [tar](http://npm.im/tar)
- [minipass-collect](http://npm.im/minipass-collect)
- [minipass-flush](http://npm.im/minipass-flush)
- [minipass-pipeline](http://npm.im/minipass-pipeline)
- [tap](http://npm.im/tap)
- [tap-parser](http://npm.im/tap-parser)
- [treport](http://npm.im/treport)
- [minipass-fetch](http://npm.im/minipass-fetch)
- [pacote](http://npm.im/pacote)
- [make-fetch-happen](http://npm.im/make-fetch-happen)
- [cacache](http://npm.im/cacache)
- [ssri](http://npm.im/ssri)
- [npm-registry-fetch](http://npm.im/npm-registry-fetch)
- [minipass-json-stream](http://npm.im/minipass-json-stream)
- [minipass-sized](http://npm.im/minipass-sized)

## Usage in TypeScript

The `Minipass` class takes three type template definitions:

- `RType` the type being read, which defaults to `Buffer`. If
  `RType` is `string`, then the constructor _must_ get an options
  object specifying either an `encoding` or `objectMode: true`.
  If it's anything other than `string` or `Buffer`, then it
  _must_ get an options object specifying `objectMode: true`.
- `WType` the type being written. If `RType` is `Buffer` or
  `string`, then this defaults to `ContiguousData` (Buffer,
  string, ArrayBuffer, or ArrayBufferView). Otherwise, it
  defaults to `RType`.
- `Events` type mapping event names to the arguments emitted
  with that event, which extends `Minipass.Events`.

To declare types for custom events in subclasses, extend the
third parameter with your own event signatures. For example:

``\`js
import { Minipass } from 'minipass'

// a NDJSON stream that emits 'jsonError' when it can't stringify
export interface Events extends Minipass.Events {
  jsonError: [e: Error]
}

export class NDJSONStream extends Minipass<string, any, Events> {
  constructor() {
    super({ objectMode: true })
  }

  // data is type `any` because that's WType
  write(data, encoding, cb) {
    try {
      const json = JSON.stringify(data)
      return super.write(json + '\n', encoding, cb)
    } catch (er) {
      if (!er instanceof Error) {
        er = Object.assign(new Error('json stringify failed'), {
          cause: er,
        })
      }
      // trying to emit with something OTHER than an error will
      // fail, because we declared the event arguments type.
      this.emit('jsonError', er)
    }
  }
}

const s = new NDJSONStream()
s.on('jsonError', e => {
  // here, TS knows that e is an Error
})
``\`

Emitting/handling events that aren't declared in this way is
fine, but the arguments will be typed as `unknown`.

## Differences from Node.js Streams

There are several things that make Minipass streams different
from (and in some ways superior to) Node.js core streams.

Please read these caveats if you are familiar with node-core
streams and intend to use Minipass streams in your programs.

You can avoid most of these differences entirely (for a very
small performance penalty) by setting `{async: true}` in the
constructor options.

### Timing

Minipass streams are designed to support synchronous use-cases.
Thus, data is emitted as soon as it is available, always. It is
buffered until read, but no longer. Another way to look at it is
that Minipass streams are exactly as synchronous as the logic
that writes into them.

This can be surprising if your code relies on
`PassThrough.write()` always providing data on the next tick
rather than the current one, or being able to call `resume()` and
not have the entire buffer disappear immediately.

However, without this synchronicity guarantee, there would be no
way for Minipass to achieve the speeds it does, or support the
synchronous use cases that it does. Simply put, waiting takes
time.

This non-deferring approach makes Minipass streams much easier to
reason about, especially in the context of Promises and other
flow-control mechanisms.

Example:

``\`js
// hybrid module, either works
import { Minipass } from 'minipass'
// or:
const { Minipass } = require('minipass')

const stream = new Minipass()
stream.on('data', () => console.log('data event'))
console.log('before write')
stream.write('hello')
console.log('after write')
// output:
// before write
// data event
// after write
``\`

### Exception: Async Opt-In

If you wish to have a Minipass stream with behavior that more
closely mimics Node.js core streams, you can set the stream in
async mode either by setting `async: true` in the constructor
options, or by setting `stream.async = true` later on.

``\`js
// hybrid module, either works
import { Minipass } from 'minipass'
// or:
const { Minipass } = require('minipass')

const asyncStream = new Minipass({ async: true })
asyncStream.on('data', () => console.log('data event'))
console.log('before write')
asyncStream.write('hello')
console.log('after write')
// output:
// before write
// after write
// data event <-- this is deferred until the next tick
``\`

Switching _out_ of async mode is unsafe, as it could cause data
corruption, and so is not enabled. Example:

``\`js
import { Minipass } from 'minipass'
const stream = new Minipass({ encoding: 'utf8' })
stream.on('data', chunk => console.log(chunk))
stream.async = true
console.log('before writes')
stream.write('hello')
setStreamSyncAgainSomehow(stream) // <-- this doesn't actually exist!
stream.write('world')
console.log('after writes')
// hypothetical output would be:
// before writes
// world
// after writes
// hello
// NOT GOOD!
``\`

To avoid this problem, once set into async mode, any attempt to
make the stream sync again will be ignored.

``\`js
const { Minipass } = require('minipass')
const stream = new Minipass({ encoding: 'utf8' })
stream.on('data', chunk => console.log(chunk))
stream.async = true
console.log('before writes')
stream.write('hello')
stream.async = false // <-- no-op, stream already async
stream.write('world')
console.log('after writes')
// actual output:
// before writes
// after writes
// hello
// world
``\`

### No High/Low Water Marks

Node.js core streams will optimistically fill up a buffer,
returning `true` on all writes until the limit is hit, even if
the data has nowhere to go. Then, they will not attempt to draw
more data in until the buffer size dips below a minimum value.

Minipass streams are much simpler. The `write()` method will
return `true` if the data has somewhere to go (which is to say,
given the timing guarantees, that the data is already there by
the time `write()` returns).

If the data has nowhere to go, then `write()` returns false, and
the data sits in a buffer, to be drained out immediately as soon
as anyone consumes it.

Since nothing is ever buffered unnecessarily, there is much less
copying data, and less bookkeeping about buffer capacity levels.

### Hazards of Buffering (or: Why Minipass Is So Fast)

Since data written to a Minipass stream is immediately written
all the way through the pipeline, and `write()` always returns
true/false based on whether the data was fully flushed,
backpressure is communicated immediately to the upstream caller.
This minimizes buffering.

Consider this case:

``\`js
const { PassThrough } = require('stream')
const p1 = new PassThrough({ highWaterMark: 1024 })
const p2 = new PassThrough({ highWaterMark: 1024 })
const p3 = new PassThrough({ highWaterMark: 1024 })
const p4 = new PassThrough({ highWaterMark: 1024 })

p1.pipe(p2).pipe(p3).pipe(p4)
p4.on('data', () => console.log('made it through'))

// this returns false and buffers, then writes to p2 on next tick (1)
// p2 returns false and buffers, pausing p1, then writes to p3 on next tick (2)
// p3 returns false and buffers, pausing p2, then writes to p4 on next tick (3)
// p4 returns false and buffers, pausing p3, then emits 'data' and 'drain'
// on next tick (4)
// p3 sees p4's 'drain' event, and calls resume(), emitting 'resume' and
// 'drain' on next tick (5)
// p2 sees p3's 'drain', calls resume(), emits 'resume' and 'drain' on next tick (6)
// p1 sees p2's 'drain', calls resume(), emits 'resume' and 'drain' on next
// tick (7)

p1.write(Buffer.alloc(2048)) // returns false
``\`

Along the way, the data was buffered and deferred at each stage,
and multiple event deferrals happened, for an unblocked pipeline
where it was perfectly safe to write all the way through!

Furthermore, setting a `highWaterMark` of `1024` might lead
someone reading the code to think an advisory maximum of 1KiB is
being set for the pipeline. However, the actual advisory
buffering level is the _sum_ of `highWaterMark` values, since
each one has its own bucket.

Consider the Minipass case:

``\`js
const m1 = new Minipass()
const m2 = new Minipass()
const m3 = new Minipass()
const m4 = new Minipass()

m1.pipe(m2).pipe(m3).pipe(m4)
m4.on('data', () => console.log('made it through'))

// m1 is flowing, so it writes the data to m2 immediately
// m2 is flowing, so it writes the data to m3 immediately
// m3 is flowing, so it writes the data to m4 immediately
// m4 is flowing, so it fires the 'data' event immediately, returns true
// m4's write returned true, so m3 is still flowing, returns true
// m3's write returned true, so m2 is still flowing, returns true
// m2's write returned true, so m1 is still flowing, returns true
// No event deferrals or buffering along the way!

m1.write(Buffer.alloc(2048)) // returns true
``\`

It is extremely unlikely that you _don't_ want to buffer any data
written, or _ever_ buffer data that can be flushed all the way
through. Neither node-core streams nor Minipass ever fail to
buffer written data, but node-core streams do a lot of
unnecessary buffering and pausing.

As always, the faster implementation is the one that does less
stuff and waits less time to do it.

### Immediately emit `end` for empty streams (when not paused)

If a stream is not paused, and `end()` is called before writing
any data into it, then it will emit `end` immediately.

If you have logic that occurs on the `end` event which you don't
want to potentially happen immediately (for example, closing file
descriptors, moving on to the next entry in an archive parse
stream, etc.) then be sure to call `stream.pause()` on creation,
and then `stream.resume()` once you are ready to respond to the
`end` event.

However, this is _usually_ not a problem because:

### Emit `end` When Asked

One hazard of immediately emitting `'end'` is that you may not
yet have had a chance to add a listener. In order to avoid this
hazard, 
```

</details>

## package-json-from-dist@1.0.1

- Declared metadata: BlueOak-1.0.0
- Source metadata: git+https://github.com/isaacs/package-json-from-dist.git
- Package manifest: node_modules/.pnpm/package-json-from-dist@1.0.1/node_modules/package-json-from-dist/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
All packages under `src/` are licensed according to the terms in
their respective `LICENSE` or `LICENSE.md` files.

The remainder of this project is licensed under the Blue Oak
Model License, as follows:

-----

# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
# package-json-from-dist

Sometimes you want to load the `package.json` into your
TypeScript program, and it's tempting to just `import
'../package.json'`, since that seems to work.

However, this requires `tsc` to make an entire copy of your
`package.json` file into the `dist` folder, which is a problem if
you're using something like
[tshy](https://github.com/isaacs/tshy), which uses the
`package.json` file in dist for another purpose. Even when that
does work, it's asking the module system to do a bunch of extra
fs system calls, just to load a version number or something. (See
[this issue](https://github.com/isaacs/tshy/issues/61).)

This module helps by just finding the package.json file
appropriately, and reading and parsing it in the most normal
fashion.

## Caveats

This _only_ works if your code builds into a target folder called
`dist`, which is in the root of the package. It also requires
that you do not have a folder named `node_modules` anywhere
within your dev environment, or else it'll get the wrong answers
there. (But, at least, that'll be in dev, so you're pretty likely
to notice.)

If you build to some other location, then you'll need a different
approach. (Feel free to fork this module and make it your own, or
just put the code right inline, there's not much of it.)

## USAGE

``\`js
// src/index.ts
import {
  findPackageJson,
  loadPackageJson,
} from 'package-json-from-dist'

const pj = findPackageJson(import.meta.url)
console.log(`package.json found at ${pj}`)

const pkg = loadPackageJson(import.meta.url)
console.log(`Hello from ${pkg.name}@${pkg.version}`)
``\`

If your module is not directly in the `./src` folder, then you need
to specify the path that you would expect to find the
`package.json` when it's _not_ built to the `dist` folder.

``\`js
// src/components/something.ts
import {
  findPackageJson,
  loadPackageJson,
} from 'package-json-from-dist'

const pj = findPackageJson(import.meta.url, '../../package.json')
console.log(`package.json found at ${pj}`)

const pkg = loadPackageJson(import.meta.url, '../../package.json')
console.log(`Hello from ${pkg.name}@${pkg.version}`)
``\`

When running from CommmonJS, use `__filename` instead of
`import.meta.url`.

``\`js
// src/index.cts
import {
  findPackageJson,
  loadPackageJson,
} from 'package-json-from-dist'

const pj = findPackageJson(__filename)
console.log(`package.json found at ${pj}`)

const pkg = loadPackageJson(__filename)
console.log(`Hello from ${pkg.name}@${pkg.version}`)
``\`

Since [tshy](https://github.com/isaacs/tshy) builds _both_
CommonJS and ESM by default, you may find that you need a
CommonJS override and some `//@ts-ignore` magic to make it work.

`src/pkg.ts`:

``\`js
import {
  findPackageJson,
  loadPackageJson,
} from 'package-json-from-dist'
//@ts-ignore
export const pkg = loadPackageJson(import.meta.url)
//@ts-ignore
export const pj = findPackageJson(import.meta.url)
``\`

`src/pkg-cjs.cts`:

``\`js
import {
  findPackageJson,
  loadPackageJson,
} from 'package-json-from-dist'
export const pkg = loadPackageJson(__filename)
export const pj = findPackageJson(__filename)
``\`

```

</details>

## path-scurry@1.11.1

- Declared metadata: BlueOak-1.0.0
- Source metadata: git+https://github.com/isaacs/path-scurry
- Package manifest: node_modules/.pnpm/path-scurry@1.11.1/node_modules/path-scurry/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
# path-scurry

Extremely high performant utility for building tools that read
the file system, minimizing filesystem and path string munging
operations to the greatest degree possible.

## Ugh, yet another file traversal thing on npm?

Yes. None of the existing ones gave me exactly what I wanted.

## Well what is it you wanted?

While working on [glob](http://npm.im/glob), I found that I
needed a module to very efficiently manage the traversal over a
folder tree, such that:

1. No `readdir()` or `stat()` would ever be called on the same
   file or directory more than one time.
2. No `readdir()` calls would be made if we can be reasonably
   sure that the path is not a directory. (Ie, a previous
   `readdir()` or `stat()` covered the path, and
   `ent.isDirectory()` is false.)
3. `path.resolve()`, `dirname()`, `basename()`, and other
   string-parsing/munging operations are be minimized. This means
   it has to track "provisional" child nodes that may not exist
   (and if we find that they _don't_ exist, store that
   information as well, so we don't have to ever check again).
4. The API is not limited to use as a stream/iterator/etc. There
   are many cases where an API like node's `fs` is preferrable.
5. It's more important to prevent excess syscalls than to be up
   to date, but it should be smart enough to know what it
   _doesn't_ know, and go get it seamlessly when requested.
6. Do not blow up the JS heap allocation if operating on a
   directory with a huge number of entries.
7. Handle all the weird aspects of Windows paths, like UNC paths
   and drive letters and wrongway slashes, so that the consumer
   can return canonical platform-specific paths without having to
   parse or join or do any error-prone string munging.

## PERFORMANCE

JavaScript people throw around the word "blazing" a lot. I hope
that this module doesn't blaze anyone. But it does go very fast,
in the cases it's optimized for, if used properly.

PathScurry provides ample opportunities to get extremely good
performance, as well as several options to trade performance for
convenience.

Benchmarks can be run by executing `npm run bench`.

As is always the case, doing more means going slower, doing less
means going faster, and there are trade offs between speed and
memory usage.

PathScurry makes heavy use of [LRUCache](http://npm.im/lru-cache)
to efficiently cache whatever it can, and `Path` objects remain
in the graph for the lifetime of the walker, so repeated calls
with a single PathScurry object will be extremely fast. However,
adding items to a cold cache means "doing more", so in those
cases, we pay a price. Nothing is free, but every effort has been
made to reduce costs wherever possible.

Also, note that a "cache as long as possible" approach means that
changes to the filesystem may not be reflected in the results of
repeated PathScurry operations.

For resolving string paths, `PathScurry` ranges from 5-50 times
faster than `path.resolve` on repeated resolutions, but around
100 to 1000 times _slower_ on the first resolution. If your
program is spending a lot of time resolving the _same_ paths
repeatedly (like, thousands or millions of times), then this can
be beneficial. But both implementations are pretty fast, and
speeding up an infrequent operation from 4µs to 400ns is not
going to move the needle on your app's performance.

For walking file system directory trees, a lot depends on how
often a given PathScurry object will be used, and also on the
walk method used.

With default settings on a folder tree of 100,000 items,
consisting of around a 10-to-1 ratio of normal files to
directories, PathScurry performs comparably to
[@nodelib/fs.walk](http://npm.im/@nodelib/fs.walk), which is the
fastest and most reliable file system walker I could find. As far
as I can tell, it's almost impossible to go much faster in a
Node.js program, just based on how fast you can push syscalls out
to the fs thread pool.

On my machine, that is about 1000-1200 completed walks per second
for async or stream walks, and around 500-600 walks per second
synchronously.

In the warm cache state, PathScurry's performance increases
around 4x for async `for await` iteration, 10-15x faster for
streams and synchronous `for of` iteration, and anywhere from 30x
to 80x faster for the rest.

``\`
# walk 100,000 fs entries, 10/1 file/dir ratio
# operations / ms
 New PathScurry object  |  Reuse PathScurry object
     stream:  1112.589  |  13974.917
sync stream:   492.718  |  15028.343
 async walk:  1095.648  |  32706.395
  sync walk:   527.632  |  46129.772
 async iter:  1288.821  |   5045.510
  sync iter:   498.496  |  17920.746
``\`

A hand-rolled walk calling `entry.readdir()` and recursing
through the entries can benefit even more from caching, with
greater flexibility and without the overhead of streams or
generators.

The cold cache state is still limited by the costs of file system
operations, but with a warm cache, the only bottleneck is CPU
speed and VM optimizations. Of course, in that case, some care
must be taken to ensure that you don't lose performance as a
result of silly mistakes, like calling `readdir()` on entries
that you know are not directories.

``\`
# manual recursive iteration functions
      cold cache  |  warm cache
async:  1164.901  |  17923.320
   cb:  1101.127  |  40999.344
zalgo:  1082.240  |  66689.936
 sync:   526.935  |  87097.591
``\`

In this case, the speed improves by around 10-20x in the async
case, 40x in the case of using `entry.readdirCB` with protections
against synchronous callbacks, and 50-100x with callback
deferrals disabled, and _several hundred times faster_ for
synchronous iteration.

If you can think of a case that is not covered in these
benchmarks, or an implementation that performs significantly
better than PathScurry, please [let me
know](https://github.com/isaacs/path-scurry/issues).

## USAGE

``\`ts
// hybrid module, load with either method
import { PathScurry, Path } from 'path-scurry'
// or:
const { PathScurry, Path } = require('path-scurry')

// very simple example, say we want to find and
// delete all the .DS_Store files in a given path
// note that the API is very similar to just a
// naive walk with fs.readdir()
import { unlink } from 'fs/promises'

// easy way, iterate over the directory and do the thing
const pw = new PathScurry(process.cwd())
for await (const entry of pw) {
  if (entry.isFile() && entry.name === '.DS_Store') {
    unlink(entry.fullpath())
  }
}

// here it is as a manual recursive method
const walk = async (entry: Path) => {
  const promises: Promise<any> = []
  // readdir doesn't throw on non-directories, it just doesn't
  // return any entries, to save stack trace costs.
  // Items are returned in arbitrary unsorted order
  for (const child of await pw.readdir(entry)) {
    // each child is a Path object
    if (child.name === '.DS_Store' && child.isFile()) {
      // could also do pw.resolve(entry, child.name),
      // just like fs.readdir walking, but .fullpath is
      // a *slightly* more efficient shorthand.
      promises.push(unlink(child.fullpath()))
    } else if (child.isDirectory()) {
      promises.push(walk(child))
    }
  }
  return Promise.all(promises)
}

walk(pw.cwd).then(() => {
  console.log('all .DS_Store files removed')
})

const pw2 = new PathScurry('/a/b/c') // pw2.cwd is the Path for /a/b/c
const relativeDir = pw2.cwd.resolve('../x') // Path entry for '/a/b/x'
const relative2 = pw2.cwd.resolve('/a/b/d/../x') // same path, same entry
assert.equal(relativeDir, relative2)
``\`

## API

[Full TypeDoc API](https://isaacs.github.io/path-scurry)

There are platform-specific classes exported, but for the most
part, the default `PathScurry` and `Path` exports are what you
most likely need, unless you are testing behavior for other
platforms.

Intended public API is documented here, but the full
documentation does include internal types, which should not be
accessed directly.

### Interface `PathScurryOpts`

The type of the `options` argument passed to the `PathScurry`
constructor.

- `nocase`: Boolean indicating that file names should be compared
  case-insensitively. Defaults to `true` on darwin and win32
  implementations, `false` elsewhere.

  **Warning** Performing case-insensitive matching on a
  case-sensitive filesystem will result in occasionally very
  bizarre behavior. Performing case-sensitive matching on a
  case-insensitive filesystem may negatively impact performance.

- `childrenCacheSize`: Number of child entries to cache, in order
  to speed up `resolve()` and `readdir()` calls. Defaults to
  `16 * 1024` (ie, `16384`).

  Setting it to a higher value will run the risk of JS heap
  allocation errors on large directory trees. Setting it to `256`
  or smaller will significantly reduce the construction time and
  data consumption overhead, but with the downside of operations
  being slower on large directory trees. Setting it to `0` will
  mean that effectively no operations are cached, and this module
  will be roughly the same speed as `fs` for file system
  operations, and _much_ slower than `path.resolve()` for
  repeated path resolution.

- `fs` An object that will be used to override the default `fs`
  methods. Any methods that are not overridden will use Node's
  built-in implementations.

  - lstatSync
  - readdir (callback `withFileTypes` Dirent variant, used for
    readdirCB and most walks)
  - readdirSync
  - readlinkSync
  - realpathSync
  - promises: Object containing the following async methods:
    - lstat
    - readdir (Dirent variant only)
    - readlink
    - realpath

### Interface `WalkOptions`

The options object that may be passed to all walk methods.

- `withFileTypes`: Boolean, default true. Indicates that `Path`
  objects should be returned. Set to `false` to get string paths
  instead.
- `follow`: Boolean, default false. Attempt to read directory
  entries from symbolic links. Otherwise, only actual directories
  are traversed. Regardless of this setting, a given target path
  will only ever be walked once, meaning that a symbolic link to
  a previously traversed directory will never be followed.

  Setting this imposes a slight performance penalty, because
  `readlink` must be called on all symbolic links encountered, in
  order to avoid infinite cycles.

- `filter`: Function `(entry: Path) => boolean`. If provided,
  will prevent the inclusion of any entry for which it returns a
  falsey value. This will not prevent directories from being
  traversed if they do not pass the filter, though it will
  prevent the directories themselves from being included in the
  results. By default, if no filter is provided, then all entries
  are included in the results.
- `walkFilter`: Function `(entry: Path) => boolean`. If provided,
  will prevent the traversal of any directory (or in the case of
  `follow:true` symbolic links to directories) for which the
  function returns false. This will not prevent the directories
  themselves from being included in the result set. Use `filter`
  for that.

Note that TypeScript return types will only be inferred properly
from static analysis if the `withFileTypes` option is omitted, or
a constant `true` or `false` value.

### Class `PathScurry`

The main interface. Defaults to an appropriate class based on the
current platform.

Use `PathScurryWin32`, `PathScurryDarwin`, or `PathScurryPosix`
if implementation-specific behavior is desired.

All walk methods may be called with a `WalkOptions` argument to
walk over the object's current working directory with the
supplied options.

#### `async pw.walk(entry?: string | Path | WalkOptions, opts?: WalkOptions)`

Walk the directory tree according to the options provided,
resolving to an array of all entries found.

#### `pw.walkSync(entry?: string | Path | WalkOptions, opts?: WalkOptions)`

Walk the directory tree according to the options provided,
returning an array of all entries found.

#### `pw.iterate(entry?: string | Pa
```

</details>

## path-scurry@2.0.2

- Declared metadata: BlueOak-1.0.0
- Source metadata: git+https://github.com/isaacs/path-scurry
- Package manifest: node_modules/.pnpm/path-scurry@2.0.2/node_modules/path-scurry/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
# path-scurry

Extremely high performant utility for building tools that read
the file system, minimizing filesystem and path string munging
operations to the greatest degree possible.

## Ugh, yet another file traversal thing on npm?

Yes. None of the existing ones gave me exactly what I wanted.

## Well what is it you wanted?

While working on [glob](http://npm.im/glob), I found that I
needed a module to very efficiently manage the traversal over a
folder tree, such that:

1. No `readdir()` or `stat()` would ever be called on the same
   file or directory more than one time.
2. No `readdir()` calls would be made if we can be reasonably
   sure that the path is not a directory. (Ie, a previous
   `readdir()` or `stat()` covered the path, and
   `ent.isDirectory()` is false.)
3. `path.resolve()`, `dirname()`, `basename()`, and other
   string-parsing/munging operations are be minimized. This means
   it has to track "provisional" child nodes that may not exist
   (and if we find that they _don't_ exist, store that
   information as well, so we don't have to ever check again).
4. The API is not limited to use as a stream/iterator/etc. There
   are many cases where an API like node's `fs` is preferrable.
5. It's more important to prevent excess syscalls than to be up
   to date, but it should be smart enough to know what it
   _doesn't_ know, and go get it seamlessly when requested.
6. Do not blow up the JS heap allocation if operating on a
   directory with a huge number of entries.
7. Handle all the weird aspects of Windows paths, like UNC paths
   and drive letters and wrongway slashes, so that the consumer
   can return canonical platform-specific paths without having to
   parse or join or do any error-prone string munging.

## PERFORMANCE

JavaScript people throw around the word "blazing" a lot. I hope
that this module doesn't blaze anyone. But it does go very fast,
in the cases it's optimized for, if used properly.

PathScurry provides ample opportunities to get extremely good
performance, as well as several options to trade performance for
convenience.

Benchmarks can be run by executing `npm run bench`.

As is always the case, doing more means going slower, doing less
means going faster, and there are trade offs between speed and
memory usage.

PathScurry makes heavy use of [LRUCache](http://npm.im/lru-cache)
to efficiently cache whatever it can, and `Path` objects remain
in the graph for the lifetime of the walker, so repeated calls
with a single PathScurry object will be extremely fast. However,
adding items to a cold cache means "doing more", so in those
cases, we pay a price. Nothing is free, but every effort has been
made to reduce costs wherever possible.

Also, note that a "cache as long as possible" approach means that
changes to the filesystem may not be reflected in the results of
repeated PathScurry operations.

For resolving string paths, `PathScurry` ranges from 5-50 times
faster than `path.resolve` on repeated resolutions, but around
100 to 1000 times _slower_ on the first resolution. If your
program is spending a lot of time resolving the _same_ paths
repeatedly (like, thousands or millions of times), then this can
be beneficial. But both implementations are pretty fast, and
speeding up an infrequent operation from 4µs to 400ns is not
going to move the needle on your app's performance.

For walking file system directory trees, a lot depends on how
often a given PathScurry object will be used, and also on the
walk method used.

With default settings on a folder tree of 100,000 items,
consisting of around a 10-to-1 ratio of normal files to
directories, PathScurry performs comparably to
[@nodelib/fs.walk](http://npm.im/@nodelib/fs.walk), which is the
fastest and most reliable file system walker I could find. As far
as I can tell, it's almost impossible to go much faster in a
Node.js program, just based on how fast you can push syscalls out
to the fs thread pool.

On my machine, that is about 1000-1200 completed walks per second
for async or stream walks, and around 500-600 walks per second
synchronously.

In the warm cache state, PathScurry's performance increases
around 4x for async `for await` iteration, 10-15x faster for
streams and synchronous `for of` iteration, and anywhere from 30x
to 80x faster for the rest.

``\`
# walk 100,000 fs entries, 10/1 file/dir ratio
# operations / ms
 New PathScurry object  |  Reuse PathScurry object
     stream:  1112.589  |  13974.917
sync stream:   492.718  |  15028.343
 async walk:  1095.648  |  32706.395
  sync walk:   527.632  |  46129.772
 async iter:  1288.821  |   5045.510
  sync iter:   498.496  |  17920.746
``\`

A hand-rolled walk calling `entry.readdir()` and recursing
through the entries can benefit even more from caching, with
greater flexibility and without the overhead of streams or
generators.

The cold cache state is still limited by the costs of file system
operations, but with a warm cache, the only bottleneck is CPU
speed and VM optimizations. Of course, in that case, some care
must be taken to ensure that you don't lose performance as a
result of silly mistakes, like calling `readdir()` on entries
that you know are not directories.

``\`
# manual recursive iteration functions
      cold cache  |  warm cache
async:  1164.901  |  17923.320
   cb:  1101.127  |  40999.344
zalgo:  1082.240  |  66689.936
 sync:   526.935  |  87097.591
``\`

In this case, the speed improves by around 10-20x in the async
case, 40x in the case of using `entry.readdirCB` with protections
against synchronous callbacks, and 50-100x with callback
deferrals disabled, and _several hundred times faster_ for
synchronous iteration.

If you can think of a case that is not covered in these
benchmarks, or an implementation that performs significantly
better than PathScurry, please [let me
know](https://github.com/isaacs/path-scurry/issues).

## USAGE

``\`ts
// hybrid module, load with either method
import { PathScurry, Path } from 'path-scurry'
// or:
const { PathScurry, Path } = require('path-scurry')

// very simple example, say we want to find and
// delete all the .DS_Store files in a given path
// note that the API is very similar to just a
// naive walk with fs.readdir()
import { unlink } from 'fs/promises'

// easy way, iterate over the directory and do the thing
const pw = new PathScurry(process.cwd())
for await (const entry of pw) {
  if (entry.isFile() && entry.name === '.DS_Store') {
    unlink(entry.fullpath())
  }
}

// here it is as a manual recursive method
const walk = async (entry: Path) => {
  const promises: Promise<any> = []
  // readdir doesn't throw on non-directories, it just doesn't
  // return any entries, to save stack trace costs.
  // Items are returned in arbitrary unsorted order
  for (const child of await pw.readdir(entry)) {
    // each child is a Path object
    if (child.name === '.DS_Store' && child.isFile()) {
      // could also do pw.resolve(entry, child.name),
      // just like fs.readdir walking, but .fullpath is
      // a *slightly* more efficient shorthand.
      promises.push(unlink(child.fullpath()))
    } else if (child.isDirectory()) {
      promises.push(walk(child))
    }
  }
  return Promise.all(promises)
}

walk(pw.cwd).then(() => {
  console.log('all .DS_Store files removed')
})

const pw2 = new PathScurry('/a/b/c') // pw2.cwd is the Path for /a/b/c
const relativeDir = pw2.cwd.resolve('../x') // Path entry for '/a/b/x'
const relative2 = pw2.cwd.resolve('/a/b/d/../x') // same path, same entry
assert.equal(relativeDir, relative2)
``\`

## API

[Full TypeDoc API](https://isaacs.github.io/path-scurry)

There are platform-specific classes exported, but for the most
part, the default `PathScurry` and `Path` exports are what you
most likely need, unless you are testing behavior for other
platforms.

Intended public API is documented here, but the full
documentation does include internal types, which should not be
accessed directly.

### Interface `PathScurryOpts`

The type of the `options` argument passed to the `PathScurry`
constructor.

- `nocase`: Boolean indicating that file names should be compared
  case-insensitively. Defaults to `true` on darwin and win32
  implementations, `false` elsewhere.

  **Warning** Performing case-insensitive matching on a
  case-sensitive filesystem will result in occasionally very
  bizarre behavior. Performing case-sensitive matching on a
  case-insensitive filesystem may negatively impact performance.

- `childrenCacheSize`: Number of child entries to cache, in order
  to speed up `resolve()` and `readdir()` calls. Defaults to
  `16 * 1024` (ie, `16384`).

  Setting it to a higher value will run the risk of JS heap
  allocation errors on large directory trees. Setting it to `256`
  or smaller will significantly reduce the construction time and
  data consumption overhead, but with the downside of operations
  being slower on large directory trees. Setting it to `0` will
  mean that effectively no operations are cached, and this module
  will be roughly the same speed as `fs` for file system
  operations, and _much_ slower than `path.resolve()` for
  repeated path resolution.

- `fs` An object that will be used to override the default `fs`
  methods. Any methods that are not overridden will use Node's
  built-in implementations.

  - lstatSync
  - readdir (callback `withFileTypes` Dirent variant, used for
    readdirCB and most walks)
  - readdirSync
  - readlinkSync
  - realpathSync
  - promises: Object containing the following async methods:
    - lstat
    - readdir (Dirent variant only)
    - readlink
    - realpath

### Interface `WalkOptions`

The options object that may be passed to all walk methods.

- `withFileTypes`: Boolean, default true. Indicates that `Path`
  objects should be returned. Set to `false` to get string paths
  instead.
- `follow`: Boolean, default false. Attempt to read directory
  entries from symbolic links. Otherwise, only actual directories
  are traversed. Regardless of this setting, a given target path
  will only ever be walked once, meaning that a symbolic link to
  a previously traversed directory will never be followed.

  Setting this imposes a slight performance penalty, because
  `readlink` must be called on all symbolic links encountered, in
  order to avoid infinite cycles.

- `filter`: Function `(entry: Path) => boolean`. If provided,
  will prevent the inclusion of any entry for which it returns a
  falsey value. This will not prevent directories from being
  traversed if they do not pass the filter, though it will
  prevent the directories themselves from being included in the
  results. By default, if no filter is provided, then all entries
  are included in the results.
- `walkFilter`: Function `(entry: Path) => boolean`. If provided,
  will prevent the traversal of any directory (or in the case of
  `follow:true` symbolic links to directories) for which the
  function returns false. This will not prevent the directories
  themselves from being included in the result set. Use `filter`
  for that.

Note that TypeScript return types will only be inferred properly
from static analysis if the `withFileTypes` option is omitted, or
a constant `true` or `false` value.

### Class `PathScurry`

The main interface. Defaults to an appropriate class based on the
current platform.

Use `PathScurryWin32`, `PathScurryDarwin`, or `PathScurryPosix`
if implementation-specific behavior is desired.

All walk methods may be called with a `WalkOptions` argument to
walk over the object's current working directory with the
supplied options.

#### `async pw.walk(entry?: string | Path | WalkOptions, opts?: WalkOptions)`

Walk the directory tree according to the options provided,
resolving to an array of all entries found.

#### `pw.walkSync(entry?: string | Path | WalkOptions, opts?: WalkOptions)`

Walk the directory tree according to the options provided,
returning an array of all entries found.

#### `pw.iterate(entry?: string | Pa
```

</details>

## rimraf@6.1.3

- Declared metadata: BlueOak-1.0.0
- Source metadata: git@github.com:isaacs/rimraf.git
- Package manifest: node_modules/.pnpm/rimraf@6.1.3/node_modules/rimraf/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
The [UNIX command](<http://en.wikipedia.org/wiki/Rm_(Unix)>) `rm -rf` for node
in a cross-platform implementation.

Install with `npm install rimraf`.

> [!CAUTION]
>
> ## Please Be Safe, this tool deletes and moves stuff, by design
>
> The _intended purpose_ of this tool is to remove files and
> directories from the filesystem, aggressively and recursively
> removing all items that it can find under a given target.
>
> It goes without saying that you _must not pass untrusted input
> to this function or CLI tool_, just as you would not to the
> `rm(1)` command or the `unlink(2)` function. It is very
> challenging to guarantee that _any_ user input will be safe to
> remove recursively in this way.
>
> Furthermore, note that if you allow untrusted parties to
> provide arguments to the `rimraf` command line tool, they may
> also specify the `--tmp=<dir>` folder used by the
> `--impl=move-remove` strategy, which can move files to an
> arbitrary place on disk.
>
> Because the intended purpose of this tool is the permanent
> destruction of filesystem entries, any security reports that
> rely on untrusted input being passed to the function or command
> line tool will be rejected.
>
> **It is your responsibility as a user to never pass untrusted
> user input to this module, or your system can be destroyed or
> compromised.**

## Major Changes

### v5 to v6

- Require node `20` or `>=22`
- Add `--version` to CLI

### v4 to v5

- There is no default export anymore. Import the functions directly
  using, e.g., `import { rimrafSync } from 'rimraf'`.

### v3 to v4

- The function returns a `Promise` instead of taking a callback.
- Globbing requires the `--glob` CLI option or `glob` option property
  to be set. (Removed in 4.0 and 4.1, opt-in support added in 4.2.)
- Functions take arrays of paths, as well as a single path.
- Native implementation used by default when available, except on
  Windows, where this implementation is faster and more reliable.
- New implementation on Windows, falling back to "move then
  remove" strategy when exponential backoff for `EBUSY` fails to
  resolve the situation.
- Simplified implementation on POSIX, since the Windows
  affordances are not necessary there.
- As of 4.3, return/resolve value is boolean instead of undefined.

## API

Hybrid module, load either with `import` or `require()`.

``\`js
// 'rimraf' export is the one you probably want, but other
// strategies exported as well.
import { rimraf, rimrafSync, native, nativeSync } from 'rimraf'
// or
const { rimraf, rimrafSync, native, nativeSync } = require('rimraf')
``\`

All removal functions return a boolean indicating that all
entries were successfully removed.

The only case in which this will not return `true` is if
something was omitted from the removal via a `filter` option.

### `rimraf(f, [opts]) -> Promise`

This first parameter is a path or array of paths. The second
argument is an options object.

Options:

- `preserveRoot`: If set to boolean `false`, then allow the
  recursive removal of the root directory. Otherwise, this is
  not allowed.
- `tmp`: Windows only. Temp folder to place files and
  folders for the "move then remove" fallback. Must be on the
  same physical device as the path being deleted. Defaults to
  `os.tmpdir()` when that is on the same drive letter as the path
  being deleted, or `${drive}:\temp` if present, or `${drive}:\`
  if not.
- `maxRetries`: Windows and Native only. Maximum number of
  retry attempts in case of `EBUSY`, `EMFILE`, and `ENFILE`
  errors. Default `10` for Windows implementation, `0` for Native
  implementation.
- `backoff`: Windows only. Rate of exponential backoff for async
  removal in case of `EBUSY`, `EMFILE`, and `ENFILE` errors.
  Should be a number greater than 1. Default `1.2`
- `maxBackoff`: Windows only. Maximum total backoff time in ms to
  attempt asynchronous retries in case of `EBUSY`, `EMFILE`, and
  `ENFILE` errors. Default `200`. With the default `1.2` backoff
  rate, this results in 14 retries, with the final retry being
  delayed 33ms.
- `retryDelay`: Native only. Time to wait between retries, using
  linear backoff. Default `100`.
- `signal` Pass in an AbortSignal to cancel the directory
  removal. This is useful when removing large folder structures,
  if you'd like to limit the time spent.

  Using a `signal` option prevents the use of Node's built-in
  `fs.rm` because that implementation does not support abort
  signals.

- `glob` Boolean flag to treat path as glob pattern, or an object
  specifying [`glob` options](https://github.com/isaacs/node-glob).
- `filter` Method that returns a boolean indicating whether that
  path should be deleted. With async `rimraf` methods, this may
  return a Promise that resolves to a boolean. (Since Promises
  are truthy, returning a Promise from a sync filter is the same
  as just not filtering anything.)

  The first argument to the filter is the path string. The
  second argument is either a `Dirent` or `Stats` object for that
  path. (The first path explored will be a `Stats`, the rest
  will be `Dirent`.)

  If a filter method is provided, it will _only_ remove entries
  if the filter returns (or resolves to) a truthy value. Omitting
  a directory will still allow its children to be removed, unless
  they are also filtered out, but any parents of a filtered entry
  will not be removed, since the directory will not be empty in
  that case.

  Using a filter method prevents the use of Node's built-in
  `fs.rm` because that implementation does not support filtering.

Any other options are provided to the native Node.js `fs.rm` implementation
when that is used.

This will attempt to choose the best implementation, based on the Node.js
version and `process.platform`. To force a specific implementation, use
one of the other functions provided.

### `rimraf.sync(f, [opts])` <br> `rimraf.rimrafSync(f, [opts])`

Synchronous form of `rimraf()`

Note that, unlike many file system operations, the synchronous form will
typically be significantly _slower_ than the async form, because recursive
deletion is extremely parallelizable.

### `rimraf.native(f, [opts])`

Uses the built-in `fs.rm` implementation that Node.js provides. This is
used by default on Node.js versions greater than or equal to `14.14.0`.

### `rimraf.native.sync(f, [opts])` <br> `rimraf.nativeSync(f, [opts])`

Synchronous form of `rimraf.native`

### `rimraf.manual(f, [opts])`

Use the JavaScript implementation appropriate for your operating system.

### `rimraf.manual.sync(f, [opts])` <br> `rimraf.manualSync(f, opts)`

Synchronous form of `rimraf.manual()`

### `rimraf.windows(f, [opts])`

JavaScript implementation of file removal appropriate for Windows
platforms. Works around `unlink` and `rmdir` not being atomic
operations, and `EPERM` when deleting files with certain
permission modes.

First deletes all non-directory files within the tree, and then
removes all directories, which should ideally be empty by that
time. When an `ENOTEMPTY` is raised in the second pass, falls
back to the `rimraf.moveRemove` strategy as needed.

### `rimraf.windows.sync(path, [opts])` <br> `rimraf.windowsSync(path, [opts])`

Synchronous form of `rimraf.windows()`

### `rimraf.moveRemove(path, [opts])`

Moves all files and folders to the parent directory of `path`
with a temporary filename prior to attempting to remove them.

Note that, in cases where the operation fails, this _may_ leave
files lying around in the parent directory with names like
`.file-basename.txt.0.123412341`. Until the Windows kernel
provides a way to perform atomic `unlink` and `rmdir` operations,
this is, unfortunately, unavoidable.

To move files to a different temporary directory other than the
parent, provide `opts.tmp`. Note that this _must_ be on the same
physical device as the folder being deleted, or else the
operation will fail.

This is the slowest strategy, but most reliable on Windows
platforms. Used as a last-ditch fallback by `rimraf.windows()`.

### `rimraf.moveRemove.sync(path, [opts])` <br> `rimraf.moveRemoveSync(path, [opts])`

Synchronous form of `rimraf.moveRemove()`

### Command Line Interface

``\`
rimraf version 6.0.1

Usage: rimraf <path> [<path> ...]
Deletes all files and folders at "path", recursively.

Options:
  --                   Treat all subsequent arguments as paths
  -h --help            Display this usage info
  --version            Display version
  --preserve-root      Do not remove '/' recursively (default)
  --no-preserve-root   Do not treat '/' specially
  -G --no-glob         Treat arguments as literal paths, not globs (default)
  -g --glob            Treat arguments as glob patterns
  -v --verbose         Be verbose when deleting files, showing them as
                       they are removed. Not compatible with --impl=native
  -V --no-verbose      Be silent when deleting files, showing nothing as
                       they are removed (default)
  -i --interactive     Ask for confirmation before deleting anything
                       Not compatible with --impl=native
  -I --no-interactive  Do not ask for confirmation before deleting

  --impl=<type>        Specify the implementation to use:
                       rimraf: choose the best option (default)
                       native: the built-in implementation in Node.js
                       manual: the platform-specific JS implementation
                       posix: the Posix JS implementation
                       windows: the Windows JS implementation (falls back to
                                move-remove on ENOTEMPTY)
                       move-remove: a slow reliable Windows fallback

Implementation-specific options:
  --tmp=<path>        Temp file folder for 'move-remove' implementation
  --max-retries=<n>   maxRetries for 'native' and 'windows' implementations
  --retry-delay=<n>   retryDelay for 'native' implementation, default 100
  --backoff=<n>       Exponential backoff factor for retries (default: 1.2)
``\`

## mkdirp

If you need to _create_ a directory recursively, check out
[mkdirp](https://github.com/isaacs/node-mkdirp).

```

</details>

## sax@1.6.1

- Declared metadata: BlueOak-1.0.0
- Source metadata: git+ssh://git@github.com/isaacs/sax-js.git
- Package manifest: node_modules/.pnpm/sax@1.6.1/node_modules/sax/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
# sax js

A sax-style parser for XML and HTML.

Designed with [node](http://nodejs.org/) in mind, but should work fine in
the browser or other CommonJS implementations.

## What This Is

- A very simple tool to parse through an XML string.
- A stepping stone to a streaming HTML parser.
- A handy way to deal with RSS and other mostly-ok-but-kinda-broken XML
  docs.

## What This Is (probably) Not

- An HTML Parser - That's a fine goal, but this isn't it. It's just
  XML.
- A DOM Builder - You can use it to build an object model out of XML,
  but it doesn't do that out of the box.
- XSLT - No DOM = no querying.
- 100% Compliant with (some other SAX implementation) - Most SAX
  implementations are in Java and do a lot more than this does.
- An XML Validator - It does a little validation when in strict mode, but
  not much.
- A Schema-Aware XSD Thing - Schemas are an exercise in fetishistic
  masochism.
- A DTD-aware Thing - Fetching DTDs is a much bigger job.

## Regarding `<!DOCTYPE`s and `<!ENTITY`s

The parser will handle the basic XML entities in text nodes and attribute
values: `&amp; &lt; &gt; &apos; &quot;`. It's possible to define additional
entities in XML by putting them in the DTD. This parser doesn't do anything
with that. If you want to listen to the `ondoctype` event, and then fetch
the doctypes, and read the entities and add them to `parser.ENTITIES`, then
be my guest.

Unknown entities will fail in strict mode, and in loose mode, will pass
through unmolested.

## Usage

``\`javascript
var sax = require('./lib/sax'),
  strict = true, // set to false for html-mode
  parser = sax.parser(strict)

parser.onerror = function (e) {
  // an error happened.
}
parser.ontext = function (t) {
  // got some text.  t is the string of text.
}
parser.onopentag = function (node) {
  // opened a tag.  node has "name" and "attributes"
}
parser.onattribute = function (attr) {
  // an attribute.  attr has "name" and "value"
}
parser.onend = function () {
  // parser stream is done, and ready to have more stuff written to it.
}

parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close()

// stream usage
// takes the same options as the parser
var saxStream = require('sax').createStream(strict, options)
saxStream.on('error', function (e) {
  // unhandled errors will throw, since this is a proper node
  // event emitter.
  console.error('error!', e)
  // clear the error
  this._parser.error = null
  this._parser.resume()
})
saxStream.on('opentag', function (node) {
  // same object as above
})
// pipe is supported, and it's readable/writable
// same chunks coming in also go out.
fs.createReadStream('file.xml')
  .pipe(saxStream)
  .pipe(fs.createWriteStream('file-copy.xml'))
``\`

## Arguments

Pass the following arguments to the parser function. All are optional.

`strict` - Boolean. Whether or not to be a jerk. Default: `false`.

`opt` - Object bag of settings regarding string formatting. All default to `false`.

Settings supported:

- `trim` - Boolean. Whether or not to trim text and comment nodes.
- `normalize` - Boolean. If true, then turn any whitespace into a single
  space.
- `lowercase` - Boolean. If true, then lowercase tag names and attribute names
  in loose mode, rather than uppercasing them.
- `xmlns` - Boolean. If true, then namespaces are supported.
- `position` - Boolean. If false, then don't track line/col/position.
- `strictEntities` - Boolean. If true, only parse [predefined XML
  entities](http://www.w3.org/TR/REC-xml/#sec-predefined-ent)
  (`&amp;`, `&apos;`, `&gt;`, `&lt;`, and `&quot;`)
- `unquotedAttributeValues` - Boolean. If true, then unquoted
  attribute values are allowed. Defaults to `false` when `strict`
  is true, `true` otherwise.

## Methods

`write` - Write bytes onto the stream. You don't have to do this all at
once. You can keep writing as much as you want.

`close` - Close the stream. Once closed, no more data may be written until
it is done processing the buffer, which is signaled by the `end` event.

`resume` - To gracefully handle errors, assign a listener to the `error`
event. Then, when the error is taken care of, you can call `resume` to
continue parsing. Otherwise, the parser will not continue while in an error
state.

## Members

At all times, the parser object will have the following members:

`line`, `column`, `position` - Indications of the position in the XML
document where the parser currently is looking.

`startTagPosition` - Indicates the position where the current tag starts.

`closed` - Boolean indicating whether or not the parser can be written to.
If it's `true`, then wait for the `ready` event to write again.

`strict` - Boolean indicating whether or not the parser is a jerk.

`opt` - Any options passed into the constructor.

`tag` - The current tag being dealt with.

And a bunch of other stuff that you probably shouldn't touch.

## Events

All events emit with a single argument. To listen to an event, assign a
function to `on<eventname>`. Functions get executed in the this-context of
the parser object. The list of supported events are also in the exported
`EVENTS` array.

When using the stream interface, assign handlers using the EventEmitter
`on` function in the normal fashion.

`error` - Indication that something bad happened. The error will be hanging
out on `parser.error`, and must be deleted before parsing can continue. By
listening to this event, you can keep an eye on that kind of stuff. Note:
this happens _much_ more in strict mode. Argument: instance of `Error`.

`text` - Text node. Argument: string of text.

`doctype` - The `<!DOCTYPE` declaration. Argument: doctype string.

`processinginstruction` - Stuff like `<?xml foo="blerg" ?>`. Argument:
object with `name` and `body` members. Attributes are not parsed, as
processing instructions have implementation dependent semantics.

`sgmldeclaration` - Random SGML declarations. Stuff like `<!ENTITY p>`
would trigger this kind of event. This is a weird thing to support, so it
might go away at some point. SAX isn't intended to be used to parse SGML,
after all.

`opentagstart` - Emitted immediately when the tag name is available,
but before any attributes are encountered. Argument: object with a
`name` field and an empty `attributes` set. Note that this is the
same object that will later be emitted in the `opentag` event.

`opentag` - An opening tag. Argument: object with `name` and `attributes`.
In non-strict mode, tag names are uppercased, unless the `lowercase`
option is set. If the `xmlns` option is set, then it will contain
namespace binding information on the `ns` member, and will have a
`local`, `prefix`, and `uri` member.

`closetag` - A closing tag. In loose mode, tags are auto-closed if their
parent closes. In strict mode, well-formedness is enforced. Note that
self-closing tags will have `closeTag` emitted immediately after `openTag`.
Argument: tag name.

`attribute` - An attribute node. Argument: object with `name` and `value`.
In non-strict mode, attribute names are uppercased, unless the `lowercase`
option is set. If the `xmlns` option is set, it will also contains namespace
information.

`comment` - A comment node. Argument: the string of the comment.

`opencdata` - The opening tag of a `<![CDATA[` block.

`cdata` - The text of a `<![CDATA[` block. Since `<![CDATA[` blocks can get
quite large, this event may fire multiple times for a single block, if it
is broken up into multiple `write()`s. Argument: the string of random
character data.

`closecdata` - The closing tag (`]]>`) of a `<![CDATA[` block.

`opennamespace` - If the `xmlns` option is set, then this event will
signal the start of a new namespace binding.

`closenamespace` - If the `xmlns` option is set, then this event will
signal the end of a namespace binding.

`end` - Indication that the closed stream has ended.

`ready` - Indication that the stream has reset, and is ready to be written
to.

`noscript` - In non-strict mode, `<script>` tags trigger a `"script"`
event, and their contents are not checked for special xml characters.
If you pass `noscript: true`, then this behavior is suppressed.

## Reporting Problems

It's best to write a failing test if you find an issue. I will always
accept pull requests with failing tests if they demonstrate intended
behavior, but it is very hard to figure out what issue you're describing
without a test. Writing a test is also the best way for you yourself
to figure out if you really understand the issue you think you have with
sax-js.

```

</details>

## stream-buffers@2.2.0

- Declared metadata: Unlicense
- Source metadata: https://github.com/samcday/node-stream-buffer.git
- Package manifest: node_modules/.pnpm/stream-buffers@2.2.0/node_modules/stream-buffers/package.json
- Candidate license files: README.md, UNLICENSE

<details><summary>README.md</summary>

```text
# Node Stream Buffers

[![Build Status][badge-travis-img]][badge-travis-url]
[![Code Climate][badge-climate-img]][badge-climate-url]
[![Code Coverage][badge-coverage-img]][badge-coverage-url]

Simple Readable and Writable Streams that use a [Buffer][node-buffer-docs] to store received data, or for data to send out. Useful for test code, debugging, and a wide range of other utilities.

## Installation

[![NPM][badge-npm-img]][badge-npm-url]

## Usage

To use the stream buffers in your module, simply import it and away you go.

``\`js
var streamBuffers = require("stream-buffers");
``\`

### Writable StreamBuffer

Writable Stream Buffers implement the standardized writable stream interface. All write()'s to this object will accumulate in an internal Buffer. If the Buffer overflows it will be resized larger automatically. The initial size of the Buffer and the amount in which it grows can be configured in the constructor.

``\`js
var myWritableStreamBuffer = new streamBuffers.WritableStreamBuffer({
	initialSize: (100 * 1024),		// start as 100 kilobytes.
	incrementAmount: (10 * 1024)	// grow by 10 kilobytes each time buffer overflows.
});
``\`

The default initial size and increment amount are stored in the following constants:

``\`js
streamBuffers.DEFAULT_INITIAL_SIZE 		// (8 * 1024)
streamBuffers.DEFAULT_INCREMENT_AMOUNT	// (8 * 1024)
``\`

Writing is standard Stream stuff:

``\`js
myWritableStreamBuffer.write(myBuffer);
// - or -
myWritableStreamBuffer.write("\u00bd + \u00bc = \u00be", "utf8");
``\`

You can query the size of the data being held in the Buffer, and also how big the Buffer's max capacity currently is: 

``\`js
myWritableStreamBuffer.write("ASDF");
streamBuffers.size();			// 4.
streamBuffers.maxSize();		// Whatever was configured as initial size. In our example: (100 * 1024).
``\`

Retrieving the contents of the Buffer is simple:

``\`js
myWritableStreamBuffer.getContents();					// Gets all held data as a Buffer.
myWritableStreamBuffer.getContentsAsString("utf8");		// Gets all held data as a utf8 string.
myWritableStreamBuffer.getContents(5);					// Gets first 5 bytes as a Buffer.
myWritableStreamBuffer.getContentsAsString("utf8", 5);	// Gets first 5 bytes as a utf8 string.
``\`

Care should be taken when getting encoded strings from WritableStream, as it doesn't really care about the contents (multi-byte characters will not be respected).
 
Destroying or ending the WritableStream will not delete the contents of Buffer, but will disallow any further writes:

``\`js
myWritableStreamBuffer.write("ASDF");
myWritableStreamBuffer.destroy();

myWritableStreamBuffer.getContents();		// Returns ASDF in Buffer.
myWritableStreamBuffer.write("Yeah?");		// No effect.
``\`	

### Readable StreamBuffer

Readable Stream Buffers can have data inserted in them, which will then be pumped out via standard readable stream data events. The data to be sent out is held in a Buffer, which can grow in much the same way as a WritableStream Buffer does, if data is being put in Buffer faster than it's being pumped out. 

The frequency in which chunks are pumped out, and the size of the chunks themselves can be configured in the constructor. The initial size and increment amount of internal Buffer can be configured too.

``\`js
var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
	frequency: 10,		// in milliseconds.
	chunkSize: 2048		// in bytes.
});
``\`

Default frequency and chunk size:

``\`js
streamBuffers.DEFAULT_CHUNK_SIZE 		// (1024)
streamBuffers.DEFAULT_FREQUENCY			// (1)
``\`

Putting data in Buffer to be pumped out is easy:

``\`js
myReadableStreamBuffer.put(aBuffer);
myReadableStreamBuffer.put("A String", "utf8");
``\`

Chunks are pumped out via standard readable stream spec: 

``\`js
myReadableStreamBuffer.on("data", function(data) {
	// Yup.
	assert.isTrue(data instanceof Buffer);
});
``\`

Chunks are pumped out by the interval that you specified in frequency. Setting the frequency to 0 will immediately stream the data (also in chunks), even if the stream has not been piped to a destination. This is useful for unit testing. 

setEncoding() for streams is respected too:

``\`js
myReadableStreamBuffer.setEncoding("utf8");
myReadableStreamBuffer.on("data", function(data) {
	assert.isTrue(data instanceof String);
});
``\`

Pause and resume are also implemented. pause()'ing stream will allow buffer to continue accumulating, but will not pump any of that data out until it is resume()'d again. 

Destroying the stream will immediately purge the buffer, unless destroySoon() is called, in which case the rest of the buffer will be written out. Either way, any further attempts to put data in the Buffer will be silently ignored. 

``\`js
myReadableStreamBuffer.destroySoon();
myReadableStreamBuffer.put("A String!");
myReadableStreamBuffer.size();			// will be 0.
``\`

## Disclaimer

Not supposed to be a speed demon, it's more for tests/debugging or weird edge cases. It works with an internal buffer that it copies contents to/from/around.

## Contributors

Thanks to the following people for taking some time to contribute to this project.

 * Igor Dralyuk <idralyuk@ebay.com>
 * Simon Koudijs <simon.koudijs@intellifi.nl>

## License

node-stream-buffer is free and unencumbered public domain software. For more information, see the accompanying UNLICENSE file.

[badge-travis-img]: http://img.shields.io/travis/samcday/node-stream-buffer.svg?style=flat-square
[badge-travis-url]: https://travis-ci.org/samcday/node-stream-buffer
[badge-climate-img]: http://img.shields.io/codeclimate/github/samcday/node-stream-buffer.svg?style=flat-square
[badge-climate-url]: https://codeclimate.com/github/samcday/node-stream-buffer
[badge-coverage-img]: http://img.shields.io/codeclimate/coverage/github/samcday/node-stream-buffer.svg?style=flat-square
[badge-coverage-url]: https://codeclimate.com/github/samcday/node-stream-buffer
[badge-npm-img]: https://nodei.co/npm/stream-buffers.png?downloads=true&downloadRank=true&stars=true
[badge-npm-url]: https://npmjs.org/package/stream-buffers

[node-buffer-docs]: http://nodejs.org/api/buffer.html

```

</details>

<details><summary>UNLICENSE</summary>

```text
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
```

</details>

## tar@7.5.22

- Declared metadata: BlueOak-1.0.0
- Source metadata: https://github.com/isaacs/node-tar.git
- Package manifest: node_modules/.pnpm/tar@7.5.22/node_modules/tar/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
# node-tar

Fast and full-featured Tar for Node.js

The API is designed to mimic the behavior of `tar(1)` on unix systems.
If you are familiar with how tar works, most of this will hopefully be
straightforward for you. If not, then hopefully this module can teach
you useful unix skills that may come in handy someday :)

## Security Information

Significant efforts have been taken to harden this library
against a wide variety of filesystem based attacks, especially as
it is used to unpack packages that are published by unknown
agents to [the npm registry](https://npmjs.com/).

A brief overview of some of the hardening that has gone into this
implementation. (Note that most of these are disabled if
`preservePaths: true` is set in the options.)

- Paths that attempt to walk up outside of the extraction target
  are ignored, and a warning is raised.
- `Link` and `SymbolicLink` entries are not allowed to target
  locations outside of the extraction folder.
- Extraction is not allowed through a symbolic link that appears
  within the extraction target.
- Absolute paths are turned into relative paths underneath the
  extraction target.
- Character Device, Block Device, and FIFO entries are never
  extracted.
- File and directory ownership is not mutated unless `forceChown`
  is set, or the extraction is run as root.
- File and directory modes in the archive are ignored, unless
  the `chmod: true` option is set.
- A path-reservation system is used to ensure that even when
  multiple entries are being extracted in parallel, subsequent
  entries with the same filename will not interfere with one
  another (for example, exchanging a file with a symbolic link
  while it is being written to).
- Unicode characters in path names are fully normalized, to
  prevent evading these protections with unicode equivalences.

It is frankly unlikely that any tar implementation in JavaScript
is going to be as secure as this one, unless a similar amount of
work is put into it, putting it to the test over many years of
intensive use and scrutiny. You can vibe-code a tar extractor in
an afternoon, but you'll regret it.

> [!WARNING]
>
> **However**, all that being said, _care must still be taken_
> when dealing with data from unknown sources, especially when
> extracting files, with this or any library, no matter how
> hardened it may be. It is _your_ responsibility to use this
> library safely.

1. **NEVER** extract tarball data into a folder that could be
   potentially controlled by an unknown actor. A clever attacker
   can swap out the target of an extracted file with a symbolic
   link to some location of their choosing, resulting in writing
   files outside the target folder. There is no reasonable way to
   harden against this category of attack, and security reports
   about it will be closed.
   [TOCTOU](https://cwe.mitre.org/data/definitions/367.html)
   exposure is unavoidable when creating files based on entries
   in an archive file.
2. If you are unpacking tarballs that may come from an unknown
   source, it is **highly recommended** that you use a filter
   function that rejects all hardlinks and symbolic links. Link
   files are historically the root of nearly every file
   extraction vulnerability. (npm filters links out of package
   artifacts for this reason.)
3. If you are extracting tarballs that are compressed (eg, with
   gzip, brotli, or zstd), then it is a very good idea to also
   filter out any files that are excessively large. Even if you
   are restricting the size of the archive file itself, an
   excessively large file of repetitive data can compress down
   very small, and extract to take up a lot of disk space.
4. **Stay up to date.** Old versions of tar are not maintained or
   tested for newly discovered security advisories, and should be
   assumed to contain every known security vulnerability, and
   many that are unknown.

If you find a security vulnerability in node-tar, where it is not
properly enforcing the intended security protections, then please
report it using the GitHub Security Advisories system, where it
will be triaged and corrected if possible.

## Background

A "tar file" or "tarball" is an archive of file system entries
(directories, files, links, etc.) The name comes from "tape archive".
If you run `man tar` on almost any Unix command line, you'll learn
quite a bit about what it can do, and its history.

Tar has 5 main top-level commands:

- `c` Create an archive
- `r` Replace entries within an archive
- `u` Update entries within an archive (ie, replace if they're newer)
- `t` List out the contents of an archive
- `x` Extract an archive to disk

The other flags and options modify how this top level function works.

## High-Level API

These 5 functions are the high-level API. All of them have a
single-character name (for unix nerds familiar with `tar(1)`) as well
as a long name (for everyone else).

All the high-level functions take the following arguments, all three
of which are optional and may be omitted.

1. `options` - An optional object specifying various options
2. `paths` - An array of paths to add or extract
3. `callback` - Called when the command is completed, if async. (If
   sync or no file specified, providing a callback throws a
   `TypeError`.)

If the command is sync (ie, if `options.sync=true`), then the
callback is not allowed, since the action will be completed immediately.

If a `file` argument is specified, and the command is async, then a
`Promise` is returned. In this case, if async, a callback may be
provided which is called when the command is completed.

If a `file` option is not specified, then a stream is returned. For
`create`, this is a readable stream of the generated archive. For
`list` and `extract` this is a writable stream that an archive should
be written into. If a file is not specified, then a callback is not
allowed, because you're already getting a stream to work with.

`replace` and `update` only work on existing archives, and so require
a `file` argument.

Sync commands without a file argument return a stream that acts on its
input immediately in the same tick. For readable streams, this means
that all of the data is immediately available by calling
`stream.read()`. For writable streams, it will be acted upon as soon
as it is provided, but this can be at any time.

### Warnings and Errors

Tar emits warnings and errors for recoverable and unrecoverable situations,
respectively. In many cases, a warning only affects a single entry in an
archive, or is simply informing you that it's modifying an entry to comply
with the settings provided.

Unrecoverable warnings will always raise an error (ie, emit `'error'` on
streaming actions, throw for non-streaming sync actions, reject the
returned Promise for non-streaming async operations, or call a provided
callback with an `Error` as the first argument). Recoverable errors will
raise an error only if `strict: true` is set in the options.

Respond to (recoverable) warnings by listening to the `warn` event.
Handlers receive 3 arguments:

- `code` String. One of the error codes below. This may not match
  `data.code`, which preserves the original error code from fs and zlib.
- `message` String. More details about the error.
- `data` Metadata about the error. An `Error` object for errors raised by
  fs and zlib. All fields are attached to errors raisd by tar. Typically
  contains the following fields, as relevant:
  - `tarCode` The tar error code.
  - `code` Either the tar error code, or the error code set by the
    underlying system.
  - `file` The archive file being read or written.
  - `cwd` Working directory for creation and extraction operations.
  - `entry` The entry object (if it could be created) for `TAR_ENTRY_INFO`,
    `TAR_ENTRY_INVALID`, and `TAR_ENTRY_ERROR` warnings.
  - `header` The header object (if it could be created, and the entry could
    not be created) for `TAR_ENTRY_INFO` and `TAR_ENTRY_INVALID` warnings.
  - `recoverable` Boolean. If `false`, then the warning will emit an
    `error`, even in non-strict mode.

#### Error Codes

- `TAR_ENTRY_INFO` An informative error indicating that an entry is being
  modified, but otherwise processed normally. For example, removing `/` or
  `C:\` from absolute paths if `preservePaths` is not set.

- `TAR_ENTRY_INVALID` An indication that a given entry is not a valid tar
  archive entry, and will be skipped. This occurs when:
  - a checksum fails,
  - a `linkpath` is missing for a link type, or
  - a `linkpath` is provided for a non-link type.

  If every entry in a parsed archive raises an `TAR_ENTRY_INVALID` error,
  then the archive is presumed to be unrecoverably broken, and
  `TAR_BAD_ARCHIVE` will be raised.

- `TAR_ENTRY_ERROR` The entry appears to be a valid tar archive entry, but
  encountered an error which prevented it from being unpacked. This occurs
  when:
  - an unrecoverable fs error happens during unpacking,
  - an entry is trying to extract into an excessively deep
    location (by default, limited to 1024 subfolders),
  - an entry has `..` in the path and `preservePaths` is not set, or
  - an entry is extracting through a symbolic link, when `preservePaths` is
    not set.

- `TAR_ENTRY_UNSUPPORTED` An indication that a given entry is
  a valid archive entry, but of a type that is unsupported, and so will be
  skipped in archive creation or extracting.

- `TAR_ABORT` When parsing gzipped-encoded archives, the parser will
  abort the parse process raise a warning for any zlib errors encountered.
  Aborts are considered unrecoverable for both parsing and unpacking.

- `TAR_BAD_ARCHIVE` The archive file is totally hosed. This can happen for
  a number of reasons, and always occurs at the end of a parse or extract:
  - An entry body was truncated before seeing the full number of bytes.
  - The archive contained only invalid entries, indicating that it is
    likely not an archive, or at least, not an archive this library can
    parse.

  `TAR_BAD_ARCHIVE` is considered informative for parse operations, but
  unrecoverable for extraction. Note that, if encountered at the end of an
  extraction, tar WILL still have extracted as much it could from the
  archive, so there may be some garbage files to clean up.

Errors that occur deeper in the system (ie, either the filesystem or zlib)
will have their error codes left intact, and a `tarCode` matching one of
the above will be added to the warning metadata or the raised error object.

Errors generated by tar will have one of the above codes set as the
`error.code` field as well, but since errors originating in zlib or fs will
have their original codes, it's better to read `error.tarCode` if you wish
to see how tar is handling the issue.

### Examples

The API mimics the `tar(1)` command line functionality, with aliases
for more human-readable option and function names. The goal is that
if you know how to use `tar(1)` in Unix, then you know how to use
`import('tar')` in JavaScript.

To replicate `tar czf my-tarball.tgz files and folders`, you'd do:

``\`js
import { create } from 'tar'
create(
  {
    gzip: <true|gzip options>,
    file: 'my-tarball.tgz'
  },
  ['some', 'files', 'and', 'folders']
).then(_ => { .. tarball has been created .. })
``\`

To replicate `tar cz files and folders > my-tarball.tgz`, you'd do:

``\`js
// if you're familiar with the tar(1) cli flags, this can be nice
import * as tar from 'tar'
tar.c(
  {
    // 'z' is alias for 'gzip' option
    z: <true|gzip options>
  },
  ['some', 'files', 'and', 'folders']
).pipe(fs.createWriteStream('my-tarball.tgz'))
``\`

To replicate `tar xf my-tarball.tgz` you'd do:

``\`js
tar.x( // or `tar.extract`
  {
    // or `file:`
    f: 'my-tarball.tgz'
  }
).then(_=> { .. tarball has been dumped in cwd .. })
``\`

To replicate `cat my-tarball.tgz | tar x -C some-dir --strip=1`:

``\`js
fs.createReadStream('my-tarball.tgz').pipe(
  tar.x({
    strip: 1,
    C: 'some-dir', // alias for cwd:'some-dir', a
```

</details>

## vite-plugin-manus-runtime@0.0.59

- Declared metadata: UNKNOWN
- Source metadata: Not declared
- Package manifest: node_modules/.pnpm/vite-plugin-manus-runtime@0.0.59/node_modules/vite-plugin-manus-runtime/package.json
- Candidate license files: None found by filename

## wouter@3.7.1

- Declared metadata: Unlicense
- Source metadata: git+https://github.com/molefrog/wouter.git
- Package manifest: node_modules/.pnpm/wouter@3.7.1_patch_hash=4e16e6ff3fde7d6c1024d3e0c8605dc9eb6afb690d0d49958c2f449091813072_react@19.2.1/node_modules/wouter/package.json
- Candidate license files: README.md

<details><summary>README.md</summary>

```text
<div align="center">
  <img src="assets/logo.svg" width="80" alt="Wouter — a super-tiny React router (logo by Katya Simacheva)" />
</div>

<br />

<div align="center">
  <a href="https://npmjs.org/package/wouter"><img alt="npm" src="https://img.shields.io/npm/v/wouter.svg?color=black&labelColor=888" /></a>
  <a href="https://travis-ci.org/molefrog/wouter"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/molefrog/wouter/size.yml?color=black&labelColor=888&label=2.5KB+limit" /></a>
  <a href="https://codecov.io/gh/molefrog/wouter"><img alt="Coverage" src="https://img.shields.io/codecov/c/github/molefrog/wouter.svg?color=black&labelColor=888" /></a>
  <a href="https://www.npmjs.com/package/wouter"><img alt="Coverage" src="https://img.shields.io/npm/dm/wouter.svg?color=black&labelColor=888" /></a>
  <a href="https://pr.new/molefrog/wouter"><img alt="Edit in StackBlitz IDE" src="https://img.shields.io/badge/StackBlitz-New%20PR-black?labelColor=888" /></a>
</div>

<div align="center">
  <b>wouter</b> is a tiny router for modern React and Preact apps that relies on Hooks. <br />
  A router you wanted so bad in your project!<br>
</div>

## Features

<img src="assets/wouter.svg" align="right" width="250" alt="by Katya Simacheva" />

- Minimum dependencies, only **2.1 KB** gzipped vs 18.7KB
  [React Router](https://github.com/ReactTraining/react-router).
- Supports both **React** and **[Preact](https://preactjs.com/)**! Read
  _["Preact support" section](#preact-support)_ for more details.
- No top-level `<Router />` component, it is **fully optional**.
- Mimics [React Router](https://github.com/ReactTraining/react-router)'s best practices by providing
  familiar **[`Route`](#route-pathpattern-)**, **[`Link`](#link-hrefpath-)**,
  **[`Switch`](#switch-)** and **[`Redirect`](#redirect-topath-)** components.
- Has hook-based API for more granular control over routing (like animations):
  **[`useLocation`](#uselocation-working-with-the-history)**,
  **[`useRoute`](#useroute-route-matching-and-parameters)** and
  **[`useRouter`](#userouter-accessing-the-router-object)**.

## developers :sparkling_heart: wouter

> ... I love Wouter. It’s tiny, fully embraces hooks, and has an intuitive and barebones API. I can
> accomplish everything I could with react-router with Wouter, and it just feels **more minimalist
> while not being inconvenient.**
>
> [**Matt Miller**, _An exhaustive React ecosystem for 2020_](https://medium.com/@mmiller42/an-exhaustive-react-guide-for-2020-7859f0bddc56)

Wouter provides a simple API that many developers and library authors appreciate. Some notable
projects that use wouter: **[Ultra](https://ultrajs.dev/)**,
**[React-three-fiber](https://github.com/react-spring/react-three-fiber)**,
**[Sunmao UI](https://sunmao-ui.com/)**, **[Million](https://million.dev/)** and many more.

## Table of Contents

- [Getting Started](#getting-started)
  - [Browser Support](#browser-support)
- [Wouter API](#wouter-api)
  - [The list of methods available](#the-list-of-methods-available)
- [Hooks API](#hooks-api)
  - [`useRoute`: route matching and parameters](#useroute-route-matching-and-parameters)
  - [`useLocation`: working with the history](#uselocation-working-with-the-history)
    - [Additional navigation parameters](#additional-navigation-parameters)
    - [Customizing the location hook](#customizing-the-location-hook)
  - [`useParams`: extracting matched parameters](#useparams-extracting-matched-parameters)
  - [`useSearch`: query strings](#usesearch-query-strings)
  - [`useSearchParams`: search parameters](#usesearchparams-search-parameters)
  - [`useRouter`: accessing the router object](#userouter-accessing-the-router-object)
- [Component API](#component-api)

  - [`<Route path={pattern} />`](#route-pathpattern-)
    - [Route nesting](#route-nesting)
  - [`<Link href={path} />`](#link-hrefpath-)
  - [`<Switch />`](#switch-)
  - [`<Redirect to={path} />`](#redirect-topath-)
  - [`<Router hook={hook} parser={fn} base={basepath} />`](#router-hookhook-parserfn-basebasepath-hrefsfn-)

- [FAQ and Code Recipes](#faq-and-code-recipes)
  - [I deploy my app to the subfolder. Can I specify a base path?](#i-deploy-my-app-to-the-subfolder-can-i-specify-a-base-path)
  - [How do I make a default route?](#how-do-i-make-a-default-route)
  - [How do I make a link active for the current route?](#how-do-i-make-a-link-active-for-the-current-route)
  - [Are strict routes supported?](#are-strict-routes-supported)
  - [Are relative routes and links supported?](#are-relative-routes-and-links-supported)
  - [Can I initiate navigation from outside a component?](#can-i-initiate-navigation-from-outside-a-component)
  - [Can I use _wouter_ in my TypeScript project?](#can-i-use-wouter-in-my-typescript-project)
  - [How can add animated route transitions?](#how-can-add-animated-route-transitions)
  - [Preact support?](#preact-support)
  - [Server-side Rendering support (SSR)?](#server-side-rendering-support-ssr)
  - [How do I configure the router to render a specific route in tests?](#how-do-i-configure-the-router-to-render-a-specific-route-in-tests)
  - [1KB is too much, I can't afford it!](#1kb-is-too-much-i-cant-afford-it)
- [Acknowledgements](#acknowledgements)

## Getting Started

First, add wouter to your project.

``\`bash
npm i wouter
``\`

Or, if you're using Preact the use the following command [`npm i wouter-preact`](#preact-support).

Check out this simple demo app below. It doesn't cover hooks and other features such as nested routing, but it's a good starting point for those who are migrating from React Router.

``\`js
import { Link, Route, Switch } from "wouter";

const App = () => (
  <>
    <Link href="/users/1">Profile</Link>

    <Route path="/about">About Us</Route>

    {/* 
      Routes below are matched exclusively -
      the first matched route gets rendered
    */}
    <Switch>
      <Route path="/inbox" component={InboxPage} />

      <Route path="/users/:name">
        {(params) => <>Hello, {params.name}!</>}
      </Route>

      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  </>
);
``\`

### Browser Support

This library is designed for **ES2020+** compatibility. If you need to support older browsers, make sure that you transpile `node_modules`. Additionally, the minimum supported TypeScript version is 4.1 in order to support route parameter inference.

## Wouter API

Wouter comes with three kinds of APIs: low-level **standalone location hooks**, hooks for **routing and pattern matching** and more traditional **component-based
API** similar to React Router's one.

You are free to choose whatever works for you: use location hooks when you want to keep your app as small as
possible and don't need pattern matching; use routing hooks when you want to build custom routing components; or if you're building a traditional app
with pages and navigation — components might come in handy.

Check out also [FAQ and Code Recipes](#faq-and-code-recipes) for more advanced things like active
links, default routes, server-side rendering etc.

### The list of methods available

**Location Hooks**

These can be used separately from the main module and have an interface similar to `useState`. These hooks don't support nesting, base path, route matching.

- **[`import { useBrowserLocation } from "wouter/use-browser-location"`](https://github.com/molefrog/wouter/blob/v3/packages/wouter/src/use-browser-location.js)** —
  allows to manipulate current location in the browser's address bar, a tiny wrapper around the History API.
- **[`import { useHashLocation } from "wouter/use-hash-location"`](https://github.com/molefrog/wouter/blob/v3/packages/wouter/src/use-hash-location.js)** — similarly, gets location from the hash part of the address, i.e. the string after a `#`.
- **[`import { memoryLocation } from "wouter/memory-location"`](#uselocation-working-with-the-history)** — an in-memory location hook with history support, external navigation and immutable mode for testing. **Note** the module name because it is a high-order hook. See how memory location can be used in [testing](#how-do-i-configure-the-router-to-render-a-specific-route-in-tests).

**Routing Hooks**

Import from `wouter` module.

- **[`useRoute`](#useroute-the-power-of-hooks)** — shows whether or not current page matches the
  pattern provided.
- **[`useLocation`](#uselocation-working-with-the-history)** — allows to manipulate current
  router's location, by default subscribes to browser location. **Note:** this isn't the same as `useBrowserLocation`, read below.
- **[`useParams`](#useparams-extracting-matched-parameters)** — returns an object with parameters matched from the closest route.
- **[`useSearch`](#usesearch-query-strings)** — returns a search string – everything that goes after the `?`.
- **[`useRouter`](#userouter-accessing-the-router-object)** — returns a global router object that
  holds the configuration. Only use it if you want to customize the routing.

**Components**

Import from `wouter` module.

- **[`<Route />`](#route-pathpattern-)** — conditionally renders a component based on a pattern.
- **[`<Link />`](#link-hrefpath-)** — wraps `<a>`, allows to perform a navigation.
- **[`<Switch />`](#switch-)** — exclusive routing, only renders the first matched route.
- **[`<Redirect />`](#redirect-topath-)** — when rendered, performs an immediate navigation.
- **[`<Router />`](#router-hookhook-matchermatchfn-basebasepath-)** — an optional top-level
  component for advanced routing configuration.

## Hooks API

### `useRoute`: route matching and parameters

Checks if the current location matches the pattern provided and returns an object with parameters. This is powered by a wonderful [`regexparam`](https://github.com/lukeed/regexparam) library, so all its pattern syntax is fully supported.

You can use `useRoute` to perform manual routing or implement custom logic, such as route transitions, etc.

``\`js
import { useRoute } from "wouter";

const Users = () => {
  // `match` is a boolean
  const [match, params] = useRoute("/users/:name");

  if (match) {
    return <>Hello, {params.name}!</>;
  } else {
    return null;
  }
};
``\`

A quick cheatsheet of what types of segments are supported:

``\`js
useRoute("/app/:page");
useRoute("/app/:page/:section");

// optional parameter, matches "/en/home" and "/home"
useRoute("/:locale?/home");

// suffixes
useRoute("/movies/:title.(mp4|mov)");

// wildcards, matches "/app", "/app-1", "/app/home"
useRoute("/app*");

// optional wildcards, matches "/orders", "/orders/"
// and "/orders/completed/list"
useRoute("/orders/*?");

// regex for matching complex patterns,
// matches "/hello:123"
useRoute(/^[/]([a-z]+):([0-9]+)[/]?$/);
// and with named capture groups
useRoute(/^[/](?<word>[a-z]+):(?<num>[0-9]+)[/]?$/);
``\`

The second item in the pair `params` is an object with parameters or null if there was no match. For wildcard segments the parameter name is `"*"`:

``\`js
// wildcards, matches "/app", "/app-1", "/app/home"
const [match, params] = useRoute("/app*");

if (match) {
  // "/home" for "/app/home"
  const page = params["*"];
}
``\`

### `useLocation`: working with the history

To get the current path and navigate between pages, call the `useLocation` hook. Similarly to `useState`, it returns a value and a setter: the component will re-render when the location changes and by calling `navigate` you can update this value and perform navigation.

By default, it uses `useBrowserLocation` under the hood, though you can configure this in a top-level `Router` component (for example, if you decide at some point to switch to a hash-based routing). `useLocation` will also return scoped path when used within nested routes or with base path setting.

``\`js
import { useLocation } from "wouter";

const CurrentLocation = () => {
  const [location, navigate] = useLocation();

  return (
    <div>
      {`The current page is: ${locat
```

</details>

## yallist@5.0.0

- Declared metadata: BlueOak-1.0.0
- Source metadata: git+https://github.com/isaacs/yallist.git
- Package manifest: node_modules/.pnpm/yallist@5.0.0/node_modules/yallist/package.json
- Candidate license files: LICENSE.md, README.md

<details><summary>LICENSE.md</summary>

```text
All packages under `src/` are licensed according to the terms in
their respective `LICENSE` or `LICENSE.md` files.

The remainder of this project is licensed under the Blue Oak
Model License, as follows:

-----

# Blue Oak Model License

Version 1.0.0

## Purpose

This license gives everyone as much permission to work with
this software as possible, while protecting contributors
from liability.

## Acceptance

In order to receive this license, you must agree to its
rules.  The rules of this license are both obligations
under that agreement and conditions to your license.
You must not do anything with this software that triggers
a rule that you cannot or will not follow.

## Copyright

Each contributor licenses you to do everything with this
software that would otherwise infringe that contributor's
copyright in it.

## Notices

You must ensure that everyone who gets a copy of
any part of this software from you, with or without
changes, also gets the text of this license or a link to
<https://blueoakcouncil.org/license/1.0.0>.

## Excuse

If anyone notifies you in writing that you have not
complied with [Notices](#notices), you can keep your
license by taking all practical steps to comply within 30
days after the notice.  If you do not do so, your license
ends immediately.

## Patent

Each contributor licenses you to do everything with this
software that would otherwise infringe any patent claims
they can license or become able to license.

## Reliability

No contributor can revoke this license.

## No Liability

***As far as the law allows, this software comes as is,
without any warranty or condition, and no contributor
will be liable to anyone for any damages related to this
software or this license, under any kind of legal claim.***

```

</details>

<details><summary>README.md</summary>

```text
# yallist

Yet Another Linked List

There are many doubly-linked list implementations like it, but this
one is mine.

For when an array would be too big, and a Map can't be iterated in
reverse order.

## basic usage

``\`js
import { Yallist } from 'yallist'
var myList = new Yallist([1, 2, 3])
myList.push('foo')
myList.unshift('bar')
// of course pop() and shift() are there, too
console.log(myList.toArray()) // ['bar', 1, 2, 3, 'foo']
myList.forEach(function (k) {
  // walk the list head to tail
})
myList.forEachReverse(function (k, index, list) {
  // walk the list tail to head
})
var myDoubledList = myList.map(function (k) {
  return k + k
})
// now myDoubledList contains ['barbar', 2, 4, 6, 'foofoo']
// mapReverse is also a thing
var myDoubledListReverse = myList.mapReverse(function (k) {
  return k + k
}) // ['foofoo', 6, 4, 2, 'barbar']

var reduced = myList.reduce(function (set, entry) {
  set += entry
  return set
}, 'start')
console.log(reduced) // 'startfoo123bar'
``\`

## api

The whole API is considered "public".

Functions with the same name as an Array method work more or less the
same way.

There's reverse versions of most things because that's the point.

### Yallist

Default export, the class that holds and manages a list.

Call it with either a forEach-able (like an array) or a set of
arguments, to initialize the list.

The Array-ish methods all act like you'd expect.  No magic length,
though, so if you change that it won't automatically prune or add
empty spots.

### Yallist.create(..)

Alias for Yallist function.  Some people like factories.

#### yallist.head

The first node in the list

#### yallist.tail

The last node in the list

#### yallist.length

The number of nodes in the list.  (Change this at your peril.  It is
not magic like Array length.)

#### yallist.toArray()

Convert the list to an array.

#### yallist.forEach(fn, [thisp])

Call a function on each item in the list.

#### yallist.forEachReverse(fn, [thisp])

Call a function on each item in the list, in reverse order.

#### yallist.get(n)

Get the data at position `n` in the list.  If you use this a lot,
probably better off just using an Array.

#### yallist.getReverse(n)

Get the data at position `n`, counting from the tail.

#### yallist.map(fn, thisp)

Create a new Yallist with the result of calling the function on each
item.

#### yallist.mapReverse(fn, thisp)

Same as `map`, but in reverse.

#### yallist.pop()

Get the data from the list tail, and remove the tail from the list.

#### yallist.push(item, ...)

Insert one or more items to the tail of the list.

#### yallist.reduce(fn, initialValue)

Like Array.reduce.

#### yallist.reduceReverse

Like Array.reduce, but in reverse.

#### yallist.reverse

Reverse the list in place.

#### yallist.shift()

Get the data from the list head, and remove the head from the list.

#### yallist.slice([from], [to])

Just like Array.slice, but returns a new Yallist.

#### yallist.sliceReverse([from], [to])

Just like yallist.slice, but the result is returned in reverse.

#### yallist.splice(start, deleteCount, ...)

Like Array.splice.

#### yallist.toArray()

Create an array representation of the list.

#### yallist.toArrayReverse()

Create a reversed array representation of the list.

#### yallist.unshift(item, ...)

Insert one or more items to the head of the list.

#### yallist.unshiftNode(node)

Move a Node object to the front of the list.  (That is, pull it out of
wherever it lives, and make it the new head.)

If the node belongs to a different list, then that list will remove it
first.

#### yallist.pushNode(node)

Move a Node object to the end of the list.  (That is, pull it out of
wherever it lives, and make it the new tail.)

If the node belongs to a list already, then that list will remove it
first.

#### yallist.removeNode(node)

Remove a node from the list, preserving referential integrity of head
and tail and other nodes.

Will throw an error if you try to have a list remove a node that
doesn't belong to it.

### Yallist.Node

The class that holds the data and is actually the list.

Call with `const n = new Node(value, previousNode, nextNode)`

Note that if you do direct operations on Nodes themselves, it's very
easy to get into weird states where the list is broken.  Be careful :)

#### node.next

The next node in the list.

#### node.prev

The previous node in the list.

#### node.value

The data the node contains.

#### node.list

The list to which this node belongs.  (Null if it does not belong to
any list.)

```

</details>
