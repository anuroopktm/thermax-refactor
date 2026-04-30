export interface SignInResponse {
  access_token: string;
  token_type: string;
}

export interface UserMeResponse {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  created_on: string;
  last_modified_on: string;
}
