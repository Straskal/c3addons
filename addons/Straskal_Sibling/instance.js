"use strict";
{
    const BEHAVIOR_CLASS = SDK.Behaviors.Straskal_Sibling;

    BEHAVIOR_CLASS.Instance = class SiblingInstance extends SDK.IBehaviorInstanceBase
    {
        constructor(sdkBehType, behInst)
        {
            super(sdkBehType, behInst);
        }

        Release()
        {
        }

        OnCreate()
        {
        }

        OnPropertyChanged(id, value)
        {            
        }

        LoadC2Property(name, valueString)
        {
            return false; // not handled
        }
    };
}