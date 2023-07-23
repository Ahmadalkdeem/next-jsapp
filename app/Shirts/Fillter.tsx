import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import Form from 'react-bootstrap/Form';
import { colourOptions, SizeOptions, categorys4, categorys3, categorys2, brands } from '../../arrays/list'
import { onchange } from '../../features/cards/cardPants'
import { onchange as onchange2 } from '../../features/cards/cardshirts'
import { onchange as onchange3 } from '../../features/cards/cardshose'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { optionstype } from '../../@types/Mytypes';
const Fillter = (props: { name: string, value: { size: string[], colors: string[], brands: string[], catgre: string[], stopusers: boolean, stopfindusers: boolean } }) => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    let Dispatch = useAppDispatch()
    const [color2, setcolor2] = useState<string[]>(props.value.colors);
    const [sizes2, setsizes2] = useState<string[]>(props.value.size);
    const [category2, setcategorys2] = useState<string[]>(props.value.catgre);
    const [brandss2, setbrands2] = useState<string[]>(props.value.brands);
    const [opation, setopation] = useState<optionstype[]>([]);
    useEffect(() => {
        setcolor2(props.value.colors)
        setsizes2(props.value.size)
        setcategorys2(props.value.catgre)
        setbrands2(props.value.brands)
        if (props.value.catgre[0] !== undefined) { setOpen(true) }
        if (props.value.brands[0] !== undefined) { setOpen2(true) }
        if (props.value.size[0] !== undefined) { setOpen3(true) }
        if (props.value.colors[0] !== undefined) { setOpen4(true) }
        if (props.name === 'pants') { setopation(categorys2) }
        if (props.name === 'shose') { setopation(categorys4) }
        if (props.name === 'shirts') { setopation(categorys3) }
    }, [props.name]);
    let item = { size: sizes2, catgre: category2, colors: color2, brands: brandss2, stopfindusers: props.value.stopfindusers, stopusers: props.value.stopusers }
    useEffect(() => {
        if (props.name === 'shirts') { Dispatch(onchange2(item)) }
        if (props.name === 'shose') { Dispatch(onchange3(item)) }
        if (props.name === 'pants') { Dispatch(onchange(item)) }

    }, [color2, sizes2, category2, brandss2]);
    return (
        <>
            <div className='d-flex flex-column p-0 m-0 w-100'>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    click
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text" >
                        {opation.map((s, i) => (
                            <Form.Check
                                reverse
                                className='d-block'
                                key={i}
                                inline
                                id={s.label}
                                value={s.label}
                                label={s.label}
                                checked={category2.find((e) => e === s.value) !== undefined ? true : false}
                                onChange={() => {
                                    console.log('aa');

                                    let findindex = category2.findIndex((e) => e === s.value)
                                    if (findindex === -1) { setcategorys2((e) => [...e, s.value]) }
                                    else {
                                        let arr = [...category2]
                                        arr.splice(findindex, 1)
                                        setcategorys2([...arr])
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
                        {brands.map((s, i) => (
                            <Form.Check
                                reverse
                                key={i}
                                inline
                                className='d-block'
                                value={s.label}
                                id={s.label}
                                label={s.label}
                                checked={brandss2.find((e) => e === s.value) !== undefined ? true : false}
                                onChange={() => {
                                    let findindex = brandss2.findIndex((e) => e === s.value)
                                    if (findindex === -1) { setbrands2((e) => [...e, s.value]) }
                                    else {
                                        let arr = [...brandss2]
                                        arr.splice(findindex, 1)
                                        setbrands2([...arr])
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
                                id={s.label}
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
                                id={s.label}
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

export default Fillter