define(["text!pages/ScrumBoard/templates/TaskBoardView.html",
        "pages/ScrumBoard/collections/Tasks",
        "pages/ScrumBoard/models/Task",
        "pages/ScrumBoard/views/IssueView",
        "pages/ScrumBoard/collections/Subissues",
        "pages/ScrumBoard/models/Subissue",
        "pages/ScrumBoard/views/SubissueView"],

	function(taskBoardTemplate, Tasks, Task, IssueView, Subissues, Subissue, SubissueView){

        return some = Backbone.View.extend({ 
            name: "TaskBoardView",

            template: _.template(taskBoardTemplate), 

            initialize: function(options){
                this.tasks = new Tasks();
                this.subissues = new Subissues();
            },

            render: function() {
                var that = this;

                this.$el.html('');

                that.tasks.fetch({
                    success: function (data, response, options) {
                        that.renderTasks();
                        that.subissues.fetch({
                            success: function(collection, response, options) {
                                that.renderSubissues();
                            }
                        });
                    }
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

			},

            renderSubissues: function() {
                this.subissues.each(function(subissue) {
                    var subissueView = new SubissueView({
                        model: subissue
                    });
                    this.$el.append(subissueView.render().el);
                }, this);
            }
        });

    }
);	
