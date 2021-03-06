import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Toast from '/views/components/toasts';

import './preferences.html';

/**
 * @description
 *  Update user profile field. Makes a call to the backend
 *  with a property it has to update and the new value
 * @method
 *  @param {any} fieldName
 *  @param {any} fieldValue
 */
const updateProfileField = (fieldName, fieldValue) => {
  const profile = {};
  profile[fieldName] = fieldValue;

  Meteor.call('updateUserProfile', profile, (errorMessage) => {
    if (errorMessage) {
      const errorElement = document.getElementById('connection-error');
      errorElement.innerText = errorMessage;
      errorElement.classList.remove('hide');

      const scroll = document.querySelector('#account .scroll');
      let height = 0;
      let a = scroll;

      while (a) {
        height += a.offsetHeight;
        a = a.parentElement;
      }

      scroll.scrollTop = height;
    } else if (document.querySelectorAll('.preferences-update-toast').length < 1) {
      // Alert the user.
      Toast({ text: 'Your preferences have been updated.', classes: 'preferences-update-toast', duration: 3000 });
    }
  });
};

// Helpers
Template.preferences.helpers({
  // Populate Preferences tab under Account Overview
  heading: 'Preferences',
  submitValue: 'Update Account',
  dieteryRestrictions: ['Vegan', 'Vegetarian', 'Pescetarian'],
  emergencyRelationshipChoices: ['Parent', 'Child', 'Sibling', 'Partner', 'Relative', 'Other'],

  /**
   * @summary Pass user context to profile form
   * @function
   * @returns {Object}
   */
  user: () => Meteor.user(),

  /**
   * @summary Don't include the following fields in the form
   * @function
   * @returns {String[]}
   */
  omitFields: [
    'profile.subscriptions',
    'profile.events.registeredEvents',
    'profile.online',
  ],
  getArianSelectedAttribute: (arg1, arg2) => (arg1 === arg2 ? 'selected' : null),
});

// Events
Template.preferences.events({
  'blur input[type="text"][name*="profile."]': (event) => {
    // Handle events for input boxes
    updateProfileField(event.target.name, event.target.value);
  },
  'blur textarea[name*="profile."]': (event) => {
    // Handle events for input boxes
    updateProfileField(event.target.name, event.target.value);
  },
  'click input[type="checkbox"][name*="profile."]': (event) => {
    // Handle events for checkboxes
    updateProfileField(event.target.name, event.target.checked);
  },
  'change select[name*="profile."]': (event) => {
    // Handle evetns for select elements
    updateProfileField(event.target.name, event.target.value);
  },
});
