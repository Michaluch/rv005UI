define(["text!pages/ScrumBoard/templates/DialogDeleteView.html"], 
    function(dialogDeleteView) {
        return Backbone.View.extend({
            template: _.template(dialogDeleteView),

            initialize: function(options) {
                
            },

            render: function () {
                var that = this;
                this.$el.html(this.template({}));
                this.$dialog = this.$("#dialog-delete").dialog({
                    modal: true,
                    autoOpen : false,
                    resizable : false,
                    draggable : false,
                    minWidth : 400,
                    height: "auto",
                    show: "clip",
                    hide: "clip",
                    buttons: [{
                        text : "Delete",
                        "class" : "my",
                        click: function() {
                            if (typeof(that.onDelete) === "function") {
                                that.onDelete();    
                                that.onDelete = undefined;
                            }
                            that.$dialog.dialog("close");
                        }
                    }, 
                    {
                        text : "Cancel",
                        "class" : "my",
                        click : function() {
                            that.onDelete = undefined;
                            that.$dialog.dialog( "close" );
                        }
                    }],
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