'use client'
import { useState, useEffect } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import css from './css.module.scss'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Spiner from '../../../../components/Spiner/Spiner'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateitem } from '../../../../features/cards/orderdetales';
import { order } from '../../../../@types/Mytypes';
import Swall from '../../../../components/swal/Swal';
import { Url } from '../../../../arrays/list';
import { useRouter } from 'next/navigation';
import Navgite from '@/components/navgite/Navgite';

const Orderdetales = (qwere: any) => {
    const router = useRouter();
    let Dispatch = useAppDispatch()
    let page = qwere.params.page

    const { arr, arr2 } = useAppSelector((s) => s.orders)
    const { accessToken } = useAppSelector((s) => s.user)

    const [orderDetales, setorderDetales] = useState<order>()
    const [index, setindex] = useState<number>()
    function getorder() {
        axios.get(`${Url}carts/getoneorderId/${accessToken}`,
            { params: { id: page } }
        ).then((response) => {
            setorderDetales(response.data[0])

        }).catch((err: any) => {
            router.back();
            console.log(err);
            console.log(`${Url}carts/getoneorderId/${accessToken}`);

            console.log(err.response.data.error);
        })

    }
    useEffect(() => {
        window.scrollTo(0, 0)
        let item = [...arr2, ...arr].find((e) => e._id === page)
        if (item === undefined) {
            if (accessToken !== '') {
                getorder()
            }
        }
        else {
            setindex(arr.findIndex((e) => e._id === page) + 1)
            setorderDetales(item)
        }
    }, [page, accessToken]);
    return (
        <>
            <Navgite />
            {orderDetales === undefined || null ? <Spiner /> :
                <>
                    <div className={css.Div}>
                        <input onClick={() => {
                            axios.put(`${Url}carts/putoneorder/${accessToken}`, { params: { id: page } }).then((response) => {
                                Dispatch(updateitem(page))
                                Swall({ titel: 'ההזמנה בוצעה בהצלחה', timer: 1000 })
                                router.back();
                            }).catch((err: any) => {
                                console.log(err);
                                console.log(err.response.data.error);
                            })

                        }} className='btn btn-primary' type="button" value='ההזמנה בוצעה' />
                        <MDBTable className={css.table}>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>orderId</th>
                                    <th scope='col'>username</th>
                                    <th scope='col'>email</th>
                                    <th scope='col'>City</th>
                                    <th scope='col'>Address</th>
                                    <th scope='col'>Address2</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr >
                                    <th scope='row'>{index}</th>
                                    <td> {orderDetales._id}</td>
                                    <td> {orderDetales.fullname}</td>
                                    <td> {orderDetales.Email}</td>
                                    <td> {orderDetales.City}</td>
                                    <td> {orderDetales.Address}</td>
                                    <td> {orderDetales.Address2}</td>
                                </tr>

                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    <div className={css.Divcards}>
                        {orderDetales.arr.map((orderdetales: any, i: number) =>

                            <Card key={i} style={{ width: '18rem' }}>
                                <Card.Img className={css.Img} variant="top" src={orderDetales.products[0].find((e) => e._id === orderdetales.id)?.src[0] !== undefined ? orderDetales.products[0].find((e) => e._id === orderdetales.id)?.src[0] : 'a'} />
                                <Card.Body>
                                    <div>
                                        <MDBTable className={css.table}>
                                            <MDBTableHead>
                                                <tr>
                                                    <th scope='col'>brand:</th>
                                                    <th scope='col'>category:</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                <tr >
                                                    <td> {orderDetales.products[0].find((e) => e._id === orderdetales.id)?.brand !== undefined ? orderDetales.products[0].find((e) => e._id === orderdetales.id)?.brand : ''}</td>
                                                    <td> {orderDetales.products[0].find((e) => e._id === orderdetales.id)?.category !== undefined ? orderDetales.products[0].find((e) => e._id === orderdetales.id)?.category : ''}</td>
                                                </tr>

                                            </MDBTableBody>
                                        </MDBTable>
                                    </div>
                                    <div>
                                        <MDBTable className={css.table}>
                                            <MDBTableHead>
                                                <tr>
                                                    <th scope='col'>כמות:</th>
                                                    <th scope='col'>מידה:</th>
                                                    <th scope='col'>צבע:</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                <tr >
                                                    <td>{orderdetales.quantity}</td>
                                                    <td>{orderdetales.sizeselect}</td>
                                                    <td>{orderdetales.color}</td>
                                                </tr>

                                            </MDBTableBody>
                                        </MDBTable>
                                    </div>

                                </Card.Body>
                            </Card>
                        )}
                    </div>
                </>
            }

        </>
    )
}

export default Orderdetales