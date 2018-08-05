import React from 'react';
import glamorous from 'glamorous';

import { VictoryAxis, VictoryChart, VictoryGroup, VictoryBar, VictoryTheme, VictoryLabel } from 'victory';

const RangePrices = props => (
  <React.Fragment>
    <VictoryChart
      animate={{
        duration: 2000,
        onLoad: { duration: 1000 }
      }}
      height={200}
      width={300}
      theme={VictoryTheme.material}
      domain={{ x: [0, 23] }}
      domainPadding={20}
      categories={{
        x: props.categories,
      }}
    >
      <VictoryAxis
        label="Hora del día"
        style={{
          axisLabel: {fontSize: 6, padding: 20},
          ticks: {stroke: "grey", size: 1},
          tickLabels: {fontSize: 4, padding: 5}
        }}
        tickValues={[0, 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
        tickFormat={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]}
      />
      <VictoryAxis
        style={{
          ticks: {stroke: "grey", size: 1},
          tickLabels: {fontSize: 6, padding: 5}
        }}
        dependentAxis
      />
      <VictoryGroup
        horizontal
        offset={6}
        style={{ data: { width: 5 } }}
        colorScale={["brown", "tomato", "gold", "green", "red"]}
      >
        <VictoryBar
          data={[
            { x: 3, y: 23 },
            { x: 2, y: 14 },
            { x: 1, y: 7 },
          ]}
        />
        <VictoryBar
          data={[
              { x: 2, y: 14, y0: 23 },
              { x: 1, y: 7, y0: 12 },
          ]}
        />
        <VictoryBar
          data={[

          ]}
        />
        <VictoryBar
          data={[

          ]}
        />
        <VictoryBar
          data={[

          ]}
        />
      </VictoryGroup>
    </VictoryChart>
  </React.Fragment>
);

export default RangePrices;

