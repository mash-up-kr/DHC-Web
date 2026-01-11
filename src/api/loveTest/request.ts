type Gender = 'MALE' | 'FEMALE';
type CalendarType = 'SOLAR' | 'LUNAR';

interface BirthDate {
  date: string; // YYYY-MM-DD
  calendarType: CalendarType;
}

interface PersonInfo {
  gender: Gender;
  name: string;
  birthDate: BirthDate;
  birthTime: string | null; // HH:mm:ss or null
}

interface PartnerInfo {
  gender: Gender;
  name: string;
  birthDate: BirthDate | null;
  birthTime: string | null; // HH:mm:ss or null
  additional: string;
}

export interface LoveTestRequest {
  me: PersonInfo;
  you: PartnerInfo;
  loveDate: string; // YYYY-MM-DD
}
