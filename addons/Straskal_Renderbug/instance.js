"use strict";
{
	const PLUGIN_CLASS = SDK.Plugins.Straskal_Renderbug;

	PLUGIN_CLASS.Instance = class MyDrawingInstance extends SDK.IWorldInstanceBase {
		
		constructor(sdkType, inst) {
			super(sdkType, inst);
		}

		Release() {
		}

		OnCreate() {
		}

		OnPlacedInLayout() {
		}

		Draw(_iRenderer, _iDrawParams) {
		}

		OnPropertyChanged(_id, _value) {
		}

		LoadC2Property(_name, _valueString) {
			return false;
		}
	};
}