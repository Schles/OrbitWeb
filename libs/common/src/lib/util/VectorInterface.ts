export interface Rectangle {
  x1: Vector2,
  x2: Vector2
}

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
