export type IGetIdolInfoArray = IGetIdolInfo[];
export type IGetIdolInfo = {
  id: number;
  sortId: number;
  resourceId: string;
  type: TypeEnum;
  fullName: string;
  displayName: string;
  lastName: string;
  firstName: string | null;
  alphabetName: string;
  fullNameRuby: string;
  age: number | null;
  birthplace: Birthplace;
  handednessType: HandednessType;
  height: number;
  weight: number;
  hobby: string;
  speciality: string;
  favorites: string;
  cv: string;
  colorCode: string;
  birthday: Birthday;
  constellation: Constellation;
  bloodType: BloodType;
  measurements: Measurements;
};
export declare enum TypeEnum {
  Princess = 1,
  Fairy = 2,
  Angel = 3,
  Ex = 5,
}
type Birthplace = {
  id: number;
  name: string;
};
declare enum HandednessTypeIdEnum {
  _0 = 0,
  _1 = 1,
  _2 = 2,
}
declare enum HandednessTypeNameEnum {
  None = "\u8A2D\u5B9A\u306A\u3057",
  Right = "\u53F3",
  Left = "\u5DE6",
}
type HandednessType = {
  id: HandednessTypeIdEnum;
  name: HandednessTypeNameEnum;
};
type Birthday = {
  month: number;
  day: number;
};
type Constellation = {
  id: number;
  name: string;
};
declare enum BloodTypeIdEnum {
  _0 = 0,
  _1 = 1,
  _2 = 2,
  _3 = 3,
  _4 = 4,
}
declare enum BloodTypeNameEnum {
  None = "\u8A2D\u5B9A\u306A\u3057",
  A = "A",
  B = "B",
  AB = "AB",
  O = "O",
}
type BloodType = {
  id: BloodTypeIdEnum;
  name: BloodTypeNameEnum;
};
type Measurements = {
  bust: number;
  waist: number;
  hip: number;
};
