/* ⭐️ Each state (initial, animate, exit) state
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Motion state includes its own `transition` configuration. This allows for the
transition details to be correctly utilized by Motion when transitioning between
these states. The delay for the exit transition is included, demonstrating how
you can customize transitions between different states. By structuring variants,
we ensure that each animation state has the desired transition effect, and your
code aligns with the expected format for Framer Motion components. This should
resolve any type issues and make your animations work as expected. */
export const linearVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.5,
    type: "spring",
    damping: 17,
    stiffness: 100,
  },
}

export const subLinearVariants = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: 0.6 },
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6 },
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: 0.6 },
  },
}

export const springVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
}

export const springTransition = (index: number) => ({
  // TODO: SOFT SPRING
  // duration: 0.15,
  // delay: index * 0.15,
  // type: "spring",
  // stiffness: 100,
  // damping: 16,
  // TODO: AGGRESSIVE SPRING
  duration: 0.15,
  delay: index * 0.05,
  type: "spring",
  stiffness: 220,
  damping: 18,
})

export const subSpringVariants = {
  initial: {
    opacity: 0,
    scale: 0.25,
    filter: "blur(20px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    scale: 0.25,
    filter: "blur(20px)",
  },
}

export const hoverVariants = {
  // TODO: QUICK HOVER
  // initial: { opacity: 0 },
  // animate: { opacity: 1, transition: { duration: 0.15 } },
  // exit: { opacity: 0, transition: { duration: 0.15, delay: 0.2 } },
  // TODO: DELAYED HOVER
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 1, delay: 1.5 } },
}
