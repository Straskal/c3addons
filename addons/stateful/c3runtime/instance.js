"use strict";

{
	C3.Behaviors.Straskal_Stateful.Instance = class StatefulInstance extends C3.SDKBehaviorInstanceBase {
		constructor(behInst, properties) {
			super(behInst);

			if (properties) {
				this._currentState = properties[0];
				this._previousState = this._currentState;
			}
		}

		Release() {
			super.Release();
		}

		PostCreate() {
			this.Trigger(C3.Behaviors.Straskal_Stateful.Cnds.OnEnter);
		}

		GetDebuggerProperties() {
			const acts = C3.Behaviors.Straskal_Stateful.Acts;
			return [{
				title: "behaviors.straskal_stateful.debugger.stateful-properties.title",
				properties: [
					{
						name: "behaviors.straskal_stateful.debugger.stateful-properties.current-state",
						value: this._currentState,
						onedit: (b) => this.CallAction(acts.SetState, b)
					},
					{
						name: "behaviors.straskal_stateful.debugger.stateful-properties.previous-state",
						value: this._previousState,
						onedit: (b) => this.CallAction(acts.SetState, b)
					}
				]
			}]
		}
	};
}