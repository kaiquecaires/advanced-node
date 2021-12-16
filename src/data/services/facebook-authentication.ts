import { FacebookAutentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'

export class FacebookAuthenticationService implements FacebookAutentication {
  constructor (private readonly loadFacebookUserByTokenApi: LoadFacebookUserApi) {}

  async perform ({ token }: FacebookAutentication.Params): Promise<FacebookAutentication.Result> {
    await this.loadFacebookUserByTokenApi.loadUser({ token })
    return new AuthenticationError()
  }
}
