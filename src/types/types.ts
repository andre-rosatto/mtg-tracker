export type Marker = {
  id: number;
  text: string;
  amount: number;
}

export type Player = {
  id: number;
  name: string;
  avatar: number;
  color: string;
  life: number;
  damage: number;
  markers: Marker[];
}