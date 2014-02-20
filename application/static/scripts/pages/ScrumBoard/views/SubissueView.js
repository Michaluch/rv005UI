define(["text!pages/ScrumBoard/templates/SubissueView.html"], 
	   function(subissueView) {
	       return Backbone.View.extend({

	           template: _.template(subissueView),

	           events: {
                   "click .image-edit": "edit",
                   "click .save": "save",
                   "click .select-title": "drop",
                   "click .image-close": "close"
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
                   this.$(".image-edit, .image-delete").css("display", "none");
                   this.$(".image-close").css("display", "inline");
               },

               save: function() {
                   this.$(".subissue-hidden-edit").css("display", "none");
                   this.$(".subissue").css("height", "65px");
                   this.$(".image-edit, .image-delete").css("display", "inline");
                   this.$(".image-close").css("display", "none");
                   this.$(".select-title").each(function() {
                    var defaultTitle = $(this).prev().val();
                    if (defaultTitle) {
                      $(this).text(defaultTitle);
                    }
                   });
                   var data = this.$(".select-input").map(function(){
                       return $(this).serialize();
                   }).get().join("&");
                   
                   //$.post("/api/subissues/", data);
               },

               drop: function(event) {
                   event.preventDefault();
                   var $selectTitle = $(event.currentTarget);
                   var selectDiv = $(event.currentTarget).parent();
                   var ulDrop = selectDiv.find(".drop");
                   if ( ulDrop.is(":hidden") ) {
                       ulDrop.slideDown();
                       $(selectDiv).find("input").val($selectTitle.text());
                       $selectTitle.addClass("active");
                   }

                   ulDrop.find("li").click(function(event){
                      var selected = $(event.currentTarget).html();
                      selectDiv.find(".select-input").val($(selected).text());
                      ulDrop.slideUp();
                      $selectTitle.removeClass("active").html(selected);
                      

                      return false;
                   })
                   return false;
               },

               close: function() {
                   this.$(".subissue-hidden-edit").css("display", "none");
                   this.$(".subissue").css("height", "65px");
                   this.$(".image-edit, .image-delete").css("display", "inline");
                   this.$(".image-close").css("display", "none");

               }



	       });
	   }
);