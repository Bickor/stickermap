import React from "react";
import "./Sidebar.css";

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="Sidebar">
        <h1>Stickermap</h1>
        <p>Agreguen las ubicaciones de los stickers.</p>
        <h3>Controles</h3>
        <div className="checkbox-wrapper">
          <div>
            <input type="checkbox" id="add" />
            <label htmlFor="add">Agregar Marcador</label>
          </div>
          <div>
            <input type="checkbox" id="remove" />
            <label htmlFor="remove">Borrar Marcador</label>
          </div>
        </div>
        <h3>Estadisticas</h3>
        <div className="Counter">
          <p>Tenemos un total de {this.props.totalMarkers} marcadores.</p>
        </div>
      </div>
    );
  }
}
