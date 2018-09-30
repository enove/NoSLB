import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

/**
 * @summary People Namespace
 * @namespace
 */
const People = {};

/**
 * @summary People Collection
 * @type {Mongo.Collection}
 */
People.collection = new Mongo.Collection('people');

/**
 * @summary People Schema
 * @type {SimpleSchema}
 */
People.schema = new SimpleSchema({
  /** ID */
  _id: {
    type: String,
    optional: true, // ID is autogenerated
  },
  /** Person's name and credentials */
  name: {
    type: String,
    optional: false,
    label: 'Name and Credentials',
  },
  /** Person's job title */
  title: {
    type: String,
    optional: false,
    label: 'Job or Position Title',
  },
  /** Email address */
  email: {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Email,
  },
  /** Is this person a board member? */
  boardMember: {
    type: Boolean,
    optional: false,
    defaultValue: false,
    label: 'Is this person a Board Member?',
    autoform: {
      type: 'boolean-select',
    },
  },
  /** Picture or Avatar */
  // TODO(micchickenburger): Consider making this a Binary Blob at some point
  picture: {
    type: String,
    optional: true,
    label: 'Picture or Avatar',
    autoform: {
      type: 'file',
    },
  },
});

/** Attach schema */
People.collection.attachSchema(People.schema);

export default People;