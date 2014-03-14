define(["text!pages/ScrumBoard/templates/BacklogView.html",
        "pages/ScrumBoard/collections/Issues",
        /*"pages/ScrumBoard/models/Issue",*/
        "pages/ScrumBoard/views/IssueView"], 
    function(backlogView, Issues, /*Issue,*/ IssueView) {
        return Backbone.View.extend({
            initialize: function(options) {
                this.issues = new Issues ();
            },

            render: function () {
                this.$el.html(backlogView);
                this.issues.fetch({
                    success: function (collection, response, options) {
                        collection.each(function(model) {
                            var issueView = new IssueView({
                                model : model
                            });
                            issueView.render();
                            this.$("#product-backlog").append(issueView.el);
                        }, this);
                    }
                });
                return this;
            }

          
        });
    }
);