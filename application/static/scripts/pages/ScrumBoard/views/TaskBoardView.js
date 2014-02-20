define(["text!pages/ScrumBoard/templates/TaskBoardView.html",
        "pages/ScrumBoard/collections/Issues",
        "pages/ScrumBoard/models/Issue",
        "pages/ScrumBoard/views/IssueView",
        "pages/ScrumBoard/collections/Subissues",
        "pages/ScrumBoard/models/Subissue",
        "pages/ScrumBoard/views/SubissueView"],

	function(taskBoardTemplate, Issues, Issue, IssueView, Subissues, Subissue, SubissueView){

        return some = Backbone.View.extend({ 
            name: "TaskBoardView",

            template: _.template(taskBoardTemplate), 

            initialize: function(options){
                this.issues = new Issues();
                this.subissues = new Subissues();
            },

            render: function() {
                var that = this;

                this.$el.html('');

                that.issues.fetch({
                    success: function (data, response, options) {
                        that.renderIssues();
                        that.subissues.fetch({
                            success: function(collection, response, options) {
                                that.renderSubissues();
                            }
                        });
                    }
                });
                return this;
			},

			renderIssues: function() {
			    var that = this;
			    that.issues.each(function(issue) {
			        var issueView = new IssueView({
			            model: issue
		            });
                    that.$el.append(issueView.render().el);
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
