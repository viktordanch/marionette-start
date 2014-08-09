ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
    List.Controller = {
        listContacts: function(){
            var loadingView = new ContactManager.Common.Views.Loading();

            ContactManager.mainRegion.show(loadingView);
            var fetchingContacts = ContactManager.request("contact:entities");

            var contactsListLayout = new List.Layout();
            var contactsListPanel = new List.Panel();

            $.when(fetchingContacts).done(function(contacts){
//                var filteredContacts = ContactManager.Entities.FilteredCollection({
//                        collection: contacts
//                });

                contactsListLayout.on("show", function(){
                    contactsListLayout.panelRegion.show(contactsListPanel);
                    contactsListLayout.contactsRegion.show(contactsListView);
                });

                contactsListPanel.on("contact:new", function(){
                    var newContact = new ContactManager.Entities.Contact();

                    var view = new ContactManager.ContactsApp.New.Contact({
                        model: newContact
                    });

                    view.on("form:submit", function(data){
                        var highestId = contacts.max(function(c){ return c.id; });
                        highestId = highestId.get("id");
                        data.id = highestId + 1;
                        if(newContact.save(data)){
                            contacts.add(newContact);
                            view.trigger("dialog:close");
                            contactsListView.children.findByModel(newContact).
                                flash("success");
                        }
                        else{
                            view.triggerMethod("form:data:invalid",
                                newContact.validationError);
                        }
                    });

                    ContactManager.dialogRegion.show(view);
                });

                contactsListPanel.on("contacts:filter", function(filterCriterion){
                    filteredContacts.filter(filterCriterion);
                });

                var contactsListView = new List.Contacts({
//                    collection: filteredContacts
                    collection: contacts
                });

                contactsListView.on("childview:contact:show", function (childView, model) {
                    ContactManager.trigger("contact:show", model.get("id"));
                });

                contactsListView.on("childview:contact:delete", function (childView, model) {
                    model.destroy();
                });

                contactsListView.on("childview:contact:select", function (childView, model) {
                    console.log("Highlighting toggled on model: ", model);
                });

                contactsListView.on("childview:contact:edit", function(childView, model){
                    var view = new ContactManager.ContactsApp.Edit.Contact({
                        model: model
                    });

                    view.on("form:submit", function(data){
                        if(model.save(data)){
                            childView.render();
                            view.trigger("dialog:close");
                            childView.flash("success");
                        }
                        else{
                            view.triggerMethod("form:data:invalid", model.validationError);
                        }
                    });

                    ContactManager.dialogRegion.show(view);
                });

//                var filteredContacts = ContactManager.Entities.FilteredCollection({
//                    collection: contacts,
//                    filterFunction: function(filterCriterion){
//                        var criterion = filterCriterion.toLowerCase();
//                        return function(contact){
//                            if(contact.get("firstName").toLowerCase().indexOf(criterion) !== -1
//                                || contact.get("lastName").toLowerCase().indexOf(criterion) !== -1
//                                || contact.get("phoneNumber").toLowerCase().
//                                indexOf(criterion) !== -1){
//                                return contact;
//                            }
//                        };
//                    }
//                });

//                ContactManager.mainRegion.show(contactsListView);
                ContactManager.mainRegion.show(contactsListLayout);
            })



        }
    }
});