define(["text!pages/ScrumBoard/templates/SubissueView.html"], 
    function(subissueView) {
        return Backbone.View.extend({
            template: _.template(subissueView),

            events: {
                "click .image-edit": "edit",
                "click .image-delete": "delete"
            },

            initialize: function(options) {
                this.editDialog = options.editDialog;
                this.deleteDialog = options.deleteDialog;
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
                /*console.log("subissueView - render()");*/
                return this;
            },

            edit: function (e) {
                e.stopPropagation();
                var that = this;

                var kind = this.model.get("kind").substr(3) || "no type";
                var estimate = this.model.get("estimate") || "no estimate";
                var assign_to = this.model.get("assign_to") || "not assigned";

                var data = {
                        name : this.model.get("name"),
                        description : this.model.get("description"),
                        kind : kind,
                        estimate : estimate,
                        assign_to : assign_to
                    }
                this.editDialog.show({
                    data : data,
                    onEdit: function(e) {
                        var editedData = that.editDialog.editedData();
                        that.model.set("name", editedData.name);
                        that.model.set("description", editedData.description);
                        that.model.set("kind", editedData.kind);
                        that.model.set("estimate", editedData.estimate);
                        that.model.set("assign_to", editedData.assign_to);
                        that.model.save();
                    }
                })
            },

            delete: function(e) {
                e.stopPropagation();
                var that = this;
                this.deleteDialog.show({
                    onDelete: function(e) {
                        that.model.set("status", "removed");
                        that.model.save();
                        that.trigger("subissue-removed", { subissueView : that });
                    }
                });
            }
        });
    }
);
