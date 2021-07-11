'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _headerBar = require('./header-bar');

var _headerBar2 = _interopRequireDefault(_headerBar);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _axios = require('./axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import SignaturePad from 'react-signature-canvas';
//import ReactBootstrapSlider from 'react-bootstrap-slider';

//import StarRating from './star-rating';


/// Added newly to fetch list of modules for lookup


//// This file can render the list of elements dropped in preview

var FormElements = {};
var myxss = new _xss2.default.FilterXSS({
  whiteList: {
    u: [],
    br: [],
    b: [],
    i: [],
    ol: ['style'],
    ul: ['style'],
    li: [],
    p: ['style'],
    sub: [],
    sup: [],
    div: ['style'],
    em: [],
    strong: [],
    span: ['style']
  }
});

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var headerClasses = 'dynamic-input ' + this.props.data.element + '-input';
      var classNames = 'static';
      if (this.props.data.bold) {
        classNames += ' bold';
      }
      if (this.props.data.italic) {
        classNames += ' italic';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement('h3', {
          className: classNames,
          dangerouslySetInnerHTML: {
            __html: myxss.process(this.props.data.content)
          }
        })
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

var TextInput = function (_React$Component2) {
  _inherits(TextInput, _React$Component2);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this2 = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this2.inputField = _react2.default.createRef();
    return _this2;
  }

  _createClass(TextInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'text';
      props.className = 'form-control';
      props.name = this.props.data.field_name;
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required,
            charLimit: this.props.data.charLimit
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return TextInput;
}(_react2.default.Component);

var NumberInput = function (_React$Component3) {
  _inherits(NumberInput, _React$Component3);

  function NumberInput(props) {
    _classCallCheck(this, NumberInput);

    var _this3 = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

    _this3.inputField = _react2.default.createRef();
    return _this3;
  }

  _createClass(NumberInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      // props.type = 'number';
      props.className = 'form-control';
      props.name = this.props.data.field_name;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required,
            digitLimit: this.props.data.digitLimit
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return NumberInput;
}(_react2.default.Component);

var AutoNumberInput = function (_React$Component4) {
  _inherits(AutoNumberInput, _React$Component4);

  function AutoNumberInput(props) {
    _classCallCheck(this, AutoNumberInput);

    var _this4 = _possibleConstructorReturn(this, (AutoNumberInput.__proto__ || Object.getPrototypeOf(AutoNumberInput)).call(this, props));

    _this4.inputField = _react2.default.createRef();
    return _this4;
  }

  _createClass(AutoNumberInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'auto_number';
      props.className = 'form-control';
      props.name = this.props.data.field_name;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required,
            digitLimit: this.props.data.digitLimit
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return AutoNumberInput;
}(_react2.default.Component);

var TextArea = function (_React$Component5) {
  _inherits(TextArea, _React$Component5);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this5 = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

    _this5.renderEmotions = function (emotions) {
      var sortedEmotions = Object.keys(emotions).map(function (emotion) {
        return [emotion, emotions[emotion]];
      }).sort(function (current, next) {
        return next[1] - current[1];
      });
      return _react2.default.createElement(
        'span',
        { className: 'comment-emotions' },
        sortedEmotions.map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              emotion = _ref2[0],
              score = _ref2[1];

          return _react2.default.createElement(
            'span',
            { className: 'emotion-wrapper', key: emotion },
            _react2.default.createElement(
              'span',
              { className: 'emotion-name' },
              emotion.charAt(0).toUpperCase() + emotion.slice(1)
            ),
            _react2.default.createElement(
              'span',
              { className: 'emotion-bar' },
              _react2.default.createElement('span', {
                style: {
                  width: score * 100 + '%'
                }
              })
            ),
            Number.parseFloat(score).toFixed(2)
          );
        })
      );
    };

    _this5.inputField = _react2.default.createRef();
    return _this5;
  }

  _createClass(TextArea, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.className = 'form-control';
      props.name = this.props.data.field_name;

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      var sentimentalClass = '';
      var isSentimentAdded = !!this.props.data.sentiment && !!this.props.data.sentiment.label;
      var isEmotionsExist = isSentimentAdded && !!this.props.data.sentiment.emotions && !!Object.keys(this.props.data.sentiment.emotions).length;

      if (isSentimentAdded) {
        sentimentalClass = '' + this.props.data.sentiment.label.toLowerCase();
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            ),
            isSentimentAdded && _react2.default.createElement(
              'span',
              { className: 'form-text-area-sentiment ' + sentimentalClass },
              _react2.default.createElement('span', { className: 'sentimental-dot' }),
              '\xA0',
              this.props.data.sentiment.label + ' (' + this.props.data.sentiment.score + ') Net Sentiment Score'
            ),
            isEmotionsExist && _react2.default.createElement(
              'div',
              { style: { display: 'block' } },
              this.renderEmotions(this.props.data.sentiment.emotions)
            )
          ),
          _react2.default.createElement('textarea', _extends({}, props, { rows: '8' }))
        )
      );
    }
  }]);

  return TextArea;
}(_react2.default.Component);

