import './Sidebar.css';

function Sidebar() {
  return (
    <div className="Sidebar">
      <h1>Stickermap</h1>
      <p>Agreguen las ubicaciones de los stickers.</p>
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
    </div>
  );
}

export default Sidebar;
