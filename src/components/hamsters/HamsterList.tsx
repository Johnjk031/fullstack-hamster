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


let a, b
let dataArray: any = []
let newArray;

if (data) {
  [a, b] = data
newArray = [...dataArray, a]
}



console.log(a)

return(
<section>
{newArray ? 
newArray.map((hamster: any) => (
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

export default HamsterList