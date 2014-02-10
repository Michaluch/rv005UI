define(["text!pages/ScrumBoard/templates/SubissueView.html"], 
	   function(subissueView) {
	       return Backbone.View.extend({

	           template: _.template(subissueView),

	           events: {
                   "click .image-edit": "edit",
                   "click .save": "save",
                   "click .select-type .select-title": "drop"
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
               },

               drop: function() {
                   var dropBox = this.$(".drop");
                   if ( dropBox.is(":hidden")) {
                       dropBox.slideDown();
                       this.$(".select-title").addClass("active");
                   }

                   $(".drop").find("li").click(function(){
                      var selected = $(this).html();
                      $("input").val($(selected).text());
                      $(".select-title").removeClass("active").html(selected);
                      dropBox.slideUp();


                   })
               }



	       });
	   }
);