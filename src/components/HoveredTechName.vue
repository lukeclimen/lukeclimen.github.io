<template>
  <span
    :class="[
      'text-white font-testimonial text-3xl font-bold',
      hoveredTech ? 'italic text-shadow-glow' : '',
    ]"
  >
    {{ hoveredTech ?? "\u00A0" }}
  </span>
</template>

<script setup lang="ts">
import { useHoveredTech } from "../composables/useHoveredTech";
const { hoveredTech } = useHoveredTech();
</script>
