export type TokenData = {
  driverId: number
  userId: number
  roleName: string
}

declare global {
  namespace Express {
    export interface Request {
      tokenData: TokenData
    }
  }
}
