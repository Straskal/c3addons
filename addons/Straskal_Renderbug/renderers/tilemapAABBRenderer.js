class TilemapAABBRenderer {

    /**
     * Draw tile map AABBS.
     * @param {C3.IWebGLRenderer} renderer 
     * @param {*} settings 
     * @param {C3.Instance[]} worldInstances 
     */
    draw(renderer, settings, worldInstances) {
        const tilemapBBoxSettings = settings.tilemap.bbox;

        if (!tilemapBBoxSettings.draw)
            return;

        const tilemapInstances = worldInstances.filter(inst => inst.GetPlugin() instanceof C3.Plugins.Tilemap);

        renderer.PushLineWidth(1);
        renderer.SetColor(tilemapBBoxSettings.color);
        renderer.SetColorFillMode("smooth line fill");

        for (const tilemap of tilemapInstances) {
            const sdkInst = tilemap.GetSdkInstance();
            const collisionRectArr2d = sdkInst._tileCells.map(cell => cell.map(c => c._collisionRects)).flat();

            for (const collisionRectArr of collisionRectArr2d) {                
                for (const collisionRect of collisionRectArr) {                
                    renderer.LineRect2(collisionRect.GetRect());
                }
            }
        }

        renderer.PopLineWidth();
    }
}