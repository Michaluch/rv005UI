define(["text!pages/ScrumBoard/templates/TaskBoardView.html",
        "pages/ScrumBoard/collections/Tasks",
        "pages/ScrumBoard/models/Task",
        "pages/ScrumBoard/views/IssueView"],

	function(taskBoardTemplate, Tasks, Task, IssueView){
        return some = Backbone.View.extend({      
            template: _.template(taskBoardTemplate), 

            initialize: function(options){
            },

            render: function() {
                var tasks = new Tasks();
                tasks.fetch({
                    success: function (data, response, options) {
                        for (var i = 0; i < data.length; i++) {
                            var issue = new IssueView({model: data.at(i)});
                            this.$('.todo').append(issue.render().el);
                        }
                    },
                });
            
                this.$el.html('');
                return this;
			}
        });
    }
);	
