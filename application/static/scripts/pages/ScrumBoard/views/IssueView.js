define(["text!pages/ScrumBoard/templates/IssueView.html"],

    function(issueView) {
        return Backbone.View.extend({
            template: _.template(issueView),

            events: {
                "click .plus" : "open",
                "click .minus" : "close"
                
            },
        
            initialize: function(options){
            },
                           
            render: function () {
                this.$el.html(this.template({name: this.model.get("name"),
                                             issueId: this.model.id,
                                             description: this.model.get("description"),
                                             kind: this.model.get("kind"),
                                             sprint: this.model.get("sprint"),
                                             estimate: this.model.get("estimate"),
                                             status: this.model.get("status")}));
                return this;
            },

            equalColumns: function () {
                var tallestColumn = 0;
                $(".sprint .column").height('100%');
                _.each($(".sprint .column"), function(column) {
                    var $currentHeight = $(column).height();
                    if ($currentHeight > tallestColumn) {
                        tallestColumn = $currentHeight;
                    }
                });
                $(".sprint .column").height(tallestColumn);
            },

            open: function () {
                this.$(".plus").addClass("lock");
                this.$(".minus").removeClass("lock");
                this.$(".addSubissue").removeClass("lock");
                this.equalColumns();
            },

            close: function () {
                this.$(".minus").addClass("lock");
                this.$(".plus").removeClass("lock");
                this.$(".addSubissue").addClass("lock");
                this.equalColumns();
            }
            
        });
    }
);

