define(["pages/ScrumBoard/views/PageView",
        "pages/ScrumBoard/views/LoginView"],

    function(PageView, LoginView) {
        return Backbone.Router.extend({
            routes: {
                "": "start",
                "main": "start",
                "login": "login",
                "*other": "start"
            },
            
            start: function () {
                var pageView = new PageView();
                pageView.render();
            },
            
            login: function () {
                var loginView = new LoginView({router: this});
                loginView.render();
            }
        })
    }
);
