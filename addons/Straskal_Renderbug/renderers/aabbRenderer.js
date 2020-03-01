class AABBRenderer {

    /**
     * Draw sprite bounding boxes.
     * @param {C3.IWebGLRenderer} renderer 
     * @param {*} settings 
     * @param {C3.Instance[]} worldInstances 
     */
    draw(renderer, settings, worldInstances) {
        const bboxSettings = settings.bboxSettings;

        if (!bboxSettings.draw)
            return;

        const spriteInstances = worldInstances
            .filter(inst => inst.GetPlugin() instanceof C3.Plugins.Sprite)
            .filter(inst => !bboxSettings.solidsOnly || inst.GetObjectClass().HasSolidBehavior());

        const worldInfos = spriteInstances.map(inst => inst.GetWorldInfo());
        const aabbs = worldInfos.map(wi => wi.GetBoundingBox());

        renderer.PushLineWidth(1);
        renderer.SetColor(bboxSettings.color);
        renderer.SetColorFillMode("fill");

        for (const aabb of aabbs)
            renderer.LineRect2(aabb);

        renderer.PopLineWidth();
    }
}