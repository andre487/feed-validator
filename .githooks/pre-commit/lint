#!/usr/bin/env bash
set -e

COLOR_RED="\e[0;31m"
COLOR_GREEN="\e[0;32m"
COLOR_YELLOW="\e[0;33m"
COLOR_RESET="\e[0m"

SEPARATOR="${COLOR_YELLOW}----------${COLOR_RESET}"

script_dir=$(cd `dirname $0` && pwd -P)
project_dir=`cd "$script_dir/../.." && pwd -P`
npm_bin_dir=`cd "$project_dir" && npm bin`

patch_file=`mktemp -t "working-tree.patch.XXXXXXXXX"`

function cleanup {
    exit_code=$?
    if [[ -f "$patch_file" ]]; then
        patch -p0 < "$patch_file"
        rm "$patch_file"
    fi
    exit "$exit_code"
}

# Catch an exit event
trap cleanup EXIT SIGINT SIGHUP

# Cancel any changes to the working tree that are not in the git index
git diff --no-prefix > "$patch_file"
git checkout -- .

git_cached_files=$(git diff --cached --name-only --diff-filter=ACMR)
git_cached_js=$(echo "$git_cached_files" | grep '\.js$' | xargs echo)

error=0

eslint_st=0
jscs_st=0

set +e

if [[ "$git_cached_js" ]]; then
    "$npm_bin_dir/eslint" ${git_cached_js}
    if [[ $? != 0 ]]; then
        error=1
        eslint_st=1
        echo -e "$SEPARATOR"
    fi

    "$npm_bin_dir/jscs" ${git_cached_js} --config "$project_dir/.jscs.json"
    if [[ $? != 0 ]]; then
        error=1
        jscs_st=1
        echo -e "$SEPARATOR"
    fi
fi

if [[ "$error" != 0 ]]; then
    echo -en "$COLOR_RED"

    echo "Fail! ☹ You have an issues in the following linters:"
    [[ "$eslint_st" != 0 ]] && echo " ☢ ESLint"
    [[ "$jscs_st" != 0 ]] && echo " ☢ JSCS"

    echo -en "$COLOR_RESET"
    exit 1
fi

echo -e "${COLOR_GREEN}Pre-commit lint: OK${COLOR_RESET}"
