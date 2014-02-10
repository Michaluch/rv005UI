define(["text!pages/ScrumBoard/templates/SubissueView.html"], 
	   function(subissueView) {
	       return Backbone.View.extend({

	           template: _.template(subissueView),

	           events: {
                   "click .image-edit": "edit",
                   "click .save": "save",
                   "click .select-title": "drop"
	           },

	           initialize: function(options){
               },

               render: function() {
                   this.$el.html(this.template({name: this.model.get("name")}));
                   return this;
               },

               edit: function() {
                   this.$(".subissue-hidden-edit").css("display", "block");
                   this.$(".subissue").css("height", "auto");
               },

               save: function() {
                   this.$(".subissue-hidden-edit").css("display", "none");
                   this.$(".subissue").css("height", "65px");
                   this.$(".select-title").each(function() {
                    var defaultTitle = $(this).prev().val();
                    if (defaultTitle) {
                      $(this).text(defaultTitle);
                    }
                   })
               },

               drop: function(event) {
                   event.preventDefault();
                   var $selectTitle = $(event.currentTarget);
                   var selectDiv = $(event.currentTarget).parent();
                   var ulDrop = selectDiv.find(".drop");
                   if ( ulDrop.is(":hidden") ) {
                       ulDrop.slideDown();
                       $selectTitle.addClass("active");
                       $(selectDiv).find("input").val($selectTitle.text());
                   }

                   ulDrop.find("li").click(function(event){
                      var selected = $(event.currentTarget).html();
                      selectDiv.find(".select-input").val($(selected).text());
                      $selectTitle.removeClass("active").html(selected);
                      ulDrop.slideUp();

                      return false;
                   })
                   return false;
               }



	       });
	   }
);