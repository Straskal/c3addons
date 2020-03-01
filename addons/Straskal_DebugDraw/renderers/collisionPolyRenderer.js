/**
 * Sprite collision polygon renderer.
 */
class CollisionPolyRenderer {

    draw(renderer, settings, worldInstances) {
        const polySettings = settings.collisionPolySettings;

        if (!polySettings.draw)
            return;

        const spriteInstances = worldInstances
            .filter(inst => inst.GetPlugin() instanceof C3.Plugins.Sprite)
            .filter(inst => !polySettings.solidsOnly || inst.GetObjectClass().HasSolidBehavior())
            .filter(inst => inst.GetWorldInfo().IsCollisionEnabled());

        renderer.SetColor(polySettings.color);
        renderer.SetColorFillMode("fill");

        for (const spriteInstance of spriteInstances) {
            const bbox = spriteInstance.GetWorldInfo().GetBoundingBox();
            const instanceWidth = spriteInstance.GetWorldInfo().GetWidth();
            const instanceHeight = spriteInstance.GetWorldInfo().GetHeight();

            const originNormalized = spriteInstance.GetSdkInstance()._currentAnimationFrame._origin;
            const originPixelX = originNormalized._x * instanceWidth;
            const originPixelY = originNormalized._y * instanceHeight;

            const originPixelCoord = [
                Math.sign(instanceWidth) > 0 ? bbox.getLeft() + originPixelX : bbox.getRight() + originPixelX,
                Math.sign(instanceHeight) > 0 ? bbox.getTop() + originPixelY : bbox.getBottom() + originPixelY
            ];

            const collisionPoly = spriteInstance.GetSdkInstance()._currentAnimationFrame._collisionPoly;

            if (collisionPoly !== null) {
                const polyPoints = spriteInstance.GetSdkInstance()._currentAnimationFrame._collisionPoly._ptsArr;

                renderer.ConvexPoly(polyPoints.map((pt, index) => {
                    if (index % 2 == 0) {
                        return originPixelCoord[0] + (pt * instanceWidth);
                    }
                    return originPixelCoord[1] + (pt * instanceHeight);
                }));
            } else {
                renderer.Rect(bbox);
            }
        }
    }
}