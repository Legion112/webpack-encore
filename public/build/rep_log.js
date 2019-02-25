(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["rep_log"],{

/***/ "./assets/js/Componets/RepLogApp.js":
/*!******************************************!*\
  !*** ./assets/js/Componets/RepLogApp.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RepLogHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RepLogHelper */ "./assets/js/Componets/RepLogHelper.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Routing */ "./assets/js/Componets/Routing.js");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var HelperInstances = new WeakMap();

var RepLogApp =
/*#__PURE__*/
function () {
  function RepLogApp($wrapper) {
    _classCallCheck(this, RepLogApp);

    this.$wrapper = $wrapper;
    this.repLogs = [];
    HelperInstances.set(this, new _RepLogHelper__WEBPACK_IMPORTED_MODULE_0__["default"](this.repLogs));
    this.loadRepLogs();
    this.$wrapper.on('click', '.js-delete-rep-log', this.handleRepLogDelete.bind(this));
    this.$wrapper.on('click', 'tbody tr', this.handleRowClick.bind(this));
    this.$wrapper.on('submit', RepLogApp._selectors.newRepForm, this.handleNewFormSubmit.bind(this));
  }
  /**
   * Call like this.selectors
   */


  _createClass(RepLogApp, [{
    key: "loadRepLogs",
    value: function loadRepLogs() {
      var _this = this;

      jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajax({
        url: _Routing__WEBPACK_IMPORTED_MODULE_3__["default"].generate('rep_log_list')
      }).then(function (data) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = data.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var repLog = _step.value;

            _this._addRow(repLog);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }
  }, {
    key: "updateTotalWeightLifted",
    value: function updateTotalWeightLifted() {
      this.$wrapper.find('.js-total-weight').html(HelperInstances.get(this).getTotalWeightString());
    }
  }, {
    key: "handleRepLogDelete",
    value: function handleRepLogDelete(e) {
      var _this2 = this;

      e.preventDefault();
      var $link = jquery__WEBPACK_IMPORTED_MODULE_1___default()(e.currentTarget);
      sweetalert2__WEBPACK_IMPORTED_MODULE_2___default()({
        title: 'Delete this log?',
        text: 'What? Did you not actually lift this?',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: function preConfirm() {
          return _this2._deleteRepLog($link);
        }
      });
    }
  }, {
    key: "_deleteRepLog",
    value: function _deleteRepLog($link) {
      var _this3 = this;

      $link.addClass('text-danger');
      $link.find('.fa').removeClass('fa-trash').addClass('fa-spinner').addClass('fa-spin');
      var deleteUrl = $link.data('url');
      var $row = $link.closest('tr');
      return jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajax({
        url: deleteUrl,
        method: 'DELETE'
      }).then(function () {
        $row.fadeOut('normal', function () {
          // we need to remove the repLog from this.repLogs
          // the "key" is the index to this repLog on this.repLogs
          _this3.repLogs.splice($row.data('key'), 1);

          $row.remove();

          _this3.updateTotalWeightLifted();
        });
      });
    }
  }, {
    key: "handleRowClick",
    value: function handleRowClick() {
      console.log('row clicked!');
    }
  }, {
    key: "handleNewFormSubmit",
    value: function handleNewFormSubmit(e) {
      var _this4 = this;

      e.preventDefault();
      var $form = jquery__WEBPACK_IMPORTED_MODULE_1___default()(e.currentTarget);
      var formData = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = $form.serializeArray()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var fieldData = _step2.value;
          formData[fieldData.name] = fieldData.value;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this._saveRepLog(formData).then(function (data) {
        _this4._clearForm();

        _this4._addRow(data);
      }).catch(function (errorData) {
        _this4._mapErrorsToForm(errorData.errors);
      });
    }
  }, {
    key: "_saveRepLog",
    value: function _saveRepLog(data) {
      return new Promise(function (resolve, reject) {
        var url = _Routing__WEBPACK_IMPORTED_MODULE_3__["default"].generate('rep_log_new');
        jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajax({
          url: url,
          method: 'POST',
          data: JSON.stringify(data)
        }).then(function (data, textStatus, jqXHR) {
          jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajax({
            url: jqXHR.getResponseHeader('Location')
          }).then(function (data) {
            // we're finally done!
            resolve(data);
          });
        }).catch(function (jqXHR) {
          var errorData = JSON.parse(jqXHR.responseText);
          reject(errorData);
        });
      });
    }
  }, {
    key: "_mapErrorsToForm",
    value: function _mapErrorsToForm(errorData) {
      this._removeFormErrors();

      var $form = this.$wrapper.find(RepLogApp._selectors.newRepForm);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = $form.find(':input')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var element = _step3.value;
          var fieldName = jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).attr('name');
          var $wrapper = jquery__WEBPACK_IMPORTED_MODULE_1___default()(element).closest('.form-group');

          if (!errorData[fieldName]) {
            // no error!
            return;
          }

          var $error = jquery__WEBPACK_IMPORTED_MODULE_1___default()('<span class="js-field-error help-block"></span>');
          $error.html(errorData[fieldName]);
          $wrapper.append($error);
          $wrapper.addClass('has-error');
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "_removeFormErrors",
    value: function _removeFormErrors() {
      var $form = this.$wrapper.find(RepLogApp._selectors.newRepForm);
      $form.find('.js-field-error').remove();
      $form.find('.form-group').removeClass('has-error');
    }
  }, {
    key: "_clearForm",
    value: function _clearForm() {
      this._removeFormErrors();

      var $form = this.$wrapper.find(RepLogApp._selectors.newRepForm);
      $form[0].reset();
    }
  }, {
    key: "_addRow",
    value: function _addRow(repLog) {
      this.repLogs.push(repLog); // destructuring example
      // let {id, itemLabel, reps, totallyMadeUpKey = 'whatever!'} = repLog;
      // console.log(id, itemLabel, reps, totallyMadeUpKey);

      var html = rowTemplate(repLog);
      var $row = jquery__WEBPACK_IMPORTED_MODULE_1___default()(jquery__WEBPACK_IMPORTED_MODULE_1___default.a.parseHTML(html)); // store the repLogs index

      $row.data('key', this.repLogs.length - 1);
      this.$wrapper.find('tbody').append($row);
      this.updateTotalWeightLifted();
    }
  }], [{
    key: "_selectors",
    get: function get() {
      return {
        newRepForm: '.js-new-rep-log-form'
      };
    }
  }]);

  return RepLogApp;
}();

var rowTemplate = function rowTemplate(repLog) {
  return "\n<tr data-weight=\"".concat(repLog.totalWeightLifted, "\">\n    <td>").concat(repLog.itemLabel, "</td>\n    <td>").concat(repLog.reps, "</td>\n    <td>").concat(repLog.totalWeightLifted, "</td>\n    <td>\n        <a href=\"#\"\n           class=\"js-delete-rep-log\"\n           data-url=\"").concat(repLog.links._self, "\"\n        >\n            <span class=\"fa fa-trash\"></span>\n        </a>\n    </td>\n</tr>\n");
};

/* harmony default export */ __webpack_exports__["default"] = (RepLogApp);

/***/ }),

/***/ "./assets/js/Componets/RepLogHelper.js":
/*!*********************************************!*\
  !*** ./assets/js/Componets/RepLogHelper.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Helper =
/*#__PURE__*/
function () {
  function Helper(repLogs) {
    _classCallCheck(this, Helper);

    this.repLogs = repLogs;
  }

  _createClass(Helper, [{
    key: "calculateTotalWeight",
    value: function calculateTotalWeight() {
      return Helper._calculateWeights(this.repLogs);
    }
  }, {
    key: "getTotalWeightString",
    value: function getTotalWeightString() {
      var maxWeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
      var weight = this.calculateTotalWeight();

      if (weight > maxWeight) {
        weight = maxWeight + '+';
      }

      return weight + ' lbs';
    }
  }], [{
    key: "_calculateWeights",
    value: function _calculateWeights(repLogs) {
      var totalWeight = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = repLogs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var repLog = _step.value;
          totalWeight += repLog.totalWeightLifted;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return totalWeight;
    }
  }]);

  return Helper;
}();

/* harmony default export */ __webpack_exports__["default"] = (Helper);

/***/ }),

/***/ "./assets/js/Componets/Routing.js":
/*!****************************************!*\
  !*** ./assets/js/Componets/Routing.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (window.Routing);

/***/ }),

/***/ "./assets/js/rep_log.js":
/*!******************************!*\
  !*** ./assets/js/rep_log.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Componets_RepLogApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Componets/RepLogApp */ "./assets/js/Componets/RepLogApp.js");




var $wrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-rep-log-table');
var repLogApp = new _Componets_RepLogApp__WEBPACK_IMPORTED_MODULE_1__["default"]($wrapper);

/***/ }),

/***/ "./node_modules/sweetalert2/dist/sweetalert2.all.js":
/*!**********************************************************!*\
  !*** ./node_modules/sweetalert2/dist/sweetalert2.all.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * sweetalert2 v7.12.0
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

var styles = "body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    height: 2.2em; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {\n    height: 2em;\n    margin: .3125em auto;\n    font-size: 1em; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {\n    font-size: 1em; }\n\nbody.swal2-toast-shown > .swal2-container {\n  position: fixed;\n  background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-shown {\n    background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-top {\n    top: 0;\n    right: auto;\n    bottom: auto;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {\n    top: 0;\n    right: 0;\n    bottom: auto;\n    left: auto; }\n  body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {\n    top: 0;\n    right: auto;\n    bottom: auto;\n    left: 0; }\n  body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {\n    top: 50%;\n    right: auto;\n    bottom: auto;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center {\n    top: 50%;\n    right: auto;\n    bottom: auto;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {\n    top: 50%;\n    right: 0;\n    bottom: auto;\n    left: auto;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {\n    top: auto;\n    right: auto;\n    bottom: 0;\n    left: 0; }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom {\n    top: auto;\n    right: auto;\n    bottom: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {\n    top: auto;\n    right: 0;\n    bottom: 0;\n    left: auto; }\n\n.swal2-popup.swal2-toast {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: auto;\n  padding: 0.625em;\n  -webkit-box-shadow: 0 0 10px #d9d9d9;\n          box-shadow: 0 0 10px #d9d9d9;\n  overflow-y: hidden; }\n  .swal2-popup.swal2-toast .swal2-header {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  .swal2-popup.swal2-toast .swal2-title {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    margin: 0 .6em;\n    font-size: 1em; }\n  .swal2-popup.swal2-toast .swal2-close {\n    position: initial; }\n  .swal2-popup.swal2-toast .swal2-content {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    font-size: 1em; }\n  .swal2-popup.swal2-toast .swal2-icon {\n    width: 32px;\n    min-width: 32px;\n    height: 32px;\n    margin: 0; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-info, .swal2-popup.swal2-toast .swal2-icon.swal2-warning, .swal2-popup.swal2-toast .swal2-icon.swal2-question {\n      font-size: 26px;\n      line-height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      top: 14px;\n      width: 22px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        left: 5px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        right: 5px; }\n  .swal2-popup.swal2-toast .swal2-actions {\n    height: auto;\n    margin: 0 .3125em; }\n  .swal2-popup.swal2-toast .swal2-styled {\n    margin: 0 .3125em;\n    padding: .3125em .625em;\n    font-size: 1em; }\n    .swal2-popup.swal2-toast .swal2-styled:focus {\n      -webkit-box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4); }\n  .swal2-popup.swal2-toast .swal2-success {\n    border-color: #a5dc86; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {\n      position: absolute;\n      width: 32px;\n      height: 45px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      border-radius: 50%; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        top: -4px;\n        left: -15px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 32px 32px;\n                transform-origin: 32px 32px;\n        border-radius: 64px 0 0 64px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        top: -4px;\n        left: 15px;\n        -webkit-transform-origin: 0 32px;\n                transform-origin: 0 32px;\n        border-radius: 0 64px 64px 0; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {\n      top: 0;\n      left: 7px;\n      width: 7px;\n      height: 43px; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {\n      height: 5px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {\n        top: 18px;\n        left: 3px;\n        width: 12px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {\n        top: 15px;\n        right: 3px;\n        width: 22px; }\n  .swal2-popup.swal2-toast.swal2-show {\n    -webkit-animation: showSweetToast .5s;\n            animation: showSweetToast .5s; }\n  .swal2-popup.swal2-toast.swal2-hide {\n    -webkit-animation: hideSweetToast .2s forwards;\n            animation: hideSweetToast .2s forwards; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-tip {\n    -webkit-animation: animate-toast-success-tip .75s;\n            animation: animate-toast-success-tip .75s; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-long {\n    -webkit-animation: animate-toast-success-long .75s;\n            animation: animate-toast-success-long .75s; }\n\n@-webkit-keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@-webkit-keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@-webkit-keyframes animate-toast-success-tip {\n  0% {\n    top: 9px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 2px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 10px;\n    left: -4px;\n    width: 26px; }\n  84% {\n    top: 17px;\n    left: 12px;\n    width: 8px; }\n  100% {\n    top: 18px;\n    left: 3px;\n    width: 12px; } }\n\n@keyframes animate-toast-success-tip {\n  0% {\n    top: 9px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 2px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 10px;\n    left: -4px;\n    width: 26px; }\n  84% {\n    top: 17px;\n    left: 12px;\n    width: 8px; }\n  100% {\n    top: 18px;\n    left: 3px;\n    width: 12px; } }\n\n@-webkit-keyframes animate-toast-success-long {\n  0% {\n    top: 26px;\n    right: 22px;\n    width: 0; }\n  65% {\n    top: 20px;\n    right: 15px;\n    width: 0; }\n  84% {\n    top: 15px;\n    right: 0;\n    width: 18px; }\n  100% {\n    top: 15px;\n    right: 3px;\n    width: 22px; } }\n\n@keyframes animate-toast-success-long {\n  0% {\n    top: 26px;\n    right: 22px;\n    width: 0; }\n  65% {\n    top: 20px;\n    right: 15px;\n    width: 0; }\n  84% {\n    top: 15px;\n    right: 0;\n    width: 18px; }\n  100% {\n    top: 15px;\n    right: 3px;\n    width: 22px; } }\n\nhtml.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown),\nbody.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {\n  height: auto;\n  overflow-y: hidden; }\n\nbody.swal2-iosfix {\n  position: fixed;\n  right: 0;\n  left: 0; }\n\nbody.swal2-no-backdrop .swal2-shown {\n  top: auto;\n  right: auto;\n  bottom: auto;\n  left: auto;\n  background-color: transparent; }\n  body.swal2-no-backdrop .swal2-shown > .swal2-modal {\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {\n    top: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {\n    top: 0;\n    right: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-center {\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {\n    top: 50%;\n    right: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom {\n    bottom: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {\n    bottom: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {\n    right: 0;\n    bottom: 0; }\n\n.swal2-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 10px;\n  background-color: transparent;\n  z-index: 1060;\n  overflow-x: hidden; }\n  .swal2-container.swal2-top {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-center {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-bottom {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-grow-fullscreen > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-row > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-column {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start; }\n    .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {\n      -webkit-box-align: end;\n          -ms-flex-align: end;\n              align-items: flex-end; }\n    .swal2-container.swal2-grow-column > .swal2-modal {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      -ms-flex-line-pack: center;\n          align-content: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {\n    margin: auto; }\n  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n    .swal2-container .swal2-modal {\n      margin: 0 !important; } }\n  .swal2-container.swal2-fade {\n    -webkit-transition: background-color .1s;\n    transition: background-color .1s; }\n  .swal2-container.swal2-shown {\n    background-color: rgba(0, 0, 0, 0.4); }\n\n.swal2-popup {\n  display: none;\n  position: relative;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 32em;\n  max-width: 100%;\n  padding: 1.25em;\n  border-radius: .3125em;\n  background-color: #fff;\n  font-family: inherit;\n  font-size: 1rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow-x: hidden;\n  overflow-y: auto; }\n  .swal2-popup:focus {\n    outline: none; }\n  .swal2-popup.swal2-loading {\n    overflow-y: hidden; }\n  .swal2-popup .swal2-header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-popup .swal2-title {\n    display: block;\n    position: relative;\n    margin: 0 0 .4em;\n    padding: 0;\n    color: #595959;\n    font-size: 1.875em;\n    font-weight: 600;\n    text-align: center;\n    text-transform: none;\n    word-wrap: break-word; }\n  .swal2-popup .swal2-actions {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 1.25em; }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {\n      opacity: .4; }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover {\n      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0.1)));\n      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)); }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active {\n      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.2)), to(rgba(0, 0, 0, 0.2)));\n      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {\n      width: 2.5em;\n      height: 2.5em;\n      margin: .46875em;\n      padding: 0;\n      border: .25em solid transparent;\n      border-radius: 100%;\n      border-color: transparent;\n      background-color: transparent !important;\n      color: transparent;\n      cursor: default;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none; }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {\n      margin-right: 30px;\n      margin-left: 30px; }\n    .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n      display: inline-block;\n      width: 15px;\n      height: 15px;\n      margin-left: 5px;\n      border: 3px solid #999999;\n      border-radius: 50%;\n      border-right-color: transparent;\n      -webkit-box-shadow: 1px 1px 1px #fff;\n              box-shadow: 1px 1px 1px #fff;\n      content: '';\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal; }\n  .swal2-popup .swal2-styled {\n    margin: 0 .3125em;\n    padding: .625em 2em;\n    font-weight: 500;\n    -webkit-box-shadow: none;\n            box-shadow: none; }\n    .swal2-popup .swal2-styled:not([disabled]) {\n      cursor: pointer; }\n    .swal2-popup .swal2-styled.swal2-confirm {\n      border: 0;\n      border-radius: 0.25em;\n      background-color: #3085d6;\n      color: #fff;\n      font-size: 1.0625em; }\n    .swal2-popup .swal2-styled.swal2-cancel {\n      border: 0;\n      border-radius: 0.25em;\n      background-color: #aaa;\n      color: #fff;\n      font-size: 1.0625em; }\n    .swal2-popup .swal2-styled:focus {\n      outline: none;\n      -webkit-box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }\n    .swal2-popup .swal2-styled::-moz-focus-inner {\n      border: 0; }\n  .swal2-popup .swal2-footer {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 1.25em;\n    padding-top: 1em;\n    border-top: 1px solid #eee;\n    color: #545454;\n    font-size: 1em; }\n  .swal2-popup .swal2-image {\n    max-width: 100%;\n    margin: 1.25em auto; }\n  .swal2-popup .swal2-close {\n    position: absolute;\n    top: 5px;\n    right: 8px;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 1.2em;\n    min-width: 1.2em;\n    height: 1.2em;\n    margin: 0;\n    padding: 0;\n    -webkit-transition: color .1s ease;\n    transition: color .1s ease;\n    border: 0;\n    background: transparent;\n    color: #cccccc;\n    font-family: serif;\n    font-size: calc(2.5em - 0.25em);\n    line-height: 1.2em;\n    cursor: pointer; }\n    .swal2-popup .swal2-close:hover {\n      color: #d55; }\n  .swal2-popup > .swal2-input,\n  .swal2-popup > .swal2-file,\n  .swal2-popup > .swal2-textarea,\n  .swal2-popup > .swal2-select,\n  .swal2-popup > .swal2-radio,\n  .swal2-popup > .swal2-checkbox {\n    display: none; }\n  .swal2-popup .swal2-content {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin: 0;\n    padding: 0;\n    color: #545454;\n    font-size: 1.125em;\n    font-weight: 300;\n    line-height: normal;\n    word-wrap: break-word; }\n  .swal2-popup #swal2-content {\n    text-align: center; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea,\n  .swal2-popup .swal2-select,\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    margin: 1em auto; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea {\n    width: 100%;\n    -webkit-transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s, -webkit-box-shadow .3s;\n    border: 1px solid #d9d9d9;\n    border-radius: 3px;\n    font-size: 1.125em;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n    .swal2-popup .swal2-input.swal2-inputerror,\n    .swal2-popup .swal2-file.swal2-inputerror,\n    .swal2-popup .swal2-textarea.swal2-inputerror {\n      border-color: #f27474 !important;\n      -webkit-box-shadow: 0 0 2px #f27474 !important;\n              box-shadow: 0 0 2px #f27474 !important; }\n    .swal2-popup .swal2-input:focus,\n    .swal2-popup .swal2-file:focus,\n    .swal2-popup .swal2-textarea:focus {\n      border: 1px solid #b4dbed;\n      outline: none;\n      -webkit-box-shadow: 0 0 3px #c4e6f5;\n              box-shadow: 0 0 3px #c4e6f5; }\n    .swal2-popup .swal2-input::-webkit-input-placeholder,\n    .swal2-popup .swal2-file::-webkit-input-placeholder,\n    .swal2-popup .swal2-textarea::-webkit-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input:-ms-input-placeholder,\n    .swal2-popup .swal2-file:-ms-input-placeholder,\n    .swal2-popup .swal2-textarea:-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::-ms-input-placeholder,\n    .swal2-popup .swal2-file::-ms-input-placeholder,\n    .swal2-popup .swal2-textarea::-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::placeholder,\n    .swal2-popup .swal2-file::placeholder,\n    .swal2-popup .swal2-textarea::placeholder {\n      color: #cccccc; }\n  .swal2-popup .swal2-range input {\n    width: 80%; }\n  .swal2-popup .swal2-range output {\n    width: 20%;\n    font-weight: 600;\n    text-align: center; }\n  .swal2-popup .swal2-range input,\n  .swal2-popup .swal2-range output {\n    height: 2.625em;\n    margin: 1em auto;\n    padding: 0;\n    font-size: 1.125em;\n    line-height: 2.625em; }\n  .swal2-popup .swal2-input {\n    height: 2.625em;\n    padding: 0 .75em; }\n    .swal2-popup .swal2-input[type='number'] {\n      max-width: 10em; }\n  .swal2-popup .swal2-file {\n    font-size: 1.125em; }\n  .swal2-popup .swal2-textarea {\n    height: 6.75em;\n    padding: .75em; }\n  .swal2-popup .swal2-select {\n    min-width: 50%;\n    max-width: 100%;\n    padding: .375em .625em;\n    color: #545454;\n    font-size: 1.125em; }\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    .swal2-popup .swal2-radio label,\n    .swal2-popup .swal2-checkbox label {\n      margin: 0 .6em;\n      font-size: 1.125em; }\n    .swal2-popup .swal2-radio input,\n    .swal2-popup .swal2-checkbox input {\n      margin: 0 .4em; }\n  .swal2-popup .swal2-validationerror {\n    display: none;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: .625em;\n    background-color: #f0f0f0;\n    color: gray;\n    font-size: 1em;\n    font-weight: 300;\n    overflow: hidden; }\n    .swal2-popup .swal2-validationerror::before {\n      display: inline-block;\n      width: 1.5em;\n      height: 1.5em;\n      margin: 0 .625em;\n      border-radius: 50%;\n      background-color: #ea7d7d;\n      color: #fff;\n      font-weight: 600;\n      line-height: 1.5em;\n      text-align: center;\n      content: '!'; }\n\n@supports (-ms-accelerator: true) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n.swal2-icon {\n  position: relative;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 80px;\n  height: 80px;\n  margin: 1.25em auto 1.875em;\n  border: 4px solid transparent;\n  border-radius: 50%;\n  line-height: 80px;\n  cursor: default;\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .swal2-icon.swal2-error {\n    border-color: #f27474; }\n    .swal2-icon.swal2-error .swal2-x-mark {\n      position: relative;\n      -webkit-box-flex: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1; }\n    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      display: block;\n      position: absolute;\n      top: 37px;\n      width: 47px;\n      height: 5px;\n      border-radius: 2px;\n      background-color: #f27474; }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        left: 17px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        right: 16px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n  .swal2-icon.swal2-warning, .swal2-icon.swal2-info, .swal2-icon.swal2-question {\n    margin: .333333em auto .5em;\n    font-family: inherit;\n    font-size: 3.75em; }\n  .swal2-icon.swal2-warning {\n    border-color: #facea8;\n    color: #f8bb86; }\n  .swal2-icon.swal2-info {\n    border-color: #9de0f6;\n    color: #3fc3ee; }\n  .swal2-icon.swal2-question {\n    border-color: #c9dae1;\n    color: #87adbd; }\n  .swal2-icon.swal2-success {\n    border-color: #a5dc86; }\n    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n      position: absolute;\n      width: 60px;\n      height: 120px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      border-radius: 50%; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        top: -7px;\n        left: -33px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 60px 60px;\n                transform-origin: 60px 60px;\n        border-radius: 120px 0 0 120px; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        top: -11px;\n        left: 30px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 0 60px;\n                transform-origin: 0 60px;\n        border-radius: 0 120px 120px 0; }\n    .swal2-icon.swal2-success .swal2-success-ring {\n      position: absolute;\n      top: -4px;\n      left: -4px;\n      width: 80px;\n      height: 80px;\n      border: 4px solid rgba(165, 220, 134, 0.2);\n      border-radius: 50%;\n      z-index: 2;\n      -webkit-box-sizing: content-box;\n              box-sizing: content-box; }\n    .swal2-icon.swal2-success .swal2-success-fix {\n      position: absolute;\n      top: 8px;\n      left: 26px;\n      width: 7px;\n      height: 90px;\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg);\n      z-index: 1; }\n    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n      display: block;\n      position: absolute;\n      height: 5px;\n      border-radius: 2px;\n      background-color: #a5dc86;\n      z-index: 2; }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n        top: 46px;\n        left: 14px;\n        width: 25px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n        top: 38px;\n        right: 8px;\n        width: 47px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n\n.swal2-progresssteps {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 0 0 1.25em;\n  padding: 0;\n  font-weight: 600; }\n  .swal2-progresssteps li {\n    display: inline-block;\n    position: relative; }\n  .swal2-progresssteps .swal2-progresscircle {\n    width: 2em;\n    height: 2em;\n    border-radius: 2em;\n    background: #3085d6;\n    color: #fff;\n    line-height: 2em;\n    text-align: center;\n    z-index: 20; }\n    .swal2-progresssteps .swal2-progresscircle:first-child {\n      margin-left: 0; }\n    .swal2-progresssteps .swal2-progresscircle:last-child {\n      margin-right: 0; }\n    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n      background: #3085d6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n        background: #add8e6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n        background: #add8e6; }\n  .swal2-progresssteps .swal2-progressline {\n    width: 2.5em;\n    height: .4em;\n    margin: 0 -1px;\n    background: #3085d6;\n    z-index: 10; }\n\n[class^='swal2'] {\n  -webkit-tap-highlight-color: transparent; }\n\n@-webkit-keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@-webkit-keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n@keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n.swal2-show {\n  -webkit-animation: showSweetAlert .3s;\n          animation: showSweetAlert .3s; }\n  .swal2-show.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n.swal2-hide {\n  -webkit-animation: hideSweetAlert .15s forwards;\n          animation: hideSweetAlert .15s forwards; }\n  .swal2-hide.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n[dir='rtl'] .swal2-close {\n  right: auto;\n  left: 8px; }\n\n@-webkit-keyframes animate-success-tip {\n  0% {\n    top: 19px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 17px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 35px;\n    left: -6px;\n    width: 50px; }\n  84% {\n    top: 48px;\n    left: 21px;\n    width: 17px; }\n  100% {\n    top: 45px;\n    left: 14px;\n    width: 25px; } }\n\n@keyframes animate-success-tip {\n  0% {\n    top: 19px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 17px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 35px;\n    left: -6px;\n    width: 50px; }\n  84% {\n    top: 48px;\n    left: 21px;\n    width: 17px; }\n  100% {\n    top: 45px;\n    left: 14px;\n    width: 25px; } }\n\n@-webkit-keyframes animate-success-long {\n  0% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  65% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  84% {\n    top: 35px;\n    right: 0;\n    width: 55px; }\n  100% {\n    top: 38px;\n    right: 8px;\n    width: 47px; } }\n\n@keyframes animate-success-long {\n  0% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  65% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  84% {\n    top: 35px;\n    right: 0;\n    width: 55px; }\n  100% {\n    top: 38px;\n    right: 8px;\n    width: 47px; } }\n\n@-webkit-keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n@keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n.swal2-animate-success-line-tip {\n  -webkit-animation: animate-success-tip .75s;\n          animation: animate-success-tip .75s; }\n\n.swal2-animate-success-line-long {\n  -webkit-animation: animate-success-long .75s;\n          animation: animate-success-long .75s; }\n\n.swal2-success.swal2-animate-success-icon .swal2-success-circular-line-right {\n  -webkit-animation: rotatePlaceholder 4.25s ease-in;\n          animation: rotatePlaceholder 4.25s ease-in; }\n\n@-webkit-keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n@keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n.swal2-animate-error-icon {\n  -webkit-animation: animate-error-icon .5s;\n          animation: animate-error-icon .5s; }\n\n@-webkit-keyframes animate-x-mark {\n  0% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  50% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  80% {\n    margin-top: -6px;\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15); }\n  100% {\n    margin-top: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n@keyframes animate-x-mark {\n  0% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  50% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  80% {\n    margin-top: -6px;\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15); }\n  100% {\n    margin-top: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n.swal2-animate-x-mark {\n  -webkit-animation: animate-x-mark .5s;\n          animation: animate-x-mark .5s; }\n\n@-webkit-keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n";

var defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  type: null,
  toast: false,
  customClass: '',
  target: 'body',
  backdrop: true,
  animation: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: null,
  confirmButtonClass: null,
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: null,
  cancelButtonClass: null,
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusCancel: false,
  showCloseButton: false,
  closeButtonAriaLabel: 'Close this dialog',
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageAlt: '',
  imageClass: null,
  timer: null,
  width: null,
  padding: null,
  background: null,
  input: null,
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: null,
  inputAttributes: {},
  inputValidator: null,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: null,
  progressStepsDistance: null,
  onBeforeOpen: null,
  onOpen: null,
  onClose: null,
  useRejections: false,
  expectRejections: false
};

var deprecatedParams = ['useRejections', 'expectRejections'];

var swalPrefix = 'swal2-';

var prefix = function prefix(items) {
  var result = {};
  for (var i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result;
};

var swalClasses = prefix(['container', 'shown', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);

var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

var consolePrefix = 'SweetAlert2:';

/**
 * Filter the unique values into a new array
 * @param arr
 */
var uniqueArray = function uniqueArray(arr) {
  var result = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      if (result.indexOf(elem) === -1) {
        result.push(elem);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

/**
 * Convert object into iterable Map
 * https://stackoverflow.com/a/36644532/1331425
 * @param obj
 */
var objectToMap = function objectToMap(obj) {
  if (obj instanceof Map) {
    return obj;
  }
  var map = new Map();
  Object.keys(obj).forEach(function (key) {
    map.set(key, obj[key]);
  });
  return map;
};

/**
 * Standardise console warnings
 * @param message
 */
var warn = function warn(message) {
  console.warn(consolePrefix + ' ' + message);
};

/**
 * Standardise console errors
 * @param message
 */
var error = function error(message) {
  console.error(consolePrefix + ' ' + message);
};

/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */
var previousWarnOnceMessages = [];

/**
 * Show a console warning, but only if it hasn't already been shown
 * @param message
 */
var warnOnce = function warnOnce(message) {
  if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */
var callIfFunction = function callIfFunction(arg) {
  return typeof arg === 'function' ? arg() : arg;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var popupParams = _extends({}, defaultParams);
var queue = [];

var previousWindowKeyDown = void 0;
var windowOnkeydownOverridden = void 0;

/**
 * Show relevant warnings for given params
 *
 * @param params
 */
var showWarningsForParams = function showWarningsForParams(params) {
  for (var param in params) {
    if (!sweetAlert.isValidParameter(param)) {
      warn('Unknown parameter "' + param + '"');
    }
    if (sweetAlert.isDeprecatedParameter(param)) {
      warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
    }
  }
};

/**
 * Set type, text and actions on popup
 *
 * @param params
 * @returns {boolean}
 */
var setParameters = function setParameters(params) {
  // Determine if the custom target element is valid
  if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
    warn('Target parameter is not valid, defaulting to "body"');
    params.target = 'body';
  }

  var popup = void 0;
  var oldPopup = getPopup();
  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  // If the model target has changed, refresh the popup
  if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
    popup = init(params);
  } else {
    popup = oldPopup || init(params);
  }

  // Set popup width
  if (params.width) {
    popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
  }

  // Set popup padding
  if (params.padding) {
    popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
  }

  // Set popup background
  if (params.background) {
    popup.style.background = params.background;
  }
  var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
  var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
  for (var i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor;
  }

  var container = getContainer();
  var title = getTitle();
  var content = getContent().querySelector('#' + swalClasses.content);
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();
  var closeButton = getCloseButton();
  var footer = getFooter();

  // Title
  if (params.titleText) {
    title.innerText = params.titleText;
  } else if (params.title) {
    title.innerHTML = params.title.split('\n').join('<br />');
  }

  if (typeof params.backdrop === 'string') {
    getContainer().style.background = params.backdrop;
  } else if (!params.backdrop) {
    addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
  }

  // Content as HTML
  if (params.html) {
    parseHtmlToContainer(params.html, content);

    // Content as plain text
  } else if (params.text) {
    content.textContent = params.text;
    show(content);
  } else {
    hide(content);
  }

  // Position
  if (params.position in swalClasses) {
    addClass(container, swalClasses[params.position]);
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"');
    addClass(container, swalClasses.center);
  }

  // Grow
  if (params.grow && typeof params.grow === 'string') {
    var growClass = 'grow-' + params.grow;
    if (growClass in swalClasses) {
      addClass(container, swalClasses[growClass]);
    }
  }

  // Animation
  if (typeof params.animation === 'function') {
    params.animation = params.animation.call();
  }

  // Close button
  if (params.showCloseButton) {
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    show(closeButton);
  } else {
    hide(closeButton);
  }

  // Default Class
  popup.className = swalClasses.popup;
  if (params.toast) {
    addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    addClass(popup, swalClasses.toast);
  } else {
    addClass(popup, swalClasses.modal);
  }

  // Custom Class
  if (params.customClass) {
    addClass(popup, params.customClass);
  }

  // Progress steps
  var progressStepsContainer = getProgressSteps();
  var currentProgressStep = parseInt(params.currentProgressStep === null ? sweetAlert.getQueueStep() : params.currentProgressStep, 10);
  if (params.progressSteps && params.progressSteps.length) {
    show(progressStepsContainer);
    empty(progressStepsContainer);
    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    params.progressSteps.forEach(function (step, index) {
      var circle = document.createElement('li');
      addClass(circle, swalClasses.progresscircle);
      circle.innerHTML = step;
      if (index === currentProgressStep) {
        addClass(circle, swalClasses.activeprogressstep);
      }
      progressStepsContainer.appendChild(circle);
      if (index !== params.progressSteps.length - 1) {
        var line = document.createElement('li');
        addClass(line, swalClasses.progressline);
        if (params.progressStepsDistance) {
          line.style.width = params.progressStepsDistance;
        }
        progressStepsContainer.appendChild(line);
      }
    });
  } else {
    hide(progressStepsContainer);
  }

  // Icon
  var icons = getIcons();
  for (var _i = 0; _i < icons.length; _i++) {
    hide(icons[_i]);
  }
  if (params.type) {
    var validType = false;
    for (var iconType in iconTypes) {
      if (params.type === iconType) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      error('Unknown alert type: ' + params.type);
      return false;
    }
    var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
    show(icon);

    // Animate icon
    if (params.animation) {
      switch (params.type) {
        case 'success':
          addClass(icon, 'swal2-animate-success-icon');
          addClass(icon.querySelector('.swal2-success-line-tip'), 'swal2-animate-success-line-tip');
          addClass(icon.querySelector('.swal2-success-line-long'), 'swal2-animate-success-line-long');
          break;
        case 'error':
          addClass(icon, 'swal2-animate-error-icon');
          addClass(icon.querySelector('.swal2-x-mark'), 'swal2-animate-x-mark');
          break;
        default:
          break;
      }
    }
  }

  // Custom image
  var image = getImage();
  if (params.imageUrl) {
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt);
    show(image);

    if (params.imageWidth) {
      image.setAttribute('width', params.imageWidth);
    } else {
      image.removeAttribute('width');
    }

    if (params.imageHeight) {
      image.setAttribute('height', params.imageHeight);
    } else {
      image.removeAttribute('height');
    }

    image.className = swalClasses.image;
    if (params.imageClass) {
      addClass(image, params.imageClass);
    }
  } else {
    hide(image);
  }

  // Cancel button
  if (params.showCancelButton) {
    cancelButton.style.display = 'inline-block';
  } else {
    hide(cancelButton);
  }

  // Confirm button
  if (params.showConfirmButton) {
    removeStyleProperty(confirmButton, 'display');
  } else {
    hide(confirmButton);
  }

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showCancelButton) {
    hide(actions);
  } else {
    show(actions);
  }

  // Edit text on confirm and cancel buttons
  confirmButton.innerHTML = params.confirmButtonText;
  cancelButton.innerHTML = params.cancelButtonText;

  // ARIA labels for confirm and cancel buttons
  confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
  cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel);

  // Add buttons custom classes
  confirmButton.className = swalClasses.confirm;
  addClass(confirmButton, params.confirmButtonClass);
  cancelButton.className = swalClasses.cancel;
  addClass(cancelButton, params.cancelButtonClass);

  // Buttons styling
  if (params.buttonsStyling) {
    addClass([confirmButton, cancelButton], swalClasses.styled);

    // Buttons background colors
    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }
    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    }

    // Loading state
    var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
  } else {
    removeClass([confirmButton, cancelButton], swalClasses.styled);

    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
  }

  // Footer
  parseHtmlToContainer(params.footer, footer);

  // CSS animation
  if (params.animation === true) {
    removeClass(popup, swalClasses.noanimation);
  } else {
    addClass(popup, swalClasses.noanimation);
  }

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
  }
};

