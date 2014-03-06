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
                this.$("#dialog-delete").dialog({
                    minWidth : 500,
                    show: "clip",
                    hide: "clip",
                    modal: true,
                    height: "auto",
                    autoOpen : false,
                    buttons: {
                        "Delete": function() {
                            that.delete();
                        },
                        Cancel: function() {
                          $( this ).dialog( "close" );
                        }
                    },
                    open: function( event, ui ) {
                        var $dialog = $(event.target);
                        var id = $dialog.data('edit-id');
                        that.subissue = that.collection.findWhere({"_id": id});
                        that.view = $dialog.data('view');
                    }
                });
                return this;
            },

            delete: function () {
                this.subissue.set("status", "removed");
                this.subissue.save();
                this.view.remove();
                $("#dialog-delete").dialog( "close" );
            }
        });
    }
);