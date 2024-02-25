"use client"
import React, { useCallback, useState, useEffect } from 'react';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import styles from "../../../styles/categories.module.css";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from "query-string"
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!',
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is has windmills!',
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This is property has a beautiful pool!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is near a lake!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activies!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is an ancient castle!'
    },
    {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property offers camping activities!'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic environment!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn!'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!'
    }
]

const Categories = () => {
    const router = useRouter()
    const params = useSearchParams()
    const pathname = usePathname()
    const [selectedCat, setSelectedCat] = useState('')

    useEffect(() => {
        const category = params?.get("category")
        setSelectedCat(category || '')
    }, [params])

    const isMainPage = pathname === "/"
    if (!isMainPage) {
        return null
    }

    const handleClick = useCallback((label: string) => {
        let currentQuery = {}
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }
        if (params?.get("category") === label) {
            delete updatedQuery.category;
            setSelectedCat("")
        }
        const url = qs.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, { skipNull: true })
        router.push(url)
        setSelectedCat(label)
    }, [params, router])

    return (
        <Container>
            <div className={styles.categories}>
                {categories.map((item, index) => (
                    <div onClick={() => handleClick(item.label)} className={selectedCat === item.label ? `${styles.category} ${styles.selected}` : styles.category} key={index}>
                        <item.icon size={26} className={styles.icon} />
                        <span className={styles.label}>{item.label}</span>
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default Categories;