define(["pages/ScrumBoard/views/TaskBoardView",
        "pages/ScrumBoard/views/BacklogView", 
        "text!pages/ScrumBoard/templates/MainContentView.html"],

    function(TaskBoardView, BacklogView, mainContent) {
        return Backbone.View.extend({
            className: "content",

            events : {
                "click #backlog" : "showBacklog",
                "click #task-board" : "showTaskBoard"
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
            }
        })
    }
);

