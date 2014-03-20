define(["text!pages/ScrumBoard/templates/BacklogView.html",
        "pages/ScrumBoard/collections/Issues",
        /*"pages/ScrumBoard/models/Issue",*/
        "pages/ScrumBoard/views/IssueView",
        "pages/ScrumBoard/Mediator"], 
    function(backlogView, Issues, /*Issue,*/ IssueView, mediator) {
        return Backbone.View.extend({
            initialize: function(options) {
                this.issues = new Issues ();
                mediator.on("sprint-selected", function(sprint) {
                    this.$("#sprint-backlog").data("sprint", sprint);
                    this.render();
                }, this);
            },

            template : _.template(backlogView),

            render: function () {
                this.$el.html(this.template());

                this.issues.fetch({
                    success: function (collection, response, options) {
                        collection.each(function(model) {
                            var issueView = new IssueView({
                                model : model,
                                mode : "backlog"
                            });
                            
                            var onDropInIssue = function (event, ui) {
                                $(ui.helper).css({"top" : 0, "left" : "0"});
                                $(event.target).after(ui.draggable);
                            }
                                issueView.$el.draggable({
                                    revert : "invalid",
                                    opacity : 0.75,
                                    zIndex : 100,
                                    containment : ".content",
                                    cursor : "move"
                                }).droppable({
                    drop: onDropInIssue
                });;
                            issueView.render();
                            var issueSprint = issueView.model.get("sprint");
                            if ( issueSprint == 0) {
                                this.$("#product-backlog").append(issueView.el);
                            } else if (issueSprint == this.$("#sprint-backlog").data("sprint")) {
                                this.$("#sprint-backlog").append(issueView.el);
                            }
                        }, this);
                    }
                });

                

                var onDrop = function (event, ui) {
                    $(ui.helper).css({"top" : 0, "left" : "0"});
                    $(this).append(ui.draggable);
                }

                this.$(".column").droppable({
                    drop: onDrop
                });
                return this;
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