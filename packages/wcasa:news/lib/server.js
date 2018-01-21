// Structure
//   _id           {string}   auto_incr
//   title         {string}
//   type          {string}
//   content       {string}
//   url           {string}
//   publisher     {string}
//   date          {date}

// @values type
//   inTheNews
//   pressRelease
//   actionAlert

// Publish Newsroom sections -- they're public
Meteor.publish('inTheNews', () =>
  Thriver.news.collection.find({ type: 'inTheNews' }, { sort: { date: 1 } }));

Meteor.publish('pressReleases', () =>
  Thriver.news.collection.find({ type: 'pressRelease' }, { sort: { date: 1 } }));

Meteor.publish('actionAlerts', () =>
  Thriver.news.collection.find({ type: 'actionAlert' }, { sort: { date: 1 } }));

Meteor.publish('newsletters', () =>
  Thriver.news.collection.find({ type: 'newsletter' }, { sort: { date: 1 } }));

Meteor.methods({
  /**
   * @summary Add Newsroom Item
   * @method
   *   @param {Object} item - Item to add
   */
  addNewsItem: (item) => {
    // Check authorization
    if (!Meteor.userId() || !Meteor.user().admin) {
      throw new Meteor.Error('not-authorized');
    }

    const thisItem = item;

    // Parameter checks
    check(item, Object);

    // Enforce UTC
    if (item.date instanceof Date) thisItem.date = new Date(thisItem.date.toISOString());

    // Perform Insert
    Thriver.news.collection.insert(item, (error) => {
      if (error) throw new Meteor.Error(error);
    });
  },

  /**
   * @summary Delete Newsroom Item
   * @method
   *   @param {String} id - ID of item to delete
   */
  deleteNewsItem: (id) => {
    // Check authorization
    if (!Meteor.userId() || !Meteor.user().admin) {
      throw new Meteor.Error('not-authorized');
    }

    // Parameter checks
    check(id, String);

    // Perform deletion
    Thriver.news.collection.remove({ _id: id }, (error) => {
      if (error) throw new Meteor.Error(error);
    });
  },

  /**
   * @summary Edit Newsroom Item Content
   * @method
   *   @param {String} id - ID of item to edit
   *   @param {String} content
   */
  updateNewsContent: (id, content) => {
    // Check authorization
    if (!Meteor.userId() || !Meteor.user().admin) {
      throw new Meteor.Error('not-authorized');
    }

    // Check parameters
    check(id, String);
    check(content, String);

    // Perform edit
    Thriver.news.collection.update(
      { _id: id },
      { $set: { content } },
      (error) => {
        if (error) throw new Meteor.Error(error);
      },
    );
  },
});
