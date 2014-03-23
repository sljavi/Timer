// TimeEntries.js
// -------------
define(["jquery", "backbone", "backbone.localStorage", "models/TimeEntry"],

  function ($, Backbone, BackboneLocalStorage, TimeEntry) {

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({

      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: TimeEntry,

      // Tells the Backbone Collection that has to save the time entries in the local storage
      localStorage: new Backbone.LocalStorage("time-entries")

    });

    // Returns the Model class
    return Collection;

  }

);