define(["text!pages/ScrumBoard/templates/ProfileView.html",
        "text!pages/ScrumBoard/templates/FooterView.html",
        "pages/ScrumBoard/models/User"],

    function(profileView, footerView, UserModel) {
        return Backbone.View.extend({
            el: "body",
            template: _.template(profileView),
        
            initialize: function(options){
                this.user = new UserModel();
            },
                           
            render: function () {
                var that = this;
                this.user.fetch({
                    success: function (model, response, options) {
                        that.renderProfile();


                        that.$(".editable").editable(function(value, settings) {
                             console.log(this);
                             console.log(value);
                             console.log(settings);
                             return(value);
                              }, {
                                 event    : "mouseover",
                                 onblur   : "submit",
                                 type     : "text"
                                 // submit  : 'OK',
                         });

                    },

                    error: function () {
                        //
                    }

                });        
               
                return this;
            },

            renderProfile: function () {
                this.$(".wrapper")
                .html(this.template({fname: this.user.get("fname"),
                                    lname: this.user.get("lname"),
                                    email: this.user.get("email"),
                                    role: this.user.get("role")}))
                .append(footerView);
            }                  
        })
})
