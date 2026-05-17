import { ref } from "vue";

const hoveredTech = ref<string | null>(null);

export function useHoveredTech() {
  return { hoveredTech };
}
