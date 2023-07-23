import { useRouter } from 'next/navigation';
import React from 'react'
import { useAppSelector } from '@/redux/hooks'
const Navgite = () => {
    let { roles } = useAppSelector((e) => e.user)
    let router = useRouter()
    if (roles[0] !== 'admin') {
        router.push('/')
    }
    return (
        <>
        </>
    )
}

export default Navgite