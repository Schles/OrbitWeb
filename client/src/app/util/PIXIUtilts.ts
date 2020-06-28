export class PIXIUtilts {
  public static toGLSL1(mat: PIXI.Matrix): number[] {
    return [mat.a, mat.b, 0,
            mat.c, mat.d, 0,
            mat.tx, mat.ty, 1];
  }

  public static toGLSL(mat: PIXI.Matrix): number[] {
    return [mat.a, mat.c, -mat.tx,
      mat.b, mat.d, -mat.ty,
      0, 0, 1];
  }
}