var DatePicker = function (_React$Component6) {
  _inherits(DatePicker, _React$Component6);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this6 = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

    _this6.handleChange = function (dt) {
      if (dt && dt.target) {
        var placeholder = dt && dt.target && dt.target.value === '' ? 'mm/dd/yyyy' : '';
        var formattedDate = dt.target.value ? (0, _moment2.default)(dt.target.value).format('YYYY-MM-DD') : '';

        _this6.setState({
          value: formattedDate,
          internalValue: formattedDate,
          placeholder: placeholder
        });
      } else {
        _this6.setState({
          value: dt ? dt.format('MM/DD/YYYY') : '',
          internalValue: dt,
          placeholder: placeholder
        });
      }
    };

    _this6.inputField = _react2.default.createRef();
    var value = void 0,
        internalValue = void 0;

    if (props.data.defaultToday && (props.defaultValue === '' || props.defaultValue === undefined)) {
      value = (0, _moment2.default)().format('MM/DD/YYYY');
      internalValue = (0, _moment2.default)();
    } else {
      value = props.defaultValue;

      if (props.defaultValue !== '' && props.defaultValue !== undefined) {
        internalValue = (0, _moment2.default)(value, 'MM/DD/YYYY');
      }
    }

    _this6.state = {
      value: value,
      internalValue: internalValue,
      placeholder: 'mm/dd/yyyy',
      defaultToday: props.data.defaultToday
    };
    return _this6;
  }

  _createClass(DatePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.data.defaultToday && !this.state.defaultToday) {
        this.state.value = (0, _moment2.default)().format('MM/DD/YYYY');
        this.state.internalValue = (0, _moment2.default)(this.state.value);
      } else if (!this.props.data.defaultToday && this.state.defaultToday) {
        this.state.value = '';
        this.state.internalValue = undefined;
      }

      this.state.defaultToday = this.props.data.defaultToday;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'date';
      props.className = 'form-control';
      props.name = this.props.data.field_name;

      var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            this.props.data.readOnly && _react2.default.createElement('input', {
              type: 'text',
              name: props.name,
              ref: this.inputField,
              readOnly: 'true',
              dateFormat: 'MM/DD/YYYY',
              placeholder: this.state.placeholder,
              value: this.state.value,
              className: 'form-control'
            }),
            iOS && !this.props.data.readOnly && _react2.default.createElement('input', {
              type: 'date',
              name: props.name,
              ref: this.inputField,
              onChange: this.handleChange,
              dateFormat: 'MM/DD/YYYY',
              placeholder: this.state.placeholder,
              value: this.state.value,
              className: 'form-control',
              readOnly: this.props.read_only
            }),
            !iOS && !this.props.data.readOnly && _react2.default.createElement(_reactDatepicker2.default, {
              name: props.name,
              ref: this.inputField,
              onChange: this.handleChange,
              selected: this.state.internalValue,
              todayButton: 'Today',
              className: 'form-control',
              isClearable: !this.props.read_only,
              dateFormat: 'MM/DD/YYYY',
              placeholderText: 'mm/dd/yyyy',
              dropdownMode: 'scroll',
              disabled: this.props.read_only,
              readOnly: this.props.read_only
            })
          )
        )
      );
    }
  }]);

  return DatePicker;
}(_react2.default.Component);

