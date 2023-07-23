'use client'
import css from './css.module.scss'
import Myslider from '../../components/slider/Slider';
import MYCarousel from '../../components/corsla/Carousel';
import List from '../../components/List/List';
import { divcomponts } from '../../arrays/list';
import H2 from '../../components/h2/H2';
import { useAppSelector } from '../../redux/hooks';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const Home = () => {
  const navigate = useRouter();
  const { cards2 } = useAppSelector((s) => s.homePage);
  return (
    <>
      <MYCarousel />
      {/* <Myslider /> */}
      <H2 h2='המוצרים החמים' />
      <List arr={cards2} />
      <div className={css.Div}>
        {divcomponts.map((e, index: number) =>
          <div key={index} onClick={() => {
            navigate.push(e.navigate);
          }} className={`${css.divlink}`}>
            <Image
              className={css.Img}
              src={e.src}
              alt={e.btn} />
            <div className='d-flex justify-content-center'>

              <button className={css.btn}>{e.btn}</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Home