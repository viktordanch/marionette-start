ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){

    Show.MissingContact = Marionette.ItemView.extend({
        template: "#missing-contact-view"
    });


    Show.Contact = Marionette.ItemView.extend({
        template: "#contact-view",

        events: {
            'click .js-back': 'backToList'
        },

        backToList: function(e){
            e.preventDefault();
            e.stopPropagation();
            ContactManager.trigger("contacts:list");
        }
    });
});