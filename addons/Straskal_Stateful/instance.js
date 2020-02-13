"use strict";
{
    const BEHAVIOR_CLASS = SDK.Behaviors.Straskal_Stateful;

    BEHAVIOR_CLASS.Instance = class StateMachineInstance extends SDK.IBehaviorInstanceBase
    {
        constructor(sdkBehType, behInst)
        {
            super(sdkBehType, behInst);
        }
    };
}