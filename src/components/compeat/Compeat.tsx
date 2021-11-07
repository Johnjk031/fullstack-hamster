import {useState, useEffect} from 'react'
import axios from 'axios'
import {Hamster} from '../../models/Models'


const Compeat = () => {

    const [firstHamster, setFirstHamster] = useState<Hamster[] | []>([])
    const [secondHamster, setSecondHamster ] = useState<Hamster[] | []>([])

    useEffect(() => {
      axios.get('/hamsters/random')
      .then(res => {
        setFirstHamster(res.data)
      })
     axios.get('/hamsters/random')
     .then(res => {
        setSecondHamster(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  ,[])

  if (firstHamster === secondHamster) {
    console.log('they are the same')
    axios.get('/hamsters/random')
    .then(res => {
       setSecondHamster(res.data)
     })
  } else {console.log('not the same')
     console.log(firstHamster)
     console.log(secondHamster)
}
const compeatArray = [firstHamster, secondHamster]

return(
    <section>
        <p>Compeat component</p>
    </section>
)
}
export default Compeat