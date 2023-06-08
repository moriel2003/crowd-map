import React, { Component, useState } from 'react';
import Areas from '../data/Areas.json';
import "leaflet/dist/leaflet.css";
import '../My_map.css';
import L from 'leaflet';
import defaultMarkerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Popup } from 'react-leaflet';



import { MapContainer ,GeoJSON , Marker} from "react-leaflet";

class MyMap extends Component {



  areasStyle = {
    fillColor: "red",
    fillOpacity: 0.8,
    color: "black",
    weight: 2,
  };

  onEachArea = (area, layer) => {
    const areaName = area.properties.name;
    areaName=="pin"?layer.bindPopup(""):layer.bindPopup(areaName);
   

    layer.on({
     
 
      mouseover: (event) => {
        if (event.target.setStyle) {
          event.target.setStyle({ color: "white" });
        }
      },
      mouseout: (event) => {
        if (event.target.setStyle) {
          event.target.setStyle({ color: "black" });
        }
      }
    });
  };

  getColorsByRate = (rate) => {
    if (rate >= 1 && rate <= 4)
      return "green";
    else if (rate >= 5 && rate <= 7)
      return "yellow";
    else if (rate >= 8 && rate <= 10)
      return "red";
    else
      return "grey";
  };

  getFillColor = (area) => {
    const rateProperty = area.properties.rate;
    let color = this.getColorsByRate(rateProperty);
    return color || "gray";
  };

  render() {
    const markerIcon = L.icon({
      iconUrl: defaultMarkerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    return (
      <div>
        <div style={{ width: "30%", float: "right", padding: "10px" }}>
          <h2>welcome to {this.props.parkName}!</h2>
          <p>{this.props.parkDescription}</p>
          <p>Date: {this.props.date}</p>
          <p>{this.props.location}</p>
          <p>Expected number of participants: {this.props.ExpectedAmount}</p>
        </div>
        <MapContainer style={{ height: "80vh" }} center={[31.7499, 35.2111]} zoom={15.5}>
          <GeoJSON
            style={(area) => ({
              ...this.areasStyle,
              fillColor: this.getFillColor(area),
            })}
            data={Areas.features}
            onEachFeature={this.onEachArea}
          />
         <Marker position={[31.749899765580693, 35.210716271954595]} icon={markerIcon} title="">
         <Popup keepInView={true}>
          you're here!
          </Popup>
         </Marker>

        </MapContainer>
      </div>
    );
  }
}

export default MyMap;


