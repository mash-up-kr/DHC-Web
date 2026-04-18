export type WealthAgeGroup =
  | 'all'
  | '20'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '80';

export interface WealthFortuneGraphPoint {
  age: number;
  amount: number;
}

export interface WealthFortuneEvent {
  age: number;
  description: string;
  amount: number;
  iconUrl: string;
}

export interface WealthFortuneResultResponse {
  id: number;
  fortuneType: string;
  fortuneTypeDescription: string;
  fortuneDetail: string;
  fortuneTypeImageUrl: string;
  graphData: WealthFortuneGraphPoint[];
  events: WealthFortuneEvent[];
}

export interface WealthTestResultResponse {
  resultId: string;
  name: string;
  result: WealthFortuneResultResponse;
}

export interface WealthTestStatsResponse {
  totalParticipants: number;
}

export interface WealthGroupCreateResponse {
  groupId: string;
  groupName: string;
  inviteCode: string;
  memberCount: number;
}

export interface WealthGroupInviteResponse {
  groupId: string;
  groupName: string;
  memberCount: number;
}

export interface WealthGroupJoinResponse {
  groupId: string;
  groupName: string;
  memberCount: number;
}

export interface WealthGroupRankingEntry {
  rank: number;
  resultId: string;
  name: string;
  amount: number;
  result: WealthFortuneResultResponse;
}

export interface WealthGroupRankingResponse {
  groupName: string;
  inviteCode: string;
  totalMemberCount: number;
  ageGroup: WealthAgeGroup;
  rankings: WealthGroupRankingEntry[];
}
