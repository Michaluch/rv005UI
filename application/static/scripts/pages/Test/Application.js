define(["pages/ScrumBoard/models/Issue", "pages/ScrumBoard/collections/Issues",
        "pages/ScrumBoard/models/Subissue", "pages/ScrumBoard/collections/Subissues"],         
    function(Issue, Issues, Subissue, Subissues) {
        var _public = {};
        var _private = {};

        _private.testGetAll = function () {
        	_public.issues = new Issues();
        	_public.issues.fetch({
        		success: function() {
        			alert("Issues have been fetched");
        		}
        	});
        };

        _private.testGetById = function(id) {
    		var issue = new Issue();
    		issue.set("_id", id);
    		issue.fetch({
    			success: function() {
    				alert("Issue has been fetched: " + issue.get("name"));	
    			}
    		})
        };


        _private.createNewIssue = function() {
                
        	var issue = new Issue();
        	issue.set("name", "issue #1");
        	issue.set("description", "description for issue # 1");
        	issue.set("status", "to do");
        	issue.set("sprint", 6);
            issue.set("estimate", 5);
            issue.set("kind", "story");
        	issue.save();

        	setTimeout(function() {
    			alert("Created issue id: " + issue.id);
        	}, 10000)

        };

        _private.updateIssue = function(id) {
        	var issue = new Issue();
        	issue.set("_id", id);
    		issue.fetch({
    			success: function() {
					issue.set("name", issue.get("name") + " updated");
                    issue.set("description", "other description");
                    issue.set("status", "done");
                    issue.set("estimate", 27);
					issue.save({
						success: function() {
							alert("Issue has been updated"); //do not get here
						}
					});
    			}
    		});
    	};

    	_private.deleteIssue = function(id) {
    		var issue = new Issue();
        	issue.set("_id", id);
        	issue.destroy();
    	};


        _private.getAllSub = function () {
            _public.subissues = new Subissues();
            _public.subissues.fetch({
                success: function() {
                    alert("Subissues have been fetched");
                }
            })
        };

        _private.getSubById = function (id) {
            var subissue = new Subissue();
            subissue.set("_id", id);
            subissue.fetch({
                success: function() {
                    alert("Subissue with id " + id + " has been fetched: " + subissue.get("name"));
                }
            })
        }

        _private.createNewSub = function() {
            var subissue = new Subissue();
            subissue.set("name", "subissue #2");
            subissue.set("description", "this description");
            subissue.set("assign_to", 2);
            subissue.set("kind", "subbug"),
            subissue.set("status", "to do");
            subissue.set("estimate", 6);
            subissue.set("parent", 3);
            subissue.save();

            setTimeout(function(){
                alert("Subissue with id " + subissue.get("_id") + " has been created");
            }, 7000);
        }

        _private.updateSub = function(id) {
            var subissue = new Subissue();
            subissue.set("_id", id);
            subissue.fetch({
                success: function(){
                    subissue.set("name", subissue.get("name") + " updated");
                    subissue.set("description", "new description");
                    subissue.save();
                }
            });

        }

        _private.deleteSub = function(id) {
            var subissue = new Subissue();
            subissue.set("_id", id);
            subissue.destroy();
        }



        _public.start = function() {
            _private.deleteIssue(55);
        };

        return _public;
    }
);
