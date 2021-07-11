"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _fbemitter = require("fbemitter");

var _formValidator = require("./form-validator");

var _formValidator2 = _interopRequireDefault(_formValidator);

var _formElements = require("./form-elements");

var FormElements = _interopRequireWildcard(_formElements);

var _CustomElement = require("./CustomElement");

var _CustomElement2 = _interopRequireDefault(_CustomElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <Form />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ReactForm = function (_React$Component) {
  _inherits(ReactForm, _React$Component);

  function ReactForm(props) {
    _classCallCheck(this, ReactForm);

    var _this = _possibleConstructorReturn(this, (ReactForm.__proto__ || Object.getPrototypeOf(ReactForm)).call(this, props));

    _this.inputs = {};

    _this.checkNumberInput = function (item, ref, errors) {
      ///console.log(parseInt(item.charLimit) < ref.inputField.current.value.length);
      if (!!item.digitLimit) {
        if (!/^-?\d*$/.test(ref.inputField.current.value)) {
          errors.push(item.label + " - Only numbers are allowed");
        } else if (parseInt(item.digitLimit) < ref.inputField.current.value.length) {
          errors.push(item.label + " - Only " + item.digitLimit + " digits allowed");
        }
      } else if (!/^-?\d*$/.test(ref.inputField.current.value)) {
        errors.push(item.label + " - Only numbers are allowed");
      } else if (parseInt(item.charLimit) < ref.inputField.current.value.length) {
        errors.push(item.label + " - Only " + item.charLimit + " digits allowed");
      }
    };

    _this.checkTextInput = function (item, ref, errors) {
      console.log(parseInt(item.charLimit) < ref.inputField.current.value.length);
      if (item.element === "PhoneInput") {
        if (!/^-?\d*$/.test(ref.inputField.current.value)) {
          errors.push(item.label + " - Only numbers are allowed");
        } else if (parseInt(item.charLimit) < ref.inputField.current.value.length) {
          errors.push(item.label + " - Ony " + item.charLimit + " characters allowed");
        }
      } else {
        if (parseInt(item.charLimit) < ref.inputField.current.value.length) {
          errors.push(item.label + " - Only " + item.charLimit + " characters allowed");
        }
      }
    };

    _this.checkEmailInput = function (item, ref, errors) {
      console.log("Email value is:", ref.inputField.current.value);
      if (ref.inputField.current.value != '' && ref.inputField.current.value != null && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(ref.inputField.current.value)) {
        errors.push(item.label + " - Only valid email allowed");
      }
    };

    _this.checkDecimalInput = function (item, ref, errors) {
      if (!/^[+-]?(?=.?\d)\d*(\.\d{0,9})?$/.test(ref.inputField.current.value)) {
        errors.push(item.label + " - Only numbers are allowed");
      } else if (ref.inputField.current.value.split(".")[1].length > parseInt(item.charLimit)) {
        errors.push(item.label + " - Only " + item.charLimit + " decimals allowed");
      }
    };

    _this.checkDecimalandCurrency = function (item, ref, errors) {
      if (/^[+-]?(?=.?\d)\d*(\.\d{0,9})?$/.test(ref.inputField.current.value)) {
        if (ref.inputField.current.value.length > parseInt(item.currencyDigitLimit)) {
          errors.push(item.label + " - Only " + item.currencyDigitLimit + " digits allowed");
        }
        if (ref.inputField.current.value.split(".")[1].length > parseInt(item.decimalLimit)) {
          errors.push(item.label + " - Only " + item.decimalLimit + " decimals allowed");
        }
      } else {
        errors.push(item.label + " - Only numbers are allowed");
      }
    };

    _this.checkUrl = function (item, ref, errors) {
      console.log(ref);
      if (parseInt(item.urllimit) < ref.inputField.current.value) {
        errors.push(item.label + " - Only " + item.urllimit + " characters allowed");
      }

      if (/^-?\d*$/.test(ref.inputField.current.value)) {
        errors.push(item.label + " - Only characters are allowed");
      }
    };

    _this.emitter = new _fbemitter.EventEmitter();
    return _this;
  }

  _createClass(ReactForm, [{
    key: "_checkboxesDefaultValue",
    value: function _checkboxesDefaultValue(item) {
      var defaultChecked = [];
      if (this.props.answer_data[item.field_name] !== undefined) {
        defaultChecked = this.props.answer_data[item.field_name];
      }
      return defaultChecked;
    }
  }, {
    key: "_isIncorrect",
    value: function _isIncorrect(item) {
      var incorrect = false;
      if (item.canHaveAnswer) {
        var ref = this.inputs[item.field_name];
        if (item.type === "custom" || item.custom) {
          if (!ref) return;
          if (ref.inputField && ref.inputField.current) {
            // TODO:
            //  Add logic to validate custom components.
            return;
          } else {
            return;
          }
        } else if (item.element === "Checkboxes" || item.element === "RadioButtons") {
          item.options.forEach(function (option) {
            var $option = _reactDom2.default.findDOMNode(ref.options["child_ref_" + option.key]);
            if (option.hasOwnProperty("correct") && !$option.checked || !option.hasOwnProperty("correct") && $option.checked) {
              incorrect = true;
            }
          });
        } else {
          var $item = null;
          if (item.element === "Rating") {
            $item = {};
            $item.value = ref.inputField.current.state.rating;
            if ($item.value.toString() !== item.correct) {
              incorrect = true;
            }
          } else {
            if (item.element === "Tags") {
              $item = {};
              $item.value = ref.inputField.current.state.value || ref.state.value;
            } else if (item.element === "DatePicker" || item.element === "DateInput") {
              $item = {};
              $item.value = ref.inputField.current.state.value || ref.inputField.current.input.value || ref.state.value;
            } else {
              $item = _reactDom2.default.findDOMNode(ref.inputField.current);
              $item.value = $item.value.trim();
            }

            if ($item.value.toLowerCase() !== item.correct.trim().toLowerCase()) {
              incorrect = true;
            }
          }
        }
      }
      return incorrect;
    }
  }, {
    key: "_isInvalid",
    value: function _isInvalid(item) {
      var invalid = false;
      if (item.required === true) {
        var ref = this.inputs[item.field_name];
        if (item.type === "custom" || item.custom) {
          if (!ref) return;
          if (ref.inputField && ref.inputField.current) {
            var $item = {};
            $item.value = ref.inputField.current.state.value;
            if ($item.value) {
              if (Array.isArray($item.value) && $item.value.length === 0) {
                invalid = true;
              } else if (Object.keys([]).length === 0 && [].constructor === Object) {
                invalid = true;
              }
            }
          } else {
            return;
          }
        } else if (item.element === "Checkboxes" || item.element === "RadioButtons") {
          var checked_options = 0;
          item.options.forEach(function (option) {
            var $option = _reactDom2.default.findDOMNode(ref.options["child_ref_" + option.key]);
            if ($option.checked) {
              checked_options += 1;
            }
          });
          if (checked_options < 1) {
            // errors.push(item.label + ' is required!');
            invalid = true;
          }
        } else {
          var _$item = null;
          if (item.element === "Rating") {
            _$item = {};
            _$item.value = ref.inputField.current.state.rating;
            if (_$item.value === 0) {
              invalid = true;
            }
          } else if (item.element === "Range") {
            _$item = {};
            _$item.value = ref.state.value;
            // Needs to check for empty value except zero.
            // Bacause range can start from zero.
            if (_$item.value === undefined || _$item.value === null || _$item.value === "") {
              invalid = true;
            }
          } else {
            //console.log("Item is:",ref.inputField.current);
            if (item.element === "Tags") {
              _$item = {};
              _$item.value = ref.inputField.current.state.value || ref.state.value;
            } else if (item.element === "FileInput") {
              _$item = {};
              _$item.value = ref.state.img;
              // Needs to check for empty value except zero.
              // Bacause range can start from zero.
              //console.log("Fileupload value is:",ref.state.img);
              if (_$item.value === undefined || _$item.value === null || _$item.value === "") {
                invalid = true;
              }
            } else if (item.element === "DatePicker" || item.element === "DateInput") {
              _$item = {};
              _$item.value = ref.inputField.current.state.value || ref.inputField.current.input.value || ref.state.value;
            } else {
              _$item = _reactDom2.default.findDOMNode(ref.inputField.current);
              _$item.value = _$item.value.trim();
            }
            var Newcond = item.element != "FileInput" ? _$item.value === undefined || _$item.value.length < 1 : _$item.value === null;
            //console.log("newcond is:",Newcond);
            //if (NewCond == true) {
            invalid = Newcond;
            //}
          }
        }
      }
      return invalid;
    }
  }, {
    key: "_collect",
    value: function _collect(item) {
      var itemData = { name: item.field_name };
      var $item = {};
      console.log("item type is:", item.element);
      var ref = this.inputs[item.field_name];
      if (item.type === "custom" || item.custom) {
        if (!ref) return;
        if (ref.inputField && ref.inputField.current) {
          itemData.value = ref.inputField.current.state.value;
        } else {
          return;
        }
      } else {
        if (item.element === "Checkboxes" || item.element === "RadioButtons") {
          var checked_options = [];
          item.options.forEach(function (option) {
            var $option = _reactDom2.default.findDOMNode(ref.options["child_ref_" + option.key]);
            if ($option.checked) {
              checked_options.push(option.key);
            }
          });
          itemData.value = checked_options;
        } else if (item.element === "Lookup") {
          var _checked_options = [];
          // console.log("item is:",item);
          // console.log("State value is:",ref.state.value);
          itemData.value = ref.state.value;
          // item.options.forEach(option => {
          //   let $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
          //   if ($option.checked) {
          //     checked_options.push(option.key);
          //   }
          // });
          // itemData.value = checked_options;
        } else {
          if (!ref) return;
          if (item.element === "Rating") {
            itemData.value = ref.inputField.current.state.rating;
          } else if (item.element === "Range") {
            itemData.value = ref.state.value;
          } else {
            if (item.element === "Tags") {
              itemData.value = ref.inputField.current.state.value || ref.state.value;
            } else if (item.element === "DatePicker" || item.element === "DateInput") {
              itemData.value = ref.inputField.current.state.value || ref.inputField.current.input.value || ref.state.value;
            } else {
              $item = _reactDom2.default.findDOMNode(ref.inputField.current);
              if ($item && $item.value !== undefined && $item.value !== null) {
                itemData.value = $item.value.trim();
              } else {
                itemData.value = "";
              }
            }
          }
        }
      }
      return itemData;
    }
  }, {
    key: "_collectFormData",
    value: function _collectFormData(data) {
      var _this2 = this;

      var formData = [];
      data.forEach(function (item) {
        var item_data = _this2._collect(item);
        if (item_data) {
          formData.push(item_data);
        }
      });
      return formData;
    }
  }, {
    key: "_getSignatureImg",
    value: function _getSignatureImg(item) {
      var ref = this.inputs[item.field_name];
      var $canvas_sig = ref.canvas.current;
      var base64 = $canvas_sig.toDataURL().replace("data:image/png;base64,", "");
      var isEmpty = $canvas_sig.isEmpty();
      var $input_sig = _reactDom2.default.findDOMNode(ref.inputField.current);
      if (isEmpty) {
        $input_sig.value = "";
      } else {
        $input_sig.value = base64;
      }
      return true;
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();

      var errors = this.validateForm();
      // Publish errors, if any.
      this.emitter.emit("formValidation", errors);

      // Only submit if there are no errors.
      if (errors.length < 1) {
        var onSubmit = this.props.onSubmit;

        if (onSubmit) {
          var data = this._collectFormData(this.props.data);
          onSubmit(data);
        } else {
          var $form = _reactDom2.default.findDOMNode(this.form);
          $form.submit();
        }
      }
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      var _this3 = this;

      var errors = [];
      var data_items = this.props.data;

      if (this.props.display_short) {
        data_items = this.props.data.filter(function (i) {
          return i.alternateForm === true;
        });
      }

      data_items.forEach(function (item) {
        var ref = _this3.inputs[item.field_name];
        console.log(" item.element is:", item);
        if (item.element === "Signature") {
          _this3._getSignatureImg(item);
        }

        switch (item.element) {
          case "NumberInput":
            _this3.checkNumberInput(item, ref, errors);
            break;
          case "TextInput":
            _this3.checkTextInput(item, ref, errors);
            break;
          case "EmailInput":
            _this3.checkEmailInput(item, ref, errors);
            break;
          case "TextArea":
            _this3.checkTextInput(item, ref, errors);
            break;
          case "PhoneInput":
            _this3.checkTextInput(item, ref, errors);
            break;
          case "DecimalInput":
            _this3.checkDecimalandCurrency(item, ref, errors);
            break;
          case "CurrencyInput":
            _this3.checkDecimalandCurrency(item, ref, errors);
            break;
          case "LongIntegerInput":
            _this3.checkNumberInput(item, ref, errors);
            break;
          case "HyperLink":
            _this3.checkUrl(item, ref, errors);
            break;
        }

        if (_this3._isInvalid(item)) {
          errors.push(item.label + " is required!");
        }

        if (_this3.props.validateForCorrectness && _this3._isIncorrect(item)) {
          errors.push(item.label + " was answered incorrectly!");
        }
      });

      return errors;
    }
  }, {
    key: "getInputElement",
    value: function getInputElement(item) {
      var _this4 = this;

      var Input = FormElements[item.element];
      return _react2.default.createElement(Input, {
        handleChange: this.handleChange,
        ref: function ref(c) {
          return _this4.inputs[item.field_name] = c;
        },
        mutable: true,
        key: "form_" + item.id,
        data: item,
        read_only: this.props.read_only,
        defaultValue: this.props.answer_data ? this.props.answer_data[item.field_name] : ""
      });
    }
  }, {
    key: "getSimpleElement",
    value: function getSimpleElement(item) {
      var Element = FormElements[item.element];
      // Do not return anything for invalid items / element
      if (!item.element || typeof Element === "undefined") return null;
      return _react2.default.createElement(Element, { mutable: true, key: "form_" + item.id, data: item });
    }
  }, {
    key: "getCustomElement",
    value: function getCustomElement(item) {
      var _this5 = this;

      var answerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return _react2.default.createElement(_CustomElement2.default, {
        ref: function ref(c) {
          return _this5.inputs[item.field_name] = c;
        },
        mutable: true,
        key: "form_" + item.id,
        data: item,
        answerData: answerData
      });
    }

    /* commented because of : https://github.com/material-components/material-components-web-react/issues/434
    componentWillUnmount() {
      try {
        if (this.customErrorSubscription) {
          this.customErrorSubscription.remove();
        }
      } catch (e) {}
    }
    */

  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var data_items = this.props.data;

      if (this.props.display_short) {
        data_items = this.props.data.filter(function (i) {
          return i.alternateForm === true;
        });
      }

      if ((typeof data_items === "undefined" ? "undefined" : _typeof(data_items)) == "object" && Object.keys(data_items).length > 0) {
        data_items.forEach(function (item) {
          if (item.readOnly && item.variableKey && _this6.props.variables[item.variableKey]) {
            console.log("variableKey is:", item.variableKey);
            _this6.props.answer_data[item.field_name] = _this6.props.variables[item.variableKey];
          }
        });
      } else {
        console.log("in else Data items count:");
      }

      var items = data_items.map(function (item) {
        switch (item.element) {
          case "TextInput":
          case "NumberInput":
          case "TextArea":
          case "Dropdown":
          case "DatePicker":
          case "RadioButtons":
          case "Rating":
          case "Tags":

          case "PhoneInput":
          case "EmailInput":
          case "AutoNumberInput":
          case "CurrencyInput":
          case "DecimalInput":
          case "PercentInput":
          case "LongIntegerInput":
          case "DateInput":
          case "Lookup":

          case "Range":
            return _this6.getInputElement(item);
          case "Signature":
            return _react2.default.createElement(_formElements.Signature, {
              ref: function ref(c) {
                return _this6.inputs[item.field_name] = c;
              },
              read_only: _this6.props.read_only || item.readOnly,
              mutable: true,
              key: "form_" + item.id,
              data: item
              //defaultValue={this.props.answer_data[item.field_name]}
              , defaultValue: _this6.props.answer_data ? _this6.props.answer_data[item.field_name] : ""
            });
          case "Checkboxes":
            return _react2.default.createElement(_formElements.Checkboxes, {
              ref: function ref(c) {
                return _this6.inputs[item.field_name] = c;
              },
              read_only: _this6.props.read_only,
              handleChange: _this6.handleChange,
              mutable: true,
              key: "form_" + item.id,
              data: item,
              defaultValue: _this6._checkboxesDefaultValue(item)
            });
          case "FileInput":
            return _react2.default.createElement(_formElements.FileInput, {
              ref: function ref(c) {
                return _this6.inputs[item.field_name] = c;
              },
              read_only: _this6.props.read_only,
              handleChange: _this6.handleChange,
              mutable: true,
              key: "form_" + item.id,
              data: item
              //defaultValue={this.props.answer_data[item.field_name]}
              , defaultValue: _this6.props.answer_data ? _this6.props.answer_data[item.field_name] : ""
            });
          case "Download":
            return _react2.default.createElement(_formElements.Download, {
              download_path: _this6.props.download_path,
              mutable: true,
              key: "form_" + item.id,
              data: item
            });
          default:
            if (item.custom && item.element !== "CustomSubmitButtonOptions") {
              return _this6.getCustomElement(item, _this6.props.answer_data);
            } else {
              return !!item.id ? _this6.getSimpleElement(item) : null;
            }
        }
      });

      var formTokenStyle = {
        display: "flex"
      };

      var actionName = this.props.action_name ? this.props.action_name : "Submit";
      var backName = this.props.back_name ? this.props.back_name : "Cancel";

      if (this.props.onErrors && typeof this.props.onErrors === "function") {
        this.customErrorSubscription = this.emitter.addListener("formValidation", this.props.onErrors);
      }

      var customSubmitButtonData = data_items.find(function (item) {
        return item.element === "CustomSubmitButtonOptions";
      });
      var customSubmitButtonOptions = {
        text: actionName,
        color: "success",
        alignment: "start"
      };
      var actionButtonParentStyles = {};

      if (!!customSubmitButtonData && !!customSubmitButtonData.props && !!customSubmitButtonData.props.submitButtonOptions) {
        var options = customSubmitButtonData.props.submitButtonOptions;
        customSubmitButtonOptions = {
          text: !!options.text ? options.text : actionName,
          color: !!options.color ? options.color : "success",
          alignment: !!options.alignment ? options.alignment : "start"
        };
        var getAlignment = function getAlignment() {
          switch (options.alignment) {
            case "end":
              return "flex-end";
            case "center":
              return "center";
            case "start":
            default:
              return "flex-start";
          }
        };
        actionButtonParentStyles = {
          display: "flex",
          justifyContent: getAlignment(),
          alignItems: "center"
        };
      }

      return _react2.default.createElement(
        "div",
        null,
        !this.props.onErrors && _react2.default.createElement(_formValidator2.default, { emitter: this.emitter }),
        _react2.default.createElement(
          "div",
          { className: "react-form-builder-form" },
          _react2.default.createElement(
            "form",
            {
              encType: "multipart/form-data",
              ref: function ref(c) {
                return _this6.form = c;
              },
              action: this.props.form_action,
              onSubmit: this.handleSubmit.bind(this),
              method: this.props.form_method
            },
            this.props.authenticity_token && _react2.default.createElement(
              "div",
              { style: formTokenStyle },
              _react2.default.createElement("input", { name: "utf8", type: "hidden", value: "\u2713" }),
              _react2.default.createElement("input", {
                name: "authenticity_token",
                type: "hidden",
                value: this.props.authenticity_token
              }),
              _react2.default.createElement("input", {
                name: "task_id",
                type: "hidden",
                value: this.props.task_id
              })
            ),
            items,
            _react2.default.createElement(
              "div",
              {
                className: "btn-toolbar",
                style: _extends({}, actionButtonParentStyles)
              },
              !this.props.hide_actions && _react2.default.createElement("input", {
                type: "submit",
                className: "btn btn-school btn-big btn-" + customSubmitButtonOptions.color,
                value: customSubmitButtonOptions.text
              }),
              !this.props.hide_actions && this.props.back_action && _react2.default.createElement(
                "a",
                {
                  href: this.props.back_action,
                  className: "btn btn-default btn-cancel btn-big"
                },
                backName
              )
            )
          )
        )
      );
    }
  }]);

  return ReactForm;
}(_react2.default.Component);

exports.default = ReactForm;


ReactForm.defaultProps = { validateForCorrectness: false };