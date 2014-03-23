// TimeEntry.js
// -------
define(["jquery", "backbone", "text!templates/timeEntry.html"],

  function ($, Backbone, template) {

    var TimeEntryView = Backbone.View.extend({

      // The DOM Element associated with this view
      tagName: "li",

      // View constructor
      initialize: function () {
        this.listenTo(this.model, 'destroy', this.remove);
      },

      // View Event Handlers
      events: {
        "click button.destroy" : "clear"
      },

      // Renders the view's template to the UI
      render: function () {

        // Setting the view's template property using the Underscore template method
        this.template = _.template(template, {
          miliseconds: TimeEntryView.getTime(this.model.attributes.miliseconds),
          comment: this.model.attributes.comment
        });

        // Dynamically updates the UI with the view's template
        this.$el.html(this.template);

        // Maintains chainability
        return this;

      },

      clear: function () {
        this.model.destroy();
      }

    },

    // Statics methods
    {
      getTime: function (miliseconds) {
        var
          numMiliseconds = miliseconds % 1000,
          seconds = Math.floor(miliseconds / 1000),
          numHours = Math.floor(((seconds % 31536000) % 86400) / 3600),
          numMinutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60),
          numSeconds = (((seconds % 31536000) % 86400) % 3600) % 60,
          time;

        if (numMiliseconds < 10) {
          numMiliseconds = '0' + numMiliseconds;
        }

        if (numMiliseconds < 100) {
          numMiliseconds = '0' + numMiliseconds;
        }

        if (numSeconds < 10) {
          numSeconds = '0' + numSeconds;
        }

        if (numMinutes < 10) {
          numMinutes = '0' + numMinutes;
        }
        
        if (numHours < 10) {
          numHours = '0' + numHours;
        }

        time = numHours + ":" + numMinutes + ":" + numSeconds + " " + numMiliseconds;

        return time;
      }
    });

    // Returns the TimeEntryView class
    return TimeEntryView;

  }

);