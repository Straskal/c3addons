"use strict";
{
    C3.Behaviors.Straskal_Stateful.Exps = {
        CurrentState()
        {
            return this._currentState;
        },

        PreviousState()
        {
            return this._previousState;
        }
    };
}