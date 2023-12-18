/**
 * USES SUPPORTED C3 APIs
 */
let C3;
class AABBRenderer {
  constructor(_C3) {
    C3 = _C3;
  }
  get isSupported() {
    return C3.Plugins.Sprite != undefined;
  }

  /**
   * Draw sprite bounding boxes.
   * @param {C3.IWebGLRenderer} renderer
   * @param {*} settings
   * @param {C3.Instance[]} worldInstances
   */
  draw(renderer, settings, worldInstances) {
    const bboxSettings = settings.sprite.bbox;

    if (!bboxSettings.draw) return;

    const spriteInstances = worldInstances
      .filter((inst) => inst.GetPlugin() instanceof C3.Plugins.Sprite)
      .filter(
        (inst) =>
          !bboxSettings.solidsOnly || inst.GetObjectClass().HasSolidBehavior()
      );

    const worldInfos = spriteInstances.map((inst) => inst.GetWorldInfo());
    const aabbs = worldInfos.map((wi) => wi.GetBoundingBox());

    renderer.PushLineWidth(1);
    renderer.SetColor(bboxSettings.color);
    renderer.SetColorFillMode("fill");

    for (let i = 0; i < aabbs.length; i++) {
      renderer.LineRect2(aabbs[i]);
    }

    renderer.PopLineWidth();
  }
}

self.AABBRenderer = AABBRenderer;
