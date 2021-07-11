'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _headerBar = require('./header-bar');

var _headerBar2 = _interopRequireDefault(_headerBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomElement = function (_Component) {
  _inherits(CustomElement, _Component);

  function CustomElement(props) {
    _classCallCheck(this, CustomElement);

    var _this = _possibleConstructorReturn(this, (CustomElement.__proto__ || Object.getPrototypeOf(CustomElement)).call(this, props));

    _this.inputField = _react2.default.createRef();
    return _this;
  }

  _createClass(CustomElement, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.name = this.props.data.field_name;
      props.answerData = this.props.answerData;

      if (this.props.mutable) {
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      // Return if component is invalid.
      if (!this.props.data.component) return null;
      var Element = this.props.data.component;

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(_headerBar2.default, {
          parent: this.props.parent,
          editModeOn: this.props.editModeOn,
          data: this.props.data,
          onDestroy: this.props._onDestroy,
		  onCheckSave: this.props._onCheckSave,
          onEdit: this.props.onEdit,
          'static': this.props.data.static,
          required: this.props.data.required
        }),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: this.props.data.label } }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('hr', null),
          _react2.default.createElement(Element, _extends({ data: this.props.data }, this.props.data.props, props))
        )
      );
    }
  }]);

  return CustomElement;
}(_react.Component);

CustomElement.propTypes = {};

exports.default = CustomElement;