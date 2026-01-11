interface FortuneCard {
  image: string;
  title: string;
  subTitle: string;
}

interface FortuneTip {
  image: string;
  title: string;
  description: string;
  hexColor?: string;
}

export interface LoveTestResponse {
  score: number;
  fortuneDetail: string;
  fortuneCard: FortuneCard;
  fortuneTips: FortuneTip[];
  confessDate: string; // YYYY-MM-DD
  confessLocation: string;
}