var Dropdown = function (_React$Component7) {
  _inherits(Dropdown, _React$Component7);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this7 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this7.inputField = _react2.default.createRef();
    return _this7;
  }

  _createClass(Dropdown, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.className = 'form-control';
      props.name = this.props.data.field_name;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement(
            'select',
            props,
            this.props.data.options.map(function (option) {
              var this_key = 'preview_' + option.key;
              return _react2.default.createElement(
                'option',
                { value: option.value, key: this_key },
                option.text
              );
            })
          )
        )
      );
    }
  }]);

  return Dropdown;
}(_react2.default.Component);

var Checkboxes = function (_React$Component8) {
  _inherits(Checkboxes, _React$Component8);

  function Checkboxes(props) {
    _classCallCheck(this, Checkboxes);

    var _this8 = _possibleConstructorReturn(this, (Checkboxes.__proto__ || Object.getPrototypeOf(Checkboxes)).call(this, props));

    _this8.options = {};
    return _this8;
  }

  _createClass(Checkboxes, [{
    key: 'render',
    value: function render() {
      var _this9 = this;

      var self = this;
      var classNames = 'checkbox-label';
      if (this.props.data.inline) {
        classNames += ' option-inline';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          this.props.data.options.map(function (option) {
            var this_key = 'preview_' + option.key;
            var props = {};
            props.name = 'option_' + option.key;

            props.type = 'checkbox';
            props.value = option.value;

            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
            }

            if (_this9.props.read_only) {
              props.disabled = 'disabled';
              props.defaultChecked = self.props.defaultValue.indexOf(option.key) > -1 ? true : false;
            }

            return _react2.default.createElement(
              'label',
              { className: classNames, key: this_key },
              _react2.default.createElement('input', _extends({
                ref: function ref(c) {
                  if (c && self.props.mutable) {
                    self.options['child_ref_' + option.key] = c;
                  }
                }
              }, props)),
              option.text
            );
          })
        )
      );
    }
  }]);

  return Checkboxes;
}(_react2.default.Component);

var RadioButtons = function (_React$Component9) {
  _inherits(RadioButtons, _React$Component9);

  function RadioButtons(props) {
    _classCallCheck(this, RadioButtons);

    var _this10 = _possibleConstructorReturn(this, (RadioButtons.__proto__ || Object.getPrototypeOf(RadioButtons)).call(this, props));

    _this10.options = {};
    return _this10;
  }

  _createClass(RadioButtons, [{
    key: 'render',
    value: function render() {
      var _this11 = this;

      var self = this;
      var classNames = 'radio-label';
      if (this.props.data.inline) {
        classNames += ' option-inline';
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          this.props.data.options.map(function (option) {
            var this_key = 'preview_' + option.key;
            var props = {};
            props.name = self.props.data.field_name;

            props.type = 'radio';
            props.value = option.value;

            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
            }

            if (_this11.props.read_only) {
              props.disabled = 'disabled';
              props.defaultChecked = self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.key) > -1 ? true : false;
            }
            return _react2.default.createElement(
              'label',
              { className: classNames, key: this_key },
              _react2.default.createElement('input', _extends({
                ref: function ref(c) {
                  if (c && self.props.mutable) {
                    self.options['child_ref_' + option.key] = c;
                  }
                }
              }, props)),
              ' ',
              option.text
            );
          })
        )
      );
    }
  }]);

  return RadioButtons;
}(_react2.default.Component);

var Image = function (_React$Component10) {
  _inherits(Image, _React$Component10);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      var style = this.props.data.center ? { textAlign: 'center' } : null;

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses, style: style },
        !this.props.mutable && _react2.default.createElement(_headerBar2.default, {
          parent: this.props.parent,
          editModeOn: this.props.editModeOn,
          data: this.props.data,
          onDestroy: this.props._onDestroy,
		  onCheckSave: this.props._onCheckSave,
          onEdit: this.props.onEdit,
          required: this.props.data.required
        }),
        this.props.data.src && _react2.default.createElement('img', {
          src: this.props.data.src,
          width: this.props.data.width,
          height: this.props.data.height
        }),
        !this.props.data.src && _react2.default.createElement(
          'div',
          { className: 'no-image' },
          'No Image'
        )
      );
    }
  }]);

  return Image;
}(_react2.default.Component);

