import React from 'react';
import './App.css';
import {useState, useEffect} from 'react'
import {Hamster} from './models/Models'
import axios from 'axios'
import { useStateIfMounted} from 'use-state-if-mounted'

import HamsterList from './components/hamsters/HamsterList';
import { Link, Switch, Route } from 'react-router-dom'
import Compeat from './components/compeat/Compeat';
import Gallery from './components/gallery/gallery';
import Statistic from './components/statistic/Statistic';
import History from './components/history/History';
import BadUrl from './components/BadUrl';
import Fullinfo from './components/gallery/Fullinfo'



function App() {

  const [data, setData] = useState<Hamster[] | []>([])

  useEffect(() => {
    axios.get('/hamsters')
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
,[])

console.log(data)
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
  <Gallery data={data} setData={setData} />
</Route>

<Route path="/statistik" exact>
  <Statistic />
</Route>

<Route path="/historik" exact>
 <History />
</Route>

<Route path="/info/:id" exact>
<Fullinfo data={data} />
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
