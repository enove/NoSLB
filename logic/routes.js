import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

/**
 * @summary Action Alerts Route
 */
FlowRouter.route('/action-alert/:title', {
  name: 'App.actionAlerts',
  waitOn: params => Meteor.subscribe('actionAlerts', params.title),
  action() {
    this.render('post', {
      category: 'Action Alert',
      logos: [{
        title: 'WCASA',
        src: '/lib/img/wcasa-wisconsin-coalition-against-sexual-assault.svg',
        url: '/',
      }],
    });
  },
});

/**
 * @summary Press Releases Route
 */
FlowRouter.route('/press-release/:title', {
  name: 'App.pressReleases',
  waitOn: params => Meteor.subscribe('pressReleases', params.title),
  action() {
    this.render('post', {
      category: 'Press Release',
      logos: [{
        title: 'WCASA',
        src: '/lib/img/wcasa-wisconsin-coalition-against-sexual-assault.svg',
        url: '/',
      }],
    });
  },
});

/**
 * @summary Default route
 */
FlowRouter.route('/*', {
  name: 'App.home',
  action() {
    this.render('canvas');
  },
});