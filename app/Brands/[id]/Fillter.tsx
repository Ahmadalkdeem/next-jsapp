import { useState, useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../../redux/hooks'
import Form from 'react-bootstrap/Form';
import { onchange } from '../../../features/cards/arrays'
import { colourOptions, SizeOptions, categorys4, categorys3, categorys2, brands, categorys } from '../../../arrays/list';
import { useAppSelector } from '../../../redux/hooks';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { item as itemm } from '../../../@types/Mytypes';
import css from '../brands.module.scss'
const Fillter2 = (props: { brands: string }) => {
    let item = useAppSelector((e) => e.arrays.arr.find((e) => e.name === props.brands))
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    let Dispatch = useAppDispatch()
    const [color2, setcolor2] = useState<string[]>(['']);
    const [sizes2, setsizes2] = useState<string[]>(['']);
    const [category, setcategorys] = useState<string[]>(['']);
    const [category2, setcategory2] = useState<string[]>(['']);

    useEffect(() => {
        setcolor2(item?.value.colors)
        setsizes2(item?.value.size)
        setcategorys(item?.value.categorys)
        setcategory2(item?.value.categorys2)
        if (item?.value.categorys[0] !== undefined) { setOpen(true) }
        if (item?.value.categorys2[0] !== undefined) { setOpen2(true) }
        if (item?.value.size[0] !== undefined) { setOpen3(true) }
        if (item?.value.colors[0] !== undefined) { setOpen4(true) }
    }, [brands]);
    let item2 = { name: item?.name, slice: { size: sizes2, colors: color2, stopfindusers: item?.value.stopfindusers, stopusers: item?.value.stopusers, categorys: category, categorys2: category2 } }
    useEffect(() => {
        Dispatch(onchange(item2))
    }, [color2, sizes2, category2, category]);
    return (
        <>
            <div className={`d-flex flex-column p-0 m-0`}>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    click
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text" >
                        {categorys.map((s, i) => (
                            <Form.Check
                                type='checkbox'

                                reverse
                                className='d-block'
                                key={i}
                                inline
                                id={s.label}
                                label={s.label}
                                checked={category.find((e) => e === s.value) !== undefined ? true : false}
                                onChange={() => {
                                    console.log('ahmad');

                                    let findindex = category.findIndex((e) => e === s.value)
                                    if (findindex === -1) { setcategorys((e) => [...e, s.value]) }
                                    else {
                                        let arr = [...category]
                                        arr.splice(findindex, 1)
                                        setcategorys([...arr])
                                    }

                                }}

                            />
                        ))}
                    </div>
                </Collapse>
                <Button
                    onClick={() => setOpen2(!open2)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open2}
                >
                    click
                </Button>
                <Collapse in={open2}>
                    <div id="example-collapse-text">
                        {[...categorys2, ...categorys4, ...categorys3].map((s, i) => (
                            <Form.Check
                                reverse
                                key={i}
                                inline
                                className='d-block'
                                value={s.label}
                                label={s.label}
                                checked={category2.find((e) => e === s.value) !== undefined ? true : false}
                                onChange={() => {
                                    let findindex = category2.findIndex((e) => e === s.value)
                                    if (findindex === -1) { setcategory2((e) => [...e, s.value]) }
                                    else {
                                        let arr = [...category2]
                                        arr.splice(findindex, 1)
                                        setcategory2([...arr])
                                    }

                                }}
                            />
                        ))}
                    </div>
                </Collapse>
                <Button
                    onClick={() => setOpen3(!open3)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open3}
                >
                    click
                </Button>
                <Collapse in={open3}>
                    <div id="example-collapse-text" >
                        {SizeOptions.map((s, i) => (
                            <Form.Check
                                reverse
                                className='d-block'
                                key={i}
                                inline
                                value={s.label}
                                label={s.label}
                                checked={sizes2.find((e) => e === s.value) !== undefined ? true : false}
                                onChange={() => {
                                    let findindex = sizes2.findIndex((e) => e === s.value)
                                    if (findindex === -1) { setsizes2((e) => [...e, s.value]) }
                                    else {
                                        let arr = [...sizes2]
                                        arr.splice(findindex, 1)
                                        setsizes2([...arr])
                                    }

                                }}
                            />
                        ))}
                    </div>
                </Collapse>
                <Button
                    onClick={() => setOpen4(!open4)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open4}
                >
                    click
                </Button>
                <Collapse in={open4}>
                    <div id="example-collapse-text">
                        {colourOptions.map((s, i) => (
                            <Form.Check
                                className='d-block'
                                reverse
                                key={i}
                                value={s.label}
                                inline
                                label={s.label}
                                checked={color2.find((e) => e === s.value) !== undefined ? true : false}
                                onChange={() => {
                                    let findindex = color2.findIndex((e) => e === s.value)
                                    if (findindex === -1) { setcolor2((e) => [...e, s.value]) }
                                    else {
                                        let arr = [...color2]
                                        arr.splice(findindex, 1)
                                        setcolor2([...arr])
                                    }

                                }}
                            />
                        ))}
                    </div>
                </Collapse>
            </div>
        </>)
}

export default Fillter2