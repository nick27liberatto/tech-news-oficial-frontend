export interface FluentResult<T> {
  isSuccess: boolean;
  isFailed: boolean;
  errors?: string[];
  value?: T;
}