/**
 * Animations
 *
 * @param animation
 * @param onBeforeOpen
 * @param onComplete
 */
var openPopup = function openPopup(animation, onBeforeOpen, onComplete) {
  var container = getContainer();
  var popup = getPopup();

  if (onBeforeOpen !== null && typeof onBeforeOpen === 'function') {
    onBeforeOpen(popup);
  }

  if (animation) {
    addClass(popup, swalClasses.show);
    addClass(container, swalClasses.fade);
    removeClass(popup, swalClasses.hide);
  } else {
    removeClass(popup, swalClasses.fade);
  }
  show(popup);

  // scrolling is 'hidden' until animation is done, after that 'auto'
  container.style.overflowY = 'hidden';
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      container.style.overflowY = 'auto';
    });
  } else {
    container.style.overflowY = 'auto';
  }

  addClass([document.documentElement, document.body, container], swalClasses.shown);
  if (isModal()) {
    fixScrollbar();
    iOSfix();
  }
  states.previousActiveElement = document.activeElement;
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(popup);
    });
  }
};

var fixScrollbar = function fixScrollbar() {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return;
  }
  // if the body has overflow
  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = document.body.style.paddingRight;
    document.body.style.paddingRight = measureScrollbar() + 'px';
  }
};

var undoScrollbar = function undoScrollbar() {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = states.previousBodyPadding;
    states.previousBodyPadding = null;
  }
};

// Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
var iOSfix = function iOSfix() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    var offset = document.body.scrollTop;
    document.body.style.top = offset * -1 + 'px';
    addClass(document.body, swalClasses.iosfix);
  }
};

var undoIOSfix = function undoIOSfix() {
  if (hasClass(document.body, swalClasses.iosfix)) {
    var offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

// SweetAlert entry point
var sweetAlert = function sweetAlert() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Prevent run in Node env
  if (typeof window === 'undefined') {
    return;
  }

  // Check for the existence of Promise
  if (typeof Promise === 'undefined') {
    error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
  }

  if (typeof args[0] === 'undefined') {
    error('SweetAlert2 expects at least 1 attribute!');
    return false;
  }

  var params = _extends({}, popupParams);

  switch (_typeof(args[0])) {
    case 'string':
      params.title = args[0];
      params.html = args[1];
      params.type = args[2];

      break;

    case 'object':
      showWarningsForParams(args[0]);
      _extends(params, args[0]);
      params.extraParams = args[0].extraParams;

      if (params.input === 'email' && params.inputValidator === null) {
        var inputValidator = function inputValidator(email) {
          return new Promise(function (resolve, reject) {
            var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/;
            if (emailRegex.test(email)) {
              resolve();
            } else {
              reject('Invalid email address');
            }
          });
        };
        params.inputValidator = params.expectRejections ? inputValidator : sweetAlert.adaptInputValidator(inputValidator);
      }

      if (params.input === 'url' && params.inputValidator === null) {
        var _inputValidator = function _inputValidator(url) {
          return new Promise(function (resolve, reject) {
            // taken from https://stackoverflow.com/a/3809435/1331425
            var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
            if (urlRegex.test(url)) {
              resolve();
            } else {
              reject('Invalid URL');
            }
          });
        };
        params.inputValidator = params.expectRejections ? _inputValidator : sweetAlert.adaptInputValidator(_inputValidator);
      }
      break;

    default:
      error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
      return false;
  }

  setParameters(params);

  var container = getContainer();
  var popup = getPopup();

  return new Promise(function (resolve, reject) {
    // functions to handle all resolving/rejecting/settling
    var succeedWith = function succeedWith(value) {
      sweetAlert.closePopup(params.onClose);
      if (params.useRejections) {
        resolve(value);
      } else {
        resolve({ value: value });
      }
    };
    var dismissWith = function dismissWith(dismiss) {
      sweetAlert.closePopup(params.onClose);
      if (params.useRejections) {
        reject(dismiss);
      } else {
        resolve({ dismiss: dismiss });
      }
    };
    var errorWith = function errorWith(error$$1) {
      sweetAlert.closePopup(params.onClose);
      reject(error$$1);
    };

    // Close on timer
    if (params.timer) {
      popup.timeout = setTimeout(function () {
        return dismissWith('timer');
      }, params.timer);
    }

    // Get input element by specified type or, if type isn't specified, by params.input
    var getInput = function getInput(inputType) {
      inputType = inputType || params.input;
      if (!inputType) {
        return null;
      }
      switch (inputType) {
        case 'select':
        case 'textarea':
        case 'file':
          return getChildByClass(content, swalClasses[inputType]);
        case 'checkbox':
          return popup.querySelector('.' + swalClasses.checkbox + ' input');
        case 'radio':
          return popup.querySelector('.' + swalClasses.radio + ' input:checked') || popup.querySelector('.' + swalClasses.radio + ' input:first-child');
        case 'range':
          return popup.querySelector('.' + swalClasses.range + ' input');
        default:
          return getChildByClass(content, swalClasses.input);
      }
    };

    // Get the value of the popup input
    var getInputValue = function getInputValue() {
      var input = getInput();
      if (!input) {
        return null;
      }
      switch (params.input) {
        case 'checkbox':
          return input.checked ? 1 : 0;
        case 'radio':
          return input.checked ? input.value : null;
        case 'file':
          return input.files.length ? input.files[0] : null;
        default:
          return params.inputAutoTrim ? input.value.trim() : input.value;
      }
    };

    // input autofocus
    if (params.input) {
      setTimeout(function () {
        var input = getInput();
        if (input) {
          focusInput(input);
        }
      }, 0);
    }

    var confirm = function confirm(value) {
      if (params.showLoaderOnConfirm) {
        sweetAlert.showLoading();
      }

      if (params.preConfirm) {
        sweetAlert.resetValidationError();
        var preConfirmPromise = Promise.resolve().then(function () {
          return params.preConfirm(value, params.extraParams);
        });
        if (params.expectRejections) {
          preConfirmPromise.then(function (preConfirmValue) {
            return succeedWith(preConfirmValue || value);
          }, function (validationError) {
            sweetAlert.hideLoading();
            if (validationError) {
              sweetAlert.showValidationError(validationError);
            }
          });
        } else {
          preConfirmPromise.then(function (preConfirmValue) {
            if (isVisible(getValidationError()) || preConfirmValue === false) {
              sweetAlert.hideLoading();
            } else {
              succeedWith(preConfirmValue || value);
            }
          }, function (error$$1) {
            return errorWith(error$$1);
          });
        }
      } else {
        succeedWith(value);
      }
    };

    // Mouse interactions
    var onButtonEvent = function onButtonEvent(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var confirmButton = getConfirmButton();
      var cancelButton = getCancelButton();
      var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
      var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

      switch (e.type) {
        case 'click':
          // Clicked 'confirm'
          if (targetedConfirm && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            if (params.input) {
              var inputValue = getInputValue();

              if (params.inputValidator) {
                sweetAlert.disableInput();
                var validationPromise = Promise.resolve().then(function () {
                  return params.inputValidator(inputValue, params.extraParams);
                });
                if (params.expectRejections) {
                  validationPromise.then(function () {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    confirm(inputValue);
                  }, function (validationError) {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    if (validationError) {
                      sweetAlert.showValidationError(validationError);
                    }
                  });
                } else {
                  validationPromise.then(function (validationError) {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    if (validationError) {
                      sweetAlert.showValidationError(validationError);
                    } else {
                      confirm(inputValue);
                    }
                  }, function (error$$1) {
                    return errorWith(error$$1);
                  });
                }
              } else {
                confirm(inputValue);
              }
            } else {
              confirm(true);
            }

            // Clicked 'cancel'
          } else if (targetedCancel && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            dismissWith(sweetAlert.DismissReason.cancel);
          }
          break;
        default:
      }
    };

    var buttons = popup.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = onButtonEvent;
      buttons[i].onmouseover = onButtonEvent;
      buttons[i].onmouseout = onButtonEvent;
      buttons[i].onmousedown = onButtonEvent;
    }

    // Closing popup by close button
    getCloseButton().onclick = function () {
      dismissWith(sweetAlert.DismissReason.close);
    };

    if (params.toast) {
      // Closing popup by backdrop click
      popup.onclick = function (e) {
        if (e.target !== popup || params.showConfirmButton || params.showCancelButton) {
          return;
        }
        if (params.allowOutsideClick) {
          sweetAlert.closePopup(params.onClose);
          dismissWith(sweetAlert.DismissReason.backdrop);
        }
      };
    } else {
      var ignoreOutsideClick = false;

      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      popup.onmousedown = function () {
        container.onmouseup = function (e) {
          container.onmouseup = undefined;
          // We only check if the mouseup target is the container because usually it doesn't
          // have any other direct children aside of the popup
          if (e.target === container) {
            ignoreOutsideClick = true;
          }
        };
      };

      // Ignore click events that had mousedown on the container but mouseup on the popup
      container.onmousedown = function () {
        popup.onmouseup = function (e) {
          popup.onmouseup = undefined;
          // We also need to check if the mouseup target is a child of the popup
          if (e.target === popup || popup.contains(e.target)) {
            ignoreOutsideClick = true;
          }
        };
      };

      container.onclick = function (e) {
        if (ignoreOutsideClick) {
          ignoreOutsideClick = false;
          return;
        }
        if (e.target !== container) {
          return;
        }
        if (callIfFunction(params.allowOutsideClick)) {
          dismissWith(sweetAlert.DismissReason.backdrop);
        }
      };
    }

    var content = getContent();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton();

    // Reverse buttons (Confirm on the right side)
    if (params.reverseButtons) {
      confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
    } else {
      confirmButton.parentNode.insertBefore(confirmButton, cancelButton);
    }

    // Focus handling
    var setFocus = function setFocus(index, increment) {
      var focusableElements = getFocusableElements(params.focusCancel);
      // search for visible elements and select the next possible match
      for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
        index = index + increment;

        // rollover to first item
        if (index === focusableElements.length) {
          index = 0;

          // go to last item
        } else if (index === -1) {
          index = focusableElements.length - 1;
        }

        // determine if element is visible
        var el = focusableElements[index];
        if (isVisible(el)) {
          return el.focus();
        }
      }
    };

    var handleKeyDown = function handleKeyDown(event) {
      var e = event || window.event;

      var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
      ];

      if (e.key === 'Enter' && !e.isComposing) {
        if (e.target === getInput()) {
          if (['textarea', 'file'].indexOf(params.input) !== -1) {
            return; // do not submit
          }

          sweetAlert.clickConfirm();
          e.preventDefault();
        }

        // TAB
      } else if (e.key === 'Tab') {
        var targetElement = e.target || e.srcElement;

        var focusableElements = getFocusableElements(params.focusCancel);
        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
        for (var _i3 = 0; _i3 < focusableElements.length; _i3++) {
          if (targetElement === focusableElements[_i3]) {
            btnIndex = _i3;
            break;
          }
        }

        if (!e.shiftKey) {
          // Cycle to the next button
          setFocus(btnIndex, 1);
        } else {
          // Cycle to the prev button
          setFocus(btnIndex, -1);
        }
        e.stopPropagation();
        e.preventDefault();

        // ARROWS - switch focus between buttons
      } else if (arrowKeys.indexOf(e.key) !== -1) {
        // focus Cancel button if Confirm button is currently focused
        if (document.activeElement === confirmButton && isVisible(cancelButton)) {
          cancelButton.focus();
          // and vice versa
        } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
          confirmButton.focus();
        }

        // ESC
      } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(params.allowEscapeKey) === true) {
        dismissWith(sweetAlert.DismissReason.esc);
      }
    };

    if (params.toast && windowOnkeydownOverridden) {
      window.onkeydown = previousWindowKeyDown;
      windowOnkeydownOverridden = false;
    }

    if (!params.toast && !windowOnkeydownOverridden) {
      previousWindowKeyDown = window.onkeydown;
      windowOnkeydownOverridden = true;
      window.onkeydown = handleKeyDown;
    }

    /**
     * Show spinner instead of Confirm button and disable Cancel button
     */
    sweetAlert.hideLoading = sweetAlert.disableLoading = function () {
      if (!params.showConfirmButton) {
        hide(confirmButton);
        if (!params.showCancelButton) {
          hide(getActions());
        }
      }
      removeClass([popup, actions], swalClasses.loading);
      popup.removeAttribute('aria-busy');
      popup.removeAttribute('data-loading');
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.getTitle = function () {
      return getTitle();
    };
    sweetAlert.getContent = function () {
      return getContent();
    };
    sweetAlert.getInput = function () {
      return getInput();
    };
    sweetAlert.getImage = function () {
      return getImage();
    };
    sweetAlert.getButtonsWrapper = function () {
      return getButtonsWrapper();
    };
    sweetAlert.getActions = function () {
      return getActions();
    };
    sweetAlert.getConfirmButton = function () {
      return getConfirmButton();
    };
    sweetAlert.getCancelButton = function () {
      return getCancelButton();
    };
    sweetAlert.getFooter = function () {
      return getFooter();
    };
    sweetAlert.isLoading = function () {
      return isLoading();
    };

    sweetAlert.enableButtons = function () {
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.disableButtons = function () {
      confirmButton.disabled = true;
      cancelButton.disabled = true;
    };

    sweetAlert.enableConfirmButton = function () {
      confirmButton.disabled = false;
    };

    sweetAlert.disableConfirmButton = function () {
      confirmButton.disabled = true;
    };

    sweetAlert.enableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i4 = 0; _i4 < radios.length; _i4++) {
          radios[_i4].disabled = false;
        }
      } else {
        input.disabled = false;
      }
    };

    sweetAlert.disableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input && input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i5 = 0; _i5 < radios.length; _i5++) {
          radios[_i5].disabled = true;
        }
      } else {
        input.disabled = true;
      }
    };

    // Show block with validation error
    sweetAlert.showValidationError = function (error$$1) {
      var validationError = getValidationError();
      validationError.innerHTML = error$$1;
      var popupComputedStyle = window.getComputedStyle(popup);
      validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
      validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
      show(validationError);

      var input = getInput();
      if (input) {
        input.setAttribute('aria-invalid', true);
        input.setAttribute('aria-describedBy', swalClasses.validationerror);
        focusInput(input);
        addClass(input, swalClasses.inputerror);
      }
    };

    // Hide block with validation error
    sweetAlert.resetValidationError = function () {
      var validationError = getValidationError();
      hide(validationError);

      var input = getInput();
      if (input) {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedBy');
        removeClass(input, swalClasses.inputerror);
      }
    };

    sweetAlert.getProgressSteps = function () {
      return params.progressSteps;
    };

    sweetAlert.setProgressSteps = function (progressSteps) {
      params.progressSteps = progressSteps;
      setParameters(params);
    };

    sweetAlert.showProgressSteps = function () {
      show(getProgressSteps());
    };

    sweetAlert.hideProgressSteps = function () {
      hide(getProgressSteps());
    };

    sweetAlert.enableButtons();
    sweetAlert.hideLoading();
    sweetAlert.resetValidationError();

    if (params.input) {
      addClass(document.body, swalClasses['has-input']);
    }

    // inputs
    var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
    var input = void 0;
    for (var _i6 = 0; _i6 < inputTypes.length; _i6++) {
      var inputClass = swalClasses[inputTypes[_i6]];
      var inputContainer = getChildByClass(content, inputClass);
      input = getInput(inputTypes[_i6]);

      // set attributes
      if (input) {
        for (var j in input.attributes) {
          if (input.attributes.hasOwnProperty(j)) {
            var attrName = input.attributes[j].name;
            if (attrName !== 'type' && attrName !== 'value') {
              input.removeAttribute(attrName);
            }
          }
        }
        for (var attr in params.inputAttributes) {
          input.setAttribute(attr, params.inputAttributes[attr]);
        }
      }

      // set class
      inputContainer.className = inputClass;
      if (params.inputClass) {
        addClass(inputContainer, params.inputClass);
      }

      hide(inputContainer);
    }

    var populateInputOptions = void 0;
    switch (params.input) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        input = getChildByClass(content, swalClasses.input);
        input.value = params.inputValue;
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'file':
        input = getChildByClass(content, swalClasses.file);
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'range':
        var range = getChildByClass(content, swalClasses.range);
        var rangeInput = range.querySelector('input');
        var rangeOutput = range.querySelector('output');
        rangeInput.value = params.inputValue;
        rangeInput.type = params.input;
        rangeOutput.value = params.inputValue;
        show(range);
        break;
      case 'select':
        var select = getChildByClass(content, swalClasses.select);
        select.innerHTML = '';
        if (params.inputPlaceholder) {
          var placeholder = document.createElement('option');
          placeholder.innerHTML = params.inputPlaceholder;
          placeholder.value = '';
          placeholder.disabled = true;
          placeholder.selected = true;
          select.appendChild(placeholder);
        }
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions = objectToMap(inputOptions);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = inputOptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = slicedToArray(_step.value, 2),
                  optionValue = _step$value[0],
                  optionLabel = _step$value[1];

              var option = document.createElement('option');
              option.value = optionValue;
              option.innerHTML = optionLabel;
              if (params.inputValue.toString() === optionValue.toString()) {
                option.selected = true;
              }
              select.appendChild(option);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          show(select);
          select.focus();
        };
        break;
      case 'radio':
        var radio = getChildByClass(content, swalClasses.radio);
        radio.innerHTML = '';
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions = objectToMap(inputOptions);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = inputOptions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = slicedToArray(_step2.value, 2),
                  radioValue = _step2$value[0],
                  radioLabel = _step2$value[1];

              var radioInput = document.createElement('input');
              var radioLabelElement = document.createElement('label');
              radioInput.type = 'radio';
              radioInput.name = swalClasses.radio;
              radioInput.value = radioValue;
              if (params.inputValue.toString() === radioValue.toString()) {
                radioInput.checked = true;
              }
              radioLabelElement.innerHTML = radioLabel;
              radioLabelElement.insertBefore(radioInput, radioLabelElement.firstChild);
              radio.appendChild(radioLabelElement);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          show(radio);
          var radios = radio.querySelectorAll('input');
          if (radios.length) {
            radios[0].focus();
          }
        };
        break;
      case 'checkbox':
        var checkbox = getChildByClass(content, swalClasses.checkbox);
        var checkboxInput = getInput('checkbox');
        checkboxInput.type = 'checkbox';
        checkboxInput.value = 1;
        checkboxInput.id = swalClasses.checkbox;
        checkboxInput.checked = Boolean(params.inputValue);
        var label = checkbox.getElementsByTagName('span');
        if (label.length) {
          checkbox.removeChild(label[0]);
        }
        label = document.createElement('span');
        label.innerHTML = params.inputPlaceholder;
        checkbox.appendChild(label);
        show(checkbox);
        break;
      case 'textarea':
        var textarea = getChildByClass(content, swalClasses.textarea);
        textarea.value = params.inputValue;
        textarea.placeholder = params.inputPlaceholder;
        show(textarea);
        break;
      case null:
        break;
      default:
        error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + params.input + '"');
        break;
    }

    if (params.input === 'select' || params.input === 'radio') {
      if (params.inputOptions instanceof Promise) {
        sweetAlert.showLoading();
        params.inputOptions.then(function (inputOptions) {
          sweetAlert.hideLoading();
          populateInputOptions(inputOptions);
        });
      } else if (_typeof(params.inputOptions) === 'object') {
        populateInputOptions(params.inputOptions);
      } else {
        error('Unexpected type of inputOptions! Expected object, Map or Promise, got ' + _typeof(params.inputOptions));
      }
    }

    openPopup(params.animation, params.onBeforeOpen, params.onOpen);

    if (!params.toast) {
      if (!callIfFunction(params.allowEnterKey)) {
        if (document.activeElement) {
          document.activeElement.blur();
        }
      } else if (params.focusCancel && isVisible(cancelButton)) {
        cancelButton.focus();
      } else if (params.focusConfirm && isVisible(confirmButton)) {
        confirmButton.focus();
      } else {
        setFocus(-1, 1);
      }
    }

    // fix scroll
    getContainer().scrollTop = 0;
  });
};

/*
 * Global function to determine if swal2 popup is shown
 */
sweetAlert.isVisible = function () {
  return !!getPopup();
};

/*
 * Global function for chaining sweetAlert popups
 */
sweetAlert.queue = function (steps) {
  queue = steps;
  var resetQueue = function resetQueue() {
    queue = [];
    document.body.removeAttribute('data-swal2-queue-step');
  };
  var queueResult = [];
  return new Promise(function (resolve, reject) {
    (function step(i, callback) {
      if (i < queue.length) {
        document.body.setAttribute('data-swal2-queue-step', i);

        sweetAlert(queue[i]).then(function (result) {
          if (typeof result.value !== 'undefined') {
            queueResult.push(result.value);
            step(i + 1, callback);
          } else {
            resetQueue();
            resolve({ dismiss: result.dismiss });
          }
        });
      } else {
        resetQueue();
        resolve({ value: queueResult });
      }
    })(0);
  });
};

/*
 * Global function for getting the index of current popup in queue
 */
sweetAlert.getQueueStep = function () {
  return document.body.getAttribute('data-swal2-queue-step');
};

/*
 * Global function for inserting a popup to the queue
 */
sweetAlert.insertQueueStep = function (step, index) {
  if (index && index < queue.length) {
    return queue.splice(index, 0, step);
  }
  return queue.push(step);
};

/*
 * Global function for deleting a popup from the queue
 */
sweetAlert.deleteQueueStep = function (index) {
  if (typeof queue[index] !== 'undefined') {
    queue.splice(index, 1);
  }
};

/*
 * Global function to close sweetAlert
 */
sweetAlert.close = sweetAlert.closePopup = sweetAlert.closeModal = sweetAlert.closeToast = function (onComplete) {
  var container = getContainer();
  var popup = getPopup();
  if (!popup) {
    return;
  }
  removeClass(popup, swalClasses.show);
  addClass(popup, swalClasses.hide);
  clearTimeout(popup.timeout);

  if (!isToast()) {
    resetPrevState();
    window.onkeydown = previousWindowKeyDown;
    windowOnkeydownOverridden = false;
  }

  var removePopupAndResetState = function removePopupAndResetState() {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
    }
  };

  // If animation is supported, animate
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      if (hasClass(popup, swalClasses.hide)) {
        removePopupAndResetState();
      }
    });
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState();
  }
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(popup);
    });
  }
};

/*
 * Global function to click 'Confirm' button
 */
sweetAlert.clickConfirm = function () {
  return getConfirmButton().click();
};

/*
 * Global function to click 'Cancel' button
 */
sweetAlert.clickCancel = function () {
  return getCancelButton().click();
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
sweetAlert.showLoading = sweetAlert.enableLoading = function () {
  var popup = getPopup();
  if (!popup) {
    sweetAlert('');
  }
  popup = getPopup();
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();

  show(actions);
  show(confirmButton, 'inline-block');
  addClass([popup, actions], swalClasses.loading);
  confirmButton.disabled = true;
  cancelButton.disabled = true;

  popup.setAttribute('data-loading', true);
  popup.setAttribute('aria-busy', true);
  popup.focus();
};

/**
 * Is valid parameter
 * @param {String} paramName
 */
sweetAlert.isValidParameter = function (paramName) {
  return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
};

/**
 * Is deprecated parameter
 * @param {String} paramName
 */
sweetAlert.isDeprecatedParameter = function (paramName) {
  return deprecatedParams.indexOf(paramName) !== -1;
};

/**
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = function (userParams) {
  if (!userParams || (typeof userParams === 'undefined' ? 'undefined' : _typeof(userParams)) !== 'object') {
    return error('the argument for setDefaults() is required and has to be a object');
  }

  showWarningsForParams(userParams);

  // assign valid params from userParams to popupParams
  for (var param in userParams) {
    if (sweetAlert.isValidParameter(param)) {
      popupParams[param] = userParams[param];
    }
  }
};

/**
 * Reset default params for each popup
 */
sweetAlert.resetDefaults = function () {
  popupParams = _extends({}, defaultParams);
};

/**
 * Adapt a legacy inputValidator for use with expectRejections=false
 */
sweetAlert.adaptInputValidator = function (legacyValidator) {
  return function adaptedInputValidator(inputValue, extraParams) {
    return legacyValidator.call(this, inputValue, extraParams).then(function () {
      return undefined;
    }, function (validationError) {
      return validationError;
    });
  };
};

sweetAlert.DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'overlay',
  close: 'close',
  esc: 'esc',
  timer: 'timer'
});

sweetAlert.noop = function () {};

sweetAlert.version = '7.12.0';

sweetAlert.default = sweetAlert;

/**
 * Set default params if `window._swalDefaults` is an object
 */
if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
  sweetAlert.setDefaults(window._swalDefaults);
}

// Remember state in cases where opening and handling a modal will fiddle with it.
var states = {
  previousActiveElement: null,
  previousBodyPadding: null

  // Detect Node env
};var isNodeEnv = function isNodeEnv() {
  return typeof window === 'undefined' || typeof document === 'undefined';
};

/*
 * Add modal + backdrop to DOM
 */
var init = function init(params) {
  // Clean up the old popup if it exists
  var c = getContainer();
  if (c) {
    c.parentNode.removeChild(c);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
  }

  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize');
    return;
  }

  var container = document.createElement('div');
  container.className = swalClasses.container;
  container.innerHTML = sweetHTML;

  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  targetElement.appendChild(container);

  var popup = getPopup();
  var content = getContent();
  var input = getChildByClass(content, swalClasses.input);
  var file = getChildByClass(content, swalClasses.file);
  var range = content.querySelector('.' + swalClasses.range + ' input');
  var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
  var select = getChildByClass(content, swalClasses.select);
  var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
  var textarea = getChildByClass(content, swalClasses.textarea);

  // a11y
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

  var resetValidationError = function resetValidationError() {
    sweetAlert.isVisible() && sweetAlert.resetValidationError();
  };

  input.oninput = resetValidationError;
  file.onchange = resetValidationError;
  select.onchange = resetValidationError;
  checkbox.onchange = resetValidationError;
  textarea.oninput = resetValidationError;

  range.oninput = function () {
    resetValidationError();
    rangeOutput.value = range.value;
  };

  range.onchange = function () {
    resetValidationError();
    range.previousSibling.value = range.value;
  };

  return popup;
};

/*
 * Manipulate DOM
 */

var sweetHTML = ('\n <div role="dialog" aria-modal="true" aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <div class="' + swalClasses.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');

var getContainer = function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
};

var getPopup = function getPopup() {
  return getContainer() ? getContainer().querySelector('.' + swalClasses.popup) : null;
};

var getIcons = function getIcons() {
  var popup = getPopup();
  return popup.querySelectorAll('.' + swalClasses.icon);
};

var elementByClass = function elementByClass(className) {
  return getContainer() ? getContainer().querySelector('.' + className) : null;
};

var getTitle = function getTitle() {
  return elementByClass(swalClasses.title);
};

var getContent = function getContent() {
  return elementByClass(swalClasses.content);
};

var getImage = function getImage() {
  return elementByClass(swalClasses.image);
};

var getProgressSteps = function getProgressSteps() {
  return elementByClass(swalClasses.progresssteps);
};

var getValidationError = function getValidationError() {
  return elementByClass(swalClasses.validationerror);
};

var getConfirmButton = function getConfirmButton() {
  return elementByClass(swalClasses.confirm);
};

var getCancelButton = function getCancelButton() {
  return elementByClass(swalClasses.cancel);
};

var getButtonsWrapper = function getButtonsWrapper() {
  warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
  return elementByClass(swalClasses.actions);
};

var getActions = function getActions() {
  return elementByClass(swalClasses.actions);
};

var getFooter = function getFooter() {
  return elementByClass(swalClasses.footer);
};

var getCloseButton = function getCloseButton() {
  return elementByClass(swalClasses.close);
};

var getFocusableElements = function getFocusableElements() {
  var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
  // sort according to tabindex
  .sort(function (a, b) {
    a = parseInt(a.getAttribute('tabindex'));
    b = parseInt(b.getAttribute('tabindex'));
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  });

  var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));

  return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
};

var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
  if (!param) {
    return hide(target);
  }

  if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
    target.innerHTML = '';
    if (0 in param) {
      for (var i = 0; i in param; i++) {
        target.appendChild(param[i].cloneNode(true));
      }
    } else {
      target.appendChild(param.cloneNode(true));
    }
  } else if (param) {
    target.innerHTML = param;
  } else {}
  show(target);
};

var isModal = function isModal() {
  return !document.body.classList.contains(swalClasses['toast-shown']);
};

var isToast = function isToast() {
  return document.body.classList.contains(swalClasses['toast-shown']);
};

var isLoading = function isLoading() {
  return getPopup().hasAttribute('data-loading');
};

var hasClass = function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  }
  return false;
};

var focusInput = function focusInput(input) {
  input.focus();

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915/1331425
    var val = input.value;
    input.value = '';
    input.value = val;
  }
};

var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
  if (!target || !classList) {
    return;
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }
  classList.forEach(function (className) {
    if (target.forEach) {
      target.forEach(function (elem) {
        add ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      add ? target.classList.add(className) : target.classList.remove(className);
    }
  });
};

var addClass = function addClass(target, classList) {
  addOrRemoveClass(target, classList, true);
};

var removeClass = function removeClass(target, classList) {
  addOrRemoveClass(target, classList, false);
};

var getChildByClass = function getChildByClass(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};

var show = function show(elem, display) {
  if (!display) {
    display = elem.id === swalClasses.content ? 'block' : 'flex';
  }
  elem.style.opacity = '';
  elem.style.display = display;
};

var hide = function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var empty = function empty(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

// borrowed from jquery $(elem).is(':visible') implementation
var isVisible = function isVisible(elem) {
  return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

var removeStyleProperty = function removeStyleProperty(elem, property) {
  if (elem.style.removeProperty) {
    elem.style.removeProperty(property);
  } else {
    elem.style.removeAttribute(property);
  }
};

var animationEndEvent = function () {
  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var testEl = document.createElement('div');
  var transEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd oanimationend',
    'animation': 'animationend'
  };
  for (var i in transEndEventNames) {
    if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
      return transEndEventNames[i];
    }
  }

  return false;
}();

// Reset previous window keydown handler and focued element
var resetPrevState = function resetPrevState() {
  if (states.previousActiveElement && states.previousActiveElement.focus) {
    var x = window.scrollX;
    var y = window.scrollY;
    states.previousActiveElement.focus();
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      // IE doesn't have scrollX/scrollY support
      window.scrollTo(x, y);
    }
  }
};

// Measure width of scrollbar
// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
var measureScrollbar = function measureScrollbar() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (supportsTouch) {
    return 0;
  }
  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

/**
 * Inject a string of CSS into the page header
 *
 * @param {String} css
 */
var injectCSS = function injectCSS() {
  var css = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
};

injectCSS(styles);

return sweetAlert;

})));
if (typeof window !== 'undefined' && window.Sweetalert2) window.sweetAlert = window.swal = window.Sweetalert2;


