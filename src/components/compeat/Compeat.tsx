import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Img } from 'react-image'
import './compeat.css'

const Compeat = () => {

  // set states
  const [firstHamster, setFirstHamster] = useState({})
  const [secondHamster, setSecondHamster] = useState({}) 
  const [winner, setWinner] = useState<{} | null>(null)
  const [openSection, setOpenSection] = useState(true)
 
 // controlling mounting on fetch
 let isRendered = useRef(false);
  const source = axios.CancelToken.source()

  
  let AllHams:any = []

 // array where value depends on states
  let compeatArray: Object[]  = [firstHamster, secondHamster]
  const winnerArray: any[] = [winner]

// fetching 2 random hamsters & push res to compeatArray
  let renderAll = () => {

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
          }

           setSecondHamster(res2.data)
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
  }

  // calling renderAll()
  useEffect(() => {
    
    renderAll()
    // 
  }, [])

  // setting hamsterwinner & 'PUT result
  const chooseHamster = async (idName: string, wins: number, first: any, second: any) => {  console.log(idName)
  setOpenSection(false)

  const firstDef = first.defeats
  const firstId = first.id

  const secondDef = second.defeats
  const secondId = second.id

const won: number = wins +1
const secondLoose: number = secondDef + 1
const firstLoose: number = firstDef + 1

const secondLooseObj = {"defeats": secondLoose}
const firstLooseObj = {"defeats": firstLoose}


console.log(firstLooseObj)

const winObj = {"wins": won}
if (firstId === idName) {
  await axios.put('/hamsters/'+ idName, winObj)
  await axios.put('/hamsters/'+ secondId, secondLooseObj)
   setWinner({...firstHamster, wins: won})
    console.log('first won')
  try {
    const res = await axios.get('/matches/matchWinners/' + idName) 
    
    if (res.data.length > 0 ) {
    const defId = await res.data.map((def: any) => (
    def.loserId
     ))
    }
    else(console.log(res))
  }
  catch (err) {
    console.log('no data')
  }
  }
   
   
else if (secondId === idName) {
   console.log('second won')  
   await axios.put('/hamsters/'+ idName, winObj)
   await axios.put('/hamsters/'+ firstId, firstLooseObj)
   setWinner({...secondHamster, wins: won})
}
else {
  console.log('no one won')
}
  }
  


const repeat = async () => {
   setFirstHamster({})
  setSecondHamster({})
  setWinner({})
  setOpenSection(true)
  renderAll()
}

// "G0HEPPvZfzbglqZo3TaC"

  return (
    <section>

      {isRendered ?
 
        compeatArray.map((hamster: any, index: any) => (
          <section key={index} className={openSection ? 'compeat-img-section' : 'hide'}>
           <article className="flex-info">
            <h3 className="comp-text">{hamster.name}</h3>
            <p>{hamster.age} år</p>
            <p>Gillar: {hamster.loves}</p>
            </article>
            {hamster.imgName
              ?
            
              <Img className="cmp-img" src={['/img/' + hamster.imgName, hamster.imgName, 'https://thumbs.dreamstime.com/b/not-valid-illustration-rubber-stamp-text-not-valid-x-97350065.jpg']}
                alt={hamster.name}
                width="300px" height="300px"
              />
              :

             ''
            
            }
            <section>
            <button className="remove" onClick={() => chooseHamster(hamster.id, hamster.wins, firstHamster, secondHamster)}>välj hamster</button>
            </section>
            </section>

        ))


        :
        <p>loading..</p>
      }


{winner ? 

winnerArray.map((win: any, index: any) => (
<section key={index} className={openSection ? 'hide' : 'winner-view'}>
  <h4>{win.name}</h4>
  {win.imgName
              ?
              <Img src={['/img/' + win.imgName, win.imgName, 'https://thumbs.dreamstime.com/b/not-valid-illustration-rubber-stamp-text-not-valid-x-97350065.jpg']}
                alt={win.name}
                width="300px" height="300px"
              />
              :
              ''}
    <p>Vinster: {win.wins}</p>
    <p>Förluster: {win.defeats}</p>

    

              <button className="remove" onClick={() => repeat()}>Tävla igen</button>
</section>
))
:
''
}



</section>
  
  )
}
export default Compeat