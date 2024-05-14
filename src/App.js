import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '20%', float: "left" }}>
      <h1>Stickermap</h1>
      <p>Stickers!!</p>
      <div style={{ float: "center" }}>
        <div>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{ float: "left" }}></input>
          <div style={{ float: "left" }}>Add Marker</div>
        </div>
        <div>
          <input type="checkbox" id="vehicle2" name="vehicle2" value="Bike" style={{ float: "left" }}></input>
          <div style={{ float: "left" }}>Remove Marker</div>
        </div>
      </div>

    </div>
  );
}

export default App;
