define(["pages/ScrumBoard/models/Subissue"], 
	function(Subissue) {
	    return Backbone.Collection.extend({
		    model : Subissue,
		    url : "/api/backlog/get_backlogs/",
		    parse: function(response) {
                return response.data;
            }
	    });
    }
)
