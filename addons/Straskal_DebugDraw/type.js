"use strict";
{
	const PLUGIN_CLASS = SDK.Plugins.Straskal_DebugDraw;

	PLUGIN_CLASS.Type = class DebugDrawType extends SDK.ITypeBase {
		
		constructor(sdkPlugin, iObjectType) {
			super(sdkPlugin, iObjectType);
		}
	};
}