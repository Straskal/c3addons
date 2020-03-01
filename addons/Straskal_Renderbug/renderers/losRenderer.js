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
            .filter(inst => inst.GetBehaviorInstances().some(behInst => behInst.GetBehavior() instanceof C3.Behaviors.LOS))
            .map(inst => inst.GetBehaviorInstances().filter(behInst => behInst.GetBehavior() instanceof C3.Behaviors.LOS))
            .flat();

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
            const coneLeft1 = (Math.cos(l1Angle) * losLength) * instDirection;
            const coneLeft2 = (Math.sin(l1Angle) * losLength) * instDirection;
            const coneRight1 = (Math.cos(l2Angle) * losLength) * instDirection;
            const coneRight2 = (Math.sin(l2Angle) * losLength) * instDirection;

            renderer.ConvexPoly([
                instX,
                instY,
                instX + coneLeft1,
                instY + coneLeft2,

                instX + coneLeft1,
                instY + coneLeft2,
                instX + coneRight1,
                instY + coneRight2,

                instX + coneRight1,
                instY + coneRight2,
                instX,
                instY,
            ]);
        }
    }
}