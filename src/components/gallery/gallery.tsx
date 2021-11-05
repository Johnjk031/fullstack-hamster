import { useState, useEffect } from 'react'
import axios from 'axios'
import { Hamster } from '../../models/Models'
import { response } from 'express'



const Gallery = () => {

    const [data, setData] = useState<Hamster[] | null>(null)

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [loves, setLoves] = useState('')
    const [faveFoods, setFaveFoods] = useState('')
    const [imgName, setImgName] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
    const [id, setId] = useState('')

    async function deleteHamster(id: string) {
        await axios.delete('/hamsters/' + id)

        if (data) {
            const newArray = data.filter(ham => ham.id !== id)
            setData(newArray)
        }
    }


    async function addHamster() {
    
         const object = { name: name, age: age, loves: loves, favFood: faveFoods, imgName: imgName, defeats: 0, wins: 0, games: 0, id: id }
         axios.post('/hamsters/', object)
        .then(res => {
        let abc = res.data.id
            console.log(abc)
          if (data) {
            const obj = {...object, id: abc}
            console.log(obj)
            const newArray = [...data, obj]
            setData(newArray)
        }

        })


    }

    useEffect(() => {
        axios.get('/hamsters/')
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
        , [])


    let randomMath = Math.random()

    return (
        <section>
            <p>Gallery component</p>
            {data ?
                data.map(hamster => (



                    <section key={hamster.id + randomMath}>
                        <p>{hamster.name}</p>


                        {hamster.imgName.startsWith('https:') || hamster.imgName.startsWith('data:')
                            ?
                            <img src={hamster.imgName}
                                alt={hamster.name} width="300px" height="300px"
                            />
                            :

                            <img src={'/img/' + hamster.imgName}
                                alt={hamster.name} width="300px" height="300px" />

                        }



                        <button onClick={() => deleteHamster(hamster.id)}>Ta bort hamster</button>
                    </section>
                ))
                :
                <p>loading..</p>
            }
            <input type="text" placeholder="Namn"
                onChange={e => setName(e.target.value)} />

            <input type="number" placeholder="Age"
                onChange={e => setAge(Number(e.target.value))} />

            <input type="text" placeholder="Favorit food"
                onChange={e => setFaveFoods(e.target.value)} />

            <input type="text" placeholder="image-url"
                onChange={e => setImgName(e.target.value)} />

            <input type="text" placeholder="loves"
                onChange={e => setLoves(e.target.value)} />

            <button onClick={() => addHamster()}>lägg till</button>
        </section>
    )
}
export default Gallery