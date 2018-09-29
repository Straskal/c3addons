"use strict";

{
	C3.Behaviors.Straskal_Stateful.Cnds =
		{
			OnEnter(newState) {
				return newState === this._currentState;
			},
			OnExit(previousState) {
				return previousState === this._previousState;
			},
			CompareState(state) {
				return state === this._currentState;
			}
		};
}