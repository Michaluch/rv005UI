define(function() {

	return Backbone.View.extend({
		initialize: function(options) {
		},
		
		render: function() {
			$("<div>").text("Header View").appendTo(document.body);
			return this;
		}
	});

});
