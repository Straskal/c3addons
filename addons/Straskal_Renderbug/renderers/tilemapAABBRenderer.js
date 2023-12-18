/**
 * USES UNSUPPORTED C3 APIs
 *
 * - C3.Plugins.Tilemap._tileCells
 */
let C3;
class TilemapAABBRenderer {
  constructor(_C3) {
    C3 = _C3;
  }
  get isSupported() {
    return C3.Plugins.Tilemap != undefined;
  }

  /**
   * Draw tile map AABBS.
   * @param {C3.IWebGLRenderer} renderer
   * @param {*} settings
   * @param {C3.Instance[]} worldInstances
   */
  draw(renderer, settings, worldInstances) {
    const bboxSettings = settings.tilemap.bbox;

    if (!bboxSettings.draw) return;

    const tilemapInstances = worldInstances.filter(
      (inst) => inst.GetPlugin() instanceof C3.Plugins.Tilemap
    );

    renderer.PushLineWidth(1);
    renderer.SetColor(bboxSettings.color);
    renderer.SetColorFillMode("fill");

    for (let i = 0; i < tilemapInstances.length; i++) {
      const sdkInst = tilemapInstances[i].GetSdkInstance();
      const collisionRectArr2d = sdkInst._tileCells
        .map((cell) => cell.map((c) => c._collisionRects))
        .flat();

      for (let j = 0; j < collisionRectArr2d.length; j++) {
        for (let y = 0; y < collisionRectArr2d[j].length; y++) {
          renderer.LineRect2(collisionRectArr2d[j][y].GetRect());
        }
      }
    }

    renderer.PopLineWidth();
  }
}

self.TilemapAABBRenderer = TilemapAABBRenderer;
