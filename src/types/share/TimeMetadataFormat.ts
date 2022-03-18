export type PositionNumberRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// export type PositionNumberRange = 1 | 2 | 3;

export type MetadataType = 'm' | 'q';

// 내용, 크기, 볼드, 폰트, 컬러
// type MsgTextData = [string, number, number, string, Color];
export type MsgTextData = {
  text: string;
  size: number;
  bold: number;
  font: string;
  hexColor: string;
};

// type Color = string;
// type Width = number;
// type Height = number;
// type Round = number;
// type Padding = number;
// type Spacing = number;

// type MsgBoxData = [Width, Height, Round, Padding, Spacing, Color];
export type MsgBoxData = {
  width: number;
  height: number;
  round: number;
  padding: number;
  spacing: number;
  hexColor: string;
};

export type MessageMainMetadata = {
  /**
   * data type:  메세지
   */
  dataType: 'm';
  /**
   * Box: 박스 데이터
   */
  boxData: MsgBoxData;
  /**
   * position:
   */
  positionIndex: PositionNumberRange; //
  /**
   * Main Text:  큰 타이틀
   */
  mainTextData: MsgTextData;
  /**
   * Sub Text:  서브 타이틀
   */
  subTextData: MsgTextData;
  /**
   * url: 링크
   */
  urlString?: string;
  /**
   * animation:
   */
  animationType?: number;
  /**
   * Time: 지속 시간
   */
  durationTime: number;
};

export type QuizMainMetadata = {
  /**
   * data type:  퀴즈
   */
  dataType: 'q';
  /**
   * Main Text:  큰 타이틀
   */
  mainText: string;
  /**
   * Time: 지속 시간 second 단위
   */
  durationTime: number;
  /**
   * selection: 선택지
   */
  choices: string[];
};

export type MainMetadataFormats = MessageMainMetadata | QuizMainMetadata;

type CommonMetaData = {
  data: MainMetadataFormats;
  type: MetadataType;
  createdAt: number;
  tags: string[];
  title: string;
  used: boolean;
};

export type QuizMetaData = {
  data: QuizMainMetadata;
  type: 'q';
} & CommonMetaData;

export type MessageMetadata = {
  data: MessageMainMetadata;
  type: 'm';
} & CommonMetaData;

export type QuizResultMetaData = {
  data: {
    title: string;
    durationTime: number;
    choices: {
      id: string;
      value: number;
    }[];
  };
  type: 'qr';
};

export type MetaData = QuizMetaData | MessageMetadata;
export type AllMetaData = MetaData | QuizResultMetaData;
