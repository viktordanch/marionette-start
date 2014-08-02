var ContactManager = new Marionette.Application();

    ContactManager.navigate = function(route, options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    ContactManager.addRegions({
        mainRegion: "#main-region",
        dialogRegion: "#dialog-region"
    });

    ContactManager.getCurrentRoute = function(){
        return Backbone.history.fragment
    };

    ContactManager.on("start", function(){
        if(Backbone.history){
            Backbone.history.start();
        }
        if(this.getCurrentRoute() === ""){
            this.navigate("contacts");
            ContactManager.trigger("contacts:list");
        }
});