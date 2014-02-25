define(["text!pages/ScrumBoard/templates/SubissueView.html"], 
    function(subissueView) {
        return Backbone.View.extend({
            template: _.template(subissueView),

            events: {
                "click .image-edit": "edit"
            },

            initialize: function(options) {
                options.model.on("change", this.render, this);
                
            },

            render: function() {
                this.$el.html(this.template({name: this.model.get("name"),
                                             description: this.model.get("description"),
                                             estimate: this.model.get("estimate"),
                                             parent: this.model.get("parent")}));
                return this;
            },

            edit: function() {
                $('#dialog').data('edit-id', this.model.id);
                $("#dialog").dialog( "open" );
            }
        });
    }
);
