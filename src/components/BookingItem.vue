<template>
  <SectionCard>
    <div class="flex justify-between">
      <div>{{ title }}</div>
      <RoundButton variant="danger">Cancel</RoundButton>
    </div>
  </SectionCard>
</template>

<script setup>
defineProps({
  title: String
});
import RoundButton from './RoundButton.vue';
import SectionCard from './SectionCard.vue';
</script>
