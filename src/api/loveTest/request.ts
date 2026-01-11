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
  birthTime: string; // HH:mm:ss
}

interface PartnerInfo extends PersonInfo {
  additional: string;
}

export interface LoveTestRequest {
  me: PersonInfo;
  you: PartnerInfo;
  loveDate: string; // YYYY-MM-DD
}
