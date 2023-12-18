"use strict";

{
  const C3 = self.C3;
  C3.Plugins.Straskal_Renderbug.Type = class RenderbugType extends (
    C3.SDKTypeBase
  ) {
    constructor(objectClass) {
      super(objectClass);
    }

    Release() {
      super.Release();
    }

    OnCreate() {}
  };
}
