import { FacebookAutentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { CreateFacebookAccountRepository, LoadUserAccountRepository, UpdateFacebookAccountRepository } from '../contracts/repos/user-account'

export class FacebookAuthenticationService implements FacebookAutentication {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository
  ) {}

  async perform ({ token }: FacebookAutentication.Params): Promise<FacebookAutentication.Result> {
    const fbData = await this.facebookApi.loadUser({ token })
    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      if (accountData?.name !== undefined) {
        await this.userAccountRepo.updateWithFacebook({
          id: accountData.id,
          name: accountData.name,
          facebookId: fbData.facebookId
        })
      } else {
        await this.userAccountRepo.createFromFacebook(fbData)
      }
    }
    return new AuthenticationError()
  }
}
