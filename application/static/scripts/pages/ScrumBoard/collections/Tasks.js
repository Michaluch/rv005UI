define([], 
	function() {
	    return Backbone.Collection.extend({
		    model : Task,
		    url : "/api/tasks/"
	    });
    }
)
