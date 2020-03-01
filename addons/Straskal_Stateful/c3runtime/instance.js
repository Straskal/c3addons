"use strict";
{
    C3.Behaviors.Straskal_Stateful.Instance = class StatefulInstance extends C3.SDKBehaviorInstanceBase
    {
        constructor(behInst, properties)
        {
            super(behInst);
            
            this._conditions = C3.Behaviors.Straskal_Stateful.Cnds;
            this._currentState = properties[0];
            this._previousState = "";
        }

        Release()
        {
            super.Release();
        }

        PostCreate() 
        {
            if (this._currentState !== "") 
            {
                this.Trigger(this._conditions.OnStateEnter);
            }
        }

        GetDebuggerProperties()
        {
            const actions = C3.Behaviors.Straskal_Stateful.Acts;

            return [
            {
                title: "Stateful",
                properties: [
                {
                    name: "CurrentState",
                    value: this._currentState,
                    onedit: v => this.CallAction(actions.SetState, v)},
                {
                    name: "PreviousState",
                    value: this._previousState}
                ]
            }];
        }

        /**
         * Set the next state and switch action to transition.
         * @param {string} state 
         */
        _SetState(state)
        {
            if (state && state !== "") 
            {
                this.Trigger(this._conditions.OnStateExit);

                this._previousState = this._currentState;
                this._currentState = state;
    
                this.Trigger(this._conditions.OnStateEnter);
            }
        }
    };
}