import React, { Component } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
var jsonData = require('../assets/hotels.json');

class DisplayMap extends Component {
  constructor() {
    super()
    this.state = {
      mapData: [],
      hotels: jsonData,
    }

    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleHotelClick = this.handleHotelClick.bind(this)
  }

  projection() {
    return geoMercator()
      .center([72.851116992620, 19.130571737966])
      .scale(150000)
      .translate([800 / 2, 500 / 2])
  }

  handleMapClick() {
    console.log("Clicked on the map");
  }

  handleHotelClick(i) {
    console.log(("Hotel Info: ", this.state.hotels[i]))
  }

  componentDidMount() {
    fetch("/Maharashtra.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`Error: ${response.status}`)
          return
        }
        response.json().then(mapData => {
          this.setState({ mapData: feature(mapData, mapData.objects.Maharashtra).features })
        })
      })
  }

  render() {
    return (
      < svg width={ 800 } height={ 1000 } viewBox = "0 0 800 1000" >
      < g >
      {
        this.state.mapData.map((d, i) => (
          < path
            key = {`key-${ i }`}
            d = { geoPath().projection(this.projection())(d) }
            fill = {`rgba(158,250,156,${ 1 / this.state.mapData.length * i})`}
            stroke = "#FFFFFF"
            strokeWidth = { 0.5 }
            onClick = { () => this.handleMapClick() }
          />
        ))
      }
      </g>
      <g>
      {
        this.state.hotels.map((city, i) => (
        < circle
          key = { city.id }
          cx = { this.projection()([parseFloat(city.longitude), parseFloat(city.latitude)])[0] }
          cy = { this.projection()([parseFloat(city.longitude), parseFloat(city.latitude)])[1] }
          r = { parseInt(city.rating) + 2 }
          fill = "#E92E23"
          onClick = { () => this.handleHotelClick(i) }
        />
        ))
      }
    </g>
    </svg>
    )
  }
}

export default DisplayMap;