'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _victory = require('victory');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var planNames = ['unprecio', 'dosprecios', '3.0a'];

var RangePrices = function (_React$Component) {
  _inherits(RangePrices, _React$Component);

  function RangePrices(props) {
    _classCallCheck(this, RangePrices);

    var _this = _possibleConstructorReturn(this, (RangePrices.__proto__ || Object.getPrototypeOf(RangePrices)).call(this, props));

    _this.generatePlanData = _this.generatePlanData.bind(_this);
    return _this;
  }

  _createClass(RangePrices, [{
    key: 'generatePlanData',
    value: function generatePlanData(plans) {
      var arrData = [];
      var maxBars = Object.keys(plans['3.0a']).length;

      for (var x = 0; x < maxBars; x++) {
        var arrBar = [];
        var count = 3;
        for (var y = 0; y < planNames.length; y++) {
          if (typeof plans[planNames[y]][x] !== 'undefined') {
            arrBar.push({
              x: count,
              y0: parseInt(Object.keys(plans[planNames[y]][x])[0].split('-')[0], 10) !== 0 ? parseInt(Object.keys(plans[planNames[y]][x])[0].split('-')[0], 10) - 1 : 0,
              y: parseInt(Object.keys(plans[planNames[y]][x])[0].split('-')[1], 10)
            });
          }
          count--;
        }
        arrData[x] = arrBar;
      }
      return arrData;
    }
  }, {
    key: 'render',
    value: function render() {
      var data = this.props.data;

      var planData = this.generatePlanData(data);
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_victory.VictoryChart, {
        animate: {
          duration: 2000,
          onLoad: { duration: 1000 }
        },
        height: 200,
        width: 300,
        theme: _victory.VictoryTheme.material,
        domain: { x: [0, 23] },
        domainPadding: 20,
        categories: {
          x: planNames.reverse()
        }
      }, _react2.default.createElement(_victory.VictoryAxis, {
        label: 'Hora del d\xEDa',
        style: {
          axisLabel: { fontSize: 6, padding: 20 },
          ticks: { stroke: 'grey', size: 1 },
          tickLabels: { fontSize: 4, padding: 5 }
        },
        tickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        tickFormat: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
      }), _react2.default.createElement(_victory.VictoryAxis, {
        style: {
          ticks: { stroke: 'grey', size: 1 },
          tickLabels: { fontSize: 6, padding: 5 }
        },
        dependentAxis: true
      }), _react2.default.createElement(_victory.VictoryGroup, {
        horizontal: true,
        offset: 6,
        style: { data: { width: 5 } },
        colorScale: ['brown', 'tomato', 'gold', 'green', 'red']
      }, planData.map(function (planBar, index) {
        return _react2.default.createElement(_victory.VictoryBar, {
          key: 'bartype-' + index,
          data: planBar
        });
      }))));
    }
  }]);

  return RangePrices;
}(_react2.default.Component);

RangePrices.propTypes = {
  data: _propTypes2.default.objectOf(_propTypes2.default.arrayOf(_propTypes2.default.objectOf(_propTypes2.default.number))).isRequired
};

exports.default = RangePrices;