import { User } from './user'

export type Score = {
  id?: number
  user_id?: number
  number_of_potentials?: number
  images?: string[]
  claimed?: boolean
  claimed_by?: number
  claimed_at?: string
  last_updated_time?: string
  ranked?: boolean
  ranked_by?: number
  ranked_at?: string
  dealbreakers?: Record<string, number>
  User?: User
  UserClaimedBy?: User
  topPotentials: Array<{
    id: number
    user_id: number
    match_user_id: number
    score: number
    rank: number
    UserMatch: User
  }>
}
