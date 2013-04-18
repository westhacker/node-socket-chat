node-socket-chat
================

This demo is based on someone's sample of node-socket-chat. With the updates of NodeJS, remy's sample has been out of use. I modify this sample and localize the server in my demo, which works well with latest NodeJS.

Installation
================

First, download the latest NodeJS and finish the installation in windows.
Second, run NodeJS in commandline and come into the dir of server.js, then start the server by input:
     $ node server.js
Third, open index.html with Chrome or other supported explorers. For testing, open another one, then chat with each other.

Modification
================

1. Solve the problem that original sample don't work well with the latest NodeJS.
2. Modify the websocket-server in order to match this demo.
3. Solve the Error not-opened when connection is closed.
4. Other modifications...

Warnings
================

1. No broadcast can be used in this edition of node-websocket-server.
2. No tests have been done in linux and mac.

Thanks
================

1. Thanks for the original sample.
2. Thanks for your reading and happy coding.
