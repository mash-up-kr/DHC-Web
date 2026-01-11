import { apiClient } from '../client';
import { LoveTestRequest } from './request';
import { LoveTestResponse } from './response';

export type { LoveTestRequest } from './request';
export type { LoveTestResponse } from './response';
export { mapStoreToRequest } from './mapper';

export async function postLoveTest(
  request: LoveTestRequest,
): Promise<LoveTestResponse> {
  return apiClient<LoveTestResponse>('/api/love-test', {
    method: 'POST',
    body: request,
  });
}
