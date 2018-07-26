import React, { Component } from "react";
import Chart from "chart.js";
var jsonData = require('../assets/hotels.json');

class DisplayGraph extends Component {
  componentDidMount(){
    var data = jsonData.reduce( (acc, o) => (acc[o.rating] = (acc[o.rating] || 0)+1, acc), {} );

    var ratings = Object.keys(data);
    var frequency = ratings.map(function (k) {
      return data[k];
    });

    let myChart = document.getElementById('myChart').getContext('2d');

    let massPopChart = new Chart(myChart, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:ratings,
        datasets:[{
          label:'Hotels',
          data:frequency,
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(0,128,0, 0.6)',
            'rgba(128,128,0, 0.6)',
            'rgba(255, 0, 64, 0.6)',
            'rgba(107, 132, 159, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Ratings'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Hotel Count'
            }
          }]
        },
        title:{
          display:true,
          text:'Bar Chart',
          fontSize:48
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
  }

  render() {
    return (
      <div class="container">
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}

export default DisplayGraph;
