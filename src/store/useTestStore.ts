import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Q1: 사용자 정보
interface UserInfo {
  gender: string;
  name: string;
}

// Q2: 사용자 생년월일/시간
interface UserBirth {
  year: string;
  month: string;
  day: string;
  unknownTime: boolean;
  birthTime: string;
}

// Q3: 상대방 정보
interface PartnerInfo {
  gender: string;
  name: string;
}

// Q4: 상대방 생년월일/시간 + 추가 정보
interface PartnerBirth {
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

// Q5: 사랑에 빠진 날
interface LoveDate {
  year: string;
  month: string;
  day: string;
}

interface TestState {
  // Q1 데이터
  userInfo: UserInfo;
  setUserInfo: (info: Partial<UserInfo>) => void;

  // Q2 데이터
  userBirth: UserBirth;
  setUserBirth: (birth: Partial<UserBirth>) => void;

  // Q3 데이터
  partnerInfo: PartnerInfo;
  setPartnerInfo: (info: Partial<PartnerInfo>) => void;

  // Q4 데이터
  partnerBirth: PartnerBirth;
  setPartnerBirth: (birth: Partial<PartnerBirth>) => void;

  // Q5 데이터
  loveDate: LoveDate;
  setLoveDate: (date: Partial<LoveDate>) => void;

  // 공유 여부
  hasShared: boolean;
  setHasShared: (shared: boolean) => void;

  // 전체 초기화
  resetAll: () => void;
}

const initialState = {
  userInfo: {
    gender: '',
    name: '',
  },
  userBirth: {
    year: '',
    month: '',
    day: '',
    unknownTime: false,
    birthTime: '',
  },
  partnerInfo: {
    gender: '',
    name: '',
  },
  partnerBirth: {
    year: '',
    month: '',
    day: '',
    unknownBirth: false,
    unknownTime: false,
    birthTime: '',
    hairColor: '',
    eyeColor: '',
    skinColor: '',
  },
  loveDate: {
    year: '',
    month: '',
    day: '',
  },
  hasShared: false,
};

export const useTestStore = create<TestState>()(
  persist(
    (set) => ({
      ...initialState,

      setUserInfo: (info) =>
        set((state) => ({
          userInfo: { ...state.userInfo, ...info },
        })),

      setUserBirth: (birth) =>
        set((state) => ({
          userBirth: { ...state.userBirth, ...birth },
        })),

      setPartnerInfo: (info) =>
        set((state) => ({
          partnerInfo: { ...state.partnerInfo, ...info },
        })),

      setPartnerBirth: (birth) =>
        set((state) => ({
          partnerBirth: { ...state.partnerBirth, ...birth },
        })),

      setLoveDate: (date) =>
        set((state) => ({
          loveDate: { ...state.loveDate, ...date },
        })),

      setHasShared: (shared) => set({ hasShared: shared }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'test-storage',
    },
  ),
);
