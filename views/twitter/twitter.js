import { Template } from 'meteor/templating';

import './twitter.html';

Template.twitter.helpers({
  heading: 'Tweets by @wcasa_org',
  objectButton: 'See WCASA on Twitter',
});