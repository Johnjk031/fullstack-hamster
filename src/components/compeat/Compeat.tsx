import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Hamster } from '../../models/Models'
import { Img } from 'react-image'
import { response } from 'express'

const Compeat = () => {

  const [firstHamster, setFirstHamster] = useState({})
  const [secondHamster, setSecondHamster] = useState({})
  const [firstHamsterDefeats, setFirstHamsterDefeats] = useState('')
  const [secondHamsterDefeats, setSecondHamsterDefeats] = useState('')  

  let isRendered = useRef(false);
  const source = axios.CancelToken.source()


  let compeatArray: any  = [firstHamster, secondHamster]

  useEffect(() => {
    isRendered.current = true


    const fetchHamsters = async () => {

      try {
        if (isRendered) {
          const res1 = await axios.get('/hamsters/random', {
            cancelToken: source.token,
          })
          await setFirstHamster(res1.data)

          let res2 = await axios.get('/hamsters/random', {
            cancelToken: source.token,
          })

          while(res1.data.id === res2.data.id) {
            res2 = await axios.get('/hamsters/random', {
              cancelToken: source.token,
            })
            console.log(res2)
          }

          await setSecondHamster(res2.data)
          console.log(firstHamster)
        }

      }
      catch (error) {
        if (axios.isCancel(error)) {

        } else {
          throw error
        }
      }

    }

    fetchHamsters()

    return () => {
      isRendered.current = false;
      source.cancel()
    }
  },
    [])




  const chooseHamster = async (idName: string, wins: number, first: any, second: any) => {
    console.log(idName)

  console.log(firstHamster)
  const firstDef = first.defeats
  const firstId = first.id

  console.log(secondHamster)
  const secondDef = second.defeats
  const secondId = second.id


 
const won: number = wins +1
const secondLoose: number = secondDef + 1
const firstLoose: number = firstDef + 1

const secondLooseObj = {defeats: secondLoose}
const firstLooseObj = {defeats: firstLoose}
console.log(firstLooseObj)

const winObj = {wins: won}

if (firstId === idName) {
  await axios.put('/hamsters/'+ idName, winObj)
  await axios.put('/hamsters/'+ secondId, secondLooseObj)
    console.log('first won')
} 
else if (secondId === idName) {
   console.log('second won')  
   await axios.put('/hamsters/'+ idName, winObj)
   await axios.put('/hamsters/'+ firstId, firstLooseObj)
}
else {
  console.log('no one won')
}

  }


  return (
    <section>
    
      {isRendered ?

        compeatArray.map((hamster: any, index: any) => (
          <section key={index}>
            <p>{hamster.name}</p>

            {hamster.imgName
              ?

              <Img src={['/img/' + hamster.imgName, hamster.imgName, 'https://thumbs.dreamstime.com/b/not-valid-illustration-rubber-stamp-text-not-valid-x-97350065.jpg']}
                alt={hamster.name}
                width="300px" height="300px"
              />
              :

              ''

            }
            <button onClick={() => chooseHamster(hamster.id, hamster.wins, firstHamster, secondHamster)}>välj hamster</button>
            </section>
        ))


        :
        <p>loading..</p>
      }
    </section>
  )
}
export default Compeat