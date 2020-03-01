"use strict";
{
	C3.Plugins.Straskal_DebugDraw.Instance = class DebugDrawInstance extends C3.SDKWorldInstanceBase {

		constructor(inst, properties) {
			super(inst);

			this._settings = {
				isEnabled: properties[0],
				bboxSettings: {
					draw: properties[1],
					solidsOnly: properties[2],
					color: new C3.Color(properties[3][0], properties[3][1], properties[3][2], properties[4]).premultiply()
				},
				collisionPolySettings: {
					draw: properties[5],
					solidsOnly: properties[6],
					color: new C3.Color(properties[7][0], properties[7][1], properties[7][2], properties[8]).premultiply()
				},
				losSettings: {
					draw: properties[9],
					color: new C3.Color(properties[10][0], properties[10][1], properties[10][2], properties[11]).premultiply()
				}
			}

			this._debugRenderers = [
				new AABBRenderer(),
				new CollisionPolyRenderer(),
				new LOSRenderer()
			];
		}

		Release() {
			super.Release();
		}

		Draw(renderer) {
			if (!this._settings.isEnabled)
				return;

			const worldTypeObjectClasses = this.GetRuntime().GetAllObjectClasses().filter(oc => oc.IsWorldType());
			const worldTypeInstances = worldTypeObjectClasses.map(oc => oc.GetInstances()).flat();

			for (const debugRenderer of this._debugRenderers) {
				debugRenderer.draw(renderer, this._settings, worldTypeInstances);
			}
		}

		SaveToJson() {
			return {};
		}

		LoadFromJson(_o) {
		}
	};

}