// config requirejs

require.config({
    //urlArgs: "bust=" + (new Date()).getTime(),  // never delete this
    baseUrl: "/static/scripts",
    paths: {
        text: "libs/requirejs/text"
    }
}); 

require(["pages/ScrumBoard/Application"], function(Application) {
    Application.start();
});

