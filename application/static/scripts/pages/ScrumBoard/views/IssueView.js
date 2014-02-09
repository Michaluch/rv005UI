define(["text!pages/ScrumBoard/templates/IssueView.html",
        "pages/ScrumBoard/views/SubissueView"],

    function(issueView, SubissueView) {
        return Backbone.View.extend({
            template: _.template(issueView), 
        
            initialize: function(options){
            },
                           
            render: function () {
                this.$el.html(this.template({name: this.model.get('name')}));
                var subissue = new SubissueView();
                this.$el.append(subissue.render().el);
                return this;
            }
        });
    }
);

