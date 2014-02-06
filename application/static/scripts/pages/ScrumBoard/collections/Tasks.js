define(["pages/ScrumBoard/models/Task"], 
	function(Task) {
	    return Backbone.Collection.extend({
		    model : Task,
		    url : "/api/backlog/get_backlogs/",
		    parse: function(response) {
                return response.data;
            }
	    });
    }
)
