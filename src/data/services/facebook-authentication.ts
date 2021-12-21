import { FacebookAutentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '../contracts/repos/user-account'

export class FacebookAuthenticationService implements FacebookAutentication {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) {}

  async perform ({ token }: FacebookAutentication.Params): Promise<FacebookAutentication.Result> {
    const fbData = await this.facebookApi.loadUser({ token })
    if (fbData !== undefined) {
      await this.userAccountRepo.load({ email: fbData.email })
      await this.userAccountRepo.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
