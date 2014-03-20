define(["pages/ScrumBoard/views/TaskBoardView",
        "pages/ScrumBoard/views/BacklogView", 
        "text!pages/ScrumBoard/templates/MainContentView.html",
        "pages/ScrumBoard/Mediator"],

    function(TaskBoardView, BacklogView, mainContent, mediator) {
        return Backbone.View.extend({
            className: "content",

            events : {
                "click #backlog" : "showBacklog",
                "click #task-board" : "showTaskBoard",
                "click #filter .slct" : "drop"
            },

            initialize: function(options){
            },

            render: function() {
                this.$el.html(mainContent);

                var taskBoardView = new TaskBoardView();
                taskBoardView.render();
                this.$(".sprint").html(taskBoardView.el);

                var backlogView = new BacklogView();
                backlogView.render();
                this.$(".work").html(backlogView.el);

                return this;
            },

            showBacklog : function () {
                this.$(".work").removeClass("lock");
                this.$(".sprint").addClass("lock");
            },

            showTaskBoard : function () {
                this.$(".sprint").removeClass("lock");
                this.$(".work").addClass("lock");
            },

            drop : function (e) {
                var $slct = $(e.currentTarget);
                var dropBlock = $slct.parent().find(".drop");

          /*      $("#filter #overlay").removeClass("lock");*/

                if ( dropBlock.is(":hidden") ) {
                    dropBlock.slideDown();
                    $slct.addClass("active");

                    dropBlock.find("li").click(function() {
                        var selectResult = $(this).html();
                        mediator.trigger("sprint-selected", selectResult);
                        $(this).parent().parent().find(".slct").removeClass("active").html(selectResult);
                        dropBlock.slideUp();
                    });
                } else {
                    $slct.removeClass("active");
                    dropBlock.slideUp();
                } 
                return false;
            }
        })
    }
);

