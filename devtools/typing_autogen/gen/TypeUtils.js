var gs = require('grooscript');
function AttributeConfig() {
  var gSobject = gs.init('AttributeConfig');
  gSobject.clazz = { name: 'AttributeConfig', simpleName: 'AttributeConfig'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
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
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
function TypeUtils() {
  var gSobject = gs.init('TypeUtils');
  gSobject.clazz = { name: 'TypeUtils', simpleName: 'TypeUtils'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.typeMap = gs.map().add("string","string").add("number","number").add("integer","number").add("any","any").add("colorscale","string|any[]").add("angle","number").add("boolean","boolean").add("flaglist","string[]|string").add("data_array","any[]").add("subplotid","string").add("color","string").add("enumerated","string").add("info_array","any[]").add("colorlist","string[]").add("dimensions","number");
  gSobject.traceNameMap = gs.map().add("scattergl","ScatterGL").add("area","Area").add("bar","Bar").add("box","Box").add("candlestick","Candlestick").add("choropleth","Choropleth").add("cone","Cone").add("contour","Contour").add("heatmap","Heatmap").add("heatmapgl","HeatmapGL").add("histogram","Histogram").add("histogram2d","Histogram2D").add("histogram2dcontour","Histogram2DContour").add("mesh3d","Mesh3D").add("ohlc","OHLC").add("pie","Pic").add("pointcloud","PointCloud").add("scatter","Scatter").add("scatter3d","Scatter3D").add("scattergeo","ScatterGeo").add("scattermapbox","ScatterMapBox").add("scatterternary","ScatterTernary").add("surface","Surface").add("sankey","Sankey").add("scattercarpet","ScatterCarpet").add("carpet","Carpet").add("contourcarpet","ContourCarpet").add("parcoords","ParCoords").add("table","Table").add("scatterpolar","ScatterPolar").add("scatterpolargl","ScatterPolarGL").add("violin","Violin").add("splom","Splom").add("streamtube","Streamtube").add("barpolar","BarPolar");
  gSobject['getTraceName'] = function(jsonName) {
    if (!gs.bool(gSobject.traceNameMap[jsonName])) {
      gs.println("No table name mapping found for '" + (jsonName) + "'. Add it to 'traceNameMap' array in TypeUtils.groovy.");
      return jsonName;
    };
    return gSobject.traceNameMap[jsonName];
  }
  gSobject['getTraceNamesTSLiteral'] = function(it) {
    return gs.mc(gs.mc(gSobject.traceNameMap,"collect",[function(k, v) {
      return "'" + (k) + "'";
    }]),"join",["|"]);
  }
  gSobject['getTSType'] = function(attConfig) {
    if (!gs.bool(gSobject.typeMap[gs.gp(attConfig,"valType")])) {
      gs.println("No type mapping for '" + (gs.gp(attConfig,"valType")) + "'. Add it to 'typeMap' array in TypeUtils.groovy.");
      return gs.gp(attConfig,"valType");
    };
    var result = gSobject.typeMap[gs.gp(attConfig,"valType")];
    if ((gs.bool(gs.gp(attConfig,"arrayOk"))) && ((gs.equals(result, "string")) || (gs.equals(result, "number")))) {
      result += "|" + (result) + "[]";
    };
    if (((gs.equals(gs.gp(attConfig,"valType"), "info_array")) && (gs.bool(gs.gp(attConfig,"items")))) && (gs.mc(gs.gp(attConfig,"items"),"size",[]))) {
      gs.sp(attConfig,"itemTypes",gs.mc(gs.gp(attConfig,"items"),"toString",[]));
      result = "[";
      gs.mc(gs.gp(attConfig,"items"),"each",[function(it) {
        return result += "" + (gSobject.typeMap[gs.gp(it,"valType")]) + ", ";
      }]);
      result = gs.mc(gSobject,"removeLastChar",[result]);
      result = gs.mc(gSobject,"removeLastChar",[result]);
      result += "]";
    };
    if (((gs.equals(gs.gp(attConfig,"valType"), "enumerated")) && (gs.bool(gs.gp(attConfig,"values")))) && (gs.mc(gs.gp(attConfig,"values"),"size",[]))) {
      var containsRegex = false;
      result = "";
      gs.mc(gs.gp(attConfig,"values"),"each",[function(it) {
        result += "" + (gs.mc(gSobject,"quoteIfString",[it])) + "|";
        if ((!gs.bool(containsRegex)) && (gs.mc(gSobject,"isRegexString",[it]))) {
          return containsRegex = true;
        };
      }]);
      result = gs.mc(gSobject,"removeLastChar",[result]);
      if (gs.bool(gs.gp(attConfig,"arrayOk"))) {
        result += "|string|string[]";
      } else {
        if (gs.bool(containsRegex)) {
          result += "|string";
        };
      };
    };
    if (((gs.equals(gs.gp(attConfig,"valType"), "flaglist")) && (gs.bool(gs.gp(attConfig,"flags")))) && (gs.mc(gs.gp(attConfig,"flags"),"size",[]))) {
      result = "";
      gs.mc(gs.gp(attConfig,"flags"),"each",[function(it) {
        return result += "" + (gs.mc(gSobject,"quoteIfString",[it])) + "|";
      }]);
      if (gs.bool(gs.gp(attConfig,"extras"))) {
        gs.mc(gs.gp(attConfig,"extras"),"each",[function(it) {
          return result += "" + (gs.mc(gSobject,"quoteIfString",[it])) + "|";
        }]);
      };
      result = gs.mc(result,"substring",[0, gs.minus(gs.mc(result,"length",[]), 1)]);
    };
    return result;
  }
  gSobject['removeLastChar'] = function(val) {
    return gs.mc(val,"substring",[0, gs.minus(gs.mc(val,"length",[]), 1)]);
  }
  gSobject['quoteIfString'] = function(val) {
    var result = val;
    if (gs.mc(gSobject,"isString",[val])) {
      val = gs.mc(val,"replace",["\", "\\"]);
      result = (gs.plus((gs.plus("'", val)), "'"));
    };
    return result;
  }
  gSobject['isString'] = function(val) {
    return gs.instanceOf(val, "String");
  }
  gSobject['isRegexString'] = function(val) {
    return (gs.mc(gSobject,"isString",[val])) && (gs.mc(val,"contains",["/"]));
  }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
