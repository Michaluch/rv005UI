define(["text!pages/ScrumBoard/templates/SubissueView.html"], 
    function(subissueView) {
        return Backbone.View.extend({
            template: _.template(subissueView),

            events: {
                "click .image-edit": "edit",
                "click .image-delete": "delete"
            },

            initialize: function() {
                this.model.on("change", this.render, this);
            },

            render: function() {
                this.$el.html(this.template({_id: this.model.get("_id"),
                                             name: this.model.get("name"),
                                             status: this.model.get("status"),
                                             kind: this.model.get("kind"),
                                             description: this.model.get("description"),
                                             estimate: this.model.get("estimate"),
                                             parent: this.model.get("parent")})).draggable({
                                                                                    revert: "invalid"
                                                                                });                
                console.log("subissueView - render()");
                return this;
            },

            edit: function() {
                $('#dialog').data('edit-id', this.model.id);
                $("#dialog").dialog( "open" );
            },

            delete: function() {
                $("#dialog-delete").data("edit-id", this.model.id);
                $("#dialog-delete").data("view", this);
                $("#dialog-delete").dialog( "open" );
            }
        });
    }
);
