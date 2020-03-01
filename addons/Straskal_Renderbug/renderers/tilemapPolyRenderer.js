class TilemapPolyRenderer {

    /**
     * Draw tile map collision polygons.
     * @param {C3.IWebGLRenderer} renderer 
     * @param {*} settings 
     * @param {C3.Instance[]} worldInstances 
     */
    draw(renderer, settings, worldInstances) {
        const tilemapPolySettings = settings.tilemap.polys;

        if (!tilemapPolySettings.draw)
            return;

        const tilemapInstances = worldInstances.filter(inst => inst.GetPlugin() instanceof C3.Plugins.Tilemap);

        renderer.SetColor(tilemapPolySettings.color);
        renderer.SetColorFillMode("fill");

        for (const tilemap of tilemapInstances) {
            const sdkInst = tilemap.GetSdkInstance();
            const collisionRectArr2d = sdkInst._tileCells.map(cell => cell.map(c => c._collisionRects)).flat();

            for (const collisionRectArr of collisionRectArr2d) {
                for (const collisionRect of collisionRectArr) {
                    const poly = collisionRect._poly;
                    
                    if (poly !== null) {
                        const rect = collisionRect.GetRect();
                        const pts = poly._ptsArr;
                        renderer.ConvexPoly(pts.map((pt, index) => {
                            if (index % 2 == 0) {
                                return rect.getLeft() + pt;
                            }
                            return rect.getTop() + pt;
                        }));
                    }
                }
            }
        }
    }
}