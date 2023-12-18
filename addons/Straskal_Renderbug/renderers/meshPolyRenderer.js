/**
 * USES UNSUPPORTED C3 APIs
 *
 * - C3.AnimationFrameInfo
 * - C3.Vector2
 */
let C3;
class MeshPolyRenderer {
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
  line(renderer, pt1, pt2) {
    renderer.Line(pt1._x, pt1._y, pt2._x, pt2._y);
  }

  draw(renderer, settings, worldInstances) {
    const polySettings = settings.sprite.mesh;

    if (!polySettings.draw) return;

    const spriteInstances = worldInstances
      .filter((inst) => inst.GetPlugin() instanceof C3.Plugins.Sprite)
      .filter(
        (inst) =>
          !polySettings.solidsOnly || inst.GetObjectClass().HasSolidBehavior()
      )
      .filter((inst) => inst.GetWorldInfo().HasMesh());

    renderer.SetColor(polySettings.color);
    renderer.SetSmoothLineFillMode();
    renderer.PushLineWidth(2);

    for (let i = 0; i < spriteInstances.length; i++) {
      const inst = spriteInstances[i];
      const mesh = inst.GetWorldInfo()._meshInfo.transformedMesh._pts;
      for (let x = 0; x < mesh.length; x++) {
        for (let y = 0; y < mesh[x].length; y++) {
          // line to next point, line to point below, line to point below and to the right, check they all exist
          if (x + 1 < mesh.length) {
            this.line(renderer, mesh[x][y], mesh[x + 1][y]);
          }
          if (y + 1 < mesh[x].length) {
            this.line(renderer, mesh[x][y], mesh[x][y + 1]);
          }
          if (x + 1 < mesh.length && y + 1 < mesh[x].length) {
            this.line(renderer, mesh[x][y], mesh[x + 1][y + 1]);
          }
        }
      }
    }

    renderer.PopLineWidth();
  }
}

self.MeshPolyRenderer = MeshPolyRenderer;
