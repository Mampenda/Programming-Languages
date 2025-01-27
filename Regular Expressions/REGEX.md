# Regular Expression

A regular expression (regex) is a sequence of characters that forms a search pattern. It is used primarily for string matching and manipulation in programming languages.

With regex, you can define patterns to search, match, and manipulate text efficiently. Regex is useful for tasks such as validating input, searching for specific patterns, extracting data, and replacing text.

## Cheat Sheet

**Character Classes**

| Pattern    | Explanation                  | Example              |
| ---------- | ---------------------------- | -------------------- |
| `.`        | Any character except newline | `a.c` matches `abc`  |
| `\w \d \s` | Word, digit, whitespace      | `\w+` matches `abc`  |
| `\W \D \S` | Not word, digit, whitespace  | `\D+` matches `abc`  |
| `[abc]`    | Any of `a`, `b`, or `c`      | `[a-c]` matches `a`  |
| `[^abc]`   | Not `a`, `b`, or `c`         | `[^a-c]` matches `d` |

**Anchors**

| Pattern | Explanation            | Example                   |
| ------- | ---------------------- | ------------------------- |
| `^abc$` | Start/end of string    | `^abc$` matches `abc`     |
| `\b \B` | Word/not word boundary | `\bword\b` matches `word` |

**Escaped Characters**

| Pattern    | Explanation                     | Example              |
| ---------- | ------------------------------- | -------------------- |
| `\.`       | Escaped period (.)              | `a\.b` matches `a.b` |
| `\* \\`    | Escaped star (\*) and backslash | `\\` matches `\`     |
| `\t \n \r` | Tab, newline, carriage return   | `\t` matches tab     |

**Groups & Lookaround**

| Pattern   | Explanation               | Example                       |
| --------- | ------------------------- | ----------------------------- |
| `(abc)`   | Capture group             | `(abc)` matches `abc`         |
| `\1`      | Backreference to group #1 | `(\d+)\1` matches `123123`    |
| `(?:abc)` | Non-capturing group       | `(?:abc)` matches `abc`       |
| `(?=abc)` | Positive lookahead        | `\d+(?=abc)` matches `123abc` |
| `(?!abc)` | Negative lookahead        | `\d+(?!abc)` matches `123`    |

**Qualifiers**

| Pattern    | Explanation                       | Example                           |
| ---------- | --------------------------------- | --------------------------------- |
| `a* a+ a?` | 0 or more, 1 or more, 0 or 1      | `a* a+` matches `aaa`             |
| `a{5}`     | Exactly five occurrences          | `a{5}` matches `aaaaa`            |
| `a{2,}`    | Two or more occurrences           | `a{2,}` matches `aa`, `aaa`       |
| `a{1,3}`   | Between one and three occurrences | `a{1,3}` matches `a`, `aa`, `aaa` |
| `a+?`      | Match as few as possible          | `a+?` matches `a` in `aa`         |
| `ab\|cd`   | Match `ab` or `cd`                | `ab\|cd`matches`ab`or`cd`         |

**Examples**

| RegEx          | Explanation                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `[TR]Y[RT]`    | means that the first character can either be `T` or `R`, followed by the letter `Y`, and then another character that can be either `R` or `T`.   |
| `(LE\|EL)H`    | means that the string must contain either`LE`or`EL`, followed by the letter `H`.                                                                 |
| `\d*\w(\d\|R)` | means that there can be zero or more digits, followed by a word character, then either a digit or the letter `R`.                                |
| `[A-FR]+`      | means that there could be any character from `A` to `FR`                                                                                         |
| `A?[DO]O`      | means that there optionally could be `A` or any character from `D` to `O`, and then `O`.                                                         |
| `[Q-U].?`      | means that there could be any character from `Q` to `U`, followed by zero or one additional character.                                           |
| `[ÁÅÄ][M-Z]`   | means that there could be any either `Á`, `Å`, or `Ä`, followed by a character from `M` to `Z`.                                                  |
| `[LIVA]+`      | means that there can be one or more occurences of `L`, `I`, `V`, or `A`                                                                          |
| `\DÁ`          | means that there can be non-digit character followed by `Á`                                                                                      |
| `1L\|IL`       | means that there can be either `1L`or `IL`                                                                                                       |
| `([H-O])\1`    | means that there can be any pair of identical characters from `H` to `O`                                                                         |
| `([GDRY]).\1`  | means that there can be any three-character string where the first and third characters are the same and belong to the set `G`, `D`, `R`, or `Y` |
| `[ODIN\|H]+`   | means that                                                                                                                                       |
| `A?[DO]O`      | means that                                                                                                                                       |
| `A?[DO]O`      | means that                                                                                                                                       |
