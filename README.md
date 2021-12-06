# Food Thematic Website
This onepage website was bulit during study "Full course of JavaScript + React"
It offers services of cooking and delivery dishes by client preferences and calorie needs.
In this project implemented server database communitaction with Fetch API, also it divided into different functional modules which are gathered with Webpack

# Modules and thier function
Some modules take arguments from main script.js and services.js files!
Modules situated in js/modules/ folder, there are:
1. calc - takes no argument, gets static and dynamic information from user and calculate daily calorie
2. cards - takes arguments from database, builts DOM elements with constructor and load them on page
3. forms - takes arguments and functions, shows form-modal window and recives info from user and sends it to db.js
4. modal - has global functions and takes arguments, opens and closes modal windows when needed
5. slider - takes amount of arguments, shows and changes pictures on page, also has a navigation on them
6. tabs - takes no argument, allows you to switch main articles with pictures
7. timer - takes argument and deadline time, shows and counting timer on page 

Folder js/services has only services.js - takes arguments from modules, contains 2 function which allows communication with db.js

# What I learned
In this project I learned not just the basics of HTML, CSS and JS but also:
1) How add node packages, to configure them and execute 
2) How recive and send requests with the server using XML and asynchronous Fetch API
3) How to split up big code into modules and gather them with Webpack
4) How to exchange static and dynamic information with DOM
5) How to set/get and use info from localStorage
6) How to built DOM elements with JS classes and constructor
