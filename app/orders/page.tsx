'use client'
import { useEffect } from 'react'
import axios from 'axios'
import css from './css.module.scss'
import { MDBTable, MDBTableHead } from 'mdb-react-ui-kit';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Spiner from '../../components/Spiner/Spiner'
import { addItems } from '../../features/cards/orderdetales';
import FindOrder from '../../components/item/Order';
import Items from './Item';
import { Url } from '../../arrays/list';
import Navgite from '@/components/navgite/Navgite';
const Order = () => {
    let Dispatch = useAppDispatch()
    const { arr, arr2 } = useAppSelector((s) => s.orders);
    const { accessToken } = useAppSelector((s) => s.user);
    function getdata() {
        axios.get(`${Url}carts/getorders/${accessToken}`, { params: { order: 'all', skip: arr.length } }).then((response) => {
            console.log(response);

            Dispatch(addItems(response.data))
            if (response.data.length === 0) alert('אין יותר הזמנות')
        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })
    }
    useEffect(() => {
        if (arr.length === 0 && accessToken !== '') { getdata() }
    }, [accessToken]);

    return (
        <>
            <Navgite />
            {arr.length === 0 ? <Spiner /> :
                <div className={css.Div}>
                    <FindOrder />
                    <MDBTable className={css.table}>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>orderId</th>
                                <th scope='col'>fullname</th>
                                <th scope='col'>email</th>
                                <th scope='col'>delate</th>
                            </tr>
                        </MDBTableHead>
                        {arr2.length !== 0 && <><Items arr={arr2} />
                            <br />
                            <br />
                        </>}
                        <Items arr={arr} />

                    </MDBTable>
                </div>
            }
            <input className='btn btn-primary m-1 pt-1' type="button" value="more orders" onClick={getdata} />
        </>
    )
}

export default Order