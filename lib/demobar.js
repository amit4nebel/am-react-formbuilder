'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('./stores/store');

var _store2 = _interopRequireDefault(_store);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _dialog = require('primereact/dialog');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Define Answer data to diplay pre-filled values in form elements 
let answerData = {
    "text_input_DEA657C9-4404-4A16-A935-9D9E4E235D6E" : "Connvertex"
};  */

var Demobar = function (_React$Component) {
  _inherits(Demobar, _React$Component);

  function Demobar(props) {
    _classCallCheck(this, Demobar);

    var _this = _possibleConstructorReturn(this, (Demobar.__proto__ || Object.getPrototypeOf(Demobar)).call(this, props));

    _this.state = {
      data: [],
      //answer_data :answerData,
      answer_data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false
    };

    var update = _this._onChange.bind(_this);
    _this._onSubmit = _this._onSubmit.bind(_this);

    _store2.default.subscribe(function (state) {
      return update(state.data);
    });
    //store.subscribe(state => update(state.answer_data));
    return _this;
  }

  _createClass(Demobar, [{
    key: 'showPreview',
    value: function showPreview() {
      this.setState({
        previewVisible: true
      });
    }
  }, {
    key: 'showShortPreview',
    value: function showShortPreview() {
      this.setState({
        shortPreviewVisible: true
      });
    }
  }, {
    key: 'showRoPreview',
    value: function showRoPreview() {
      this.setState({
        roPreviewVisible: true
      });
    }
  }, {
    key: 'closePreview',
    value: function closePreview() {
      this.setState({
        previewVisible: false,
        shortPreviewVisible: false,
        roPreviewVisible: false
      });
    }
  }, {
    key: '_onChange',
    value: function _onChange(data) {
      this.setState({
        data: data
      });
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(data) {
      console.log('onSubmit', data);
      // Place code to post json data to server here
    }
  }, {
    key: 'render',
    value: function render() {
      var modalClass = 'modal';
      if (this.state.previewVisible) {
        modalClass += ' show';
      }

      var shortModalClass = 'modal short-modal';
      if (this.state.shortPreviewVisible) {
        shortModalClass += ' show';
      }

      var roModalClass = 'modal ro-modal';
      if (this.state.roPreviewVisible) {
        roModalClass += ' show';
      }

      return _react2.default.createElement(
        'div',
        { className: 'clearfix', style: { width: '100%', lineHeight: '50px' } },
        _react2.default.createElement(
          'a',
          { className: 'pull-right', style: { marginRight: '10px' }, onClick: this.showPreview.bind(this) },
          'Preview Form'
        ),
        this.state.previewVisible && _react2.default.createElement(
          _dialog.Dialog,
          { visible: this.state.previewVisible, header: 'Preview Form', className: 'previewForm', onHide: this.closePreview.bind(this) },
          _react2.default.createElement(_form2.default, {
            download_path: '',
            back_action: '/',
            back_name: 'Back',
            answer_data: this.state.answer_data,
            action_name: 'Save'
            // form_action="/"
            // form_method="POST"
            , onSubmit: this._onSubmit,
            variables: this.props.variables,
            data: this.state.data })
        ),
        this.state.roPreviewVisible && _react2.default.createElement(
          'div',
          { className: roModalClass },
          _react2.default.createElement(
            'div',
            { className: 'modal-dialog' },
            _react2.default.createElement(
              'div',
              { className: 'modal-content' },
              _react2.default.createElement(_form2.default, {
                download_path: '',
                back_action: '/',
                back_name: 'Back',
                answer_data: {},
                action_name: 'Save',
                form_action: '/',
                form_method: 'POST',
                read_only: true,
                variables: this.props.variables,
                hide_actions: true, data: this.state.data }),
              _react2.default.createElement(
                'div',
                { className: 'modal-footer' },
                _react2.default.createElement(
                  'button',
                  { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal', onClick: this.closePreview.bind(this) },
                  'Close'
                )
              )
            )
          )
        ),
        this.state.shortPreviewVisible && _react2.default.createElement(
          'div',
          { className: shortModalClass },
          _react2.default.createElement(
            'div',
            { className: 'modal-dialog' },
            _react2.default.createElement(
              'div',
              { className: 'modal-content' },
              _react2.default.createElement(_form2.default, {
                download_path: '',
                back_action: '',
                answer_data: {},
                form_action: '/',
                form_method: 'POST',
                data: this.state.data,
                display_short: true,
                variables: this.props.variables,
                hide_actions: false }),
              _react2.default.createElement(
                'div',
                { className: 'modal-footer' },
                _react2.default.createElement(
                  'button',
                  { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal', onClick: this.closePreview.bind(this) },
                  'Close'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Demobar;
}(_react2.default.Component);

exports.default = Demobar;