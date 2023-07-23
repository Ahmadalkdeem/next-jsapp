import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import css from './css.module.scss'
import './mycss.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap/dist/scc/bootstrap.min.css'
// import { useNavigate } from 'react-router-dom';
import Link from 'next/link';
const MYCarousel = () => {
    // const Navigate = useNavigate()
    return (
        <Carousel interval={null} indicators={false} controls={false} nextIcon={<AiFillForward size={50} />} prevIcon={<AiFillBackward size={50} />} dir='ltr' className={`w-100 d-flex ${css.corsla}`}  >
            <Carousel.Item>
                <img
                    className={css.Imgcorsla}
                    src={`https://media.terminalx.com/pub/media/banners/2023May28500/MEN_DESK_280523_A1.jpg`}
                    alt="First slide"
                />
                <Carousel.Caption className={css.Caption}>
                    <h3 className={css.h3}>גלה את הסטייל שלך</h3>
                    <p className={css.p}>חנות הבגדים המובילה עם המבחר הכי גדול של מוצרי אופנה</p>
                    <Link href='/Shirts' className={css.btncorsla}>לקניה</Link>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    )
}

export default MYCarousel