import React from 'react'
import css from './a404.module.scss'

import { BiSad } from 'react-icons/bi';
function Notfoud() {
    // window.onscroll = () => { }
    return (
        <div className={css.body}>
            <p className={css.p}>
                4<BiSad />4
            </p>
            <p className={css.p2}>! ops The page is not found</p>
            {/* <Link className={css.link} href="/">back</Link> */}

        </div>
    )
}

export default Notfoud