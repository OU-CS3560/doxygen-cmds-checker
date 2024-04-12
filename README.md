# doxygen-cmds-checker

A checker that parse student's answer and check if the mentioned commands are truly doxygen's commands. Visit https://bucket.ouvital.com/tools/doxygen-cmds/.

It can handle the following formats.

- Comma separated list of comands e.g. `@cmd1, @cmd2, @cmd3`.
- A command on its own line e.g.
  ```plain
  @cmd1
  @cmd2
  @cmd3
  ```
- Use the "Take 1st Column" button to get rid of command's description e.g.
  ````plain
  @cmd1 = desciption1
  @cmd2 = desciption2
  @cmd3 = desciption3
  ```
- Use the "Take 2nd Column" button when student used numbered list e.g.
  ```plain
  1. @cmd1
  2. @cmd2
  3. @cmd3
  ```

The "column" is separated by whitespace (`/\s/` in JavaScript Regex.)
