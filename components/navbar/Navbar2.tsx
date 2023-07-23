import React, { useState } from 'react'
import css from './css2.module.scss'
import { MdAccountCircle } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
// import { NavLink, Router, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation'
import { useAppSelector } from '../../redux/hooks';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Link from 'next/link';


const Navbae2 = () => {
    const navigate = useRouter();
    let { roles } = useAppSelector(e => e.user)
    return (
        <>
            <div className={css.divlogo}>
                {/* <Link href={`/`}> */}
                <img onClick={() => { navigate?.push('/') }} className={css.logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzV_u0UjwQds2dccWrlW8TOF3RoJDRZ0-3Gv-7FUxIA&s" alt="logo" />
                {/* </Link> */}
            </div>
            <div className={css.Navbar}>
                <div className='d-flex g-2'>
                    <div onClick={() => { navigate?.push('/Mycard') }} className={css.divicon}>
                        <span>Shoping</span>
                        <AiFillShopping size={18} />
                    </div>
                    <div onClick={() => { navigate?.push('/connection/login') }} className={css.divicon}>
                        <span>account</span>
                        <MdAccountCircle size={18} />
                    </div>

                </div>
                <div>
                    <div onClick={() => { navigate?.push('/Favorites') }}>
                        {/* navigate('/Favorites') */}
                        <MdOutlineFavoriteBorder color='red' size={28} />
                    </div>
                </div>
            </div >
            <div className={`${css.Navbar} ${css.Navbar2}`}>
                <Link className={css.link} href="/Shirts">חולצות</Link>
                <Link className={css.link} href="/pants">מכנסיים</Link>
                <Link className={css.link} href="/shoes">נעליים</Link>
                <Link className={css.link} href="/Brands">מותגים</Link>
                <Link className={css.link} href="/about">אודות</Link>

                {roles[0] === 'admin' &&
                    <><Link className={css.link} href="/addproduct">הוספה מוצר</Link>
                        <Link className={css.link} href="/data">ביצועים</Link>
                        <Link className={css.link} href="/orders">הזמנות</Link>
                        <Link className={css.link} href="/homearr">עמוד הבית</Link>
                        <Link className={css.link} href="/users">משתמשים</Link>
                    </>
                }
            </div>
        </>
    )
}

export default Navbae2