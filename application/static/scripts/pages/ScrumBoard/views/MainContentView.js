define(function() {

	return Backbone.View.extend({
		initialize: function(options) {
		},
		
		render: function() {	    
			$("<div>").text("Main content").appendTo(document.body);
			return this;
		}
	});

});
