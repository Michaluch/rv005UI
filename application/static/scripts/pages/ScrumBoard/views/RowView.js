define(["text!pages/ScrumBoard/templates/Row.html",
        "pages/ScrumBoard/models/Task"],

    function(row, Task) {
        return Backbone.View.extend({
            template: _.template(row),

            el: "#table",

            initialize: function(options){
            },
                           
            render: function () {                
                var status = this.model.attributes.status;
                if (status != "removed"){
                this.$el.append(this.template(this.model.attributes));
                console.log(this.model.attributes.status);
                return this;
                }
            }
        });
    }
);
