define(["text!pages/ScrumBoard/templates/TaskBoardView.html",
        "pages/ScrumBoard/collections/Issues",
        "pages/ScrumBoard/models/Issue",
        "pages/ScrumBoard/views/IssueView",
        "pages/ScrumBoard/collections/Subissues",
        "pages/ScrumBoard/models/Subissue",
        "pages/ScrumBoard/views/SubissueView"],

	function(taskBoardTemplate, Issues, Issue, IssueView, Subissues, Subissue, SubissueView){

        return Backbone.View.extend({ 
            name: "TaskBoardView",

            initialize: function(options){
                this.issues = new Issues();
                this.subissues = new Subissues();
                
            },

            render: function() {
                var that = this;

                this.$el.html("");

                that.issues.fetch({
                    success: function (collection, response, options) {
                        that.subissues.fetch({
                            success: function(data, response, options) {
                                collection.each(function(model) {
                                    that.filteredSub = new Subissues( that.subissues.where({parent: model.id}) );
                                });
                            }
                        });
                        that.renderAll();
                    }    
                });
                        
                return this;
			},

			renderAll: function() {
			    var that = this;
			    that.issues.each(function(issue) {
			        var issueView = new IssueView({
			            model: issue
		            });
                    that.$el.append(issueView.render().el);
                    that.filteredSub.each(function(subissue){
                        var subissueView = new SubissueView({
                            model: subissue
                        });
                        that.$el.append(subissueView.render().el);
                    })
			    });

			}

            
        });

    }
);	
