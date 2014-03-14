define(["text!pages/ScrumBoard/templates/HeaderView.html"], 
    function(headerView) {
        return Backbone.View.extend({
            
            tagName: "div",
            
            attributes: {
                id: "header"
            },
        
            initialize: function(options){
            },
                           
            render: function () {
                this.$el.html(headerView);
                return this;
            }
        })

});

