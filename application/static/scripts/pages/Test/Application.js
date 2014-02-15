define(["pages/ScrumBoard/models/Task", "pages/ScrumBoard/collections/Tasks"],         
    function(Task, Tasks) {
        var _public = {};
        var _private = {};

        _private.testGetAll = function () {
        	_public.tasks = new Tasks();
        	_public.tasks.fetch({
        		success: function() {
        			alert("Tasks have been fetched");
        		}
        	});
        };

        _private.testGetById = function(id) {
    		var task = new Task();
    		task.set("_id", id);
    		task.fetch({
    			success: function() {
    				alert("Task has been fetched: " + task.get("name"));	
    			}
    		})
        };

        _private.createNewTask = function() {

        	var task = new Task();
        	task.set("name", "new task");
        	task.set("description", "new description");
        	task.set("status", "doing");
        	task.set("sprint", 5);
            task.set("kind", "story");
        	task.save();

        	setTimeout(function() {
    			alert("Created task id: " + task.id);
        	}, 10000)

        };

        _private.updateTask = function(id) {
        	var task = new Task();
        	task.set("_id", id);
    		task.fetch({
    			success: function() {
					task.set("name", task.get("name") + " updated");
                    task.set("description", "other description");
					task.save({
						success: function() {
							alert("Task has been updated");
						}
					});
    			}
    		});
    	};

    	_private.deleteTask = function(id) {
    		var task = new Task();
        	task.set("_id", id);
        	task.destroy();
    	};

        _public.start = function() {
            _private.testGetAll();
        };

        return _public;
    }
);
