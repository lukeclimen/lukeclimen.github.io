<template>
  <div
    class="card"
    :class="{ flipped: isFlipped }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="card-inner">
      <!-- Front -->
      <div class="card-face card-front" @click="onFrontClick">
        <img
          :src="imageUrl"
          :alt="`${name} screenshot`"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div class="front-overlay">
          <h3 class="front-title">{{ name }}</h3>
        </div>
      </div>

      <!-- Back -->
      <div class="card-face card-back" @click="onBackClick">
        <div class="back-inner">
          <p class="back-description">{{ description }}</p>

          <div class="action-row">
            <div class="action-button">
              <a
                :href="liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-half action-live"
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
                <span class="action-label">Live</span>
              </a>
              <span class="action-divider" aria-hidden="true"></span>
              <a
                :href="repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-half action-code"
                aria-label="View source code"
                @click.stop
              >
                <span class="action-label">Code</span>
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
.card {
  position: relative;
  aspect-ratio: 4 / 3;
  perspective: 1400px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition:
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.card.flipped .card-inner {
  transform: translateZ(24px) rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 1rem;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition:
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.5s ease;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 12px 32px -16px rgba(0, 0, 0, 0.7),
    0 2px 6px -2px rgba(0, 0, 0, 0.5);
}

.card.flipped .card-face {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 18px 48px -16px rgba(0, 0, 0, 0.75),
    0 0 56px -14px rgba(147, 51, 234, 0.42);
}

/* ---------- Front ---------- */

.card-front {
  background-color: oklch(0.18 0.012 270);
}

.front-overlay {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: 1.5rem 1rem 0.85rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.72) 0%,
    rgba(0, 0, 0, 0.35) 55%,
    rgba(0, 0, 0, 0) 100%
  );
}

.front-title {
  font-family: "Josefin Sans", sans-serif;
  font-weight: 400;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.96);
  margin: 0;
}

/* ---------- Back ---------- */

.card-back {
  transform: rotateY(180deg);
  background:
    radial-gradient(
      120% 80% at 50% 110%,
      rgba(147, 51, 234, 0.10) 0%,
      transparent 60%
    ),
    oklch(0.16 0.015 270);
}

/* Top inner highlight — same "lit from above" cue as LinkCard */
.card-back::before {
  content: "";
  position: absolute;
  inset-inline: 1rem;
  top: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.16),
    transparent
  );
  pointer-events: none;
}

.back-inner {
  position: relative;
  height: 100%;
  padding: 1.25rem 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.back-description {
  font-size: 0.875rem;
  line-height: 1.55;
  color: rgba(233, 213, 255, 0.78);
  margin: 0;
}

/* ---------- Action button ---------- */

.action-row {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}

.action-button {
  position: relative;
  width: 83.3333%;
  height: 2.75rem;
  display: flex;
  align-items: stretch;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  overflow: hidden;
}

.action-half {
  position: relative;
  flex: 1 1 50%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  color: rgba(233, 213, 255, 0.9);
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
  text-decoration: none;
  cursor: pointer;
}

.action-half:hover {
  color: #ffffff;
}

.action-label {
  font-family: "Josefin Sans", sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* Short diagonal divider — floats between the halves, doesn't touch the edges */
.action-divider {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1px;
  height: 1.5rem;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(216, 180, 254, 0.85) 50%,
    transparent 100%
  );
  transform: translate(-50%, -50%) rotate(-32deg);
  box-shadow: 0 0 6px rgba(168, 85, 247, 0.55);
  pointer-events: none;
}
</style>
