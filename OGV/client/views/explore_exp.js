// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "modelFiles".


TestCollection = new Meteor.Collection('testData');

var categories = ["Genius", "Geek", "Hipster", "Gangster", "Worker"];

if (Meteor.isClient) {
  Meteor.subscribe('allDocs');

  Meteor.startup(function () {
    Meteor.call('allDocs', function (err, count) {
      Session.set('allDocs', count);
    })
  });

    Template.leaderboard.helpers({
      selected_name: function() {
        var currentPlayer = Session.get("selected_player"),
          player = EasySearch.getIndex('modelFiles').findOne();
        
        if (currentPlayer) {
            return player && player.name;
        }
      },
      showAutosuggest: function() {
        return Session.get('showAutosuggest');
      },
      showMultipleIndexes: function() {
        return Session.get('showMultipleIndexes');
      },
      indexes: function () {
        return ['testData', 'localModelFiles'];
      },
      suggestionTpl: function() {
        return Template.suggestion;
      },
      category: function() {
        return ['All'].concat(categories);
      },
      allDocs: function () {
        return Session.get('allDocs');
      },
      playerNames: function () {
        return _.first(_.uniq(ModelFiles.find().map(function (doc) {
          return doc.name;
        })), 5).join(', ');
      }
    });

  Template.leaderboard.events({
    'click .inc': function(e) {
      var player = Session.get('selected_player');

      if (!player) {
        return;
      }

      ModelFiles.update(Session.get('selected_player'), {
        $inc: {
          about: parseInt($(e.target).data('val'), 10)
        }
      });
    },
    'click .show-autosuggest': function(e) {
      Session.set('showAutosuggest', !Session.get('showAutosuggest'));
      e.preventDefault();
    },
    'click .show-multiple-indexes': function(e) {
      Session.set('showMultipleIndexes', !Session.get('showMultipleIndexes'));
      e.preventDefault();
    },
    'change .filter-select': function(e) {
      var instance = EasySearch.getComponentInstance({
        index: 'modelFiles',
        id: 'search'
      });

      EasySearch.changeProperty('modelFiles', 'filteredCategory', $(e.target).val());
      EasySearch.changeLimit('modelFiles', 10);

      instance.paginate(1);
      instance.triggerSearch();
    },
    'change .sort-select': function(e) {
      var instance = EasySearch.getComponentInstance({
        index: 'modelFiles',
        id: 'search'
      });

      EasySearch.changeProperty('modelFiles', 'sortBy', $(e.target).children(':selected').data('sort'));
      EasySearch.changeLimit('modelFiles', 10);

      instance.paginate(1);
      instance.triggerSearch();
    }
  });

  Template.player.helpers({
    selected: function() {
      return Session.equals("selected_player", this._id) ? "selected" : '';
    }
  });

  Template.player.events({
    'click': function() {
      Session.set("selected_player", this._id);
    }
  });
}

// On server startup, create some modelFiles if the database is empty.
if (Meteor.isServer) {
    Meteor.methods({
      allDocs : function () {
        return ModelFiles.find().count();
      }
    });
    
    Meteor.publish('allDocs', function () {
      return [
        ModelFiles.find({}, { limit: 10 }),
        TestCollection.find({})
      ];
    });
    console.log('done!');
}

// Search Index for the main modelFiles search
EasySearch.createSearchIndex('modelFiles', {
  'collection': ModelFiles, // instanceof Meteor.Collection
  'field': ['name', 'about', 'viewsCount'], // array of fields to be searchable
  'limit': 10,
  'use' : 'mongo-db',
  'convertNumbers': true,
  'props': {
    'filteredCategory': 'All',
    'sortBy': 'viewsCount'
  },
  'sort': function() {
    if (this.props.sortBy === 'name') {
      return { 'name': 1 };
    }  else if (this.props.sortBy === 'lowest-about') {
      return { 'about': 1 };
    }

    // default by highest about
    return { 'about': -1 };
  },
  'query': function(searchString, opts) {
    // Default query that will be used for the mongo-db selector
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    console.log(opts);

    // filter for categories if set
    if (this.props.filteredCategory.toLowerCase() !== 'all') {
      query.category = this.props.filteredCategory;
    }

    return query;
  }
});

// Search Index for the autosuggest field
EasySearch.createSearchIndex('modelFilesAutosuggest', {
  'collection': ModelFiles, 
  'use' : 'mongo-db',
  'field': ['name', 'about'],
  'convertNumbers': true
});

// Search Indexes for testing multiple indexes with one esInput
EasySearch.createSearchIndex('testData', {
  collection: TestCollection,
  field: 'data',
  use: 'minimongo'
});

EasySearch.createSearchIndex('localModelFiles', {
  collection: ModelFiles,
  field: 'name',
  use: 'minimongo'
});
