import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const PieChart2D = ({data}) => {
  const chartConfigs = {
    type: "pie2d",
    width: "100%",
    height: 400,
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: "Used Languages",
        pieRadius: "50%",
        numberSuffix: "%",
        decimals: 0,
        theme: "fusion",
      },
      data
    },
  };

  return (
    <ReactFC {...chartConfigs} />
  )
}

export default PieChart2D;
