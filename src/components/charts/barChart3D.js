import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const BarChart2D = ({data}) => {
  const chartConfigs = {
    type: "bar3d",
    width: "100%",
    height: 400,
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: "Most Forked",
        xAxisName: "Repos",
        yAxisName: "Forks",
        xAxisNameFontSize: "16px",
        yAxisNameFontSize: "16px"
      },
      data
    },
  };

  return (
    <ReactFC {...chartConfigs} />
  )
}

export default BarChart2D;