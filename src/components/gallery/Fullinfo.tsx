import {useParams} from 'react-router-dom'


const Fullinfo = ( {data}: {data: any} ) => {

    console.log(data)

    const { id }: any = useParams<any>();

    return(
        <section>
            <p>test</p>
           <section>
               <p>full info</p>
               {data.filter((info: any) => info.id === id)
               .map((info: any, index:any) =>
               <section key={index}>
                   <p>{info.name}</p>
               </section>
               )}
           </section>
        </section>
    );
};
export default Fullinfo