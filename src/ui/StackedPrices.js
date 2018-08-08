import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryAxis,
  VictoryChart,
  VictoryArea,
  VictoryGroup,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryLegend,
  VictoryTooltip,
} from 'victory';

import { COLOR_PALETTE } from './Constants';

const categories = ['unprecio', 'dosprecios', 'multiprecio'];

class StackedPrices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unprecio: true,
      dosprecios: true,
      multiprecio: true,
    };
    this.handleTogglePlan = this.handleTogglePlan.bind(this);
    this.generateBlacklist = this.generateBlacklist.bind(this);
    this.generatePlanData = this.generatePlanData.bind(this);
  }

  handleTogglePlan(plan) {
    switch (plan) {
      case 'unprecio':
        this.setState(() => ({
          unprecio: !this.state.unprecio,
        }));
        break;
      case 'dosprecios':
        this.setState(() => ({
          dosprecios: !this.state.dosprecios,
        }));
        break;
      case 'multiprecio':
        this.setState(() => ({
          multiprecio: !this.state.multiprecio,
        }));
        break;
      default:
        break;
    }
  }

  generateBlacklist() {
    const blackList = [];

    categories.forEach((category) => {
      if (!this.state[`${category}`]) {
        blackList.push(category);
      }
    });
    return blackList;
  }

  generatePlanData(plan) {
    const arrData = [];
    let step = 0;
    const prices = plan.map(item => (Object.values(item)[0]));
    const stepsRange = plan.map(item =>
      (Object.keys(item)[0].split('-')));
    const steps = stepsRange.map(range =>
      (Math.abs(parseInt(range[0], 10) - parseInt(range[1], 10)) + 1));
    let count = steps[0];
    for (let x = 0; x <= 23; x++) {
      if (count === 0) {
        step++;
        count = steps[step] - 1;
      } else {
        count--;
      }

      arrData.push({
        x: x.toString(),
        y: prices[step],
      });
    }
    return arrData;
  }

  render() {
    const voronoiBlacklist = this.generateBlacklist();
    const { data, interpolation } = this.props;
    const unPrecioData = this.generatePlanData(data.unprecio);
    const dosPreciosData = this.generatePlanData(data.dosprecios);
    const multiPreciosData = this.generatePlanData(data['3.0a']);
    return (
      <React.Fragment>
        <VictoryChart
          height={200}
          width={300}
          theme={VictoryTheme.material}
          domain={{ x: [0, 23] }}
          domainPadding={20}
          containerComponent={<VictoryVoronoiContainer voronoiBlacklist={voronoiBlacklist} />}
        >
          <VictoryLegend
            groupComponent={<g data-cy="legend" />}
            x={70}
            y={0}
            title="Price plans"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{
              title: { fontSize: 8 },
              labels: { fontSize: 6 },
            }}
            events={[{
              target: 'data',
              eventHandlers: {
                onClick: () => (
                  [
                    {
                      target: 'data',
                      mutation: (props) => {
                        const { fill } = props.style;
                        switch (fill) {
                          case COLOR_PALETTE.consumer:
                            this.handleTogglePlan('unprecio');
                            break;
                          case COLOR_PALETTE.social:
                            this.handleTogglePlan('dosprecios');
                            break;
                          case COLOR_PALETTE.business:
                            this.handleTogglePlan('multiprecio');
                            break;
                          default:
                            break;
                        }
                      },
                    },
                  ]
                ),
              },
            },
              {
                target: 'labels',
                eventHandlers: {
                  onClick: () => (
                    [
                      {
                        target: 'data',
                        mutation: (props) => {
                          const { fill } = props.style;
                          switch (fill) {
                            case COLOR_PALETTE.consumer:
                              this.handleTogglePlan('unprecio');
                              break;
                            case COLOR_PALETTE.social:
                              this.handleTogglePlan('dosprecios');
                              break;
                            case COLOR_PALETTE.business:
                              this.handleTogglePlan('multiprecio');
                              break;
                            default:
                              break;
                          }
                        },
                      },
                    ]
                  ),
                },
              },
            ]}
            data={[
              { name: 'unprecio', symbol: { fill: COLOR_PALETTE.consumer } },
              { name: 'dosprecios', symbol: { fill: COLOR_PALETTE.social } },
              { name: '3.0a', symbol: { fill: COLOR_PALETTE.business } },
            ]}
          />
          <VictoryAxis
            groupComponent={<g data-cy="axis-x" />}
            label="Hour"
            style={{
              axisLabel: { fontSize: 6, padding: 20 },
              ticks: { stroke: 'grey', size: 1 },
              tickLabels: { fontSize: 4, padding: 5 },
            }}
            tickValues={[0, 1, 2, 3, 4, 5, 6, 7,
              8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
            tickFormat={['0', '1', '2', '3', '4', '5', '6', '7',
              '8', '9', '10', '11', '12', '13', '14', '15',
              '16', '17', '18', '19', '20', '21', '22', '23']}
          />
          <VictoryAxis
            groupComponent={<g data-cy="axis-y" />}
            label="€/kWh"
            style={{
              axisLabel: { fontSize: 6, padding: 30 },
              ticks: { stroke: 'grey', size: 1 },
              tickLabels: { fontSize: 6, padding: 5 },
            }}
            tickValues={[0.000, 0.025, 0.050, 0.075, 0.100, 0.125, 0.150, 0.175, 0.200]}
            tickFormat={['0.000', '0.025', '0.050', '0.075', '0.100', '0.125', '0.150', '0.175', '0.200']}
            dependentAxis
          />
          <VictoryGroup
            groupComponent={<g data-cy="area" />}
            labels={d => `${d.y}€`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 6, fill: COLOR_PALETTE.consumer }}
                flyoutStyle={{ strokeWidth: 0.5, stroke: COLOR_PALETTE.consumer, fill: 'white' }}
              />
            }
            style={{
              data: {
                strokeWidth: this.state.unprecio ? 1 : 0,
                fillOpacity: this.state.unprecio ? 0.8 : 0.0,
              },
            }}
          >
            <VictoryArea
              groupComponent={<g data-cy="area-unprecio" />}
              name="unprecio"
              standalone
              interpolation={interpolation}
              style={{
                data: { fill: COLOR_PALETTE.consumer, stroke: COLOR_PALETTE.consumer },
              }}
              data={unPrecioData}
            />
          </VictoryGroup>
          <VictoryGroup
            groupComponent={<g data-cy="area" />}
            labels={d => `${d.y}€`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 6, fill: COLOR_PALETTE.social }}
                flyoutStyle={{ strokeWidth: 0.5, stroke: COLOR_PALETTE.social, fill: 'white' }}
              />
            }
            style={{
              data: {
                strokeWidth: this.state.dosprecios ? 1 : 0,
                fillOpacity: this.state.dosprecios ? 0.8 : 0.0,
              },
            }}
          >
            <VictoryArea
              groupComponent={<g data-cy="area-dosprecios" />}
              name="dosprecios"
              standalone
              interpolation={interpolation}
              style={{
                data: { fill: COLOR_PALETTE.social, stroke: COLOR_PALETTE.social },
              }}
              data={dosPreciosData}
            />
          </VictoryGroup>
          <VictoryGroup
            groupComponent={<g data-cy="area" />}
            labels={d => `${d.y}€`}
            labelComponent={
              <VictoryTooltip
                active={false}
                style={{ fontSize: 6, fill: COLOR_PALETTE.business }}
                flyoutStyle={{ strokeWidth: 0.5, stroke: COLOR_PALETTE.business, fill: 'white' }}
              />
            }
            style={{
              data: {
                strokeWidth: this.state.multiprecio ? 1 : 0,
                fillOpacity: this.state.multiprecio ? 0.8 : 0.0,
              },
            }}
          >
            <VictoryArea
              groupComponent={<g data-cy="area-multiprecio" />}
              name="multiprecio"
              standalone
              interpolation={interpolation}
              style={{
                data: { fill: COLOR_PALETTE.business, stroke: COLOR_PALETTE.business },
              }}
              data={multiPreciosData}
            />
          </VictoryGroup>
        </VictoryChart>
      </React.Fragment>
    );
  }
}

StackedPrices.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number))).isRequired,
  interpolation: PropTypes.string,
};

StackedPrices.defaultProps = {
  interpolation: 'stepAfter',
};

export default StackedPrices;
