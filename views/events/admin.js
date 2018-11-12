import { Meteor } from 'meteor/meteor';
import { Template, Blaze } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import Events from '/logic/events/schema';

import './admin.html';

const formMethod = new ReactiveVar('addEvent');
const activeEvent = new ReactiveVar();
const isAllDayEvent = new ReactiveVar(false);
const Registrations = new Mongo.Collection('registrations');

/**
 * @summary Close Event Add/Update Admin Form
 * @method
 *   @param {$.Event} event
 */
const closeForm = (event) => {
  // Close add Event Form
  event.delegateTarget.querySelector('.eventsSlider').classList.remove('hide');
  event.delegateTarget.querySelector('section.addEvent').classList.add('hide');
  event.delegateTarget.querySelector('section.viewRegistrations')
    .classList.add('hide');
};

/** Admin events */
Template.eventsAdmin.events({
  /**
   * @summary Close Form
   */
  'click button.close': closeForm,
  'submit #eventForm': closeForm,
});

Template.eventAddForm.helpers({
  dateType: () => (isAllDayEvent.get() ? 'date' : 'datetime-local'),
});

/** Admin events */
Template.eventAddForm.events({
  'change #event-add-form-multi-day'(event) {
    const { checked } = event.target;

    if (checked) isAllDayEvent.set(false);
    else isAllDayEvent.set(true);
  },

  /**
   * @summary Close Form
   */
  'click button.close': closeForm,

  /**
   * @summary Add Event Submission
   * @method
   *   @param {$.Event} event
   */
  'submit form#admin-form-event-add': (event) => {
    event.preventDefault();

    // Return PriceTiersArray
    const priceTiersArray = () => {
      const tiers = document.querySelectorAll('.event-price-tier');
      const arr = [];
      for (let i = 0; i < tiers.length; i += 1) {
        const obj = {
          description: tiers[i].querySelector('.description-inp').value,
          cost: tiers[i].querySelector('.cost-inp').value,
        };
        arr.push(obj);
      }
      return arr;
    };

    // Return RegistrationArray
    const registrationDetailsArray = () => {
      const items = document.querySelectorAll('.event-registration-item');
      const arr = [];
      for (let i = 0; i < items.length; i += 1) {
        const obj = {
          name: items[i].querySelector('.field-name-inp').value,
          type: items[i].querySelector('.field-type-inp').value,
        };
        arr.push(obj);
      }
      return arr;
    };

    const start = document.getElementById('event-add-form-dateStart').value;
    const end = document.getElementById('event-add-form-dateEnd').value;

    const data = {
      name: document.getElementById('event-add-form-name').value,
      description: document.getElementById('event-add-form-desc').value,
      awareness: document.getElementById('event-add-form-awareness').value,
      start: start ? new Date(start) : undefined,
      end: end ? new Date(end) : undefined,
      location: {
        name: document.getElementById('event-add-form-location-name').value,
        mapUrl: document.getElementById('event-add-form-location-map-url').value,
        webinarUrl: document.getElementById('event-add-form-location-webinar-url').value,
      },
      cost: priceTiersArray(),
      registration: {
        required: document.getElementById('event-add-form-registration-required').value,
        registerUrl: document.getElementById('event-add-form-registration-external-url').value,
        registrationDetails: registrationDetailsArray(),
      },
    };

    console.log(data);

    // Insert subscriber into the collection
    Meteor.call('addEvent', data, function(error) {
      console.log('calling');
      if (error) {
        console.log(error.reason);
      } else {
        console.log('Subscription successful');
        console.log(data);
      }
    });
  },
});

/** Events template events */
Template.upcomingEvents.events({
  /**
   * @summary Show Event Add Form
   * @method
   */
  'click li.addEvent': () => {
    // Set appropriate form type
    formMethod.set('addEvent');
    activeEvent.set(null);

    const slider = document.getElementById('events-slider');
    const admin = document.getElementById('admin-form-container-context-event-add');

    if (slider instanceof Element) slider.classList.add('hide');
    if (admin instanceof Element) admin.classList.remove('hide');

    $('.listViewEventsObjectOpen').removeClass('listViewEventsObjectOpen');
    $('.listViewEvents').removeClass('active');
  },
});

