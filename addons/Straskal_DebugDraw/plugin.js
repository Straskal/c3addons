"use strict";
{
	const PLUGIN_ID = "Straskal_DebugDraw";
	const PLUGIN_VERSION = "1.0.0.0";
	const PLUGIN_CATEGORY = "general";

	const PLUGIN_CLASS = SDK.Plugins.Straskal_DebugDraw = class DebugDraw extends SDK.IPluginBase {
		
		constructor() {
			super(PLUGIN_ID);

			SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

			this._info.SetName(lang(".name"));
			this._info.SetDescription(lang(".description"));
			this._info.SetVersion(PLUGIN_VERSION);
			this._info.SetCategory(PLUGIN_CATEGORY);
			this._info.SetAuthor("Straskal");
			this._info.SetHelpUrl(lang(".help-url"));
			this._info.SetPluginType("world");
			this._info.SetSupportedRuntimes(["c3"]);

			this._info.AddFileDependency({
				filename: "renderers/aabbRenderer.js",
				type: "external-script"
			});

			this._info.AddFileDependency({
				filename: "renderers/collisionPolyRenderer.js",
				type: "external-script"
			});

			this._info.AddFileDependency({
				filename: "renderers/losRenderer.js",
				type: "external-script"
			});

			this._info.AddFileDependency({
				filename: "renderers/tilemapRenderer.js",
				type: "external-script"
			});

			SDK.Lang.PushContext(".properties");

			this._info.SetProperties([
				new SDK.PluginProperty("check", "is-enabled", true),

				// Sprite AABB
				new SDK.PluginProperty("group", "bounding-box"),
				new SDK.PluginProperty("check", "draw-bbs", true),
				new SDK.PluginProperty("check", "bb-solids-only", false),
				new SDK.PluginProperty("color", "bb-color", [1, 0, 0]),
				new SDK.PluginProperty("percent", "bb-opacity", 0.1),

				// Sprite collision polygons
				new SDK.PluginProperty("group", "collision-polys"),
				new SDK.PluginProperty("check", "draw-polys", true),
				new SDK.PluginProperty("check", "poly-solids-only", false),
				new SDK.PluginProperty("color", "poly-color", [1, 0, 0]),
				new SDK.PluginProperty("percent", "poly-opacity", 0.1),

				// Tilemap AABB
				new SDK.PluginProperty("group", "tilemap-bounding-box"),
				new SDK.PluginProperty("check", "draw-tilemap-bbs", true),
				new SDK.PluginProperty("color", "tilemap-bb-color", [1, 0, 0]),
				new SDK.PluginProperty("percent", "tilemap-bb-opacity", 0.1),

				// Line of sight
				new SDK.PluginProperty("group", "line-of-sight"),
				new SDK.PluginProperty("check", "draw-los", true),
				new SDK.PluginProperty("color", "los-color", [0, 1, 0]),
				new SDK.PluginProperty("percent", "los-opacity", 0.1),
			]);

			SDK.Lang.PopContext();
			SDK.Lang.PopContext();
		}
	};

	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}