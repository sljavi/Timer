// About.js
// -------
define(["jquery", "backbone", "text!templates/about.html"],

  function ($, Backbone, template) {

    var View = Backbone.View.extend({

      // The DOM Element associated with this view
      el: "#aboutContainer",

      // View constructor
      initialize: function () {

        // Calls the view's render method
        this.render();

      },

      // View Event Handlers
      events: {
        "click #about ul.nav-tabs a": "showTab"
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

      open: function () {
        $('#about').modal({show: true});
      },

      close: function () {
        $('#about').modal({show: false});
      },

      showTab: function (event) {
        var classTabToShow = $(event.target).prop('target');
        this.$('ul.nav-tabs li').removeClass('active');
        $(event.target).parent().addClass('active');
        this.$('div.info div.tab').slideUp();
        this.$('div.info div.' + classTabToShow).slideDown();
        return false;
      }
    });

    // Returns the View class
    return View;

  }

);