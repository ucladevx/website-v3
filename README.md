# UCLA DevX Website

Static site for [ucladevx.com](https://ucladevx.com/).

The previous React/Vite site is frozen on `legacy/react-2025`.

## Getting Started

1. Request repo access from Andrew
2. Clone this repo
3. Open the site locally:
   - `python3 -m http.server 5173`
   - Visit [http://localhost:5173/](http://localhost:5173/)

## Development Guide

1. Create a new branch:
   - `git checkout -b <your_name/new_branch_name>` (i.e. `git checkout -b andrew/update-readme`)
2. Commit changes
   - `git add <files to include in commit>`
   - `git commit -m <message>`
3. Push changes
   - If first time pushing the branch, `git push -u origin HEAD`; otherwise, `git push`
4. Create a pull request on GitHub
   - Merge to `main`
   - Include what changed, why, and how you tested (screenshots if applicable)
5. Ping other devs, wait for review, and address comments

## Deployment

GitHub Pages currently still serves the old site from the `gh-pages` branch.

To publish this static site:

1. GitHub repo **Settings → Pages**
2. Set source to **Deploy from a branch**
3. Branch: `main` / folder: `/(root)`

`CNAME` is already set to `ucladevx.com`.

## Production

Check out [https://ucladevx.com/](https://ucladevx.com/)
