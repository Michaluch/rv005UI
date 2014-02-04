define(["pages/ScrumBoard/views/PageView"], 
    function(PageView) {
        return Backbone.Router.extend({
            routes: {
                "": "start",
                "login": "login"
            },
            
            start: function () {
                _private.pageView = new PageView();
                _private.pageView.render();
            },
            
            login: function () {
                alert("Login");
            }
        })
    }
);

