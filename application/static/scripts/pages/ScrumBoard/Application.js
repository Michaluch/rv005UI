define(["pages/ScrumBoard/routers/PageRouter"],         
    function(PageRouter) {
        var _public = {};
        var _private = {};

        _public.start = function() {
            _private.router = new PageRouter();
        };

        return _public;
    }
);
