export type Marker = {
  id: number;
  text: string;
  amount: number;
}

export type Player = {
  id: number;
  name: string;
  avatar: number;
  life: number;
  markers: Marker[];
}