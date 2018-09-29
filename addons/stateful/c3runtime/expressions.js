"use strict";

{
	C3.Behaviors.Straskal_Stateful.Exps =
		{
			GetCurrentState() {
				return this._currentState;
			},
			GetPreviousState() {
				return this._previousState;
			}
		};
}