import { LoveTestRequest } from './request';

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

interface StorePartnerInfo {
  gender: string;
  name: string;
}

interface StorePartnerBirth {
  year: string;
  month: string;
  day: string;
  unknownBirth: boolean;
  unknownTime: boolean;
  birthTime: string;
  hairColor: string;
  eyeColor: string;
  skinColor: string;
}

interface StoreLoveDate {
  year: string;
  month: string;
  day: string;
}

interface StoreData {
  userInfo: StoreUserInfo;
  userBirth: StoreUserBirth;
  partnerInfo: StorePartnerInfo;
  partnerBirth: StorePartnerBirth;
  loveDate: StoreLoveDate;
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
  // time이 "HH:mm" 형식이면 ":00" 추가
  if (time.length === 5) {
    return `${time}:00`;
  }
  return time;
}

function mapGender(gender: string): 'MALE' | 'FEMALE' {
  return gender.toLowerCase() === 'male' ? 'MALE' : 'FEMALE';
}

function buildAdditional(partnerBirth: StorePartnerBirth): string {
  const parts: string[] = [];

  if (partnerBirth.hairColor) {
    parts.push(`hairColor:${partnerBirth.hairColor}`);
  }
  if (partnerBirth.eyeColor) {
    parts.push(`eyeColor:${partnerBirth.eyeColor}`);
  }
  if (partnerBirth.skinColor) {
    parts.push(`skinColor:${partnerBirth.skinColor}`);
  }

  return parts.join(',');
}

export function mapStoreToRequest(data: StoreData): LoveTestRequest {
  return {
    me: {
      gender: mapGender(data.userInfo.gender),
      name: data.userInfo.name,
      birthDate: {
        date: formatDate(data.userBirth.year, data.userBirth.month, data.userBirth.day),
        calendarType: 'SOLAR',
      },
      birthTime: formatBirthTime(data.userBirth.birthTime, data.userBirth.unknownTime),
    },
    you: {
      gender: mapGender(data.partnerInfo.gender),
      name: data.partnerInfo.name,
      birthDate: data.partnerBirth.unknownBirth
        ? null
        : {
            date: formatDate(data.partnerBirth.year, data.partnerBirth.month, data.partnerBirth.day),
            calendarType: 'SOLAR',
          },
      birthTime: formatBirthTime(data.partnerBirth.birthTime, data.partnerBirth.unknownTime),
      additional: buildAdditional(data.partnerBirth),
    },
    loveDate: formatDate(data.loveDate.year, data.loveDate.month, data.loveDate.day),
  };
}
