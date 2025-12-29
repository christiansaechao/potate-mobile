export type Option<T> = {
  label: string;
  value: T;
};

export type PickerProps<T> = {
  state: T;
  options: Option<T>[];
  setState: React.Dispatch<React.SetStateAction<T>>;
};

export interface IUserContext {
  name: string;
  email: string;
  focus_duration: number;
  short_break_duration: number;
  long_break_duration: number;
  vibration: boolean;
  weekly_goal: number;
  exp: number;
  level: number;
}
