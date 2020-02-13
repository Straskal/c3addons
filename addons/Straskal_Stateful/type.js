"use strict";
{
    const BEHAVIOR_CLASS = SDK.Behaviors.Straskal_Stateful;

    BEHAVIOR_CLASS.Type = class StateMachineType extends SDK.IBehaviorTypeBase
    {
        constructor(sdkPlugin, iBehaviorType)
        {
            super(sdkPlugin, iBehaviorType);
        }
    };
}