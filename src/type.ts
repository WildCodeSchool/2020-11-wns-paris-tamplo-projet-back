export interface IMood {
  id: string
  note: number
  comment: string
  created_at: string
}

export interface IStudent {
  id: string
  firstname: string
  lastname: string
  moods: IMood[]
}
