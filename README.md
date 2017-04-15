# Real Time Routing Dashboard
This is custom dashboard which tracks entity in real time on map.

### Basic Setup
 * Install all dependencies using `npm install` and `bower install` in the directory
     - Please Install _gulp_ and _bower_ globally, using `-g` option, like `npm install -g bower`
 * ~~Build the Static React components and Scss files, using `gulp build`, before starting the application.~~.(Using BrowseSync Now and also added build in npm script...)
 * Start the WebSocket Server first, using `node socket.js`.
   After, Starting it, run the Node Client Server using `npm start`
 * After Servers Start, In new terminal use `gulp` command to start BrowseSync, and open [Localhost](http://localhost:3002/)

### Description
 The Server will be functional only for providing APIs to the Web Client,
 while all the frontend folders (like: views, public etc.) will be used for
 storing frontend files, that will be compiled before server start and can
 be displayed on the screen. Problem is __How to add route functionality
 properly to a total Frontend Web Client. ReactJS can do it. but am not sure
 How to!__. Probably Handlebars will come Handy here to create Templates and
 Babel will come handy to seperate JS into seperate files...

### Need To Work:

 * CSS Modules for ReactJS, Not a big deal, but can be used...
 * Isomorphic ReactJS Usage...
 * Need Modernizr...
 * SockJS and Stomp.js used in this project are deprecated APIs... need them to upgrade to something new.. Right now I am not sure with which one?
