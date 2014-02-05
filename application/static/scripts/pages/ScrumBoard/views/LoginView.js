define(["text!pages/ScrumBoard/templates/LoginView.html",
        "text!pages/ScrumBoard/templates/FooterView.html"], 
    function(loginView, footerView) {

        return Backbone.View.extend({
            el: "body",
        
            initialize: function(options){
            },
                           
            render: function () {
                this.$(".wrapper")
                .html(loginView)
                .append(footerView);

                return this;
            }
        })

});

