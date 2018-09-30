import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import News from '/logic/news/schema';
import Sections from '/logic/sections/sections';
import Files from './files';
import Settings from './settings';

/**
 * @summary Route for Action Alerts
 */
Router.route('action-alert', {
  path: '/action-alert/:title',
  layoutTemplate: 'post',

  /**
   * @summary Wait for subscription
   */
  waitOn: () => Meteor.subscribe('actionAlerts'),

  /**
   * @summary Data to pass to template
   */
  data: function () { // eslint-disable-line object-shorthand
    // Can't use lambda expression because of `this` context
    if (!this.ready()) return undefined;

    let item;
    const items = News.collection.find({ type: 'actionAlert' }).fetch();

    // Find the Newsroom item that matches the name
    for (let i = 0; i < items.length; i += 1) {
      if (Sections.generateId(items[i].title) === this.params.title) {
        item = items[i];
        break;
      }
    }

    // TODO(micchickenburger): Item not found needed here
    if (!item) return undefined;

    // The Post template expects the following additional information:
    item.category = 'Action Alert';
    item.logos = [{
      title: 'WCASA',
      src: '/lib/img/wcasa-wisconsin-coalition-against-sexual-assault.svg',
      url: '/',
    }];

    return item;
  },

  /**
   * @summary Render template
   */
  action: function () { // eslint-disable-line object-shorthand,func-names
    // Can't use lambda expression because of `this` context
    if (this.ready()) this.render();
  },
});

/**
 * @summary Route for Press Releases
 */
Router.route('press-release', {
  path: '/press-release/:title',
  layoutTemplate: 'post',

  /**
   * @summary Wait for subscription
   */
  waitOn: () => Meteor.subscribe('pressReleases'),

  /**
   * @summary Data to pass to template
   */
  data: function () { // eslint-disable-line object-shorthand,func-names
    // Can't use lambda expression because of `this` context
    if (!this.ready()) return undefined;

    let item;
    const items = News.collection.find({ type: 'pressRelease' }).fetch();

    // Find the Newsroom item that matches the name
    for (let i = 0; i < items.length; i += 1) {
      if (Sections.generateId(items[i].title) === this.params.title) {
        item = items[i];
        break;
      }
    }

    // TODO(micchickenburger): Item not found needed here
    if (!item) return undefined;

    // The Post template expects the following additional information:
    item.category = 'Press Release';
    item.logos = [{
      title: 'WCASA',
      src: '/lib/img/wcasa-wisconsin-coalition-against-sexual-assault.svg',
      url: '/',
    }];

    return item;
  },

  /**
   * @summary Render template
   */
  action: function () { // eslint-disable-line object-shorthand,func-names
    // Can't use lambda expression because of `this` context
    if (this.ready()) this.render();
  },
});

/**
 * @summary Route to support antiquated file_open.php from old website
 *   to continue to allow old download links to work
 */
Router.route('file-open', {
  path: '/file_open.php',
  where: 'server',

  /**
   * @summary Wait for collection to populate
   */
  waitOn: () => Files.collection.findOne({}),

  action: function fileOpen() {
    if (this.ready()) {
      const fileId = parseInt(this.url.replace(/.+\?id=(\d{1,4})/gi, '$1'), 10);
      const file = Files.collection.findOne({ fileId });

      if (file) {
        const { bucket } = Settings.get('aws');

        // HTTP 301 Permanent Redirect
        this.response.writeHead(
          301,
          { Location: `https://s3.us-east-2.amazonaws.com/${bucket}/old-website-resources/${file.fileName}` },
        );
        this.response.end();
      } else { this.response.end('This file does not exist.'); }
    }
  },
});

/**
 * @summary Display main canvas template by default
 */
Router.configure({
  layoutTemplate: 'canvas',
  noRoutesTemplate: false,
});