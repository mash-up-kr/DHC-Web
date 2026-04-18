import { WealthTestRequest } from './request';

interface StoreUserInfo {
  gender: string;
  name: string;
}

interface StoreUserBirth {
  year: string;
  month: string;
  day: string;
  unknownTime: boolean;
  birthTime: string;
}

interface StoreWealthData {
  userInfo: StoreUserInfo;
  userBirth: StoreUserBirth;
}

function formatDate(year: string, month: string, day: string): string {
  const y = year.padStart(4, '0');
  const m = month.padStart(2, '0');
  const d = day.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatBirthTime(time: string, unknownTime: boolean): string | null {
  if (unknownTime || !time) {
    return null;
  }
  // "HH:mm:ss"로 들어오면 HH:mm만 사용
  if (time.length >= 5) {
    return time.slice(0, 5);
  }
  return time;
}

function mapGender(gender: string): 'MALE' | 'FEMALE' {
  return gender.toLowerCase() === 'male' ? 'MALE' : 'FEMALE';
}

export function mapStoreToWealthRequest(data: StoreWealthData): WealthTestRequest {
  return {
    name: data.userInfo.name,
    gender: mapGender(data.userInfo.gender),
    birthDate: formatDate(
      data.userBirth.year,
      data.userBirth.month,
      data.userBirth.day,
    ),
    birthTime: formatBirthTime(data.userBirth.birthTime, data.userBirth.unknownTime),
  };
}
