require.config({
    //urlArgs: "bust=" + (new Date()).getTime(),  // never delete this
    baseUrl: "/static/scripts",
    paths: {
        text: "libs/requirejs/text"
    }
}); 

require(["pages/Test/Application"], function(Application) {
    Application.start();
});