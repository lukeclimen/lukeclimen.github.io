<template>
  <div
    class="card group"
    :class="{ flipped: isFlipped }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="card-inner">
      <!-- Front -->
      <div
        class="card-face card-front"
        @click="onFrontClick"
      >
        <img
          :src="imageUrl"
          :alt="`${name} screenshot`"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div
          class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-10"
        >
          <h3 class="font-display text-lg font-medium text-white">
            {{ name }}
          </h3>
        </div>
      </div>

      <!-- Back -->
      <div class="card-face card-back" @click="onBackClick">
        <div class="flex h-full flex-col justify-between p-4">
          <p class="text-sm leading-relaxed text-purple-100/80">
            {{ description }}
          </p>

          <div class="flex justify-center">
            <div class="diagonal-button">
              <a
                :href="liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="diagonal-half diagonal-live"
                aria-label="View live site"
                @click.stop
              >
                <span class="diagonal-content">
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
                  <span class="text-xs font-medium tracking-wide">Live</span>
                </span>
              </a>
              <a
                :href="repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="diagonal-half diagonal-code"
                aria-label="View source code"
                @click.stop
              >
                <span class="diagonal-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                  <span class="text-xs font-medium tracking-wide">Code</span>
                </span>
              </a>
              <svg
                class="diagonal-line"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="100"
                  x2="100"
                  y2="0"
                  stroke="rgba(255,255,255,0.4)"
                  stroke-width="1"
                  vector-effect="non-scaling-stroke"
                />
              </svg>
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
.card {
  position: relative;
  aspect-ratio: 4 / 3;
  perspective: 1200px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 1rem;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #18181b;
}

.card-front {
  cursor: pointer;
}

.card-back {
  transform: rotateY(180deg);
  background: linear-gradient(160deg, rgba(39, 16, 64, 0.92), rgba(15, 8, 28, 0.96));
  cursor: pointer;
}

.diagonal-button {
  position: relative;
  width: 83.3333%;
  height: 3.25rem;
  border-radius: 9999px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
}

.diagonal-half {
  position: absolute;
  inset: 0;
  display: block;
  color: rgba(233, 213, 255, 0.85);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.diagonal-live {
  clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
}

.diagonal-code {
  clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
}

.diagonal-half:hover {
  background-color: rgba(168, 85, 247, 0.18);
  color: #ffffff;
}

.diagonal-content {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.diagonal-live .diagonal-content {
  left: 33%;
  top: 38%;
}

.diagonal-code .diagonal-content {
  left: 67%;
  top: 62%;
}

.diagonal-line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
