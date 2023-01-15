import {Scatter} from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Scatter Dataset',
    data: generateData(100), // call the function to generate the data
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    pointStyle: 'circle',
    pointRadius: 5,
  }]
};
const options = {
  plugins: {
    tooltip: {
      enabled: false,
      intersect: false,
      callbacks: {
        label: function (context) {
          let label = data.labels[context.datasetIndex];
          return (
            label +
            ",  " +
            context.parsed.x +
            ",  " +
            context.parsed.y
          );
        }
      },
      external: function(context) {
          var tooltipModel = context.tooltip;
          // Tooltip Element
          var tooltipEl = document.getElementById('chartjs-tooltip');
  
          // Create element on first render
          if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              // tooltipEl.classList.add("scrollbar");
              document.body.appendChild(tooltipEl);
          }
  
          function getBody(bodyItem) {
              return bodyItem.lines;
          }
  
          // Set Text
          if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);
  
              var innerHtml = '<thead>';
  
              titleLines.forEach(function(title) {
                  innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody >';
  
              bodyLines.forEach(function(body, i) {
                  var colors = tooltipModel.labelColors[i];
                  var style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px !important';
                  style += '; width: 10px !important';
                  style += '; height: 10px !important';
                  style += '; display: inline-block !important';
                  style += '; margin-right: 3px !important';
                  var box = `<span style="${style}"></span>`
                  innerHtml += `<tr><td>${box}${body}</td></tr>`;
  
              });
              innerHtml += '</tbody>';
  
              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
          }
  
          // `this` will be the overall tooltip
          var position = this.chart.canvas.getBoundingClientRect();
  
          // Display, position, and set styles for font
          tooltipEl.style.opacity = 1;
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
          tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
          tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
          // tooltipEl.style.pointerEvents = 'none'; // Use when need to stop mouse events such as Onhover and Scrolling
          tooltipEl.style.borderColor = 'blue';
          tooltipEl.style.borderRadius = '4px';
          tooltipEl.style.backgroundColor = "white";
          tooltipEl.style.maxHeight = "100px";
          tooltipEl.style.overflowY = "auto";
          tooltipEl.style.scrollBehavior = "smooth";   
     }
    },
  },
  scales: {
    x: {
      label: 'X-axis',
      min: 0,
      max: 20
    },
    y: {
      label: 'Y-axis',
      min: 0,
      max: 100
    }
  }
};
function generateData(n) {
  let data = [];
  for (let i = 0; i < n; i++) {
    data.push({
      // x: Math.random() * 20,
      // y: Math.random() * 100
      x: 2,
      y: 70
    });
  }
  return data;
}
function Chart() {
  return (
    <div>
      <h2>Scatter Chart Example</h2>
      <Scatter data={data} options={options} />
    </div>
  );
} 


  export default Chart;