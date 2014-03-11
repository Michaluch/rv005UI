define(["text!pages/ScrumBoard/templates/DialogDeleteIssueView.html"], 
    function(dialogDeleteIssueView) {
        return Backbone.View.extend({
            template: _.template(dialogDeleteIssueView),

            initialize: function(options) {
                
            },

            render: function () {
                var that = this;
                this.$el.html(this.template);
                this.$dialog = this.$("#dialog-delete-issue").dialog({
                    modal : true,
                    autoOpen : false,
                    resizable: false,
                    minWidth : 400,
                    height : "auto",
                    show : "clip",
                    hide : "clip",
                    buttons : {
                        "Delete": function () {
                            if (typeof(that.onDelete) === "function") {
                                that.onDelete();
                                that.onDelete = undefined;
                            }
                            that.$dialog.dialog( "close");
                        },
                        Cancel: function () {
                            that.onDelete = undefined;
                            that.$dialog.dialog( "close");
                        }
                    },
                    close: function() {
                        that.onDelete = undefined;
                    }
                });
                return this;
            },

            show: function(params) {
                this.$dialog.dialog("open");
                this.onDelete = params.onDelete;
            }

          
        });
    }
);