var HyperLink = function (_React$Component11) {
  _inherits(HyperLink, _React$Component11);

  function HyperLink(props) {
    _classCallCheck(this, HyperLink);

    var _this13 = _possibleConstructorReturn(this, (HyperLink.__proto__ || Object.getPrototypeOf(HyperLink)).call(this, props));

    _this13.inputField = _react2.default.createRef();
    return _this13;
  }

  _createClass(HyperLink, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'text';
      props.className = 'form-control';
      props.name = this.props.data.field_name;
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required,
            charLimit: this.props.data.charLimit
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return HyperLink;
}(_react2.default.Component);

var Download = function (_React$Component12) {
  _inherits(Download, _React$Component12);

  function Download() {
    _classCallCheck(this, Download);

    return _possibleConstructorReturn(this, (Download.__proto__ || Object.getPrototypeOf(Download)).apply(this, arguments));
  }

  _createClass(Download, [{
    key: 'render',
    value: function render() {
      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'a',
            { href: this.props.download_path + '?id=' + this.props.data.file_path },
            this.props.data.content
          )
        )
      );
    }
  }]);

  return Download;
}(_react2.default.Component);

var FileInput = function (_React$Component13) {
  _inherits(FileInput, _React$Component13);

  function FileInput(props) {
    _classCallCheck(this, FileInput);

    var _this15 = _possibleConstructorReturn(this, (FileInput.__proto__ || Object.getPrototypeOf(FileInput)).call(this, props));

    _this15.displayImage = function (e) {
      var self = _this15;
      var target = e.target;
      var file, reader;

      if (target.files && target.files.length) {
        file = target.files[0];
        reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
          self.setState({
            img: reader.result
          });
        };
      }
    };

    _this15.clearImage = function () {
      _this15.setState({
        img: null
      });
    };

    _this15.inputField = _react2.default.createRef();
    _this15.state = { img: null };
    return _this15;
  }

  _createClass(FileInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'hidden';
      props.name = this.props.data.field_name;

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      if (this.props.mutable) {
        props.defaultValue = this.state.img || this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            this.props.data.label,
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'image-upload-container' },
            !this.state.img && _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('input', {
                type: 'file',
                accept: '*',
                capture: 'camera',
                className: 'image-upload',
                onChange: this.displayImage
              }),
              _react2.default.createElement(
                'div',
                { className: 'image-upload-control' },
                _react2.default.createElement(
                  'div',
                  { className: 'btn btn-default btn-school' },
                  _react2.default.createElement('i', { className: 'fa fa-file' }),
                  ' Select File'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  'Select file from your computer or device.'
                )
              )
            ),
            this.state.img && _react2.default.createElement(
              'div',
              { className: 'form-inline' },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(
                  'a',
                  { href: this.state.img },
                  'File Name'
                ),
                _react2.default.createElement('input', _extends({ type: 'hidden' }, props)),
                _react2.default.createElement(
                  'div',
                  { className: 'btn btn-school btn-image-clear', onClick: this.clearImage },
                  _react2.default.createElement('i', { className: 'fa fa-times' }),
                  ' Clear File'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return FileInput;
}(_react2.default.Component);

/////// Newly Added Elements Starts here
/*
EmailInput,PhoneInput,CurrencyInput,DecimalInput,PercentInput,LongIntegerInput,DateInput,
*/

var EmailInput = function (_React$Component14) {
  _inherits(EmailInput, _React$Component14);

  function EmailInput(props) {
    _classCallCheck(this, EmailInput);

    var _this16 = _possibleConstructorReturn(this, (EmailInput.__proto__ || Object.getPrototypeOf(EmailInput)).call(this, props));

    _this16.inputField = _react2.default.createRef();
    return _this16;
  }

  _createClass(EmailInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'text';
      props.className = 'form-control';
      props.name = this.props.data.field_name;
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required,
            canUnique: this.props.data.canUnique
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            ),
            this.props.data.hasOwnProperty('canUnique') && this.props.data.canUnique === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-warning' },
              'Unique'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return EmailInput;
}(_react2.default.Component);

var PhoneInput = function (_React$Component15) {
  _inherits(PhoneInput, _React$Component15);

  function PhoneInput(props) {
    _classCallCheck(this, PhoneInput);

    var _this17 = _possibleConstructorReturn(this, (PhoneInput.__proto__ || Object.getPrototypeOf(PhoneInput)).call(this, props));

    _this17.inputField = _react2.default.createRef();
    return _this17;
  }

  _createClass(PhoneInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'text';
      props.className = 'form-control';
      props.name = this.props.data.field_name;
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required,
            charLimit: this.props.data.charLimit
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return PhoneInput;
}(_react2.default.Component);

var CurrencyInput = function (_React$Component16) {
  _inherits(CurrencyInput, _React$Component16);

  function CurrencyInput(props) {
    _classCallCheck(this, CurrencyInput);

    var _this18 = _possibleConstructorReturn(this, (CurrencyInput.__proto__ || Object.getPrototypeOf(CurrencyInput)).call(this, props));

    _this18.inputField = _react2.default.createRef();
    return _this18;
  }

  _createClass(CurrencyInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'text';
      props.className = 'form-control';
      props.name = this.props.data.field_name;
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return CurrencyInput;
}(_react2.default.Component);

var DecimalInput = function (_React$Component17) {
  _inherits(DecimalInput, _React$Component17);

  function DecimalInput(props) {
    _classCallCheck(this, DecimalInput);

    var _this19 = _possibleConstructorReturn(this, (DecimalInput.__proto__ || Object.getPrototypeOf(DecimalInput)).call(this, props));

    _this19.inputField = _react2.default.createRef();
    return _this19;
  }

  _createClass(DecimalInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'text';
      props.className = 'form-control';
      props.name = this.props.data.field_name;
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return DecimalInput;
}(_react2.default.Component);

var PercentInput = function (_React$Component18) {
  _inherits(PercentInput, _React$Component18);

  function PercentInput(props) {
    _classCallCheck(this, PercentInput);

    var _this20 = _possibleConstructorReturn(this, (PercentInput.__proto__ || Object.getPrototypeOf(PercentInput)).call(this, props));

    _this20.inputField = _react2.default.createRef();
    return _this20;
  }

  _createClass(PercentInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'text';
      props.className = 'form-control';
      props.name = this.props.data.field_name;
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return PercentInput;
}(_react2.default.Component);

var LongIntegerInput = function (_React$Component19) {
  _inherits(LongIntegerInput, _React$Component19);

  function LongIntegerInput(props) {
    _classCallCheck(this, LongIntegerInput);

    var _this21 = _possibleConstructorReturn(this, (LongIntegerInput.__proto__ || Object.getPrototypeOf(LongIntegerInput)).call(this, props));

    _this21.inputField = _react2.default.createRef();
    return _this21;
  }

  _createClass(LongIntegerInput, [{
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'text';
      props.className = 'form-control';
      props.name = this.props.data.field_name;
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement('input', props)
        )
      );
    }
  }]);

  return LongIntegerInput;
}(_react2.default.Component);

var DateInput = function (_React$Component20) {
  _inherits(DateInput, _React$Component20);

  function DateInput(props) {
    _classCallCheck(this, DateInput);

    var _this22 = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

    _this22.handleChange = function (dt) {
      if (dt && dt.target) {
        var placeholder = dt && dt.target && dt.target.value === '' ? 'mm/dd/yyyy' : '';
        var formattedDate = dt.target.value ? (0, _moment2.default)(dt.target.value).format('YYYY-MM-DD') : '';

        _this22.setState({
          value: formattedDate,
          internalValue: formattedDate,
          placeholder: placeholder
        });
      } else {
        _this22.setState({
          value: dt ? dt.format('MM/DD/YYYY') : '',
          internalValue: dt,
          placeholder: placeholder
        });
      }
    };

    _this22.inputField = _react2.default.createRef();
    var value = void 0,
        internalValue = void 0;

    if (props.data.defaultToday && (props.defaultValue === '' || props.defaultValue === undefined)) {
      value = (0, _moment2.default)().format('MM/DD/YYYY');
      internalValue = (0, _moment2.default)();
    } else {
      value = props.defaultValue;

      if (props.defaultValue !== '' && props.defaultValue !== undefined) {
        internalValue = (0, _moment2.default)(value, 'MM/DD/YYYY');
      }
    }

    _this22.state = {
      value: value,
      internalValue: internalValue,
      placeholder: 'mm/dd/yyyy',
      defaultToday: props.data.defaultToday
    };
    return _this22;
  }

  _createClass(DateInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.data.defaultToday && !this.state.defaultToday) {
        this.state.value = (0, _moment2.default)().format('MM/DD/YYYY');
        this.state.internalValue = (0, _moment2.default)(this.state.value);
      } else if (!this.props.data.defaultToday && this.state.defaultToday) {
        this.state.value = '';
        this.state.internalValue = undefined;
      }

      this.state.defaultToday = this.props.data.defaultToday;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = {};
      props.type = 'date';
      props.className = 'form-control';
      props.name = this.props.data.field_name;

      var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            this.props.data.readOnly && _react2.default.createElement('input', {
              type: 'text',
              name: props.name,
              ref: this.inputField,
              readOnly: 'true',
              dateFormat: 'MM/DD/YYYY',
              placeholder: this.state.placeholder,
              value: this.state.value,
              className: 'form-control'
            }),
            iOS && !this.props.data.readOnly && _react2.default.createElement('input', {
              type: 'date',
              name: props.name,
              ref: this.inputField,
              onChange: this.handleChange,
              dateFormat: 'MM/DD/YYYY',
              placeholder: this.state.placeholder,
              value: this.state.value,
              className: 'form-control',
              readOnly: this.props.read_only
            }),
            !iOS && !this.props.data.readOnly && _react2.default.createElement(_reactDatepicker2.default, {
              name: props.name,
              ref: this.inputField,
              onChange: this.handleChange,
              selected: this.state.internalValue,
              todayButton: 'Today',
              className: 'form-control',
              isClearable: !this.props.read_only,
              dateFormat: 'MM/DD/YYYY',
              placeholderText: 'mm/dd/yyyy',
              dropdownMode: 'scroll',
              disabled: this.props.read_only,
              readOnly: this.props.read_only
            })
          )
        )
      );
    }
  }]);

  return DateInput;
}(_react2.default.Component);

