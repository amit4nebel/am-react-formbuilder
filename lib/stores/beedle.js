'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./proxyPoly');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store(params) {
    _classCallCheck(this, Store);

    var self = this;

    // Add some default objects to hold our actions, mutations and state
    self.actions = {};
    self.mutations = {};
    self.state = {};

    // A status enum to set during actions and mutations
    self.status = 'resting';

    // We store callbacks for when the state changes in here
    self.callbacks = [];

    // Look in the passed params object for actions and mutations
    // that might have been passed in
    if (params.hasOwnProperty('actions')) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      self.mutations = params.mutations;
    }

    // Set our state to be a Proxy. We are setting the default state by
    // checking the params and defaulting to an empty object if no default
    // state is passed in
    self.state = new Proxy(params.initialState || {}, {
      set: function set(state, key, value) {

        // Set the value as we would normally
        state[key] = value;

        // Fire off our callback processor because if there's listeners,
        // they're going to want to know that something has changed
        self.processCallbacks(self.state);

        // Reset the status ready for the next operation
        self.status = 'resting';

        return true;
      }
    });
  }

  /**
   * A dispatcher for actions that looks in the actions
   * collection and runs the action if it can find it
   *
   * @param {string} actionKey
   * @param {mixed} payload
   * @returns {boolean}
   * @memberof Store
   */


  _createClass(Store, [{
    key: 'dispatch',
    value: function dispatch(actionKey, payload) {

      var self = this;

      // Run a quick check to see if the action actually exists
      // before we try to run it
      if (typeof self.actions[actionKey] !== 'function') {
        console.error('Action "' + actionKey + '" doesn\'t exist.');
        return false;
      }

      // Let anything that's watching the status know that we're dispatching an action
      self.status = 'action';

      // Actually call the action and pass it the Store context and whatever payload was passed
      self.actions[actionKey](self, payload);

      return true;
    }

    /**
     * Look for a mutation and modify the state object
     * if that mutation exists by calling it
     *
     * @param {string} mutationKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */

  }, {
    key: 'commit',
    value: function commit(mutationKey, payload) {
      var self = this;

      // Run a quick check to see if this mutation actually exists
      // before trying to run it
      if (typeof self.mutations[mutationKey] !== 'function') {
        console.log('Mutation "' + mutationKey + '" doesn\'t exist');
        return false;
      }

      // Let anything that's watching the status know that we're mutating state
      self.status = 'mutation';

      // Get a new version of the state by running the mutation and storing the result of it
      var newState = self.mutations[mutationKey](self.state, payload);

      // Merge the old and new together to create a new state and set it
      self.state = Object.assign(self.state, newState);

      return true;
    }

    /**
     * Fire off each callback that's run whenever the state changes
     * We pass in some data as the one and only parameter.
     * Returns a boolean depending if callbacks were found or not
     *
     * @param {object} data
     * @returns {boolean}
     */

  }, {
    key: 'processCallbacks',
    value: function processCallbacks(data) {
      var self = this;

      if (!self.callbacks.length) {
        return false;
      }

      // We've got callbacks, so loop each one and fire it off
      self.callbacks.forEach(function (callback) {
        return callback(data);
      });

      return true;
    }

    /**
     * Allow an outside entity to subscribe to state changes with a valid callback.
     * Returns boolean based on wether or not the callback was added to the collection
     *
     * @param {function} callback
     * @returns {boolean}
     */

  }, {
    key: 'subscribe',
    value: function subscribe(callback) {
      var self = this;

      if (typeof callback !== 'function') {
        console.error('You can only subscribe to Store changes with a valid function');
        return false;
      }

      // A valid function, so it belongs in our collection
      self.callbacks.push(callback);

      return true;
    }
  }]);

  return Store;
}();

exports.default = Store;