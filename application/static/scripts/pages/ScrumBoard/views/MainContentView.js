define(["pages/ScrumBoard/views/TaskBoardView", 
        "text!pages/ScrumBoard/templates/MainContentView.html"],
    function(TaskBoardView, mainContent) {

        return Backbone.View.extend({
            initialize: function(options){
            },

            render: function() {
                this.$el.html(mainContent);

                var taskBoardView = new TaskBoardView();
                taskBoardView.render();

                this.$el.find(".backlog, .doing, .done").append(taskBoardView.el);

                return this;
            }
        
        })
        
});

