// SASPs
var providers = new Mongo.Collection('providers'),
    counties  = new Mongo.Collection('counties');

// Structure
//   _id                 {string}    auto_incr
//   Name                {string}
//   Counties served     {string[]}
//   Address             {string}
//   Coordinates for map {float[]}
//   Phone number        {string}
//   Crisis number       {string}
//   Email address       {string}
//   Website URL         {string}
//   Facebook URL        {string}
//   Twitter URL         {string}

// Publish providers
Meteor.publish('providers', function () {
    return providers.find({});
});
// Publish counties
Meteor.publish('counties', function () {
    return counties.find({});
});