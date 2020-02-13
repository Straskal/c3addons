"use strict";
{
    C3.Behaviors.Straskal_Stateful.Instance = class StateMachineInstance extends C3.SDKBehaviorInstanceBase
    {
        constructor(behInst, properties)
        {
            super(behInst);

            this._currentState = null;
            this._previousState = null;

            this._nextState = properties[0];
            this._conditions = C3.Behaviors.Straskal_Stateful.Cnds;
            this._actions = C3.Behaviors.Straskal_Stateful.Acts;

            this._tickFunction = this._SwitchStateTick;

            this._StartTicking();
        }

        Release()
        {
            super.Release();
        }

        Tick()
        {
            this._tickFunction();
        }

        GetDebuggerProperties()
        {
            return [
            {
                title: "Stateful",
                properties: [
                {
                    name: "CurrentState",
                    value: this._currentState,
                    onedit: v => this.CallAction(this._actions.SetState, v)},
                {
                    name: "PreviousState",
                    value: this._previousState}
                ]
            }];
        }


        _SetState(state)
        {
            this._nextState = state;
            this._tickFunction = this._SwitchStateTick;
        }

        _SwitchStateTick()
        {
            if (this._currentState)
            {
                this.Trigger(this._conditions.OnStateExit);
            }

            this._previousState = this._currentState;
            this._currentState = this._nextState;
            this._nextState = null;

            this.Trigger(this._conditions.OnStateEnter);

            this._tickFunction = this._StateTick;
        }

        _StateTick()
        {
            this.Trigger(this._conditions.OnStateTick);
        }
    };
}