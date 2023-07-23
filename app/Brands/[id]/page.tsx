'use client'
import { useRouter } from "next/router"
import H2 from "../../../components/h2/H2"
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { addItems, search, onchange, addfindItems, addfindItems2 } from '../../../features/cards/arrays'
import axios from 'axios'
import css from '../brands.module.scss'
import List from '../../../components/List/List'
import Spiner from '../../../components/Spiner/Spiner'
import { Url } from '../../../arrays/list'
import Ops from '../../../components/404/Ops'
import Fillter2 from "./Fillter"

const Id = (qwere: any) => {
    const [lodingg, setlodingg] = useState<Boolean>(false)
    const [lodinggfind, setlodinggfind] = useState<Boolean>(false)
    let Dispatch = useAppDispatch()
    let Brands = decodeURIComponent(qwere.params.id)
    let item = useAppSelector((e) => e.arrays.arr.find((e) => e.name === Brands))
    let item2: any = useAppSelector((e) => e.arrays.arr.find((e) => e.name === Brands)?.users)

    let arr: any = item?.search === false ? item.users : item?.findusers
    useEffect(() => {
        window.scrollTo(0, 0)
        if (item === undefined) return
        if (item2?.length === 0) {
            setlodingg(true)
            return getdata()
        }


    }, [])
    function getdata() {
        console.log('arr');

        axios.get(`${Url}cards/brands/filtering`, {
            params: {
                brands: [Brands], skip: item?.users.length
            }
        }).then((response) => {

            setlodingg(false)
            setlodinggfind(false)
            Dispatch(addItems({ name: Brands, arr: response.data }))
            if (response.data[0] === undefined) {
                Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: item?.value.colors, stopfindusers: item?.value.stopfindusers, stopusers: true, categorys: item?.value.categorys, categorys2: item?.value.categorys2 } }))
            }
        }).catch(e => {
            console.log(e);
            setlodingg(false)
        })
    }

    function getFinddData() {
        setlodingg(true)

        const data = {
            brands: [Brands],
            colors: item?.value.colors,
            sizes: item?.value.size,
            categorys: item?.value.categorys,
            categorys2: item?.value.categorys2,
            skip: 0
        };
        axios.get(`${Url}cards/brands/filtering`, { params: data }).then((response) => {
            setlodingg(false)
            setlodinggfind(false)
            Dispatch(addfindItems({ name: Brands, arr: response.data }))
            if (response.data[0] === undefined) {
                Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: item?.value.colors, stopfindusers: true, stopusers: item?.value.stopusers, categorys: item?.value.categorys, categorys2: item?.value.categorys2 } }))
            }

        }).catch(e => {
            console.log(e);

        })
    }
    function moreFindData() {

        const data = {
            brands: [Brands],
            colors: item?.value.colors,
            sizes: item?.value.size,
            categorys: item?.value.categorys,
            categorys2: item?.value.categorys2,
            skip: item?.findusers.length
        };
        axios.get(`${Url}cards/brands/filtering`, { params: data }).then((response) => {
            setlodinggfind(false)
            Dispatch(addfindItems2({ name: Brands, arr: response.data }))
            if (response.data[0] === undefined) {
                Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: item?.value.colors, stopfindusers: true, stopusers: item?.value.stopusers, categorys: item?.value.categorys, categorys2: item?.value.categorys2 } }))
            }

        }).catch(e => {
            console.log(e);

        })
    }

    window.onscroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.clientHeight;
        const scrollPercentage = (scrollPosition / (bodyHeight - windowHeight)) * 100;

        if (scrollPercentage > 65 && scrollPercentage <= 100) {
            if (lodinggfind === false && lodingg === false) {
                setlodinggfind(true)
                if (item?.search === false) { if (item.value.stopusers === false) { getdata() } }
                else { if (item?.value.stopfindusers === false) { moreFindData() } }
            }
        }
    }

    return (
        <>
            <H2 h2={Brands} />
            <div className='d-flex'>
                <div className={css.selestdiv} >
                    <Fillter2 brands={Brands} />
                    <button className={css.btn} onClick={() => {
                        console.log(item);

                        if (item?.value.size[0] === undefined && item?.value.categorys[0] === undefined && item?.value.categorys2[0] === undefined && item?.value.colors[0] === undefined) {
                            return Dispatch(search({ name: item?.name }))
                        }
                        setlodingg(true);
                        getFinddData();
                    }
                    }>Serahe</button>

                </div>
                {lodingg === false && <>
                    {arr?.length === 0 ?
                        <>
                            {item?.search === false ? <Ops p='אין מוצרים' /> :
                                <><Ops p='' />
                                    <button>ahmas</button>
                                </>}
                        </>
                        : <List arr={arr} />}
                </>
                }
                {lodingg && <Spiner />}
            </div>


        </>
    )
}

export default Id