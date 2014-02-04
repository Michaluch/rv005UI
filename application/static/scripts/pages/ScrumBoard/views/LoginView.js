define(["text!pages/ScrumBoard/templates/LoginView.html"], 
    function(loginView) {

        return Backbone.View.extend({
            el: "body",
        
            initialize: function(options){
            },
                           
            render: function () {
                this.$el.find(".wrapper")
                .html(loginView);

                return this;
            }
        })

});

