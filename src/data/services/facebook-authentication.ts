import { FacebookAutentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { LoadUserAccountRepository } from '../contracts/repos/user-account'

export class FacebookAuthenticationService implements FacebookAutentication {
  constructor (
    private readonly loadFacebookUserByTokenApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository
  ) {}

  async perform ({ token }: FacebookAutentication.Params): Promise<FacebookAutentication.Result> {
    const fbData = await this.loadFacebookUserByTokenApi.loadUser({ token })
    if (fbData !== undefined) {
      await this.loadUserAccountRepo.load({ email: fbData.email })
    }
    return new AuthenticationError()
  }
}
