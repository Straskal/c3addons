"use strict";
{
	const PLUGIN_CLASS = SDK.Plugins.Straskal_Renderbug;

	PLUGIN_CLASS.Type = class RenderbugType extends SDK.ITypeBase {
		
		constructor(sdkPlugin, iObjectType) {
			super(sdkPlugin, iObjectType);
		}
	};
}