<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div v-if="submitted" key="success" class="py-8">
        <p
          class="font-display text-[10px] uppercase tracking-[0.2em] text-purple-200/50 mb-5"
        >
          Confirmed
        </p>
        <h2 class="font-display text-3xl font-light text-white mb-3">
          Message sent.
        </h2>
        <p class="text-purple-200/50 text-sm leading-relaxed">
          I'll get back to you soon!
        </p>
      </div>

      <form
        v-else
        key="form"
        @submit.prevent="handleSubmit"
        novalidate
        class="space-y-8"
      >
        <input
          type="checkbox"
          name="botcheck"
          tabindex="-1"
          aria-hidden="true"
          class="hidden"
        />

        <div>
          <label
            for="name"
            class="block font-display text-[10px] uppercase tracking-[0.15em] text-purple-200/70 mb-3"
          >
            Name
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="name"
            placeholder="Your name"
            class="w-full bg-white/[0.08] border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-purple-200/40 font-body transition-colors duration-200 focus:outline-none focus:border-purple-400/50 focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:ring-offset-0"
          />
        </div>

        <div>
          <p
            class="font-display text-[10px] uppercase tracking-[0.15em] text-purple-200/70 mb-3"
            id="reason-label"
          >
            What brings you here?
          </p>
          <div
            class="flex flex-wrap gap-2"
            role="radiogroup"
            aria-labelledby="reason-label"
          >
            <label
              v-for="option in reasons"
              :key="option.value"
              class="cursor-pointer radio-label"
            >
              <input
                type="radio"
                v-model="form.reason"
                :value="option.value"
                name="reason"
                class="sr-only"
              />
              <span
                :class="[
                  'block px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border select-none',
                  form.reason === option.value
                    ? 'bg-white/15 border-purple-400/50 text-white'
                    : 'border-white/20 text-purple-200/75 hover:text-white hover:bg-white/10',
                ]"
              >
                {{ option.label }}
              </span>
            </label>
          </div>
        </div>

        <div>
          <label
            for="message"
            class="block font-display text-[10px] uppercase tracking-[0.15em] text-purple-200/70 mb-3"
          >
            Message
          </label>
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            rows="5"
            placeholder="What's on your mind?"
            class="w-full bg-white/[0.08] border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-purple-200/40 font-body transition-colors duration-200 focus:outline-none focus:border-purple-400/50 focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:ring-offset-0 resize-y min-h-32"
          ></textarea>
        </div>

        <div>
          <p v-if="error" class="text-red-400/70 text-xs mb-4 font-body">
            {{ error }}
          </p>
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2 rounded-full border border-white/30 font-display text-[10px] uppercase tracking-[0.15em] text-white/80 hover:text-white hover:border-white/50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30"
          >
            {{ submitting ? "Sending…" : "Send message" }}
          </button>
        </div>
      </form>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const apiKey = import.meta.env.PUBLIC_FORM_API_KEY;

const reasons = [
  { label: "Job Opportunity", value: "Job Opportunity" },
  { label: "Freelance / Project", value: "Freelance / Project" },
  { label: "General Inquiry", value: "General Inquiry" },
];

const form = reactive({ name: "", reason: "", message: "" });
const submitted = ref(false);
const submitting = ref(false);
const error = ref("");

async function handleSubmit() {
  error.value = "";

  if (!form.name.trim()) {
    error.value = "Please enter your name.";
    return;
  }
  if (!form.reason) {
    error.value = "Please select a reason for contact.";
    return;
  }
  if (!form.message.trim()) {
    error.value = "Please include a message.";
    return;
  }

  submitting.value = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: apiKey,
        name: form.name,
        subject: `[lukeclimen.github.io] ${form.reason}`,
        reason: form.reason,
        message: form.message,
        botcheck: "",
      }),
    });

    const data = await response.json();

    if (data.success) {
      submitted.value = true;
    } else {
      error.value = "Couldn't send that. Check your connection and try again.";
    }
  } catch {
    error.value = "Couldn't send that. Check your connection and try again.";
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.radio-label input:focus-visible + span {
  outline: 2px solid rgba(147, 51, 234, 0.35);
  outline-offset: 2px;
}
</style>
