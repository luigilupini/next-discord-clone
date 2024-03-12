export type SearchParams = {
  id?: string
  query?: string
  search?: string
  name?: string
  page?: string
  sort?: string
  sortBy?: string
  orderBy?: string
  viewBy?: string
  viewAs?: string
  video?: boolean
}

export type Params = {
  id: string
  edit: string
  slug: string
  serverId: string
  channelId: string
  inviteCode: string
  memberId: string
}

export type ServerProps = {
  params: Params
  searchParams: SearchParams
}
