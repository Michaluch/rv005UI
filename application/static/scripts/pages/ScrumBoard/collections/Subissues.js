define(["pages/ScrumBoard/models/Subissue"], 
	function(Subissue) {
	    return Backbone.Collection.extend({
		    model : Subissue,
		    url : "/api/subissues",
	    });
    }
)
