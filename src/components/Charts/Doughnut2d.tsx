// STEP 1 - Include Dependencies
// Include react
import React from "react";

// const chartData = [
//   {
//     label: "HTML",
//     value: "13",
//   },
//   {
//     label: "CSS",
//     value: "23",
//   },
//   {
//     label: "JavaScript",
//     value: "80",
//   },
//   {
//     label: "Iran",
//     value: "140",
//   },
// ];

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

import ChartDataType from "../../types/ChartDataType";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data: the data that will be rendered.

function ChartComponent({ data }: { data: ChartDataType }) {
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Stars Per Langauge",
        //Set the theme for your chart
        decimals: 0,
        doughnutRadius: "45%",
        showPercentValues: 0,
        theme: "candy",
      },
      // Chart Data
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}

export default ChartComponent;
