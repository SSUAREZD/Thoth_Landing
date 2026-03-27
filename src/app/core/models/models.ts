export interface SizeDTO {
  id: string | number;
  denomination: string;
}

export interface CompanyDTO {
  id: string | number;
  name: string;
  productLines?: ProductLineDTO[];
}

export interface ProductLineDTO {
  id: string | number;
  name: string;
  bodyPart: string;
  companyId: string | number;
  products?: ProductDTO[];
}

export interface ProductDTO {
  id: string | number;
  name: string;
  size?: string;
  productLineId: string | number;
  sizes?: SizeDTO[];
}

export interface UserDTO {
  id: string | number;
  name: string;
  lastName: string;
  userName: string;
  password: string;
}

export interface CreateUserRequest {
  name: string;
  lastName: string;
  userName: string;
  password: string;
}

export interface CreateProductRequest {
  name: string;
  size: string;
  productLineId: string | number;
}

export interface CreateMeasurementRequest {
  bodyPart: string;
  units: string;
  side: string;
  footLength: number;
  footWidth: number;
  instepGirth: number;
  ballGirth: number;
}

export interface CreatePhoneRequest {
  name: string;
  gyroscopeDistanceToCamera: number;
  gyroscopeDistanceToBelow: number;
  length: number;
  width: number;
  userId: string | number;
}

export interface PhoneDTO {
  id: string | number;
  name: string;
  gyroscopeDistanceToCamera: number;
  gyroscopeDistanceToBelow: number;
  length: number;
  width: number;
  userId: string | number;
}

export interface MeasurementDTO {
  id: string | number;
  bodyPart: string;
  units: string;
  side: string;
  userId: string | number;
  measurementType: string;
  sizes?: SizeDTO[];
}

export interface FeetMeasurementDTO extends MeasurementDTO {
  footLength: number;
  footWidth: number;
  instepGirth: number;
  ballGirth: number;
}
