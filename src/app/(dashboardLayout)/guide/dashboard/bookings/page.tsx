import GuideBookingsTable from '@/components/modules/guide/GuideBookingsTable'
import GuideBookings from '@/components/modules/guide/GuideBookingsTable'
import { getGuideBookings } from '@/services/guide/booking'
import React from 'react'

const BookingPage = async () => {
    const bookings = await getGuideBookings()
    console.log(bookings)
  return (
    <div>
      <GuideBookingsTable bookings={bookings.data} meta={bookings.meta}/>
    </div>
  )
}

export default BookingPage
