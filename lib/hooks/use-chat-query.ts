import useSocketStore from "@/state/zustand/use-socket-store"
import { useInfiniteQuery } from "@tanstack/react-query"
import qs from "query-string"

type Props = {
  queryKey: string
  apiUrl: string
  paramKey: "channelId" | "conversationId"
  paramValue: string
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: Props) => {
  const socket = useSocketStore((state) => state.socket)
  const isConnected = useSocketStore((state) => state.isConnected)

  // console.log(socket)
  // console.log(isConnected)

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true },
    )
    const response = await fetch(url)
    return response.json()
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000, // 1 seconds
    // refetchInterval: 1000, // 1 seconds
  })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  }
}
