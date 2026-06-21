<template>
  <div
    class="card relative aspect-[4/3] [perspective:1400px]"
    :class="{ flipped: isFlipped }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      class="card-inner relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] [will-change:transform]"
    >
      <!-- Front -->
      <div
        class="card-face absolute inset-0 overflow-hidden rounded-2xl transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-[oklch(0.18_0.012_270)] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_12px_32px_-16px_rgba(0,0,0,0.7),0_2px_6px_-2px_rgba(0,0,0,0.5)]"
        @click="onFrontClick"
      >
        <img
          :src="imageUrl"
          :alt="`${name} screenshot`"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div
          class="absolute inset-x-0 bottom-0 px-4 pt-6 pb-3.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        >
          <h3
            class="m-0 font-display font-normal text-[1.05rem] tracking-wide text-white/95"
          >
            {{ name }}
          </h3>
        </div>
      </div>

      <!-- Back -->
      <div
        class="card-face absolute inset-0 overflow-hidden rounded-2xl transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-[oklch(0.16_0.015_270)] bg-[radial-gradient(120%_80%_at_50%_110%,rgba(147,51,234,0.10)_0%,transparent_60%)] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_12px_32px_-16px_rgba(0,0,0,0.7),0_2px_6px_-2px_rgba(0,0,0,0.5)] before:content-[''] before:absolute before:inset-x-4 before:top-0 before:h-px before:pointer-events-none before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
        @click="onBackClick"
      >
        <div
          class="relative h-full flex flex-col justify-between gap-4 px-5 pt-5 pb-4"
        >
          <p class="m-0 text-sm leading-[1.55] text-purple-100/80">
            {{ description }}
          </p>

          <div class="flex justify-center shrink-0">
            <div
              class="relative w-5/6 h-11 flex items-stretch overflow-hidden rounded-full bg-white/[0.06] border border-white/[0.14]"
            >
              <a
                :href="liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="relative flex-1 min-w-0 flex items-center justify-center gap-1.5 no-underline cursor-pointer text-purple-200/90 hover:text-white transition-colors duration-200"
                aria-label="View live site"
                @click.stop
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span
                  class="font-display font-medium text-[0.72rem] uppercase tracking-[0.14em]"
                >Live</span>
              </a>
              <span
                aria-hidden="true"
                class="absolute top-1/2 left-1/2 w-px h-6 pointer-events-none bg-gradient-to-b from-transparent via-purple-300/85 to-transparent shadow-[0_0_6px_rgba(168,85,247,0.55)] [transform:translate(-50%,-50%)_rotate(-32deg)]"
              ></span>
              <a
                :href="repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="relative flex-1 min-w-0 flex items-center justify-center gap-1.5 no-underline cursor-pointer text-purple-200/90 hover:text-white transition-colors duration-200"
                aria-label="View source code"
                @click.stop
              >
                <span
                  class="font-display font-medium text-[0.72rem] uppercase tracking-[0.14em]"
                >Code</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{
  name: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
}>();

const isFlipped = ref(false);
const hasHover = ref(true);

onMounted(() => {
  hasHover.value = window.matchMedia("(hover: hover)").matches;
});

function onMouseEnter() {
  if (hasHover.value) isFlipped.value = true;
}
function onMouseLeave() {
  if (hasHover.value) isFlipped.value = false;
}
function onFrontClick() {
  if (!hasHover.value) isFlipped.value = true;
}
function onBackClick() {
  if (!hasHover.value) isFlipped.value = false;
}
</script>

<style scoped>
/* Parent-state-driven rules — kept here because they cross element boundaries */
.card.flipped .card-inner {
  transform: translateZ(24px) rotateY(180deg);
}
.card.flipped .card-face {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 18px 48px -16px rgba(0, 0, 0, 0.75),
    0 0 56px -14px rgba(147, 51, 234, 0.42);
}
</style>
