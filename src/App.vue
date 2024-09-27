<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8" v-if="!eventLoading">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :title="event.title"
        :when="event.date"
        :description="event.description"
        @register="console.log('registered')"
      />
    </section>
    <section v-else>Loading events....</section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <BookingItem v-for="i in 3" :key="i"></BookingItem>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import BookingItem from './components/BookingItem.vue';
import EventCard from './components/EventCard.vue';

const events = ref([]);
const eventLoading = ref(false);

const fetchEvents = async () => {
  eventLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
  } finally {
    eventLoading.value = false;
  }
};

onMounted(() => {
  fetchEvents();
});
</script>
