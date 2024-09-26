<template>
  <SectionCard>
    <template #header>{{ title }}</template>
    {{ when }}
    <template #footer>
      <p>{{ description }}n</p>
      <div class="flex justify-end">
        <RoundButton @click="$emit('register')">Register</RoundButton>
      </div>
    </template>
  </SectionCard>
</template>

<script setup>
import RoundButton from './RoundButton.vue';
import SectionCard from './SectionCard.vue';

defineProps({
  title: String,
  when: String,
  description: String
});

defineEmits(['register']);
</script>
