import { apiClient } from '../client';
import {
  WealthGroupCreateRequest,
  WealthGroupJoinRequest,
  WealthTestRequest,
} from './request';
import {
  WealthAgeGroup,
  WealthGroupCreateResponse,
  WealthGroupInviteResponse,
  WealthGroupJoinResponse,
  WealthGroupRankingResponse,
  WealthTestResultResponse,
  WealthTestStatsResponse,
} from './response';

export type {
  WealthTestRequest,
  WealthGroupCreateRequest,
  WealthGroupJoinRequest,
} from './request';
export type {
  WealthAgeGroup,
  WealthFortuneEvent,
  WealthFortuneGraphPoint,
  WealthFortuneResultResponse,
  WealthGroupCreateResponse,
  WealthGroupInviteResponse,
  WealthGroupJoinResponse,
  WealthGroupRankingEntry,
  WealthGroupRankingResponse,
  WealthTestResultResponse,
  WealthTestStatsResponse,
} from './response';
export { mapStoreToWealthRequest } from './mapper';

export async function postWorthTest(
  request: WealthTestRequest,
): Promise<WealthTestResultResponse> {
  return apiClient<WealthTestResultResponse>('/api/wealth-test', {
    method: 'POST',
    body: request,
  });
}

export async function getWorthTestResult(
  resultId: string,
): Promise<WealthTestResultResponse> {
  return apiClient<WealthTestResultResponse>(
    `/api/wealth-test/results/${encodeURIComponent(resultId)}`,
  );
}

export async function getWorthTestStats(): Promise<WealthTestStatsResponse> {
  return apiClient<WealthTestStatsResponse>('/api/wealth-test/stats');
}

export async function postWorthGroup(
  request: WealthGroupCreateRequest,
): Promise<WealthGroupCreateResponse> {
  return apiClient<WealthGroupCreateResponse>('/api/wealth-test/groups', {
    method: 'POST',
    body: request,
  });
}

export async function getWorthGroupByInviteCode(
  inviteCode: string,
): Promise<WealthGroupInviteResponse> {
  return apiClient<WealthGroupInviteResponse>(
    `/api/wealth-test/groups/invite/${encodeURIComponent(inviteCode)}`,
  );
}

export async function postWorthGroupJoin(
  groupId: string,
  request: WealthGroupJoinRequest,
): Promise<WealthGroupJoinResponse> {
  return apiClient<WealthGroupJoinResponse>(
    `/api/wealth-test/groups/${encodeURIComponent(groupId)}/join`,
    {
      method: 'POST',
      body: request,
    },
  );
}

export async function getWorthGroupRanking(
  groupId: string,
  ageGroup: WealthAgeGroup = 'all',
): Promise<WealthGroupRankingResponse> {
  const query = new URLSearchParams({ ageGroup }).toString();
  return apiClient<WealthGroupRankingResponse>(
    `/api/wealth-test/groups/${encodeURIComponent(groupId)}/ranking?${query}`,
  );
}
