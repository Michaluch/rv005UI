define(["text!pages/ScrumBoard/templates/DialogView.html"], 
    function(dialogView) {
        return Backbone.View.extend({
        	template: _.template(dialogView),

        	initialize: function(options) {

        	},

        	render: function () {
        		this.$el.html(this.template({}));
        		return this;
        	},

        	createDialog : function() {
                $("#dialog").dialog({
                    dialogClass: "dialog-class",
                    minWidth: 500,
                    show: "clip",
                    hide: "clip",
                    modal: true,
                    autoOpen: false
                });

                

                $("#dialog .save").on("click", function() {
                    console.log("Save button is clicked");
                });
            },

        })
});