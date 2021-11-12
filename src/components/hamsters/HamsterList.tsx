import { useState, useEffect } from 'react'
import axios from 'axios'
import {Hamster} from '../../models/Models'

const HamsterList = () => {

// setstate
const [data, setData] = useState<Hamster[] | null>(null)

// fetching cutest hamster
const fetchCutest = () => {
  axios.get('/hamsters/cutest')
  .then(res => {
    setData(res.data)
  })
  .catch(err => {
    console.log(err)
  })
}

// calling fetchCutest
useEffect(() => {
fetchCutest()
// comment to avoid warning
  }
,[])

// return first object (if cutest array is > 1)
let a
let dataArray: any = []
let newArray;

if (data) {
  [a] = data
newArray = [...dataArray, a]
}



console.log(a)

return(
<section>
{newArray ? 
newArray.map((hamster: any) => (
  <section key={hamster.name}>
  <h3>CURRENT CHAMPION</h3>
    <p>{hamster.name}</p>
    <img src={'/img/' + hamster.imgName} className="img-class" alt={hamster.name} width="300px" height="300px" />
  </section> 
 ))
 :
 <section>
 <p>Laddar..</p>
 <article className="reload-art">
 <p>Tar det för lång tid?</p>
 <button onClick={fetchCutest}>Ladda om</button>
 </article>
 </section>
 } 
 </section>
 )
 }
 
 export default HamsterList