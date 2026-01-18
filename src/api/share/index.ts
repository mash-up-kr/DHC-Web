import { apiClient } from '../client';

export interface ShareCompleteResponse {
  success: boolean;
  message: string;
}

export async function postShareComplete(
  shareCode: string,
): Promise<ShareCompleteResponse> {
  return apiClient<ShareCompleteResponse>(`/api/share/${shareCode}/complete`, {
    method: 'POST',
  });
}
