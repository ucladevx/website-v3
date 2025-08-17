# UCLA DevX Website (2025-26)
## Getting Started
1. Request for repo access from Andrew
2. Clone repo
   - Use GitHub Desktop
3. Download node from the internet (skip if you already set up backend)
   - Read https://nodejs.org/en/download
4. Installing project dependencies
   - `cd website-v3`
   - `npm install`

## Starting the dev server 
### `npm run dev`

Runs the app at [http://localhost:5173/](http://localhost:5173/)

## Development Guide
1. Create a new branch using the follow naming conventions 
   - `git checkout -b <your_name/new_branch_name>` (i.e. `git checkout -b andrew/update-readme`)
2. Commit changes
   - `git add <files to include in commit>`
   - `git commit -m <message>`
3. Push changes
   - If first time pushing branch, `git push -u origin HEAD`; otherwise, `git push`
4. Create a pull request on the Github UI
   - You should always merge to the `main` branch
   - Write a concise title and detailed description
       - What was changed?
       - Why was it changed?
       - How did you test? Screenshots if applicable
5. Ping other devs, wait for review, and address comments
  
## Deployment
We are currently deploying a static html file from the `gh-pages` branch. We will need to add a `npm run deploy` script to deploy our react app properly.

## Production
Check out [https://ucladevx.com/](https://ucladevx.com/)
