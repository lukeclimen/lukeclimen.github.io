import { ref, computed } from "vue";

export interface HoveredTechInfo {
  name: string;
  startYear: number;
  endYear: number | "present";
}

const hoveredTech = ref<HoveredTechInfo | null>(null);

const experienceLabel = computed(() => {
  if (!hoveredTech.value) return " ";
  const { startYear, endYear } = hoveredTech.value;
  const end = endYear === "present" ? new Date().getFullYear() : endYear;
  const years = end - startYear;
  if (years <= 0) return "< 1 year of experience";
  return `${years} year${years === 1 ? "" : "s"} of experience`;
});

export function useHoveredTech() {
  return { hoveredTech, experienceLabel };
}
