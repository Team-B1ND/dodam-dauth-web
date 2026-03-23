export interface ScopeInfo {
  scopeKey: string;
  description: string;
}

export interface AuthorizeData {
  clientName: string;
  clientId: string;
  scopes: ScopeInfo[];
  redirectUri: string;
  state: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  trusted: boolean;
  consented: boolean;
}

export interface ClientInfo {
  clientId: string;
  clientName: string;
  description: string;
  websiteUrl: string;
  logoUrl: string;
  redirectUris: string[];
  scopes: string[];
  createdAt: string;
}