define(["text!pages/ScrumBoard/templates/Row.html",
        "pages/ScrumBoard/models/Task"],

    function(row, Task) {
        return Backbone.View.extend({
            template: _.template(row),

            el: "#table",

            initialize: function(options){
            },
                           
            render: function () {
                this.$el.append(this.template(this.model.attributes));
                return this;
            }
        });
    }
);
