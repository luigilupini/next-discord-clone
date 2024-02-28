import styles from "@/components/layout/grid.module.css"
import { create, StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

export type LayoutType = "basic" | "aside" | "balanced"

type LayoutStyles = {
  base: string
  header: string
  body: string
  footer: string
  aside?: string
  end?: string
}

type LayoutState = {
  layout: LayoutType
  layoutStyles: LayoutStyles
  setLayout: (layout: LayoutType) => void
}

// Function to get styles based on layout
const getLayoutStyles = (layout: LayoutType): LayoutStyles => {
  switch (layout) {
    case "basic":
      return {
        base: styles.basic,
        header: styles.basic_header,
        body: styles.basic_body,
        footer: styles.basic_footer,
      }
    case "aside":
      return {
        base: styles.aside,
        header: styles.aside_header,
        body: styles.aside_body,
        footer: styles.aside_footer,
        aside: styles.aside_aside,
      }
    case "balanced":
      return {
        base: styles.balanced,
        header: styles.balanced_header,
        body: styles.balanced_body,
        footer: styles.balanced_footer,
        aside: styles.balanced_aside,
        end: styles.balanced_end,
      }
    default:
      return {
        base: "",
        header: "",
        body: "",
        footer: "",
      }
  }
}

const createLayoutSlice: StateCreator<LayoutState> = (set, get) => ({
  layout: "basic",
  layoutStyles: getLayoutStyles("basic"),
  setLayout: (layout: LayoutType) =>
    set({
      layout,
      layoutStyles: getLayoutStyles(layout),
    }),
})

const useLayoutStore = create(devtools(createLayoutSlice, "LayoutStore" as any))

export default useLayoutStore
