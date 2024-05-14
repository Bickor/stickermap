import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" style={{ height: '100vh', width: '20%', float: "left" }}>
      <h1>Stickermap</h1>
      <p>Stickers!!</p>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style={{ float: "left" }}></input>
      <div style={{ float: "left" }}>Add Marker</div>
    </div>
  );
}

export default App;
