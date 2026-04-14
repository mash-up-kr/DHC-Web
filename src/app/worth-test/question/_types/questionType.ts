export type QuestionType = 'me' | 'member';

export const parseQuestionType = (value: string | null): QuestionType => {
  return value === 'member' ? 'member' : 'me';
};

interface Question1Copy {
  srOnly: string;
  title: string;
  nameLabel: string;
}

interface Question2Copy {
  srOnly: string;
  title: string;
}

export const QUESTION_1_COPY: Record<QuestionType, Question1Copy> = {
  me: {
    srOnly: '부자 테스트 - Q1. 당신에 대해서 알려주세요',
    title: 'Q1.당신에 대해서 알려주세요',
    nameLabel: '내 이름',
  },
  member: {
    srOnly: '부자 테스트 - Q1. 멤버에 대해서 알려주세요',
    title: 'Q1.멤버에 대해서 알려주세요',
    nameLabel: '내 이름',
  },
};

export const QUESTION_2_COPY: Record<QuestionType, Question2Copy> = {
  me: {
    srOnly: '부자 테스트 - Q2. 당신의 생년월일과 태어난 시간',
    title: 'Q2.당신의 생년월일과\n태어난 시간을 입력해주세요',
  },
  member: {
    srOnly: '부자 테스트 - Q2. 멤버의 생년월일과 태어난 시간',
    title: 'Q2.멤버의 생년월일과\n태어난 시간을 입력해주세요',
  },
};
