define(["pages/ScrumBoard/views/TaskBoardView"], function(TaskBoardView) {

	return Backbone.View.extend({
		initialize: function(options) {
		},
		
		render: function() {	    
			$("<div>").text("Main content").appendTo(document.body);
			
			var taskBoardView = new TaskBoardView();
			taskBoardView.render();
			
			return this;
		}
	});

});
