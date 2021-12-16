import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/errors'

export interface FacebookAutentication {
  perform: (token: FacebookAutentication.Params) => Promise<FacebookAutentication.Result>
}

namespace FacebookAutentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
