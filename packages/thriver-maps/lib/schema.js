/**
 * @summary Providers namespace
 * @namespace
 */
Thriver.providers = {};

/**
 * @summary SASPs and Counties Collections
 * @type {Mongo.Collection}
 */
Thriver.providers.collection = new Mongo.Collection('providers');
Thriver.providers.counties = new Mongo.Collection('counties');

// Create custom validation messages
SimpleSchema.messages({
  invalidLatitude: 'Latitude must be between 42.5 and 47.083',
  invalidLongitude: 'Longitude must be between -86.767 and -92.883',
});

/**
 * @summary Providers Schema
 * @type {SimpleSchema}
 */
Thriver.providers.schema = new SimpleSchema({
  /** ID */
  _id: {
    type: String,
    optional: true, // ID is autogenerated
    autoform: {
      type: 'hidden',
    },
  },
  /** Provider name */
  name: {
    type: String,
    optional: false,
  },
  /** Counties Covered by this Provider */
  counties: {
    type: [String],
    defaultValue: [],
    allowedValues: [
      'Adams', 'Ashland', 'Barron', 'Bayfield', 'Brown',
      'Buffalo', 'Burnett', 'Calumet', 'Chippewa', 'Clark',
      'Columbia', 'Crawford', 'Dane', 'Dodge', 'Door',
      'Douglas', 'Dunn', 'Eau Claire', 'Florence', 'Fond Du Lac',
      'Forest', 'Grant', 'Green', 'Green Lake', 'Iowa',
      'Iron', 'Jackson', 'Jefferson', 'Juneau', 'Kenosha',
      'Kewaunee', 'La Crosse', 'Lafayette', 'Langlade', 'Lincoln',
      'Manitowoc', 'Marathon', 'Marinette', 'Marquette', 'Menominee',
      'Milwaukee', 'Monroe', 'Oconto', 'Oneida', 'Outagamie',
      'Ozaukee', 'Pepin', 'Pierce', 'Polk', 'Portage',
      'Price', 'Racine', 'Richland', 'Rock', 'Rusk',
      'Saint Croix', 'Sauk', 'Sawyer', 'Shawano', 'Sheboygan',
      'Taylor', 'Trempealeau', 'Vernon', 'Vilas', 'Walworth',
      'Washburn', 'Washington', 'Waukesha', 'Waupaca', 'Waushara',
      'Winnebago', 'Wood',
    ],
    label: 'Counties Served by Provider',
    autoform: {
      type: 'select-checkbox',
    },
  },
  /** Provider's Address */
  address: {
    type: String,
    optional: false,
    autoform: {
      type: 'textarea',
      rows: 4,
    },
  },
  /** Coordinates of Provider Location */
  coordinates: {
    type: Object,
    optional: false,
    minCount: 2,
    maxCount: 2,
  },
  'coordinates.lat': {
    type: Number,
    decimal: true,
    optional: false,
    custom: function () { // eslint-disable-line object-shorthand,func-names
      if (this.value < 42.5 || this.value > 47.083) {
        return 'invalidLatitude';
      }
      return true;
    },
    label: 'Latitude',
  },
  'coordinates.lon': {
    type: Number,
    decimal: true,
    optional: false,
    custom: function () { // eslint-disable-line object-shorthand,func-names
      if (this.value > -86.767 || this.value < -92.883) {
        return 'invalidLongitude';
      }
      return true;
    },
    label: 'Longitude',
  },

  /** Provider Main Phone Number */
  phones: {
    type: [Object],
    optional: false,
    defaultValue: [],
  },
  'phones.$': {
    type: Object,
    optional: false,
  },
  'phones.$.number': {
    type: String,
    optional: false,
    label: 'Main Phone Number',
    autoValue: function () { //eslint-disable-line
      // can't use arrow function because of `this` context
      return this.value.replace(/[^\d]/g, '');
    },
    autoform: {
      type: 'tel',
      placeholder: '+1 (123) 456-7890',
    },
  },
  'phones.$.description': {
    type: String,
    optional: true,
  },
  'phones.$.tty': {
    type: Boolean,
    optional: true,
    label: 'Is this number TTY-enabled?',
    autoform: {
      type: 'boolean-radios',
    },
  },
  'phones.$.ext': {
    type: Number,
    optional: true,
    decimal: false,
  },

  /** Crisis Phone Number */
  crisis: {
    type: Object,
    optional: false,
    defaultValue: {},
  },
  'crisis.number': {
    type: String,
    optional: false,
    label: '24-hr Crisis Phone Number',
    autoValue: function () { //eslint-disable-line
      // can't use arrow function because of `this` context
      return this.value.replace(/[^\d]/g, '');
    },
    autoform: {
      type: 'tel',
      placeholder: '+1 (123) 456-7890',
    },
  },
  'crisis.tty': {
    type: Boolean,
    optional: true,
    label: 'Is this number TTY-enabled?',
    autoform: {
      type: 'boolean-radios',
    },
  },
  'crisis.ext': {
    type: Number,
    optional: true,
    decimal: false,
  },

  /** Contact email address */
  emails: {
    type: [Object],
    optional: false,
    defaultValue: [],
  },
  'emails.$': {
    type: Object,
    optional: true,
  },
  'emails.$.address': {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Email,
    autoform: {
      type: 'email',
    },
  },
  'emails.$.description': {
    type: String,
    optional: true,
  },

  /** Website */
  website: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Website URL',
    autoform: {
      type: 'url',
    },
  },
  /** Facebook link */
  facebook: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Facebook Page URL',
    autoform: {
      type: 'url',
    },
  },
  /** Twitter feed */
  twitter: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Twitter Feed URL',
    autoform: {
      type: 'url',
    },
  },

  /** Notes */
  notes: {
    type: String,
    optional: true,
    autoform: {
      type: 'textarea',
      rows: 6,
    },
  },

  /** Parent Location, if this is a satellite office */
  parent: {
    type: String,
    optional: true,
    label: 'If this is a satellite office, select the Parent Location:',
    autoform: {
      options: () => Thriver.providers.collection.find().map(provider =>
        ({ label: provider.name, value: provider._id })),
    },
  },
});
Thriver.providers.collection.attachSchema(Thriver.providers.schema);
