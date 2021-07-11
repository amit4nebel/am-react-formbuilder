"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _toolbarDraggableItem = require("./toolbar-draggable-item");

var _toolbarDraggableItem2 = _interopRequireDefault(_toolbarDraggableItem);

var _UUID = require("./UUID");

var _UUID2 = _interopRequireDefault(_UUID);

var _store = require("./stores/store.js");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <Toolbar />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    var items = _this.props.items ? _this.props.items : _this._defaultItems();
    var _props$customItems = props.customItems,
        customItems = _props$customItems === undefined ? [] : _props$customItems;

    _this.state = {
      items: items.concat(customItems)
    };
    _store2.default.subscribe(function (state) {
      return _this.setState({ store: state });
    });
    return _this;
  }

  _createClass(Toolbar, [{
    key: "_defaultItems",
    value: function _defaultItems() {
      return [{
        key: "TextInput",
        //canHaveAnswer: true,
        name: "Single Line",
        label: "Single Line",
        icon: "fa fa-font",
        charLimit: "100",
        field_name: "text_input_"
      }, {
        key: "TextArea",
        //canHaveAnswer: true,
        name: "Multi-line",
        label: "Multiline",
        charLimit: "32000",
        icon: "fa fa-text-height",
        field_name: "text_area_"
      }, {
        key: "EmailInput",
        //canHaveAnswer: true,
        name: "Email Input",
        canUnique: true,
        label: "Email",
        icon: "fa fa-plus",
        field_name: "email_input_"
      }, {
        key: "PhoneInput",
        //canHaveAnswer: true,
        charLimit: "30",
        name: "Phone Input",
        label: "Phone",
        icon: "fa fa-phone",
        field_name: "phone_input_"
      }, {
        key: "Dropdown",
        //canHaveAnswer: true,
        name: "Pick List",
        icon: "fa fa-caret-square-o-down",
        label: "Pick List",
        field_name: "dropdown_",
        options: []
      }, {
        key: "Checkboxes",
        //canHaveAnswer: true,
        name: "Multi Select",
        icon: "fa fa-check-square-o",
        label: "Multi Select",
        field_name: "checkboxes_",
        options: []
      }, {
        key: "DateInput",
        //canHaveAnswer: true,
        name: "Date",
        label: "Date",
        icon: "fa fa-calendar",
        field_name: "date_input_"
      }, {
        key: "DatePicker",
        canDefaultToday: true,
        canReadOnly: true,
        name: "Date/Time",
        icon: "fa fa-calendar",
        label: "Date Time",
        field_name: "date_picker_"
      }, {
        key: "NumberInput",
        //canHaveAnswer: true,
        name: "Number",
        label: "Number",
        digitLimit: "9",
        icon: "fa fa-plus",
        field_name: "number_input_"
      }, {
        key: "AutoNumberInput",
        //canHaveAnswer: true,
        name: "Auto Number",
        label: "Auto Number",
        digitLimit: "9",
        icon: "fa fa-plus",
        field_name: "auto_number_input_"
      }, {
        key: "CurrencyInput",
        //canHaveAnswer: true,
        name: "Currency",
        label: "Currency",
        icon: "fa fa-dollar",
        field_name: "currency_input_"
      }, {
        key: "DecimalInput",
        //canHaveAnswer: true,
        name: "Decimal",
        label: "Decimal",
        icon: "fa fa-dollar",
        field_name: "decimal_input_"
      }, {
        key: "PercentInput",
        //canHaveAnswer: true,
        name: "Percent",
        label: "Percent",
        icon: "fa fa-percent",
        field_name: "percent_input_"
      }, {
        key: "LongIntegerInput",
        //canHaveAnswer: true,
        name: "Long Integer",
        label: "Long Integer",
        icon: "fa fa-arrows-h",
        field_name: "longinteger_input_"
      }, {
        key: "RadioButtons",
        //canHaveAnswer: true,
        name: "Multiple Choice",
        icon: "fa fa-dot-circle-o",
        label: "Placeholder Label",
        field_name: "radio_buttons_",
        options: []
      }, {
        key: "HyperLink",
        label: "URL",
        name: "URL",
        icon: "fa fa-link",
        static: true,
        field_name: "url_",
        href: "http://www.example.com"
      },
      // {
      //   key: 'Image',
      //   name: 'Image',
      //   label: 'Image',
      //   icon: 'fa fa-photo',
      //   field_name: 'image_',
      //   src: '',
      // },
      // {
      //   key: 'Download',
      //   name: 'File Upload',
      //   icon: 'fa fa-file',
      //   static: true,
      //   content: 'Select File ...',
      //   field_name: 'download_',
      //   file_path: '',
      //   _href: '',
      // },
      {
        key: "FileInput",
        name: "File Upload",
        icon: "fa fa-file",
        label: "Select File",
        field_name: "file_"
      }, {
        key: "Lookup",
        //canHaveAnswer: true,
        name: "Lookup",
        icon: "fa fa-tags",
        selectedOption: [],
        selectedFieldOption: [],
        label: "Lookup",
        field_name: "lookup_"
      }];
    }
  }, {
    key: "create",
    value: function create(item) {
      var elementOptions = {
        id: _UUID2.default.uuid(),
        element: item.key,
        text: item.name,
        static: item.static,
        required: false
      };

      if (item.type === "custom") {
        elementOptions["custom"] = true;
        elementOptions["props"] = item.props;
        elementOptions["component"] = item.component || null;
        elementOptions["custom_options"] = item.custom_options || [];
      }

      if (item.static) {
        elementOptions["bold"] = false;
        elementOptions["italic"] = false;
      }

      if (item.canHaveAnswer) {
        elementOptions["canHaveAnswer"] = item.canHaveAnswer;
      }

      if (item.canReadOnly) elementOptions["readOnly"] = false;

      if (item.canDefaultToday) elementOptions["defaultToday"] = false;

      if (item.content) elementOptions["content"] = item.content;

      if (item.href) elementOptions["href"] = item.href;

      if (item.key === "Image") {
        elementOptions["src"] = item.src;
      }

      if (item.key === "Download") {
        elementOptions["_href"] = item._href;
        elementOptions["file_path"] = item.file_path;
      }

      if (item.key === "Range") {
        elementOptions["step"] = item.step;
        elementOptions["default_value"] = item.default_value;
        elementOptions["min_value"] = item.min_value;
        elementOptions["max_value"] = item.max_value;
        elementOptions["min_label"] = item.min_label;
        elementOptions["max_label"] = item.max_label;
      }

      if (item.defaultValue) elementOptions["defaultValue"] = item.defaultValue;

      if (item.field_name) {
        elementOptions["field_name"] = item.field_name + _UUID2.default.uuid();
      }

      if (item.label) elementOptions["label"] = item.label;

      if (item.selectedOption) {
        elementOptions["selectedOption"] = Toolbar._defaultItemOptions(elementOptions["selectedOption"]);
      }
      /// Start Newly defined properties of field

      /// Define character limit option in field properties
      if (item.charLimit) {
        elementOptions["charLimit"] = item.charLimit;
      }

      if (item.digitLimit) {
        elementOptions["digitLimit"] = item.digitLimit;
      }

      if (item.canUnique) elementOptions["canUnique"] = false;

      if (item.relatedList) elementOptions["relatedList"] = false;

      if (item.options) {
        elementOptions["options"] = Toolbar._defaultItemOptions(elementOptions["element"]);
      }

      /// End Newly defined properties of field

      return elementOptions;
    }
  }, {
    key: "_onClick",
    value: function _onClick(item) {
      // ElementActions.createElement(this.create(item));
      _store2.default.dispatch("create", this.create(item));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: "react-form-builder-toolbar pull-left" },
        _react2.default.createElement(
          "h4",
          null,
          "New Fields"
        ),
        _react2.default.createElement(
          "ul",
          null,
          this.state.items.map(function (item) {
            return _react2.default.createElement(_toolbarDraggableItem2.default, {
              data: item,
              key: item.key,
              onClick: _this2._onClick.bind(_this2, item),
              onCreate: _this2.create
            });
          })
        )
      );
    }
  }], [{
    key: "_defaultItemOptions",
    value: function _defaultItemOptions(element) {
      switch (element) {
        case "Dropdown":
          return [{
            value: "",
            text: "",
            key: "dropdown_option_" + _UUID2.default.uuid()
          }, {
            value: "",
            text: "",
            key: "dropdown_option_" + _UUID2.default.uuid()
          }, {
            value: "",
            text: "",
            key: "dropdown_option_" + _UUID2.default.uuid()
          }];
        case "Tags":
          return [{
            value: "place_holder_tag_1",
            text: "Place holder tag 1",
            key: "tags_option_" + _UUID2.default.uuid()
          }, {
            value: "place_holder_tag_2",
            text: "Place holder tag 2",
            key: "tags_option_" + _UUID2.default.uuid()
          }, {
            value: "place_holder_tag_3",
            text: "Place holder tag 3",
            key: "tags_option_" + _UUID2.default.uuid()
          }];
        case "Checkboxes":
          return [{
            value: "place_holder_option_1",
            text: "Place holder option 1",
            key: "checkboxes_option_" + _UUID2.default.uuid()
          }, {
            value: "place_holder_option_2",
            text: "Place holder option 2",
            key: "checkboxes_option_" + _UUID2.default.uuid()
          }, {
            value: "place_holder_option_3",
            text: "Place holder option 3",
            key: "checkboxes_option_" + _UUID2.default.uuid()
          }];
        case "RadioButtons":
          return [{
            value: "place_holder_option_1",
            text: "Place holder option 1",
            key: "radiobuttons_option_" + _UUID2.default.uuid()
          }, {
            value: "place_holder_option_2",
            text: "Place holder option 2",
            key: "radiobuttons_option_" + _UUID2.default.uuid()
          }, {
            value: "place_holder_option_3",
            text: "Place holder option 3",
            key: "radiobuttons_option_" + _UUID2.default.uuid()
          }];
        // case 'Tags':
        //   return [
        //     {
        //         value: "Module1 Value",
        //         label: "Module1 Label"
        //     }
        //   ];
        default:
          return [];
      }
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

exports.default = Toolbar;