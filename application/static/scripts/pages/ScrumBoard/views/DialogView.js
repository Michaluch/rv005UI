define(["text!pages/ScrumBoard/templates/DialogView.html"], 
    function(dialogView) {
        return Backbone.View.extend({
            template: _.template(dialogView),

            initialize: function(options) {

            },

            render: function () {
                var that = this;
                this.$el.html(this.template({}));
                this.$dialog = this.$("#dialog-edit").dialog({
                    modal: true,
                    autoOpen : false,
                    resizable : false,
                    draggable : false,
                    minWidth : 650,
                    height: "auto",
                    show: "clip",
                    hide: "clip",
                    buttons : [
                        {
                        text : "Save",
                        "class" : "button",
                        click : function () {
                             if (typeof(that.onEdit) === "function") {
                                that.onEdit();
                                that.onEdit = undefined;
                                that.checkHidden();
                            }
                            that.$dialog.dialog("close");
                          },
                        },
                        {
                        text : "Cancel",
                        "class" : "button",
                        click : function () {
                                that.onEdit = undefined;
                                that.checkHidden();
                                that.$dialog.dialog( "close" );
                            }
                        }
                    ],
                    beforeClose: function() {
                        that.onEdit = undefined;
                        that.checkHidden();
                    }
                });
                $("#dialog-edit .slct").on("click",
                    function(e) {
                        that.drop(e);
                    });
                return this;
            },

            show : function (params) {
                this.$dialog.dialog( "open");
                this.onEdit = params.onEdit;
            },

            editedData : function () {
                var data = {
                    name: this.$(".edit-name").val(),
                    description: this.$(".edit-description").val(),
                    kind: "sub" + this.$(".select-type .slct").text(),
                    estimate: this.$(".select-estimate .slct").text(),
                    assign_to: this.$(".select-member .slct").text()
                };
                return data;
            },

            drop: function(e) {
                var $slct = $(e.currentTarget);
                var dropBlock = $slct.parent().find(".drop");

                if ( dropBlock.is(":hidden") ) {
                    dropBlock.slideDown();
                    $slct.addClass("active");

                    dropBlock.find("li").click(function() {
                        var selectResult = $(this).html();
                        $(this).parent().parent().find(".slct").removeClass("active").html(selectResult);
                        dropBlock.slideUp();
                    });
                } else {
                    $slct.removeClass("active");
                    dropBlock.slideUp();
                } 
                return false;
            },

            checkHidden: function () {
                _.each($(".drop"), function(dropBlock) {
                if (!$(dropBlock).is(":hidden")) {
                    $(dropBlock).slideUp();
                    $(dropBlock).prev().removeClass("active");
                }
            })
            }


        })
    }
);
