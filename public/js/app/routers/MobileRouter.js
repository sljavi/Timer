// MobileRouter.js
// ---------------
define(["jquery", "backbone", "collections/TimeEntries", "views/Timer", "views/TimeEntries", "views/About"],
        
  function ($, Backbone, TimeEntriesCollection, TimerView, TimeEntriesView, AboutView) {

    var MobileRouter = Backbone.Router.extend({

      initialize: function () {

        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();

      },

      // All of your Backbone Routes (add more)
      routes: {
          
        // When there is no hash bang on the url, the home method is called
        "": "index"

      },

      index: function () {

        // Instantiates a new view which will render the header text to the page
        var
          timeEntriesCollection = new TimeEntriesCollection(),
          timerView = new TimerView({attributes: {timeEntries: timeEntriesCollection}}),
          timeEntriesView = new TimeEntriesView({attributes: {collection: timeEntriesCollection}}),
          aboutView = new AboutView();

      }

    });

    // Returns the MobileRouter class
    return MobileRouter;

  }

);