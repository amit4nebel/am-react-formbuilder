'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @fileoverview react-star-rating
 * @author @cameronjroe
 * Referenced from https://codesandbox.io/s/oq6l8ppon9
 * <StarRating
 *   name={string} - name for form input (required)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   />
 */

var StarRating = function (_React$Component) {
  _inherits(StarRating, _React$Component);

  function StarRating(props) {
    _classCallCheck(this, StarRating);

    var _this = _possibleConstructorReturn(this, (StarRating.__proto__ || Object.getPrototypeOf(StarRating)).call(this, props));

    _this.state = {
      rating: props.rating || 0,
      temp_rating: 0
    };
    return _this;
  }

  _createClass(StarRating, [{
    key: 'handleMouseover',
    value: function handleMouseover(rating) {
      var disabled = this.props.disabled;


      if (disabled) {
        return;
      }

      this.setState(function (prev) {
        return {
          rating: rating,
          temp_rating: prev.rating
        };
      });
    }
  }, {
    key: 'handleMouseout',
    value: function handleMouseout() {
      var disabled = this.props.disabled;


      if (disabled) {
        return;
      }

      this.setState(function (prev) {
        return {
          rating: prev.temp_rating
        };
      });
    }
  }, {
    key: 'rate',
    value: function rate(rating) {
      var _props = this.props,
          onRatingClick = _props.onRatingClick,
          disabled = _props.disabled;


      if (disabled) {
        return;
      }

      this.setState({
        rating: rating,
        temp_rating: rating
      });

      onRatingClick(rating);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var name = this.props.name;
      var rating = this.state.rating;

      // Restricted to 5 stars.

      var RATING_AMOUNT = 5;
      var stars = [];

      var _loop = function _loop(i) {
        var starClass = "star-rated-outline";
        var isValidRating = rating >= i + 0.5 && rating !== 0;
        if (isValidRating) {
          starClass = "star-rated";
        }

        var starStyles = {
          display: "inline-block",
          width: "15px",
          fontSize: "32px",
          overflow: "hidden"
        };

        stars.push(_react2.default.createElement(
          'span',
          {
            className: 'star', key: 'star-' + (i + 0.5),
            name: name
          },
          _react2.default.createElement(
            'span',
            {
              style: _extends({}, starStyles, {
                direction: "ltr"
              }),
              className: starClass,
              onMouseOver: function onMouseOver() {
                return _this2.handleMouseover(i + 0.5);
              },
              onClick: function onClick() {
                return _this2.rate(i + 0.5);
              },
              onMouseOut: function onMouseOut() {
                return _this2.handleMouseout();
              }
            },
            isValidRating ? _react2.default.createElement('i', { className: 'fa fa-star', 'aria-hidden': 'true' }) : _react2.default.createElement('i', { className: 'fa fa-star-o', 'aria-hidden': 'true' })
          ),
          _react2.default.createElement(
            'span',
            {
              style: _extends({}, starStyles, {
                direction: "rtl"
              }),
              className: starClass,
              onMouseOver: function onMouseOver() {
                return _this2.handleMouseover(i + 1);
              },
              onClick: function onClick() {
                return _this2.rate(i + 1);
              },
              onMouseOut: function onMouseOut() {
                return _this2.handleMouseout();
              }
            },
            rating >= i + 1 && rating !== 0 ? _react2.default.createElement('i', { className: 'fa fa-star', 'aria-hidden': 'true' }) : _react2.default.createElement('i', { className: 'fa fa-star-o', 'aria-hidden': 'true' })
          )
        ));
      };

      for (var i = 0; i < RATING_AMOUNT; i++) {
        _loop(i);
      }
      return _react2.default.createElement(
        'div',
        { className: 'rating-stars' },
        _react2.default.createElement(
          'div',
          { className: 'star-container' },
          stars,
          _react2.default.createElement(
            'span',
            { className: 'rating-number' },
            rating
          )
        )
      );
    }
  }]);

  return StarRating;
}(_react2.default.Component);

exports.default = StarRating;


StarRating.propTypes = {
  name: _propTypes2.default.string.isRequired,
  rating: _propTypes2.default.number,
  onRatingClick: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  editing: _propTypes2.default.bool
};

StarRating.defaultProps = {
  rating: 0,
  onRatingClick: function onRatingClick() {},

  disabled: false
};