var Tags = function (_React$Component21) {
  _inherits(Tags, _React$Component21);

  function Tags(props) {
    _classCallCheck(this, Tags);

    var _this23 = _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).call(this, props));

    _this23.getDefaultValue = function () {
      if (_this23.props.defaultValue !== undefined) {
        var selectedValues = _this23.props.defaultValue.split(',');
        return _this23.props.data.options.filter(function (_ref3) {
          var label = _ref3.label,
              value = _ref3.value;
          return selectedValues.includes(value);
        });
      } else {
        return [];
      }
    };

    _this23.state = {
      value: _this23.getDefaultValue()
    };

    _this23.handleChange = function (e) {
      _this23.setState({ value: e });
    };

    _this23.inputField = _react2.default.createRef();
    return _this23;
  }

  _createClass(Tags, [{
    key: 'componentDidCatch',
    value: function componentDidCatch(e) {
      console.log(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var options = this.props.data.options.map(function (option) {
        option.label = option.text;
        return option;
      });

      var props = {};
      props.isMulti = true;
      props.name = this.props.data.field_name;
      props.onChange = this.handleChange;

      props.options = options;
      if (!this.props.mutable) {
        props.value = options[0].text;
      } // to show a sample of what tags looks like
      if (this.props.mutable) {
        props.value = this.state.value;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.isDisabled = true;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            'static': this.props.data.static,
            required: this.props.data.required,
            relatedList: this.props.data.relatedList
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement(_reactSelect2.default, props)
        )
      );
    }
  }]);

  return Tags;
}(_react2.default.Component);

