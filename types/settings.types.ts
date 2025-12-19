export type Option<T> = {
  label: string;
  value: T;
};

export type PickerProps<T> = {
  state: T;
  options: Option<T>[];
  setState: React.Dispatch<React.SetStateAction<T>>;
};