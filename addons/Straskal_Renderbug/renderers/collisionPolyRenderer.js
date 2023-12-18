/**
 * USES UNSUPPORTED C3 APIs
 *
 * - C3.AnimationFrameInfo
 * - C3.Vector2
 */
let C3;
class CollisionPolyRenderer {
  constructor(_C3) {
    C3 = _C3;
  }
  get isSupported() {
    return C3.Plugins.Sprite != undefined;
  }

  /**
   * Draw sprite collision polygons.
   * @param {C3.IWebGLRenderer} renderer
   * @param {*} settings
   * @param {C3.Instance[]} worldInstances
   */
  draw(renderer, settings, worldInstances) {
    const polySettings = settings.sprite.polys;

    if (!polySettings.draw) return;

    const spriteInstances = worldInstances
      .filter((inst) => inst.GetPlugin() instanceof C3.Plugins.Sprite)
      .filter(
        (inst) =>
          !polySettings.solidsOnly || inst.GetObjectClass().HasSolidBehavior()
      )
      .filter((inst) => inst.GetWorldInfo().IsCollisionEnabled());

    renderer.SetColor(polySettings.color);
    renderer.SetColorFillMode("smooth line fill");

    for (let i = 0; i < spriteInstances.length; i++) {
      const instAABB = spriteInstances[i].GetWorldInfo().GetBoundingBox();
      const instWidth = spriteInstances[i].GetWorldInfo().GetWidth();
      const instHeight = spriteInstances[i].GetWorldInfo().GetHeight();
      const instAnimFrame =
        spriteInstances[i].GetSdkInstance()._currentAnimationFrame;
      const originTexCoords = instAnimFrame._origin;

      // instWidth and instHeight are negative or postive in respect to object mirroring.
      // multiplying them with our origin texture coords will give us a positive or negative pixel offset.
      const originPixelOffsetX = originTexCoords.getX() * instWidth;
      const originPixelOffsetY = originTexCoords.getY() * instHeight;
      const originPixelCoordX =
        Math.sign(instWidth) > 0
          ? instAABB.getLeft() + originPixelOffsetX
          : instAABB.getRight() + originPixelOffsetX;
      const originPixelCoordY =
        Math.sign(instHeight) > 0
          ? instAABB.getTop() + originPixelOffsetY
          : instAABB.getBottom() + originPixelOffsetY;

      if (instAnimFrame._collisionPoly !== null) {
        const polyPoints = instAnimFrame._collisionPoly._ptsArr;
        const pixelPoints = polyPoints.map((pt, index) =>
          index % 2 == 0
            ? originPixelCoordX + pt * instWidth
            : originPixelCoordY + pt * instHeight
        );

        renderer.ConvexPoly(pixelPoints);
        continue;
      }

      renderer.Rect(instAABB);
    }
  }
}

self.CollisionPolyRenderer = CollisionPolyRenderer;
