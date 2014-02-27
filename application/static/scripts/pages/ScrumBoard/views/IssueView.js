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

            open: function () {
                this.$(".plus").addClass("lock");
                this.$(".minus").removeClass("lock");
                this.$(".addSubissue").removeClass("lock");
            },

            close: function () {
                this.$(".minus").addClass("lock");
                this.$(".plus").removeClass("lock");
                this.$(".addSubissue").addClass("lock");
            }
            
        });
    }
);

