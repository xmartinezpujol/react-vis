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

var _Constants = require('./Constants');

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

var categories = ['unprecio', 'dosprecios', 'multiprecio'];

var StackedPrices = function (_React$Component) {
  _inherits(StackedPrices, _React$Component);

  function StackedPrices(props) {
    _classCallCheck(this, StackedPrices);

    var _this = _possibleConstructorReturn(this, (StackedPrices.__proto__ || Object.getPrototypeOf(StackedPrices)).call(this, props));

    _this.state = {
      unprecio: true,
      dosprecios: true,
      multiprecio: true
    };
    _this.handleTogglePlan = _this.handleTogglePlan.bind(_this);
    _this.generateBlacklist = _this.generateBlacklist.bind(_this);
    _this.generatePlanData = _this.generatePlanData.bind(_this);
    return _this;
  }

  _createClass(StackedPrices, [{
    key: 'handleTogglePlan',
    value: function handleTogglePlan(plan) {
      var _this2 = this;

      switch (plan) {
        case 'unprecio':
          this.setState(function () {
            return {
              unprecio: !_this2.state.unprecio
            };
          });
          break;
        case 'dosprecios':
          this.setState(function () {
            return {
              dosprecios: !_this2.state.dosprecios
            };
          });
          break;
        case 'multiprecio':
          this.setState(function () {
            return {
              multiprecio: !_this2.state.multiprecio
            };
          });
          break;
        default:
          break;
      }
    }
  }, {
    key: 'generateBlacklist',
    value: function generateBlacklist() {
      var _this3 = this;

      var blackList = [];

      categories.forEach(function (category) {
        if (!_this3.state['' + category]) {
          blackList.push(category);
        }
      });
      return blackList;
    }
  }, {
    key: 'generatePlanData',
    value: function generatePlanData(plan) {
      var arrData = [];
      var step = 0;
      var prices = plan.map(function (item) {
        return Object.values(item)[0];
      });
      var stepsRange = plan.map(function (item) {
        return Object.keys(item)[0].split('-');
      });
      var steps = stepsRange.map(function (range) {
        return Math.abs(parseInt(range[0], 10) - parseInt(range[1], 10)) + 1;
      });
      var count = steps[0];
      for (var x = 0; x <= 23; x++) {
        if (count === 0) {
          step++;
          count = steps[step] - 1;
        } else {
          count--;
        }

        arrData.push({
          x: x.toString(),
          y: prices[step]
        });
      }
      return arrData;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var voronoiBlacklist = this.generateBlacklist();
      var _props = this.props,
          data = _props.data,
          interpolation = _props.interpolation;

      var unPrecioData = this.generatePlanData(data.unprecio);
      var dosPreciosData = this.generatePlanData(data.dosprecios);
      var multiPreciosData = this.generatePlanData(data['3.0a']);
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_victory.VictoryChart, {
        height: 200,
        width: 300,
        theme: _victory.VictoryTheme.material,
        domain: { x: [0, 23] },
        domainPadding: 20,
        containerComponent: _react2.default.createElement(_victory.VictoryVoronoiContainer, { voronoiBlacklist: voronoiBlacklist })
      }, _react2.default.createElement(_victory.VictoryLegend, {
        x: 70,
        y: 0,
        title: 'Price plans',
        centerTitle: true,
        orientation: 'horizontal',
        gutter: 20,
        style: {
          title: { fontSize: 8 },
          labels: { fontSize: 6 }
        },
        events: [{
          target: 'data',
          eventHandlers: {
            onClick: function onClick() {
              return [{
                target: 'data',
                mutation: function mutation(props) {
                  var fill = props.style.fill;

                  switch (fill) {
                    case _Constants.COLOR_PALETTE.consumer:
                      _this4.handleTogglePlan('unprecio');
                      break;
                    case _Constants.COLOR_PALETTE.social:
                      _this4.handleTogglePlan('dosprecios');
                      break;
                    case _Constants.COLOR_PALETTE.business:
                      _this4.handleTogglePlan('multiprecio');
                      break;
                    default:
                      break;
                  }
                }
              }];
            }
          }
        }, {
          target: 'labels',
          eventHandlers: {
            onClick: function onClick() {
              return [{
                target: 'data',
                mutation: function mutation(props) {
                  var fill = props.style.fill;

                  switch (fill) {
                    case _Constants.COLOR_PALETTE.consumer:
                      _this4.handleTogglePlan('unprecio');
                      break;
                    case _Constants.COLOR_PALETTE.social:
                      _this4.handleTogglePlan('dosprecios');
                      break;
                    case _Constants.COLOR_PALETTE.business:
                      _this4.handleTogglePlan('multiprecio');
                      break;
                    default:
                      break;
                  }
                }
              }];
            }
          }
        }],
        data: [{ name: 'unprecio', symbol: { fill: _Constants.COLOR_PALETTE.consumer } }, { name: 'dosprecios', symbol: { fill: _Constants.COLOR_PALETTE.social } }, { name: '3.0a', symbol: { fill: _Constants.COLOR_PALETTE.business } }]
      }), _react2.default.createElement(_victory.VictoryAxis, {
        label: 'Hour',
        style: {
          axisLabel: { fontSize: 6, padding: 20 },
          ticks: { stroke: 'grey', size: 1 },
          tickLabels: { fontSize: 4, padding: 5 }
        },
        tickValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        tickFormat: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
      }), _react2.default.createElement(_victory.VictoryAxis, {
        label: "\u20AC/kWh",
        style: {
          axisLabel: { fontSize: 6, padding: 30 },
          ticks: { stroke: 'grey', size: 1 },
          tickLabels: { fontSize: 6, padding: 5 }
        },
        tickValues: [0.000, 0.025, 0.050, 0.075, 0.100, 0.125, 0.150, 0.175, 0.200],
        tickFormat: ['0.000', '0.025', '0.050', '0.075', '0.100', '0.125', '0.150', '0.175', '0.200'],
        dependentAxis: true
      }), _react2.default.createElement(_victory.VictoryGroup, {
        labels: function labels(d) {
          return d.y + "\u20AC";
        },
        labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
          style: { fontSize: 6, fill: _Constants.COLOR_PALETTE.consumer },
          flyoutStyle: { strokeWidth: 0.5, stroke: _Constants.COLOR_PALETTE.consumer, fill: 'white' }
        }),
        style: {
          data: {
            strokeWidth: this.state.unprecio ? 1 : 0,
            fillOpacity: this.state.unprecio ? 0.8 : 0.0
          }
        }
      }, _react2.default.createElement(_victory.VictoryArea, {
        name: 'unprecio',
        standalone: true,
        interpolation: interpolation,
        style: {
          data: { fill: _Constants.COLOR_PALETTE.consumer, stroke: _Constants.COLOR_PALETTE.consumer }
        },
        data: unPrecioData
      })), _react2.default.createElement(_victory.VictoryGroup, {
        labels: function labels(d) {
          return d.y + "\u20AC";
        },
        labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
          style: { fontSize: 6, fill: _Constants.COLOR_PALETTE.social },
          flyoutStyle: { strokeWidth: 0.5, stroke: _Constants.COLOR_PALETTE.social, fill: 'white' }
        }),
        style: {
          data: {
            strokeWidth: this.state.dosprecios ? 1 : 0,
            fillOpacity: this.state.dosprecios ? 0.8 : 0.0
          }
        }
      }, _react2.default.createElement(_victory.VictoryArea, {
        name: 'dosprecios',
        standalone: true,
        interpolation: interpolation,
        style: {
          data: { fill: _Constants.COLOR_PALETTE.social, stroke: _Constants.COLOR_PALETTE.social }
        },
        data: dosPreciosData
      })), _react2.default.createElement(_victory.VictoryGroup, {
        labels: function labels(d) {
          return d.y + "\u20AC";
        },
        labelComponent: _react2.default.createElement(_victory.VictoryTooltip, {
          active: false,
          style: { fontSize: 6, fill: _Constants.COLOR_PALETTE.business },
          flyoutStyle: { strokeWidth: 0.5, stroke: _Constants.COLOR_PALETTE.business, fill: 'white' }
        }),
        style: {
          data: {
            strokeWidth: this.state.multiprecio ? 1 : 0,
            fillOpacity: this.state.multiprecio ? 0.8 : 0.0
          }
        }
      }, _react2.default.createElement(_victory.VictoryArea, {
        name: 'multiprecio',
        standalone: true,
        interpolation: interpolation,
        style: {
          data: { fill: _Constants.COLOR_PALETTE.business, stroke: _Constants.COLOR_PALETTE.business }
        },
        data: multiPreciosData
      }))));
    }
  }]);

  return StackedPrices;
}(_react2.default.Component);

StackedPrices.propTypes = {
  data: _propTypes2.default.objectOf(_propTypes2.default.arrayOf(_propTypes2.default.objectOf(_propTypes2.default.number))).isRequired,
  interpolation: _propTypes2.default.string
};

StackedPrices.defaultProps = {
  interpolation: 'stepAfter'
};

exports.default = StackedPrices;