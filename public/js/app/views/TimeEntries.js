// TimeEntries.js
// -------
define(["jquery", "backbone", "views/TimeEntry", "text!templates/timeEntries.html"],

  function ($, Backbone, TimeEntryView, template) {

    var View = Backbone.View.extend({

      // The DOM Element associated with this view
      el: "#timeEntries",

      // View constructor
      initialize: function () {

        // Listening for take care of changes in the time entries
        this.listenTo(this.attributes.collection, 'add', this.addOne);
        this.listenTo(this.attributes.collection, 'all', this.updateClasses);

        // Calls the view's render method
        this.render();

        // Caching the list
        this.$ul = this.$el.find('ul');

        // Fetch all the entries from the repository of time entries
        this.attributes.collection.fetch();
      },

      // View Event Handlers
      events: {

      },

      // Renders the view's template to the UI
      render: function () {
        // Setting the view's template property using the Underscore template method
        this.template = _.template(template, {});

        // Dynamically updates the UI with the view's template
        this.$el.html(this.template);

        // Maintains chainability
        return this;

      },

      addOne: function (aTimeEntry) {
        var view = new TimeEntryView({model: aTimeEntry});
        this.$ul.prepend(view.render().el);
      },

      updateClasses: function () {
        var
          classesWhenThereAreTimeEntries = "col-xs-12 col-md-8 col-lg-7",
          classesWhenThereAreNotTimeEntries = "col-xs-12 col-md-12 col-lg-12";
        
        if (this.attributes.collection.length === 0) {
          $('.mainColumn').removeClass(classesWhenThereAreTimeEntries).addClass(classesWhenThereAreNotTimeEntries);
        } else if (this.attributes.collection.length === 1) {
          $('.mainColumn').removeClass(classesWhenThereAreNotTimeEntries).addClass(classesWhenThereAreTimeEntries);
        }
      }

    });

    // Returns the View class
    return View;

  }

);