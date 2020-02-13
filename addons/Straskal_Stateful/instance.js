"use strict";
{
    const BEHAVIOR_CLASS = SDK.Behaviors.Straskal_Stateful;

    BEHAVIOR_CLASS.Instance = class StatefulInstance extends SDK.IBehaviorInstanceBase
    {
        constructor(sdkBehType, behInst)
        {
            super(sdkBehType, behInst);
        }
    };
}