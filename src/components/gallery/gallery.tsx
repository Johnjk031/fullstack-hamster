import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Img } from 'react-image'
import './gallery.css'



const Gallery = (data: any) => {


  // states    
  const [name, setName] = useState('')
  const [age, setAge] = useState(-1)
  const [loves, setLoves] = useState('')
  const [faveFoods, setFaveFoods] = useState('')
  const [imgName, setImgName] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
  const [id] = useState('')
 

  const [nameFokus, setNameFocus] = useState(false)
  const [ageFokus, setAgeFocus] = useState(false)
  const [favFoodFokus, setfaveFoodFocus] = useState(false)
  const [lovesFokus, setLovesFocus] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  //validate inputs
  const isValidName = (name: string): any => {
    return name.length > 2 && /^[A-z ]+$/.test(name) === true
  }

  const isValidAge = (aga: number): any => {
    if (isNaN(age)) return false
    if (age < 0) return false
    return true
  }

  const isValidLoves = (loves: string): any => {
    return loves.length > 0 && /^[A-z ]+$/.test(loves) === true
  }

  const isValidFavFood = (faveFood: string): any => {
    return faveFood.length > 0 && /^[A-z ]+$/.test(faveFood) === true
  }

  const ageIsValid = isValidAge(age)
  const nameIsValid = isValidName(name)
  const lovesIsValid = isValidLoves(loves)
  const favFoodIsValid = isValidFavFood(faveFoods)

  const nameclass = nameIsValid ? 'valid' : 'invalid'
  const ageclass = ageIsValid ? 'valid' : 'invalid'
  const lovesclass = lovesIsValid ? 'valid' : 'invalid'
  const favfoodclass = favFoodIsValid ? 'valid' : 'invalid'

  // true boolean if input is valid
  const formIsValid = nameIsValid && ageIsValid && lovesIsValid && favFoodIsValid


  // delete hamster from form
  async function deleteHamster(id: string) {
    await axios.delete('/hamsters/' + id)

    if (data) {
      const newArray = data.data.filter((ham: any) => ham.id !== id)
      data.setData(newArray)
    }
  }



  // post hamsters to gallery
  async function addHamster() {
    setIsOpen(false)

    if (formIsValid) {
      const object = { name: name, age: age, loves: loves, favFood: faveFoods, imgName: imgName, defeats: 0, wins: 0, games: 0, id: id }
      axios.post('/hamsters/', object)
        .then(res => {
          let abc = res.data.id
          console.log(abc)
          if (data) {
            const obj = { ...object, id: abc }
            console.log(obj)
            const newArray = [...data.data, obj]
            data.setData(newArray)
          }
        })
    }

  }

  let setStates = () => {
    setIsOpen(true)
  }
  return (
    <section>
      <p>Gallery component</p>
      <section className="grid">
        {data ?
          data.data.map((hamster: any, index: any) => (
            <section key={index}>
              <section className="flex-art">
                <p>{hamster.name}</p>
                {hamster.imgName.startsWith('https:') || hamster.imgName.startsWith('data:')
                  ?
                  <Link to={`/info/${hamster.id}`}>  <Img src={[hamster.imgName, 'https://thumbs.dreamstime.com/b/not-valid-illustration-rubber-stamp-text-not-valid-x-97350065.jpg']}
                    alt={hamster.name}
                    width="300px" height="300px"
                  />
                  </Link>
                  :
                  <Link to={`/info/${hamster.id}`}>
                    <Img src={['/img/' + hamster.imgName, 'https://thumbs.dreamstime.com/b/not-valid-illustration-rubber-stamp-text-not-valid-x-97350065.jpg']}
                      alt={hamster.name}
                      width="300px" height="300px" />
                  </Link>
                }

                <button onClick={() => deleteHamster(hamster.id)} className="remove">Ta bort hamster</button>
              </section>
            </section>
          ))


          :
          <p>loading..</p>

        }
      </section>
      <section>
        <button className="add-btn" onClick={() => setStates()}>Lägg till hamster</button>
      </section>
      { isOpen ?
        <section className="form">
          <button className="quit-btn" onClick={() => setIsOpen(false)}>X</button>
          <input type="text" placeholder="Namn"
            className={nameFokus ? nameclass : 'unfocused'} onKeyDown={() => setNameFocus(true)} onChange={e => setName(e.target.value)} />

          <input type="text" placeholder="Age"
            className={ageFokus ? ageclass : 'unfocused'}
            onChange={e => setAge(Number(parseInt(e.target.value)))}
            onKeyDown={() => setAgeFocus(true)}
          />

          <input type="text" placeholder="Favorit food"
            className={favFoodFokus ? favfoodclass : 'unfocused'}
            onChange={e => setFaveFoods(e.target.value)}
            onKeyDown={() => setfaveFoodFocus(true)}
          />

          <input type="text" placeholder="image-url*"
            onChange={e => setImgName(e.target.value)}
            className='valid'
          />

          <input type="text" placeholder="loves"
            className={lovesFokus ? lovesclass : 'unfocused'}
            onChange={e => setLoves(e.target.value)}
            onKeyDown={() => setLovesFocus(true)}
          />

          <button className={formIsValid ? 'add-btn' : 'unv-btn'} disabled={!formIsValid} onClick={() => addHamster()}>lägg till</button>

        </section>
        :
        ''
      }



    </section>


  )

}
export default Gallery