#!/usr/bin/env zsh

set -euxo pipefail

if ! grep -q "mise" ~/.zshrc; then
  echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
fi

mise trust
mise install
eval "$(mise activate zsh)"
bun i

mise settings experimental=true
mise generate git-pre-commit --write --task=format

sed -i ~/.zshrc -e 's/^ZSH_THEME=.*/ZSH_THEME="refined"/'
