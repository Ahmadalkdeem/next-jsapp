'use client'
import { useAppSelector } from '../../redux/hooks'
import { useEffect } from 'react';
import List from '../../components/List/List'
import { useAppDispatch } from '../../redux/hooks';
import { addItems } from '../../features/cards/arrhomepage';
import axios from 'axios';
import { Url } from '../../arrays/list';
import Swall from '../../components/swal/Swal';
import Navgite from '@/components/navgite/Navgite';
const Homearr = () => {
    let Dispatch = useAppDispatch()
    let { cards } = useAppSelector(e => e.homePage)
    let { accessToken } = useAppSelector(e => e.user)
    return (
        <>
            <Navgite />
            <button onClick={() => {
                let arrobjecctid: string[] = []
                cards.map((e) => {
                    arrobjecctid.push(e._id)
                })
                axios.put(`${Url}cards/homepage/${accessToken}`, { params: { arr: JSON.stringify(arrobjecctid) } }).then((res) => {
                    if (res.data === 'good') {
                        Swall({ timer: 1500, titel: 'העדכון התבצע בהצלחה' })
                    }
                    Dispatch(addItems([]))
                })
            }}>update</button >
            {
                cards.length !== 0 ? <List arr={cards} /> : <>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </>
            }
        </>
    )
}

export default Homearr