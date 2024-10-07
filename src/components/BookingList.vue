<template>
  <template v-if="error">
    <ErrorCard :retry="fetchBookings"> Failed to fetch booking. </ErrorCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!loading">
        <template v-if="bookings.length">
          <BookingItem
            v-for="booking in bookings"
            :key="booking.id"
            :title="booking.eventTitle"
            :status="booking.status"
            @cancel="cancelBooking(booking.id)"
          />
        </template>
        <template v-else>
          <div class="col-span-2 text-center text-gray-500">You haven't booked for any events.</div>
        </template>
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>

<script setup>
import { onMounted } from 'vue';

import BookingItem from './BookingItem.vue';
import LoadingBookingItem from './LoadingBookingItem.vue';
import ErrorCard from './ErrorCard.vue';
import useBookings from '@/composables/useBookings';

const { bookings, loading, error, fetchBookings, cancelBooking } = useBookings();

onMounted(() => {
  fetchBookings();
});
</script>
