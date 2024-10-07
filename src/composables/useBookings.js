import { ref } from 'vue';

const bookings = ref([]);
const loading = ref(false);
const error = ref(null);

const findBookingById = (id) => bookings.value.findIndex((b) => b.id === id);

// GET -all event bookings
const fetchBookings = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
};

// POST - register for the event
const handleRegistration = async (event) => {
  if (bookings.value.some((booking) => booking.evenId === event.id)) {
    alert('You are already registered');
    return;
  }
  const newBooking = {
    id: Date.now().toString(),
    evenId: event.id,
    eventTitle: event.title,
    status: 'pending'
  };

  bookings.value.push(newBooking);

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newBooking, status: 'confirmed' })
    });

    if (response.ok) {
      const index = findBookingById(newBooking.id);
      bookings.value[index] = await response.json();
    } else {
      throw new Error('failed to confirm booking');
    }
  } catch (error) {
    console.error('Failed to register for event:', error);
    bookings.value = bookings.value.filter((b) => b.id !== newBooking.id);
  }
};

// DELETE - cancel the booking
const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId);
  const orginalBooking = bookings.value[index];
  bookings.value.splice(index, 1);

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Booking could not be cancelled');
    }
  } catch (error) {
    console.error('Failed to cancel bookin:', error);
    bookings.value.splice(index, 0, orginalBooking);
  }
};

export default function useBookings() {
  return {
    bookings,
    loading,
    error,
    fetchBookings,
    handleRegistration,
    cancelBooking
  };
}
