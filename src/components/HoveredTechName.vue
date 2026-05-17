<template>
  <div :class="['flex flex-col items-end', hoveredTech ? 'visible' : 'invisible']">
    <span class="text-white font-testimonial text-3xl font-bold italic text-shadow-glow">
      {{ hoveredTech?.name ?? "&nbsp;" }}
    </span>
    <span class="text-gray-400 text-sm font-medium">
      {{ experienceLabel }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useHoveredTech } from "../composables/useHoveredTech";
const { hoveredTech, experienceLabel } = useHoveredTech();
</script>
