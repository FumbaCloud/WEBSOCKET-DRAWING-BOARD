import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

function App() {

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

      <div style={{position: 'fixed', top: '0', width: '100%'}}>
        <Toolbar />
      </div>

      <div style={{outline: '2px solid #f7f7fa', cursor: 'crossHair'}}>
        <Canvas width={1000} height={600} />
      </div>

    </div>
  );

}

export default App;
