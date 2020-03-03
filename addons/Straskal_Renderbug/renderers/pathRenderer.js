/**
 * USES UNSUPPORTED C3 APIs
 * 
 * - C3.Behaviors.Pathfinding
 * - C3.Behaviors.Pathfinding.Instance
 */
class PathRenderer {

    get isSupported() {
        return C3.Behaviors.Pathfinding != undefined;
    }

    /**
     * Draw sprite collision polygons.
     * @param {C3.IWebGLRenderer} renderer 
     * @param {*} settings 
     * @param {C3.Instance[]} worldInstances 
     */
    draw(renderer, settings, worldInstances) {
        const pathSettings = settings.pathfinding;

        if (!pathSettings.draw)
            return;

        const instance = worldInstances
            .filter(inst => inst.uid == settings.drawForInstance)
            .filter(inst => inst.GetBehaviorInstanceFromCtor(C3.Behaviors.Pathfinding) != null)
            .map(inst => inst.GetBehaviorInstanceFromCtor(C3.Behaviors.Pathfinding))[0];

        if (instance == undefined || instance == null)
            return;

        const sdkInst = instance.GetSdkInstance();
        const layout = instance.GetRuntime().GetMainRunningLayout();
        const layoutWidth = layout.GetWidth();
        const layoutHeight = layout.GetHeight();
        const cellSize = sdkInst._cellSize;
        const cellBorder = sdkInst._cellBorder;
        const rows = layoutHeight / cellSize;
        const cols = layoutWidth / cellSize;
        const mapCells = instance.GetBehavior()._mapState.get(`${cellSize},${cellBorder}`).mapData._cells;
        
        // ============================================
        // Draw grid
        // ============================================

        renderer.PushLineWidth(1);
        renderer.SetColor(pathSettings.grid.color);
        renderer.SetColorFillMode("smooth line fill");

        for (let row = 0; row < rows; row++) {
            const yPos = row * cellSize;
            renderer.Line(0, yPos, layoutWidth, yPos);
        }

        for (let col = 0; col < cols; col++) {
            const xPos = col * cellSize;
            renderer.Line(xPos, 0, xPos, layoutHeight);
        }

        renderer.PopLineWidth();

        // ============================================
        // Draw obstacles
        // ============================================

        renderer.SetColor(pathSettings.obstacles.color);
        renderer.SetColorFillMode("fill");

        for (let col = 0; col < mapCells.length; col++) {
            for (let row = 0; row < mapCells[col].length; row++) {
                if (mapCells[col][row] > 0) {
                    const left = col * cellSize;
                    const right = left + cellSize;
                    const top = row * cellSize;
                    const bottom = top + cellSize;

                    renderer.Rect2(left, top, right, bottom);
                }
            }
        }

        // ============================================
        // Draw path
        // ============================================

        renderer.SetColor(pathSettings.path.color);
        renderer.SetColorFillMode("fill");

        const path = sdkInst._myPath;

        for (let i = 0; i < path.length; i++) {
            const cellX = path[i].x / cellSize;
            const cellY = path[i].y / cellSize;

            const left = (cellX * cellSize) - (cellSize * 0.5);
            const right = left + cellSize;
            const top = (cellY * cellSize) - (cellSize * 0.5);
            const bottom = top + cellSize;

            renderer.Rect2(left, top, right, bottom);
        }
    }
}