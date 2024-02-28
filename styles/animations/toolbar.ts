export const itemVariants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { delay: 0.25 },
  },
}

export const itemTransition = (index: number) => ({
  duration: 0.25,
  delay: index * 0.15,
  type: "spring",
  stiffness: 220,
  damping: 18,
})

export const slideVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.1 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.1 } },
}
