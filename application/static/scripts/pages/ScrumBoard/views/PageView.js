define(["pages/ScrumBoard/views/HeaderView", "pages/ScrumBoard/views/MainContentView", "pages/ScrumBoard/views/FooterView"], function(HeaderView, MainContentView, FooterView) {

	return Backbone.View.extend({
		initialize: function(options) {
		},
		
		render: function() {	
		    var headerView = new HeaderView();
		    headerView.render();
		    
		    var mainContentView = new MainContentView();
		    mainContentView.render();
		    
		    var footerView = new FooterView();
		    footerView.render();
		}
	});

});
