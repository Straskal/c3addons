"use strict";
{
    const BEHAVIOR_CLASS = SDK.Behaviors.Straskal_FamilyContainer;

    BEHAVIOR_CLASS.Instance = class FamilyContainerInstance extends SDK.IBehaviorInstanceBase
    {
        constructor(sdkBehType, behInst)
        {
            super(sdkBehType, behInst);
        }

        Release()
        {}

        OnCreate()
        {}

        OnPropertyChanged(id, value)
        {}

        LoadC2Property(name, valueString)
        {
            return false; // not handled
        }
    };
}