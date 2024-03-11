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
}

export type Params = {
  id: string
  edit: string
  slug: string
  serverId: string
  inviteCode: string
}

export type ServerProps = {
  params: Params
  searchParams: SearchParams
}
