import MyListingToursTable from '@/components/modules/guide/MyListingToursTable'
import { getMyTours } from '@/services/guide/getMyTours'
import React from 'react'

const TourListingPage = async () => {
    const tours = await getMyTours()
    // console.log(tours)
    return (
        <div>
            <MyListingToursTable tours={tours.data} meta={tours.meta}/>
        </div>
    )
}

export default TourListingPage
