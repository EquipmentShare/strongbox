# strongbox
A UI for your secrets

## Setup
1. Change to the root directory (contains this file, `server.js`, etc.)
2. In a terminal, run `npm install`
3. In the same terminal, run `node setup.js` and complete the prompts
4. In the same terminal again, run `npm run build`
5. In another terminal, run `npm start`
6. Access the running site at http://localhost:8020

## Development
During development, you can run a file watcher that will re-build pertinent parts of the application by running `npm run watch`. This is a long-running process that will tie up your terminal, so start a new terminal instance to leave it running.  

> Note that the file system watcher only watches **current** files, so any files added after the watcher is started  will not trigger the builds.
