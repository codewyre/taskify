import { injectable } from 'inversify';
import Keycloak from 'keycloak-js';

@injectable()
export class AuthenticationService {
  //#region Private Fields
  private _keycloak: Keycloak | null = null;
  //#endregion

  //#region Properties
  public get jsonWebToken(): string {
    return this._keycloak?.token as string;
  }
  //#endregion

  //#region Public Methods
  public async initialize(): Promise<void> {
    this._keycloak = new Keycloak({
      clientId: 'taskify-app',
      realm: 'taskify',
      url: 'http://oauth.docker.localhost'
    });

    const authenticated = await this._keycloak.init({
      redirectUri: 'http://app.docker.localhost',
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: 'http://app.docker.localhost/assets/token-proxy.html'
    });

    if (!authenticated) {
      this._keycloak.login();
      return;
    }
  }
  //#endregion
}