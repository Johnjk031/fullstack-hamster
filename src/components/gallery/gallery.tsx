import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Img} from 'react-image'



const Gallery = ( data: any  )  => {

console.log(data)
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [loves, setLoves] = useState('')
    const [faveFoods, setFaveFoods] = useState('')
    const [imgName, setImgName] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
    const [id] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)


    async function deleteHamster(id: string) {
        await axios.delete('/hamsters/' + id)

        if (data) {
            const newArray = data.data.filter((ham: any) => ham.id !== id)
            data.setData(newArray)
        }
    }


  

    async function addHamster() {
        setIsOpen(false)
   
        if (name.length < 2 || /^[A-z ]+$/.test(name) === false || age < 0 || loves === '' || faveFoods === '') {
        setErrorMessage('Unvalid')
    }

    else {
        const object = { name: name, age: age, loves: loves, favFood: faveFoods, imgName: imgName, defeats: 0, wins: 0, games: 0, id: id }
        axios.post('/hamsters/', object)
       .then(res => {
       let abc = res.data.id
           console.log(abc)
         if (data) {
           const obj = {...object, id: abc}
           console.log(obj)
           const newArray = [...data.data, obj]
           data.setData(newArray)
           setErrorMessage('')
       }
       })

    }
    }

  let setStates = () => {
      setIsOpen(true)
      setErrorMessage('')
  }

    let randomMath = Math.random()

    return (
     
        
        <section>

       <p>Gallery component</p>
                 {data ?
                data.data.map((hamster: any) => (

                    <section key={hamster.id + randomMath}>
                        <p>{hamster.name}</p>

                       {hamster.imgName.startsWith('https:') || hamster.imgName.startsWith('data:')
                            ?
                            <Img src={[hamster.imgName, 'https://thumbs.dreamstime.com/b/not-valid-illustration-rubber-stamp-text-not-valid-x-97350065.jpg']}
                                alt={hamster.name}
                                width="300px" height="300px"
                            />
                            :

                            <Img src={['/img/' + hamster.imgName, 'https://thumbs.dreamstime.com/b/not-valid-illustration-rubber-stamp-text-not-valid-x-97350065.jpg' ] }
                            alt={hamster.name}
                            width="300px" height="300px" />

                        }
           <button onClick={() => deleteHamster(hamster.id)}>Ta bort hamster</button>
           <Link to={`/info/${hamster.id}`}>Visa mer</Link>
                    </section>
                ))
  
                
                :
                <p>loading..</p>
            }
            <section>
          <button onClick={ () => setStates()}>Lägg till hamster</button>
            </section>
            { isOpen?
             <section>
            <input type="text" placeholder="Namn"
                onChange={e => setName(e.target.value)} />

            <input type="number" placeholder="Age"
                onChange={e => setAge(Number(e.target.value))} />

            <input type="text" placeholder="Favorit food"
                onChange={e => setFaveFoods(e.target.value)} />

            <input type="text" placeholder="image-url *"
                onChange={e => setImgName(e.target.value)} />

            <input type="text" placeholder="loves"
                onChange={e => setLoves(e.target.value)} />

            <button onClick={() => addHamster()}>lägg till</button>
            
            </section>
            :
            ''
}
<p>{errorMessage}</p>
        </section>
    )
}
export default Gallery