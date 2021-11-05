import React from 'react';
import './App.css';


import HamsterList from './components/hamsters/HamsterList';
import { Link, Switch, Route } from 'react-router-dom'
import Compeat from './components/compeat/Compeat';
import Gallery from './components/gallery/gallery';
import Statistic from './components/statistic/Statistic';
import History from './components/history/History';
import BadUrl from './components/BadUrl';



function App() {


  return (
    <div className="App">
      <header>
<nav>

  
<Link to="/">Start</Link>
  <Link to="/tavla">Tävla</Link>
  <Link to="/galleri">Galleri</Link>
  <Link to="/statistik">Statistik</Link>
  <Link to="/historik">Historik</Link>
</nav>
      </header>
     
<main>
  <Switch>

  <Route path="/" exact>
  <HamsterList />
  </Route>
 
<Route path="/tavla" exact>
  <Compeat />
</Route>

<Route path="/galleri" exact>
  <Gallery />
</Route>

<Route path="/statistik" exact>
  <Statistic />
</Route>

<Route path="/historik" exact>
 <History />
</Route>

<Route path="/">
  <BadUrl />
</Route>

  </Switch>
</main>
    </div>
  );
}

export default App;
