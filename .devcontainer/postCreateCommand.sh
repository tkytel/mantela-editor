#!/usr/bin/env zsh

set -euxo pipefail

if ! grep -q mise ~/.zshrc; then
	# shellcheck disable=SC2016
	echo 'eval "$(mise activate zsh)"' >>~/.zshrc
fi

mise trust
mise install
mise generate git-pre-commit -w
eval "$(mise activate zsh)"

mise run install
mise run setup-playwright

sed -i ~/.zshrc -e 's/^ZSH_THEME=.*/ZSH_THEME="refined"/'
