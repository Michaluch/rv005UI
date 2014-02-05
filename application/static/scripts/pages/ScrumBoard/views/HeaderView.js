define(["text!pages/ScrumBoard/templates/HeaderView.html"], 
    function(headerView) {
        return Backbone.View.extend({
            className: "wrapper",

            initialize: function(options){
            },
                           
            render: function () {
                this.$el.html(headerView);
                return this;
            }
        })

});