/***/ })

},[["./assets/js/rep_log.js","manifest","layout"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvQ29tcG9uZXRzL1JlcExvZ0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvQ29tcG9uZXRzL1JlcExvZ0hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvQ29tcG9uZXRzL1JvdXRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3JlcF9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL2Rpc3Qvc3dlZXRhbGVydDIuYWxsLmpzIl0sIm5hbWVzIjpbIkhlbHBlckluc3RhbmNlcyIsIldlYWtNYXAiLCJSZXBMb2dBcHAiLCIkd3JhcHBlciIsInJlcExvZ3MiLCJzZXQiLCJIZWxwZXIiLCJsb2FkUmVwTG9ncyIsIm9uIiwiaGFuZGxlUmVwTG9nRGVsZXRlIiwiYmluZCIsImhhbmRsZVJvd0NsaWNrIiwiX3NlbGVjdG9ycyIsIm5ld1JlcEZvcm0iLCJoYW5kbGVOZXdGb3JtU3VibWl0IiwiJCIsImFqYXgiLCJ1cmwiLCJSb3V0aW5nIiwiZ2VuZXJhdGUiLCJ0aGVuIiwiZGF0YSIsIml0ZW1zIiwicmVwTG9nIiwiX2FkZFJvdyIsImZpbmQiLCJodG1sIiwiZ2V0IiwiZ2V0VG90YWxXZWlnaHRTdHJpbmciLCJlIiwicHJldmVudERlZmF1bHQiLCIkbGluayIsImN1cnJlbnRUYXJnZXQiLCJzd2FsIiwidGl0bGUiLCJ0ZXh0Iiwic2hvd0NhbmNlbEJ1dHRvbiIsInNob3dMb2FkZXJPbkNvbmZpcm0iLCJwcmVDb25maXJtIiwiX2RlbGV0ZVJlcExvZyIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkZWxldGVVcmwiLCIkcm93IiwiY2xvc2VzdCIsIm1ldGhvZCIsImZhZGVPdXQiLCJzcGxpY2UiLCJyZW1vdmUiLCJ1cGRhdGVUb3RhbFdlaWdodExpZnRlZCIsImNvbnNvbGUiLCJsb2ciLCIkZm9ybSIsImZvcm1EYXRhIiwic2VyaWFsaXplQXJyYXkiLCJmaWVsZERhdGEiLCJuYW1lIiwidmFsdWUiLCJfc2F2ZVJlcExvZyIsIl9jbGVhckZvcm0iLCJjYXRjaCIsImVycm9yRGF0YSIsIl9tYXBFcnJvcnNUb0Zvcm0iLCJlcnJvcnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0ZXh0U3RhdHVzIiwianFYSFIiLCJnZXRSZXNwb25zZUhlYWRlciIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwiX3JlbW92ZUZvcm1FcnJvcnMiLCJlbGVtZW50IiwiZmllbGROYW1lIiwiYXR0ciIsIiRlcnJvciIsImFwcGVuZCIsInJlc2V0IiwicHVzaCIsInJvd1RlbXBsYXRlIiwicGFyc2VIVE1MIiwibGVuZ3RoIiwidG90YWxXZWlnaHRMaWZ0ZWQiLCJpdGVtTGFiZWwiLCJyZXBzIiwibGlua3MiLCJfc2VsZiIsIl9jYWxjdWxhdGVXZWlnaHRzIiwibWF4V2VpZ2h0Iiwid2VpZ2h0IiwiY2FsY3VsYXRlVG90YWxXZWlnaHQiLCJ0b3RhbFdlaWdodCIsIndpbmRvdyIsInJlcExvZ0FwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWE7Ozs7Ozs7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxlQUFlLEdBQUcsSUFBSUMsT0FBSixFQUF0Qjs7SUFFTUMsUzs7O0FBQ0YscUJBQVlDLFFBQVosRUFBc0I7QUFBQTs7QUFDbEIsU0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUVBSixtQkFBZSxDQUFDSyxHQUFoQixDQUFvQixJQUFwQixFQUEwQixJQUFJQyxxREFBSixDQUFXLEtBQUtGLE9BQWhCLENBQTFCO0FBRUEsU0FBS0csV0FBTDtBQUVBLFNBQUtKLFFBQUwsQ0FBY0ssRUFBZCxDQUNJLE9BREosRUFFSSxvQkFGSixFQUdJLEtBQUtDLGtCQUFMLENBQXdCQyxJQUF4QixDQUE2QixJQUE3QixDQUhKO0FBS0EsU0FB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QTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELDZCQUE2QjtBQUM3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNkJBQTZCO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIseUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3RUFBd0UsZ0VBQWdFO0FBQ3hJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwRUFBMEUsbUVBQW1FO0FBQzdJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLHFCQUFxQiwwQkFBMEI7QUFDL0M7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsaUJBQWlCLHFCQUFxQjtBQUN0QztBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFlBQVk7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQztBQUNEIiwiZmlsZSI6InJlcF9sb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBIZWxwZXIgZnJvbSAnLi9SZXBMb2dIZWxwZXInO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQyJztcbmltcG9ydCBSb3V0aW5nIGZyb20gJy4vUm91dGluZyc7XG5cbmxldCBIZWxwZXJJbnN0YW5jZXMgPSBuZXcgV2Vha01hcCgpO1xuXG5jbGFzcyBSZXBMb2dBcHAge1xuICAgIGNvbnN0cnVjdG9yKCR3cmFwcGVyKSB7XG4gICAgICAgIHRoaXMuJHdyYXBwZXIgPSAkd3JhcHBlcjtcbiAgICAgICAgdGhpcy5yZXBMb2dzID0gW107XG5cbiAgICAgICAgSGVscGVySW5zdGFuY2VzLnNldCh0aGlzLCBuZXcgSGVscGVyKHRoaXMucmVwTG9ncykpO1xuXG4gICAgICAgIHRoaXMubG9hZFJlcExvZ3MoKTtcblxuICAgICAgICB0aGlzLiR3cmFwcGVyLm9uKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICcuanMtZGVsZXRlLXJlcC1sb2cnLFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVSZXBMb2dEZWxldGUuYmluZCh0aGlzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLiR3cmFwcGVyLm9uKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICd0Ym9keSB0cicsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVJvd0NsaWNrLmJpbmQodGhpcylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy4kd3JhcHBlci5vbihcbiAgICAgICAgICAgICdzdWJtaXQnLFxuICAgICAgICAgICAgUmVwTG9nQXBwLl9zZWxlY3RvcnMubmV3UmVwRm9ybSxcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTmV3Rm9ybVN1Ym1pdC5iaW5kKHRoaXMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCBsaWtlIHRoaXMuc2VsZWN0b3JzXG4gICAgICovXG4gICAgc3RhdGljIGdldCBfc2VsZWN0b3JzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV3UmVwRm9ybTogJy5qcy1uZXctcmVwLWxvZy1mb3JtJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZFJlcExvZ3MoKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3JlcF9sb2dfbGlzdCcpLFxuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgcmVwTG9nIG9mIGRhdGEuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRSb3cocmVwTG9nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVUb3RhbFdlaWdodExpZnRlZCgpIHtcbiAgICAgICAgdGhpcy4kd3JhcHBlci5maW5kKCcuanMtdG90YWwtd2VpZ2h0JykuaHRtbChcbiAgICAgICAgICAgIEhlbHBlckluc3RhbmNlcy5nZXQodGhpcykuZ2V0VG90YWxXZWlnaHRTdHJpbmcoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGhhbmRsZVJlcExvZ0RlbGV0ZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCAkbGluayA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgIHRpdGxlOiAnRGVsZXRlIHRoaXMgbG9nPycsXG4gICAgICAgICAgICB0ZXh0OiAnV2hhdD8gRGlkIHlvdSBub3QgYWN0dWFsbHkgbGlmdCB0aGlzPycsXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgc2hvd0xvYWRlck9uQ29uZmlybTogdHJ1ZSxcbiAgICAgICAgICAgIHByZUNvbmZpcm06ICgpID0+IHRoaXMuX2RlbGV0ZVJlcExvZygkbGluaylcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2RlbGV0ZVJlcExvZygkbGluaykge1xuICAgICAgICAkbGluay5hZGRDbGFzcygndGV4dC1kYW5nZXInKTtcbiAgICAgICAgJGxpbmsuZmluZCgnLmZhJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmEtdHJhc2gnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1zcGlubmVyJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtc3BpbicpO1xuXG4gICAgICAgIGNvbnN0IGRlbGV0ZVVybCA9ICRsaW5rLmRhdGEoJ3VybCcpO1xuICAgICAgICBjb25zdCAkcm93ID0gJGxpbmsuY2xvc2VzdCgndHInKTtcblxuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZGVsZXRlVXJsLFxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJ1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICRyb3cuZmFkZU91dCgnbm9ybWFsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gcmVtb3ZlIHRoZSByZXBMb2cgZnJvbSB0aGlzLnJlcExvZ3NcbiAgICAgICAgICAgICAgICAvLyB0aGUgXCJrZXlcIiBpcyB0aGUgaW5kZXggdG8gdGhpcyByZXBMb2cgb24gdGhpcy5yZXBMb2dzXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBMb2dzLnNwbGljZShcbiAgICAgICAgICAgICAgICAgICAgJHJvdy5kYXRhKCdrZXknKSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAkcm93LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb3RhbFdlaWdodExpZnRlZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlUm93Q2xpY2soKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyb3cgY2xpY2tlZCEnKTtcbiAgICB9XG5cbiAgICBoYW5kbGVOZXdGb3JtU3VibWl0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGZpZWxkRGF0YSBvZiAkZm9ybS5zZXJpYWxpemVBcnJheSgpKSB7XG4gICAgICAgICAgICBmb3JtRGF0YVtmaWVsZERhdGEubmFtZV0gPSBmaWVsZERhdGEudmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NhdmVSZXBMb2coZm9ybURhdGEpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhckZvcm0oKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFJvdyhkYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yRGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbWFwRXJyb3JzVG9Gb3JtKGVycm9yRGF0YS5lcnJvcnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfc2F2ZVJlcExvZyhkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBSb3V0aW5nLmdlbmVyYXRlKCdyZXBfbG9nX25ldycpO1xuXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICAgICAgfSkudGhlbigoZGF0YSwgdGV4dFN0YXR1cywganFYSFIpID0+IHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCdMb2NhdGlvbicpXG4gICAgICAgICAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBmaW5hbGx5IGRvbmUhXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoanFYSFIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3JEYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfbWFwRXJyb3JzVG9Gb3JtKGVycm9yRGF0YSkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGb3JtRXJyb3JzKCk7XG4gICAgICAgIGNvbnN0ICRmb3JtID0gdGhpcy4kd3JhcHBlci5maW5kKFJlcExvZ0FwcC5fc2VsZWN0b3JzLm5ld1JlcEZvcm0pO1xuXG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgJGZvcm0uZmluZCgnOmlucHV0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9ICQoZWxlbWVudCkuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgY29uc3QgJHdyYXBwZXIgPSAkKGVsZW1lbnQpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJyk7XG4gICAgICAgICAgICBpZiAoIWVycm9yRGF0YVtmaWVsZE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gZXJyb3IhXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkZXJyb3IgPSAkKCc8c3BhbiBjbGFzcz1cImpzLWZpZWxkLWVycm9yIGhlbHAtYmxvY2tcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAkZXJyb3IuaHRtbChlcnJvckRhdGFbZmllbGROYW1lXSk7XG4gICAgICAgICAgICAkd3JhcHBlci5hcHBlbmQoJGVycm9yKTtcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9yZW1vdmVGb3JtRXJyb3JzKCkge1xuICAgICAgICBjb25zdCAkZm9ybSA9IHRoaXMuJHdyYXBwZXIuZmluZChSZXBMb2dBcHAuX3NlbGVjdG9ycy5uZXdSZXBGb3JtKTtcbiAgICAgICAgJGZvcm0uZmluZCgnLmpzLWZpZWxkLWVycm9yJykucmVtb3ZlKCk7XG4gICAgICAgICRmb3JtLmZpbmQoJy5mb3JtLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgIH1cblxuICAgIF9jbGVhckZvcm0oKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZvcm1FcnJvcnMoKTtcblxuICAgICAgICBjb25zdCAkZm9ybSA9IHRoaXMuJHdyYXBwZXIuZmluZChSZXBMb2dBcHAuX3NlbGVjdG9ycy5uZXdSZXBGb3JtKTtcbiAgICAgICAgJGZvcm1bMF0ucmVzZXQoKTtcbiAgICB9XG5cbiAgICBfYWRkUm93KHJlcExvZykge1xuICAgICAgICB0aGlzLnJlcExvZ3MucHVzaChyZXBMb2cpO1xuICAgICAgICAvLyBkZXN0cnVjdHVyaW5nIGV4YW1wbGVcbiAgICAgICAgLy8gbGV0IHtpZCwgaXRlbUxhYmVsLCByZXBzLCB0b3RhbGx5TWFkZVVwS2V5ID0gJ3doYXRldmVyISd9ID0gcmVwTG9nO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpZCwgaXRlbUxhYmVsLCByZXBzLCB0b3RhbGx5TWFkZVVwS2V5KTtcblxuICAgICAgICBjb25zdCBodG1sID0gcm93VGVtcGxhdGUocmVwTG9nKTtcbiAgICAgICAgY29uc3QgJHJvdyA9ICQoJC5wYXJzZUhUTUwoaHRtbCkpO1xuICAgICAgICAvLyBzdG9yZSB0aGUgcmVwTG9ncyBpbmRleFxuICAgICAgICAkcm93LmRhdGEoJ2tleScsIHRoaXMucmVwTG9ncy5sZW5ndGggLSAxKTtcbiAgICAgICAgdGhpcy4kd3JhcHBlci5maW5kKCd0Ym9keScpLmFwcGVuZCgkcm93KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVRvdGFsV2VpZ2h0TGlmdGVkKCk7XG4gICAgfVxufVxuXG5jb25zdCByb3dUZW1wbGF0ZSA9IChyZXBMb2cpID0+IGBcbjx0ciBkYXRhLXdlaWdodD1cIiR7cmVwTG9nLnRvdGFsV2VpZ2h0TGlmdGVkfVwiPlxuICAgIDx0ZD4ke3JlcExvZy5pdGVtTGFiZWx9PC90ZD5cbiAgICA8dGQ+JHtyZXBMb2cucmVwc308L3RkPlxuICAgIDx0ZD4ke3JlcExvZy50b3RhbFdlaWdodExpZnRlZH08L3RkPlxuICAgIDx0ZD5cbiAgICAgICAgPGEgaHJlZj1cIiNcIlxuICAgICAgICAgICBjbGFzcz1cImpzLWRlbGV0ZS1yZXAtbG9nXCJcbiAgICAgICAgICAgZGF0YS11cmw9XCIke3JlcExvZy5saW5rcy5fc2VsZn1cIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgPC90ZD5cbjwvdHI+XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBSZXBMb2dBcHA7IiwiY2xhc3MgSGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlcExvZ3MpIHtcclxuICAgICAgICB0aGlzLnJlcExvZ3MgPSByZXBMb2dzO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZVRvdGFsV2VpZ2h0KCkge1xyXG4gICAgICAgIHJldHVybiBIZWxwZXIuX2NhbGN1bGF0ZVdlaWdodHMoXHJcbiAgICAgICAgICAgIHRoaXMucmVwTG9nc1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG90YWxXZWlnaHRTdHJpbmcobWF4V2VpZ2h0ID0gNTAwKSB7XHJcbiAgICAgICAgbGV0IHdlaWdodCA9IHRoaXMuY2FsY3VsYXRlVG90YWxXZWlnaHQoKTtcclxuXHJcbiAgICAgICAgaWYgKHdlaWdodCA+IG1heFdlaWdodCkge1xyXG4gICAgICAgICAgICB3ZWlnaHQgPSBtYXhXZWlnaHQgKyAnKyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd2VpZ2h0ICsgJyBsYnMnO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBfY2FsY3VsYXRlV2VpZ2h0cyhyZXBMb2dzKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsV2VpZ2h0ID0gMDtcclxuICAgICAgICBmb3IgKGxldCByZXBMb2cgb2YgcmVwTG9ncykge1xyXG4gICAgICAgICAgICB0b3RhbFdlaWdodCArPSByZXBMb2cudG90YWxXZWlnaHRMaWZ0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdG90YWxXZWlnaHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlbHBlcjsiLCJleHBvcnQgZGVmYXVsdCB3aW5kb3cuUm91dGluZzsiLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCBSZXBMb2dBcHAgZnJvbSAnLi9Db21wb25ldHMvUmVwTG9nQXBwJztcclxuXHJcblxyXG52YXIgJHdyYXBwZXIgPSAkKCcuanMtcmVwLWxvZy10YWJsZScpO1xyXG52YXIgcmVwTG9nQXBwID0gbmV3IFJlcExvZ0FwcCgkd3JhcHBlcik7IiwiLyohXG4gKiBzd2VldGFsZXJ0MiB2Ny4xMi4wXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0KGdsb2JhbC5Td2VldGFsZXJ0MiA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIHN0eWxlcyA9IFwiYm9keS5zd2FsMi10b2FzdC1zaG93bi5zd2FsMi1oYXMtaW5wdXQgPiAuc3dhbDItY29udGFpbmVyID4gLnN3YWwyLXRvYXN0IHtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBzdHJldGNoO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBzdHJldGNoO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDsgfVxcbiAgYm9keS5zd2FsMi10b2FzdC1zaG93bi5zd2FsMi1oYXMtaW5wdXQgPiAuc3dhbDItY29udGFpbmVyID4gLnN3YWwyLXRvYXN0IC5zd2FsMi1hY3Rpb25zIHtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICAgIGZsZXg6IDE7XFxuICAgIC1tcy1mbGV4LWl0ZW0tYWxpZ246IHN0cmV0Y2g7XFxuICAgICAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBlbmQ7XFxuICAgICAgICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgaGVpZ2h0OiAyLjJlbTsgfVxcbiAgYm9keS5zd2FsMi10b2FzdC1zaG93bi5zd2FsMi1oYXMtaW5wdXQgPiAuc3dhbDItY29udGFpbmVyID4gLnN3YWwyLXRvYXN0IC5zd2FsMi1sb2FkaW5nIHtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuICBib2R5LnN3YWwyLXRvYXN0LXNob3duLnN3YWwyLWhhcy1pbnB1dCA+IC5zd2FsMi1jb250YWluZXIgPiAuc3dhbDItdG9hc3QgLnN3YWwyLWlucHV0IHtcXG4gICAgaGVpZ2h0OiAyZW07XFxuICAgIG1hcmdpbjogLjMxMjVlbSBhdXRvO1xcbiAgICBmb250LXNpemU6IDFlbTsgfVxcbiAgYm9keS5zd2FsMi10b2FzdC1zaG93bi5zd2FsMi1oYXMtaW5wdXQgPiAuc3dhbDItY29udGFpbmVyID4gLnN3YWwyLXRvYXN0IC5zd2FsMi12YWxpZGF0aW9uZXJyb3Ige1xcbiAgICBmb250LXNpemU6IDFlbTsgfVxcblxcbmJvZHkuc3dhbDItdG9hc3Qtc2hvd24gPiAuc3dhbDItY29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuICBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1zaG93biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuICBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi10b3Age1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgICBib3R0b206IGF1dG87XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpOyB9XFxuICBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi10b3AtZW5kLCBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi10b3AtcmlnaHQge1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IGF1dG87XFxuICAgIGxlZnQ6IGF1dG87IH1cXG4gIGJvZHkuc3dhbDItdG9hc3Qtc2hvd24gPiAuc3dhbDItY29udGFpbmVyLnN3YWwyLXRvcC1zdGFydCwgYm9keS5zd2FsMi10b2FzdC1zaG93biA+IC5zd2FsMi1jb250YWluZXIuc3dhbDItdG9wLWxlZnQge1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgICBib3R0b206IGF1dG87XFxuICAgIGxlZnQ6IDA7IH1cXG4gIGJvZHkuc3dhbDItdG9hc3Qtc2hvd24gPiAuc3dhbDItY29udGFpbmVyLnN3YWwyLWNlbnRlci1zdGFydCwgYm9keS5zd2FsMi10b2FzdC1zaG93biA+IC5zd2FsMi1jb250YWluZXIuc3dhbDItY2VudGVyLWxlZnQge1xcbiAgICB0b3A6IDUwJTtcXG4gICAgcmlnaHQ6IGF1dG87XFxuICAgIGJvdHRvbTogYXV0bztcXG4gICAgbGVmdDogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpOyB9XFxuICBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1jZW50ZXIge1xcbiAgICB0b3A6IDUwJTtcXG4gICAgcmlnaHQ6IGF1dG87XFxuICAgIGJvdHRvbTogYXV0bztcXG4gICAgbGVmdDogNTAlO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpOyB9XFxuICBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1jZW50ZXItZW5kLCBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1jZW50ZXItcmlnaHQge1xcbiAgICB0b3A6IDUwJTtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIGJvdHRvbTogYXV0bztcXG4gICAgbGVmdDogYXV0bztcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpOyB9XFxuICBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ib3R0b20tc3RhcnQsIGJvZHkuc3dhbDItdG9hc3Qtc2hvd24gPiAuc3dhbDItY29udGFpbmVyLnN3YWwyLWJvdHRvbS1sZWZ0IHtcXG4gICAgdG9wOiBhdXRvO1xcbiAgICByaWdodDogYXV0bztcXG4gICAgYm90dG9tOiAwO1xcbiAgICBsZWZ0OiAwOyB9XFxuICBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ib3R0b20ge1xcbiAgICB0b3A6IGF1dG87XFxuICAgIHJpZ2h0OiBhdXRvO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpOyB9XFxuICBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ib3R0b20tZW5kLCBib2R5LnN3YWwyLXRvYXN0LXNob3duID4gLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ib3R0b20tcmlnaHQge1xcbiAgICB0b3A6IGF1dG87XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IGF1dG87IH1cXG5cXG4uc3dhbDItcG9wdXAuc3dhbDItdG9hc3Qge1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogYXV0bztcXG4gIHBhZGRpbmc6IDAuNjI1ZW07XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAxMHB4ICNkOWQ5ZDk7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4ICNkOWQ5ZDk7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47IH1cXG4gIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItaGVhZGVyIHtcXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xcbiAgICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7IH1cXG4gIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItdGl0bGUge1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBzdGFydDtcXG4gICAgICAgIC1tcy1mbGV4LXBhY2s6IHN0YXJ0O1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gICAgbWFyZ2luOiAwIC42ZW07XFxuICAgIGZvbnQtc2l6ZTogMWVtOyB9XFxuICAuc3dhbDItcG9wdXAuc3dhbDItdG9hc3QgLnN3YWwyLWNsb3NlIHtcXG4gICAgcG9zaXRpb246IGluaXRpYWw7IH1cXG4gIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItY29udGVudCB7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IHN0YXJ0O1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogc3RhcnQ7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgICBmb250LXNpemU6IDFlbTsgfVxcbiAgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0IC5zd2FsMi1pY29uIHtcXG4gICAgd2lkdGg6IDMycHg7XFxuICAgIG1pbi13aWR0aDogMzJweDtcXG4gICAgaGVpZ2h0OiAzMnB4O1xcbiAgICBtYXJnaW46IDA7IH1cXG4gICAgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0IC5zd2FsMi1pY29uLnN3YWwyLXN1Y2Nlc3MgLnN3YWwyLXN1Y2Nlc3MtcmluZyB7XFxuICAgICAgd2lkdGg6IDMycHg7XFxuICAgICAgaGVpZ2h0OiAzMnB4OyB9XFxuICAgIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItaWNvbi5zd2FsMi1pbmZvLCAuc3dhbDItcG9wdXAuc3dhbDItdG9hc3QgLnN3YWwyLWljb24uc3dhbDItd2FybmluZywgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0IC5zd2FsMi1pY29uLnN3YWwyLXF1ZXN0aW9uIHtcXG4gICAgICBmb250LXNpemU6IDI2cHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDMycHg7IH1cXG4gICAgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0IC5zd2FsMi1pY29uLnN3YWwyLWVycm9yIFtjbGFzc149J3N3YWwyLXgtbWFyay1saW5lJ10ge1xcbiAgICAgIHRvcDogMTRweDtcXG4gICAgICB3aWR0aDogMjJweDsgfVxcbiAgICAgIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItaWNvbi5zd2FsMi1lcnJvciBbY2xhc3NePSdzd2FsMi14LW1hcmstbGluZSddW2NsYXNzJD0nbGVmdCddIHtcXG4gICAgICAgIGxlZnQ6IDVweDsgfVxcbiAgICAgIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItaWNvbi5zd2FsMi1lcnJvciBbY2xhc3NePSdzd2FsMi14LW1hcmstbGluZSddW2NsYXNzJD0ncmlnaHQnXSB7XFxuICAgICAgICByaWdodDogNXB4OyB9XFxuICAuc3dhbDItcG9wdXAuc3dhbDItdG9hc3QgLnN3YWwyLWFjdGlvbnMge1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIG1hcmdpbjogMCAuMzEyNWVtOyB9XFxuICAuc3dhbDItcG9wdXAuc3dhbDItdG9hc3QgLnN3YWwyLXN0eWxlZCB7XFxuICAgIG1hcmdpbjogMCAuMzEyNWVtO1xcbiAgICBwYWRkaW5nOiAuMzEyNWVtIC42MjVlbTtcXG4gICAgZm9udC1zaXplOiAxZW07IH1cXG4gICAgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0IC5zd2FsMi1zdHlsZWQ6Zm9jdXMge1xcbiAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDAgMXB4ICNmZmYsIDAgMCAwIDJweCByZ2JhKDUwLCAxMDAsIDE1MCwgMC40KTtcXG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDFweCAjZmZmLCAwIDAgMCAycHggcmdiYSg1MCwgMTAwLCAxNTAsIDAuNCk7IH1cXG4gIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItc3VjY2VzcyB7XFxuICAgIGJvcmRlci1jb2xvcjogI2E1ZGM4NjsgfVxcbiAgICAuc3dhbDItcG9wdXAuc3dhbDItdG9hc3QgLnN3YWwyLXN1Y2Nlc3MgW2NsYXNzXj0nc3dhbDItc3VjY2Vzcy1jaXJjdWxhci1saW5lJ10ge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogMzJweDtcXG4gICAgICBoZWlnaHQ6IDQ1cHg7XFxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlOyB9XFxuICAgICAgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0IC5zd2FsMi1zdWNjZXNzIFtjbGFzc149J3N3YWwyLXN1Y2Nlc3MtY2lyY3VsYXItbGluZSddW2NsYXNzJD0nbGVmdCddIHtcXG4gICAgICAgIHRvcDogLTRweDtcXG4gICAgICAgIGxlZnQ6IC0xNXB4O1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAzMnB4IDMycHg7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDMycHggMzJweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDY0cHggMCAwIDY0cHg7IH1cXG4gICAgICAuc3dhbDItcG9wdXAuc3dhbDItdG9hc3QgLnN3YWwyLXN1Y2Nlc3MgW2NsYXNzXj0nc3dhbDItc3VjY2Vzcy1jaXJjdWxhci1saW5lJ11bY2xhc3MkPSdyaWdodCddIHtcXG4gICAgICAgIHRvcDogLTRweDtcXG4gICAgICAgIGxlZnQ6IDE1cHg7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDAgMzJweDtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMCAzMnB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMCA2NHB4IDY0cHggMDsgfVxcbiAgICAuc3dhbDItcG9wdXAuc3dhbDItdG9hc3QgLnN3YWwyLXN1Y2Nlc3MgLnN3YWwyLXN1Y2Nlc3MtcmluZyB7XFxuICAgICAgd2lkdGg6IDMycHg7XFxuICAgICAgaGVpZ2h0OiAzMnB4OyB9XFxuICAgIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItc3VjY2VzcyAuc3dhbDItc3VjY2Vzcy1maXgge1xcbiAgICAgIHRvcDogMDtcXG4gICAgICBsZWZ0OiA3cHg7XFxuICAgICAgd2lkdGg6IDdweDtcXG4gICAgICBoZWlnaHQ6IDQzcHg7IH1cXG4gICAgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0IC5zd2FsMi1zdWNjZXNzIFtjbGFzc149J3N3YWwyLXN1Y2Nlc3MtbGluZSddIHtcXG4gICAgICBoZWlnaHQ6IDVweDsgfVxcbiAgICAgIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItc3VjY2VzcyBbY2xhc3NePSdzd2FsMi1zdWNjZXNzLWxpbmUnXVtjbGFzcyQ9J3RpcCddIHtcXG4gICAgICAgIHRvcDogMThweDtcXG4gICAgICAgIGxlZnQ6IDNweDtcXG4gICAgICAgIHdpZHRoOiAxMnB4OyB9XFxuICAgICAgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0IC5zd2FsMi1zdWNjZXNzIFtjbGFzc149J3N3YWwyLXN1Y2Nlc3MtbGluZSddW2NsYXNzJD0nbG9uZyddIHtcXG4gICAgICAgIHRvcDogMTVweDtcXG4gICAgICAgIHJpZ2h0OiAzcHg7XFxuICAgICAgICB3aWR0aDogMjJweDsgfVxcbiAgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0LnN3YWwyLXNob3cge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc2hvd1N3ZWV0VG9hc3QgLjVzO1xcbiAgICAgICAgICAgIGFuaW1hdGlvbjogc2hvd1N3ZWV0VG9hc3QgLjVzOyB9XFxuICAuc3dhbDItcG9wdXAuc3dhbDItdG9hc3Quc3dhbDItaGlkZSB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBoaWRlU3dlZXRUb2FzdCAuMnMgZm9yd2FyZHM7XFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBoaWRlU3dlZXRUb2FzdCAuMnMgZm9yd2FyZHM7IH1cXG4gIC5zd2FsMi1wb3B1cC5zd2FsMi10b2FzdCAuc3dhbDItYW5pbWF0ZS1zdWNjZXNzLWxpbmUtdGlwIHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGFuaW1hdGUtdG9hc3Qtc3VjY2Vzcy10aXAgLjc1cztcXG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGUtdG9hc3Qtc3VjY2Vzcy10aXAgLjc1czsgfVxcbiAgLnN3YWwyLXBvcHVwLnN3YWwyLXRvYXN0IC5zd2FsMi1hbmltYXRlLXN1Y2Nlc3MtbGluZS1sb25nIHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGFuaW1hdGUtdG9hc3Qtc3VjY2Vzcy1sb25nIC43NXM7XFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRlLXRvYXN0LXN1Y2Nlc3MtbG9uZyAuNzVzOyB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNob3dTd2VldFRvYXN0IHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwcHgpIHJvdGF0ZVooMmRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KSByb3RhdGVaKDJkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICAzMyUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGVaKC0yZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgcm90YXRlWigtMmRlZyk7XFxuICAgIG9wYWNpdHk6IC41OyB9XFxuICA2NiUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSg1cHgpIHJvdGF0ZVooMmRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDVweCkgcm90YXRlWigyZGVnKTtcXG4gICAgb3BhY2l0eTogLjc7IH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGVaKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGVaKDApO1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNob3dTd2VldFRvYXN0IHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwcHgpIHJvdGF0ZVooMmRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KSByb3RhdGVaKDJkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICAzMyUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGVaKC0yZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgcm90YXRlWigtMmRlZyk7XFxuICAgIG9wYWNpdHk6IC41OyB9XFxuICA2NiUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSg1cHgpIHJvdGF0ZVooMmRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDVweCkgcm90YXRlWigyZGVnKTtcXG4gICAgb3BhY2l0eTogLjc7IH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGVaKDApO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGVaKDApO1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgaGlkZVN3ZWV0VG9hc3Qge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICAzMyUge1xcbiAgICBvcGFjaXR5OiAuNTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVaKDFkZWcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBoaWRlU3dlZXRUb2FzdCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDMzJSB7XFxuICAgIG9wYWNpdHk6IC41OyB9XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVooMWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDFkZWcpO1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYW5pbWF0ZS10b2FzdC1zdWNjZXNzLXRpcCB7XFxuICAwJSB7XFxuICAgIHRvcDogOXB4O1xcbiAgICBsZWZ0OiAxcHg7XFxuICAgIHdpZHRoOiAwOyB9XFxuICA1NCUge1xcbiAgICB0b3A6IDJweDtcXG4gICAgbGVmdDogMnB4O1xcbiAgICB3aWR0aDogMDsgfVxcbiAgNzAlIHtcXG4gICAgdG9wOiAxMHB4O1xcbiAgICBsZWZ0OiAtNHB4O1xcbiAgICB3aWR0aDogMjZweDsgfVxcbiAgODQlIHtcXG4gICAgdG9wOiAxN3B4O1xcbiAgICBsZWZ0OiAxMnB4O1xcbiAgICB3aWR0aDogOHB4OyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiAxOHB4O1xcbiAgICBsZWZ0OiAzcHg7XFxuICAgIHdpZHRoOiAxMnB4OyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGFuaW1hdGUtdG9hc3Qtc3VjY2Vzcy10aXAge1xcbiAgMCUge1xcbiAgICB0b3A6IDlweDtcXG4gICAgbGVmdDogMXB4O1xcbiAgICB3aWR0aDogMDsgfVxcbiAgNTQlIHtcXG4gICAgdG9wOiAycHg7XFxuICAgIGxlZnQ6IDJweDtcXG4gICAgd2lkdGg6IDA7IH1cXG4gIDcwJSB7XFxuICAgIHRvcDogMTBweDtcXG4gICAgbGVmdDogLTRweDtcXG4gICAgd2lkdGg6IDI2cHg7IH1cXG4gIDg0JSB7XFxuICAgIHRvcDogMTdweDtcXG4gICAgbGVmdDogMTJweDtcXG4gICAgd2lkdGg6IDhweDsgfVxcbiAgMTAwJSB7XFxuICAgIHRvcDogMThweDtcXG4gICAgbGVmdDogM3B4O1xcbiAgICB3aWR0aDogMTJweDsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGFuaW1hdGUtdG9hc3Qtc3VjY2Vzcy1sb25nIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAyNnB4O1xcbiAgICByaWdodDogMjJweDtcXG4gICAgd2lkdGg6IDA7IH1cXG4gIDY1JSB7XFxuICAgIHRvcDogMjBweDtcXG4gICAgcmlnaHQ6IDE1cHg7XFxuICAgIHdpZHRoOiAwOyB9XFxuICA4NCUge1xcbiAgICB0b3A6IDE1cHg7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB3aWR0aDogMThweDsgfVxcbiAgMTAwJSB7XFxuICAgIHRvcDogMTVweDtcXG4gICAgcmlnaHQ6IDNweDtcXG4gICAgd2lkdGg6IDIycHg7IH0gfVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZS10b2FzdC1zdWNjZXNzLWxvbmcge1xcbiAgMCUge1xcbiAgICB0b3A6IDI2cHg7XFxuICAgIHJpZ2h0OiAyMnB4O1xcbiAgICB3aWR0aDogMDsgfVxcbiAgNjUlIHtcXG4gICAgdG9wOiAyMHB4O1xcbiAgICByaWdodDogMTVweDtcXG4gICAgd2lkdGg6IDA7IH1cXG4gIDg0JSB7XFxuICAgIHRvcDogMTVweDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHdpZHRoOiAxOHB4OyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiAxNXB4O1xcbiAgICByaWdodDogM3B4O1xcbiAgICB3aWR0aDogMjJweDsgfSB9XFxuXFxuaHRtbC5zd2FsMi1zaG93bjpub3QoLnN3YWwyLW5vLWJhY2tkcm9wKTpub3QoLnN3YWwyLXRvYXN0LXNob3duKSxcXG5ib2R5LnN3YWwyLXNob3duOm5vdCguc3dhbDItbm8tYmFja2Ryb3ApOm5vdCguc3dhbDItdG9hc3Qtc2hvd24pIHtcXG4gIGhlaWdodDogYXV0bztcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjsgfVxcblxcbmJvZHkuc3dhbDItaW9zZml4IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogMDsgfVxcblxcbmJvZHkuc3dhbDItbm8tYmFja2Ryb3AgLnN3YWwyLXNob3duIHtcXG4gIHRvcDogYXV0bztcXG4gIHJpZ2h0OiBhdXRvO1xcbiAgYm90dG9tOiBhdXRvO1xcbiAgbGVmdDogYXV0bztcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuICBib2R5LnN3YWwyLW5vLWJhY2tkcm9wIC5zd2FsMi1zaG93biA+IC5zd2FsMi1tb2RhbCB7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC40KTsgfVxcbiAgYm9keS5zd2FsMi1uby1iYWNrZHJvcCAuc3dhbDItc2hvd24uc3dhbDItdG9wIHtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTsgfVxcbiAgYm9keS5zd2FsMi1uby1iYWNrZHJvcCAuc3dhbDItc2hvd24uc3dhbDItdG9wLXN0YXJ0LCBib2R5LnN3YWwyLW5vLWJhY2tkcm9wIC5zd2FsMi1zaG93bi5zd2FsMi10b3AtbGVmdCB7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDsgfVxcbiAgYm9keS5zd2FsMi1uby1iYWNrZHJvcCAuc3dhbDItc2hvd24uc3dhbDItdG9wLWVuZCwgYm9keS5zd2FsMi1uby1iYWNrZHJvcCAuc3dhbDItc2hvd24uc3dhbDItdG9wLXJpZ2h0IHtcXG4gICAgdG9wOiAwO1xcbiAgICByaWdodDogMDsgfVxcbiAgYm9keS5zd2FsMi1uby1iYWNrZHJvcCAuc3dhbDItc2hvd24uc3dhbDItY2VudGVyIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTsgfVxcbiAgYm9keS5zd2FsMi1uby1iYWNrZHJvcCAuc3dhbDItc2hvd24uc3dhbDItY2VudGVyLXN0YXJ0LCBib2R5LnN3YWwyLW5vLWJhY2tkcm9wIC5zd2FsMi1zaG93bi5zd2FsMi1jZW50ZXItbGVmdCB7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7IH1cXG4gIGJvZHkuc3dhbDItbm8tYmFja2Ryb3AgLnN3YWwyLXNob3duLnN3YWwyLWNlbnRlci1lbmQsIGJvZHkuc3dhbDItbm8tYmFja2Ryb3AgLnN3YWwyLXNob3duLnN3YWwyLWNlbnRlci1yaWdodCB7XFxuICAgIHRvcDogNTAlO1xcbiAgICByaWdodDogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpOyB9XFxuICBib2R5LnN3YWwyLW5vLWJhY2tkcm9wIC5zd2FsMi1zaG93bi5zd2FsMi1ib3R0b20ge1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpOyB9XFxuICBib2R5LnN3YWwyLW5vLWJhY2tkcm9wIC5zd2FsMi1zaG93bi5zd2FsMi1ib3R0b20tc3RhcnQsIGJvZHkuc3dhbDItbm8tYmFja2Ryb3AgLnN3YWwyLXNob3duLnN3YWwyLWJvdHRvbS1sZWZ0IHtcXG4gICAgYm90dG9tOiAwO1xcbiAgICBsZWZ0OiAwOyB9XFxuICBib2R5LnN3YWwyLW5vLWJhY2tkcm9wIC5zd2FsMi1zaG93bi5zd2FsMi1ib3R0b20tZW5kLCBib2R5LnN3YWwyLW5vLWJhY2tkcm9wIC5zd2FsMi1zaG93bi5zd2FsMi1ib3R0b20tcmlnaHQge1xcbiAgICByaWdodDogMDtcXG4gICAgYm90dG9tOiAwOyB9XFxuXFxuLnN3YWwyLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB6LWluZGV4OiAxMDYwO1xcbiAgb3ZlcmZsb3cteDogaGlkZGVuOyB9XFxuICAuc3dhbDItY29udGFpbmVyLnN3YWwyLXRvcCB7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBzdGFydDtcXG4gICAgICAgIC1tcy1mbGV4LWFsaWduOiBzdGFydDtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDsgfVxcbiAgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi10b3Atc3RhcnQsIC5zd2FsMi1jb250YWluZXIuc3dhbDItdG9wLWxlZnQge1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogc3RhcnQ7XFxuICAgICAgICAtbXMtZmxleC1hbGlnbjogc3RhcnQ7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IHN0YXJ0O1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogc3RhcnQ7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyB9XFxuICAuc3dhbDItY29udGFpbmVyLnN3YWwyLXRvcC1lbmQsIC5zd2FsMi1jb250YWluZXIuc3dhbDItdG9wLXJpZ2h0IHtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IHN0YXJ0O1xcbiAgICAgICAgLW1zLWZsZXgtYWxpZ246IHN0YXJ0O1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBlbmQ7XFxuICAgICAgICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDsgfVxcbiAgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1jZW50ZXIge1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuc3dhbDItY29udGFpbmVyLnN3YWwyLWNlbnRlci1zdGFydCwgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1jZW50ZXItbGVmdCB7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IHN0YXJ0O1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogc3RhcnQ7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0OyB9XFxuICAuc3dhbDItY29udGFpbmVyLnN3YWwyLWNlbnRlci1lbmQsIC5zd2FsMi1jb250YWluZXIuc3dhbDItY2VudGVyLXJpZ2h0IHtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogZW5kO1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogZW5kO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IH1cXG4gIC5zd2FsMi1jb250YWluZXIuc3dhbDItYm90dG9tIHtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGVuZDtcXG4gICAgICAgIC1tcy1mbGV4LWFsaWduOiBlbmQ7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kOyB9XFxuICAuc3dhbDItY29udGFpbmVyLnN3YWwyLWJvdHRvbS1zdGFydCwgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ib3R0b20tbGVmdCB7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBlbmQ7XFxuICAgICAgICAtbXMtZmxleC1hbGlnbjogZW5kO1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogc3RhcnQ7XFxuICAgICAgICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7IH1cXG4gIC5zd2FsMi1jb250YWluZXIuc3dhbDItYm90dG9tLWVuZCwgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ib3R0b20tcmlnaHQge1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogZW5kO1xcbiAgICAgICAgLW1zLWZsZXgtYWxpZ246IGVuZDtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGVuZDtcXG4gICAgICAgIC1tcy1mbGV4LXBhY2s6IGVuZDtcXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kOyB9XFxuICAuc3dhbDItY29udGFpbmVyLnN3YWwyLWdyb3ctZnVsbHNjcmVlbiA+IC5zd2FsMi1tb2RhbCB7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94ICFpbXBvcnRhbnQ7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94ICFpbXBvcnRhbnQ7XFxuICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICAgIGZsZXg6IDE7XFxuICAgIC1tcy1mbGV4LWl0ZW0tYWxpZ246IHN0cmV0Y2g7XFxuICAgICAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG4gIC5zd2FsMi1jb250YWluZXIuc3dhbDItZ3Jvdy1yb3cgPiAuc3dhbDItbW9kYWwge1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveCAhaW1wb3J0YW50O1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveCAhaW1wb3J0YW50O1xcbiAgICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgICBmbGV4OiAxO1xcbiAgICAtbXMtZmxleC1saW5lLXBhY2s6IGNlbnRlcjtcXG4gICAgICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuICAuc3dhbDItY29udGFpbmVyLnN3YWwyLWdyb3ctY29sdW1uIHtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gICAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICAgIGZsZXg6IDE7XFxuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAgIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxcbiAgICAuc3dhbDItY29udGFpbmVyLnN3YWwyLWdyb3ctY29sdW1uLnN3YWwyLXRvcCwgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ncm93LWNvbHVtbi5zd2FsMi1jZW50ZXIsIC5zd2FsMi1jb250YWluZXIuc3dhbDItZ3Jvdy1jb2x1bW4uc3dhbDItYm90dG9tIHtcXG4gICAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgICAuc3dhbDItY29udGFpbmVyLnN3YWwyLWdyb3ctY29sdW1uLnN3YWwyLXRvcC1zdGFydCwgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ncm93LWNvbHVtbi5zd2FsMi1jZW50ZXItc3RhcnQsIC5zd2FsMi1jb250YWluZXIuc3dhbDItZ3Jvdy1jb2x1bW4uc3dhbDItYm90dG9tLXN0YXJ0LCAuc3dhbDItY29udGFpbmVyLnN3YWwyLWdyb3ctY29sdW1uLnN3YWwyLXRvcC1sZWZ0LCAuc3dhbDItY29udGFpbmVyLnN3YWwyLWdyb3ctY29sdW1uLnN3YWwyLWNlbnRlci1sZWZ0LCAuc3dhbDItY29udGFpbmVyLnN3YWwyLWdyb3ctY29sdW1uLnN3YWwyLWJvdHRvbS1sZWZ0IHtcXG4gICAgICAtd2Via2l0LWJveC1hbGlnbjogc3RhcnQ7XFxuICAgICAgICAgIC1tcy1mbGV4LWFsaWduOiBzdGFydDtcXG4gICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyB9XFxuICAgIC5zd2FsMi1jb250YWluZXIuc3dhbDItZ3Jvdy1jb2x1bW4uc3dhbDItdG9wLWVuZCwgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ncm93LWNvbHVtbi5zd2FsMi1jZW50ZXItZW5kLCAuc3dhbDItY29udGFpbmVyLnN3YWwyLWdyb3ctY29sdW1uLnN3YWwyLWJvdHRvbS1lbmQsIC5zd2FsMi1jb250YWluZXIuc3dhbDItZ3Jvdy1jb2x1bW4uc3dhbDItdG9wLXJpZ2h0LCAuc3dhbDItY29udGFpbmVyLnN3YWwyLWdyb3ctY29sdW1uLnN3YWwyLWNlbnRlci1yaWdodCwgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ncm93LWNvbHVtbi5zd2FsMi1ib3R0b20tcmlnaHQge1xcbiAgICAgIC13ZWJraXQtYm94LWFsaWduOiBlbmQ7XFxuICAgICAgICAgIC1tcy1mbGV4LWFsaWduOiBlbmQ7XFxuICAgICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7IH1cXG4gICAgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1ncm93LWNvbHVtbiA+IC5zd2FsMi1tb2RhbCB7XFxuICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3ggIWltcG9ydGFudDtcXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveCAhaW1wb3J0YW50O1xcbiAgICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcXG4gICAgICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgICAgIGZsZXg6IDE7XFxuICAgICAgLW1zLWZsZXgtbGluZS1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XFxuICAuc3dhbDItY29udGFpbmVyOm5vdCguc3dhbDItdG9wKTpub3QoLnN3YWwyLXRvcC1zdGFydCk6bm90KC5zd2FsMi10b3AtZW5kKTpub3QoLnN3YWwyLXRvcC1sZWZ0KTpub3QoLnN3YWwyLXRvcC1yaWdodCk6bm90KC5zd2FsMi1jZW50ZXItc3RhcnQpOm5vdCguc3dhbDItY2VudGVyLWVuZCk6bm90KC5zd2FsMi1jZW50ZXItbGVmdCk6bm90KC5zd2FsMi1jZW50ZXItcmlnaHQpOm5vdCguc3dhbDItYm90dG9tKTpub3QoLnN3YWwyLWJvdHRvbS1zdGFydCk6bm90KC5zd2FsMi1ib3R0b20tZW5kKTpub3QoLnN3YWwyLWJvdHRvbS1sZWZ0KTpub3QoLnN3YWwyLWJvdHRvbS1yaWdodCkgPiAuc3dhbDItbW9kYWwge1xcbiAgICBtYXJnaW46IGF1dG87IH1cXG4gIEBtZWRpYSBhbGwgYW5kICgtbXMtaGlnaC1jb250cmFzdDogbm9uZSksICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSB7XFxuICAgIC5zd2FsMi1jb250YWluZXIgLnN3YWwyLW1vZGFsIHtcXG4gICAgICBtYXJnaW46IDAgIWltcG9ydGFudDsgfSB9XFxuICAuc3dhbDItY29udGFpbmVyLnN3YWwyLWZhZGUge1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjFzO1xcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4xczsgfVxcbiAgLnN3YWwyLWNvbnRhaW5lci5zd2FsMi1zaG93biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTsgfVxcblxcbi5zd2FsMi1wb3B1cCB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogMzJlbTtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDEuMjVlbTtcXG4gIGJvcmRlci1yYWRpdXM6IC4zMTI1ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICBmb250LXNpemU6IDFyZW07XFxuICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICBvdmVyZmxvdy15OiBhdXRvOyB9XFxuICAuc3dhbDItcG9wdXA6Zm9jdXMge1xcbiAgICBvdXRsaW5lOiBub25lOyB9XFxuICAuc3dhbDItcG9wdXAuc3dhbDItbG9hZGluZyB7XFxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjsgfVxcbiAgLnN3YWwyLXBvcHVwIC5zd2FsMi1oZWFkZXIge1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAgIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLnN3YWwyLXBvcHVwIC5zd2FsMi10aXRsZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbjogMCAwIC40ZW07XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGNvbG9yOiAjNTk1OTU5O1xcbiAgICBmb250LXNpemU6IDEuODc1ZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDsgfVxcbiAgLnN3YWwyLXBvcHVwIC5zd2FsMi1hY3Rpb25zIHtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAxLjI1ZW07IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1hY3Rpb25zOm5vdCguc3dhbDItbG9hZGluZykgLnN3YWwyLXN0eWxlZFtkaXNhYmxlZF0ge1xcbiAgICAgIG9wYWNpdHk6IC40OyB9XFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItYWN0aW9uczpub3QoLnN3YWwyLWxvYWRpbmcpIC5zd2FsMi1zdHlsZWQ6aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgbGVmdCBib3R0b20sIGZyb20ocmdiYSgwLCAwLCAwLCAwLjEpKSwgdG8ocmdiYSgwLCAwLCAwLCAwLjEpKSk7XFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHJnYmEoMCwgMCwgMCwgMC4xKSwgcmdiYSgwLCAwLCAwLCAwLjEpKTsgfVxcbiAgICAuc3dhbDItcG9wdXAgLnN3YWwyLWFjdGlvbnM6bm90KC5zd2FsMi1sb2FkaW5nKSAuc3dhbDItc3R5bGVkOmFjdGl2ZSB7XFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgZnJvbShyZ2JhKDAsIDAsIDAsIDAuMikpLCB0byhyZ2JhKDAsIDAsIDAsIDAuMikpKTtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQocmdiYSgwLCAwLCAwLCAwLjIpLCByZ2JhKDAsIDAsIDAsIDAuMikpOyB9XFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItYWN0aW9ucy5zd2FsMi1sb2FkaW5nIC5zd2FsMi1zdHlsZWQuc3dhbDItY29uZmlybSB7XFxuICAgICAgd2lkdGg6IDIuNWVtO1xcbiAgICAgIGhlaWdodDogMi41ZW07XFxuICAgICAgbWFyZ2luOiAuNDY4NzVlbTtcXG4gICAgICBwYWRkaW5nOiAwO1xcbiAgICAgIGJvcmRlcjogLjI1ZW0gc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XFxuICAgICAgY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gICAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiByb3RhdGUtbG9hZGluZyAxLjVzIGxpbmVhciAwcyBpbmZpbml0ZSBub3JtYWw7XFxuICAgICAgICAgICAgICBhbmltYXRpb246IHJvdGF0ZS1sb2FkaW5nIDEuNXMgbGluZWFyIDBzIGluZmluaXRlIG5vcm1hbDtcXG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lOyB9XFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItYWN0aW9ucy5zd2FsMi1sb2FkaW5nIC5zd2FsMi1zdHlsZWQuc3dhbDItY2FuY2VsIHtcXG4gICAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICAgICAgbWFyZ2luLWxlZnQ6IDMwcHg7IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1hY3Rpb25zLnN3YWwyLWxvYWRpbmcgOm5vdCguc3dhbDItc3R5bGVkKS5zd2FsMi1jb25maXJtOjphZnRlciB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiAxNXB4O1xcbiAgICAgIGhlaWdodDogMTVweDtcXG4gICAgICBtYXJnaW4tbGVmdDogNXB4O1xcbiAgICAgIGJvcmRlcjogM3B4IHNvbGlkICM5OTk5OTk7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAxcHggMXB4IDFweCAjZmZmO1xcbiAgICAgICAgICAgICAgYm94LXNoYWRvdzogMXB4IDFweCAxcHggI2ZmZjtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICAtd2Via2l0LWFuaW1hdGlvbjogcm90YXRlLWxvYWRpbmcgMS41cyBsaW5lYXIgMHMgaW5maW5pdGUgbm9ybWFsO1xcbiAgICAgICAgICAgICAgYW5pbWF0aW9uOiByb3RhdGUtbG9hZGluZyAxLjVzIGxpbmVhciAwcyBpbmZpbml0ZSBub3JtYWw7IH1cXG4gIC5zd2FsMi1wb3B1cCAuc3dhbDItc3R5bGVkIHtcXG4gICAgbWFyZ2luOiAwIC4zMTI1ZW07XFxuICAgIHBhZGRpbmc6IC42MjVlbSAyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiBub25lOyB9XFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItc3R5bGVkOm5vdChbZGlzYWJsZWRdKSB7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItc3R5bGVkLnN3YWwyLWNvbmZpcm0ge1xcbiAgICAgIGJvcmRlcjogMDtcXG4gICAgICBib3JkZXItcmFkaXVzOiAwLjI1ZW07XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMwODVkNjtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICBmb250LXNpemU6IDEuMDYyNWVtOyB9XFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItc3R5bGVkLnN3YWwyLWNhbmNlbCB7XFxuICAgICAgYm9yZGVyOiAwO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMjVlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhO1xcbiAgICAgIGNvbG9yOiAjZmZmO1xcbiAgICAgIGZvbnQtc2l6ZTogMS4wNjI1ZW07IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1zdHlsZWQ6Zm9jdXMge1xcbiAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCAycHggI2ZmZiwgMCAwIDAgNHB4IHJnYmEoNTAsIDEwMCwgMTUwLCAwLjQpO1xcbiAgICAgICAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMnB4ICNmZmYsIDAgMCAwIDRweCByZ2JhKDUwLCAxMDAsIDE1MCwgMC40KTsgfVxcbiAgICAuc3dhbDItcG9wdXAgLnN3YWwyLXN0eWxlZDo6LW1vei1mb2N1cy1pbm5lciB7XFxuICAgICAgYm9yZGVyOiAwOyB9XFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLWZvb3RlciB7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMS4yNWVtO1xcbiAgICBwYWRkaW5nLXRvcDogMWVtO1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2VlZTtcXG4gICAgY29sb3I6ICM1NDU0NTQ7XFxuICAgIGZvbnQtc2l6ZTogMWVtOyB9XFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLWltYWdlIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW46IDEuMjVlbSBhdXRvOyB9XFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLWNsb3NlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDVweDtcXG4gICAgcmlnaHQ6IDhweDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB3aWR0aDogMS4yZW07XFxuICAgIG1pbi13aWR0aDogMS4yZW07XFxuICAgIGhlaWdodDogMS4yZW07XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBjb2xvciAuMXMgZWFzZTtcXG4gICAgdHJhbnNpdGlvbjogY29sb3IgLjFzIGVhc2U7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGNvbG9yOiAjY2NjY2NjO1xcbiAgICBmb250LWZhbWlseTogc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogY2FsYygyLjVlbSAtIDAuMjVlbSk7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjJlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItY2xvc2U6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjZDU1OyB9XFxuICAuc3dhbDItcG9wdXAgPiAuc3dhbDItaW5wdXQsXFxuICAuc3dhbDItcG9wdXAgPiAuc3dhbDItZmlsZSxcXG4gIC5zd2FsMi1wb3B1cCA+IC5zd2FsMi10ZXh0YXJlYSxcXG4gIC5zd2FsMi1wb3B1cCA+IC5zd2FsMi1zZWxlY3QsXFxuICAuc3dhbDItcG9wdXAgPiAuc3dhbDItcmFkaW8sXFxuICAuc3dhbDItcG9wdXAgPiAuc3dhbDItY2hlY2tib3gge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLWNvbnRlbnQge1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgY29sb3I6ICM1NDU0NTQ7XFxuICAgIGZvbnQtc2l6ZTogMS4xMjVlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gICAgd29yZC13cmFwOiBicmVhay13b3JkOyB9XFxuICAuc3dhbDItcG9wdXAgI3N3YWwyLWNvbnRlbnQge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIC5zd2FsMi1wb3B1cCAuc3dhbDItaW5wdXQsXFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLWZpbGUsXFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLXRleHRhcmVhLFxcbiAgLnN3YWwyLXBvcHVwIC5zd2FsMi1zZWxlY3QsXFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLXJhZGlvLFxcbiAgLnN3YWwyLXBvcHVwIC5zd2FsMi1jaGVja2JveCB7XFxuICAgIG1hcmdpbjogMWVtIGF1dG87IH1cXG4gIC5zd2FsMi1wb3B1cCAuc3dhbDItaW5wdXQsXFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLWZpbGUsXFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLXRleHRhcmVhIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIC4zcywgLXdlYmtpdC1ib3gtc2hhZG93IC4zcztcXG4gICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIC4zcywgLXdlYmtpdC1ib3gtc2hhZG93IC4zcztcXG4gICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIC4zcywgYm94LXNoYWRvdyAuM3M7XFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAuM3MsIGJveC1zaGFkb3cgLjNzLCAtd2Via2l0LWJveC1zaGFkb3cgLjNzO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZDlkOWQ5O1xcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAgIGZvbnQtc2l6ZTogMS4xMjVlbTtcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcXG4gICAgICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA2KTtcXG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1pbnB1dC5zd2FsMi1pbnB1dGVycm9yLFxcbiAgICAuc3dhbDItcG9wdXAgLnN3YWwyLWZpbGUuc3dhbDItaW5wdXRlcnJvcixcXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi10ZXh0YXJlYS5zd2FsMi1pbnB1dGVycm9yIHtcXG4gICAgICBib3JkZXItY29sb3I6ICNmMjc0NzQgIWltcG9ydGFudDtcXG4gICAgICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAycHggI2YyNzQ3NCAhaW1wb3J0YW50O1xcbiAgICAgICAgICAgICAgYm94LXNoYWRvdzogMCAwIDJweCAjZjI3NDc0ICFpbXBvcnRhbnQ7IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1pbnB1dDpmb2N1cyxcXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1maWxlOmZvY3VzLFxcbiAgICAuc3dhbDItcG9wdXAgLnN3YWwyLXRleHRhcmVhOmZvY3VzIHtcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjYjRkYmVkO1xcbiAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgM3B4ICNjNGU2ZjU7XFxuICAgICAgICAgICAgICBib3gtc2hhZG93OiAwIDAgM3B4ICNjNGU2ZjU7IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1pbnB1dDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlcixcXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1maWxlOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyLFxcbiAgICAuc3dhbDItcG9wdXAgLnN3YWwyLXRleHRhcmVhOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gICAgICBjb2xvcjogI2NjY2NjYzsgfVxcbiAgICAuc3dhbDItcG9wdXAgLnN3YWwyLWlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlcixcXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1maWxlOi1tcy1pbnB1dC1wbGFjZWhvbGRlcixcXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi10ZXh0YXJlYTotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgICAgIGNvbG9yOiAjY2NjY2NjOyB9XFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItaW5wdXQ6Oi1tcy1pbnB1dC1wbGFjZWhvbGRlcixcXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1maWxlOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIsXFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItdGV4dGFyZWE6Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAgICAgY29sb3I6ICNjY2NjY2M7IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1pbnB1dDo6cGxhY2Vob2xkZXIsXFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItZmlsZTo6cGxhY2Vob2xkZXIsXFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItdGV4dGFyZWE6OnBsYWNlaG9sZGVyIHtcXG4gICAgICBjb2xvcjogI2NjY2NjYzsgfVxcbiAgLnN3YWwyLXBvcHVwIC5zd2FsMi1yYW5nZSBpbnB1dCB7XFxuICAgIHdpZHRoOiA4MCU7IH1cXG4gIC5zd2FsMi1wb3B1cCAuc3dhbDItcmFuZ2Ugb3V0cHV0IHtcXG4gICAgd2lkdGg6IDIwJTtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLXJhbmdlIGlucHV0LFxcbiAgLnN3YWwyLXBvcHVwIC5zd2FsMi1yYW5nZSBvdXRwdXQge1xcbiAgICBoZWlnaHQ6IDIuNjI1ZW07XFxuICAgIG1hcmdpbjogMWVtIGF1dG87XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGZvbnQtc2l6ZTogMS4xMjVlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDIuNjI1ZW07IH1cXG4gIC5zd2FsMi1wb3B1cCAuc3dhbDItaW5wdXQge1xcbiAgICBoZWlnaHQ6IDIuNjI1ZW07XFxuICAgIHBhZGRpbmc6IDAgLjc1ZW07IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1pbnB1dFt0eXBlPSdudW1iZXInXSB7XFxuICAgICAgbWF4LXdpZHRoOiAxMGVtOyB9XFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLWZpbGUge1xcbiAgICBmb250LXNpemU6IDEuMTI1ZW07IH1cXG4gIC5zd2FsMi1wb3B1cCAuc3dhbDItdGV4dGFyZWEge1xcbiAgICBoZWlnaHQ6IDYuNzVlbTtcXG4gICAgcGFkZGluZzogLjc1ZW07IH1cXG4gIC5zd2FsMi1wb3B1cCAuc3dhbDItc2VsZWN0IHtcXG4gICAgbWluLXdpZHRoOiA1MCU7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gICAgcGFkZGluZzogLjM3NWVtIC42MjVlbTtcXG4gICAgY29sb3I6ICM1NDU0NTQ7XFxuICAgIGZvbnQtc2l6ZTogMS4xMjVlbTsgfVxcbiAgLnN3YWwyLXBvcHVwIC5zd2FsMi1yYWRpbyxcXG4gIC5zd2FsMi1wb3B1cCAuc3dhbDItY2hlY2tib3gge1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1yYWRpbyBsYWJlbCxcXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi1jaGVja2JveCBsYWJlbCB7XFxuICAgICAgbWFyZ2luOiAwIC42ZW07XFxuICAgICAgZm9udC1zaXplOiAxLjEyNWVtOyB9XFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItcmFkaW8gaW5wdXQsXFxuICAgIC5zd2FsMi1wb3B1cCAuc3dhbDItY2hlY2tib3ggaW5wdXQge1xcbiAgICAgIG1hcmdpbjogMCAuNGVtOyB9XFxuICAuc3dhbDItcG9wdXAgLnN3YWwyLXZhbGlkYXRpb25lcnJvciB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogLjYyNWVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xcbiAgICBjb2xvcjogZ3JheTtcXG4gICAgZm9udC1zaXplOiAxZW07XFxuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gICAgLnN3YWwyLXBvcHVwIC5zd2FsMi12YWxpZGF0aW9uZXJyb3I6OmJlZm9yZSB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiAxLjVlbTtcXG4gICAgICBoZWlnaHQ6IDEuNWVtO1xcbiAgICAgIG1hcmdpbjogMCAuNjI1ZW07XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlYTdkN2Q7XFxuICAgICAgY29sb3I6ICNmZmY7XFxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGNvbnRlbnQ6ICchJzsgfVxcblxcbkBzdXBwb3J0cyAoLW1zLWFjY2VsZXJhdG9yOiB0cnVlKSB7XFxuICAuc3dhbDItcmFuZ2UgaW5wdXQge1xcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XFxuICAuc3dhbDItcmFuZ2Ugb3V0cHV0IHtcXG4gICAgZGlzcGxheTogbm9uZTsgfSB9XFxuXFxuQG1lZGlhIGFsbCBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpIHtcXG4gIC5zd2FsMi1yYW5nZSBpbnB1dCB7XFxuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IH1cXG4gIC5zd2FsMi1yYW5nZSBvdXRwdXQge1xcbiAgICBkaXNwbGF5OiBub25lOyB9IH1cXG5cXG4uc3dhbDItaWNvbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiA4MHB4O1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgbWFyZ2luOiAxLjI1ZW0gYXV0byAxLjg3NWVtO1xcbiAgYm9yZGVyOiA0cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBsaW5lLWhlaWdodDogODBweDtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIC13ZWJraXQtYm94LXNpemluZzogY29udGVudC1ib3g7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcbiAgLnN3YWwyLWljb24uc3dhbDItZXJyb3Ige1xcbiAgICBib3JkZXItY29sb3I6ICNmMjc0NzQ7IH1cXG4gICAgLnN3YWwyLWljb24uc3dhbDItZXJyb3IgLnN3YWwyLXgtbWFyayB7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgICAgICAgIC1tcy1mbGV4LXBvc2l0aXZlOiAxO1xcbiAgICAgICAgICAgICAgZmxleC1ncm93OiAxOyB9XFxuICAgIC5zd2FsMi1pY29uLnN3YWwyLWVycm9yIFtjbGFzc149J3N3YWwyLXgtbWFyay1saW5lJ10ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDM3cHg7XFxuICAgICAgd2lkdGg6IDQ3cHg7XFxuICAgICAgaGVpZ2h0OiA1cHg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMjc0NzQ7IH1cXG4gICAgICAuc3dhbDItaWNvbi5zd2FsMi1lcnJvciBbY2xhc3NePSdzd2FsMi14LW1hcmstbGluZSddW2NsYXNzJD0nbGVmdCddIHtcXG4gICAgICAgIGxlZnQ6IDE3cHg7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpOyB9XFxuICAgICAgLnN3YWwyLWljb24uc3dhbDItZXJyb3IgW2NsYXNzXj0nc3dhbDIteC1tYXJrLWxpbmUnXVtjbGFzcyQ9J3JpZ2h0J10ge1xcbiAgICAgICAgcmlnaHQ6IDE2cHg7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7IH1cXG4gIC5zd2FsMi1pY29uLnN3YWwyLXdhcm5pbmcsIC5zd2FsMi1pY29uLnN3YWwyLWluZm8sIC5zd2FsMi1pY29uLnN3YWwyLXF1ZXN0aW9uIHtcXG4gICAgbWFyZ2luOiAuMzMzMzMzZW0gYXV0byAuNWVtO1xcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gICAgZm9udC1zaXplOiAzLjc1ZW07IH1cXG4gIC5zd2FsMi1pY29uLnN3YWwyLXdhcm5pbmcge1xcbiAgICBib3JkZXItY29sb3I6ICNmYWNlYTg7XFxuICAgIGNvbG9yOiAjZjhiYjg2OyB9XFxuICAuc3dhbDItaWNvbi5zd2FsMi1pbmZvIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjOWRlMGY2O1xcbiAgICBjb2xvcjogIzNmYzNlZTsgfVxcbiAgLnN3YWwyLWljb24uc3dhbDItcXVlc3Rpb24ge1xcbiAgICBib3JkZXItY29sb3I6ICNjOWRhZTE7XFxuICAgIGNvbG9yOiAjODdhZGJkOyB9XFxuICAuc3dhbDItaWNvbi5zd2FsMi1zdWNjZXNzIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjYTVkYzg2OyB9XFxuICAgIC5zd2FsMi1pY29uLnN3YWwyLXN1Y2Nlc3MgW2NsYXNzXj0nc3dhbDItc3VjY2Vzcy1jaXJjdWxhci1saW5lJ10ge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogNjBweDtcXG4gICAgICBoZWlnaHQ6IDEyMHB4O1xcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTsgfVxcbiAgICAgIC5zd2FsMi1pY29uLnN3YWwyLXN1Y2Nlc3MgW2NsYXNzXj0nc3dhbDItc3VjY2Vzcy1jaXJjdWxhci1saW5lJ11bY2xhc3MkPSdsZWZ0J10ge1xcbiAgICAgICAgdG9wOiAtN3B4O1xcbiAgICAgICAgbGVmdDogLTMzcHg7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDYwcHggNjBweDtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogNjBweCA2MHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTIwcHggMCAwIDEyMHB4OyB9XFxuICAgICAgLnN3YWwyLWljb24uc3dhbDItc3VjY2VzcyBbY2xhc3NePSdzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUnXVtjbGFzcyQ9J3JpZ2h0J10ge1xcbiAgICAgICAgdG9wOiAtMTFweDtcXG4gICAgICAgIGxlZnQ6IDMwcHg7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDAgNjBweDtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMCA2MHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMCAxMjBweCAxMjBweCAwOyB9XFxuICAgIC5zd2FsMi1pY29uLnN3YWwyLXN1Y2Nlc3MgLnN3YWwyLXN1Y2Nlc3MtcmluZyB7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHRvcDogLTRweDtcXG4gICAgICBsZWZ0OiAtNHB4O1xcbiAgICAgIHdpZHRoOiA4MHB4O1xcbiAgICAgIGhlaWdodDogODBweDtcXG4gICAgICBib3JkZXI6IDRweCBzb2xpZCByZ2JhKDE2NSwgMjIwLCAxMzQsIDAuMik7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIHotaW5kZXg6IDI7XFxuICAgICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gICAgICAgICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyB9XFxuICAgIC5zd2FsMi1pY29uLnN3YWwyLXN1Y2Nlc3MgLnN3YWwyLXN1Y2Nlc3MtZml4IHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiA4cHg7XFxuICAgICAgbGVmdDogMjZweDtcXG4gICAgICB3aWR0aDogN3B4O1xcbiAgICAgIGhlaWdodDogOTBweDtcXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbiAgICAgIHotaW5kZXg6IDE7IH1cXG4gICAgLnN3YWwyLWljb24uc3dhbDItc3VjY2VzcyBbY2xhc3NePSdzd2FsMi1zdWNjZXNzLWxpbmUnXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGhlaWdodDogNXB4O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTVkYzg2O1xcbiAgICAgIHotaW5kZXg6IDI7IH1cXG4gICAgICAuc3dhbDItaWNvbi5zd2FsMi1zdWNjZXNzIFtjbGFzc149J3N3YWwyLXN1Y2Nlc3MtbGluZSddW2NsYXNzJD0ndGlwJ10ge1xcbiAgICAgICAgdG9wOiA0NnB4O1xcbiAgICAgICAgbGVmdDogMTRweDtcXG4gICAgICAgIHdpZHRoOiAyNXB4O1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTsgfVxcbiAgICAgIC5zd2FsMi1pY29uLnN3YWwyLXN1Y2Nlc3MgW2NsYXNzXj0nc3dhbDItc3VjY2Vzcy1saW5lJ11bY2xhc3MkPSdsb25nJ10ge1xcbiAgICAgICAgdG9wOiAzOHB4O1xcbiAgICAgICAgcmlnaHQ6IDhweDtcXG4gICAgICAgIHdpZHRoOiA0N3B4O1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpOyB9XFxuXFxuLnN3YWwyLXByb2dyZXNzc3RlcHMge1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luOiAwIDAgMS4yNWVtO1xcbiAgcGFkZGluZzogMDtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7IH1cXG4gIC5zd2FsMi1wcm9ncmVzc3N0ZXBzIGxpIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5zd2FsMi1wcm9ncmVzc3N0ZXBzIC5zd2FsMi1wcm9ncmVzc2NpcmNsZSB7XFxuICAgIHdpZHRoOiAyZW07XFxuICAgIGhlaWdodDogMmVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAyZW07XFxuICAgIGJhY2tncm91bmQ6ICMzMDg1ZDY7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBsaW5lLWhlaWdodDogMmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDIwOyB9XFxuICAgIC5zd2FsMi1wcm9ncmVzc3N0ZXBzIC5zd2FsMi1wcm9ncmVzc2NpcmNsZTpmaXJzdC1jaGlsZCB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IDA7IH1cXG4gICAgLnN3YWwyLXByb2dyZXNzc3RlcHMgLnN3YWwyLXByb2dyZXNzY2lyY2xlOmxhc3QtY2hpbGQge1xcbiAgICAgIG1hcmdpbi1yaWdodDogMDsgfVxcbiAgICAuc3dhbDItcHJvZ3Jlc3NzdGVwcyAuc3dhbDItcHJvZ3Jlc3NjaXJjbGUuc3dhbDItYWN0aXZlcHJvZ3Jlc3NzdGVwIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjMzA4NWQ2OyB9XFxuICAgICAgLnN3YWwyLXByb2dyZXNzc3RlcHMgLnN3YWwyLXByb2dyZXNzY2lyY2xlLnN3YWwyLWFjdGl2ZXByb2dyZXNzc3RlcCB+IC5zd2FsMi1wcm9ncmVzc2NpcmNsZSB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjYWRkOGU2OyB9XFxuICAgICAgLnN3YWwyLXByb2dyZXNzc3RlcHMgLnN3YWwyLXByb2dyZXNzY2lyY2xlLnN3YWwyLWFjdGl2ZXByb2dyZXNzc3RlcCB+IC5zd2FsMi1wcm9ncmVzc2xpbmUge1xcbiAgICAgICAgYmFja2dyb3VuZDogI2FkZDhlNjsgfVxcbiAgLnN3YWwyLXByb2dyZXNzc3RlcHMgLnN3YWwyLXByb2dyZXNzbGluZSB7XFxuICAgIHdpZHRoOiAyLjVlbTtcXG4gICAgaGVpZ2h0OiAuNGVtO1xcbiAgICBtYXJnaW46IDAgLTFweDtcXG4gICAgYmFja2dyb3VuZDogIzMwODVkNjtcXG4gICAgei1pbmRleDogMTA7IH1cXG5cXG5bY2xhc3NePSdzd2FsMiddIHtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc2hvd1N3ZWV0QWxlcnQge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC43KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7IH1cXG4gIDQ1JSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpOyB9XFxuICA4MCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC45NSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNob3dTd2VldEFsZXJ0IHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpOyB9XFxuICA0NSUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTsgfVxcbiAgODAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7IH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGhpZGVTd2VldEFsZXJ0IHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgaGlkZVN3ZWV0QWxlcnQge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLnN3YWwyLXNob3cge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHNob3dTd2VldEFsZXJ0IC4zcztcXG4gICAgICAgICAgYW5pbWF0aW9uOiBzaG93U3dlZXRBbGVydCAuM3M7IH1cXG4gIC5zd2FsMi1zaG93LnN3YWwyLW5vYW5pbWF0aW9uIHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IG5vbmU7XFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBub25lOyB9XFxuXFxuLnN3YWwyLWhpZGUge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGhpZGVTd2VldEFsZXJ0IC4xNXMgZm9yd2FyZHM7XFxuICAgICAgICAgIGFuaW1hdGlvbjogaGlkZVN3ZWV0QWxlcnQgLjE1cyBmb3J3YXJkczsgfVxcbiAgLnN3YWwyLWhpZGUuc3dhbDItbm9hbmltYXRpb24ge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogbm9uZTtcXG4gICAgICAgICAgICBhbmltYXRpb246IG5vbmU7IH1cXG5cXG5bZGlyPSdydGwnXSAuc3dhbDItY2xvc2Uge1xcbiAgcmlnaHQ6IGF1dG87XFxuICBsZWZ0OiA4cHg7IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYW5pbWF0ZS1zdWNjZXNzLXRpcCB7XFxuICAwJSB7XFxuICAgIHRvcDogMTlweDtcXG4gICAgbGVmdDogMXB4O1xcbiAgICB3aWR0aDogMDsgfVxcbiAgNTQlIHtcXG4gICAgdG9wOiAxN3B4O1xcbiAgICBsZWZ0OiAycHg7XFxuICAgIHdpZHRoOiAwOyB9XFxuICA3MCUge1xcbiAgICB0b3A6IDM1cHg7XFxuICAgIGxlZnQ6IC02cHg7XFxuICAgIHdpZHRoOiA1MHB4OyB9XFxuICA4NCUge1xcbiAgICB0b3A6IDQ4cHg7XFxuICAgIGxlZnQ6IDIxcHg7XFxuICAgIHdpZHRoOiAxN3B4OyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA0NXB4O1xcbiAgICBsZWZ0OiAxNHB4O1xcbiAgICB3aWR0aDogMjVweDsgfSB9XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlLXN1Y2Nlc3MtdGlwIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxOXB4O1xcbiAgICBsZWZ0OiAxcHg7XFxuICAgIHdpZHRoOiAwOyB9XFxuICA1NCUge1xcbiAgICB0b3A6IDE3cHg7XFxuICAgIGxlZnQ6IDJweDtcXG4gICAgd2lkdGg6IDA7IH1cXG4gIDcwJSB7XFxuICAgIHRvcDogMzVweDtcXG4gICAgbGVmdDogLTZweDtcXG4gICAgd2lkdGg6IDUwcHg7IH1cXG4gIDg0JSB7XFxuICAgIHRvcDogNDhweDtcXG4gICAgbGVmdDogMjFweDtcXG4gICAgd2lkdGg6IDE3cHg7IH1cXG4gIDEwMCUge1xcbiAgICB0b3A6IDQ1cHg7XFxuICAgIGxlZnQ6IDE0cHg7XFxuICAgIHdpZHRoOiAyNXB4OyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYW5pbWF0ZS1zdWNjZXNzLWxvbmcge1xcbiAgMCUge1xcbiAgICB0b3A6IDU0cHg7XFxuICAgIHJpZ2h0OiA0NnB4O1xcbiAgICB3aWR0aDogMDsgfVxcbiAgNjUlIHtcXG4gICAgdG9wOiA1NHB4O1xcbiAgICByaWdodDogNDZweDtcXG4gICAgd2lkdGg6IDA7IH1cXG4gIDg0JSB7XFxuICAgIHRvcDogMzVweDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHdpZHRoOiA1NXB4OyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiAzOHB4O1xcbiAgICByaWdodDogOHB4O1xcbiAgICB3aWR0aDogNDdweDsgfSB9XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlLXN1Y2Nlc3MtbG9uZyB7XFxuICAwJSB7XFxuICAgIHRvcDogNTRweDtcXG4gICAgcmlnaHQ6IDQ2cHg7XFxuICAgIHdpZHRoOiAwOyB9XFxuICA2NSUge1xcbiAgICB0b3A6IDU0cHg7XFxuICAgIHJpZ2h0OiA0NnB4O1xcbiAgICB3aWR0aDogMDsgfVxcbiAgODQlIHtcXG4gICAgdG9wOiAzNXB4O1xcbiAgICByaWdodDogMDtcXG4gICAgd2lkdGg6IDU1cHg7IH1cXG4gIDEwMCUge1xcbiAgICB0b3A6IDM4cHg7XFxuICAgIHJpZ2h0OiA4cHg7XFxuICAgIHdpZHRoOiA0N3B4OyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgcm90YXRlUGxhY2Vob2xkZXIge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTsgfVxcbiAgNSUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTsgfVxcbiAgMTIlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDA1ZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDA1ZGVnKTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQwNWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQwNWRlZyk7IH0gfVxcblxcbkBrZXlmcmFtZXMgcm90YXRlUGxhY2Vob2xkZXIge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTsgfVxcbiAgNSUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTsgfVxcbiAgMTIlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNDA1ZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDA1ZGVnKTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQwNWRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQwNWRlZyk7IH0gfVxcblxcbi5zd2FsMi1hbmltYXRlLXN1Y2Nlc3MtbGluZS10aXAge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGFuaW1hdGUtc3VjY2Vzcy10aXAgLjc1cztcXG4gICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRlLXN1Y2Nlc3MtdGlwIC43NXM7IH1cXG5cXG4uc3dhbDItYW5pbWF0ZS1zdWNjZXNzLWxpbmUtbG9uZyB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogYW5pbWF0ZS1zdWNjZXNzLWxvbmcgLjc1cztcXG4gICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRlLXN1Y2Nlc3MtbG9uZyAuNzVzOyB9XFxuXFxuLnN3YWwyLXN1Y2Nlc3Muc3dhbDItYW5pbWF0ZS1zdWNjZXNzLWljb24gLnN3YWwyLXN1Y2Nlc3MtY2lyY3VsYXItbGluZS1yaWdodCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogcm90YXRlUGxhY2Vob2xkZXIgNC4yNXMgZWFzZS1pbjtcXG4gICAgICAgICAgYW5pbWF0aW9uOiByb3RhdGVQbGFjZWhvbGRlciA0LjI1cyBlYXNlLWluOyB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGFuaW1hdGUtZXJyb3ItaWNvbiB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVYKDEwMGRlZyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKDEwMGRlZyk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWCgwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMGRlZyk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZS1lcnJvci1pY29uIHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVgoMTAwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMTAwZGVnKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVYKDBkZWcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKTtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLnN3YWwyLWFuaW1hdGUtZXJyb3ItaWNvbiB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogYW5pbWF0ZS1lcnJvci1pY29uIC41cztcXG4gICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRlLWVycm9yLWljb24gLjVzOyB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGFuaW1hdGUteC1tYXJrIHtcXG4gIDAlIHtcXG4gICAgbWFyZ2luLXRvcDogMjZweDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNCk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjQpO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICA1MCUge1xcbiAgICBtYXJnaW4tdG9wOiAyNnB4O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC40KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNCk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDgwJSB7XFxuICAgIG1hcmdpbi10b3A6IC02cHg7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjE1KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMTUpOyB9XFxuICAxMDAlIHtcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZS14LW1hcmsge1xcbiAgMCUge1xcbiAgICBtYXJnaW4tdG9wOiAyNnB4O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC40KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNCk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG1hcmdpbi10b3A6IDI2cHg7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjQpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC40KTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgODAlIHtcXG4gICAgbWFyZ2luLXRvcDogLTZweDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMTUpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xNSk7IH1cXG4gIDEwMCUge1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuLnN3YWwyLWFuaW1hdGUteC1tYXJrIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBhbmltYXRlLXgtbWFyayAuNXM7XFxuICAgICAgICAgIGFuaW1hdGlvbjogYW5pbWF0ZS14LW1hcmsgLjVzOyB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHJvdGF0ZS1sb2FkaW5nIHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZS1sb2FkaW5nIHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1cXG5cIjtcblxudmFyIGRlZmF1bHRQYXJhbXMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgdGl0bGVUZXh0OiAnJyxcbiAgdGV4dDogJycsXG4gIGh0bWw6ICcnLFxuICBmb290ZXI6ICcnLFxuICB0eXBlOiBudWxsLFxuICB0b2FzdDogZmFsc2UsXG4gIGN1c3RvbUNsYXNzOiAnJyxcbiAgdGFyZ2V0OiAnYm9keScsXG4gIGJhY2tkcm9wOiB0cnVlLFxuICBhbmltYXRpb246IHRydWUsXG4gIGFsbG93T3V0c2lkZUNsaWNrOiB0cnVlLFxuICBhbGxvd0VzY2FwZUtleTogdHJ1ZSxcbiAgYWxsb3dFbnRlcktleTogdHJ1ZSxcbiAgc2hvd0NvbmZpcm1CdXR0b246IHRydWUsXG4gIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxuICBwcmVDb25maXJtOiBudWxsLFxuICBjb25maXJtQnV0dG9uVGV4dDogJ09LJyxcbiAgY29uZmlybUJ1dHRvbkFyaWFMYWJlbDogJycsXG4gIGNvbmZpcm1CdXR0b25Db2xvcjogbnVsbCxcbiAgY29uZmlybUJ1dHRvbkNsYXNzOiBudWxsLFxuICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJyxcbiAgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiAnJyxcbiAgY2FuY2VsQnV0dG9uQ29sb3I6IG51bGwsXG4gIGNhbmNlbEJ1dHRvbkNsYXNzOiBudWxsLFxuICBidXR0b25zU3R5bGluZzogdHJ1ZSxcbiAgcmV2ZXJzZUJ1dHRvbnM6IGZhbHNlLFxuICBmb2N1c0NvbmZpcm06IHRydWUsXG4gIGZvY3VzQ2FuY2VsOiBmYWxzZSxcbiAgc2hvd0Nsb3NlQnV0dG9uOiBmYWxzZSxcbiAgY2xvc2VCdXR0b25BcmlhTGFiZWw6ICdDbG9zZSB0aGlzIGRpYWxvZycsXG4gIHNob3dMb2FkZXJPbkNvbmZpcm06IGZhbHNlLFxuICBpbWFnZVVybDogbnVsbCxcbiAgaW1hZ2VXaWR0aDogbnVsbCxcbiAgaW1hZ2VIZWlnaHQ6IG51bGwsXG4gIGltYWdlQWx0OiAnJyxcbiAgaW1hZ2VDbGFzczogbnVsbCxcbiAgdGltZXI6IG51bGwsXG4gIHdpZHRoOiBudWxsLFxuICBwYWRkaW5nOiBudWxsLFxuICBiYWNrZ3JvdW5kOiBudWxsLFxuICBpbnB1dDogbnVsbCxcbiAgaW5wdXRQbGFjZWhvbGRlcjogJycsXG4gIGlucHV0VmFsdWU6ICcnLFxuICBpbnB1dE9wdGlvbnM6IHt9LFxuICBpbnB1dEF1dG9UcmltOiB0cnVlLFxuICBpbnB1dENsYXNzOiBudWxsLFxuICBpbnB1dEF0dHJpYnV0ZXM6IHt9LFxuICBpbnB1dFZhbGlkYXRvcjogbnVsbCxcbiAgZ3JvdzogZmFsc2UsXG4gIHBvc2l0aW9uOiAnY2VudGVyJyxcbiAgcHJvZ3Jlc3NTdGVwczogW10sXG4gIGN1cnJlbnRQcm9ncmVzc1N0ZXA6IG51bGwsXG4gIHByb2dyZXNzU3RlcHNEaXN0YW5jZTogbnVsbCxcbiAgb25CZWZvcmVPcGVuOiBudWxsLFxuICBvbk9wZW46IG51bGwsXG4gIG9uQ2xvc2U6IG51bGwsXG4gIHVzZVJlamVjdGlvbnM6IGZhbHNlLFxuICBleHBlY3RSZWplY3Rpb25zOiBmYWxzZVxufTtcblxudmFyIGRlcHJlY2F0ZWRQYXJhbXMgPSBbJ3VzZVJlamVjdGlvbnMnLCAnZXhwZWN0UmVqZWN0aW9ucyddO1xuXG52YXIgc3dhbFByZWZpeCA9ICdzd2FsMi0nO1xuXG52YXIgcHJlZml4ID0gZnVuY3Rpb24gcHJlZml4KGl0ZW1zKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBpdGVtcykge1xuICAgIHJlc3VsdFtpdGVtc1tpXV0gPSBzd2FsUHJlZml4ICsgaXRlbXNbaV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciBzd2FsQ2xhc3NlcyA9IHByZWZpeChbJ2NvbnRhaW5lcicsICdzaG93bicsICdpb3NmaXgnLCAncG9wdXAnLCAnbW9kYWwnLCAnbm8tYmFja2Ryb3AnLCAndG9hc3QnLCAndG9hc3Qtc2hvd24nLCAnZmFkZScsICdzaG93JywgJ2hpZGUnLCAnbm9hbmltYXRpb24nLCAnY2xvc2UnLCAndGl0bGUnLCAnaGVhZGVyJywgJ2NvbnRlbnQnLCAnYWN0aW9ucycsICdjb25maXJtJywgJ2NhbmNlbCcsICdmb290ZXInLCAnaWNvbicsICdpbWFnZScsICdpbnB1dCcsICdoYXMtaW5wdXQnLCAnZmlsZScsICdyYW5nZScsICdzZWxlY3QnLCAncmFkaW8nLCAnY2hlY2tib3gnLCAndGV4dGFyZWEnLCAnaW5wdXRlcnJvcicsICd2YWxpZGF0aW9uZXJyb3InLCAncHJvZ3Jlc3NzdGVwcycsICdhY3RpdmVwcm9ncmVzc3N0ZXAnLCAncHJvZ3Jlc3NjaXJjbGUnLCAncHJvZ3Jlc3NsaW5lJywgJ2xvYWRpbmcnLCAnc3R5bGVkJywgJ3RvcCcsICd0b3Atc3RhcnQnLCAndG9wLWVuZCcsICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLCAnY2VudGVyJywgJ2NlbnRlci1zdGFydCcsICdjZW50ZXItZW5kJywgJ2NlbnRlci1sZWZ0JywgJ2NlbnRlci1yaWdodCcsICdib3R0b20nLCAnYm90dG9tLXN0YXJ0JywgJ2JvdHRvbS1lbmQnLCAnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ2dyb3ctcm93JywgJ2dyb3ctY29sdW1uJywgJ2dyb3ctZnVsbHNjcmVlbiddKTtcblxudmFyIGljb25UeXBlcyA9IHByZWZpeChbJ3N1Y2Nlc3MnLCAnd2FybmluZycsICdpbmZvJywgJ3F1ZXN0aW9uJywgJ2Vycm9yJ10pO1xuXG52YXIgY29uc29sZVByZWZpeCA9ICdTd2VldEFsZXJ0MjonO1xuXG4vKipcbiAqIEZpbHRlciB0aGUgdW5pcXVlIHZhbHVlcyBpbnRvIGEgbmV3IGFycmF5XG4gKiBAcGFyYW0gYXJyXG4gKi9cbnZhciB1bmlxdWVBcnJheSA9IGZ1bmN0aW9uIHVuaXF1ZUFycmF5KGFycikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBlbGVtID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIGlmIChyZXN1bHQuaW5kZXhPZihlbGVtKSA9PT0gLTEpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZWxlbSk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgb2JqZWN0IGludG8gaXRlcmFibGUgTWFwXG4gKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzY2NDQ1MzIvMTMzMTQyNVxuICogQHBhcmFtIG9ialxuICovXG52YXIgb2JqZWN0VG9NYXAgPSBmdW5jdGlvbiBvYmplY3RUb01hcChvYmopIHtcbiAgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBtYXAuc2V0KGtleSwgb2JqW2tleV0pO1xuICB9KTtcbiAgcmV0dXJuIG1hcDtcbn07XG5cbi8qKlxuICogU3RhbmRhcmRpc2UgY29uc29sZSB3YXJuaW5nc1xuICogQHBhcmFtIG1lc3NhZ2VcbiAqL1xudmFyIHdhcm4gPSBmdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgY29uc29sZS53YXJuKGNvbnNvbGVQcmVmaXggKyAnICcgKyBtZXNzYWdlKTtcbn07XG5cbi8qKlxuICogU3RhbmRhcmRpc2UgY29uc29sZSBlcnJvcnNcbiAqIEBwYXJhbSBtZXNzYWdlXG4gKi9cbnZhciBlcnJvciA9IGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHtcbiAgY29uc29sZS5lcnJvcihjb25zb2xlUHJlZml4ICsgJyAnICsgbWVzc2FnZSk7XG59O1xuXG4vKipcbiAqIFByaXZhdGUgZ2xvYmFsIHN0YXRlIGZvciBgd2Fybk9uY2VgXG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgcHJldmlvdXNXYXJuT25jZU1lc3NhZ2VzID0gW107XG5cbi8qKlxuICogU2hvdyBhIGNvbnNvbGUgd2FybmluZywgYnV0IG9ubHkgaWYgaXQgaGFzbid0IGFscmVhZHkgYmVlbiBzaG93blxuICogQHBhcmFtIG1lc3NhZ2VcbiAqL1xudmFyIHdhcm5PbmNlID0gZnVuY3Rpb24gd2Fybk9uY2UobWVzc2FnZSkge1xuICBpZiAoIShwcmV2aW91c1dhcm5PbmNlTWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKSAhPT0gLTEpKSB7XG4gICAgcHJldmlvdXNXYXJuT25jZU1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgd2FybihtZXNzYWdlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJZiBgYXJnYCBpcyBhIGZ1bmN0aW9uLCBjYWxsIGl0ICh3aXRoIG5vIGFyZ3VtZW50cyBvciBjb250ZXh0KSBhbmQgcmV0dXJuIHRoZSByZXN1bHQuXG4gKiBPdGhlcndpc2UsIGp1c3QgcGFzcyB0aGUgdmFsdWUgdGhyb3VnaFxuICogQHBhcmFtIGFyZ1xuICovXG52YXIgY2FsbElmRnVuY3Rpb24gPSBmdW5jdGlvbiBjYWxsSWZGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicgPyBhcmcoKSA6IGFyZztcbn07XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTtcblxudmFyIHBvcHVwUGFyYW1zID0gX2V4dGVuZHMoe30sIGRlZmF1bHRQYXJhbXMpO1xudmFyIHF1ZXVlID0gW107XG5cbnZhciBwcmV2aW91c1dpbmRvd0tleURvd24gPSB2b2lkIDA7XG52YXIgd2luZG93T25rZXlkb3duT3ZlcnJpZGRlbiA9IHZvaWQgMDtcblxuLyoqXG4gKiBTaG93IHJlbGV2YW50IHdhcm5pbmdzIGZvciBnaXZlbiBwYXJhbXNcbiAqXG4gKiBAcGFyYW0gcGFyYW1zXG4gKi9cbnZhciBzaG93V2FybmluZ3NGb3JQYXJhbXMgPSBmdW5jdGlvbiBzaG93V2FybmluZ3NGb3JQYXJhbXMocGFyYW1zKSB7XG4gIGZvciAodmFyIHBhcmFtIGluIHBhcmFtcykge1xuICAgIGlmICghc3dlZXRBbGVydC5pc1ZhbGlkUGFyYW1ldGVyKHBhcmFtKSkge1xuICAgICAgd2FybignVW5rbm93biBwYXJhbWV0ZXIgXCInICsgcGFyYW0gKyAnXCInKTtcbiAgICB9XG4gICAgaWYgKHN3ZWV0QWxlcnQuaXNEZXByZWNhdGVkUGFyYW1ldGVyKHBhcmFtKSkge1xuICAgICAgd2Fybk9uY2UoJ1RoZSBwYXJhbWV0ZXIgXCInICsgcGFyYW0gKyAnXCIgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuJyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFNldCB0eXBlLCB0ZXh0IGFuZCBhY3Rpb25zIG9uIHBvcHVwXG4gKlxuICogQHBhcmFtIHBhcmFtc1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbnZhciBzZXRQYXJhbWV0ZXJzID0gZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMpIHtcbiAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBjdXN0b20gdGFyZ2V0IGVsZW1lbnQgaXMgdmFsaWRcbiAgaWYgKCFwYXJhbXMudGFyZ2V0IHx8IHR5cGVvZiBwYXJhbXMudGFyZ2V0ID09PSAnc3RyaW5nJyAmJiAhZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJhbXMudGFyZ2V0KSB8fCB0eXBlb2YgcGFyYW1zLnRhcmdldCAhPT0gJ3N0cmluZycgJiYgIXBhcmFtcy50YXJnZXQuYXBwZW5kQ2hpbGQpIHtcbiAgICB3YXJuKCdUYXJnZXQgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCwgZGVmYXVsdGluZyB0byBcImJvZHlcIicpO1xuICAgIHBhcmFtcy50YXJnZXQgPSAnYm9keSc7XG4gIH1cblxuICB2YXIgcG9wdXAgPSB2b2lkIDA7XG4gIHZhciBvbGRQb3B1cCA9IGdldFBvcHVwKCk7XG4gIHZhciB0YXJnZXRFbGVtZW50ID0gdHlwZW9mIHBhcmFtcy50YXJnZXQgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJhbXMudGFyZ2V0KSA6IHBhcmFtcy50YXJnZXQ7XG4gIC8vIElmIHRoZSBtb2RlbCB0YXJnZXQgaGFzIGNoYW5nZWQsIHJlZnJlc2ggdGhlIHBvcHVwXG4gIGlmIChvbGRQb3B1cCAmJiB0YXJnZXRFbGVtZW50ICYmIG9sZFBvcHVwLnBhcmVudE5vZGUgIT09IHRhcmdldEVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgIHBvcHVwID0gaW5pdChwYXJhbXMpO1xuICB9IGVsc2Uge1xuICAgIHBvcHVwID0gb2xkUG9wdXAgfHwgaW5pdChwYXJhbXMpO1xuICB9XG5cbiAgLy8gU2V0IHBvcHVwIHdpZHRoXG4gIGlmIChwYXJhbXMud2lkdGgpIHtcbiAgICBwb3B1cC5zdHlsZS53aWR0aCA9IHR5cGVvZiBwYXJhbXMud2lkdGggPT09ICdudW1iZXInID8gcGFyYW1zLndpZHRoICsgJ3B4JyA6IHBhcmFtcy53aWR0aDtcbiAgfVxuXG4gIC8vIFNldCBwb3B1cCBwYWRkaW5nXG4gIGlmIChwYXJhbXMucGFkZGluZykge1xuICAgIHBvcHVwLnN0eWxlLnBhZGRpbmcgPSB0eXBlb2YgcGFyYW1zLnBhZGRpbmcgPT09ICdudW1iZXInID8gcGFyYW1zLnBhZGRpbmcgKyAncHgnIDogcGFyYW1zLnBhZGRpbmc7XG4gIH1cblxuICAvLyBTZXQgcG9wdXAgYmFja2dyb3VuZFxuICBpZiAocGFyYW1zLmJhY2tncm91bmQpIHtcbiAgICBwb3B1cC5zdHlsZS5iYWNrZ3JvdW5kID0gcGFyYW1zLmJhY2tncm91bmQ7XG4gIH1cbiAgdmFyIHBvcHVwQmFja2dyb3VuZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocG9wdXApLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtY29sb3InKTtcbiAgdmFyIHN1Y2Nlc3NJY29uUGFydHMgPSBwb3B1cC5xdWVyeVNlbGVjdG9yQWxsKCdbY2xhc3NePXN3YWwyLXN1Y2Nlc3MtY2lyY3VsYXItbGluZV0sIC5zd2FsMi1zdWNjZXNzLWZpeCcpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN1Y2Nlc3NJY29uUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBzdWNjZXNzSWNvblBhcnRzW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBvcHVwQmFja2dyb3VuZENvbG9yO1xuICB9XG5cbiAgdmFyIGNvbnRhaW5lciA9IGdldENvbnRhaW5lcigpO1xuICB2YXIgdGl0bGUgPSBnZXRUaXRsZSgpO1xuICB2YXIgY29udGVudCA9IGdldENvbnRlbnQoKS5xdWVyeVNlbGVjdG9yKCcjJyArIHN3YWxDbGFzc2VzLmNvbnRlbnQpO1xuICB2YXIgYWN0aW9ucyA9IGdldEFjdGlvbnMoKTtcbiAgdmFyIGNvbmZpcm1CdXR0b24gPSBnZXRDb25maXJtQnV0dG9uKCk7XG4gIHZhciBjYW5jZWxCdXR0b24gPSBnZXRDYW5jZWxCdXR0b24oKTtcbiAgdmFyIGNsb3NlQnV0dG9uID0gZ2V0Q2xvc2VCdXR0b24oKTtcbiAgdmFyIGZvb3RlciA9IGdldEZvb3RlcigpO1xuXG4gIC8vIFRpdGxlXG4gIGlmIChwYXJhbXMudGl0bGVUZXh0KSB7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gcGFyYW1zLnRpdGxlVGV4dDtcbiAgfSBlbHNlIGlmIChwYXJhbXMudGl0bGUpIHtcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMudGl0bGUuc3BsaXQoJ1xcbicpLmpvaW4oJzxiciAvPicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBwYXJhbXMuYmFja2Ryb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgZ2V0Q29udGFpbmVyKCkuc3R5bGUuYmFja2dyb3VuZCA9IHBhcmFtcy5iYWNrZHJvcDtcbiAgfSBlbHNlIGlmICghcGFyYW1zLmJhY2tkcm9wKSB7XG4gICAgYWRkQ2xhc3MoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sIHN3YWxDbGFzc2VzWyduby1iYWNrZHJvcCddKTtcbiAgfVxuXG4gIC8vIENvbnRlbnQgYXMgSFRNTFxuICBpZiAocGFyYW1zLmh0bWwpIHtcbiAgICBwYXJzZUh0bWxUb0NvbnRhaW5lcihwYXJhbXMuaHRtbCwgY29udGVudCk7XG5cbiAgICAvLyBDb250ZW50IGFzIHBsYWluIHRleHRcbiAgfSBlbHNlIGlmIChwYXJhbXMudGV4dCkge1xuICAgIGNvbnRlbnQudGV4dENvbnRlbnQgPSBwYXJhbXMudGV4dDtcbiAgICBzaG93KGNvbnRlbnQpO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoY29udGVudCk7XG4gIH1cblxuICAvLyBQb3NpdGlvblxuICBpZiAocGFyYW1zLnBvc2l0aW9uIGluIHN3YWxDbGFzc2VzKSB7XG4gICAgYWRkQ2xhc3MoY29udGFpbmVyLCBzd2FsQ2xhc3Nlc1twYXJhbXMucG9zaXRpb25dKTtcbiAgfSBlbHNlIHtcbiAgICB3YXJuKCdUaGUgXCJwb3NpdGlvblwiIHBhcmFtZXRlciBpcyBub3QgdmFsaWQsIGRlZmF1bHRpbmcgdG8gXCJjZW50ZXJcIicpO1xuICAgIGFkZENsYXNzKGNvbnRhaW5lciwgc3dhbENsYXNzZXMuY2VudGVyKTtcbiAgfVxuXG4gIC8vIEdyb3dcbiAgaWYgKHBhcmFtcy5ncm93ICYmIHR5cGVvZiBwYXJhbXMuZ3JvdyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgZ3Jvd0NsYXNzID0gJ2dyb3ctJyArIHBhcmFtcy5ncm93O1xuICAgIGlmIChncm93Q2xhc3MgaW4gc3dhbENsYXNzZXMpIHtcbiAgICAgIGFkZENsYXNzKGNvbnRhaW5lciwgc3dhbENsYXNzZXNbZ3Jvd0NsYXNzXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQW5pbWF0aW9uXG4gIGlmICh0eXBlb2YgcGFyYW1zLmFuaW1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHBhcmFtcy5hbmltYXRpb24gPSBwYXJhbXMuYW5pbWF0aW9uLmNhbGwoKTtcbiAgfVxuXG4gIC8vIENsb3NlIGJ1dHRvblxuICBpZiAocGFyYW1zLnNob3dDbG9zZUJ1dHRvbikge1xuICAgIGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHBhcmFtcy5jbG9zZUJ1dHRvbkFyaWFMYWJlbCk7XG4gICAgc2hvdyhjbG9zZUJ1dHRvbik7XG4gIH0gZWxzZSB7XG4gICAgaGlkZShjbG9zZUJ1dHRvbik7XG4gIH1cblxuICAvLyBEZWZhdWx0IENsYXNzXG4gIHBvcHVwLmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzLnBvcHVwO1xuICBpZiAocGFyYW1zLnRvYXN0KSB7XG4gICAgYWRkQ2xhc3MoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sIHN3YWxDbGFzc2VzWyd0b2FzdC1zaG93biddKTtcbiAgICBhZGRDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMudG9hc3QpO1xuICB9IGVsc2Uge1xuICAgIGFkZENsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5tb2RhbCk7XG4gIH1cblxuICAvLyBDdXN0b20gQ2xhc3NcbiAgaWYgKHBhcmFtcy5jdXN0b21DbGFzcykge1xuICAgIGFkZENsYXNzKHBvcHVwLCBwYXJhbXMuY3VzdG9tQ2xhc3MpO1xuICB9XG5cbiAgLy8gUHJvZ3Jlc3Mgc3RlcHNcbiAgdmFyIHByb2dyZXNzU3RlcHNDb250YWluZXIgPSBnZXRQcm9ncmVzc1N0ZXBzKCk7XG4gIHZhciBjdXJyZW50UHJvZ3Jlc3NTdGVwID0gcGFyc2VJbnQocGFyYW1zLmN1cnJlbnRQcm9ncmVzc1N0ZXAgPT09IG51bGwgPyBzd2VldEFsZXJ0LmdldFF1ZXVlU3RlcCgpIDogcGFyYW1zLmN1cnJlbnRQcm9ncmVzc1N0ZXAsIDEwKTtcbiAgaWYgKHBhcmFtcy5wcm9ncmVzc1N0ZXBzICYmIHBhcmFtcy5wcm9ncmVzc1N0ZXBzLmxlbmd0aCkge1xuICAgIHNob3cocHJvZ3Jlc3NTdGVwc0NvbnRhaW5lcik7XG4gICAgZW1wdHkocHJvZ3Jlc3NTdGVwc0NvbnRhaW5lcik7XG4gICAgaWYgKGN1cnJlbnRQcm9ncmVzc1N0ZXAgPj0gcGFyYW1zLnByb2dyZXNzU3RlcHMubGVuZ3RoKSB7XG4gICAgICB3YXJuKCdJbnZhbGlkIGN1cnJlbnRQcm9ncmVzc1N0ZXAgcGFyYW1ldGVyLCBpdCBzaG91bGQgYmUgbGVzcyB0aGFuIHByb2dyZXNzU3RlcHMubGVuZ3RoICcgKyAnKGN1cnJlbnRQcm9ncmVzc1N0ZXAgbGlrZSBKUyBhcnJheXMgc3RhcnRzIGZyb20gMCknKTtcbiAgICB9XG4gICAgcGFyYW1zLnByb2dyZXNzU3RlcHMuZm9yRWFjaChmdW5jdGlvbiAoc3RlcCwgaW5kZXgpIHtcbiAgICAgIHZhciBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgYWRkQ2xhc3MoY2lyY2xlLCBzd2FsQ2xhc3Nlcy5wcm9ncmVzc2NpcmNsZSk7XG4gICAgICBjaXJjbGUuaW5uZXJIVE1MID0gc3RlcDtcbiAgICAgIGlmIChpbmRleCA9PT0gY3VycmVudFByb2dyZXNzU3RlcCkge1xuICAgICAgICBhZGRDbGFzcyhjaXJjbGUsIHN3YWxDbGFzc2VzLmFjdGl2ZXByb2dyZXNzc3RlcCk7XG4gICAgICB9XG4gICAgICBwcm9ncmVzc1N0ZXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNpcmNsZSk7XG4gICAgICBpZiAoaW5kZXggIT09IHBhcmFtcy5wcm9ncmVzc1N0ZXBzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBhZGRDbGFzcyhsaW5lLCBzd2FsQ2xhc3Nlcy5wcm9ncmVzc2xpbmUpO1xuICAgICAgICBpZiAocGFyYW1zLnByb2dyZXNzU3RlcHNEaXN0YW5jZSkge1xuICAgICAgICAgIGxpbmUuc3R5bGUud2lkdGggPSBwYXJhbXMucHJvZ3Jlc3NTdGVwc0Rpc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIHByb2dyZXNzU3RlcHNDb250YWluZXIuYXBwZW5kQ2hpbGQobGluZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaGlkZShwcm9ncmVzc1N0ZXBzQ29udGFpbmVyKTtcbiAgfVxuXG4gIC8vIEljb25cbiAgdmFyIGljb25zID0gZ2V0SWNvbnMoKTtcbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGljb25zLmxlbmd0aDsgX2krKykge1xuICAgIGhpZGUoaWNvbnNbX2ldKTtcbiAgfVxuICBpZiAocGFyYW1zLnR5cGUpIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gZmFsc2U7XG4gICAgZm9yICh2YXIgaWNvblR5cGUgaW4gaWNvblR5cGVzKSB7XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09IGljb25UeXBlKSB7XG4gICAgICAgIHZhbGlkVHlwZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXZhbGlkVHlwZSkge1xuICAgICAgZXJyb3IoJ1Vua25vd24gYWxlcnQgdHlwZTogJyArIHBhcmFtcy50eXBlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGljb24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuJyArIHN3YWxDbGFzc2VzLmljb24gKyAnLicgKyBpY29uVHlwZXNbcGFyYW1zLnR5cGVdKTtcbiAgICBzaG93KGljb24pO1xuXG4gICAgLy8gQW5pbWF0ZSBpY29uXG4gICAgaWYgKHBhcmFtcy5hbmltYXRpb24pIHtcbiAgICAgIHN3aXRjaCAocGFyYW1zLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgYWRkQ2xhc3MoaWNvbiwgJ3N3YWwyLWFuaW1hdGUtc3VjY2Vzcy1pY29uJyk7XG4gICAgICAgICAgYWRkQ2xhc3MoaWNvbi5xdWVyeVNlbGVjdG9yKCcuc3dhbDItc3VjY2Vzcy1saW5lLXRpcCcpLCAnc3dhbDItYW5pbWF0ZS1zdWNjZXNzLWxpbmUtdGlwJyk7XG4gICAgICAgICAgYWRkQ2xhc3MoaWNvbi5xdWVyeVNlbGVjdG9yKCcuc3dhbDItc3VjY2Vzcy1saW5lLWxvbmcnKSwgJ3N3YWwyLWFuaW1hdGUtc3VjY2Vzcy1saW5lLWxvbmcnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgIGFkZENsYXNzKGljb24sICdzd2FsMi1hbmltYXRlLWVycm9yLWljb24nKTtcbiAgICAgICAgICBhZGRDbGFzcyhpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zd2FsMi14LW1hcmsnKSwgJ3N3YWwyLWFuaW1hdGUteC1tYXJrJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ3VzdG9tIGltYWdlXG4gIHZhciBpbWFnZSA9IGdldEltYWdlKCk7XG4gIGlmIChwYXJhbXMuaW1hZ2VVcmwpIHtcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHBhcmFtcy5pbWFnZVVybCk7XG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdhbHQnLCBwYXJhbXMuaW1hZ2VBbHQpO1xuICAgIHNob3coaW1hZ2UpO1xuXG4gICAgaWYgKHBhcmFtcy5pbWFnZVdpZHRoKSB7XG4gICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgcGFyYW1zLmltYWdlV2lkdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbWFnZS5yZW1vdmVBdHRyaWJ1dGUoJ3dpZHRoJyk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5pbWFnZUhlaWdodCkge1xuICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBwYXJhbXMuaW1hZ2VIZWlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbWFnZS5yZW1vdmVBdHRyaWJ1dGUoJ2hlaWdodCcpO1xuICAgIH1cblxuICAgIGltYWdlLmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzLmltYWdlO1xuICAgIGlmIChwYXJhbXMuaW1hZ2VDbGFzcykge1xuICAgICAgYWRkQ2xhc3MoaW1hZ2UsIHBhcmFtcy5pbWFnZUNsYXNzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaGlkZShpbWFnZSk7XG4gIH1cblxuICAvLyBDYW5jZWwgYnV0dG9uXG4gIGlmIChwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbikge1xuICAgIGNhbmNlbEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gIH0gZWxzZSB7XG4gICAgaGlkZShjYW5jZWxCdXR0b24pO1xuICB9XG5cbiAgLy8gQ29uZmlybSBidXR0b25cbiAgaWYgKHBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbikge1xuICAgIHJlbW92ZVN0eWxlUHJvcGVydHkoY29uZmlybUJ1dHRvbiwgJ2Rpc3BsYXknKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlKGNvbmZpcm1CdXR0b24pO1xuICB9XG5cbiAgLy8gQWN0aW9ucyAoYnV0dG9ucykgd3JhcHBlclxuICBpZiAoIXBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbiAmJiAhcGFyYW1zLnNob3dDYW5jZWxCdXR0b24pIHtcbiAgICBoaWRlKGFjdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHNob3coYWN0aW9ucyk7XG4gIH1cblxuICAvLyBFZGl0IHRleHQgb24gY29uZmlybSBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAgY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvblRleHQ7XG4gIGNhbmNlbEJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2FuY2VsQnV0dG9uVGV4dDtcblxuICAvLyBBUklBIGxhYmVscyBmb3IgY29uZmlybSBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAgY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBwYXJhbXMuY29uZmlybUJ1dHRvbkFyaWFMYWJlbCk7XG4gIGNhbmNlbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBwYXJhbXMuY2FuY2VsQnV0dG9uQXJpYUxhYmVsKTtcblxuICAvLyBBZGQgYnV0dG9ucyBjdXN0b20gY2xhc3Nlc1xuICBjb25maXJtQnV0dG9uLmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzLmNvbmZpcm07XG4gIGFkZENsYXNzKGNvbmZpcm1CdXR0b24sIHBhcmFtcy5jb25maXJtQnV0dG9uQ2xhc3MpO1xuICBjYW5jZWxCdXR0b24uY2xhc3NOYW1lID0gc3dhbENsYXNzZXMuY2FuY2VsO1xuICBhZGRDbGFzcyhjYW5jZWxCdXR0b24sIHBhcmFtcy5jYW5jZWxCdXR0b25DbGFzcyk7XG5cbiAgLy8gQnV0dG9ucyBzdHlsaW5nXG4gIGlmIChwYXJhbXMuYnV0dG9uc1N0eWxpbmcpIHtcbiAgICBhZGRDbGFzcyhbY29uZmlybUJ1dHRvbiwgY2FuY2VsQnV0dG9uXSwgc3dhbENsYXNzZXMuc3R5bGVkKTtcblxuICAgIC8vIEJ1dHRvbnMgYmFja2dyb3VuZCBjb2xvcnNcbiAgICBpZiAocGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgICAgY29uZmlybUJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLmNhbmNlbEJ1dHRvbkNvbG9yKSB7XG4gICAgICBjYW5jZWxCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFyYW1zLmNhbmNlbEJ1dHRvbkNvbG9yO1xuICAgIH1cblxuICAgIC8vIExvYWRpbmcgc3RhdGVcbiAgICB2YXIgY29uZmlybUJ1dHRvbkJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbmZpcm1CdXR0b24pLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtY29sb3InKTtcbiAgICBjb25maXJtQnV0dG9uLnN0eWxlLmJvcmRlckxlZnRDb2xvciA9IGNvbmZpcm1CdXR0b25CYWNrZ3JvdW5kQ29sb3I7XG4gICAgY29uZmlybUJ1dHRvbi5zdHlsZS5ib3JkZXJSaWdodENvbG9yID0gY29uZmlybUJ1dHRvbkJhY2tncm91bmRDb2xvcjtcbiAgfSBlbHNlIHtcbiAgICByZW1vdmVDbGFzcyhbY29uZmlybUJ1dHRvbiwgY2FuY2VsQnV0dG9uXSwgc3dhbENsYXNzZXMuc3R5bGVkKTtcblxuICAgIGNvbmZpcm1CdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29uZmlybUJ1dHRvbi5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSBjb25maXJtQnV0dG9uLnN0eWxlLmJvcmRlclJpZ2h0Q29sb3IgPSAnJztcbiAgICBjYW5jZWxCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY2FuY2VsQnV0dG9uLnN0eWxlLmJvcmRlckxlZnRDb2xvciA9IGNhbmNlbEJ1dHRvbi5zdHlsZS5ib3JkZXJSaWdodENvbG9yID0gJyc7XG4gIH1cblxuICAvLyBGb290ZXJcbiAgcGFyc2VIdG1sVG9Db250YWluZXIocGFyYW1zLmZvb3RlciwgZm9vdGVyKTtcblxuICAvLyBDU1MgYW5pbWF0aW9uXG4gIGlmIChwYXJhbXMuYW5pbWF0aW9uID09PSB0cnVlKSB7XG4gICAgcmVtb3ZlQ2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLm5vYW5pbWF0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICBhZGRDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMubm9hbmltYXRpb24pO1xuICB9XG5cbiAgLy8gc2hvd0xvYWRlck9uQ29uZmlybSAmJiBwcmVDb25maXJtXG4gIGlmIChwYXJhbXMuc2hvd0xvYWRlck9uQ29uZmlybSAmJiAhcGFyYW1zLnByZUNvbmZpcm0pIHtcbiAgICB3YXJuKCdzaG93TG9hZGVyT25Db25maXJtIGlzIHNldCB0byB0cnVlLCBidXQgcHJlQ29uZmlybSBpcyBub3QgZGVmaW5lZC5cXG4nICsgJ3Nob3dMb2FkZXJPbkNvbmZpcm0gc2hvdWxkIGJlIHVzZWQgdG9nZXRoZXIgd2l0aCBwcmVDb25maXJtLCBzZWUgdXNhZ2UgZXhhbXBsZTpcXG4nICsgJ2h0dHBzOi8vc3dlZXRhbGVydDIuZ2l0aHViLmlvLyNhamF4LXJlcXVlc3QnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBbmltYXRpb25zXG4gKlxuICogQHBhcmFtIGFuaW1hdGlvblxuICogQHBhcmFtIG9uQmVmb3JlT3BlblxuICogQHBhcmFtIG9uQ29tcGxldGVcbiAqL1xudmFyIG9wZW5Qb3B1cCA9IGZ1bmN0aW9uIG9wZW5Qb3B1cChhbmltYXRpb24sIG9uQmVmb3JlT3Blbiwgb25Db21wbGV0ZSkge1xuICB2YXIgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XG4gIHZhciBwb3B1cCA9IGdldFBvcHVwKCk7XG5cbiAgaWYgKG9uQmVmb3JlT3BlbiAhPT0gbnVsbCAmJiB0eXBlb2Ygb25CZWZvcmVPcGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb25CZWZvcmVPcGVuKHBvcHVwKTtcbiAgfVxuXG4gIGlmIChhbmltYXRpb24pIHtcbiAgICBhZGRDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMuc2hvdyk7XG4gICAgYWRkQ2xhc3MoY29udGFpbmVyLCBzd2FsQ2xhc3Nlcy5mYWRlKTtcbiAgICByZW1vdmVDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMuaGlkZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVtb3ZlQ2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLmZhZGUpO1xuICB9XG4gIHNob3cocG9wdXApO1xuXG4gIC8vIHNjcm9sbGluZyBpcyAnaGlkZGVuJyB1bnRpbCBhbmltYXRpb24gaXMgZG9uZSwgYWZ0ZXIgdGhhdCAnYXV0bydcbiAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuICBpZiAoYW5pbWF0aW9uRW5kRXZlbnQgJiYgIWhhc0NsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5ub2FuaW1hdGlvbikpIHtcbiAgICBwb3B1cC5hZGRFdmVudExpc3RlbmVyKGFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiBzd2FsQ2xvc2VFdmVudEZpbmlzaGVkKCkge1xuICAgICAgcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihhbmltYXRpb25FbmRFdmVudCwgc3dhbENsb3NlRXZlbnRGaW5pc2hlZCk7XG4gICAgICBjb250YWluZXIuc3R5bGUub3ZlcmZsb3dZID0gJ2F1dG8nO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1kgPSAnYXV0byc7XG4gIH1cblxuICBhZGRDbGFzcyhbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5LCBjb250YWluZXJdLCBzd2FsQ2xhc3Nlcy5zaG93bik7XG4gIGlmIChpc01vZGFsKCkpIHtcbiAgICBmaXhTY3JvbGxiYXIoKTtcbiAgICBpT1NmaXgoKTtcbiAgfVxuICBzdGF0ZXMucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgaWYgKG9uQ29tcGxldGUgIT09IG51bGwgJiYgdHlwZW9mIG9uQ29tcGxldGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIG9uQ29tcGxldGUocG9wdXApO1xuICAgIH0pO1xuICB9XG59O1xuXG52YXIgZml4U2Nyb2xsYmFyID0gZnVuY3Rpb24gZml4U2Nyb2xsYmFyKCkge1xuICAvLyBmb3IgcXVldWVzLCBkbyBub3QgZG8gdGhpcyBtb3JlIHRoYW4gb25jZVxuICBpZiAoc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgIT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gaWYgdGhlIGJvZHkgaGFzIG92ZXJmbG93XG4gIGlmIChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgIC8vIGFkZCBwYWRkaW5nIHNvIHRoZSBjb250ZW50IGRvZXNuJ3Qgc2hpZnQgYWZ0ZXIgcmVtb3ZhbCBvZiBzY3JvbGxiYXJcbiAgICBzdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZyA9IGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0O1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gbWVhc3VyZVNjcm9sbGJhcigpICsgJ3B4JztcbiAgfVxufTtcblxudmFyIHVuZG9TY3JvbGxiYXIgPSBmdW5jdGlvbiB1bmRvU2Nyb2xsYmFyKCkge1xuICBpZiAoc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgIT09IG51bGwpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IHN0YXRlcy5wcmV2aW91c0JvZHlQYWRkaW5nO1xuICAgIHN0YXRlcy5wcmV2aW91c0JvZHlQYWRkaW5nID0gbnVsbDtcbiAgfVxufTtcblxuLy8gRml4IGlPUyBzY3JvbGxpbmcgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMzk2MjYzMDIvMTMzMTQyNVxudmFyIGlPU2ZpeCA9IGZ1bmN0aW9uIGlPU2ZpeCgpIHtcbiAgdmFyIGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmICF3aW5kb3cuTVNTdHJlYW07XG4gIGlmIChpT1MgJiYgIWhhc0NsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzLmlvc2ZpeCkpIHtcbiAgICB2YXIgb2Zmc2V0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSBvZmZzZXQgKiAtMSArICdweCc7XG4gICAgYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXMuaW9zZml4KTtcbiAgfVxufTtcblxudmFyIHVuZG9JT1NmaXggPSBmdW5jdGlvbiB1bmRvSU9TZml4KCkge1xuICBpZiAoaGFzQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXMuaW9zZml4KSkge1xuICAgIHZhciBvZmZzZXQgPSBwYXJzZUludChkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCwgMTApO1xuICAgIHJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzLmlvc2ZpeCk7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSAnJztcbiAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IG9mZnNldCAqIC0xO1xuICB9XG59O1xuXG4vLyBTd2VldEFsZXJ0IGVudHJ5IHBvaW50XG52YXIgc3dlZXRBbGVydCA9IGZ1bmN0aW9uIHN3ZWV0QWxlcnQoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIC8vIFByZXZlbnQgcnVuIGluIE5vZGUgZW52XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENoZWNrIGZvciB0aGUgZXhpc3RlbmNlIG9mIFByb21pc2VcbiAgaWYgKHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJykge1xuICAgIGVycm9yKCdUaGlzIHBhY2thZ2UgcmVxdWlyZXMgYSBQcm9taXNlIGxpYnJhcnksIHBsZWFzZSBpbmNsdWRlIGEgc2hpbSB0byBlbmFibGUgaXQgaW4gdGhpcyBicm93c2VyIChTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi93aWtpL01pZ3JhdGlvbi1mcm9tLVN3ZWV0QWxlcnQtdG8tU3dlZXRBbGVydDIjMS1pZS1zdXBwb3J0KScpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAndW5kZWZpbmVkJykge1xuICAgIGVycm9yKCdTd2VldEFsZXJ0MiBleHBlY3RzIGF0IGxlYXN0IDEgYXR0cmlidXRlIScpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwYXJhbXMgPSBfZXh0ZW5kcyh7fSwgcG9wdXBQYXJhbXMpO1xuXG4gIHN3aXRjaCAoX3R5cGVvZihhcmdzWzBdKSkge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBwYXJhbXMudGl0bGUgPSBhcmdzWzBdO1xuICAgICAgcGFyYW1zLmh0bWwgPSBhcmdzWzFdO1xuICAgICAgcGFyYW1zLnR5cGUgPSBhcmdzWzJdO1xuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBzaG93V2FybmluZ3NGb3JQYXJhbXMoYXJnc1swXSk7XG4gICAgICBfZXh0ZW5kcyhwYXJhbXMsIGFyZ3NbMF0pO1xuICAgICAgcGFyYW1zLmV4dHJhUGFyYW1zID0gYXJnc1swXS5leHRyYVBhcmFtcztcblxuICAgICAgaWYgKHBhcmFtcy5pbnB1dCA9PT0gJ2VtYWlsJyAmJiBwYXJhbXMuaW5wdXRWYWxpZGF0b3IgPT09IG51bGwpIHtcbiAgICAgICAgdmFyIGlucHV0VmFsaWRhdG9yID0gZnVuY3Rpb24gaW5wdXRWYWxpZGF0b3IoZW1haWwpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIGVtYWlsUmVnZXggPSAvXlthLXpBLVowLTkuK18tXStAW2EtekEtWjAtOS4tXStcXC5bYS16QS1aMC05LV17MiwyNH0kLztcbiAgICAgICAgICAgIGlmIChlbWFpbFJlZ2V4LnRlc3QoZW1haWwpKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlamVjdCgnSW52YWxpZCBlbWFpbCBhZGRyZXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHBhcmFtcy5pbnB1dFZhbGlkYXRvciA9IHBhcmFtcy5leHBlY3RSZWplY3Rpb25zID8gaW5wdXRWYWxpZGF0b3IgOiBzd2VldEFsZXJ0LmFkYXB0SW5wdXRWYWxpZGF0b3IoaW5wdXRWYWxpZGF0b3IpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmlucHV0ID09PSAndXJsJyAmJiBwYXJhbXMuaW5wdXRWYWxpZGF0b3IgPT09IG51bGwpIHtcbiAgICAgICAgdmFyIF9pbnB1dFZhbGlkYXRvciA9IGZ1bmN0aW9uIF9pbnB1dFZhbGlkYXRvcih1cmwpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgLy8gdGFrZW4gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzgwOTQzNS8xMzMxNDI1XG4gICAgICAgICAgICB2YXIgdXJsUmVnZXggPSAvXmh0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fK34jPV17MiwyNTZ9XFwuW2Etel17Miw2fVxcYihbLWEtekEtWjAtOUA6JV8rLn4jPyYvLz1dKikkLztcbiAgICAgICAgICAgIGlmICh1cmxSZWdleC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KCdJbnZhbGlkIFVSTCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBwYXJhbXMuaW5wdXRWYWxpZGF0b3IgPSBwYXJhbXMuZXhwZWN0UmVqZWN0aW9ucyA/IF9pbnB1dFZhbGlkYXRvciA6IHN3ZWV0QWxlcnQuYWRhcHRJbnB1dFZhbGlkYXRvcihfaW5wdXRWYWxpZGF0b3IpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgZXJyb3IoJ1VuZXhwZWN0ZWQgdHlwZSBvZiBhcmd1bWVudCEgRXhwZWN0ZWQgXCJzdHJpbmdcIiBvciBcIm9iamVjdFwiLCBnb3QgJyArIF90eXBlb2YoYXJnc1swXSkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xuXG4gIHZhciBjb250YWluZXIgPSBnZXRDb250YWluZXIoKTtcbiAgdmFyIHBvcHVwID0gZ2V0UG9wdXAoKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIC8vIGZ1bmN0aW9ucyB0byBoYW5kbGUgYWxsIHJlc29sdmluZy9yZWplY3Rpbmcvc2V0dGxpbmdcbiAgICB2YXIgc3VjY2VlZFdpdGggPSBmdW5jdGlvbiBzdWNjZWVkV2l0aCh2YWx1ZSkge1xuICAgICAgc3dlZXRBbGVydC5jbG9zZVBvcHVwKHBhcmFtcy5vbkNsb3NlKTtcbiAgICAgIGlmIChwYXJhbXMudXNlUmVqZWN0aW9ucykge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoeyB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZGlzbWlzc1dpdGggPSBmdW5jdGlvbiBkaXNtaXNzV2l0aChkaXNtaXNzKSB7XG4gICAgICBzd2VldEFsZXJ0LmNsb3NlUG9wdXAocGFyYW1zLm9uQ2xvc2UpO1xuICAgICAgaWYgKHBhcmFtcy51c2VSZWplY3Rpb25zKSB7XG4gICAgICAgIHJlamVjdChkaXNtaXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoeyBkaXNtaXNzOiBkaXNtaXNzIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGVycm9yV2l0aCA9IGZ1bmN0aW9uIGVycm9yV2l0aChlcnJvciQkMSkge1xuICAgICAgc3dlZXRBbGVydC5jbG9zZVBvcHVwKHBhcmFtcy5vbkNsb3NlKTtcbiAgICAgIHJlamVjdChlcnJvciQkMSk7XG4gICAgfTtcblxuICAgIC8vIENsb3NlIG9uIHRpbWVyXG4gICAgaWYgKHBhcmFtcy50aW1lcikge1xuICAgICAgcG9wdXAudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGlzbWlzc1dpdGgoJ3RpbWVyJyk7XG4gICAgICB9LCBwYXJhbXMudGltZXIpO1xuICAgIH1cblxuICAgIC8vIEdldCBpbnB1dCBlbGVtZW50IGJ5IHNwZWNpZmllZCB0eXBlIG9yLCBpZiB0eXBlIGlzbid0IHNwZWNpZmllZCwgYnkgcGFyYW1zLmlucHV0XG4gICAgdmFyIGdldElucHV0ID0gZnVuY3Rpb24gZ2V0SW5wdXQoaW5wdXRUeXBlKSB7XG4gICAgICBpbnB1dFR5cGUgPSBpbnB1dFR5cGUgfHwgcGFyYW1zLmlucHV0O1xuICAgICAgaWYgKCFpbnB1dFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGlucHV0VHlwZSkge1xuICAgICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICAgIHJldHVybiBnZXRDaGlsZEJ5Q2xhc3MoY29udGVudCwgc3dhbENsYXNzZXNbaW5wdXRUeXBlXSk7XG4gICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICByZXR1cm4gcG9wdXAucXVlcnlTZWxlY3RvcignLicgKyBzd2FsQ2xhc3Nlcy5jaGVja2JveCArICcgaW5wdXQnKTtcbiAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICAgIHJldHVybiBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuJyArIHN3YWxDbGFzc2VzLnJhZGlvICsgJyBpbnB1dDpjaGVja2VkJykgfHwgcG9wdXAucXVlcnlTZWxlY3RvcignLicgKyBzd2FsQ2xhc3Nlcy5yYWRpbyArICcgaW5wdXQ6Zmlyc3QtY2hpbGQnKTtcbiAgICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgICAgIHJldHVybiBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuJyArIHN3YWxDbGFzc2VzLnJhbmdlICsgJyBpbnB1dCcpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBnZXRDaGlsZEJ5Q2xhc3MoY29udGVudCwgc3dhbENsYXNzZXMuaW5wdXQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBHZXQgdGhlIHZhbHVlIG9mIHRoZSBwb3B1cCBpbnB1dFxuICAgIHZhciBnZXRJbnB1dFZhbHVlID0gZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZSgpIHtcbiAgICAgIHZhciBpbnB1dCA9IGdldElucHV0KCk7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChwYXJhbXMuaW5wdXQpIHtcbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgIHJldHVybiBpbnB1dC5jaGVja2VkID8gMSA6IDA7XG4gICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICByZXR1cm4gaW5wdXQuY2hlY2tlZCA/IGlucHV0LnZhbHVlIDogbnVsbDtcbiAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgcmV0dXJuIGlucHV0LmZpbGVzLmxlbmd0aCA/IGlucHV0LmZpbGVzWzBdIDogbnVsbDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gcGFyYW1zLmlucHV0QXV0b1RyaW0gPyBpbnB1dC52YWx1ZS50cmltKCkgOiBpbnB1dC52YWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gaW5wdXQgYXV0b2ZvY3VzXG4gICAgaWYgKHBhcmFtcy5pbnB1dCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGdldElucHV0KCk7XG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgIGZvY3VzSW5wdXQoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICB2YXIgY29uZmlybSA9IGZ1bmN0aW9uIGNvbmZpcm0odmFsdWUpIHtcbiAgICAgIGlmIChwYXJhbXMuc2hvd0xvYWRlck9uQ29uZmlybSkge1xuICAgICAgICBzd2VldEFsZXJ0LnNob3dMb2FkaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMucHJlQ29uZmlybSkge1xuICAgICAgICBzd2VldEFsZXJ0LnJlc2V0VmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgIHZhciBwcmVDb25maXJtUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBwYXJhbXMucHJlQ29uZmlybSh2YWx1ZSwgcGFyYW1zLmV4dHJhUGFyYW1zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwYXJhbXMuZXhwZWN0UmVqZWN0aW9ucykge1xuICAgICAgICAgIHByZUNvbmZpcm1Qcm9taXNlLnRoZW4oZnVuY3Rpb24gKHByZUNvbmZpcm1WYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN1Y2NlZWRXaXRoKHByZUNvbmZpcm1WYWx1ZSB8fCB2YWx1ZSk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgICAgc3dlZXRBbGVydC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgICAgICBzd2VldEFsZXJ0LnNob3dWYWxpZGF0aW9uRXJyb3IodmFsaWRhdGlvbkVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmVDb25maXJtUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChwcmVDb25maXJtVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChpc1Zpc2libGUoZ2V0VmFsaWRhdGlvbkVycm9yKCkpIHx8IHByZUNvbmZpcm1WYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc3dlZXRBbGVydC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3VjY2VlZFdpdGgocHJlQ29uZmlybVZhbHVlIHx8IHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IkJDEpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcldpdGgoZXJyb3IkJDEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWNjZWVkV2l0aCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1vdXNlIGludGVyYWN0aW9uc1xuICAgIHZhciBvbkJ1dHRvbkV2ZW50ID0gZnVuY3Rpb24gb25CdXR0b25FdmVudChldmVudCkge1xuICAgICAgdmFyIGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgdmFyIGNvbmZpcm1CdXR0b24gPSBnZXRDb25maXJtQnV0dG9uKCk7XG4gICAgICB2YXIgY2FuY2VsQnV0dG9uID0gZ2V0Q2FuY2VsQnV0dG9uKCk7XG4gICAgICB2YXIgdGFyZ2V0ZWRDb25maXJtID0gY29uZmlybUJ1dHRvbiAmJiAoY29uZmlybUJ1dHRvbiA9PT0gdGFyZ2V0IHx8IGNvbmZpcm1CdXR0b24uY29udGFpbnModGFyZ2V0KSk7XG4gICAgICB2YXIgdGFyZ2V0ZWRDYW5jZWwgPSBjYW5jZWxCdXR0b24gJiYgKGNhbmNlbEJ1dHRvbiA9PT0gdGFyZ2V0IHx8IGNhbmNlbEJ1dHRvbi5jb250YWlucyh0YXJnZXQpKTtcblxuICAgICAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgIC8vIENsaWNrZWQgJ2NvbmZpcm0nXG4gICAgICAgICAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBzd2VldEFsZXJ0LmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICBzd2VldEFsZXJ0LmRpc2FibGVCdXR0b25zKCk7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmlucHV0KSB7XG4gICAgICAgICAgICAgIHZhciBpbnB1dFZhbHVlID0gZ2V0SW5wdXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICAgIGlmIChwYXJhbXMuaW5wdXRWYWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICBzd2VldEFsZXJ0LmRpc2FibGVJbnB1dCgpO1xuICAgICAgICAgICAgICAgIHZhciB2YWxpZGF0aW9uUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5pbnB1dFZhbGlkYXRvcihpbnB1dFZhbHVlLCBwYXJhbXMuZXh0cmFQYXJhbXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZXhwZWN0UmVqZWN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3ZWV0QWxlcnQuZW5hYmxlQnV0dG9ucygpO1xuICAgICAgICAgICAgICAgICAgICBzd2VldEFsZXJ0LmVuYWJsZUlucHV0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm0oaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAodmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3ZWV0QWxlcnQuZW5hYmxlQnV0dG9ucygpO1xuICAgICAgICAgICAgICAgICAgICBzd2VldEFsZXJ0LmVuYWJsZUlucHV0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzd2VldEFsZXJ0LnNob3dWYWxpZGF0aW9uRXJyb3IodmFsaWRhdGlvbkVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25Qcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBzd2VldEFsZXJ0LmVuYWJsZUJ1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgc3dlZXRBbGVydC5lbmFibGVJbnB1dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3dlZXRBbGVydC5zaG93VmFsaWRhdGlvbkVycm9yKHZhbGlkYXRpb25FcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uZmlybShpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yJCQxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcldpdGgoZXJyb3IkJDEpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZpcm0oaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbmZpcm0odHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENsaWNrZWQgJ2NhbmNlbCdcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldGVkQ2FuY2VsICYmIHN3ZWV0QWxlcnQuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHN3ZWV0QWxlcnQuZGlzYWJsZUJ1dHRvbnMoKTtcbiAgICAgICAgICAgIGRpc21pc3NXaXRoKHN3ZWV0QWxlcnQuRGlzbWlzc1JlYXNvbi5jYW5jZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJ1dHRvbnMgPSBwb3B1cC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1dHRvbnNbaV0ub25jbGljayA9IG9uQnV0dG9uRXZlbnQ7XG4gICAgICBidXR0b25zW2ldLm9ubW91c2VvdmVyID0gb25CdXR0b25FdmVudDtcbiAgICAgIGJ1dHRvbnNbaV0ub25tb3VzZW91dCA9IG9uQnV0dG9uRXZlbnQ7XG4gICAgICBidXR0b25zW2ldLm9ubW91c2Vkb3duID0gb25CdXR0b25FdmVudDtcbiAgICB9XG5cbiAgICAvLyBDbG9zaW5nIHBvcHVwIGJ5IGNsb3NlIGJ1dHRvblxuICAgIGdldENsb3NlQnV0dG9uKCkub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRpc21pc3NXaXRoKHN3ZWV0QWxlcnQuRGlzbWlzc1JlYXNvbi5jbG9zZSk7XG4gICAgfTtcblxuICAgIGlmIChwYXJhbXMudG9hc3QpIHtcbiAgICAgIC8vIENsb3NpbmcgcG9wdXAgYnkgYmFja2Ryb3AgY2xpY2tcbiAgICAgIHBvcHVwLm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgIT09IHBvcHVwIHx8IHBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbiB8fCBwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLmFsbG93T3V0c2lkZUNsaWNrKSB7XG4gICAgICAgICAgc3dlZXRBbGVydC5jbG9zZVBvcHVwKHBhcmFtcy5vbkNsb3NlKTtcbiAgICAgICAgICBkaXNtaXNzV2l0aChzd2VldEFsZXJ0LkRpc21pc3NSZWFzb24uYmFja2Ryb3ApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaWdub3JlT3V0c2lkZUNsaWNrID0gZmFsc2U7XG5cbiAgICAgIC8vIElnbm9yZSBjbGljayBldmVudHMgdGhhdCBoYWQgbW91c2Vkb3duIG9uIHRoZSBwb3B1cCBidXQgbW91c2V1cCBvbiB0aGUgY29udGFpbmVyXG4gICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gd2hlbiB0aGUgdXNlciBkcmFncyBhIHNsaWRlclxuICAgICAgcG9wdXAub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbm1vdXNldXAgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGNvbnRhaW5lci5vbm1vdXNldXAgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgLy8gV2Ugb25seSBjaGVjayBpZiB0aGUgbW91c2V1cCB0YXJnZXQgaXMgdGhlIGNvbnRhaW5lciBiZWNhdXNlIHVzdWFsbHkgaXQgZG9lc24ndFxuICAgICAgICAgIC8vIGhhdmUgYW55IG90aGVyIGRpcmVjdCBjaGlsZHJlbiBhc2lkZSBvZiB0aGUgcG9wdXBcbiAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGNvbnRhaW5lcikge1xuICAgICAgICAgICAgaWdub3JlT3V0c2lkZUNsaWNrID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICAvLyBJZ25vcmUgY2xpY2sgZXZlbnRzIHRoYXQgaGFkIG1vdXNlZG93biBvbiB0aGUgY29udGFpbmVyIGJ1dCBtb3VzZXVwIG9uIHRoZSBwb3B1cFxuICAgICAgY29udGFpbmVyLm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwb3B1cC5vbm1vdXNldXAgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHBvcHVwLm9ubW91c2V1cCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgdGhlIG1vdXNldXAgdGFyZ2V0IGlzIGEgY2hpbGQgb2YgdGhlIHBvcHVwXG4gICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cCB8fCBwb3B1cC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgICAgIGlnbm9yZU91dHNpZGVDbGljayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoaWdub3JlT3V0c2lkZUNsaWNrKSB7XG4gICAgICAgICAgaWdub3JlT3V0c2lkZUNsaWNrID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gY29udGFpbmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsSWZGdW5jdGlvbihwYXJhbXMuYWxsb3dPdXRzaWRlQ2xpY2spKSB7XG4gICAgICAgICAgZGlzbWlzc1dpdGgoc3dlZXRBbGVydC5EaXNtaXNzUmVhc29uLmJhY2tkcm9wKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgY29udGVudCA9IGdldENvbnRlbnQoKTtcbiAgICB2YXIgYWN0aW9ucyA9IGdldEFjdGlvbnMoKTtcbiAgICB2YXIgY29uZmlybUJ1dHRvbiA9IGdldENvbmZpcm1CdXR0b24oKTtcbiAgICB2YXIgY2FuY2VsQnV0dG9uID0gZ2V0Q2FuY2VsQnV0dG9uKCk7XG5cbiAgICAvLyBSZXZlcnNlIGJ1dHRvbnMgKENvbmZpcm0gb24gdGhlIHJpZ2h0IHNpZGUpXG4gICAgaWYgKHBhcmFtcy5yZXZlcnNlQnV0dG9ucykge1xuICAgICAgY29uZmlybUJ1dHRvbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjYW5jZWxCdXR0b24sIGNvbmZpcm1CdXR0b24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maXJtQnV0dG9uLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbmZpcm1CdXR0b24sIGNhbmNlbEJ1dHRvbik7XG4gICAgfVxuXG4gICAgLy8gRm9jdXMgaGFuZGxpbmdcbiAgICB2YXIgc2V0Rm9jdXMgPSBmdW5jdGlvbiBzZXRGb2N1cyhpbmRleCwgaW5jcmVtZW50KSB7XG4gICAgICB2YXIgZm9jdXNhYmxlRWxlbWVudHMgPSBnZXRGb2N1c2FibGVFbGVtZW50cyhwYXJhbXMuZm9jdXNDYW5jZWwpO1xuICAgICAgLy8gc2VhcmNoIGZvciB2aXNpYmxlIGVsZW1lbnRzIGFuZCBzZWxlY3QgdGhlIG5leHQgcG9zc2libGUgbWF0Y2hcbiAgICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgICAgaW5kZXggPSBpbmRleCArIGluY3JlbWVudDtcblxuICAgICAgICAvLyByb2xsb3ZlciB0byBmaXJzdCBpdGVtXG4gICAgICAgIGlmIChpbmRleCA9PT0gZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAgICAgLy8gZ28gdG8gbGFzdCBpdGVtXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgaW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIGVsZW1lbnQgaXMgdmlzaWJsZVxuICAgICAgICB2YXIgZWwgPSBmb2N1c2FibGVFbGVtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChpc1Zpc2libGUoZWwpKSB7XG4gICAgICAgICAgcmV0dXJuIGVsLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGhhbmRsZUtleURvd24gPSBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblxuICAgICAgdmFyIGFycm93S2V5cyA9IFsnQXJyb3dMZWZ0JywgJ0Fycm93UmlnaHQnLCAnQXJyb3dVcCcsICdBcnJvd0Rvd24nLCAnTGVmdCcsICdSaWdodCcsICdVcCcsICdEb3duJyAvLyBJRTExXG4gICAgICBdO1xuXG4gICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgJiYgIWUuaXNDb21wb3NpbmcpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBnZXRJbnB1dCgpKSB7XG4gICAgICAgICAgaWYgKFsndGV4dGFyZWEnLCAnZmlsZSddLmluZGV4T2YocGFyYW1zLmlucHV0KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gZG8gbm90IHN1Ym1pdFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHN3ZWV0QWxlcnQuY2xpY2tDb25maXJtKCk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVEFCXG4gICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSAnVGFiJykge1xuICAgICAgICB2YXIgdGFyZ2V0RWxlbWVudCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICAgICAgICB2YXIgZm9jdXNhYmxlRWxlbWVudHMgPSBnZXRGb2N1c2FibGVFbGVtZW50cyhwYXJhbXMuZm9jdXNDYW5jZWwpO1xuICAgICAgICB2YXIgYnRuSW5kZXggPSAtMTsgLy8gRmluZCB0aGUgYnV0dG9uIC0gbm90ZSwgdGhpcyBpcyBhIG5vZGVsaXN0LCBub3QgYW4gYXJyYXkuXG4gICAgICAgIGZvciAodmFyIF9pMyA9IDA7IF9pMyA8IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aDsgX2kzKyspIHtcbiAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCA9PT0gZm9jdXNhYmxlRWxlbWVudHNbX2kzXSkge1xuICAgICAgICAgICAgYnRuSW5kZXggPSBfaTM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAvLyBDeWNsZSB0byB0aGUgbmV4dCBidXR0b25cbiAgICAgICAgICBzZXRGb2N1cyhidG5JbmRleCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ3ljbGUgdG8gdGhlIHByZXYgYnV0dG9uXG4gICAgICAgICAgc2V0Rm9jdXMoYnRuSW5kZXgsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gQVJST1dTIC0gc3dpdGNoIGZvY3VzIGJldHdlZW4gYnV0dG9uc1xuICAgICAgfSBlbHNlIGlmIChhcnJvd0tleXMuaW5kZXhPZihlLmtleSkgIT09IC0xKSB7XG4gICAgICAgIC8vIGZvY3VzIENhbmNlbCBidXR0b24gaWYgQ29uZmlybSBidXR0b24gaXMgY3VycmVudGx5IGZvY3VzZWRcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGNvbmZpcm1CdXR0b24gJiYgaXNWaXNpYmxlKGNhbmNlbEJ1dHRvbikpIHtcbiAgICAgICAgICBjYW5jZWxCdXR0b24uZm9jdXMoKTtcbiAgICAgICAgICAvLyBhbmQgdmljZSB2ZXJzYVxuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGNhbmNlbEJ1dHRvbiAmJiBpc1Zpc2libGUoY29uZmlybUJ1dHRvbikpIHtcbiAgICAgICAgICBjb25maXJtQnV0dG9uLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFU0NcbiAgICAgIH0gZWxzZSBpZiAoKGUua2V5ID09PSAnRXNjYXBlJyB8fCBlLmtleSA9PT0gJ0VzYycpICYmIGNhbGxJZkZ1bmN0aW9uKHBhcmFtcy5hbGxvd0VzY2FwZUtleSkgPT09IHRydWUpIHtcbiAgICAgICAgZGlzbWlzc1dpdGgoc3dlZXRBbGVydC5EaXNtaXNzUmVhc29uLmVzYyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChwYXJhbXMudG9hc3QgJiYgd2luZG93T25rZXlkb3duT3ZlcnJpZGRlbikge1xuICAgICAgd2luZG93Lm9ua2V5ZG93biA9IHByZXZpb3VzV2luZG93S2V5RG93bjtcbiAgICAgIHdpbmRvd09ua2V5ZG93bk92ZXJyaWRkZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcmFtcy50b2FzdCAmJiAhd2luZG93T25rZXlkb3duT3ZlcnJpZGRlbikge1xuICAgICAgcHJldmlvdXNXaW5kb3dLZXlEb3duID0gd2luZG93Lm9ua2V5ZG93bjtcbiAgICAgIHdpbmRvd09ua2V5ZG93bk92ZXJyaWRkZW4gPSB0cnVlO1xuICAgICAgd2luZG93Lm9ua2V5ZG93biA9IGhhbmRsZUtleURvd247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBzcGlubmVyIGluc3RlYWQgb2YgQ29uZmlybSBidXR0b24gYW5kIGRpc2FibGUgQ2FuY2VsIGJ1dHRvblxuICAgICAqL1xuICAgIHN3ZWV0QWxlcnQuaGlkZUxvYWRpbmcgPSBzd2VldEFsZXJ0LmRpc2FibGVMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFwYXJhbXMuc2hvd0NvbmZpcm1CdXR0b24pIHtcbiAgICAgICAgaGlkZShjb25maXJtQnV0dG9uKTtcbiAgICAgICAgaWYgKCFwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbikge1xuICAgICAgICAgIGhpZGUoZ2V0QWN0aW9ucygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVtb3ZlQ2xhc3MoW3BvcHVwLCBhY3Rpb25zXSwgc3dhbENsYXNzZXMubG9hZGluZyk7XG4gICAgICBwb3B1cC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYnVzeScpO1xuICAgICAgcG9wdXAucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWxvYWRpbmcnKTtcbiAgICAgIGNvbmZpcm1CdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGNhbmNlbEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBzd2VldEFsZXJ0LmdldFRpdGxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldFRpdGxlKCk7XG4gICAgfTtcbiAgICBzd2VldEFsZXJ0LmdldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZ2V0Q29udGVudCgpO1xuICAgIH07XG4gICAgc3dlZXRBbGVydC5nZXRJbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRJbnB1dCgpO1xuICAgIH07XG4gICAgc3dlZXRBbGVydC5nZXRJbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRJbWFnZSgpO1xuICAgIH07XG4gICAgc3dlZXRBbGVydC5nZXRCdXR0b25zV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRCdXR0b25zV3JhcHBlcigpO1xuICAgIH07XG4gICAgc3dlZXRBbGVydC5nZXRBY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldEFjdGlvbnMoKTtcbiAgICB9O1xuICAgIHN3ZWV0QWxlcnQuZ2V0Q29uZmlybUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRDb25maXJtQnV0dG9uKCk7XG4gICAgfTtcbiAgICBzd2VldEFsZXJ0LmdldENhbmNlbEJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRDYW5jZWxCdXR0b24oKTtcbiAgICB9O1xuICAgIHN3ZWV0QWxlcnQuZ2V0Rm9vdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldEZvb3RlcigpO1xuICAgIH07XG4gICAgc3dlZXRBbGVydC5pc0xvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXNMb2FkaW5nKCk7XG4gICAgfTtcblxuICAgIHN3ZWV0QWxlcnQuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbmZpcm1CdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGNhbmNlbEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBzd2VldEFsZXJ0LmRpc2FibGVCdXR0b25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgY29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBjYW5jZWxCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICBzd2VldEFsZXJ0LmVuYWJsZUNvbmZpcm1CdXR0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25maXJtQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfTtcblxuICAgIHN3ZWV0QWxlcnQuZGlzYWJsZUNvbmZpcm1CdXR0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25maXJtQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgc3dlZXRBbGVydC5lbmFibGVJbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpbnB1dCA9IGdldElucHV0KCk7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnB1dC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIHZhciByYWRpb3NDb250YWluZXIgPSBpbnB1dC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciByYWRpb3MgPSByYWRpb3NDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcbiAgICAgICAgZm9yICh2YXIgX2k0ID0gMDsgX2k0IDwgcmFkaW9zLmxlbmd0aDsgX2k0KyspIHtcbiAgICAgICAgICByYWRpb3NbX2k0XS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzd2VldEFsZXJ0LmRpc2FibGVJbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpbnB1dCA9IGdldElucHV0KCk7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIHZhciByYWRpb3NDb250YWluZXIgPSBpbnB1dC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIHZhciByYWRpb3MgPSByYWRpb3NDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcbiAgICAgICAgZm9yICh2YXIgX2k1ID0gMDsgX2k1IDwgcmFkaW9zLmxlbmd0aDsgX2k1KyspIHtcbiAgICAgICAgICByYWRpb3NbX2k1XS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gU2hvdyBibG9jayB3aXRoIHZhbGlkYXRpb24gZXJyb3JcbiAgICBzd2VldEFsZXJ0LnNob3dWYWxpZGF0aW9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IkJDEpIHtcbiAgICAgIHZhciB2YWxpZGF0aW9uRXJyb3IgPSBnZXRWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICAgIHZhbGlkYXRpb25FcnJvci5pbm5lckhUTUwgPSBlcnJvciQkMTtcbiAgICAgIHZhciBwb3B1cENvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwb3B1cCk7XG4gICAgICB2YWxpZGF0aW9uRXJyb3Iuc3R5bGUubWFyZ2luTGVmdCA9ICctJyArIHBvcHVwQ29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWxlZnQnKTtcbiAgICAgIHZhbGlkYXRpb25FcnJvci5zdHlsZS5tYXJnaW5SaWdodCA9ICctJyArIHBvcHVwQ29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICBzaG93KHZhbGlkYXRpb25FcnJvcik7XG5cbiAgICAgIHZhciBpbnB1dCA9IGdldElucHV0KCk7XG4gICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdhcmlhLWludmFsaWQnLCB0cnVlKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZEJ5Jywgc3dhbENsYXNzZXMudmFsaWRhdGlvbmVycm9yKTtcbiAgICAgICAgZm9jdXNJbnB1dChpbnB1dCk7XG4gICAgICAgIGFkZENsYXNzKGlucHV0LCBzd2FsQ2xhc3Nlcy5pbnB1dGVycm9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gSGlkZSBibG9jayB3aXRoIHZhbGlkYXRpb24gZXJyb3JcbiAgICBzd2VldEFsZXJ0LnJlc2V0VmFsaWRhdGlvbkVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbGlkYXRpb25FcnJvciA9IGdldFZhbGlkYXRpb25FcnJvcigpO1xuICAgICAgaGlkZSh2YWxpZGF0aW9uRXJyb3IpO1xuXG4gICAgICB2YXIgaW5wdXQgPSBnZXRJbnB1dCgpO1xuICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJyk7XG4gICAgICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRCeScpO1xuICAgICAgICByZW1vdmVDbGFzcyhpbnB1dCwgc3dhbENsYXNzZXMuaW5wdXRlcnJvcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHN3ZWV0QWxlcnQuZ2V0UHJvZ3Jlc3NTdGVwcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwYXJhbXMucHJvZ3Jlc3NTdGVwcztcbiAgICB9O1xuXG4gICAgc3dlZXRBbGVydC5zZXRQcm9ncmVzc1N0ZXBzID0gZnVuY3Rpb24gKHByb2dyZXNzU3RlcHMpIHtcbiAgICAgIHBhcmFtcy5wcm9ncmVzc1N0ZXBzID0gcHJvZ3Jlc3NTdGVwcztcbiAgICAgIHNldFBhcmFtZXRlcnMocGFyYW1zKTtcbiAgICB9O1xuXG4gICAgc3dlZXRBbGVydC5zaG93UHJvZ3Jlc3NTdGVwcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNob3coZ2V0UHJvZ3Jlc3NTdGVwcygpKTtcbiAgICB9O1xuXG4gICAgc3dlZXRBbGVydC5oaWRlUHJvZ3Jlc3NTdGVwcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZGUoZ2V0UHJvZ3Jlc3NTdGVwcygpKTtcbiAgICB9O1xuXG4gICAgc3dlZXRBbGVydC5lbmFibGVCdXR0b25zKCk7XG4gICAgc3dlZXRBbGVydC5oaWRlTG9hZGluZygpO1xuICAgIHN3ZWV0QWxlcnQucmVzZXRWYWxpZGF0aW9uRXJyb3IoKTtcblxuICAgIGlmIChwYXJhbXMuaW5wdXQpIHtcbiAgICAgIGFkZENsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzWydoYXMtaW5wdXQnXSk7XG4gICAgfVxuXG4gICAgLy8gaW5wdXRzXG4gICAgdmFyIGlucHV0VHlwZXMgPSBbJ2lucHV0JywgJ2ZpbGUnLCAncmFuZ2UnLCAnc2VsZWN0JywgJ3JhZGlvJywgJ2NoZWNrYm94JywgJ3RleHRhcmVhJ107XG4gICAgdmFyIGlucHV0ID0gdm9pZCAwO1xuICAgIGZvciAodmFyIF9pNiA9IDA7IF9pNiA8IGlucHV0VHlwZXMubGVuZ3RoOyBfaTYrKykge1xuICAgICAgdmFyIGlucHV0Q2xhc3MgPSBzd2FsQ2xhc3Nlc1tpbnB1dFR5cGVzW19pNl1dO1xuICAgICAgdmFyIGlucHV0Q29udGFpbmVyID0gZ2V0Q2hpbGRCeUNsYXNzKGNvbnRlbnQsIGlucHV0Q2xhc3MpO1xuICAgICAgaW5wdXQgPSBnZXRJbnB1dChpbnB1dFR5cGVzW19pNl0pO1xuXG4gICAgICAvLyBzZXQgYXR0cmlidXRlc1xuICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgIGZvciAodmFyIGogaW4gaW5wdXQuYXR0cmlidXRlcykge1xuICAgICAgICAgIGlmIChpbnB1dC5hdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGopKSB7XG4gICAgICAgICAgICB2YXIgYXR0ck5hbWUgPSBpbnB1dC5hdHRyaWJ1dGVzW2pdLm5hbWU7XG4gICAgICAgICAgICBpZiAoYXR0ck5hbWUgIT09ICd0eXBlJyAmJiBhdHRyTmFtZSAhPT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgICBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBhdHRyIGluIHBhcmFtcy5pbnB1dEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoYXR0ciwgcGFyYW1zLmlucHV0QXR0cmlidXRlc1thdHRyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc2V0IGNsYXNzXG4gICAgICBpbnB1dENvbnRhaW5lci5jbGFzc05hbWUgPSBpbnB1dENsYXNzO1xuICAgICAgaWYgKHBhcmFtcy5pbnB1dENsYXNzKSB7XG4gICAgICAgIGFkZENsYXNzKGlucHV0Q29udGFpbmVyLCBwYXJhbXMuaW5wdXRDbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIGhpZGUoaW5wdXRDb250YWluZXIpO1xuICAgIH1cblxuICAgIHZhciBwb3B1bGF0ZUlucHV0T3B0aW9ucyA9IHZvaWQgMDtcbiAgICBzd2l0Y2ggKHBhcmFtcy5pbnB1dCkge1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICBjYXNlICdlbWFpbCc6XG4gICAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAndGVsJzpcbiAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgIGlucHV0ID0gZ2V0Q2hpbGRCeUNsYXNzKGNvbnRlbnQsIHN3YWxDbGFzc2VzLmlucHV0KTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBwYXJhbXMuaW5wdXRWYWx1ZTtcbiAgICAgICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwYXJhbXMuaW5wdXRQbGFjZWhvbGRlcjtcbiAgICAgICAgaW5wdXQudHlwZSA9IHBhcmFtcy5pbnB1dDtcbiAgICAgICAgc2hvdyhpbnB1dCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgIGlucHV0ID0gZ2V0Q2hpbGRCeUNsYXNzKGNvbnRlbnQsIHN3YWxDbGFzc2VzLmZpbGUpO1xuICAgICAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyO1xuICAgICAgICBpbnB1dC50eXBlID0gcGFyYW1zLmlucHV0O1xuICAgICAgICBzaG93KGlucHV0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgIHZhciByYW5nZSA9IGdldENoaWxkQnlDbGFzcyhjb250ZW50LCBzd2FsQ2xhc3Nlcy5yYW5nZSk7XG4gICAgICAgIHZhciByYW5nZUlucHV0ID0gcmFuZ2UucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICAgICAgdmFyIHJhbmdlT3V0cHV0ID0gcmFuZ2UucXVlcnlTZWxlY3Rvcignb3V0cHV0Jyk7XG4gICAgICAgIHJhbmdlSW5wdXQudmFsdWUgPSBwYXJhbXMuaW5wdXRWYWx1ZTtcbiAgICAgICAgcmFuZ2VJbnB1dC50eXBlID0gcGFyYW1zLmlucHV0O1xuICAgICAgICByYW5nZU91dHB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlO1xuICAgICAgICBzaG93KHJhbmdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICB2YXIgc2VsZWN0ID0gZ2V0Q2hpbGRCeUNsYXNzKGNvbnRlbnQsIHN3YWxDbGFzc2VzLnNlbGVjdCk7XG4gICAgICAgIHNlbGVjdC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYgKHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgcGxhY2Vob2xkZXIuaW5uZXJIVE1MID0gcGFyYW1zLmlucHV0UGxhY2Vob2xkZXI7XG4gICAgICAgICAgcGxhY2Vob2xkZXIudmFsdWUgPSAnJztcbiAgICAgICAgICBwbGFjZWhvbGRlci5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgcGxhY2Vob2xkZXIuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChwbGFjZWhvbGRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcG9wdWxhdGVJbnB1dE9wdGlvbnMgPSBmdW5jdGlvbiBwb3B1bGF0ZUlucHV0T3B0aW9ucyhpbnB1dE9wdGlvbnMpIHtcbiAgICAgICAgICBpbnB1dE9wdGlvbnMgPSBvYmplY3RUb01hcChpbnB1dE9wdGlvbnMpO1xuICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gaW5wdXRPcHRpb25zW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgICB2YXIgX3N0ZXAkdmFsdWUgPSBzbGljZWRUb0FycmF5KF9zdGVwLnZhbHVlLCAyKSxcbiAgICAgICAgICAgICAgICAgIG9wdGlvblZhbHVlID0gX3N0ZXAkdmFsdWVbMF0sXG4gICAgICAgICAgICAgICAgICBvcHRpb25MYWJlbCA9IF9zdGVwJHZhbHVlWzFdO1xuXG4gICAgICAgICAgICAgIHZhciBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gb3B0aW9uVmFsdWU7XG4gICAgICAgICAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSBvcHRpb25MYWJlbDtcbiAgICAgICAgICAgICAgaWYgKHBhcmFtcy5pbnB1dFZhbHVlLnRvU3RyaW5nKCkgPT09IG9wdGlvblZhbHVlLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHNob3coc2VsZWN0KTtcbiAgICAgICAgICBzZWxlY3QuZm9jdXMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgIHZhciByYWRpbyA9IGdldENoaWxkQnlDbGFzcyhjb250ZW50LCBzd2FsQ2xhc3Nlcy5yYWRpbyk7XG4gICAgICAgIHJhZGlvLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBwb3B1bGF0ZUlucHV0T3B0aW9ucyA9IGZ1bmN0aW9uIHBvcHVsYXRlSW5wdXRPcHRpb25zKGlucHV0T3B0aW9ucykge1xuICAgICAgICAgIGlucHV0T3B0aW9ucyA9IG9iamVjdFRvTWFwKGlucHV0T3B0aW9ucyk7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gaW5wdXRPcHRpb25zW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgICAgIHZhciBfc3RlcDIkdmFsdWUgPSBzbGljZWRUb0FycmF5KF9zdGVwMi52YWx1ZSwgMiksXG4gICAgICAgICAgICAgICAgICByYWRpb1ZhbHVlID0gX3N0ZXAyJHZhbHVlWzBdLFxuICAgICAgICAgICAgICAgICAgcmFkaW9MYWJlbCA9IF9zdGVwMiR2YWx1ZVsxXTtcblxuICAgICAgICAgICAgICB2YXIgcmFkaW9JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgIHZhciByYWRpb0xhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgIHJhZGlvSW5wdXQudHlwZSA9ICdyYWRpbyc7XG4gICAgICAgICAgICAgIHJhZGlvSW5wdXQubmFtZSA9IHN3YWxDbGFzc2VzLnJhZGlvO1xuICAgICAgICAgICAgICByYWRpb0lucHV0LnZhbHVlID0gcmFkaW9WYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKHBhcmFtcy5pbnB1dFZhbHVlLnRvU3RyaW5nKCkgPT09IHJhZGlvVmFsdWUudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgIHJhZGlvSW5wdXQuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmFkaW9MYWJlbEVsZW1lbnQuaW5uZXJIVE1MID0gcmFkaW9MYWJlbDtcbiAgICAgICAgICAgICAgcmFkaW9MYWJlbEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHJhZGlvSW5wdXQsIHJhZGlvTGFiZWxFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICByYWRpby5hcHBlbmRDaGlsZChyYWRpb0xhYmVsRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHNob3cocmFkaW8pO1xuICAgICAgICAgIHZhciByYWRpb3MgPSByYWRpby5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuICAgICAgICAgIGlmIChyYWRpb3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByYWRpb3NbMF0uZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICB2YXIgY2hlY2tib3ggPSBnZXRDaGlsZEJ5Q2xhc3MoY29udGVudCwgc3dhbENsYXNzZXMuY2hlY2tib3gpO1xuICAgICAgICB2YXIgY2hlY2tib3hJbnB1dCA9IGdldElucHV0KCdjaGVja2JveCcpO1xuICAgICAgICBjaGVja2JveElucHV0LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICBjaGVja2JveElucHV0LnZhbHVlID0gMTtcbiAgICAgICAgY2hlY2tib3hJbnB1dC5pZCA9IHN3YWxDbGFzc2VzLmNoZWNrYm94O1xuICAgICAgICBjaGVja2JveElucHV0LmNoZWNrZWQgPSBCb29sZWFuKHBhcmFtcy5pbnB1dFZhbHVlKTtcbiAgICAgICAgdmFyIGxhYmVsID0gY2hlY2tib3guZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKTtcbiAgICAgICAgaWYgKGxhYmVsLmxlbmd0aCkge1xuICAgICAgICAgIGNoZWNrYm94LnJlbW92ZUNoaWxkKGxhYmVsWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gcGFyYW1zLmlucHV0UGxhY2Vob2xkZXI7XG4gICAgICAgIGNoZWNrYm94LmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgc2hvdyhjaGVja2JveCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICB2YXIgdGV4dGFyZWEgPSBnZXRDaGlsZEJ5Q2xhc3MoY29udGVudCwgc3dhbENsYXNzZXMudGV4dGFyZWEpO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlO1xuICAgICAgICB0ZXh0YXJlYS5wbGFjZWhvbGRlciA9IHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyO1xuICAgICAgICBzaG93KHRleHRhcmVhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG51bGw6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZXJyb3IoJ1VuZXhwZWN0ZWQgdHlwZSBvZiBpbnB1dCEgRXhwZWN0ZWQgXCJ0ZXh0XCIsIFwiZW1haWxcIiwgXCJwYXNzd29yZFwiLCBcIm51bWJlclwiLCBcInRlbFwiLCBcInNlbGVjdFwiLCBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiwgXCJ0ZXh0YXJlYVwiLCBcImZpbGVcIiBvciBcInVybFwiLCBnb3QgXCInICsgcGFyYW1zLmlucHV0ICsgJ1wiJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMuaW5wdXQgPT09ICdzZWxlY3QnIHx8IHBhcmFtcy5pbnB1dCA9PT0gJ3JhZGlvJykge1xuICAgICAgaWYgKHBhcmFtcy5pbnB1dE9wdGlvbnMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHN3ZWV0QWxlcnQuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcGFyYW1zLmlucHV0T3B0aW9ucy50aGVuKGZ1bmN0aW9uIChpbnB1dE9wdGlvbnMpIHtcbiAgICAgICAgICBzd2VldEFsZXJ0LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgcG9wdWxhdGVJbnB1dE9wdGlvbnMoaW5wdXRPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKF90eXBlb2YocGFyYW1zLmlucHV0T3B0aW9ucykgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHBvcHVsYXRlSW5wdXRPcHRpb25zKHBhcmFtcy5pbnB1dE9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IoJ1VuZXhwZWN0ZWQgdHlwZSBvZiBpbnB1dE9wdGlvbnMhIEV4cGVjdGVkIG9iamVjdCwgTWFwIG9yIFByb21pc2UsIGdvdCAnICsgX3R5cGVvZihwYXJhbXMuaW5wdXRPcHRpb25zKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb3BlblBvcHVwKHBhcmFtcy5hbmltYXRpb24sIHBhcmFtcy5vbkJlZm9yZU9wZW4sIHBhcmFtcy5vbk9wZW4pO1xuXG4gICAgaWYgKCFwYXJhbXMudG9hc3QpIHtcbiAgICAgIGlmICghY2FsbElmRnVuY3Rpb24ocGFyYW1zLmFsbG93RW50ZXJLZXkpKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmZvY3VzQ2FuY2VsICYmIGlzVmlzaWJsZShjYW5jZWxCdXR0b24pKSB7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5mb2N1cygpO1xuICAgICAgfSBlbHNlIGlmIChwYXJhbXMuZm9jdXNDb25maXJtICYmIGlzVmlzaWJsZShjb25maXJtQnV0dG9uKSkge1xuICAgICAgICBjb25maXJtQnV0dG9uLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRGb2N1cygtMSwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZml4IHNjcm9sbFxuICAgIGdldENvbnRhaW5lcigpLnNjcm9sbFRvcCA9IDA7XG4gIH0pO1xufTtcblxuLypcbiAqIEdsb2JhbCBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgc3dhbDIgcG9wdXAgaXMgc2hvd25cbiAqL1xuc3dlZXRBbGVydC5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhIWdldFBvcHVwKCk7XG59O1xuXG4vKlxuICogR2xvYmFsIGZ1bmN0aW9uIGZvciBjaGFpbmluZyBzd2VldEFsZXJ0IHBvcHVwc1xuICovXG5zd2VldEFsZXJ0LnF1ZXVlID0gZnVuY3Rpb24gKHN0ZXBzKSB7XG4gIHF1ZXVlID0gc3RlcHM7XG4gIHZhciByZXNldFF1ZXVlID0gZnVuY3Rpb24gcmVzZXRRdWV1ZSgpIHtcbiAgICBxdWV1ZSA9IFtdO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXN3YWwyLXF1ZXVlLXN0ZXAnKTtcbiAgfTtcbiAgdmFyIHF1ZXVlUmVzdWx0ID0gW107XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgKGZ1bmN0aW9uIHN0ZXAoaSwgY2FsbGJhY2spIHtcbiAgICAgIGlmIChpIDwgcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCdkYXRhLXN3YWwyLXF1ZXVlLXN0ZXAnLCBpKTtcblxuICAgICAgICBzd2VldEFsZXJ0KHF1ZXVlW2ldKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdC52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHF1ZXVlUmVzdWx0LnB1c2gocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgIHN0ZXAoaSArIDEsIGNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzZXRRdWV1ZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSh7IGRpc21pc3M6IHJlc3VsdC5kaXNtaXNzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNldFF1ZXVlKCk7XG4gICAgICAgIHJlc29sdmUoeyB2YWx1ZTogcXVldWVSZXN1bHQgfSk7XG4gICAgICB9XG4gICAgfSkoMCk7XG4gIH0pO1xufTtcblxuLypcbiAqIEdsb2JhbCBmdW5jdGlvbiBmb3IgZ2V0dGluZyB0aGUgaW5kZXggb2YgY3VycmVudCBwb3B1cCBpbiBxdWV1ZVxuICovXG5zd2VldEFsZXJ0LmdldFF1ZXVlU3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKCdkYXRhLXN3YWwyLXF1ZXVlLXN0ZXAnKTtcbn07XG5cbi8qXG4gKiBHbG9iYWwgZnVuY3Rpb24gZm9yIGluc2VydGluZyBhIHBvcHVwIHRvIHRoZSBxdWV1ZVxuICovXG5zd2VldEFsZXJ0Lmluc2VydFF1ZXVlU3RlcCA9IGZ1bmN0aW9uIChzdGVwLCBpbmRleCkge1xuICBpZiAoaW5kZXggJiYgaW5kZXggPCBxdWV1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gcXVldWUuc3BsaWNlKGluZGV4LCAwLCBzdGVwKTtcbiAgfVxuICByZXR1cm4gcXVldWUucHVzaChzdGVwKTtcbn07XG5cbi8qXG4gKiBHbG9iYWwgZnVuY3Rpb24gZm9yIGRlbGV0aW5nIGEgcG9wdXAgZnJvbSB0aGUgcXVldWVcbiAqL1xuc3dlZXRBbGVydC5kZWxldGVRdWV1ZVN0ZXAgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgaWYgKHR5cGVvZiBxdWV1ZVtpbmRleF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcXVldWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuLypcbiAqIEdsb2JhbCBmdW5jdGlvbiB0byBjbG9zZSBzd2VldEFsZXJ0XG4gKi9cbnN3ZWV0QWxlcnQuY2xvc2UgPSBzd2VldEFsZXJ0LmNsb3NlUG9wdXAgPSBzd2VldEFsZXJ0LmNsb3NlTW9kYWwgPSBzd2VldEFsZXJ0LmNsb3NlVG9hc3QgPSBmdW5jdGlvbiAob25Db21wbGV0ZSkge1xuICB2YXIgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XG4gIHZhciBwb3B1cCA9IGdldFBvcHVwKCk7XG4gIGlmICghcG9wdXApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcmVtb3ZlQ2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLnNob3cpO1xuICBhZGRDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMuaGlkZSk7XG4gIGNsZWFyVGltZW91dChwb3B1cC50aW1lb3V0KTtcblxuICBpZiAoIWlzVG9hc3QoKSkge1xuICAgIHJlc2V0UHJldlN0YXRlKCk7XG4gICAgd2luZG93Lm9ua2V5ZG93biA9IHByZXZpb3VzV2luZG93S2V5RG93bjtcbiAgICB3aW5kb3dPbmtleWRvd25PdmVycmlkZGVuID0gZmFsc2U7XG4gIH1cblxuICB2YXIgcmVtb3ZlUG9wdXBBbmRSZXNldFN0YXRlID0gZnVuY3Rpb24gcmVtb3ZlUG9wdXBBbmRSZXNldFN0YXRlKCkge1xuICAgIGlmIChjb250YWluZXIucGFyZW50Tm9kZSkge1xuICAgICAgY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlQ2xhc3MoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sIFtzd2FsQ2xhc3Nlcy5zaG93biwgc3dhbENsYXNzZXNbJ25vLWJhY2tkcm9wJ10sIHN3YWxDbGFzc2VzWydoYXMtaW5wdXQnXSwgc3dhbENsYXNzZXNbJ3RvYXN0LXNob3duJ11dKTtcblxuICAgIGlmIChpc01vZGFsKCkpIHtcbiAgICAgIHVuZG9TY3JvbGxiYXIoKTtcbiAgICAgIHVuZG9JT1NmaXgoKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSWYgYW5pbWF0aW9uIGlzIHN1cHBvcnRlZCwgYW5pbWF0ZVxuICBpZiAoYW5pbWF0aW9uRW5kRXZlbnQgJiYgIWhhc0NsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5ub2FuaW1hdGlvbikpIHtcbiAgICBwb3B1cC5hZGRFdmVudExpc3RlbmVyKGFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiBzd2FsQ2xvc2VFdmVudEZpbmlzaGVkKCkge1xuICAgICAgcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihhbmltYXRpb25FbmRFdmVudCwgc3dhbENsb3NlRXZlbnRGaW5pc2hlZCk7XG4gICAgICBpZiAoaGFzQ2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLmhpZGUpKSB7XG4gICAgICAgIHJlbW92ZVBvcHVwQW5kUmVzZXRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIE90aGVyd2lzZSwgcmVtb3ZlIGltbWVkaWF0ZWx5XG4gICAgcmVtb3ZlUG9wdXBBbmRSZXNldFN0YXRlKCk7XG4gIH1cbiAgaWYgKG9uQ29tcGxldGUgIT09IG51bGwgJiYgdHlwZW9mIG9uQ29tcGxldGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIG9uQ29tcGxldGUocG9wdXApO1xuICAgIH0pO1xuICB9XG59O1xuXG4vKlxuICogR2xvYmFsIGZ1bmN0aW9uIHRvIGNsaWNrICdDb25maXJtJyBidXR0b25cbiAqL1xuc3dlZXRBbGVydC5jbGlja0NvbmZpcm0gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBnZXRDb25maXJtQnV0dG9uKCkuY2xpY2soKTtcbn07XG5cbi8qXG4gKiBHbG9iYWwgZnVuY3Rpb24gdG8gY2xpY2sgJ0NhbmNlbCcgYnV0dG9uXG4gKi9cbnN3ZWV0QWxlcnQuY2xpY2tDYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBnZXRDYW5jZWxCdXR0b24oKS5jbGljaygpO1xufTtcblxuLyoqXG4gKiBTaG93IHNwaW5uZXIgaW5zdGVhZCBvZiBDb25maXJtIGJ1dHRvbiBhbmQgZGlzYWJsZSBDYW5jZWwgYnV0dG9uXG4gKi9cbnN3ZWV0QWxlcnQuc2hvd0xvYWRpbmcgPSBzd2VldEFsZXJ0LmVuYWJsZUxvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwb3B1cCA9IGdldFBvcHVwKCk7XG4gIGlmICghcG9wdXApIHtcbiAgICBzd2VldEFsZXJ0KCcnKTtcbiAgfVxuICBwb3B1cCA9IGdldFBvcHVwKCk7XG4gIHZhciBhY3Rpb25zID0gZ2V0QWN0aW9ucygpO1xuICB2YXIgY29uZmlybUJ1dHRvbiA9IGdldENvbmZpcm1CdXR0b24oKTtcbiAgdmFyIGNhbmNlbEJ1dHRvbiA9IGdldENhbmNlbEJ1dHRvbigpO1xuXG4gIHNob3coYWN0aW9ucyk7XG4gIHNob3coY29uZmlybUJ1dHRvbiwgJ2lubGluZS1ibG9jaycpO1xuICBhZGRDbGFzcyhbcG9wdXAsIGFjdGlvbnNdLCBzd2FsQ2xhc3Nlcy5sb2FkaW5nKTtcbiAgY29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIGNhbmNlbEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG5cbiAgcG9wdXAuc2V0QXR0cmlidXRlKCdkYXRhLWxvYWRpbmcnLCB0cnVlKTtcbiAgcG9wdXAuc2V0QXR0cmlidXRlKCdhcmlhLWJ1c3knLCB0cnVlKTtcbiAgcG9wdXAuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogSXMgdmFsaWQgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1OYW1lXG4gKi9cbnN3ZWV0QWxlcnQuaXNWYWxpZFBhcmFtZXRlciA9IGZ1bmN0aW9uIChwYXJhbU5hbWUpIHtcbiAgcmV0dXJuIGRlZmF1bHRQYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW1OYW1lKSB8fCBwYXJhbU5hbWUgPT09ICdleHRyYVBhcmFtcyc7XG59O1xuXG4vKipcbiAqIElzIGRlcHJlY2F0ZWQgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1OYW1lXG4gKi9cbnN3ZWV0QWxlcnQuaXNEZXByZWNhdGVkUGFyYW1ldGVyID0gZnVuY3Rpb24gKHBhcmFtTmFtZSkge1xuICByZXR1cm4gZGVwcmVjYXRlZFBhcmFtcy5pbmRleE9mKHBhcmFtTmFtZSkgIT09IC0xO1xufTtcblxuLyoqXG4gKiBTZXQgZGVmYXVsdCBwYXJhbXMgZm9yIGVhY2ggcG9wdXBcbiAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyUGFyYW1zXG4gKi9cbnN3ZWV0QWxlcnQuc2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAodXNlclBhcmFtcykge1xuICBpZiAoIXVzZXJQYXJhbXMgfHwgKHR5cGVvZiB1c2VyUGFyYW1zID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih1c2VyUGFyYW1zKSkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGVycm9yKCd0aGUgYXJndW1lbnQgZm9yIHNldERlZmF1bHRzKCkgaXMgcmVxdWlyZWQgYW5kIGhhcyB0byBiZSBhIG9iamVjdCcpO1xuICB9XG5cbiAgc2hvd1dhcm5pbmdzRm9yUGFyYW1zKHVzZXJQYXJhbXMpO1xuXG4gIC8vIGFzc2lnbiB2YWxpZCBwYXJhbXMgZnJvbSB1c2VyUGFyYW1zIHRvIHBvcHVwUGFyYW1zXG4gIGZvciAodmFyIHBhcmFtIGluIHVzZXJQYXJhbXMpIHtcbiAgICBpZiAoc3dlZXRBbGVydC5pc1ZhbGlkUGFyYW1ldGVyKHBhcmFtKSkge1xuICAgICAgcG9wdXBQYXJhbXNbcGFyYW1dID0gdXNlclBhcmFtc1twYXJhbV07XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFJlc2V0IGRlZmF1bHQgcGFyYW1zIGZvciBlYWNoIHBvcHVwXG4gKi9cbnN3ZWV0QWxlcnQucmVzZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcG9wdXBQYXJhbXMgPSBfZXh0ZW5kcyh7fSwgZGVmYXVsdFBhcmFtcyk7XG59O1xuXG4vKipcbiAqIEFkYXB0IGEgbGVnYWN5IGlucHV0VmFsaWRhdG9yIGZvciB1c2Ugd2l0aCBleHBlY3RSZWplY3Rpb25zPWZhbHNlXG4gKi9cbnN3ZWV0QWxlcnQuYWRhcHRJbnB1dFZhbGlkYXRvciA9IGZ1bmN0aW9uIChsZWdhY3lWYWxpZGF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGFkYXB0ZWRJbnB1dFZhbGlkYXRvcihpbnB1dFZhbHVlLCBleHRyYVBhcmFtcykge1xuICAgIHJldHVybiBsZWdhY3lWYWxpZGF0b3IuY2FsbCh0aGlzLCBpbnB1dFZhbHVlLCBleHRyYVBhcmFtcykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sIGZ1bmN0aW9uICh2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgIHJldHVybiB2YWxpZGF0aW9uRXJyb3I7XG4gICAgfSk7XG4gIH07XG59O1xuXG5zd2VldEFsZXJ0LkRpc21pc3NSZWFzb24gPSBPYmplY3QuZnJlZXplKHtcbiAgY2FuY2VsOiAnY2FuY2VsJyxcbiAgYmFja2Ryb3A6ICdvdmVybGF5JyxcbiAgY2xvc2U6ICdjbG9zZScsXG4gIGVzYzogJ2VzYycsXG4gIHRpbWVyOiAndGltZXInXG59KTtcblxuc3dlZXRBbGVydC5ub29wID0gZnVuY3Rpb24gKCkge307XG5cbnN3ZWV0QWxlcnQudmVyc2lvbiA9ICc3LjEyLjAnO1xuXG5zd2VldEFsZXJ0LmRlZmF1bHQgPSBzd2VldEFsZXJ0O1xuXG4vKipcbiAqIFNldCBkZWZhdWx0IHBhcmFtcyBpZiBgd2luZG93Ll9zd2FsRGVmYXVsdHNgIGlzIGFuIG9iamVjdFxuICovXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgX3R5cGVvZih3aW5kb3cuX3N3YWxEZWZhdWx0cykgPT09ICdvYmplY3QnKSB7XG4gIHN3ZWV0QWxlcnQuc2V0RGVmYXVsdHMod2luZG93Ll9zd2FsRGVmYXVsdHMpO1xufVxuXG4vLyBSZW1lbWJlciBzdGF0ZSBpbiBjYXNlcyB3aGVyZSBvcGVuaW5nIGFuZCBoYW5kbGluZyBhIG1vZGFsIHdpbGwgZmlkZGxlIHdpdGggaXQuXG52YXIgc3RhdGVzID0ge1xuICBwcmV2aW91c0FjdGl2ZUVsZW1lbnQ6IG51bGwsXG4gIHByZXZpb3VzQm9keVBhZGRpbmc6IG51bGxcblxuICAvLyBEZXRlY3QgTm9kZSBlbnZcbn07dmFyIGlzTm9kZUVudiA9IGZ1bmN0aW9uIGlzTm9kZUVudigpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCc7XG59O1xuXG4vKlxuICogQWRkIG1vZGFsICsgYmFja2Ryb3AgdG8gRE9NXG4gKi9cbnZhciBpbml0ID0gZnVuY3Rpb24gaW5pdChwYXJhbXMpIHtcbiAgLy8gQ2xlYW4gdXAgdGhlIG9sZCBwb3B1cCBpZiBpdCBleGlzdHNcbiAgdmFyIGMgPSBnZXRDb250YWluZXIoKTtcbiAgaWYgKGMpIHtcbiAgICBjLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYyk7XG4gICAgcmVtb3ZlQ2xhc3MoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sIFtzd2FsQ2xhc3Nlc1snbm8tYmFja2Ryb3AnXSwgc3dhbENsYXNzZXNbJ2hhcy1pbnB1dCddLCBzd2FsQ2xhc3Nlc1sndG9hc3Qtc2hvd24nXV0pO1xuICB9XG5cbiAgaWYgKGlzTm9kZUVudigpKSB7XG4gICAgZXJyb3IoJ1N3ZWV0QWxlcnQyIHJlcXVpcmVzIGRvY3VtZW50IHRvIGluaXRpYWxpemUnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSBzd2FsQ2xhc3Nlcy5jb250YWluZXI7XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBzd2VldEhUTUw7XG5cbiAgdmFyIHRhcmdldEVsZW1lbnQgPSB0eXBlb2YgcGFyYW1zLnRhcmdldCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmFtcy50YXJnZXQpIDogcGFyYW1zLnRhcmdldDtcbiAgdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gIHZhciBwb3B1cCA9IGdldFBvcHVwKCk7XG4gIHZhciBjb250ZW50ID0gZ2V0Q29udGVudCgpO1xuICB2YXIgaW5wdXQgPSBnZXRDaGlsZEJ5Q2xhc3MoY29udGVudCwgc3dhbENsYXNzZXMuaW5wdXQpO1xuICB2YXIgZmlsZSA9IGdldENoaWxkQnlDbGFzcyhjb250ZW50LCBzd2FsQ2xhc3Nlcy5maWxlKTtcbiAgdmFyIHJhbmdlID0gY29udGVudC5xdWVyeVNlbGVjdG9yKCcuJyArIHN3YWxDbGFzc2VzLnJhbmdlICsgJyBpbnB1dCcpO1xuICB2YXIgcmFuZ2VPdXRwdXQgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgc3dhbENsYXNzZXMucmFuZ2UgKyAnIG91dHB1dCcpO1xuICB2YXIgc2VsZWN0ID0gZ2V0Q2hpbGRCeUNsYXNzKGNvbnRlbnQsIHN3YWxDbGFzc2VzLnNlbGVjdCk7XG4gIHZhciBjaGVja2JveCA9IGNvbnRlbnQucXVlcnlTZWxlY3RvcignLicgKyBzd2FsQ2xhc3Nlcy5jaGVja2JveCArICcgaW5wdXQnKTtcbiAgdmFyIHRleHRhcmVhID0gZ2V0Q2hpbGRCeUNsYXNzKGNvbnRlbnQsIHN3YWxDbGFzc2VzLnRleHRhcmVhKTtcblxuICAvLyBhMTF5XG4gIHBvcHVwLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgcGFyYW1zLnRvYXN0ID8gJ3BvbGl0ZScgOiAnYXNzZXJ0aXZlJyk7XG5cbiAgdmFyIHJlc2V0VmFsaWRhdGlvbkVycm9yID0gZnVuY3Rpb24gcmVzZXRWYWxpZGF0aW9uRXJyb3IoKSB7XG4gICAgc3dlZXRBbGVydC5pc1Zpc2libGUoKSAmJiBzd2VldEFsZXJ0LnJlc2V0VmFsaWRhdGlvbkVycm9yKCk7XG4gIH07XG5cbiAgaW5wdXQub25pbnB1dCA9IHJlc2V0VmFsaWRhdGlvbkVycm9yO1xuICBmaWxlLm9uY2hhbmdlID0gcmVzZXRWYWxpZGF0aW9uRXJyb3I7XG4gIHNlbGVjdC5vbmNoYW5nZSA9IHJlc2V0VmFsaWRhdGlvbkVycm9yO1xuICBjaGVja2JveC5vbmNoYW5nZSA9IHJlc2V0VmFsaWRhdGlvbkVycm9yO1xuICB0ZXh0YXJlYS5vbmlucHV0ID0gcmVzZXRWYWxpZGF0aW9uRXJyb3I7XG5cbiAgcmFuZ2Uub25pbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXNldFZhbGlkYXRpb25FcnJvcigpO1xuICAgIHJhbmdlT3V0cHV0LnZhbHVlID0gcmFuZ2UudmFsdWU7XG4gIH07XG5cbiAgcmFuZ2Uub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICByYW5nZS5wcmV2aW91c1NpYmxpbmcudmFsdWUgPSByYW5nZS52YWx1ZTtcbiAgfTtcblxuICByZXR1cm4gcG9wdXA7XG59O1xuXG4vKlxuICogTWFuaXB1bGF0ZSBET01cbiAqL1xuXG52YXIgc3dlZXRIVE1MID0gKCdcXG4gPGRpdiByb2xlPVwiZGlhbG9nXCIgYXJpYS1tb2RhbD1cInRydWVcIiBhcmlhLWxhYmVsbGVkYnk9XCInICsgc3dhbENsYXNzZXMudGl0bGUgKyAnXCIgYXJpYS1kZXNjcmliZWRieT1cIicgKyBzd2FsQ2xhc3Nlcy5jb250ZW50ICsgJ1wiIGNsYXNzPVwiJyArIHN3YWxDbGFzc2VzLnBvcHVwICsgJ1wiIHRhYmluZGV4PVwiLTFcIj5cXG4gICA8ZGl2IGNsYXNzPVwiJyArIHN3YWxDbGFzc2VzLmhlYWRlciArICdcIj5cXG4gICAgIDx1bCBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy5wcm9ncmVzc3N0ZXBzICsgJ1wiPjwvdWw+XFxuICAgICA8ZGl2IGNsYXNzPVwiJyArIHN3YWxDbGFzc2VzLmljb24gKyAnICcgKyBpY29uVHlwZXMuZXJyb3IgKyAnXCI+XFxuICAgICAgIDxzcGFuIGNsYXNzPVwic3dhbDIteC1tYXJrXCI+PHNwYW4gY2xhc3M9XCJzd2FsMi14LW1hcmstbGluZS1sZWZ0XCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwic3dhbDIteC1tYXJrLWxpbmUtcmlnaHRcIj48L3NwYW4+PC9zcGFuPlxcbiAgICAgPC9kaXY+XFxuICAgICA8ZGl2IGNsYXNzPVwiJyArIHN3YWxDbGFzc2VzLmljb24gKyAnICcgKyBpY29uVHlwZXMucXVlc3Rpb24gKyAnXCI+PzwvZGl2PlxcbiAgICAgPGRpdiBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy5pY29uICsgJyAnICsgaWNvblR5cGVzLndhcm5pbmcgKyAnXCI+ITwvZGl2PlxcbiAgICAgPGRpdiBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy5pY29uICsgJyAnICsgaWNvblR5cGVzLmluZm8gKyAnXCI+aTwvZGl2PlxcbiAgICAgPGRpdiBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy5pY29uICsgJyAnICsgaWNvblR5cGVzLnN1Y2Nlc3MgKyAnXCI+XFxuICAgICAgIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtbGVmdFwiPjwvZGl2PlxcbiAgICAgICA8c3BhbiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtbGluZS10aXBcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwic3dhbDItc3VjY2Vzcy1saW5lLWxvbmdcIj48L3NwYW4+XFxuICAgICAgIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLXJpbmdcIj48L2Rpdj4gPGRpdiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtZml4XCI+PC9kaXY+XFxuICAgICAgIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtcmlnaHRcIj48L2Rpdj5cXG4gICAgIDwvZGl2PlxcbiAgICAgPGltZyBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy5pbWFnZSArICdcIiAvPlxcbiAgICAgPGgyIGNsYXNzPVwiJyArIHN3YWxDbGFzc2VzLnRpdGxlICsgJ1wiIGlkPVwiJyArIHN3YWxDbGFzc2VzLnRpdGxlICsgJ1wiPjwvaDI+XFxuICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy5jbG9zZSArICdcIj5cXHhENzwvYnV0dG9uPlxcbiAgIDwvZGl2PlxcbiAgIDxkaXYgY2xhc3M9XCInICsgc3dhbENsYXNzZXMuY29udGVudCArICdcIj5cXG4gICAgIDxkaXYgaWQ9XCInICsgc3dhbENsYXNzZXMuY29udGVudCArICdcIj48L2Rpdj5cXG4gICAgIDxpbnB1dCBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy5pbnB1dCArICdcIiAvPlxcbiAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgY2xhc3M9XCInICsgc3dhbENsYXNzZXMuZmlsZSArICdcIiAvPlxcbiAgICAgPGRpdiBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy5yYW5nZSArICdcIj5cXG4gICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIC8+XFxuICAgICAgIDxvdXRwdXQ+PC9vdXRwdXQ+XFxuICAgICA8L2Rpdj5cXG4gICAgIDxzZWxlY3QgY2xhc3M9XCInICsgc3dhbENsYXNzZXMuc2VsZWN0ICsgJ1wiPjwvc2VsZWN0PlxcbiAgICAgPGRpdiBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy5yYWRpbyArICdcIj48L2Rpdj5cXG4gICAgIDxsYWJlbCBmb3I9XCInICsgc3dhbENsYXNzZXMuY2hlY2tib3ggKyAnXCIgY2xhc3M9XCInICsgc3dhbENsYXNzZXMuY2hlY2tib3ggKyAnXCI+XFxuICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAvPlxcbiAgICAgPC9sYWJlbD5cXG4gICAgIDx0ZXh0YXJlYSBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy50ZXh0YXJlYSArICdcIj48L3RleHRhcmVhPlxcbiAgICAgPGRpdiBjbGFzcz1cIicgKyBzd2FsQ2xhc3Nlcy52YWxpZGF0aW9uZXJyb3IgKyAnXCIgaWQ9XCInICsgc3dhbENsYXNzZXMudmFsaWRhdGlvbmVycm9yICsgJ1wiPjwvZGl2PlxcbiAgIDwvZGl2PlxcbiAgIDxkaXYgY2xhc3M9XCInICsgc3dhbENsYXNzZXMuYWN0aW9ucyArICdcIj5cXG4gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJyArIHN3YWxDbGFzc2VzLmNvbmZpcm0gKyAnXCI+T0s8L2J1dHRvbj5cXG4gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJyArIHN3YWxDbGFzc2VzLmNhbmNlbCArICdcIj5DYW5jZWw8L2J1dHRvbj5cXG4gICA8L2Rpdj5cXG4gICA8ZGl2IGNsYXNzPVwiJyArIHN3YWxDbGFzc2VzLmZvb3RlciArICdcIj5cXG4gICA8L2Rpdj5cXG4gPC9kaXY+XFxuJykucmVwbGFjZSgvKF58XFxuKVxccyovZywgJycpO1xuXG52YXIgZ2V0Q29udGFpbmVyID0gZnVuY3Rpb24gZ2V0Q29udGFpbmVyKCkge1xuICByZXR1cm4gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcuJyArIHN3YWxDbGFzc2VzLmNvbnRhaW5lcik7XG59O1xuXG52YXIgZ2V0UG9wdXAgPSBmdW5jdGlvbiBnZXRQb3B1cCgpIHtcbiAgcmV0dXJuIGdldENvbnRhaW5lcigpID8gZ2V0Q29udGFpbmVyKCkucXVlcnlTZWxlY3RvcignLicgKyBzd2FsQ2xhc3Nlcy5wb3B1cCkgOiBudWxsO1xufTtcblxudmFyIGdldEljb25zID0gZnVuY3Rpb24gZ2V0SWNvbnMoKSB7XG4gIHZhciBwb3B1cCA9IGdldFBvcHVwKCk7XG4gIHJldHVybiBwb3B1cC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHN3YWxDbGFzc2VzLmljb24pO1xufTtcblxudmFyIGVsZW1lbnRCeUNsYXNzID0gZnVuY3Rpb24gZWxlbWVudEJ5Q2xhc3MoY2xhc3NOYW1lKSB7XG4gIHJldHVybiBnZXRDb250YWluZXIoKSA/IGdldENvbnRhaW5lcigpLnF1ZXJ5U2VsZWN0b3IoJy4nICsgY2xhc3NOYW1lKSA6IG51bGw7XG59O1xuXG52YXIgZ2V0VGl0bGUgPSBmdW5jdGlvbiBnZXRUaXRsZSgpIHtcbiAgcmV0dXJuIGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLnRpdGxlKTtcbn07XG5cbnZhciBnZXRDb250ZW50ID0gZnVuY3Rpb24gZ2V0Q29udGVudCgpIHtcbiAgcmV0dXJuIGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLmNvbnRlbnQpO1xufTtcblxudmFyIGdldEltYWdlID0gZnVuY3Rpb24gZ2V0SW1hZ2UoKSB7XG4gIHJldHVybiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5pbWFnZSk7XG59O1xuXG52YXIgZ2V0UHJvZ3Jlc3NTdGVwcyA9IGZ1bmN0aW9uIGdldFByb2dyZXNzU3RlcHMoKSB7XG4gIHJldHVybiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5wcm9ncmVzc3N0ZXBzKTtcbn07XG5cbnZhciBnZXRWYWxpZGF0aW9uRXJyb3IgPSBmdW5jdGlvbiBnZXRWYWxpZGF0aW9uRXJyb3IoKSB7XG4gIHJldHVybiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy52YWxpZGF0aW9uZXJyb3IpO1xufTtcblxudmFyIGdldENvbmZpcm1CdXR0b24gPSBmdW5jdGlvbiBnZXRDb25maXJtQnV0dG9uKCkge1xuICByZXR1cm4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuY29uZmlybSk7XG59O1xuXG52YXIgZ2V0Q2FuY2VsQnV0dG9uID0gZnVuY3Rpb24gZ2V0Q2FuY2VsQnV0dG9uKCkge1xuICByZXR1cm4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuY2FuY2VsKTtcbn07XG5cbnZhciBnZXRCdXR0b25zV3JhcHBlciA9IGZ1bmN0aW9uIGdldEJ1dHRvbnNXcmFwcGVyKCkge1xuICB3YXJuT25jZSgnc3dhbC5nZXRCdXR0b25zV3JhcHBlcigpIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLCB1c2Ugc3dhbC5nZXRBY3Rpb25zKCkgaW5zdGVhZCcpO1xuICByZXR1cm4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuYWN0aW9ucyk7XG59O1xuXG52YXIgZ2V0QWN0aW9ucyA9IGZ1bmN0aW9uIGdldEFjdGlvbnMoKSB7XG4gIHJldHVybiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5hY3Rpb25zKTtcbn07XG5cbnZhciBnZXRGb290ZXIgPSBmdW5jdGlvbiBnZXRGb290ZXIoKSB7XG4gIHJldHVybiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5mb290ZXIpO1xufTtcblxudmFyIGdldENsb3NlQnV0dG9uID0gZnVuY3Rpb24gZ2V0Q2xvc2VCdXR0b24oKSB7XG4gIHJldHVybiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5jbG9zZSk7XG59O1xuXG52YXIgZ2V0Rm9jdXNhYmxlRWxlbWVudHMgPSBmdW5jdGlvbiBnZXRGb2N1c2FibGVFbGVtZW50cygpIHtcbiAgdmFyIGZvY3VzYWJsZUVsZW1lbnRzV2l0aFRhYmluZGV4ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZ2V0UG9wdXAoKS5xdWVyeVNlbGVjdG9yQWxsKCdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSk6bm90KFt0YWJpbmRleD1cIjBcIl0pJykpXG4gIC8vIHNvcnQgYWNjb3JkaW5nIHRvIHRhYmluZGV4XG4gIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgYSA9IHBhcnNlSW50KGEuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKTtcbiAgICBiID0gcGFyc2VJbnQoYi5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykpO1xuICAgIGlmIChhID4gYikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChhIDwgYikge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfSk7XG5cbiAgdmFyIG90aGVyRm9jdXNhYmxlRWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChnZXRQb3B1cCgpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbiwgaW5wdXQ6bm90KFt0eXBlPWhpZGRlbl0pLCB0ZXh0YXJlYSwgc2VsZWN0LCBhLCBbdGFiaW5kZXg9XCIwXCJdJykpO1xuXG4gIHJldHVybiB1bmlxdWVBcnJheShmb2N1c2FibGVFbGVtZW50c1dpdGhUYWJpbmRleC5jb25jYXQob3RoZXJGb2N1c2FibGVFbGVtZW50cykpO1xufTtcblxudmFyIHBhcnNlSHRtbFRvQ29udGFpbmVyID0gZnVuY3Rpb24gcGFyc2VIdG1sVG9Db250YWluZXIocGFyYW0sIHRhcmdldCkge1xuICBpZiAoIXBhcmFtKSB7XG4gICAgcmV0dXJuIGhpZGUodGFyZ2V0KTtcbiAgfVxuXG4gIGlmICgodHlwZW9mIHBhcmFtID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihwYXJhbSkpID09PSAnb2JqZWN0Jykge1xuICAgIHRhcmdldC5pbm5lckhUTUwgPSAnJztcbiAgICBpZiAoMCBpbiBwYXJhbSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgaW4gcGFyYW07IGkrKykge1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocGFyYW1baV0uY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHBhcmFtLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHBhcmFtKSB7XG4gICAgdGFyZ2V0LmlubmVySFRNTCA9IHBhcmFtO1xuICB9IGVsc2Uge31cbiAgc2hvdyh0YXJnZXQpO1xufTtcblxudmFyIGlzTW9kYWwgPSBmdW5jdGlvbiBpc01vZGFsKCkge1xuICByZXR1cm4gIWRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKHN3YWxDbGFzc2VzWyd0b2FzdC1zaG93biddKTtcbn07XG5cbnZhciBpc1RvYXN0ID0gZnVuY3Rpb24gaXNUb2FzdCgpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKHN3YWxDbGFzc2VzWyd0b2FzdC1zaG93biddKTtcbn07XG5cbnZhciBpc0xvYWRpbmcgPSBmdW5jdGlvbiBpc0xvYWRpbmcoKSB7XG4gIHJldHVybiBnZXRQb3B1cCgpLmhhc0F0dHJpYnV0ZSgnZGF0YS1sb2FkaW5nJyk7XG59O1xuXG52YXIgaGFzQ2xhc3MgPSBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgaWYgKGVsZW0uY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxudmFyIGZvY3VzSW5wdXQgPSBmdW5jdGlvbiBmb2N1c0lucHV0KGlucHV0KSB7XG4gIGlucHV0LmZvY3VzKCk7XG5cbiAgLy8gcGxhY2UgY3Vyc29yIGF0IGVuZCBvZiB0ZXh0IGluIHRleHQgaW5wdXRcbiAgaWYgKGlucHV0LnR5cGUgIT09ICdmaWxlJykge1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIzNDU5MTUvMTMzMTQyNVxuICAgIHZhciB2YWwgPSBpbnB1dC52YWx1ZTtcbiAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgIGlucHV0LnZhbHVlID0gdmFsO1xuICB9XG59O1xuXG52YXIgYWRkT3JSZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIGFkZE9yUmVtb3ZlQ2xhc3ModGFyZ2V0LCBjbGFzc0xpc3QsIGFkZCkge1xuICBpZiAoIXRhcmdldCB8fCAhY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2YgY2xhc3NMaXN0ID09PSAnc3RyaW5nJykge1xuICAgIGNsYXNzTGlzdCA9IGNsYXNzTGlzdC5zcGxpdCgvXFxzKy8pLmZpbHRlcihCb29sZWFuKTtcbiAgfVxuICBjbGFzc0xpc3QuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgaWYgKHRhcmdldC5mb3JFYWNoKSB7XG4gICAgICB0YXJnZXQuZm9yRWFjaChmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICBhZGQgPyBlbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSA6IGVsZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZCA/IHRhcmdldC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkgOiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG52YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbiBhZGRDbGFzcyh0YXJnZXQsIGNsYXNzTGlzdCkge1xuICBhZGRPclJlbW92ZUNsYXNzKHRhcmdldCwgY2xhc3NMaXN0LCB0cnVlKTtcbn07XG5cbnZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKHRhcmdldCwgY2xhc3NMaXN0KSB7XG4gIGFkZE9yUmVtb3ZlQ2xhc3ModGFyZ2V0LCBjbGFzc0xpc3QsIGZhbHNlKTtcbn07XG5cbnZhciBnZXRDaGlsZEJ5Q2xhc3MgPSBmdW5jdGlvbiBnZXRDaGlsZEJ5Q2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGhhc0NsYXNzKGVsZW0uY2hpbGROb2Rlc1tpXSwgY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIGVsZW0uY2hpbGROb2Rlc1tpXTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBzaG93ID0gZnVuY3Rpb24gc2hvdyhlbGVtLCBkaXNwbGF5KSB7XG4gIGlmICghZGlzcGxheSkge1xuICAgIGRpc3BsYXkgPSBlbGVtLmlkID09PSBzd2FsQ2xhc3Nlcy5jb250ZW50ID8gJ2Jsb2NrJyA6ICdmbGV4JztcbiAgfVxuICBlbGVtLnN0eWxlLm9wYWNpdHkgPSAnJztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbn07XG5cbnZhciBoaWRlID0gZnVuY3Rpb24gaGlkZShlbGVtKSB7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59O1xuXG52YXIgZW1wdHkgPSBmdW5jdGlvbiBlbXB0eShlbGVtKSB7XG4gIHdoaWxlIChlbGVtLmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtLnJlbW92ZUNoaWxkKGVsZW0uZmlyc3RDaGlsZCk7XG4gIH1cbn07XG5cbi8vIGJvcnJvd2VkIGZyb20ganF1ZXJ5ICQoZWxlbSkuaXMoJzp2aXNpYmxlJykgaW1wbGVtZW50YXRpb25cbnZhciBpc1Zpc2libGUgPSBmdW5jdGlvbiBpc1Zpc2libGUoZWxlbSkge1xuICByZXR1cm4gZWxlbSAmJiAoZWxlbS5vZmZzZXRXaWR0aCB8fCBlbGVtLm9mZnNldEhlaWdodCB8fCBlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKTtcbn07XG5cbnZhciByZW1vdmVTdHlsZVByb3BlcnR5ID0gZnVuY3Rpb24gcmVtb3ZlU3R5bGVQcm9wZXJ0eShlbGVtLCBwcm9wZXJ0eSkge1xuICBpZiAoZWxlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eSkge1xuICAgIGVsZW0uc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkpO1xuICB9IGVsc2Uge1xuICAgIGVsZW0uc3R5bGUucmVtb3ZlQXR0cmlidXRlKHByb3BlcnR5KTtcbiAgfVxufTtcblxudmFyIGFuaW1hdGlvbkVuZEV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAvLyBQcmV2ZW50IHJ1biBpbiBOb2RlIGVudlxuICBpZiAoaXNOb2RlRW52KCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZhciB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgJ1dlYmtpdEFuaW1hdGlvbic6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgICdPQW5pbWF0aW9uJzogJ29BbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCcsXG4gICAgJ2FuaW1hdGlvbic6ICdhbmltYXRpb25lbmQnXG4gIH07XG4gIGZvciAodmFyIGkgaW4gdHJhbnNFbmRFdmVudE5hbWVzKSB7XG4gICAgaWYgKHRyYW5zRW5kRXZlbnROYW1lcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0eXBlb2YgdGVzdEVsLnN0eWxlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRyYW5zRW5kRXZlbnROYW1lc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59KCk7XG5cbi8vIFJlc2V0IHByZXZpb3VzIHdpbmRvdyBrZXlkb3duIGhhbmRsZXIgYW5kIGZvY3VlZCBlbGVtZW50XG52YXIgcmVzZXRQcmV2U3RhdGUgPSBmdW5jdGlvbiByZXNldFByZXZTdGF0ZSgpIHtcbiAgaWYgKHN0YXRlcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgJiYgc3RhdGVzLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cykge1xuICAgIHZhciB4ID0gd2luZG93LnNjcm9sbFg7XG4gICAgdmFyIHkgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICBzdGF0ZXMucHJldmlvdXNBY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgaWYgKHR5cGVvZiB4ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgeSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIElFIGRvZXNuJ3QgaGF2ZSBzY3JvbGxYL3Njcm9sbFkgc3VwcG9ydFxuICAgICAgd2luZG93LnNjcm9sbFRvKHgsIHkpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gTWVhc3VyZSB3aWR0aCBvZiBzY3JvbGxiYXJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9qcy9tb2RhbC5qcyNMMjc5LUwyODZcbnZhciBtZWFzdXJlU2Nyb2xsYmFyID0gZnVuY3Rpb24gbWVhc3VyZVNjcm9sbGJhcigpIHtcbiAgdmFyIHN1cHBvcnRzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHM7XG4gIGlmIChzdXBwb3J0c1RvdWNoKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzY3JvbGxEaXYuc3R5bGUud2lkdGggPSAnNTBweCc7XG4gIHNjcm9sbERpdi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XG4gIHNjcm9sbERpdi5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdik7XG4gIHZhciBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG59O1xuXG4vKipcbiAqIEluamVjdCBhIHN0cmluZyBvZiBDU1MgaW50byB0aGUgcGFnZSBoZWFkZXJcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY3NzXG4gKi9cbnZhciBpbmplY3RDU1MgPSBmdW5jdGlvbiBpbmplY3RDU1MoKSB7XG4gIHZhciBjc3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcnO1xuXG4gIC8vIFByZXZlbnQgcnVuIGluIE5vZGUgZW52XG4gIGlmIChpc05vZGVFbnYoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn07XG5cbmluamVjdENTUyhzdHlsZXMpO1xuXG5yZXR1cm4gc3dlZXRBbGVydDtcblxufSkpKTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuU3dlZXRhbGVydDIpIHdpbmRvdy5zd2VldEFsZXJ0ID0gd2luZG93LnN3YWwgPSB3aW5kb3cuU3dlZXRhbGVydDI7XG4iXSwic291cmNlUm9vdCI6IiJ9