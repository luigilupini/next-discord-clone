import { useEffect, useState } from "react"

type Props = {
  topRef: React.RefObject<HTMLDivElement>
  bottomRef: React.RefObject<HTMLDivElement>
  shouldLoadMore: boolean
  loadMore: () => void
  count: number
}

export const useChatScroll = ({
  topRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: Props) => {
  const [hasInitialized, setHasInitialized] = useState(false)

  // This effect will trigger the loadMore function when the user scrolls to the
  // top of the chat. This is useful for infinite scrolling.
  useEffect(() => {
    const topDiv = topRef?.current

    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop
      // If we reach the top! Trigger the loadMore function.
      if (scrollTop === 0 && shouldLoadMore) loadMore()
    }
    // Add the event listener to the topDiv useRef reference.
    topDiv?.addEventListener("scroll", handleScroll)
    return () => {
      topDiv?.removeEventListener("scroll", handleScroll)
    }
  }, [shouldLoadMore, loadMore, topRef])

  // This effect will scroll to the bottom of the chat when a new message is
  // added. This is useful for chat applications.
  useEffect(() => {
    const bottomDiv = bottomRef?.current
    const topDiv = topRef.current
    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true)
        return true
      }
      // If the user has scrolled up, don't auto scroll.
      if (!topDiv) return false
      // Here we calc the distance from the bottom of the chat. If we not to far
      // from the bottom of the chat, we should auto scroll. If the user scrolls
      // up, we don't want to auto scroll to the bottom and disrupt the user.
      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
      return distanceFromBottom <= 100
    }

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        })
      }, 100)
    }
  }, [bottomRef, topRef, count, hasInitialized])
}
