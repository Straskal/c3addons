"use strict";
{
    C3.Behaviors.Straskal_FamilyContainer.Instance = class FamilyContainerInstance extends C3.SDKBehaviorInstanceBase
    {
        constructor(behInst, properties)
        {
            super(behInst);

            this._siblingsByFamily = null;
        }

        Release()
        {
            super.Release();
        }

        _EnsureCache()
        {
            if (!this._siblingsByFamily)
            {
                this._siblingsByFamily = [];

                const siblings = this._inst.GetSiblings();

                for (const sibling of siblings)
                {
                    const families = sibling.GetObjectClass().GetFamilies();

                    for (const family of families)
                    {
                        const familyName = family.GetName();

                        if (!this._siblingsByFamily[familyName])
                        {
                            this._siblingsByFamily[familyName] = [];
                        }

                        this._siblingsByFamily[familyName].push(sibling);
                    }
                }
            }
        }

        _PickSibling(siblingType)
        {
            this._EnsureCache();

            const siblings = this._GetSiblings(siblingType);

            if (siblings)
            {
                siblingType.GetCurrentSol().SetSinglePicked(siblings[0]);
                return true;
            }

            return false;
        }

        _PickAllSiblings(siblingType)
        {
            this._EnsureCache();

            const siblings = this._GetSiblings(siblingType);

            if (siblings)
            {
                siblingType.GetCurrentSol().SetArrayPicked(siblings);
                return true;
            }

            return false;
        }

        _GetSiblings(siblingType)
        {
            return this._siblingsByFamily[siblingType.GetName()];
        }
    };
}