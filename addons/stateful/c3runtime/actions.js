"use strict";

{
	C3.Behaviors.Straskal_Stateful.Acts =
		{
			SetState(newState) {
				this._previousState = this._currentState;
				this._currentState = newState;

				this.Trigger(C3.Behaviors.Straskal_Stateful.Cnds.OnEnter);
				this.Trigger(C3.Behaviors.Straskal_Stateful.Cnds.OnExit);
			}
		};
}