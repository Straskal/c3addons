/**
 * Sprite AABB renderer.
 */
class AABBRenderer {

    draw(renderer, settings, worldInstances) {
        const bboxSettings = settings.bboxSettings;

        if (!bboxSettings.draw)
            return;

        const spriteInstances = worldInstances
            .filter(inst => inst.GetPlugin() instanceof C3.Plugins.Sprite)
            .filter(inst => !bboxSettings.solidsOnly || inst.GetObjectClass().HasSolidBehavior());

        const worldInfos = spriteInstances.map(inst => inst.GetWorldInfo());
        const bboxes = worldInfos.map(wi => wi.GetBoundingBox());

        renderer.PushLineWidth(1);
        renderer.SetColor(bboxSettings.color);
        renderer.SetColorFillMode("fill");

        for (const bbox of bboxes)
            renderer.LineRect2(bbox);

        renderer.PopLineWidth();
    }
}