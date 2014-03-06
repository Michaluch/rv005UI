define(["pages/ScrumBoard/views/PageView",
        "pages/ScrumBoard/views/LoginView",
        "pages/ScrumBoard/views/ProfileView"],

    function(PageView, LoginView, ProfileView) {
        return Backbone.Router.extend({
            _checked: false,
            _entered: false,

            routes: {
                "": "sprint",
                "login": "login",
                "profile": "profile",
                "*other": "start"
            },
            
            sprint: function () {
                if (this.entered()) {
                    var pageView = new PageView();
                    pageView.render();
                    this.checked = false;
                } else {
                    this.login();
                }
            },

            login: function () {
                if (!this.entered()) {
                    var loginView = new LoginView({router: this});
                    loginView.render();
                    this.checked = false;
                } else {
                    this.sprint();
                }
            },

            profile: function () {
                if (this.entered()) {
                    var profileView = new ProfileView();
                    profileView.render();
                    this.checked = false;
                } else {
                    this.login();
                }
            },

            entered: function () {
                if (!this._checked) {
                    var result = $.ajax({
                        url: "/api/user/entered",
                        async: false
                    }).responseText;
                    this._checked = true;
                    this._entered = (result == "Yes");
                }

                return this._entered;
            }            
        })
    }
);
