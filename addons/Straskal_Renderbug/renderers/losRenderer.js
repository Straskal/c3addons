class LOSRenderer {

    /**
     * Draw LOS cone.
     * @param {C3.IWebGLRenderer} renderer 
     * @param {*} settings 
     * @param {C3.Instance[]} worldInstances 
     */
    draw(renderer, settings, worldInstances) {
        const losSettings = settings.losSettings;

        if (!losSettings.draw)
            return;

        const losInstances = worldInstances
            .filter(inst => inst.GetBehaviorInstanceFromCtor(C3.Behaviors.LOS) != null)
            .map(inst => inst.GetBehaviorInstanceFromCtor(C3.Behaviors.LOS));

        renderer.SetColor(losSettings.color);
        renderer.SetColorFillMode("fill");

        for (const los of losInstances) {
            const sdkInst = los.GetSdkInstance();
            const objectInst = los.GetObjectInstance();
            const worldInfo = objectInst.GetWorldInfo();

            const instAngle = worldInfo.GetAngle();
            const instX = worldInfo.GetX();
            const instY = worldInfo.GetY();
            const losAngle = sdkInst._cone;
            const losLength = sdkInst._range;

            const l1Angle = instAngle - (losAngle * 0.5);
            const l2Angle = instAngle + (losAngle * 0.5);

            const instDirection = Math.sign(worldInfo.GetWidth());
            const line1x = (Math.cos(l1Angle) * losLength) * instDirection;
            const line1y = (Math.sin(l1Angle) * losLength) * instDirection;
            const line2x = (Math.cos(l2Angle) * losLength) * instDirection;
            const line2y = (Math.sin(l2Angle) * losLength) * instDirection;

            renderer.ConvexPoly([
                instX,
                instY,
                instX + line1x,
                instY + line1y,

                instX + line1x,
                instY + line1y,
                instX + line2x,
                instY + line2y,

                instX + line2x,
                instY + line2y,
                instX,
                instY,
            ]);
        }
    }
}