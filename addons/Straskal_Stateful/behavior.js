"use strict";
{

    const BEHAVIOR_ID = "Straskal_Stateful";
    const BEHAVIOR_VERSION = "1.0.1.0";
    const BEHAVIOR_CATEGORY = "general";

    const BEHAVIOR_CLASS = SDK.Behaviors.Straskal_Stateful = class StateMachineBehavior extends SDK.IBehaviorBase
    {
        constructor()
        {
            super(BEHAVIOR_ID);

            SDK.Lang.PushContext("behaviors." + BEHAVIOR_ID.toLowerCase());

            this._info.SetName(lang(".name"));
            this._info.SetDescription(lang(".description"));
            this._info.SetVersion(BEHAVIOR_VERSION);
            this._info.SetCategory(BEHAVIOR_CATEGORY);
            this._info.SetAuthor("Straskal");
            this._info.SetHelpUrl(lang(".help-url"));
            this._info.SetIsOnlyOneAllowed(true);

            this._info.SetSupportedRuntimes(["c3"]);

            SDK.Lang.PushContext(".properties");

            this._info.SetProperties([
                new SDK.PluginProperty("text", "initial-state-name", "value")

            ]);

            SDK.Lang.PopContext(); //.properties
            SDK.Lang.PopContext();
        }
    };

    BEHAVIOR_CLASS.Register(BEHAVIOR_ID, BEHAVIOR_CLASS);
}