define(["pages/ScrumBoard/models/Issue"], 
	function(Issue) {
	    return Backbone.Collection.extend({
		    model : Issue,
		    url : "/api/issues/"
	    });
    }
)
