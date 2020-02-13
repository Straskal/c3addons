"use strict";
{
    const BEHAVIOR_CLASS = SDK.Behaviors.Straskal_Sibling;

    BEHAVIOR_CLASS.Type = class SiblingType extends SDK.IBehaviorTypeBase
    {
        constructor(sdkPlugin, iBehaviorType)
        {
            super(sdkPlugin, iBehaviorType);
        }
    };
}