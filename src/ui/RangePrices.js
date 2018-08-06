import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
} from 'victory';

const planNames = ['unprecio', 'dosprecios', '3.0a'];

class RangePrices extends React.Component {
  constructor(props) {
    super(props);
    this.generatePlanData = this.generatePlanData.bind(this);
  }

  generatePlanData(plans) {
    const arrData = [];
    const maxBars = Object.keys(plans['3.0a']).length;

    for (let x = 0; x < maxBars; x++) {
      const arrBar = [];
      let count = 3;
      for (let y = 0; y < planNames.length; y++) {
        if (typeof (plans[planNames[y]][x]) !== 'undefined') {
          arrBar.push({
            x: count,
            y0: parseInt(Object.keys(plans[planNames[y]][x])[0].split('-')[0], 10) !== 0
              ? parseInt(Object.keys(plans[planNames[y]][x])[0].split('-')[0], 10) - 1
              : 0,
            y: parseInt(Object.keys(plans[planNames[y]][x])[0].split('-')[1], 10),
          });
        }
        count--;
      }
      arrData[x] = arrBar;
    }
    return arrData;
  }

  render() {
    const { data } = this.props;
    const planData = this.generatePlanData(data);
    return (
      <React.Fragment>
        <VictoryChart
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          height={200}
          width={300}
          theme={VictoryTheme.material}
          domain={{ x: [0, 23] }}
          domainPadding={20}
          categories={{
            x: planNames.reverse(),
          }}
        >
          <VictoryAxis
            label="Hora del día"
            style={{
              axisLabel: { fontSize: 6, padding: 20 },
              ticks: { stroke: 'grey', size: 1 },
              tickLabels: { fontSize: 4, padding: 5 },
            }}
            tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
              13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
            tickFormat={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
              '10', '11', '12', '13', '14', '15', '16',
              '17', '18', '19', '20', '21', '22', '23']}
          />
          <VictoryAxis
            style={{
              ticks: { stroke: 'grey', size: 1 },
              tickLabels: { fontSize: 6, padding: 5 },
            }}
            dependentAxis
          />
          <VictoryGroup
            horizontal
            offset={6}
            style={{ data: { width: 5 } }}
            colorScale={['brown', 'tomato', 'gold', 'green', 'red']}
          >
            {planData.map((planBar, index) => (
              <VictoryBar
                key={`bartype-${index}`}
                data={planBar}
              />
            ))}
          </VictoryGroup>
        </VictoryChart>
      </React.Fragment>
    );
  }
}

RangePrices.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number))).isRequired,
};

export default RangePrices;

