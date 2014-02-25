define(["text!pages/ScrumBoard/templates/TaskBoardView.html",
        "pages/ScrumBoard/collections/Issues",
        "pages/ScrumBoard/models/Issue",
        "pages/ScrumBoard/views/IssueView",
        "pages/ScrumBoard/collections/Subissues",
        "pages/ScrumBoard/models/Subissue",
        "pages/ScrumBoard/views/SubissueView",
        "pages/ScrumBoard/views/DialogView"],

	function(taskBoardTemplate, Issues, Issue, IssueView, Subissues, Subissue, SubissueView, DialogView){
        return Backbone.View.extend({ 

            initialize: function(options){
                this.issues = new Issues();
                this.subissues = new Subissues();
                this.filteredSub = {}; /* the key = issue.id
                                          the value = array of subissues 
                                          in which field parent = issue.id */
                
            },

            render: function() {
                var that = this;
                this.$el.html(taskBoardTemplate);
                this.issues.fetch({
                    success: function (collection, response, options) {
                        //debugger;
                        that.subissues.fetch({
                            success: function(data, response, options) {
                                collection.each(function(model) {
                                    that.filteredSub[model.id] = data.where({"parent": model.id});
                                });
                                that.renderAll();
                            }
                        });
                    }    
                });

                        
                return this;
			},

			renderAll: function() {
                //debugger;
			    this.issues.each(function(issue) {
                    if ( issue.get("kind") == "story" &&
                         !_.isEmpty(this.filteredSub[issue.id]) &&
                         _.every(this.filteredSub[issue.id], function(subissue) {
                            return subissue.get("status") == "done"
                         })) {
                        issue.set("status", "done");
                        issue.save();
                    }

			        var issueView = new IssueView({
			            model: issue
		            });
                    issueView.render();

                    if (issue.get("status") == "to do") {
                        this.$(".todo").append(issueView.el);
                    }
                    if (issue.get("status") == "doing") {
                        this.$(".doing").append(issueView.el);
                    }
                    if (issue.get("status") == "done") {
                        this.$(".done").append(issueView.el);
                    }
                    _.each(this.filteredSub[issue.id], function(subissue){
                        var subissueView = new SubissueView({
                            model: subissue
                        });
                        subissueView.render();
                        if (subissue.get("status") == "to do") {
                            this.$(".todo .subissueWrapper[data-issue-id="+issue.id+"]").append(subissueView.el);
                        }
                        if (subissue.get("status") == "doing") {
                            this.$(".doing").append(subissueView.el);
                        }
                        if (subissue.get("status") == "done") {
                            this.$(".done").append(subissueView.el);
                        }
                    }, this);
			    }, this);
                var dialogView = new DialogView({
                    collection: Subissues
                });
                dialogView.render();
                dialogView.createDialog();
                
			},


        });
    }
);	
