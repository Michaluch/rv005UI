define(["text!pages/ScrumBoard/templates/LoginView.html"], 
    function(loginView) {

        return Backbone.View.extend({
            className: "login",
        
            initialize: function(options){
            },
                           
            render: function () {
                this.$el.html(loginView);
                return this;
            }
        })

});

