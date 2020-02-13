"use strict";
{
    C3.Behaviors.Straskal_Sibling.Instance = class SiblingInstance extends C3.SDKBehaviorInstanceBase
    {
        constructor(behInst, _properties)
        {
            super(behInst);

            /**
             * A map from C3.ObjectClass to all sibling instances of that class.
             * 
             * This includes objects and families.
             */
            this._siblingsByName = null;
        }

        Release()
        {
            super.Release();
        }

        /**
         * If the sibling cache is not built, then build it.
         * 
         * Ideally, PostCreate() would allow us to create the caches when the object is spawned.
         * But all sibling objects aren't created by the time PostCreate() is invoked.
         */
        _EnsureCache()
        {
            if (!this._siblingsByName)
            {
                const array2map = (map, objectName) => (map[objectName] = [], map);

                const siblings = this._inst.GetSiblings();
                const objectClassTypes = siblings.map(s => s.GetObjectClass());
                const familyClassTypes = objectClassTypes.map(o => o.GetFamilies()).flat();
                const objectClassNames = objectClassTypes.map(o => o.GetName());
                const familyClassNames = familyClassTypes.map(f => f.GetName());
                const distinctObjectNames = [...new Set([ ...objectClassNames, ...familyClassNames ])];

                this._siblingsByName = distinctObjectNames.reduce(array2map, {});

                for (const sibling of siblings)
                {
                    const objectClass = sibling.GetObjectClass();
                    const families = objectClass.GetFamilies();

                    this._siblingsByName[objectClass.GetName()].push(sibling);

                    for (const family of families)
                    {
                        this._siblingsByName[family.GetName()].push(sibling);
                    }
                }
            }
        }

        /**
         * Picks the first sibling instance of siblingType and returns true if exists.
         * @param {C3.ObjectClass} siblingType 
         */
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

        /**
         * Picks all sibling instances of siblingType and returns true if any.
         * @param {C3.ObjectClass} siblingType 
         */
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

        /**
         * Returns all sibling instances of siblingType.
         * @param {C3.ObjectClass} siblingType 
         */
        _GetSiblings(siblingType)
        {
            return this._siblingsByName[siblingType.GetName()];
        }
    };
}