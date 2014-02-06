define(["text!pages/ScrumBoard/templates/TaskBoardView.html",
        "pages/ScrumBoard/collections/Tasks",
        "pages/ScrumBoard/models/Task",
        "pages/ScrumBoard/views/IssueView"],

	function(taskBoardTemplate, Tasks, Task, IssueView){

        return some = Backbone.View.extend({      

            template: _.template(taskBoardTemplate), 

            initialize: function(options){
                this.tasks = new Tasks();
            },

            render: function() {
                var that = this;

                this.$el.html('');

                that.tasks.fetch({
                    success: function (data, response, options) {
                        that.renderTasks();                        
                    },
                });

                return this;
			},

			renderTasks: function() {
			    var that = this;
			    that.tasks.each(function(task) {
			        var issue = new IssueView({
			            model: task
		            });
                    that.$el.append(issue.render().el);
			    });

			}
        });

    }
);	
