define(["text!pages/ScrumBoard/templates/FooterView.html"],
 
    function(footerView) {
        return Backbone.View.extend({
	          initialize: function(options){
            },

            tagName : "div",

            attributes : {
                id : "footer"
            },

            render: function() {
                this.$el.html(footerView);
                return this;
            }
        })
    }
);