var Lookup = function (_React$Component22) {
  _inherits(Lookup, _React$Component22);

  function Lookup(props) {
    _classCallCheck(this, Lookup);

    var _this24 = _possibleConstructorReturn(this, (Lookup.__proto__ || Object.getPrototypeOf(Lookup)).call(this, props));

    _this24.getDefaultValue = function () {
      if (_this24.props.defaultValue !== undefined) {
        var selectedValues = _this24.props.defaultValue.split(',');
        return _this24.props.data.options.filter(function (_ref4) {
          var label = _ref4.label,
              value = _ref4.value;
          return selectedValues.includes(value);
        });
      } else {
        return [];
      }
    };

    _this24.state = {
      value: '123456789',
      modulesData: _this24.getLookupData()
    };

    _this24.handleChange = function (e) {
      console.log("Handling value", e);
      _this24.setState({ value: e.value });
      //this.props.value = e.value;
    };

    _this24.inputField = _react2.default.createRef();
    _this24.getLookupData = _this24.getLookupData.bind(_this24);
    return _this24;
  }

  _createClass(Lookup, [{
    key: 'getLookupData',
    value: function getLookupData() {
      var _this25 = this;

      //console.log("getting this.props :",this.props.data);
      if (this.props.data.selectedOption.value && this.props.data.selectedOption.value != '' && this.props.data.selectedOption.value != 'undefined' && this.props.data.selectedFieldOption.value && this.props.data.selectedFieldOption.value != '' && this.props.data.selectedFieldOption.value != 'undefined') {
        var moduleId = this.props.data.selectedOption.value;
        var fieldId = this.props.data.selectedFieldOption.value;
        _axios2.default.get("/getLookupOptions/" + moduleId + "/" + fieldId).then(function (response) {
          var modulesData = response.data.data.map(function (moduldata) {
            return { value: moduldata.name, label: moduldata.value };
          });
          _this25.setState({ modulesData: modulesData });
          console.log("Lookup Actual field Data :", modulesData);
          return modulesData;
        }).catch(function (error) {
          return _this25.setState({ error: error });
        });
      }
    }
  }, {
    key: 'componentDidCatch',
    value: function componentDidCatch(e) {
      console.log(e);
    }
  }, {
    key: 'render',
    value: function render() {
      //console.log("this.props.data is:",this.props.data);
      //console.log("modulesData is:",this.state.modulesData);
      // let options = this.props.data.options.map(option => {
      //   option.label = option.text;
      //   return option;
      // });


      var props = {};
      var options = this.state.modulesData;
      //this.getLookupData();
      //console.log("options is:",options);

      //props.isMulti = true;
      props.name = this.props.data.field_name;
      props.onChange = this.handleChange;

      props.options = options;
      // if (!this.props.mutable) {
      //   props.value = options[0].text;
      // } // to show a sample of what tags looks like

      if (this.props.mutable) {
        props.value = this.state.value.value;
        props.value = "0987654";
        console.log("comin in 1751", this.state.value.value);
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.isDisabled = true;
      }

      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return _react2.default.createElement(
        'div',
        { className: baseClasses },
        !this.props.mutable && _react2.default.createElement(
          'div',
          null,
          this.props.data.pageBreakBefore && _react2.default.createElement(
            'div',
            { className: 'preview-page-break' },
            'Page Break'
          ),
          _react2.default.createElement(_headerBar2.default, {
            parent: this.props.parent,
            editModeOn: this.props.editModeOn,
            data: this.props.data,
            onDestroy: this.props._onDestroy,
			onCheckSave: this.props._onCheckSave,
            onEdit: this.props.onEdit,
            options: this.props.options,
            required: this.props.data.required
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'form-label' },
            _react2.default.createElement('span', {
              dangerouslySetInnerHTML: {
                __html: myxss.process(this.props.data.label)
              }
            }),
            this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only && _react2.default.createElement(
              'span',
              { className: 'label-required label label-danger' },
              'Required'
            )
          ),
          _react2.default.createElement(_reactSelect2.default, props)
        )
      );
    }
  }]);

  return Lookup;
}(_react2.default.Component);
// FormElements.Header = Header;
// FormElements.Paragraph = Paragraph;
// FormElements.Label = Label;
// FormElements.LineBreak = LineBreak;


FormElements.TextInput = TextInput;
FormElements.NumberInput = NumberInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
//FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = DatePicker;
FormElements.RadioButtons = RadioButtons;
FormElements.Image = Image;
//FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download; /// File upload
FormElements.FileInput = FileInput;

//FormElements.Range = Range;

//// New Form Fields 
/*
EmailInput,PhoneInput,CurrencyInput,DecimalInput,PercentInput,LongIntegerInput,DateInput,Lookup
*/

FormElements.EmailInput = EmailInput;
FormElements.PhoneInput = PhoneInput;
FormElements.CurrencyInput = CurrencyInput;
FormElements.DecimalInput = DecimalInput;
FormElements.PercentInput = PercentInput;
FormElements.LongIntegerInput = LongIntegerInput;
FormElements.DateInput = DateInput;
FormElements.AutoNumberInput = AutoNumberInput;
FormElements.Lookup = Lookup;

module.exports = FormElements;