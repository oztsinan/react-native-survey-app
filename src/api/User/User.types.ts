export type UserDTO = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

export type UserCreateBody = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserUpdateBody = {
  id: number;
  email: string;
  name: string;
};

export type UserCheckEmailAvailabilityBody = {
  email: string;
};

export type UserCheckEmailAvailabilityDTO = {
  isAvailable: boolean;
};
