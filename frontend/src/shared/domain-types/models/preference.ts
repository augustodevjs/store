export type preferenceInputModel = {
  idClient: number;
  idProduct: number;
}

export type preferenceViewModel = {
  clientId: number;
  productId: number;
}

type productPreference = {
  id: number;
  price: number;
  title: string;
  description: string;
}

export type preferenceClientViewModel = {
  id: number;
  product: productPreference
} 