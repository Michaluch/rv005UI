define(["text!pages/ScrumBoard/templates/BacklogView.html",
        "pages/ScrumBoard/collections/Issues",
        "pages/ScrumBoard/models/Issue",
        "pages/ScrumBoard/views/IssueView",
        "pages/ScrumBoard/Mediator"], 
    function(backlogView, Issues, Issue, IssueView, mediator) {
        return Backbone.View.extend({
            initialize: function(options) {
                this.issues = new Issues ();
                mediator.on("sprint-selected", function(sprint) {
                    this.sprintSelected = sprint;
                    this.render();
                }, this);
                _.bindAll(this, "fetchSuccess", "setSprint", "onDrop", "onDropInIssue");
                this.issues.on("add", this.renderOne, this);

                this.editIssueView = new options.editIssue({collection : this.issues});
                this.editIssueView.render();
                this.deleteIssueView = new options.deleteIssue();
                this.deleteIssueView.render();
            },

            events : {
                "click #submit" : "add"
            },

            template : _.template(backlogView),


            render: function () {
                this.$el.html(this.template());

                this.$("#sprint-backlog").data("sprint", this.sprintSelected);

                this.issues.fetch({
                    success: this.fetchSuccess
                });

                this.$(".column").droppable({
                    drop: this.onDrop
                });
                return this;
            },

            add : function () {
                var issueParams = {
                    name : this.$("#add-issue input[type=text]").val(),
                    description : this.$("#add-issue textarea").val(),
                    sprint : 0,
                    status : "to do"
                };
                var issue = new Issue(issueParams);
                issue.save();
                this.issues.add(issue, {"addNew" : true});
            },

            onDrop : function (event, ui) {
                var $clone = $(ui.helper);
                $clone.css({"top" : 0, "left" : "0"});
                $target = $(event.target);
                if ( $target.attr("id") == "product-backlog" ) {
                    $target.find("#add-issue").before(ui.draggable);
                    this.setSprint($clone, event);
                } else if ( !(_.isUndefined($target.data("sprint"))) ) {
                    $target.append(ui.draggable);
                    this.setSprint($clone, event);
                }
                
            },

            onDropInIssue : function (event, ui) {
                var $clone = $(ui.helper);
                $clone.css({"top" : 0, "left" : "0"});
                $(event.target).after(ui.draggable);
                //this.setSprint($clone, event);

            },

            setSprint : function (clone, event) {
                var id = clone.find(".issue").data("issue-id");
                var issue = this.issues.get(id);
                var $target = $(event.target);
                sprint = parseInt($target.data("sprint"));
                issue.set("sprint", sprint);
                issue.save();
            },

            fetchSuccess : function (collection, response, options) {
                collection.each(function(model) {
                    var issueView = new IssueView({
                        model : model,
                        mode : "backlog",
                        deleteIssueDialog : this.deleteIssueView,
                        editIssueDialog : this.editIssueView
                    });
                    issueView.render();
                    issueView.on("issue-removed", this.onIssueRemoved, this);

                    var issueSprint = issueView.model.get("sprint");
                    if ( issueSprint == 0) {
                        this.$("#product-backlog #add-issue").before(issueView.el);
                    } else if (issueSprint == this.sprintSelected) {
                        this.$("#sprint-backlog").append(issueView.el);
                    }
                    
                    issueView.$el.draggable({
                        revert : "invalid",
                        opacity : 0.75,
                        zIndex : 100,
                        containment : ".content",
                        cursor : "move"
                    }).droppable({
                        drop: this.onDropInIssue
                    });;
                    
                }, this);
            },

            renderOne : function (model, collection, options) {
                if ( options.addNew ) {
                    var issueView = new IssueView({
                        model : model,
                        mode : "backlog"
                    });
                    issueView.render();
                    issueView.$el.draggable({
                        revert : "invalid",
                        opacity : 0.75,
                        zIndex : 100,
                        containment : ".content",
                        cursor : "move"
                    }).droppable({
                        drop: this.onDropInIssue
                    });;
                    this.$("#product-backlog #add-issue").before(issueView.el);
                }
            },

            onIssueRemoved: function(e) {
                e.issueView.remove();
                this.equalColumns();
            },

            equalColumns: function (selector) {
                              var tallestColumn = 0;
                              $(selector).height('100%');
                              _.each($(selector), function(column) {
                                  var $currentHeight = $(column).height();
                                  if ($currentHeight > tallestColumn) {
                                      tallestColumn = $currentHeight;
                                  }
                              });
                              $(selector).height(tallestColumn);
                          }

          
        });
    }
);