define(["text!pages/ScrumBoard/templates/BacklogView.html",
        "pages/ScrumBoard/collections/Issues",
        /*"pages/ScrumBoard/models/Issue",*/
        "pages/ScrumBoard/views/IssueView"], 
    function(backlogView, Issues, /*Issue,*/ IssueView) {
        return Backbone.View.extend({
            initialize: function(options) {
                this.issues = new Issues ();
            },

            template : _.template(backlogView),

            render: function () {
                this.$el.html(this.template({sprint : 2}));
                this.issues.fetch({
                    success: function (collection, response, options) {
                        collection.each(function(model) {
                            var issueView = new IssueView({
                                model : model,
                                mode : "backlog"
                            });
                                issueView.$el.draggable({
                                    revert : "invalid",
                                    opacity : 0.75,
                                    zIndex : 100,
                                    containment : ".content",
                                    cursor : "move"
                                });
                            issueView.render();
                            this.$("#product-backlog").append(issueView.el);
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