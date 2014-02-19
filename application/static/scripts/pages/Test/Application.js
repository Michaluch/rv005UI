define(["pages/ScrumBoard/models/Issue", "pages/ScrumBoard/collections/Issues"],         
    function(Issue, Issues) {
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

        <div issue>
            <div subisues>
                <div subisues>
                </div>
            </div>
        </dib>

        _private.createNewIssue = function() {
                
        	var issue = new Issue();
        	issue.set("name", "one more new issue");
        	issue.set("description", "one more new description");
        	issue.set("status", "doing");
        	issue.set("sprint", 6);
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
                    issue.set("status", "new status");
                    alert("Issue has been updated");
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

        _public.start = function() {
            _private.deleteIssue(49);
        };

        return _public;
    }
);
