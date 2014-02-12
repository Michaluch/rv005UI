define(["pages/ScrumBoard/models/Task"], 
	function(Task) {
	    return Backbone.Collection.extend({
		    model : Task,
		    url : "/api/issues/",
		    parse: function(response) {
                return response.data;
            }
	    });
    }
)
