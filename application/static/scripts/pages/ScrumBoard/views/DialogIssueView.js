define(["text!pages/ScrumBoard/templates/DialogIssueView.html"], 
    function(dialogIssueView) {
        return Backbone.View.extend({
            template: _.template(dialogIssueView),

        /*    events: {
                "click .save": "save",
                "click .select-title": "drop"
            }, */

            initialize: function(options) {

            },


            render: function () {
                var that = this;
                this.$el.html(this.template({}));
                this.$("#dialog-issue").dialog({
                    minWidth : 500,
                    show: "clip",
                    hide: "clip",
                    modal: true,
                    height: "auto",
                    autoOpen : false,
                    open: function( event, ui ) {
                        var $dialog = $(event.target);
                        var id = $dialog.data('edit-id');
                        that.issue = that.collection.findWhere({"_id": id});
                    }
                });
                $("#dialog-issue .save").on("click",
                    function() {
                        that.save();
                    });
                $("#dialog-issue .select-title").on("click",
                    function(event) {
                        that.drop(event);
                    });
                return this;
            },

            save: function() {
                this.issue.set("description", $("form.edit textarea").val());
                this.issue.set("kind", $("input[name=type]").val());
                this.issue.set("estimate", $("input[name=estimate]").val());
                this.issue.set("assign_to", $("input[name=member]").val());
                this.issue.save();

                $("#dialog-issue .select-title").each(function() {
                    var defaultTitle = $(this).prev().val();
                    if (defaultTitle) {
                        $(this).text(defaultTitle);
                    }
                });

                $("form.edit textarea").val("");
                $( "#dialog-issue" ).dialog( "close" );
            },

            drop: function(event) {
                event.preventDefault();

                var $selectTitle = $(event.currentTarget);
                var selectDiv = $selectTitle.parent();
                var ulDrop = $(selectDiv).find(".drop");
                if ( ulDrop.is(":hidden") ) {
                    ulDrop.slideDown();
                    $selectTitle.addClass("active");

                    $(selectDiv).find("input").val($selectTitle.text());
                } else {
                    var selected = $selectTitle.html();
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