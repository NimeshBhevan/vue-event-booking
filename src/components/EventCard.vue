<template>
  <SectionCard>
    <template #header>{{ title }}</template>
    {{ when }}
    <template #footer>
      <p>{{ description }}n</p>
      <div class="flex justify-end">
        <RegisterButton @click="$emit('register')">Register</RegisterButton>
      </div>
    </template>
  </SectionCard>
</template>

<script setup>
import RegisterButton from './RegisterButton.vue';
import SectionCard from './SectionCard.vue';

defineProps({
  title: String,
  when: String,
  description: String
});

defineEmits(['register']);
</script>
