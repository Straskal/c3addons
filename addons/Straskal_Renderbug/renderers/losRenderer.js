/**
 * USES UNSUPPORTED C3 APIs
 * 
 * - C3.Behaviors.LOS.Instance._cone
 * - C3.Behaviors.LOS.Instance._range
 */
class LOSRenderer {

    /**
     * Draw LOS cone.
     * @param {C3.IWebGLRenderer} renderer 
     * @param {*} settings 
     * @param {C3.Instance[]} worldInstances 
     */
    draw(renderer, settings, worldInstances) {
        const losSettings = settings.los;

        // The larger the cone, the less triangles we use to render it.
        const minTriangles = 36;
        const maxAngle = 360;

        if (!losSettings.draw)
            return;

        const losInstances = worldInstances
            .filter(inst => inst.GetBehaviorInstanceFromCtor(C3.Behaviors.LOS) != null)
            .map(inst => inst.GetBehaviorInstanceFromCtor(C3.Behaviors.LOS));

        renderer.SetColor(losSettings.color);
        renderer.SetColorFillMode("fill");

        for (let i = 0; i < losInstances.length; i++) {
            const sdkInst = losInstances[i].GetSdkInstance();
            const losAngle = C3.toDegrees(sdkInst._cone);

            if (losAngle === 0)
                continue;

            const worldInfo = losInstances[i].GetObjectInstance().GetWorldInfo();
            const instDirection = Math.sign(worldInfo.GetWidth());
            const instAngle = worldInfo.GetAngle();
            const instX = worldInfo.GetX();
            const instY = worldInfo.GetY();
            const stride = (losAngle / maxAngle) * minTriangles;
            const min = instAngle - (losAngle * 0.5);
            const max = instAngle + (losAngle * 0.5);

            for (let i = min; i < max; i += stride) {
                const l1Angle = instAngle + C3.toRadians(i);
                const l2Angle = instAngle + C3.toRadians(i + stride);

                const line1x = (Math.cos(l1Angle) * sdkInst._range) * instDirection;
                const line1y = (Math.sin(l1Angle) * sdkInst._range) * instDirection;
                const line2x = (Math.cos(l2Angle) * sdkInst._range) * instDirection;
                const line2y = (Math.sin(l2Angle) * sdkInst._range) * instDirection;

                renderer.ConvexPoly([
                    instX, instY, instX + line1x, instY + line1y,
                    instX + line1x, instY + line1y, instX + line2x, instY + line2y,
                    instX + line2x, instY + line2y, instX, instY,
                ]);
            }
        }
    }
}