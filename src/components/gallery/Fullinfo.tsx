import {useParams} from 'react-router-dom'
import { Img } from 'react-image'
import './gallery.css'

const Fullinfo = ( {data}: {data: any} ) => {

 const { id }: any = useParams<any>();

    return(
        <section>
       
            
           <section>
               {data.filter((info: any) => info.id === id)
               .map((info: any, index:any) =>
               <section key={index}>
                   <p className="info-text">Namn: {info.name}</p>
                   <p className="info-text">Gillar: {info.loves}</p>
                   <p className="info-text">Favorit mat: {info.favFood}</p>
                   <p className="info-text">Vinster: {info.wins}</p>
                   <p className="info-text">Förluster: {info.defeats}</p>
                   <Img src={['/img/' + info.imgName, info.imgName, 'https://thumbs.dreamstime.com/b/not-valid-illustration-rubber-stamp-text-not-valid-x-97350065.jpg']}
                alt={info.name}
                width="300px" height="300px"
              />

               </section>
               )}
           </section>
        </section>
    );
};
export default Fullinfo