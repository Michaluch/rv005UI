define(["pages/ScrumBoard/views/PageView"], function(PageView) {
	var _public = {};
	var _private = {};

	_public.start = function() {
		_private.pageView = new PageView();
		_private.pageView.render();
	};

	return _public;
});
