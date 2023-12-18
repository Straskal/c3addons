"use strict";
{
  const C3 = self.C3;
  C3.Plugins.Straskal_Renderbug.Instance = class RenderbugInstance extends (
    C3.SDKWorldInstanceBase
  ) {
    constructor(inst, properties) {
      super(inst);

      this._settings = {
        isEnabled: properties[0],
        sprite: {
          bbox: {
            draw: properties[1],
            solidsOnly: properties[2],
            color: new C3.Color(
              properties[3][0],
              properties[3][1],
              properties[3][2],
              properties[4]
            ).premultiply(),
          },
          polys: {
            draw: properties[5],
            solidsOnly: properties[6],
            color: new C3.Color(
              properties[7][0],
              properties[7][1],
              properties[7][2],
              properties[8]
            ).premultiply(),
          },
          mesh: {
            draw: properties[24],
            solidsOnly: properties[25],
            color: new C3.Color(
              properties[26][0],
              properties[26][1],
              properties[26][2],
              properties[27]
            ).premultiply(),
          },
        },
        tilemap: {
          bbox: {
            draw: properties[9],
            color: new C3.Color(
              properties[10][0],
              properties[10][1],
              properties[10][2],
              properties[11]
            ).premultiply(),
          },
          polys: {
            draw: properties[12],
            color: new C3.Color(
              properties[13][0],
              properties[13][1],
              properties[13][2],
              properties[14]
            ).premultiply(),
          },
        },
        los: {
          draw: properties[15],
          color: new C3.Color(
            properties[16][0],
            properties[16][1],
            properties[16][2],
            properties[17]
          ).premultiply(),
        },
        pathfinding: {
          draw: properties[18],
          drawForInstance: properties[19],
          grid: {
            color: new C3.Color(
              properties[20][0],
              properties[20][1],
              properties[20][2],
              properties[23]
            ).premultiply(),
          },
          obstacles: {
            color: new C3.Color(
              properties[21][0],
              properties[21][1],
              properties[21][2],
              properties[23]
            ).premultiply(),
          },
          path: {
            color: new C3.Color(
              properties[22][0],
              properties[22][1],
              properties[22][2],
              properties[23]
            ).premultiply(),
          },
        },
      };

      // In draw order.
      this._debugRenderers = [
        new self.TilemapAABBRenderer(C3),
        new self.TilemapPolyRenderer(C3),
        new self.AABBRenderer(C3),
        new self.MeshPolyRenderer(C3),
        new self.CollisionPolyRenderer(C3),
        new self.PathRenderer(C3),
        new self.LOSRenderer(C3),
      ];
    }

    Release() {
      super.Release();
    }

    Draw(renderer) {
      this._debugRenderers = this._debugRenderers.filter(
        (renderer) => renderer.isSupported
      );

      if (!this._settings.isEnabled) return;

      const worldTypeObjectClasses = this.GetRuntime()
        .GetAllObjectClasses()
        .filter((oc) => oc.IsWorldType());
      const worldTypeInstances = worldTypeObjectClasses
        .map((oc) => oc.GetInstances())
        .flat();

      const brokenRenderers = [];

      // Since Renderbug uses undocumented C3 APIs, we're going to play it safe and run our renderers inside of a try-catch block.
      // We'll remove any problematic renderers to avoid spamming the console window.
      for (let i = 0; i < this._debugRenderers.length; i++) {
        try {
          this._debugRenderers[i].draw(
            renderer,
            this._settings,
            worldTypeInstances
          );
        } catch (err) {
          var thrownFrom = this._debugRenderers[i];
          console.error(`
					Renderbug: 	ERROR THROWN FROM ${thrownFrom.constructor.name}!
								This is most likely due to a breaking change in Construct's API.

								Error: ${err}
					`);

          brokenRenderers.push(thrownFrom);
        }
      }

      this._debugRenderers = this._debugRenderers.filter(
        (renderer) => !brokenRenderers.includes(renderer)
      );
    }

    SaveToJson() {
      return {};
    }

    LoadFromJson(_o) {}
  };
}
