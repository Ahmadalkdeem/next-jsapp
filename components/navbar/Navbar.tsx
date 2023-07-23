import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import css from "./css.module.scss"
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useAppSelector } from '../../redux/hooks';
import Link from 'next/link';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Container, Row, Col } from 'react-bootstrap';
import { brands2 } from '../../arrays/list';
import { brandstype } from '../../@types/Mytypes';
import { AiOutlineClose } from "react-icons/ai";
import Navbae2 from './Navbar2';
function OffcanvasExample() {
    const [serahre, setserahre] = useState<string>('');
    const [open, setOpen] = useState(false);

    const [open2, setOpen2] = useState(false);
    const [innerWidth, setinnerWidth] = useState(window.innerWidth);
    const [show, setshow] = useState(false)
    let { roles } = useAppSelector((e) => e.user)
    const handleToggle = () => {
        setshow(!show);
    };
    typeof window !== 'undefined' ? window.onresize = () => {
        setinnerWidth(window.innerWidth)
        if (window.innerWidth > 992) {
            setshow(false)
        }
    } : 0
    return (
        <>

            <p className={css.p}>משלוח חינם עד הדלת בהזמנות מעל ₪349</p>
            {innerWidth > 992 ?
                <Navbae2 /> : <>
                    {['lg'].map((expand) => (
                        <Navbar key={expand} expand={expand} className={css.MyHeader}>
                            <span>

                                <img className={css.logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzV_u0UjwQds2dccWrlW8TOF3RoJDRZ0-3Gv-7FUxIA&s" alt="logo" />
                                <Link className={css.icon} href='/Mycard'>
                                    <TfiShoppingCartFull size={33} />
                                </Link>
                                <Link className={css.icon} href='/Favorites'>
                                    <MdOutlineFavoriteBorder size={33} />
                                </Link>
                            </span>
                            <Navbar.Toggle className='border-0 shadow-none p-1' aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleToggle} />
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="end"
                                className='border-0'
                                show={show}
                            >
                                <Offcanvas.Header>
                                    <img className={css.logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzV_u0UjwQds2dccWrlW8TOF3RoJDRZ0-3Gv-7FUxIA&s" alt="logo" />
                                    <button className={css.btn} onClick={() => {
                                        setshow(false)
                                    }}><AiOutlineClose size={30} /></button>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="d-flex w-100 justify-content-between">
                                        <div className={css.div}>

                                            <Link onClick={() => { setshow(false) }} className={css.Mylink} href="/">בית</Link>
                                            {innerWidth > 992 ? <><Link onClick={() => { setshow(false) }} className={css.Mylink} href="/Brands">מותגים</Link></> : <>
                                                <Button
                                                    onClick={() => {
                                                        setOpen(!open)
                                                        setOpen2(false)
                                                    }}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={open}
                                                    className={css.Mylink}
                                                >
                                                    קטגוריות
                                                </Button>
                                                <Collapse in={open}>
                                                    <div id="example-collapse-text" >
                                                        <Link onClick={() => { setshow(false) }} className={`${css.link2}`} href="/Shirts">חולצות</Link>
                                                        <Link onClick={() => { setshow(false) }} className={`${css.link2}`} href="/pants">מכנסיים</Link>
                                                        <Link onClick={() => { setshow(false) }} className={`${css.link2}`} href="/shoes">נעליים</Link>
                                                    </div>
                                                </Collapse>
                                                <Button
                                                    onClick={() => {
                                                        setOpen2(!open2)
                                                        setOpen(false)
                                                    }}

                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={open2}
                                                    className={css.Mylink}
                                                >
                                                    מותגים
                                                </Button>
                                                <Collapse in={open2}>
                                                    <div className={css.collapse}>
                                                        <input value={serahre} onChange={(event) => setserahre(event.target.value)} className={css.input} type="text" placeholder='חיפוש...' />

                                                        <Container fluid>
                                                            <Row xs={2}>
                                                                {brands2.filter((val: brandstype) => {
                                                                    if (serahre === '') {
                                                                        return val
                                                                    } else if (val.value.toLowerCase().includes(serahre.toLowerCase())) {
                                                                        return val
                                                                    }
                                                                }).map((e, i: number) =>

                                                                    <Col key={i} className="mt-2 p-1">
                                                                        <Link href={`/Brands/${e.value}`} onClick={() => { setshow(false) }} > <img className={css.img} src={e.src} alt={e.value} /></Link>
                                                                    </Col>

                                                                )}
                                                            </Row>

                                                        </Container>
                                                        {brands2.filter((val: brandstype) => {
                                                            if (serahre === '') {
                                                                return val
                                                            } else if (val.value.toLowerCase().includes(serahre.toLowerCase())) {
                                                                return val
                                                            }
                                                        }).length === 0 && <div className={css.div2}>לא נמצאו תוצאות לחיפוש, אנא נסו שוב.</div>}                                            </div>
                                                </Collapse>
                                            </>}
                                            <Link onClick={() => { setshow(false) }} className={css.Mylink} href="/about">אודות</Link>
                                            <Link onClick={() => { setshow(false) }} className={css.Mylink} href="/connection/login">התחברות</Link>



                                            {roles[0] === 'admin' && <><Link onClick={() => { setshow(false) }} className={css.Mylink} href="/addproduct">הוספה מוצר</Link>
                                                <Link onClick={() => { setshow(false) }} className={css.Mylink} href="/data">ביצועים</Link>
                                                <Link onClick={() => { setshow(false) }} className={css.Mylink} href="/orders">הזמנות</Link>
                                                <Link onClick={() => { setshow(false) }} className={css.Mylink} href="/homearr">עמוד הבית</Link>
                                                <Link onClick={() => { setshow(false) }} className={css.Mylink} href="/users">משתמשים</Link>
                                            </>}
                                        </div>
                                    </Nav>

                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Navbar>
                    ))}
                </>}

        </>
    );
}

export default OffcanvasExample;