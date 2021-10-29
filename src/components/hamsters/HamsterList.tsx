import { useState, useEffect } from 'react'
import axios from 'axios'

import {Hamster} from '../../models/Models'

const HamsterList = () => {

const [data, setData] = useState<Hamster[] | null>(null)
const baseUrl = 'http://localhost:1337'


useEffect(() => {
    axios.get(baseUrl + '/hamsters')
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