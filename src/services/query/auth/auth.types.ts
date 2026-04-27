export interface SignInResponse {
  access_token: string;
  token_type: string;
}

export interface UserMeResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  organization_id: string;
  is_verified: boolean;
  verification_link?: string;
  invitation_link?: string;
}
