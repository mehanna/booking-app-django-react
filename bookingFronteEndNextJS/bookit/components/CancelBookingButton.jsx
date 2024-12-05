'use client';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import cancelBooking from '@/app/actions/cancelBooking';

const CancelBookingButton = ({ bookingId }) => {
  const handleCancel = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel the booking?'
    );

    if (confirmed) {
      try {
        const response = await cancelBooking(bookingId);
        toast.success('Booking canceled successfully!');
      } catch (error) {
        console.log('Failed canceled Booking', error);
        toast.error('Failed canceled Booking');
      }
    }
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
    >
      <FaTrash className='inline mr-1' /> Cancel Booking
    </button>
  );
};

export default CancelBookingButton;