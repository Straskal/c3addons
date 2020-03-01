class CollisionPolyRenderer {

    /**
     * Draw sprite collision polygons.
     * @param {C3.IWebGLRenderer} renderer 
     * @param {*} settings 
     * @param {C3.Instance[]} worldInstances 
     */
    draw(renderer, settings, worldInstances) {
        const polySettings = settings.sprite.polys;

        if (!polySettings.draw)
            return;

        const spriteInstances = worldInstances
            .filter(inst => inst.GetPlugin() instanceof C3.Plugins.Sprite)
            .filter(inst => !polySettings.solidsOnly || inst.GetObjectClass().HasSolidBehavior())
            .filter(inst => inst.GetWorldInfo().IsCollisionEnabled());

        renderer.SetColor(polySettings.color);
        renderer.SetColorFillMode("fill");

        for (const spriteInstance of spriteInstances) {
            const instAABB = spriteInstance.GetWorldInfo().GetBoundingBox();
            const instWidth = spriteInstance.GetWorldInfo().GetWidth();
            const instHeight = spriteInstance.GetWorldInfo().GetHeight();
            const instAnimFrame = spriteInstance.GetSdkInstance()._currentAnimationFrame;
            const originTextureCoords = instAnimFrame._origin;
            const originPixelCoordsX = originTextureCoords._x * instWidth;
            const originPixelCoordsY = originTextureCoords._y * instHeight;
    
            const originPixelCoord = [
                Math.sign(instWidth) > 0 ? instAABB.getLeft() + originPixelCoordsX : instAABB.getRight() + originPixelCoordsX,
                Math.sign(instHeight) > 0 ? instAABB.getTop() + originPixelCoordsY : instAABB.getBottom() + originPixelCoordsY
            ];
    
            if (instAnimFrame._collisionPoly !== null) {
                const polyPoints = instAnimFrame._collisionPoly._ptsArr;
                renderer.ConvexPoly(polyPoints.map((pt, index) => {
                    if (index % 2 == 0) {
                        return originPixelCoord[0] + (pt * instWidth);
                    }
                    return originPixelCoord[1] + (pt * instHeight);
                }));
            } else {
                renderer.Rect(instAABB);
            }
        }
    }
}