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

| Pattern  | Explanation                  | Example              |
| -------- | ---------------------------- | -------------------- |
| `a*a+a?` | 0 or more, 1 or more, 0 or 1 | `a*a+` matches `aaa` |
| `a{5}`   | Exactly five occurrences     | `a{5}` matches `a    |
