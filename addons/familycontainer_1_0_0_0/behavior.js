"use strict";
{

    const BEHAVIOR_ID = "Straskal_FamilyContainer";
    const BEHAVIOR_VERSION = "1.0.0.0";
    const BEHAVIOR_CATEGORY = "other";

    const BEHAVIOR_CLASS = SDK.Behaviors.Straskal_FamilyContainer = class FamilyContainerBehavior extends SDK.IBehaviorBase
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

            ]);

            SDK.Lang.PopContext(); //.properties
            SDK.Lang.PopContext();
        }
    };

    BEHAVIOR_CLASS.Register(BEHAVIOR_ID, BEHAVIOR_CLASS);
}