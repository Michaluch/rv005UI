define(["text!pages/ScrumBoard/templates/IssueView.html"],
    function(issueView) {
        return Backbone.View.extend({
            template: _.template(issueView),

            className: "issue-wrapper",

            events: {
                "click .plus" : "open",
                "click .minus" : "close",
                "click .image-edit" : "edit",
                "click .image-delete" : "delete"
                
            },
        
            initialize: function(options){
                this.editIssueDialog = options.editIssueDialog;
                this.deleteIssueDialog = options.deleteIssueDialog;
                this.model.on("change", this.render, this);
            },
                           
            render: function () {
                this.$el.html(this.template({name: this.model.get("name"),
                                             issueId: this.model.id,
                                             description: this.model.get("description"),
                                             kind: this.model.get("kind"),
                                             sprint: this.model.get("sprint"),
                                             estimate: this.model.get("estimate"),
                                             status: this.model.get("status")}));
                return this;
            },

            equalColumns: function () {
                var tallestColumn = 0;
                $(".sprint .column").height('100%');
                _.each($(".sprint .column"), function(column) {
                    var $currentHeight = $(column).height();
                    if ($currentHeight > tallestColumn) {
                        tallestColumn = $currentHeight;
                    }
                });
                $(".sprint .column").height(tallestColumn);
            },

            open: function () {
                this.$(".plus").addClass("lock");
                this.$(".minus").removeClass("lock");
                this.$(".addSubissue").removeClass("lock");
                this.$(".subissue-container").removeClass("lock");
                this.equalColumns();
            },

            close: function () {
                this.$(".minus").addClass("lock");
                this.$(".plus").removeClass("lock");
                this.$(".addSubissue").addClass("lock");
                this.$(".subissue-container").addClass("lock");
                this.equalColumns();
            },

            edit: function (e) {
                e.stopPropagation();
                var that = this;

                var kind = this.model.get("kind") || "no type";
                var estimate = this.model.get("estimate") || "no estimate";
                var assign_to = this.model.get("assign_to") || "not assigned";

                var data = {
                        name : this.model.get("name"),
                        description : this.model.get("description"),
                        kind : kind,
                        estimate : estimate,
                        assign_to : assign_to
                    }
                this.editIssueDialog.show({
                    data : data,
                    onEdit: function(e) {
                        var editedData = that.editIssueDialog.editedData();
                        that.model.set("name", editedData.name);
                        that.model.set("description", editedData.description);
                        that.model.set("kind", editedData.kind);
                        that.model.set("estimate", editedData.estimate);
                        that.model.set("assign_to", editedData.assign_to);
                        that.model.save();
                    }
                })
            },

            delete: function () {
                var that = this;
                this.deleteIssueDialog.show({
                    onDelete: function(e) {
                        that.model.set("status", "removed");
                        that.model.save();
                        that.trigger("issue-removed", { issueView : that });
                    }
                });
            }
            
        });
    }
);

