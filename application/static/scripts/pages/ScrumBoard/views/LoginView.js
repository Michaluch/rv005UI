define(["text!pages/ScrumBoard/templates/LoginView.html",
        "text!pages/ScrumBoard/templates/FooterView.html"],
         
    function(loginView, footerView) {
        return Backbone.View.extend({
            el: "body",

            events: {
                "click #sign-in-submit": "login"
            },
        
            initialize: function(options){
                this.router = options.router;
            },
                           
            render: function () {
                var that = this;
                this.$(".wrapper")
                .html(loginView)
                .append(footerView);

                return this;
            },

            login: function () {
                var that = this;
                $.ajax({
                    url: "/api/user/login/",
                    data: {"email": this.$el.find("#email").val(),
                           "password": this.$el.find("#password").val()},

                    success: function (text) {
                        var data = JSON.parse(text);
                        if (data && data.result != "error") {
                            that.router.navigate("", true);
                        } else {
                            that.$el.find("#result").html('Incorrect login or password');
                        }
                    },

                    error: function () {
                        that.$el.find("#result").html('An error occurred!');
                    }
                });
            }
        })
    }
);
