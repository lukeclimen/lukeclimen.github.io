<template>
  <a
    :href="url"
    @mouseenter="hoveredTech = name"
    @mouseleave="hoveredTech = null"
    rel="noopener noreferrer"
    target="_blank"
    :aria-label="`${name} link`"
    class="relative transform-gpu overflow-hidden rounded-xl lg:rounded-2xl p-6"
  >
    <div
      class="absolute inset-x-0 bottom-3 lg:bottom-4 top-0 rounded-t-xl lg:rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent"
    ></div>
    <div
      class="absolute inset-x-3 lg:inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
    ></div>
    <div class="absolute inset-px rounded-xl lg:rounded-2xl bg-zinc-950"></div>
    <div
      class="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,rgba(255,255,255,0.05),transparent)]"
    ></div>
    <div class="relative flex h-full flex-col">
      <img :src="image" :alt="`${name} logo`" class="size-8" />
    </div>
  </a>
</template>

<script setup lang="ts">
import { useHoveredTech } from "../composables/useHoveredTech";
const { hoveredTech } = useHoveredTech();

defineProps<{
  name: string;
  url: string;
  image: string;
}>();
</script>
