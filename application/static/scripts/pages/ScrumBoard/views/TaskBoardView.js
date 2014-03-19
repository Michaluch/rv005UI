define(["text!pages/ScrumBoard/templates/TaskBoardView.html",
        "pages/ScrumBoard/collections/Issues",
        "pages/ScrumBoard/models/Issue",
        "pages/ScrumBoard/views/IssueView",
        "pages/ScrumBoard/collections/Subissues",
        "pages/ScrumBoard/models/Subissue",
        "pages/ScrumBoard/views/SubissueView",
        "pages/ScrumBoard/views/EditSubissueView",
        "pages/ScrumBoard/views/DeleteSubissueView",
        "pages/ScrumBoard/views/EditIssueView",
        "pages/ScrumBoard/views/DeleteIssueView"],

    function(taskBoardTemplate, Issues, Issue, IssueView, Subissues,
             Subissue, SubissueView, EditSubissueView, DeleteSubissueView,
             EditIssueView, DeleteIssueView){
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
                var $name = $currentTarget.parent().parent().find(".name");
                var $textarea = $currentTarget.parent().parent().find("textarea");
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
                            fetch: true,
                            success: function(data, response, options) {
                                collection.each(function(model) {
                                    that.filteredSub[model.id] = data.where({"parent": model.id});
                                });
                                that.renderAll();
                                that.equalColumns(".sprint .column"); 
                                
                            },
                        });
                    },
                });
                return this;
            },

            renderAll: function() {
                var that = this;
                this.$el.html(taskBoardTemplate);
                var subissues = this.subissues;
                var handleDrop = function(event, ui){
                    var clone = $(ui.helper);
                    clone.css("left", "0");
                    clone.css("top", "0");  

                    var id = clone.find('.subissue').attr("data-id"); 
                    var status = $(this).attr("data-status")

                    var sub = subissues.get(id);
                    sub.set("status", status);
                    sub.save();                   

                    $(this).append(clone);
                                       
                    that.equalColumns(".sprint .column");
                }

                this.$el.find('.todo, .doing, .done').droppable({
                    drop: handleDrop
                });

                var deleteSubissueView = new DeleteSubissueView();
                deleteSubissueView.render();
                this.deleteSubissueView = deleteSubissueView;

                var deleteIssueView = new DeleteIssueView();
                deleteIssueView.render();
                this.deleteIssueView = deleteIssueView; 


                var editSubissueView = new EditSubissueView({
                    collection: this.subissues
                });
                editSubissueView.render();
                this.editSubissueView = editSubissueView;

                
                var editIssueView = new EditIssueView({
                    collection: this.issues
                });
                editIssueView.render();
                this.editIssueView = editIssueView;
                
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
                        model : issue,
                        deleteIssueDialog : that.deleteIssueView,
                        editIssueDialog : that.editIssueView
                    });
                    issueView.on("issue-removed", that.onIssueRemoved, that);
                    issueView.render();

                    if (issue.get("status") == "to do") {
                        this.$(".todo ").append(issueView.el);
                    }
                    if (issue.get("status") == "doing") {
                        this.$(".doing").append(issueView.el);
                    }
                    if (issue.get("status") == "done") {
                        this.$(".done").append(issueView.el);
                    }
                    _.each(this.filteredSub[issue.id], function(subissue){
                        var subissueView = new SubissueView({
                            model: subissue,
                            deleteDialog: that.deleteSubissueView,
                            editDialog: that.editSubissueView
                        });
                        subissueView.on("subissue-removed", that.onSubissueRemoved, that);
                        subissueView.render();
                        
                        if (subissue.get("status") == "to do") {
                            this.$(".todo .subissue-container").append(subissueView.el);
                        }
                        if (subissue.get("status") == "doing") {
                            this.$(".doing").append(subissueView.el);

                        }
                        if (subissue.get("status") == "done") {
                            this.$(".done").append(subissueView.el);
                        }
                    }, this);
                }, this);
                
            },

            onSubissueRemoved: function(e) {
                e.subissueView.remove();
                this.equalColumns();
            },

            onIssueRemoved: function(e) {
                e.issueView.remove();
                this.equalColumns();
            },

            equalColumns: function (selector) {
                var tallestColumn = 0;
                $(selector).height('100%');
                _.each($(selector), function(column) {
                    var $currentHeight = $(column).height();
                    if ($currentHeight > tallestColumn) {
                        tallestColumn = $currentHeight;
                    }
                });
                $(selector).height(tallestColumn);
            },

            renderOne: function (subissue, collection, options) {
                if (!options.fetch) {
                    var subissueView = new SubissueView({
                        model: subissue
                    });
                    subissueView.model.save();
                    subissueView.render();
                    this.$(".todo").append(subissueView.el);
                }
            },
        });
    }
);
