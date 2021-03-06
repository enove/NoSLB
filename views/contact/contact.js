import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import History from '/views/history/history';
import Sections from '/logic/sections/sections';

import './contact.html';

/**
 * @summary Reactive variable for dynamic template
 * @type {ReactiveVar}
 */
const contactTemplate = new ReactiveVar();

// Set contact form by default
contactTemplate.set('contactForm');

//
Template.contact.helpers({
  heading: 'Contact WCASA',
  phone: '(608) 257-1516',
  email: 'wcasa@wcasa.org',
  fax: '(608) 646-7753',
  copyright: `2010-${(new Date()).getFullYear()} Wisconsin Coalition Against Sexual Assault, Inc.`,
  imgSrc: '/lib/img/wisconsin-coalition-against-sexual-assault.svg',
  imgAlt: 'Wisconsin Coalition Against Sexual Assault',
  addressL1: '2801 West Beltine Highway, Suite 202',
  addressL2: 'Madison, Wisconsin 53713',
  mapUrl: 'https://www.google.com/maps/place/2801+W+Beltline+Hwy+%23202,+Madison,+WI+53713/@43.034741,-89.4274008,17z/data=!3m1!4b1!4m2!3m1!1s0x8807ad6daf6daa9d:0x93cfebcf81dadf8a',

  // Which contact template to display
  template: () => contactTemplate.get(),
});

//
Template.contactForm.helpers({
  items: [{
    title: 'Name',
    id: 'name',
    type: 'name',
    required: 'required',
    placeholder: 'Name',
  }, {
    title: 'Email',
    id: 'email',
    type: 'email',
    required: 'required',
    placeholder: 'Email',
  }],
  submitValue: 'Send Message',
});

/**
 * @summary Handle form submission
 * @method
 */
Template.contact.events({
  'submit #contactForm': (event) => {
    // Prevent navigation
    event.preventDefault();

    // Get form values
    const name = event.target.name.value;
    const email = event.target.email.value;
    const comments = event.target.comments.value;

    Meteor.call('submitContactForm', name, email, comments, (error) => {
      if (error) {
        contactTemplate.set('failureContact');
      } else {
        contactTemplate.set('thanksContact');
      }
    });
  },
});

/**
 * @summary Register Deep-linking
 * @method
 */
Template.contact.onRendered(() => {
  // Get db ID from current instance
  const instanceName = Template.instance().data.name;

  // Register
  History.registry.insert({
    element: Sections.generateId(instanceName),
  });
});
