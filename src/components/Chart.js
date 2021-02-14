import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC1 from 'react-fusioncharts';
import ReactFC2 from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import { pieChartData } from "./chartData"

ReactFC1.fcRoot(FusionCharts, Charts, CandyTheme);
ReactFC2.fcRoot(FusionCharts, Charts, FusionTheme);

const Chart = ({ id, data, type }) => {
  const chartConfigs = {
    type,
    width: "100%",
    height: 400,
    dataFormat: 'json',
    dataSource: {...data},
  };
  
  if(id === 2) {
    return <ReactFC1 {...chartConfigs} />
  } 
  
  return (
    <ReactFC2 {...chartConfigs} />
  )
}

Chart.defaultProps = {
  type: "pie2d",
  data: pieChartData,
  id: (Math.floor(Math.random() * 9) + 1) + (Math.floor(Math.random() * 9) + 1)
}

export default Chart;
