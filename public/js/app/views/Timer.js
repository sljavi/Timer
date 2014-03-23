// Timer.js
// -------
define(["jquery", "backbone", "views/TimeEntry", "text!templates/timer.html"],

  function ($, Backbone, TimeEntryView, template) {

    var View = Backbone.View.extend({

      // The DOM Element associated with this view
      el: "#timer",

      //The miliseconds count
      miliseconds: 0,

      //The interval object, used it to track the senconds
      interval: null,

      // View constructor
      initialize: function () {

        // Calls the view's render method
        this.render();
        this.$time = this.$el.find('.time');
      },

      // View Event Handlers
      events: {
        "click .play-stop": "handlePlayStop",
        "click .reset": "handleReset",
        "submit form": "handleAddNewTimeEntry"
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

      //Handler for play-stop button
      handlePlayStop: function () {
        if (this.interval) {
          this.pause();
          this.showForm();
        } else {
          this.play();
          this.hideForm();
        }
      },

      play: function () {
        var self = this;
        this.interval = setInterval(function () {
          self.miliseconds += 10;
          self.refreshTime();
        }, 10);
      },

      pause: function () {
        clearInterval(this.interval);
        this.interval = null;
      },

      refreshTime: function () {
        var time = TimeEntryView.getTime(this.miliseconds);
        this.$time.html(time);
      },

      handleReset: function () {
        this.pause();
        this.miliseconds = 0;
        this.refreshTime();
        this.hideForm();
      },

      showForm: function () {
        this.$el.find('form').slideDown();
        this.$el.find('form input').focus();
      },

      hideForm: function () {
        var $form = this.$el.find('form');
        $form.slideUp();
        $form.find('input').prop('value', '');
      },

      handleAddNewTimeEntry: function () {
        this.attributes.timeEntries.create({
          miliseconds: this.miliseconds,
          comment: this.$el.find('form input').prop('value')
        });
        return false;
      }

    });

    // Returns the View class
    return View;

  }

);