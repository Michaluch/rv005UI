define(["text!pages/ScrumBoard/templates/DeleteSubissueView.html"], 
    function(deleteSubissueView) {
        return Backbone.View.extend({
            template: _.template(deleteSubissueView),

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
                    height: 200,
                    show: "clip",
                    hide: "clip",
                    buttons: [{
                        text : "Delete",
                        "class" : "button",
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
                        "class" : "button",
                        click : function() {
                            that.onDelete = undefined;
                            that.$dialog.dialog( "close" );
                        }
                    }],
                    beforeClose: function() {
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