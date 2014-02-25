define(["text!pages/ScrumBoard/templates/DialogView.html"], 
    function(dialogView) {
        return Backbone.View.extend({
            template: _.template(dialogView),

        /*    events: {
                "click .save": "save",
                "click .select-title": "drop"
            }, */

            initialize: function(options) {

            },


            render: function () {
                var that = this;
                this.$el.html(this.template({}));
                this.$("#dialog").dialog({
                    minWidth : 500,
                    modal: true,
                    height: "auto",
                    autoOpen : false,
                    open: function( event, ui ) {
                        var $dialog = $(event.target);
                        var id = $dialog.data('edit-id');
                        that.subissue = that.collection.findWhere({"_id": id});
                    }
                });
                $("#dialog .save").on("click",
                    function() {
                        that.save();
                    });
                $("#dialog .select-title").on("click",
                    function(event) {
                        that.drop(event);
                    });
                return this;
            },

            save: function() {
                this.subissue.set("description", $("form.edit textarea").val());
                this.subissue.set("kind", $("input[name=type]").val());
                this.subissue.set("estimate", $("input[name=estimate]").val());
                this.subissue.set("assign_to", $("input[name=member]").val());
                this.subissue.save();

                this.$(".select-title").each(function() {
                    var defaultTitle = $(this).prev().val();
                    if (defaultTitle) {
                        $(this).text(defaultTitle);
                    }
                });
                $("form.edit textarea").val("");
                $( "#dialog" ).dialog( "close" );
            },

            drop: function(event) {
                event.preventDefault();

                var $selectTitle = $(event.currentTarget);
                var selectDiv = $(event.currentTarget).parent();
                var ulDrop = selectDiv.find(".drop");
                if ( ulDrop.is(":hidden") ) {
                    ulDrop.slideDown();
                    $selectTitle.addClass("active");

                    $(selectDiv).find("input").val($selectTitle.text());
                } else {
                    var selected = $(event.currentTarget).html();
                    ulDrop.slideUp();
                    $selectTitle.removeClass("active").html(selected);
                }

                ulDrop.find("li").click(function(event){
                    var selected = $(event.currentTarget).html();
                    selectDiv.find(".select-input").val($(selected).text());
                    ulDrop.slideUp();
                    $selectTitle.removeClass("active").html(selected);

                    return false;
                })

                return false;
            }
        })
});