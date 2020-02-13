"use strict";
{
    C3.Behaviors.Straskal_Stateful.Cnds = {
        OnStateEnter(state)
        {
            return C3.equalsNoCase(state, this._currentState);
        },

        OnStateExit(state)
        {
            return C3.equalsNoCase(state, this._currentState);
        },

        OnStateTick(state)
        {
            return C3.equalsNoCase(state, this._currentState);
        },

        CompareCurrentState(comparison, state)
        {
            return C3.compare(this._currentState, comparison, state);
        },

        ComparePreviousState(comparison, state)
        {
            return C3.compare(this._previousState, comparison, state);
        }
    };
}