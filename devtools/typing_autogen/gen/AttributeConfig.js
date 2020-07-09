var gs = require("grooscript");
function AttributeConfig() {
  var gSobject = gs.init("AttributeConfig");
  gSobject.clazz = { name: "AttributeConfig", simpleName: "AttributeConfig" };
  gSobject.clazz.superclass = {
    name: "java.lang.Object",
    simpleName: "Object",
  };
  gSobject._deprecated = null;
  gSobject.description = null;
  gSobject.role = null;
  gSobject.valType = null;
  gSobject.editType = null;
  gSobject.impliedEdits = null;
  gSobject.dflt = null;
  gSobject.values = null;
  gSobject.flags = null;
  gSobject.extras = null;
  gSobject.items = null;
  gSobject.freeLength = null;
  gSobject.dimensions = null;
  gSobject.itemTypes = null;
  gSobject.min = null;
  gSobject.max = null;
  gSobject._isSubplotObj = null;
  gSobject.noBlank = null;
  gSobject.arrayOk = null;
  gSobject.strict = null;
  gSobject.coerceNumber = null;
  gSobject._noTemplating = null;
  gSobject.name = null;
  gSobject.parent = null;
  if (arguments.length == 1) {
    gs.passMapToObject(arguments[0], gSobject);
  }

  return gSobject;
}
