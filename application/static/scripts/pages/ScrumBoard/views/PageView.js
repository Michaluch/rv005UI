define(["pages/ScrumBoard/views/HeaderView", 
        "pages/ScrumBoard/views/MainContentView",
        "pages/ScrumBoard/views/FooterView"],
    function(HeaderView, MainContentView, FooterView) {   

        return Backbone.View.extend({
            el: "body",
        
            initialize: function(options) {
            },

            render: function() {
                var headerView = new HeaderView();
                headerView.render();

                var mainContentView = new MainContentView();
                mainContentView.render();
                    
                var footerView = new FooterView();
            	footerView.render();

                this.$el.find(".wrapper")
                .html(headerView.el)
                .append(mainContentView.el)
                .append(footerView.el);
 
                return this;
            }
        });
    
});

