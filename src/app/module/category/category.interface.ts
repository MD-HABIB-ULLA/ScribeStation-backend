export interface TCategory {
  name: string;
  image: string;
  description: string;
  icon: string;
  isDeleted?: boolean;
  isActive?: boolean;
}

export interface TUpdateInterface {
  name?: string;
  image?: string;
  icon?: string;
  description?: string;
}
