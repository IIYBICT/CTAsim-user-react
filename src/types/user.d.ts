export type RoleType = 0 | 1 | 2 | 3 | 4 | 5;
export interface UserState {
  id: string;
  userCall: string;
  email: string;
  username: string;
  qq: string;
  groupId: number;
  groupName: string;
  lastLoginTime: Date | undefined;
  registerTime: Date | undefined;
  IsActivate: boolean;
  ratingId: number;
  ratingName: string;
  ratingNameEn: string;
  IsCallActivate: boolean;
}
