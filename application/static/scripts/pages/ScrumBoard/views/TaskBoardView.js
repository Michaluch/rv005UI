define(["text!pages/ScrumBoard/templates/TaskBoardView.html",
        "pages/ScrumBoard/collections/Issues",
        "pages/ScrumBoard/models/Issue",
        "pages/ScrumBoard/views/IssueView",
        "pages/ScrumBoard/collections/Subissues",
        "pages/ScrumBoard/models/Subissue",
        "pages/ScrumBoard/views/SubissueView",
        "pages/ScrumBoard/views/DialogView"],

    function(taskBoardTemplate, Issues, Issue, IssueView, Subissues, Subissue, SubissueView, DialogView){
        return Backbone.View.extend({ 

            initialize: function(options){
                this.issues = new Issues();
                this.subissues = new Subissues();
                this.filteredSub = {}; /* the key = issue.id
                                          the value = array of subissues 
                                          in which field parent = issue.id */
                
                this.subissues.on("add", this.renderOne, this);
            },

            events: {
                "click .add" : "add"
            },

            add: function (event) {
                var $currentTarget = $(event.currentTarget);
                var parent = $currentTarget.data("add-id");
                var param = {};
                var $name = $currentTarget.parent().find(".name");
                var $textarea = $currentTarget.parent().find("textarea");
                param["name"] = $name.val();
                $name.val("");
                param["description"] = $textarea.val();
                $textarea.val("");
                param["status"] = "to do";
                param["parent"] = parent;
                var subissue = new Subissue(param);
                this.subissues.add(subissue);
                this.$(".minus").addClass("lock");
                this.$(".plus").removeClass("lock");
                this.$(".addSubissue").addClass("lock");
            },

            render: function() {
                var that = this;
                this.issues.fetch({
                    success: function (collection, response, options) {
                        //debugger;
                        that.subissues.fetch({
                            success: function(data, response, options) {
                                collection.each(function(model) {
                                    that.filteredSub[model.id] = data.where({"parent": model.id});
                                });
                                that.renderAll();
                                that.equalColumns ($(".sprint .column"));
                            },
                        });
                    },
                });   
                return this;
            },

            renderAll: function() {
                this.$el.html(taskBoardTemplate);
                var subissues = this.subissues;
                function handleDrop(event, ui){
                    var clone = $(ui.helper);
                    clone.css("left", "0");
                    clone.css("top", "0");  

                    var id = clone.find('.subissue').attr("data-id");                    
                    var status = $(this).attr("data-status")

                    var sub = subissues.get(id);
                    sub.set("status", status);
                    sub.save();
                    console.log(sub);
                    

                    $(this).append(clone);
                }

                this.$el.find('.todo').droppable({
                    drop: handleDrop
                });
                this.$el.find('.doing').droppable({
                    drop: handleDrop
                });
                this.$el.find('.done').droppable({
                    drop: handleDrop
                });

                this.issues.each(function(issue) {
                    if ( issue.get("kind") == "story" &&
                         !_.isEmpty(this.filteredSub[issue.id]) &&
                         _.every(this.filteredSub[issue.id], function(subissue) {
                            return subissue.get("status") == "done"
                         })) {
                        issue.set("status", "done");
                        issue.save();
                    }

                    var issueView = new IssueView({
                        model: issue
                    });
                    issueView.render();

                    if (issue.get("status") == "to do") {
                        this.$(".todo").append(issueView.el);
                    }
                    if (issue.get("status") == "doing") {
                        this.$(".doing").append(issueView.el);
                    }
                    if (issue.get("status") == "done") {
                        this.$(".done").append(issueView.el);
                    }
                    _.each(this.filteredSub[issue.id], function(subissue){
                        var subissueView = new SubissueView({
                            model: subissue
                        });
                        subissueView.render();
                        if (subissue.get("status") == "to do") {
                            this.$(".todo").append(subissueView.el);
                        }
                        if (subissue.get("status") == "doing") {
                            this.$(".doing").append(subissueView.el);

                        }
                        if (subissue.get("status") == "done") {                                                        
                            this.$(".done").append(subissueView.el);                            
                        }
                    }, this);
                }, this);
                var dialogView = new DialogView({
                    collection: this.subissues
                });
                dialogView.render();
                

            },

            equalColumns: function (columns) {
                var tallestcolumn = 0;
                columns.each(function() {
                    var $currentHeight = $(this).height();
                    if ($currentHeight > tallestcolumn) {
                        tallestcolumn = $currentHeight;
                    }
                });
            },

            renderOne: function (subissue) {
                var subissueView = new SubissueView({
                    model: subissue
                });
                subissueView.render();
                this.$(".todo").append(subissueView.el);
            },

            handleDrop: function(event, ui){
                console.log('111');
            }
        });
    }
);
