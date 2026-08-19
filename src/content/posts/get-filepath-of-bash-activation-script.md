---
title: Get filepath of Bash activation script
description: >-
  Use ${BASHSOURCE[0]} to reference the filepath of a Bash script. Unlike $0, this works if the script is called via
  bash script.sh or source script.sh.
date: 2022-07-25
kind: stream
---

Use `${BASH_SOURCE[0]}` to reference the filepath of a Bash script.
Unlike `$0`, this works if the script is called via `bash script.sh` or `source script.sh`.

Source: https://stackoverflow.com/a/8912075

Example:

```bash
# activate.sh

root=$(realpath $(dirname ${BASH_SOURCE[0]}))
source $root/venv/bin/activate
export PYTHONPATH="$root:$PYTHONPATH"
```
