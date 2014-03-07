define(["text!pages/ScrumBoard/templates/DialogDeleteView.html"], 
    function(dialogDeleteView) {
        return Backbone.View.extend({
            template: _.template(dialogDeleteView),

        /*    events: {
                "click .save": "save",
                "click .select-title": "drop"
            }, */

            initialize: function(options) {
                
            },


            render: function () {
                var that = this;
                this.$el.html(this.template({}));
                this.$dialog = this.$("#dialog-delete").dialog({
                    minWidth : 500,
                    show: "clip",
                    hide: "clip",
                    modal: true,
                    height: "auto",
                    autoOpen : false,
                    buttons: {
                        "Delete": function() {
                            if (typeof(that.onDelete) === "function") {
                                that.onDelete();    
                                that.onDelete = undefined;
                            }
                            that.$dialog.dialog("close");
                        },
                        Cancel: function() {
                            that.onDelete = undefined;
                          $( this ).dialog( "close" );
                        }
                    },
                    close: function() {
                        console.log("Delete subissue dialog closed");
                        that.onDelete = undefined;
                    }
                    /*open: function( event, ui ) {
                        var $dialog = $(event.target);
                        var id = $dialog.data('edit-id');
                        that.subissue = that.collection.findWhere({"_id": id});
                        that.view = $dialog.data('view');
                    }*/
                });
                return this;
            },

            show: function(params) {
                this.$dialog.dialog("open");
                this.onDelete = params.onDelete;
            }

            /*delete: function () {
                this.trigger("subissue-deleted", { subissue: this.subissue });
                /*this.subissue.set("status", "removed");
                this.subissue.save();
                this.view.remove();
                $("#dialog-delete").dialog( "close" );
            }*/
        });
    }
);