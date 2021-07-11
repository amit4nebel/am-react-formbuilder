"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dynamicOptionList = require("./dynamic-option-list");

var _dynamicOptionList2 = _interopRequireDefault(_dynamicOptionList);

var _reactTextareaAutosize = require("react-textarea-autosize");

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Async = require("react-select/lib/Async");

var _Async2 = _interopRequireDefault(_Async);

var _dropdown = require("primereact/dropdown");

var _draftJs = require("draft-js");

var _draftjsToHtml = require("draftjs-to-html");

var _draftjsToHtml2 = _interopRequireDefault(_draftjsToHtml);

var _reactDraftWysiwyg = require("react-draft-wysiwyg");

var _axios = require("./axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/// Added newly to fetch list of modules for lookup


var toolbar = {
  options: ["inline", "list", "textAlign", "fontSize", "link", "history"],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ["bold", "italic", "underline", "superscript", "subscript"]
  }
};

var FormElementsEdit = function (_React$Component) {
  _inherits(FormElementsEdit, _React$Component);

  function FormElementsEdit(props) {
    _classCallCheck(this, FormElementsEdit);

    var _this = _possibleConstructorReturn(this, (FormElementsEdit.__proto__ || Object.getPrototypeOf(FormElementsEdit)).call(this, props));

    _this.handleChange = function (selectedOption) {
      _this.setState({
        selectedOption: selectedOption,
        dirty: true
      }, function () {
        //this.updateElement();
        _this.editSelectProp(_this, _this.state.selectedOption, 1);
      });
      _this.getModuleFields(selectedOption);
      console.log("Option selected:", selectedOption);
    };

    _this.handleFieldChange = function (selectedFieldOption) {
      _this.setState({
        selectedFieldOption: selectedFieldOption,
        dirty: true
      }, function () {
        //this.updateElement();
        _this.editSelectProp(_this, _this.state.selectedFieldOption, 2);
      });
      console.log("Option2 selected:", selectedFieldOption);
    };

    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false,
      isUrlValid: false,
      //selectedOption: null,
      selectOptions: [{ value: "chocolate", label: "Chocolate" }, { value: "strawberry", label: "Strawberry" }, { value: "vanilla", label: "Vanilla" }],
      moduleListData: [],
      moduleFields: [],

      selectedOption: _this.props.defaultValue,
      selectedFieldOption: null,
      actionOnSelectedOption: props.actionOnSelectedOption
    };
    _this.getModulesData = _this.getModulesData.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);

    _this.getModuleFields = _this.getModuleFields.bind(_this);
    _this.handleFieldChange = _this.handleFieldChange.bind(_this);

    _this.getModuleDefaultValue = _this.getModuleDefaultValue.bind(_this);
    //this.loadOptions = this.loadOptions.bind(this);
    //this.noOptionsMessage = this.noOptionsMessage.bind(this);
    //this.handleInputChange = this.handleInputChange.bind(this);
    return _this;
  }

  _createClass(FormElementsEdit, [{
    key: "toggleRequired",
    value: function toggleRequired() {
      var this_element = this.state.element;
    }
  }, {
    key: "editElementProp",
    value: function editElementProp(elemProperty, targProperty, e) {
      var _this2 = this;

      console.log(elemProperty);
      console.log(targProperty);
      console.log(e.target[targProperty]);

      if (elemProperty === "urllimit") {
        if (e.target[targProperty] > 450) {
          this.setState({ isUrlValid: "Only 450 characters are allowed" });
        } else if (!/^-?\d*$/.test(e.target[targProperty])) {
          this.setState({ isUrlValid: "Only numbers are allowed" });
        } else {
          this.setState({ isUrlValid: false });
        }
      }
      // elemProperty could be content or label
      // targProperty could be value or checked
      var this_element = this.state.element;
      this_element[elemProperty] = !!e.value ? e.value : e.target[targProperty];

      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        if (targProperty === "checked") {
          _this2.updateElement();
        }
      });
    }
  }, {
    key: "editSelectProp",
    value: function editSelectProp(elemProperty, values) {
      var _this3 = this;

      var lookup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // elemProperty could be content or label
      // targProperty could be value or checked
      var this_element = this.state.element;
      // console.log(
      //   "lookup:",
      //   lookup,
      //   "elemProperty is:",
      //   elemProperty + " values" + JSON.stringify(values)
      // );
      if (values === undefined || values === null || values === "") {
        this_element[elemProperty] = "";
      } else {
        if (Array.isArray(values)) {
          this_element[elemProperty] = values.map(function (value) {
            return (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? value.value : value;
          });
          //console.log("In if");
        } else {
          if (lookup == 1) {
            this_element["selectedOption"] = values;
          } else if (lookup == 2) {
            this_element["selectedFieldOption"] = values;
          } else {
            this_element[elemProperty] = values.value;
          }

          //this_element[elemProperty] = values.value;
          //console.log("In else", this_element);
          //this_element
        }
      }
      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        _this3.updateElement();
      });
    }

    //function which is called the first time the component loads

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getModulesData();
    }

    //function which is called after the component reload with props change
    // componentDidUpdate(prevProps) {
    //   this.getModulesData();
    // }

    ///// For module select list


    ///// For module fields select list

  }, {
    key: "onEditorStateChange",
    value: function onEditorStateChange(index, property, editorContent) {
      var html = (0, _draftjsToHtml2.default)((0, _draftJs.convertToRaw)(editorContent.getCurrentContent())).replace(/<p>/g, "<div>").replace(/<\/p>/g, "</div>");
      var this_element = this.state.element;
      this_element[property] = html;

      this.setState({
        element: this_element,
        dirty: true
      });
    }

    /// Update Element when properties are validated by the validation rules

  }, {
    key: "updateElement",
    value: function updateElement() {
      var this_element = this.state.element;
      // to prevent ajax calls with no change
      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({ dirty: false });
      }
    }

    /// Validate Element
    /* 
    validateElement(element, matchProperty, matchValue) {
      let this_element = this.state.element;
      // to prevent ajax calls with no change
      console.log("in validate element is:", this_element);
       let errors = "";
      //const matchProperty = 'Papayas';
       switch (matchProperty) {
        case "charLimit":
          console.log("Oranges are $0.59 a pound.");
          break;
        case "Mangoes":
        case "Papayas":
          console.log("Mangoes and papayas are $2.79 a pound.");
          // expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        default:
          console.log("Sorry, we are out of " + matchProperty + ".");
      }
       // if (this.state.dirty) {
      //   this.props.updateElement.call(this.props.preview, this_element);
      //   this.setState({ dirty: false });
      // }
    } */

  }, {
    key: "convertFromHTML",
    value: function convertFromHTML(content) {
      var newContent = (0, _draftJs.convertFromHTML)(content);
      if (!newContent.contentBlocks) {
        // to prevent crash when no contents in editor
        return _draftJs.EditorState.createEmpty();
      }
      var contentState = _draftJs.ContentState.createFromBlockArray(newContent);
      return _draftJs.EditorState.createWithContent(contentState);
    }

    // function to render the side panel

  }, {
    key: "layoutSidePanel",
    value: function layoutSidePanel(index, moduledata) {
      // return (
      //   <li key={index} className="setupleftmenutd">
      //     <Link to={"/settings/modules/" + encodeURIComponent(moduledata.plural) + "/layout"}  >{moduledata.plural}</Link>
      //   </li>
      // )
      return _react2.default.createElement(
        "option",
        { value: moduledata._id, key: moduledata._id },
        moduledata.plural
      );
    }
  }, {
    key: "getModuleDefaultValue",
    value: function getModuleDefaultValue() {
      if (this.state.selectedOption) {
        console.log("this.props.data is:", this.props.data);
        console.log("this element is :", this.props.element);
        console.log("In if getModuleDefaultValue:", this.state.selectedOption);
      } else {
        console.log("in else getModuleDefaultValue:", this.state.selectedOption);
      }
    }

    /// Get the list of modules from API

  }, {
    key: "getModulesData",
    value: function getModulesData() {
      var _this4 = this;

      _axios2.default.get("/getAllModules").then(function (response) {
        var moduleListData = response.data.data.map(function (moduldata) {
          return {
            value: moduldata._id,
            label: moduldata.plural
          };
        });
        _this4.setState({ moduleListData: moduleListData });
        console.log("In module List:", moduleListData);
      }).catch(function (error) {
        return _this4.setState({ error: error });
      });
    }

    /// get Selected Module fields list from API

  }, {
    key: "getModuleFields",
    value: function getModuleFields(selectedModule) {
      var _this5 = this;

      if (selectedModule && selectedModule != "undefined") {
        console.log("Selected module value is:", selectedModule.value);
        _axios2.default.get("/getLookupFields/" + selectedModule.value).then(function (response) {
          var moduleFields = response.data.data.map(function (moduldata) {
            return {
              value: moduldata.field_name,
              label: moduldata.label
            };
          });
          _this5.setState({ moduleFields: moduleFields });
          console.log("In moduleFields:", moduleFields);
        }).catch(function (error) {
          return _this5.setState({ error: error });
        });
      } else {
        console.log("In getModuleFields else");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _props = this.props,
          defaultOptions = _props.defaultOptions,
          placeholder = _props.placeholder;
      //const { selectedOption } = this.state;

      var this_checked = this.props.element.hasOwnProperty("required") ? this.props.element.required : false;
      var this_read_only = this.props.element.hasOwnProperty("readOnly") ? this.props.element.readOnly : false;
      var this_default_today = this.props.element.hasOwnProperty("defaultToday") ? this.props.element.defaultToday : false;
      var this_checked_inline = this.props.element.hasOwnProperty("inline") ? this.props.element.inline : false;
      var this_checked_bold = this.props.element.hasOwnProperty("bold") ? this.props.element.bold : false;
      var this_checked_italic = this.props.element.hasOwnProperty("italic") ? this.props.element.italic : false;
      var this_checked_center = this.props.element.hasOwnProperty("center") ? this.props.element.center : false;
      var this_checked_page_break = this.props.element.hasOwnProperty("pageBreakBefore") ? this.props.element.pageBreakBefore : false;

      var this_urllimit = this.props.element.hasOwnProperty("urllimit") ? this.props.element.urllimit : "450";

      var this_checked_alternate_form = this.props.element.hasOwnProperty("alternateForm") ? this.props.element.alternateForm : false;

      /* Start Newly defined properties */

      var this_char_limit = this.props.element.hasOwnProperty("charLimit") ? this.props.element.charLimit : false;

      var this_currency_limit = this.props.element.hasOwnProperty("currencyDigitLimit") ? this.props.element.currencyDigitLimit : "0";

      var this_deciaml_limit = this.props.element.hasOwnProperty("decimalLimit") ? this.props.element.decimalLimit : "0";

      var this_digit_limit = this.props.element.hasOwnProperty("digitLimit") ? this.props.element.digitLimit : false;

      var this_checked_unique = this.props.element.hasOwnProperty("canUnique") ? this.props.element.canUnique : false;

      // let this_related = this.props.element.hasOwnProperty('relatedList')
      //   ? this.props.element.relatedList
      //   : false;

      /* End Newly defined properties */

      var this_files = this.props.files.length ? this.props.files : [];
      if (this_files.length < 1 || this_files.length > 0 && this_files[0].id !== "") {
        this_files.unshift({
          id: "",
          file_name: ""
        });
      }

      var editorState = void 0;
      if (this.props.element.hasOwnProperty("content")) {
        editorState = this.convertFromHTML(this.props.element.content);
      }
      if (this.props.element.hasOwnProperty("label")) {
        editorState = this.convertFromHTML(this.props.element.label);
      }

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            { className: "modal-header clearfix" },
            _react2.default.createElement(
              "h4",
              { className: "pull-left" },
              this.props.element.text,
              " Properties"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "modal-body pull-left" },
            this.props.element.hasOwnProperty("content") && _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement(
                "label",
                { className: "control-label" },
                "Text to display:"
              ),
              _react2.default.createElement(_reactDraftWysiwyg.Editor, {
                toolbar: toolbar,
                defaultEditorState: editorState,
                onBlur: this.updateElement.bind(this),
                onEditorStateChange: this.onEditorStateChange.bind(this, 0, "content")
              })
            ),
            this.props.element.hasOwnProperty("file_path") && _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement(
                "label",
                { className: "control-label", htmlFor: "fileSelect" },
                "Choose file:"
              ),
              _react2.default.createElement(
                "select",
                {
                  id: "fileSelect",
                  className: "form-control",
                  defaultValue: this.props.element.file_path,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "file_path", "value")
                },
                this_files.map(function (file) {
                  var this_key = "file_" + file.id;
                  return _react2.default.createElement(
                    "option",
                    { value: file.id, key: this_key },
                    file.file_name
                  );
                })
              )
            ),
            this.props.element.hasOwnProperty("src") && _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                "div",
                { className: "form-group" },
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "srcInput" },
                  "Link to:"
                ),
                _react2.default.createElement("input", {
                  id: "srcInput",
                  type: "text",
                  className: "form-control",
                  defaultValue: this.props.element.src,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "src", "value")
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "form-group" },
                _react2.default.createElement(
                  "div",
                  { className: "checkbox" },
                  _react2.default.createElement(
                    "label",
                    null,
                    _react2.default.createElement("input", {
                      type: "checkbox",
                      checked: this_checked_center,
                      value: true,
                      onChange: this.editElementProp.bind(this, "center", "checked")
                    }),
                    "Center?"
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "row" },
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-3" },
                  _react2.default.createElement(
                    "label",
                    { className: "control-label", htmlFor: "elementWidth" },
                    "Width:"
                  ),
                  _react2.default.createElement("input", {
                    id: "elementWidth",
                    type: "text",
                    className: "form-control",
                    defaultValue: this.props.element.width,
                    onBlur: this.updateElement.bind(this),
                    onChange: this.editElementProp.bind(this, "width", "value")
                  })
                ),
                _react2.default.createElement(
                  "div",
                  { className: "col-sm-3" },
                  _react2.default.createElement(
                    "label",
                    { className: "control-label", htmlFor: "elementHeight" },
                    "Height:"
                  ),
                  _react2.default.createElement("input", {
                    id: "elementHeight",
                    type: "text",
                    className: "form-control",
                    defaultValue: this.props.element.height,
                    onBlur: this.updateElement.bind(this),
                    onChange: this.editElementProp.bind(this, "height", "value")
                  })
                )
              )
            ),
            this.props.element.hasOwnProperty("label") && _react2.default.createElement(
              "div",
              { className: "form-group col-md-8" },
              _react2.default.createElement(
                "label",
                null,
                "Field Label",
                _react2.default.createElement(
                  "span",
                  { className: "text-danger" },
                  "*"
                )
              ),
              _react2.default.createElement("input", {
                type: "text",
                className: "form-control"
                //defaultValue={this.updateElement.bind(this, 0, 'label')}
                , defaultValue: this.props.element.label,
                onBlur: this.updateElement.bind(this),
                onChange: this.editElementProp.bind(this, "label", "value")
              }),
              _react2.default.createElement("br", null),
              _react2.default.createElement(
                "div",
                { className: "checkbox" },
                _react2.default.createElement(
                  "label",
                  null,
                  _react2.default.createElement("input", {
                    type: "checkbox",
                    checked: this_checked,
                    value: true,
                    onChange: this.editElementProp.bind(this, "required", "checked")
                  }),
                  "\xA0 Required"
                )
              ),
              this.props.element.hasOwnProperty("readOnly") && _react2.default.createElement(
                "div",
                { className: "checkbox col-md-6" },
                _react2.default.createElement(
                  "label",
                  null,
                  _react2.default.createElement("input", {
                    type: "checkbox",
                    checked: this_read_only,
                    value: true,
                    onChange: this.editElementProp.bind(this, "readOnly", "checked")
                  }),
                  "Read only"
                )
              ),
              this.props.element.element === "PhoneInput" && _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "charLimit" },
                  "Number of characters allowed :"
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "div",
                  { className: "col-md-6" },
                  _react2.default.createElement(_dropdown.Dropdown, {
                    options: [{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6", value: "6" }, { label: "7", value: "7" }, { label: "8", value: "8" }, { label: "9", value: "9" }, { label: "10", value: "10" }, { label: "11", value: "11" }, { label: "12", value: "12" }, { label: "13", value: "13" }, { label: "14", value: "14" }, { label: "15", value: "15" }, { label: "16", value: "16" }, { label: "17", value: "17" }, { label: "18", value: "18" }, { label: "19", value: "19" }, { label: "20", value: "20" }, { label: "21", value: "21" }, { label: "22", value: "22" }, { label: "23", value: "23" }, { label: "24", value: "24" }, { label: "25", value: "25" }, { label: "26", value: "26" }, { label: "27", value: "27" }, { label: "28", value: "28" }, { label: "29", value: "29" }, { label: "30", value: "30" }],
                    value: this_char_limit,
                    onChange: this.editElementProp.bind(this, "charLimit", "value")
                  })
                ),
                _react2.default.createElement(
                  "span",
                  null,
                  "Max of 30 characters"
                )
              ),
              this.props.element.element === "HyperLink" && _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "urllimit" },
                  "Number of characters allowed :"
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "div",
                  null,
                  _react2.default.createElement("input", {
                    id: "urllimit",
                    type: "text",
                    className: "form-control",
                    defaultValue: this_urllimit,
                    onBlur: this.updateElement.bind(this),
                    onChange: this.editElementProp.bind(this, "urllimit", "value")
                  }),
                  _react2.default.createElement(
                    "span",
                    null,
                    "Max of 450 characters"
                  ),
                  this.state.isUrlValid ? _react2.default.createElement(
                    "span",
                    { style: { color: "red" } },
                    this.state.isUrlValid
                  ) : null
                )
              ),
              this.props.element.element === "DecimalInput" && _react2.default.createElement(
                "div",
                {
                  style: {
                    flex: 1,
                    justifyContent: "space-around",
                    alignItems: "flex-start"
                  }
                },
                _react2.default.createElement(
                  "div",
                  {
                    style: {
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }
                  },
                  _react2.default.createElement(
                    "label",
                    {
                      className: "control-label",
                      htmlFor: "currencyDigitLimit"
                    },
                    "Maximum digits allowed :"
                  ),
                  _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_dropdown.Dropdown, {
                      options: [{ label: "0", value: "0" }, { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6", value: "6" }, { label: "7", value: "7" }, { label: "8", value: "8" }, { label: "9", value: "9" }, { label: "10", value: "10" }, { label: "11", value: "11" }, { label: "12", value: "12" }, { label: "13", value: "13" }, { label: "14", value: "14" }, { label: "15", value: "15" }, { label: "16", value: "16" }],
                      value: this_currency_limit,
                      onChange: this.editElementProp.bind(this, "currencyDigitLimit", "value")
                    }),
                    _react2.default.createElement(
                      "span",
                      { style: { marginLeft: 10 } },
                      "Eg: 12345.55"
                    )
                  )
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "div",
                  {
                    style: {
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }
                  },
                  _react2.default.createElement(
                    "label",
                    { className: "control-label", htmlFor: "decimalLimit" },
                    "Number of decimal places :"
                  ),
                  _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_dropdown.Dropdown, {
                      options: [{ label: "0", value: "0" }, { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6", value: "6" }, { label: "7", value: "7" }, { label: "8", value: "8" }, { label: "9", value: "9" }],
                      value: this_deciaml_limit,
                      onChange: this.editElementProp.bind(this, "decimalLimit", "value")
                    }),
                    " ",
                    _react2.default.createElement(
                      "span",
                      { style: { marginLeft: 10 } },
                      "Eg: 12345.55"
                    )
                  )
                )
              ),
              this.props.element.element === "CurrencyInput" && _react2.default.createElement(
                "div",
                {
                  style: {
                    flex: 1,
                    justifyContent: "space-around",
                    alignItems: "flex-start"
                  }
                },
                _react2.default.createElement(
                  "div",
                  {
                    style: {
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }
                  },
                  _react2.default.createElement(
                    "label",
                    {
                      className: "control-label",
                      htmlFor: "currencyDigitLimit"
                    },
                    "Maximum digits allowed :"
                  ),
                  _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_dropdown.Dropdown, {
                      options: [{ label: "0", value: "0" }, { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6", value: "6" }, { label: "7", value: "7" }, { label: "8", value: "8" }, { label: "9", value: "9" }, { label: "10", value: "10" }, { label: "11", value: "11" }, { label: "12", value: "12" }, { label: "13", value: "13" }, { label: "14", value: "14" }, { label: "15", value: "15" }, { label: "16", value: "16" }],
                      value: this_currency_limit,
                      onChange: this.editElementProp.bind(this, "currencyDigitLimit", "value")
                    }),
                    _react2.default.createElement(
                      "span",
                      { style: { marginLeft: 10 } },
                      "Eg: 12345.55"
                    )
                  )
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "div",
                  {
                    style: {
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }
                  },
                  _react2.default.createElement(
                    "label",
                    { className: "control-label", htmlFor: "decimalLimit" },
                    "Number of decimal places :"
                  ),
                  _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_dropdown.Dropdown, {
                      options: [{ label: "0", value: "0" }, { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6", value: "6" }, { label: "7", value: "7" }, { label: "8", value: "8" }, { label: "9", value: "9" }],
                      value: this_deciaml_limit,
                      onChange: this.editElementProp.bind(this, "decimalLimit", "value")
                    }),
                    " ",
                    _react2.default.createElement(
                      "span",
                      { style: { marginLeft: 10 } },
                      "Eg: 12345.55"
                    )
                  )
                )
              ),
              this.props.element.element === "LongIntegerInput" && _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "charLimit" },
                  "Maximum digits allowed :"
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "div",
                  null,
                  _react2.default.createElement(_dropdown.Dropdown, {
                    options: [{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6", value: "6" }, { label: "7", value: "7" }, { label: "8", value: "8" }, { label: "9", value: "9" }, { label: "10", value: "10" }, { label: "11", value: "11" }, { label: "12", value: "12" }, { label: "13", value: "13" }, { label: "14", value: "14" }, { label: "15", value: "15" }, { label: "16", value: "16" }, { label: "17", value: "17" }, { label: "18", value: "18" }],
                    value: this_char_limit,
                    onChange: this.editElementProp.bind(this, "charLimit", "value")
                  })
                )
              ),
              this.props.element.element === "TextArea" && _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "charLimit" },
                  "Number of characters allowed :"
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "div",
                  null,
                  _react2.default.createElement(_dropdown.Dropdown, {
                    options: [{ label: "Small (2000 characters)", value: "2000" }, { label: "Large (32000 characters)", value: "32000" }],
                    value: this_char_limit,
                    onChange: this.editElementProp.bind(this, "charLimit", "value")
                  })
                )
              ),
              this.props.element.element === "TextInput" && _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "charLimit" },
                  "Number of characters allowed :"
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "div",
                  null,
                  _react2.default.createElement("input", {
                    id: "charLimit",
                    type: "text",
                    className: "form-control",
                    defaultValue: this_char_limit,
                    onBlur: this.updateElement.bind(this),
                    onChange: this.editElementProp.bind(this, "charLimit", "value")
                  }),
                  " ",
                  _react2.default.createElement(
                    "span",
                    null,
                    "Max of 255 characters"
                  )
                )
              ),
              this.props.element.hasOwnProperty("digitLimit") && _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "digitLimit" },
                  "Maximum digits allowed :"
                ),
                _react2.default.createElement(_dropdown.Dropdown, {
                  options: [{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6", value: "6" }, { label: "7", value: "7" }, { label: "8", value: "8" }, { label: "9", value: "9" }]
                  // id="digitLimit"
                  // type="number"
                  // min="1"
                  // max={this_digit_limit}
                  // className="form-control"
                  , value: this_digit_limit
                  // onBlur={this.updateElement.bind(this)}
                  , onChange: this.editElementProp.bind(this, "digitLimit", "value")
                })
              ),
              this.props.element.hasOwnProperty("canUnique") && _react2.default.createElement(
                "div",
                { className: "checkbox" },
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "label",
                  null,
                  _react2.default.createElement("input", {
                    type: "checkbox",
                    checked: this_checked_unique,
                    value: true,
                    onChange: this.editElementProp.bind(this, "canUnique", "checked")
                  }),
                  "Do not allow duplicate values"
                )
              ),
              this.props.element.hasOwnProperty("defaultToday") && _react2.default.createElement(
                "div",
                { className: "checkbox" },
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                  "label",
                  null,
                  _react2.default.createElement("input", {
                    type: "checkbox",
                    checked: this_default_today,
                    value: true,
                    onChange: this.editElementProp.bind(this, "defaultToday", "checked")
                  }),
                  "Default to Today?"
                )
              ),
              (this.state.element.element === "RadioButtons" || this.state.element.element === "Checkboxes") && _react2.default.createElement(
                "div",
                { className: "checkbox" },
                _react2.default.createElement(
                  "label",
                  null,
                  _react2.default.createElement("input", {
                    type: "checkbox",
                    checked: this_checked_inline,
                    value: true,
                    onChange: this.editElementProp.bind(this, "inline", "checked")
                  }),
                  "Display horizonal"
                )
              )
            ),
            this.props.element.hasOwnProperty("selectedOption") && _react2.default.createElement(
              "div",
              { className: "form-group col-md-8" },
              _react2.default.createElement(
                "label",
                { className: "control-label" },
                "Select Module"
              ),
              _react2.default.createElement(_reactSelect2.default
              //value={this.state.selectedOption}
              , { onBlur: this.updateElement.bind(this),
                options: this.state.moduleListData,
                onChange: this.handleChange.bind(this),
                defaultValue: this.getModuleDefaultValue(this)
                //defaultValue={(this.state.selectedOption ? this.state.selectedOption.value : '')}
              }),
              _react2.default.createElement("br", null),
              _react2.default.createElement(
                "label",
                { className: "control-label" },
                "Select Field"
              ),
              _react2.default.createElement(_reactSelect2.default, {
                value: this.state.selectedFieldOption,
                onBlur: this.updateElement.bind(this),
                options: this.state.moduleFields,
                onChange: this.handleFieldChange.bind(this),
                defaultValue: this.state.selectedFieldOption
              })
            ),
            this.state.element.element === "Signature" && this.props.element.readOnly ? _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement(
                "label",
                { className: "control-label", htmlFor: "variableKey" },
                "Variable Key:"
              ),
              _react2.default.createElement("input", {
                id: "variableKey",
                type: "text",
                className: "form-control",
                defaultValue: this.props.element.variableKey,
                onBlur: this.updateElement.bind(this),
                onChange: this.editElementProp.bind(this, "variableKey", "value")
              }),
              _react2.default.createElement(
                "p",
                { className: "help-block" },
                "This will give the element a key that can be used to replace the content with a runtime value."
              )
            ) : _react2.default.createElement("div", null),
            (this.props.element.custom_options || []).map(function (c_option) {
              if (c_option.type === "input") {
                return _react2.default.createElement(
                  "div",
                  { className: "form-group", key: c_option.name },
                  _react2.default.createElement(
                    "label",
                    { className: "control-label", htmlFor: c_option.name },
                    c_option.label
                  ),
                  _react2.default.createElement("input", {
                    id: c_option.name,
                    type: "text",
                    className: "form-control",
                    defaultValue: _this6.props.element[c_option.name] || c_option.defaultValue,
                    onBlur: _this6.updateElement.bind(_this6),
                    onChange: _this6.editElementProp.bind(_this6, c_option.name, "value")
                  })
                );
              } else if (c_option.type === "textarea") {
                return _react2.default.createElement(
                  "div",
                  { className: "form-group", key: c_option.name },
                  _react2.default.createElement(
                    "label",
                    { className: "control-label", htmlFor: c_option.name },
                    c_option.label
                  ),
                  _react2.default.createElement("textarea", {
                    id: c_option.name,
                    className: "form-control",
                    rows: "6",
                    maxlength: c_option.charLimit,
                    defaultValue: _this6.props.element[c_option.name] || c_option.defaultValue,
                    onBlur: _this6.updateElement.bind(_this6),
                    onChange: _this6.editElementProp.bind(_this6, c_option.name, "value")
                  })
                );
              } else if (c_option.type === "select") {
                var values = _this6.props.element[c_option.name];
                var selectedValues = values;
                if (c_option.isMulti) {
                  if (Array.isArray(values) && values.length > 0 && typeof values[0] === "string") {
                    selectedValues = c_option.options.filter(function (option) {
                      return values.includes(option.value);
                    });
                  }
                } else {
                  if (typeof values === "string") {
                    selectedValues = c_option.options.find(function (option) {
                      return values === option.value;
                    });
                  }
                }
                return _react2.default.createElement(
                  "div",
                  { className: "form-group", key: c_option.name },
                  _react2.default.createElement(
                    "label",
                    { className: "control-label" },
                    c_option.label
                  ),
                  _react2.default.createElement(_reactSelect2.default, {
                    isMulti: c_option.isMulti || false,
                    id: c_option.name,
                    options: c_option.options,
                    defaultValue: selectedValues || c_option.defaultValue,
                    onBlur: _this6.updateElement.bind(_this6),
                    onChange: _this6.editSelectProp.bind(_this6, c_option.name)
                  })
                );
              } else if (c_option.type === "checkbox") {
                return _react2.default.createElement(
                  "div",
                  { className: "form-group", key: c_option.name },
                  _react2.default.createElement(
                    "div",
                    { className: "checkbox" },
                    _react2.default.createElement(
                      "label",
                      null,
                      _react2.default.createElement("input", {
                        type: "checkbox",
                        checked: _this6.props.element[c_option.name] || c_option.defaultvalue || false,
                        value: true,
                        onChange: _this6.editElementProp.bind(_this6, c_option.name, "checked")
                      }),
                      c_option.label
                    )
                  )
                );
              }
            }),
            this.props.element.hasOwnProperty("step") && _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement(
                "div",
                { className: "form-group-range" },
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "rangeStep" },
                  "Step"
                ),
                _react2.default.createElement("input", {
                  id: "rangeStep",
                  type: "number",
                  className: "form-control",
                  defaultValue: this.props.element.step,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "step", "value")
                })
              )
            ),
            this.props.element.hasOwnProperty("min_value") && _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement(
                "div",
                { className: "form-group-range" },
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "rangeMin" },
                  "Min"
                ),
                _react2.default.createElement("input", {
                  id: "rangeMin",
                  type: "number",
                  className: "form-control",
                  defaultValue: this.props.element.min_value,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "min_value", "value")
                }),
                _react2.default.createElement("input", {
                  type: "text",
                  className: "form-control",
                  defaultValue: this.props.element.min_label,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "min_label", "value")
                })
              )
            ),
            this.props.element.hasOwnProperty("max_value") && _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement(
                "div",
                { className: "form-group-range" },
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "rangeMax" },
                  "Max"
                ),
                _react2.default.createElement("input", {
                  id: "rangeMax",
                  type: "number",
                  className: "form-control",
                  defaultValue: this.props.element.max_value,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "max_value", "value")
                }),
                _react2.default.createElement("input", {
                  type: "text",
                  className: "form-control",
                  defaultValue: this.props.element.max_label,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "max_label", "value")
                })
              )
            ),
            this.props.element.hasOwnProperty("default_value") && _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement(
                "div",
                { className: "form-group-range" },
                _react2.default.createElement(
                  "label",
                  { className: "control-label", htmlFor: "defaultSelected" },
                  "Default Selected"
                ),
                _react2.default.createElement("input", {
                  id: "defaultSelected",
                  type: "number",
                  className: "form-control",
                  defaultValue: this.props.element.default_value,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "default_value", "value")
                })
              )
            ),
            this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty("options") && _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement(
                "label",
                { className: "control-label", htmlFor: "correctAnswer" },
                "Correct Answer"
              ),
              _react2.default.createElement("input", {
                id: "correctAnswer",
                type: "text",
                className: "form-control",
                defaultValue: this.props.element.correct,
                onBlur: this.updateElement.bind(this),
                onChange: this.editElementProp.bind(this, "correct", "value")
              })
            ),
            this.props.element.hasOwnProperty("options") && this.props.element.options.length > 0 && _react2.default.createElement(_dynamicOptionList2.default, {
              showCorrectColumn: this.props.showCorrectColumn,
              data: this.props.preview.state.data,
              updateElement: this.props.updateElement,
              preview: this.props.preview,
              element: this.props.element,
              key: this.props.element.options.length
            })
          ),
          " "
        ),
        _react2.default.createElement(
          "div",
          { className: "modal-footer pull-left col-md-12" },
          _react2.default.createElement(
            "a",
            {
              href: "javascript:void(0)",
              className: "btn btn-success",
              disabled: this.state.isUrlValid ? true : false,
              onClick: this.state.isUrlValid ? console.warn() : this.props.manualEditModeOff
            },
            "Submit"
          )
        )
      );
    }
  }]);

  return FormElementsEdit;
}(_react2.default.Component);

exports.default = FormElementsEdit;

FormElementsEdit.defaultProps = { className: "edit-element-fields" };