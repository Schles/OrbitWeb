
export interface Vector2 {
  x: number,
  y: number,
}

export interface Vector3 {
  x: number,
  y: number,
  z: number
}

export interface Tangents {
  isInside?: boolean;
  isOnTangent?: boolean;
  tangents?: {
    t1: Vector2,
    t2: Vector2
  }
}
