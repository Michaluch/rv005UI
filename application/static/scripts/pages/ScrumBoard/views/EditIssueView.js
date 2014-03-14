define(["text!pages/ScrumBoard/templates/EditView.html"], 
    function(editView) {
        return Backbone.View.extend({
            template: _.template(editView),

            initialize: function(options) {

            },

            render: function () {
                var that = this;
                this.$el.html(this.template({insert : "issue"}));
                this.$dialog = this.$("#dialog-edit").dialog({
                    modal: true,
                    autoOpen : false,
                    resizable : false,
                    draggable : false,
                    minWidth : 650,
              /*      minHeight: "auto",*/
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
                this.$dialog.find(".slct").on("click",
                    function(e) {
                        that.drop(e);
                    });
                return this;
            },

            show : function (params) {
                this.$dialog.dialog( "open");
                this.onEdit = params.onEdit;
                this.$dialog.find(".edit-name").val(params.data.name);
                this.$dialog.find(".edit-description").val(params.data.description);
                this.$dialog.find(".select-type .slct").text(params.data.kind);
                this.$dialog.find(".select-estimate .slct").text(params.data.estimate);
                this.$dialog.find(".select-member .slct").text(params.data.assign_to);
            },

            editedData : function () {
                var kind = this.$dialog.find(".select-type .slct").text();
                var estimate = this.$dialog.find(".select-estimate .slct").text();
                var assign_to = this.$dialog.find(".select-member .slct").text();
                var data = {
                    name: this.$dialog.find(".edit-name").val() ,
                    description: this.$dialog.find(".edit-description").val(),
                    kind: kind == "no type" ? "" : kind,
                    estimate: estimate == "no estimate" ? "" : estimate,
                    assign_to: assign_to == "not assigned" ? "" : assign_to 
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