/** Admin Helpers */
Template.eventsAdmin.helpers({
  /**
   * @summary Meteor Method to call on submit
   * @function
   * @returns {String}
   */
  method: () => formMethod.get(),

  /**
   * @summary Document context for updates
   * @function
   * @returns {Object}
   */
  doc: () => activeEvent.get(),

  /**
   * @summary The collection to use to populate form
   * @function
   * @returns {Mongo.Collection}
   */
  events: () => Events.collection,
});

/** Admin events for event sliders */
Template.eventSlide.events({
  /**
   * @summary Edit Event
   * @method
   *   @param {$.Event} event
   */
  'click .adminControls .edit': (event) => {
    // Set form type to Update
    formMethod.set('updateEvent');
    activeEvent.set(Blaze.getData());

    // Hide Slider and show admin interface
    const eventsSlider = event.delegateTarget.parentElement.parentElement;

    eventsSlider.classList.add('hide');
    eventsSlider.parentElement.querySelector('section.addEvent')
      .classList.remove('hide');
  },

  /**
   * @summary Delete Event
   * @method
   *   @param {$.Event} event
   */
  'click .adminControls .delete': () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      Meteor.call('deleteEvent', Blaze.getData()._id);
    }
  },

  /**
   * @summary View Registrations
   * @method
   *   @param {$.Event} event
   */
  'click li.viewRegistrations': (event) => {
    // Hide slider and show Registrations
    const eventsSlider = event.delegateTarget.parentElement.parentElement;

    eventsSlider.classList.add('hide');
    eventsSlider.parentElement.querySelector('section.viewRegistrations')
      .classList.remove('hide');

    // Set active event
    activeEvent.set(Blaze.getData());
  },
});

/** Event Registration Admin Helpers */
Template.viewRegistrations.helpers({
  /**
   * @summary Registrant details
   * @function
   * @returns {[Meteor.Profile]}
   */
  registrant: () => {
    if (activeEvent.get()) {
      Meteor.subscribe('registrations', activeEvent.get()._id);

      return Registrations.find({});
    }
    return [];
  },

  /**
   * @summary Return first email address from user profile
   * @function
   *   @param {[Object]} emails
   * @returns {String}
   */
  getEmail: emails => emails[0].address,

  /**
   * @summary Return special event fields
   * @function
   * @returns {[String]}
   */
  getSpecialFields: () => {
    if (activeEvent.get()) return activeEvent.get().registration.registrationDetails;
    return [];
  },

  /**
   * @summary Return special event field answers
   * @function
   *   @param {[Object]} events
   * @returns {[String]}
   */
  getSpecialAnswers: (events) => {
    const details = [];

    if (activeEvent.get() && events instanceof Array) {
      for (let i = 0; i < events.length; i += 1) {
        if (events[i].id === activeEvent.get()._id) {
          const deets = events[i].details;

          if (deets) {
            const entries = Object.entries(deets);

            for (let j = 0; j < entries.length; j += 1) {
              details.push({
                id: entries[j][0],
                value: entries[j][1],
              });
            }
          }

          return details;
        }
      }
    }
    return [];
  },
});

Template.viewRegistrations.events({
  /**
   * @summary Close Form
   * @method
   */
  'click button.close': closeForm,

  /**
   * @summary Download table as CSV
   * @method
   *   @param {$.Event} event
   */
  'click button.csv': (event) => {
    // Get data
    let data = '';
    const rows = event.target.parentElement.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i += 1) {
      const cells = rows[i].children;
      for (let j = 0; j < cells.length; j += 1) {
        const cell = cells[j].textContent
          .replace(/\r\n|[\r\n]/g, ' ')
          .replace(/\s+/g, ' ').trim();
        data += `${cell},`;
      }
      data += '\r\n';
    }

    // Prepare link
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.classList.add('hide');
    a.download = 'registrant-list.csv';

    // Add to page and click
    document.body.appendChild(a);
    a.click();
    a.remove();
  },
});
