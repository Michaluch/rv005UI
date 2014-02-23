define(["text!pages/ScrumBoard/templates/IssueView.html"],

    function(issueView) {
        return Backbone.View.extend({
            template: _.template(issueView), 
        
            initialize: function(options){
            },
                           
            render: function () {
                this.$el.html(this.template({description: this.model.get("description"),
                                             estimate: this.model.get("estimate"),
                                             issueId: this.model.id,
                                             status: this.model.get("status")}));
                return this;
            }
        });
    }
);

