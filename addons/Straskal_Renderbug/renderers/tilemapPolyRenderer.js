/**
 * USES UNSUPPORTED C3 APIs
 * 
 * - C3.Plugins.Tilemap._tileCells
 */
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
        renderer.SetColorFillMode("smooth line fill");

        for (let i = 0; i < tilemapInstances.length; i++) {
            const sdkInst = tilemapInstances[i].GetSdkInstance();
            const collisionRectArr2d = sdkInst._tileCells.map(cell => cell.map(c => c._collisionRects)).flat();

            for (let j = 0; j < collisionRectArr2d.length; j++) {
                for (let y = 0; y < collisionRectArr2d[j].length; y++) {
                    const poly = collisionRectArr2d[j][y]._poly;

                    if (poly !== null) {
                        const rect = collisionRectArr2d[j][y].GetRect();
                        const points = poly._ptsArr.map((pt, index) => index % 2 == 0 ? rect.getLeft() + pt : rect.getTop() + pt);

                        renderer.ConvexPoly(points);
                    }
                }
            }
        }
    }
}