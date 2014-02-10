define(["pages/ScrumBoard/views/TaskBoardView", 
        "text!pages/ScrumBoard/templates/MainContentView.html"],

    function(TaskBoardView, mainContent) {
        return Backbone.View.extend({
            className: "content",

            initialize: function(options){
            },

            render: function() {
                this.$el.html(mainContent);

                var taskBoardView = new TaskBoardView();
                taskBoardView.render();

                this.$(".todo").append(taskBoardView.el);

                return this;
            }
        })
    }
);

