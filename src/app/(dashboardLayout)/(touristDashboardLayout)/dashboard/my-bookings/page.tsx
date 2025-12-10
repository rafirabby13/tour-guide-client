import MyBookingsTable from '@/components/modules/tourist/MyBookingsTable'
import { getMyProfile } from '@/services/commmon/myProfile'
import { getMyBookings } from '@/services/tourist/getAllBookings'
import React from 'react'

const MyBookingsPage = async () => {
    const bookings = await getMyBookings()
    const profile = await getMyProfile()
    console.log({ bookings })
    return (
        <div>
           <MyBookingsTable bookings={bookings?.data} meta={bookings?.meta}/>
        </div>
    )
}

export default MyBookingsPage
