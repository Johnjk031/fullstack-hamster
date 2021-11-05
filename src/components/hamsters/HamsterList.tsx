import { useState, useEffect } from 'react'
import axios from 'axios'

import {Hamster} from '../../models/Models'

const HamsterList = () => {

  const [data, setData] = useState<Hamster[] | null>(null)


useEffect(() => {
    axios.get('/hamsters/cutest')
    .then(res => {
      setData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
,[])

console.log(data)

return(
<section>
{data ? 
data.map(hamster => (
 <section key={hamster.name}>
   <p>{hamster.name}</p>
   <img src={'/img/' + hamster.imgName} alt={hamster.name} width="300px" height="300px" />
 </section> 
))
:
<p>loading..</p>
}
</section>
)
}


/*
async function getHamsters(saveData: any) {
  const baseUrl = 'http://localhost:1337'
  const response = await fetch(baseUrl + '/hamsters')
  const data = await response.json
  saveData(data)
}
*/
export default HamsterList