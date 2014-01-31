define(function() {

	return Backbone.View.extend({
		initialize: function(options) {
		},
		
		render: function() {
			$("<div>").text("Footer View").appendTo(document.body);
			return this;
		}
	});

});
