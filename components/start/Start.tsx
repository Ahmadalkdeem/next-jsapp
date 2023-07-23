import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers } from '../../features/cards/cardshirts'
import { fetchUsers2 } from '../../features/cards/cardPants';
import { fetchUsers2 as fetchUsers4 } from '../../features/cards/arrhomepage';
import { fetchUsers3 } from '../../features/cards/cardshose';
import { useEffect } from 'react'
import axios from 'axios';
import { updatedetalise } from '../../features/user/user';
import { AddArr } from '../../features/cards/mycart';
import { addItems } from '../../features/cards/favorites';
import { addItems as addItems2 } from '../../features/cards/arrhomepage';

import { Url } from '../../arrays/list';

const Start = () => {

    let { roles } = useAppSelector(e => e.user)
    let Dispatch = useAppDispatch()
    let { cards } = useAppSelector(e => e.homePage)

    async function start() {
        const myData: any = localStorage.getItem("userdetalis");
        const cart: any = localStorage.getItem("cart");
        const Favorites: any = localStorage.getItem("Favorites");
        const arr: any = localStorage.getItem("homepage");

        if (arr !== null && arr !== undefined && cards.length === 0) {
            Dispatch(addItems2(JSON.parse(arr)))
        }

        if (cart !== null && cart !== undefined) {
            Dispatch(AddArr(JSON.parse(cart)))
        }
        if (Favorites !== null && Favorites !== undefined) {
            Dispatch(addItems(JSON.parse(Favorites)))
        }
        const cart2: any = JSON.parse(myData);
        Dispatch(fetchUsers())
        Dispatch(fetchUsers2())
        Dispatch(fetchUsers4())
        Dispatch(fetchUsers3())

        if (myData !== null && myData !== undefined) {
            Dispatch(updatedetalise(cart2))
            axios.post(`${Url}api/auth/valtoken/${cart2.accessToken}`).then((response) => {
                Dispatch(updatedetalise(response.data))
                if (response.data.favorite[0].products.length !== 0) {
                    Dispatch(addItems(response.data.favorite[0].products))
                }
            }).catch(e => {
                console.log(cart2.accessToken);
                console.log(e);
                Dispatch(updatedetalise({
                    accessToken: cart2.accessToken,
                    email: cart2.email,
                    id: cart2.id,
                    roles: ['user'],
                    username: cart2.username
                }))

            })
        }
    }
    useEffect(() => {
        start()
    }, []);
    return (
        <></>
    )
}

export default Start