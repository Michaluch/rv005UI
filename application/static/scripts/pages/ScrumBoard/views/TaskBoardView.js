define(["text!pages/ScrumBoard/templates/TaskBoardView.html"],
	function(taskBoardTemplate){

        return Backbone.View.extend({
            template: _.template(taskBoardTemplate), 

            initialize: function(options){
            },

            render: function() {
                this.$el.html(this.template({issueText:["Issue1", "Issue2", "Issue3"], subIssueText:["SubIssue1", "SubIssue2"], count:3, subcount:2}));
                return this;
			}
        });

});	

