import React from 'react';
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import Dialog from "./components/Dialog";
import { v4 as uuidv4 } from 'uuid';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

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
              <Dialog />
              <Canvas width={1000} height={600}/>
            </div>

          </Route>
          <Redirect to={uuidv4()} />
        </Switch>
      </div>
    </BrowserRouter>
  );

}

export default App;
