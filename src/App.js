import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import ModalForm from "./components/ModalForm";

function App() {

  return (
    <BrowserRouter>
      <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Switch>
          <Route path='/:id'>

            <div style={{position: 'fixed', top: '0', width: '100%'}}>
              <Toolbar/>
            </div>

            <div style={{outline: '2px solid #f7f7fa', cursor: 'crossHair'}}>
              <Canvas width={1000} height={600}/>
              <ModalForm />
            </div>

          </Route>
          <Redirect to={`f${(+new Date).toString(16)}`} />
        </Switch>
      </div>
    </BrowserRouter>
  );

}

export default App;
