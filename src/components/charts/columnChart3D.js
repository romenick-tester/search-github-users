import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ColumnChart3D = ({data}) => {
  const chartConfigs = {
    type: "column3d",
    width: "100%",
    height: 400,
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: "Most Popular",
        xAxisName: "Repos",
        yAxisName: "Stars",
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

export default ColumnChart3D;