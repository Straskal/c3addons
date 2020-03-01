/**
 * Line of sight renderer.
 */
class LOSRenderer {

    draw(renderer, settings, worldInstances) {
        const bboxSettings = settings.bboxSettings;

        const losInstances = worldInstances
            .filter(inst => inst.GetBehaviorInstances().some(behInst => behInst.GetBehavior() instanceof C3.Behaviors.LOS))
            .map(inst => inst.GetBehaviorInstances().filter(behInst => behInst.GetBehavior() instanceof C3.Behaviors.LOS))
            .flat();

        renderer.SetColor(bboxSettings.color);
        renderer.SetColorFillMode("fill");

        for (const los of losInstances) {
            const sdkInstance = los.GetSdkInstance();
            const objectInstance = los.GetObjectInstance();
            const worldInfo = objectInstance.GetWorldInfo();

            const instanceAngle = worldInfo.GetAngle();
            const instanceX = worldInfo.GetX();
            const instanceY = worldInfo.GetY();
            const losAngle = sdkInstance._cone;
            const losLength = sdkInstance._range;

            const l1Angle = instanceAngle - (losAngle * 0.5);
            const l2Angle = instanceAngle + (losAngle * 0.5);

            const dir = Math.sign(worldInfo.GetWidth());
            const r1 = (Math.cos(l1Angle) * losLength) * dir;
            const r2 = (Math.sin(l1Angle) * losLength) * dir;
            const r3 = (Math.cos(l2Angle) * losLength) * dir;
            const r4 = (Math.sin(l2Angle) * losLength) * dir;

            renderer.ConvexPoly([
                instanceX,
                instanceY,
                instanceX + r1,
                instanceY + r2,

                instanceX + r1,
                instanceY + r2,
                instanceX + r3,
                instanceY + r4,

                instanceX + r3,
                instanceY + r4,
                instanceX,
                instanceY,
            ]);
        }
    }
}