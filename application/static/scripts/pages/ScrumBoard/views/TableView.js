define(["text!pages/ScrumBoard/templates/Table.html",
	    "pages/ScrumBoard/collections/Tasks",
		"pages/ScrumBoard/views/RowView",
		"pages/ScrumBoard/models/Task"],
    function(table, Tasks, RowView, Task) {
        var tasks = new Tasks();

        return Backbone.View.extend({
            //tempate: _.template(table),
            el: "body",

            events: {
            	"click #add": "add",
            	"click .remove": "remove"

            },

            initialize: function(options){
            	tasks.on("add", this.renderRow, this);
            	tasks.fetch({
            		remove: false,
	        		success: function() {
	        		}
        		});
            },

            render: function() {
                this.$el.html(table);
                return this;
            },

            renderRow: function(model, collection) {
            	var rowView = new RowView({model: model});                
            	rowView.render();
            },
             
            add: function() {
                var task = new Task();
                task.set("name", this.$("input[name='name']").val());
	        	task.set("description", this.$("textarea[name='description']").val());
	        	task.set("status", this.$("select[name='status']").val());
	        	task.set("sprint", this.$("input[name='sprint']").val());
	        	task.save();
            },

            remove: function(event) {
                var $removeButton = $(event.currentTarget);
                var taskId = $removeButton.attr('id');
                var targetTask = tasks.findWhere({_id: parseInt(taskId, 10)});
                targetTask.destroy();
            }
        })
    }
);
