// config requirejs

require.config({
    urlArgs: "bust=" + (new Date()).getTime(),  // never delete this
    baseUrl: "/static/scripts" 
}); 


require(["pages/ScrumBoard/Application"], function(Application) {
    Application.start();
});
