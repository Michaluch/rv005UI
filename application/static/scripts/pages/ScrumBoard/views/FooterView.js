define(["text!pages/ScrumBoard/templates/FooterView.html"],
 
    function(footerView) {
        return Backbone.View.extend({
	          initialize: function(options){
            },

            render: function() {
                this.$el.html(footerView);
                return this;
            }
        })
    }
);
