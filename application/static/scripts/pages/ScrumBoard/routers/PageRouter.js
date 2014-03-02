define(["pages/ScrumBoard/views/PageView",
        "pages/ScrumBoard/views/LoginView",
        "pages/ScrumBoard/views/ProfileView"],

    function(PageView, LoginView, ProfileView) {
        return Backbone.Router.extend({
            routes: {
                "": "start",
                "profile": "profile",
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
            },

            profile: function () {
                var profileView = new ProfileView();
                profileView.render();
            }
        })
    }
);
