define(["text!pages/ScrumBoard/templates/ProfileView.html",
        "text!pages/ScrumBoard/templates/FooterView.html"], 
    function(profileView, footerView) {

        return Backbone.View.extend({
            el: "body",
        
            initialize: function(options){
            },
                           
            render: function () {
                this.$(".wrapper")
                .html(profileView)
                .append(footerView);

                return this;
            }
        })

});

