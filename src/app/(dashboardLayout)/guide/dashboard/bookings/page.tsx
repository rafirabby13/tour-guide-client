import { getGuideBookings } from '@/services/guide/booking'
import React from 'react'

const BookingPage = async () => {
    const bookings = await getGuideBookings()
    console.log(bookings)
  return (
    <div>
      BookingPage
    </div>
  )
}

export default BookingPage
