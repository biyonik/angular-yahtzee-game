type ScoreItemType = number | undefined;

export interface GameState {
  dice: any[];
  locked: boolean[];
  rollsLeft: number;
  scores: Scores;
}

export type ScoresType = {
  [key: string]: ScoreItemType
}

export interface Scores extends ScoresType {
  ones: ScoreItemType;
  twos: ScoreItemType;
  threes: ScoreItemType;
  fours: ScoreItemType;
  fives: ScoreItemType;
  sixes: ScoreItemType;
  threeOfKind: ScoreItemType;
  fourOfKind: ScoreItemType;
  fullHouse: ScoreItemType;
  smallStraight: ScoreItemType;
  largeStraight: ScoreItemType;
  yahtzee: ScoreItemType;
  chance: ScoreItemType;
}
