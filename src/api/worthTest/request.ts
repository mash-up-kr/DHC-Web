type Gender = 'MALE' | 'FEMALE';

export interface WealthTestRequest {
  name: string;
  gender: Gender;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string | null; // HH:mm (없으면 null)
}

export interface WealthGroupCreateRequest {
  groupName: string;
  resultId?: string | null;
}

export interface WealthGroupJoinRequest {
  resultId: string;
}
