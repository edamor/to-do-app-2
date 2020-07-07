import React from 'react';
import { 
  BrowserRouter, 
  Route, 
  Switch } from 'react-router-dom';
import Child from './routes/Child';
import Nav from './components/Nav';



function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">

        <Nav />

        <Switch>
          <Route exact path="/" children={<Child />} />
          <Route path="/:page" children={<Child/>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;