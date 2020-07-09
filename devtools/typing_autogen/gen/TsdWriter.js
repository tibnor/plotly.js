var gs = require('grooscript');
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
function TsdTemplates() {
  var gSobject = gs.init('TsdTemplates');
  gSobject.clazz = { name: 'TsdTemplates', simpleName: 'TsdTemplates'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.typeUtils = null;
  gSobject['moduleStart'] = function(moduleName) {
    return "declare module " + (moduleName) + " {";
  }
  gSobject['moduleEnd'] = function(it) {
    return "}";
  }
  gSobject['interfaceStart'] = function(interfaceName, extendsFrom) {
    if (extendsFrom === undefined) extendsFrom = null;
    var result = "export interface " + (interfaceName) + "";
    if (gs.bool(extendsFrom)) {
      result += " extends " + (extendsFrom) + "";
    };
    return "" + (result) + " {";
  }
  gSobject['interfaceEnd'] = function(it) {
    return "}";
  }
  gSobject['tsdHeader'] = function(it) {
    return gs.mc("\n/* tslint:disable:max-line-length */\n/* tslint:disable:member-ordering */\n        ","trim",[]);
  }
  gSobject['tsdFooter'] = function(it) {
    return gs.mc("\n/* tslint:enable */\n        ","trim",[]);
  }
  gSobject['tsdEventHelperComments'] = function(events) {
    var dataEventContent = "";
    gs.mc(gs.gp(events,"dataEvents"),"each",[function(thisEvent) {
      return dataEventContent += (gs.plus("  static " + (thisEvent) + " = \"" + (thisEvent) + "\";", "\n"));
    }]);
    var updateEventContent = "";
    gs.mc(gs.gp(events,"updateEvents"),"each",[function(thisEvent) {
      return updateEventContent += (gs.plus("  static " + (thisEvent) + " = \"" + (thisEvent) + "\";", "\n"));
    }]);
    var otherEventContent = "";
    gs.mc(gs.gp(events,"otherEvents"),"each",[function(thisEvent) {
      return otherEventContent += (gs.plus("  static " + (thisEvent) + " = \"" + (thisEvent) + "\";", "\n"));
    }]);
    return gs.mc("\n/*\n The classes below contain all event types found in the plotly.js source code.\n You can manually copy these into a file in your source tree (e.g.: plotly-events.model.ts) if you'd like to\n be able to look up event names via static properties (e.g.: PlotlyDataEvents.plotly_click) instead of remembering the event name strings.\n// Plotly events that typically handle event data of type {CartesianEventPoint}.\nexport class PlotlyDataEvents {\n" + (dataEventContent) + "\n}\n// Plotly update events.\n// Event data includes an array containing an object of updated attributes and an array of the trace numbers that were updated.\nexport class PlotlyUpdateEvents {\n" + (updateEventContent) + "\n}\n// Other Plotly events that either have no event data, or have custom event data (see Plotly docs or source code).\nexport class PlotlySimpleEvents {\n" + (otherEventContent) + "\n}\n */\n        ","trim",[]);
  }
  gSobject['plotlyDiv'] = function(it) {
    return gs.mc("\ndeclare module plotly {\n  /**\n   * An HTML div element with additional properties added by Plotly.\n   */\n  export interface PlotlyDiv extends HTMLDivElement {\n    data?: plotly.traces.BaseTrace[];\n    \n    /** User-defined layout config */\n    layout?: plotly.layout.Layout;\n    \n    /** Full layout config (including user-defined config) */\n    _fullLayout?: plotly.layout.Layout;\n    \n    /** Context seems to map to additionalConfig */\n    _context?: any;\n    emit?( event: any, data: any ): void;\n    \n    /**\n     * To get full type checking on the event, you need to specify a type like this. It's overly verbose, but it's the only way to ensure\n     * that all the generic types within the event can be determined:\n     *\n     * type eventType = plotly.event.DataEventData<plotly.event.CartesianEventPoint<plotly.traces.ScatterGL>, plotly.traces.ScatterGL>;\n     * plotElement.on( PlotlyDataEvents.plotly_selected, ( eventData: eventType ) => {\n     *   // Your code\n     * });\n     *\n     * @param event {string} Event name\n     * @param fn {( eventData: any ) => void} For event data type checking, specify data type and generics like:\n     * plotly.event.DataEventData&lt;plotly.event.CartesianEventPoint&lt;plotly.traces.ScatterGL&gt;, plotly.traces.ScatterGL&gt;\n     */\n    on?( event: string, fn: ( eventData: any ) => void ): void;\n  }\n}\n        ","trim",[]);
  }
  gSobject['plotlyEvents'] = function(it) {
    return gs.mc("\ndeclare module plotly.event {\n  \n  export type PlotlyRestyleEventData = [\n    /** Object of updated attributes */\n    any,\n    /** Array of the trace numbers that were updated */\n    number[]\n  ];\n  \n  interface PlotlyRelayoutEventData {}\n  interface PlotlyCartesianRelayoutEventData extends PlotlyRelayoutEventData {\n    xaxis: {\n      range: [number, number],\n      autorange: boolean\n    };\n    yaxis: {\n      range: [number, number],\n      autorange: boolean\n    };\n  }\n  interface Plotly3DRelayoutEventData extends PlotlyRelayoutEventData {\n    scene: {\n      center: {x: number, y: number, z: number },\n      eye: {x: number, y: number, z: number },\n      up: {x: number, y: number, z: number }\n    };\n  }\n  interface BaseDataEventPoint<T extends plotly.traces.BaseTrace> {\n    /** index in data of the trace associated with the selected point */\n    curveNumber: number;\n    \n    /** index of the selected point */\n    pointNumber: number;\n    \n    /** ref to the trace as sent to Plotly.plot associated with the selected point */\n    data: T;\n    \n    /** ref to the trace including all of the default attributes */\n    fullData: T;\n    \n    /** ref to associated custom data object */\n    customdata?: any;\n  }\n  interface CartesianEventPoint<T extends plotly.traces.BaseTrace> extends BaseDataEventPoint<T> {\n    \n    /** x value */\n    x: number;\n    \n    /** y value */\n    y: number;\n    \n    /** ref to x-axis object (i.e layout.xaxis) associated with the selected point */\n    xaxis: plotly.layout.PlotlyAxis;\n    \n    /** ref to y-axis object */\n    yaxis: plotly.layout.PlotlyAxis;\n  }\n  interface ThreeDEventPoint<T extends plotly.traces.BaseTrace> extends BaseDataEventPoint<T> {\n    \n    /** x value */\n    x: number;\n    \n    /** y value */\n    y: number;\n    \n    /** z value */\n    z: number;\n    \n    /** ref to x-axis object (i.e layout.xaxis) associated with the selected point */\n    xaxis: plotly.layout.PlotlyAxis;\n    \n    /** ref to y-axis object */\n    yaxis: plotly.layout.PlotlyAxis;\n    \n    /** ref to z-axis object */\n    zaxis: plotly.layout.PlotlyAxis;\n  }\n  interface MapEventPoint<T extends plotly.traces.BaseTrace> extends BaseDataEventPoint<T> {\n    \n    /** lat value */\n    lat: number;\n    \n    /** lon value */\n    lon: number;\n    \n    location: any;  \n  }\n  \n  interface PlotlyEventData {\n    /** Actual type may vary, but is typically MouseEvent */\n    event?: Event;\n  }\n  \n  interface DataEventData<E extends BaseDataEventPoint<T>, T> extends PlotlyEventData {\n    /** Array of CartesianEventPoint, ThreeDEventPoint, or MapEventPoint */\n    points: E[];\n  }\n}\n        ","trim",[]);
  }
  gSobject['baseTrace'] = function(it) {
    return gs.mc("\n  interface BaseTrace {\n    type?: " + (gs.gp(gSobject.typeUtils,"traceNamesTSLiteral")) + ";\n  }\n        ","trim",[]);
  }
  gSobject['plotlyObj'] = function(it) {
    return gs.mc("\ndeclare module plotly {\n  export type ReturnStringFunction = ( plotElement: PlotlyDiv ) => string;\n  export interface PlotlyModeBarButton {\n    // See Plotly /components/modebar/buttons.js for configs of built-in buttons.\n    /**\n     * name / id of the buttons (for tracking)\n     */\n    name?: string;\n    /**\n     * Text that appears while hovering over the button, enter null, false or '' for no hover text\n     */\n    title?: string | ReturnStringFunction;\n    /**\n     * SVG path associated with the button. Can be linked to Plotly.Icons to use the default plotly icons\n     */\n    icon?: { ascent?: number, descent?: number, path?: string, width?: number };\n    /**\n     * Icon positioning. No idea what this does. Plotly only sets this to \"ne\".\n     */\n    gravity?: string;\n    /**\n     * Click handler associated with the button\n     * @param gd The main graph object\n     * @param event\n     */\n    click?: ( gd?: any, event?: any ) => void;\n    /**\n     * Attribute associated with button, use this with 'val' to keep track of the state\n     */\n    attr?: string;\n    /**\n     * Initial 'attr' value, can be a function of gd\n     */\n    val?: string | ReturnStringFunction;\n    /**\n     * Is the button a toggle button?\n     */\n    toggle?: boolean;\n  }\n  \n  /**\n   * Plot config options\n   */\n  export interface PlotConfig {\n    staticPlot?: boolean;\n    editable?: boolean;\n    edits?: {\n      annotationPosition?: boolean,\n      annotationTail?: boolean,\n      annotationText?: boolean,\n      axisTitleText?: boolean,\n      colorbarPosition?: boolean,\n      colorbarTitleText?: boolean,\n      legendPosition?: boolean,\n      legendText?: boolean,\n      shapePosition?: boolean,\n      titleText?: boolean\n    };\n    /**\n     * Do autosize once regardless of layout.autosize\n     */\n    autosizable?: boolean;\n    /**\n     * Set the length of the undo/redo queue\n     */\n    queueLength?: number;\n    /**\n     * If we do autosize, do we fill the container or the screen?\n     */\n    fillFrame?: boolean;\n    /**\n     * If we do autosize, set the frame margins in percents of plot size\n     */\n    frameMargins?: boolean;\n    /**\n     * Mousewheel or two-finger scroll zooms the plot\n     */\n    scrollZoom?: boolean;\n    /**\n     * Double click interaction (false, 'reset', 'autosize' or 'reset+autosize')\n     */\n    doubleClick?: false|'reset'|'autosize'|'reset+autosize';\n    /**\n     * New users see some hints about interactivity\n     */\n    showTips?: boolean;\n    /**\n     * Enable axis pan/zoom drag handles\n     */\n    showAxisDragHandles?: boolean;\n    /**\n     * Enable direct range entry at the pan/zoom drag points. drag handles must be enabled\n     */\n    showAxisRangeEntryBoxes?: boolean;\n    /**\n     * Link to open this plot in plotly\n     */\n    showLink?: boolean;\n    /**\n     * If we show a link, does it contain data or just link to a plotly file?\n     */\n    sendData?: boolean;\n    /**\n     * Text appearing in the sendData link\n     */\n    linkText?: string;\n    /**\n     * false or function adding source(s) to linkText\n     */\n    showSources?: boolean;\n    /**\n     * Display the mode bar (true, false, or 'hover')\n     */\n    displayModeBar?: boolean|'hover';\n    /**\n     * Remove mode bar button by name\n     */\n    modeBarButtonsToRemove?: string[];\n    /**\n     * Add mode bar button using config objects\n     */\n    modeBarButtonsToAdd?: plotly.PlotlyModeBarButton[];\n    /**\n     * Fully custom mode bar buttons as nested array, where the outer arrays represents button groups, \n     * and the inner arrays have buttons config objects or names of default buttons\n     */\n    modeBarButtons?: Array<(string|plotly.PlotlyModeBarButton)[]>;\n    displaylogo?: boolean;\n    /**\n     * Increase the pixel ratio for Gl plot images\n     */\n    plotGlPixelRatio?: number;\n    /**\n     * Background setting function\n     * 'transparent' sets the background `layout.paper_color`\n     * 'opaque' blends bg color with white ensuring an opaque background\n     */\n    setBackground?: 'transparent'|'opaque';\n    /**\n     * URL to topojson files used in geo charts\n     */\n    topojsonURL?: string;\n    /**\n     * Mapbox access token (required to plot mapbox trace types). Set this option to ''\n     * to prevent plotly.js from authenticating to the public Mapbox server.\n     */\n    mapboxAccessToken?: string;\n    /**\n     * Turn all console logging on or off (errors will be thrown)\n     * This should ONLY be set via Plotly.setPlotConfig\n     * 0: no logs\n     * 1: warnings and errors, but not informational messages\n     * 2: verbose logs\n     */\n    logging?: 0|1|2;\n    /**\n     * Set global transform to be applied to all traces with no specification needed\n     */\n    globalTransforms?: any[];\n    /**\n     * Should be a string like 'en' or 'en-US'.\n     */\n    locale?: string;\n    /*\n     * Localization definitions\n     * Locales can be provided either here (specific to one chart) or globally\n     * by registering them as modules.\n     * Should be an object of objects {locale: {dictionary: {...}, format: {...}}}\n     * {\n     *     da: {\n     *         dictionary: {'Reset axes': 'Nulstil aksler', ...},\n     *         format: {months: [...], shortMonths: [...]}\n     *     },\n     *     ...\n     * }\n     * All parts are optional. When looking for translation or format fields, we\n     * look first for an exact match in a config locale, then in a registered\n     * module. If those fail, we strip off any regionalization ('en-US' -> 'en')\n     * and try each (config, registry) again. The final fallback for translation\n     * is untranslated (which is US English) and for formats is the base English\n     * (the only consequence being the last fallback date format %x is DD/MM/YYYY\n     * instead of MM/DD/YYYY). Currently `grouping` and `currency` are ignored\n     * for our automatic number formatting, but can be used in custom formats.\n     */\n    locales?: boolean;\n  }\n  /**\n   * Global Plotly object.\n   */\n  export interface Plotly {\n    /**\n     * Plotly.react:\n     * A plot/update method that takes the full plot state (same API as plot/newPlot)\n     * and diffs to determine the minimal update pathway.\n     *\n     * Diffing is done on fullData and fullLayout, not on data and layout, for a few reasons:\n     * \n     * We don't copy data and layout, so there's nothing to diff there if the user modifies them in place. But _full* get regenerated as \n     * new objects with every supplyDefaults call (which must happen on every update regardless).\n     * No need to worry about the data types we're diffing, as supplyDefaults cleans that up. Also we won't diff user attributes that \n     * don't go into the plot, or irrelevant leftovers of old plot types.\n     * \n     * We do NOT dive into data arrays (valType: 'data_array' or arrayOk: true) in the diffing algorithm. There are two ways to tell \n     * Plotly.react that the data have changed:\n     * \n     * layout.datarevision: can take any value - string, number, whatever - and if it is not === its previous value, we treat the data \n     * as changed. Data arrays themselves are ignored during diffing. Note that right now there's no difference in the pathway we'd take \n     * for one vs all data arrays changing, but in the future if we implement partial recalc we can make a similar flag for each array, \n     * or perhaps each trace.\n     * \n     * If you omit datarevision, we assume data arrays are being used as immutable and compare them with === to determine if anything \n     * changed. This has some known issues (resulting in slow recalc when it wouldn't be needed) that we should fix:\n     * At least one trace type (surface) fills in index arrays for missing dimensions. These are never === each other. We should provide \n     * these later in the pipeline, not attached to _fullData, or fill them in as _private attributes which do not get diffed.\n     * At least one trace type (scatter) will slice uneven arrays to the same length, which will also make them compare unequal. \n     * We should just record a private _length or something instead.\n     *\n     * @param {string id or DOM element} gd\n     *      the id or DOM element of the graph container div\n     * @param {array of objects} data\n     *      array of traces, containing the data and display information for each trace\n     * @param {object} layout\n     *      object describing the overall display of the plot,\n     *      all the stuff that doesn't pertain to any individual trace\n     * @param {object} config\n     *      configuration options (see ./plot_config.js for more info)\n     *\n     * OR\n     *\n     * @param {string id or DOM element} gd\n     *      the id or DOM element of the graph container div\n     * @param {object} figure\n     *      object containing `data`, `layout`, `config`, and `frames` members\n     *\n     */\n    react(gd: string|HTMLDivElement, data?: plotly.traces.BaseTrace[], layout?: plotly.layout.Layout, config?: plotly.PlotConfig): Promise<plotly.PlotlyDiv>;\n  \n    /**\n     * Main plot-creation function\n     *\n     * @param {string id or DOM element} gd\n     *    the id or DOM element of the graph container div\n     * @param {array of objects} data\n     *    array of traces, containing the data and display information for each trace\n     * @param {object} layout\n     *    object describing the overall display of the plot,\n     *    all the stuff that doesn't pertain to any individual trace\n     * @param {object} config\n     *    configuration options (see ./plot_config.js for more info)\n     *\n     */\n    plot(gd: string|HTMLDivElement, data: plotly.traces.BaseTrace[], layout?: plotly.layout.Layout, config?: plotly.PlotConfig): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Convenience function to force a full redraw.\n     */\n    redraw(gd: string|HTMLDivElement): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Convenience function to make idempotent plot option obvious to users.\n     *\n     * @param {string id or DOM element} gd\n     *    the id or DOM element of the graph container div\n     * @param {array of objects} data\n     *    array of traces, containing the data and display information for each trace\n     * @param {object} layout\n     *    object describing the overall display of the plot,\n     *    all the stuff that doesn't pertain to any individual trace\n     * @param {object} config\n     *    configuration options (see ./plot_config.js for more info)\n     *\n     */\n    newPlot(gd: string|HTMLDivElement, data: plotly.traces.BaseTrace[], layout?: plotly.layout.Layout, config?: plotly.PlotConfig): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Extend && prepend traces at indices with update arrays, window trace lengths to maxPoints\n     *\n     * Extend and Prepend have identical APIs. Prepend inserts an array at the head while Extend\n     * inserts an array off the tail. Prepend truncates the tail of the array - counting maxPoints\n     * from the head, whereas Extend truncates the head of the array, counting backward maxPoints\n     * from the tail.\n     *\n     * If maxPoints is undefined, nonNumeric, negative or greater than extended trace length no\n     * truncation / windowing will be performed. If its zero, well the whole trace is truncated.\n     *\n     * @param {Object|HTMLDivElement} gd The graph div\n     * @param {Object} update The key:array map of target attributes to extend\n     * @param {Number|Number[]} indices The locations of traces to be extended\n     * @param {Number|Object} [maxPoints] Number of points for trace window after lengthening.\n     *\n     */\n    extendTraces(gd: any|HTMLDivElement, update: any, indices: number|number[], maxPoints: number|any): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Extend && prepend traces at indices with update arrays, window trace lengths to maxPoints\n     *\n     * Extend and Prepend have identical APIs. Prepend inserts an array at the head while Extend\n     * inserts an array off the tail. Prepend truncates the tail of the array - counting maxPoints\n     * from the head, whereas Extend truncates the head of the array, counting backward maxPoints\n     * from the tail.\n     *\n     * If maxPoints is undefined, nonNumeric, negative or greater than extended trace length no\n     * truncation / windowing will be performed. If its zero, well the whole trace is truncated.\n     *\n     * @param {Object|HTMLDivElement} gd The graph div\n     * @param {Object} update The key:array map of target attributes to extend\n     * @param {Number|Number[]} indices The locations of traces to be extended\n     * @param {Number|Object} [maxPoints] Number of points for trace window after lengthening.\n     *\n     */\n    prependTraces(gd: any|HTMLDivElement, update: any, indices: number|number[], maxPoints: number|any): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Add data traces to an existing graph div.\n     *\n     * @param {Object|HTMLDivElement} gd The graph div\n     * @param {Object[]} gd.data The array of traces we're adding to\n     * @param {Object[]|Object} traces The object or array of objects to add\n     * @param {Number[]|Number} [newIndices=[gd.data.length]] Locations to add traces\n     *\n     */\n    addTraces(gd: any|HTMLDivElement, traces: plotly.traces.BaseTrace|plotly.traces.BaseTrace[], newIndices: number|number[]): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Delete traces at `indices` from gd.data array.\n     *\n     * @param {Object|HTMLDivElement} gd The graph div\n     * @param {Object[]} gd.data The array of traces we're removing from\n     * @param {Number|Number[]} indices The indices\n     */\n    deleteTraces(gd: any|HTMLDivElement, indices: number|number[]): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Move traces at currentIndices array to locations in newIndices array.\n     *\n     * If newIndices is omitted, currentIndices will be moved to the end. E.g.,\n     * these are equivalent:\n     *\n     * Plotly.moveTraces(gd, [1, 2, 3], [-3, -2, -1])\n     * Plotly.moveTraces(gd, [1, 2, 3])\n     *\n     * @param {Object|HTMLDivElement} gd The graph div\n     * @param {Object[]} gd.data The array of traces we're removing from\n     * @param {Number|Number[]} currentIndices The locations of traces to be moved\n     * @param {Number|Number[]} [newIndices] The locations to move traces to\n     *\n     * Example calls:\n     *\n     *    // move trace i to location x\n     *    Plotly.moveTraces(gd, i, x)\n     *\n     *    // move trace i to end of array\n     *    Plotly.moveTraces(gd, i)\n     *\n     *    // move traces i, j, k to end of array (i != j != k)\n     *    Plotly.moveTraces(gd, [i, j, k])\n     *\n     *    // move traces [i, j, k] to [x, y, z] (i != j != k) (x != y != z)\n     *    Plotly.moveTraces(gd, [i, j, k], [x, y, z])\n     *\n     *    // reorder all traces (assume there are 5--a, b, c, d, e)\n     *    Plotly.moveTraces(gd, [b, d, e, a, c])  // same as 'move to end'\n     */\n    moveTraces(gd: any|HTMLDivElement, currentIndices: number|number[], newIndices: number|number[]): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * restyle: update trace attributes of an existing plot\n     *\n     * Can be called two ways.\n     *\n     * Signature 1:\n     * @param {String | HTMLDivElement} gd\n     *  the id or DOM element of the graph container div\n     * @param {String} astr\n     *  attribute string (like `'marker.symbol'`) to update\n     * @param {*} val\n     *  value to give this attribute\n     * @param {Number[] | Number} [traces]\n     *  integer or array of integers for the traces to alter (all if omitted)\n     *\n     * Signature 2:\n     * @param {String | HTMLDivElement} gd\n     *  (as in signature 1)\n     * @param {Object} aobj\n     *  attribute object `{astr1: val1, astr2: val2 ...}`\n     *  allows setting multiple attributes simultaneously\n     * @param {Number[] | Number} [traces]\n     *  (as in signature 1)\n     *\n     * `val` (or `val1`, `val2` ... in the object form) can be an array,\n     * to apply different values to each trace.\n     *\n     * If the array is too short, it will wrap around (useful for\n     * style files that want to specify cyclical default values).\n     */\n    restyle(gd: string|HTMLDivElement, val: any, traces?: number|number[]): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * relayout: update layout attributes of an existing plot\n     *\n     * Can be called two ways:\n     *\n     * Signature 1:\n     * @param {String | HTMLDivElement} gd\n     *  the id or dom element of the graph container div\n     * @param {String} astr\n     *  attribute string (like `'xaxis.range[0]'`) to update\n     * @param {*} val\n     *  value to give this attribute\n     *\n     * Signature 2:\n     * @param {String | HTMLDivElement} gd\n     *  (as in signature 1)\n     * @param {Object} aobj\n     *  attribute object `{astr1: val1, astr2: val2 ...}`\n     *  allows setting multiple attributes simultaneously\n     */\n    relayout(gd: string|HTMLDivElement, astr: string|{[key: string]: any}, val?: any): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * update: update trace and layout attributes of an existing plot\n     *\n     * @param {String | HTMLDivElement} gd\n     *  the id or DOM element of the graph container div\n     * @param {Object} traceUpdate\n     *  attribute object `{astr1: val1, astr2: val2 ...}`\n     *  corresponding to updates in the plot's traces\n     * @param {Object} layoutUpdate\n     *  attribute object `{astr1: val1, astr2: val2 ...}`\n     *  corresponding to updates in the plot's layout\n     * @param {Number[] | Number} [traces]\n     *  integer or array of integers for the traces to alter (all if omitted)\n     *\n     */\n    update(gd: string|HTMLDivElement, traceUpdate?: {[key: string]: any}, layoutUpdate?: {[key: string]: any}, traces?: number|number[]): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Animate to a frame, sequence of frame, frame group, or frame definition\n     *\n     * @param {string id or DOM element} gd\n     *    the id or DOM element of the graph container div\n     *\n     * @param {string or object or array of strings or array of objects} frameOrGroupNameOrFrameList\n     *    a single frame, array of frames, or group to which to animate. The intent is\n     *    inferred by the type of the input. Valid inputs are:\n     *\n     *    - string, e.g. 'groupname': animate all frames of a given `group` in the order\n     *      in which they are defined via `Plotly.addFrames`.\n     *\n     *    - array of strings, e.g. ['frame1', frame2']: a list of frames by name to which\n     *      to animate in sequence\n     *\n     *    - object: {data: ...}: a frame definition to which to animate. The frame is not\n     *      and does not need to be added via `Plotly.addFrames`. It may contain any of\n     *      the properties of a frame, including `data`, `layout`, and `traces`. The\n     *      frame is used as provided and does not use the `baseframe` property.\n     *\n     *    - array of objects, e.g. [{data: ...}, {data: ...}]: a list of frame objects,\n     *      each following the same rules as a single `object`.\n     *\n     * @param {object} animationOpts\n     *    configuration for the animation\n     */\n    animate(gd: string|HTMLDivElement, frameOrGroupNameOrFrameList: string|string[]|any|any[], animationOpts: any): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Register new frames\n     *\n     * @param {string id or DOM element} gd\n     *    the id or DOM element of the graph container div\n     *\n     * @param {array of objects} frameList\n     *    list of frame definitions, in which each object includes any of:\n     *    - name: {string} name of frame to add\n     *    - data: {array of objects} trace data\n     *    - layout {object} layout definition\n     *    - traces {array} trace indices\n     *    - baseframe {string} name of frame from which this frame gets defaults\n     *\n     *  @param {array of integers) indices\n     *    an array of integer indices matching the respective frames in `frameList`. If not\n     *    provided, an index will be provided in serial order. If already used, the frame\n     *    will be overwritten.\n     */\n    addFrames(gd: string|HTMLDivElement, frameList: any[], indices?: number[]): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Delete frame\n     *\n     * @param {string id or DOM element} gd\n     *    the id or DOM element of the graph container div\n     *\n     * @param {array of integers} frameList\n     *    list of integer indices of frames to be deleted\n     */\n    deleteFrames(gd: string|HTMLDivElement, frameList: number[]): Promise<plotly.PlotlyDiv>;\n    \n    /**\n     * Purge a graph container div back to its initial pre-Plotly.plot state\n     *\n     * @param {string id or DOM element} gd\n     *    the id or DOM element of the graph container div\n     */\n    purge(gd: string|HTMLDivElement): void;\n    \n    /**\n     * Create a plot image\n     *\n     * @param {string id or DOM element} gd\n     *    the id or DOM element of the graph container div\n     *\n     * @param opts\n     *    Image export options\n     *\n     * @param opts.format\n     *    Image export format (png, jpeg, webp, or svg)\n     *\n     * @param opts.width\n     *    Image width in pixels\n     *\n     * @param opts.height\n     *    Image height in pixels\n     *\n     * @param opts.setBackground\n     *    Sets the image background mode. By default, the image background is determined by `layout.paper_bgcolor`, the *transparent* mode.\n     *    One might consider setting `setBackground` to *opaque* when exporting a *jpeg* image as JPEGs do not support opacity.'\n     *\n     * @param opts.imageDataOnly\n     *    Determines whether or not the return value is prefixed by the image format's corresponding 'data:image;' spec.\n     */\n    toImage(gd: string|HTMLDivElement, opts: { format: \"png\"|\"jpeg\"|\"webp\"|\"svg\", width: number, height: number, setBackground?: boolean|string, imageDataOnly?: boolean }): void;\n    \n    /**\n     * Download plot image\n     *\n     * @param {string id or DOM element} gd\n     *    the id or DOM element of the graph container div\n     *\n     * @param opts\n     *    Image export options\n     *\n     * @param opts.format\n     *    Image export format (png, jpeg, webp, or svg)\n     *\n     * @param opts.width\n     *    Image width in pixels\n     *\n     * @param opts.height\n     *    Image height in pixels\n     *\n     * @param opts.filename\n     *    File name for the image\n     *\n     * @param opts.setBackground\n     *    Sets the image background mode. By default, the image background is determined by `layout.paper_bgcolor`, the *transparent* mode.\n     *    One might consider setting `setBackground` to *opaque* when exporting a *jpeg* image as JPEGs do not support opacity.'\n     *\n     * @param opts.imageDataOnly\n     *    Determines whether or not the return value is prefixed by the image format's corresponding 'data:image;' spec.\n     */\n    downloadImage(gd: string|HTMLDivElement, opts: { format: \"png\"|\"jpeg\"|\"webp\"|\"svg\", width: number, height: number, filename: string, setBackground?: boolean|string, imageDataOnly?: boolean }): void;\n    \n    /**\n     * D3 object\n     */\n    d3: any;\n    \n    /**\n     * Underlying plot-related functions not exposed via Plotly object for various reasons.\n     */\n    Plots: {\n      /**\n       * Trigger resize of the Plotly chart div.\n       *\n       * @param {string id or DOM element} gd\n       *    the id or DOM element of the graph container div\n       */\n      resize(gd: string|HTMLDivElement): Promise<plotly.PlotlyDiv>;\n      \n      /**\n       * JSONify the graph data and layout\n       *\n       * This function needs to recurse because some src can be inside\n       * sub-objects.\n       *\n       * It also strips out functions and private (starts with _) elements.\n       * Therefore, we can add temporary things to data and layout that don't\n       * get saved.\n       *\n       * @param gd The graphDiv\n       * @param {Boolean} dataonly If true, don't return layout.\n       * @param {'keepref'|'keepdata'|'keepall'} [mode='keepref'] Filter what's kept\n       *      keepref: remove data for which there's a src present\n       *          eg if there's xsrc present (and xsrc is well-formed,\n       *          ie has : and some chars before it), strip out x\n       *      keepdata: remove all src tags, don't remove the data itself\n       *      keepall: keep data and src\n       * @param {String} output If you specify 'object', the result will not be stringified\n       * @param {Boolean} useDefaults If truthy, use _fullLayout and _fullData\n       * @returns {Object|String}\n       */\n      graphJson(gd: string|HTMLDivElement, dataonly?: boolean, mode?: 'keepref'|'keepdata'|'keepall', output?: string, useDefaults?: boolean ): string|any;\n    };\n    \n    /**\n     * Plotly mode icons\n     */\n    Icons: {\n      [key: string]: {\n        ascent: number,\n        descent: number,\n        path: string,\n        width: number\n      }\n    };\n    \n  }\n}\ndeclare var Plotly: plotly.Plotly;\n        ","trim",[]);
  }
  gSobject['TsdTemplates0'] = function(it) {
    gSobject.typeUtils = TypeUtils();
    return this;
  }
  if (arguments.length==0) {gSobject.TsdTemplates0(); }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
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
function SchemaParser() {
  var gSobject = gs.init('SchemaParser');
  gSobject.clazz = { name: 'SchemaParser', simpleName: 'SchemaParser'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.schema = null;
  gSobject.valObjects = gs.map();
  gSobject.layout = gs.map();
  gSobject.traces = gs.map();
  gSobject.traceTypes = gs.list([]);
  gSobject.valTypes = gs.list([]);
  gSobject.editTypes = gs.map().add("traces",gs.list([])).add("layout",gs.list([]));
  gSobject.roles = gs.list([]);
  gSobject.standardKeys = gs.list([]);
  gSobject.debug = false;
  gSobject['parseSchema'] = function(it) {
    gs.println("Parsing value objects...");
    gs.mc(gSobject,"parseValObjects",[]);
    gs.println("Parsing reference lists...");
    gs.mc(gSobject,"buildReferenceLists",[]);
    gs.println("Parsing layout attributes...");
    gs.mc(gSobject,"parseLayout",[]);
    gs.println("Parsing trace attributes...");
    return gs.mc(gSobject,"parseTraces",[]);
  }
  gSobject['parseValObjects'] = function(it) {
    return gs.mc(gs.gp(gs.gp(gSobject.schema,"defs"),"valObjects"),"each",[function(key, value) {
      return (gSobject.valObjects[key]) = ValObject(gs.map().add("description",gs.gp(value,"description")).add("otherOpts",gs.gp(value,"otherOpts")).add("requiredOpts",gs.gp(value,"requiredOpts")));
    }]);
  }
  gSobject['parseLayout'] = function(it) {
    var layoutConfigObjects = gs.map();
    gs.mc(gSobject,"parseAttributes",[gs.gp(gs.gp(gSobject.schema,"layout"),"layoutAttributes"), layoutConfigObjects, "layout"]);
    return gSobject.layout = layoutConfigObjects;
  }
  gSobject['parseTraces'] = function(it) {
    return gs.mc(gs.gp(gSobject.schema,"traces"),"each",[function(traceKey, traceConfig) {
      var thisTraceConfigObjects = gs.map().add("attributes",gs.map()).add("meta",gs.gp(traceConfig,"meta"));
      gs.mc(gSobject,"parseAttributes",[gs.gp(traceConfig,"attributes"), gs.gp(thisTraceConfigObjects,"attributes"), traceKey]);
      return (gSobject.traces[traceKey]) = thisTraceConfigObjects;
    }]);
  }
  gSobject['mapToList'] = function(val) {
    var l = gs.list([]);
    gs.mc(l,"add",[val]);
    return l;
  }
  gSobject['parseAttributes'] = function(attributes, configObjects, parentKey) {
    return gs.mc(attributes,"each",[function(attName, attConfig) {
      gSobject.debug = false;
      if (gs.equals(attName, "xyz")) {
        gs.println("Debugging " + (parentKey) + "." + (attName) + "");
        gSobject.debug = true;
      };
      if ((((((gs.bool(gSobject.debug)) && (gs.instanceOf(attConfig, "Map"))) && (gs.equals((attConfig["role"]), "object"))) && (gs.instanceOf((attConfig["items"]), "Map"))) && (gs.equals(gs.mc(attConfig,"size",[]), 2))) && (gs.equals(gs.mc(attConfig["items"],"size",[]), 1))) {
        gs.println("" + (attName) + " (parent is " + (parentKey) + ") is an object with an items map (with one key) and AttConfig.size of " + (gs.mc(attConfig,"size",[])) + "");
      };
      if (!gs.bool(gs.instanceOf(attConfig, "Map"))) {
        if (gs.bool(gSobject.debug)) {
          gs.println("" + (parentKey) + ": setting non-map attribute: " + (attName) + "");
        };
        return (configObjects[attName]) = attConfig;
      } else {
        if (((attName != "_deprecated") && (attConfig["role"])) && ((attConfig["role"]) != "object")) {
          try {
            var isItemsMap = false;
            if (gs.instanceOf(gs.gp(attConfig,"items"), "Map")) {
              isItemsMap = true;
              gs.mc(gs.gp(attConfig,"items"),"keySet",[]);
              gs.sp(attConfig,"items",gs.mc(gSobject,"mapToList",[gs.gp(attConfig,"items")]));
            };
            if (gs.bool(gSobject.debug)) {
              gs.println("building AttributeConfig for: " + (parentKey) + "." + (attName) + "");
            };
            (configObjects[attName]) = AttributeConfig(attConfig);
            gs.sp((configObjects[attName]),"name",attName);
            gs.sp((configObjects[attName]),"parent",parentKey);
          }
          catch (e) {
            gs.println(" ");
            gs.println("error parsing: " + (parentKey) + "." + (attName) + "");
            if (gs.bool(gSobject.debug)) {
              gs.println(" ");
            };
            gs.println(attConfig);
            gs.println(" ");
            gs.println(gs.fs('e', this));
            gs.println(" ");
          }
          ;
        } else {
          if (attName != "_deprecated") {
            if (gs.bool(gSobject.debug)) {
              gs.println("" + (parentKey) + "." + (attName) + " is a nested object");
            };
            (configObjects[attName]) = gs.map();
            return gs.mc(gSobject,"parseAttributes",[attConfig, configObjects[attName], attName]);
          };
        };
      };
    }]);
  }
  gSobject['buildReferenceLists'] = function(it) {
    gs.mc(gs.gp(gs.gp(gSobject.schema,"layout"),"layoutAttributes"),"each",[function(key, value) {
      if (gs.equals(key, "editType")) {
        return gs.mc(gs.gp(gSobject.editTypes,"layout"),'leftShift', gs.list([value]));
      } else {
        if ((!gs.bool(gs.instanceOf(value, "Map"))) || (!gs.bool(value["role"]))) {
          return gs.println("Value for layout key " + (key) + " has no role: " + (value) + "");
        } else {
          if ((gs.gp(value,"role") != "object") && (!gs.bool(gs.mc(gSobject.roles,"contains",[gs.gp(value,"role")])))) {
            gs.mc(gSobject.roles,'leftShift', gs.list([gs.gp(value,"role")]));
          };
          if (!gs.bool(gs.mc(gSobject.valTypes,"contains",[gs.gp(value,"valType")]))) {
            return gs.mc(gSobject.valTypes,'leftShift', gs.list([gs.gp(value,"valType")]));
          };
        };
      };
    }]);
    return gs.mc(gs.gp(gSobject.schema,"traces"),"each",[function(traceName, traceConfig) {
      return gs.mc(gs.gp(traceConfig,"attributes"),"each",[function(key, value) {
        if ((gs.equals(key, "editType")) && (!gs.bool(gs.mc(gs.gp(gSobject.editTypes,"traces"),"contains",[value])))) {
          return gs.mc(gs.gp(gSobject.editTypes,"traces"),'leftShift', gs.list([value]));
        } else {
          if ((gs.equals(key, "type")) && (!gs.bool(gs.mc(gSobject.traceTypes,"contains",[value])))) {
            return gs.mc(gSobject.traceTypes,'leftShift', gs.list([value]));
          } else {
            if ((!gs.bool(gs.instanceOf(value, "Map"))) || (!gs.bool(value["role"]))) {
              if (gs.bool(gSobject.debug)) {
                return gs.println("Value for " + (traceName) + " key " + (key) + " has no role: " + (value) + "");
              };
            } else {
              if ((gs.gp(value,"role") != "object") && (!gs.bool(gs.mc(gSobject.roles,"contains",[gs.gp(value,"role")])))) {
                gs.mc(gSobject.roles,'leftShift', gs.list([gs.gp(value,"role")]));
                gs.mc(value,"each",[function(key2, value2) {
                  if (!gs.bool(gs.mc(gSobject.standardKeys,"contains",[key2]))) {
                    return gs.mc(gSobject.standardKeys,'leftShift', gs.list([key2]));
                  };
                }]);
              };
              if (!gs.bool(gs.mc(gSobject.valTypes,"contains",[gs.gp(value,"valType")]))) {
                return gs.mc(gSobject.valTypes,'leftShift', gs.list([gs.gp(value,"valType")]));
              };
            };
          };
        };
      }]);
    }]);
  }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
function ValObject() {
  var gSobject = gs.init('ValObject');
  gSobject.clazz = { name: 'ValObject', simpleName: 'ValObject'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.description = null;
  gSobject.otherOpts = null;
  gSobject.requiredOpts = null;
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
function TsdWriter() {
  var gSobject = gs.init('TsdWriter');
  gSobject.clazz = { name: 'TsdWriter', simpleName: 'TsdWriter'};
  gSobject.clazz.superclass = { name: 'java.lang.Object', simpleName: 'Object'};
  gSobject.config = null;
  gSobject.definitionFile = null;
  gSobject.tsdTemplates = null;
  gSobject.schemaParser = null;
  gSobject.typeUtils = null;
  gSobject.mergedAxis = null;
  gSobject.currentStep = null;
  gSobject.events = null;
  gSobject['writeTsd'] = function(it) {
    gs.mc(gSobject,"init",[]);
    gs.println(" ");
    gs.println("Writing TSD to: " + (gs.gp(gSobject.definitionFile,"canonicalPath")) + "");
    gs.println(" ");
    gs.mc(gSobject,"writeTsdHeader",[]);
    gs.mc(gSobject,"writeEventHelperComments",[]);
    gs.mc(gSobject,"writePlotlyDiv",[]);
    gs.mc(gSobject,"writePlotlyEvents",[]);
    gs.mc(gSobject,"writeLayout",[]);
    gs.mc(gSobject,"writeTraces",[]);
    gs.mc(gSobject,"writePlotlyObject",[]);
    return gs.mc(gSobject,"writeTsdFooter",[]);
  }
  gSobject['init'] = function(it) {
    gSobject.typeUtils = TypeUtils();
    gSobject.tsdTemplates = TsdTemplates();
    gSobject.definitionFile = '';
    return gs.mc(gSobject.definitionFile,"delete",[]);
  }
  gSobject['writeTsdHeader'] = function(it) {
    gSobject.currentStep = "header";
    gs.mc(gSobject,"writeToDefinition",["// Generated from Plotly.js", 0]);
    gs.mc(gSobject,"writeToDefinition",["", 0]);
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"tsdHeader",[]), 0]);
    return gs.mc(gSobject,"writeToDefinition",["", 0]);
  }
  gSobject['writeEventHelperComments'] = function(it) {
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"tsdEventHelperComments",[gSobject.events]), 0]);
    return gs.mc(gSobject,"writeToDefinition",["", 0]);
  }
  gSobject['writeTsdFooter'] = function(it) {
    gSobject.currentStep = "footer";
    return gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"tsdFooter",[]), 0]);
  }
  gSobject['writePlotlyDiv'] = function(it) {
    gSobject.currentStep = "plotlyDiv";
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"plotlyDiv",[]), 0]);
    return gs.mc(gSobject,"writeToDefinition",["", 0]);
  }
  gSobject['writePlotlyEvents'] = function(it) {
    gSobject.currentStep = "plotlyEvents";
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"plotlyEvents",[]), 0]);
    return gs.mc(gSobject,"writeToDefinition",["", 0]);
  }
  gSobject['writePlotlyObject'] = function(it) {
    gSobject.currentStep = "plotlyObject";
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"plotlyObj",[]), 0]);
    return gs.mc(gSobject,"writeToDefinition",["", 0]);
  }
  gSobject['writeLayout'] = function(it) {
    gSobject.currentStep = "layout";
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"moduleStart",["plotly.layout"]), 0]);
    var bargap = AttributeConfig(gs.map().add("name","bargap").add("valType","number").add("min",0).add("max",1).add("role","style").add("editType","calc").add("description","Sets the gap (in plot fraction) between bars of adjacent location coordinates."));
    (gs.gp(gSobject.schemaParser,"layout")["bargap"]) = bargap;
    var layoutContent = gs.mc(gSobject,"buildAttributeMapContent",[gs.gp(gSobject.schemaParser,"layout"), 2]);
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject,"buildAxisContent",[]), 1]);
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"interfaceStart",["Layout"]), 1]);
    gs.mc(gSobject,"writeToDefinition",[layoutContent, 0]);
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"interfaceEnd",[]), 1]);
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"moduleEnd",[]), 0]);
    return gs.mc(gSobject,"writeToDefinition",["", 0]);
  }
  gSobject['writeTraces'] = function(it) {
    gSobject.currentStep = "traces";
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"moduleStart",["plotly.traces"]), 0]);
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"baseTrace",[]), 1]);
    gs.mc(gSobject,"writeToDefinition",["", 1]);
    gs.mc(gs.gp(gSobject.schemaParser,"traces"),"each",[function(traceKey, traceConfig) {
      gs.mc(gSobject,"writeToDefinition",["/**", 1]);
      if ((gs.bool(gs.gp(traceConfig,"meta"))) && (gs.bool(gs.gp(gs.gp(traceConfig,"meta"),"description")))) {
        gs.mc(gSobject,"writeToDefinition",[" * " + (traceKey) + ": " + (gs.gp(gs.gp(traceConfig,"meta"),"description")) + "", 1]);
      } else {
        gs.mc(gSobject,"writeToDefinition",[" * " + (traceKey) + "", 1]);
      };
      gs.mc(gSobject,"writeToDefinition",[" */", 1]);
      gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"interfaceStart",["" + (gs.mc(gSobject.typeUtils,"getTraceName",[traceKey])) + "", "BaseTrace"]), 1]);
      gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject,"buildAttributeMapContent",[gs.gp(traceConfig,"attributes"), 2]), 0]);
      return gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"interfaceEnd",[]), 1]);
    }]);
    gs.mc(gSobject,"writeToDefinition",[gs.mc(gSobject.tsdTemplates,"moduleEnd",[]), 0]);
    return gs.mc(gSobject,"writeToDefinition",["", 0]);
  }
  gSobject['buildAxisContent'] = function(it) {
    gSobject.currentStep = "axis";
    gSobject.mergedAxis = gs.mc(gSobject.mergedAxis,"sort",[]);
    var result = gs.mc(gSobject.tsdTemplates,"interfaceStart",["PlotlyAxis"]);
    result += gs.mc(gSobject,"buildAttributeMapContent",[gSobject.mergedAxis, 2]);
    result += gs.mc(gSobject.tsdTemplates,"interfaceEnd",[]);
    return result;
  }
  gSobject['buildAttributeMapContent'] = function(attributes, depth) {
    var content = "";
    gs.mc(attributes,"each",[function(attName, attConfig) {
      if (gs.instanceOf(attConfig, "AttributeConfig")) {
        return content += gs.mc(gSobject,"buildAttributeContent",[attName, attConfig, depth]);
      } else {
        if (gs.instanceOf(attConfig, "Map")) {
          return content += gs.mc(gSobject,"buildNestedObjectContent",[attName, attConfig, depth]);
        } else {
        };
      };
    }]);
    return content;
  }
  gSobject['buildAttributeContent'] = function(attName, attConfig, depth) {
    var content = "";
    var terminator = (depth > 2 ? "," : ";");
    content = gs.mc(gSobject,"appendLine",["/**", depth, content]);
    if (gs.bool(gs.gp(attConfig,"description"))) {
      content = gs.mc(gSobject,"appendLine",[" * " + (gs.gp(attConfig,"description")) + "", depth, content]);
    };
    if (gs.bool(gs.gp(attConfig,"dflt"))) {
      content = gs.mc(gSobject,"appendLine",[" * @default: " + (gs.mc(gSobject.typeUtils,"quoteIfString",[gs.gp(attConfig,"dflt")])) + "", depth, content]);
    };
    var tsType = gs.mc(gSobject.typeUtils,"getTSType",[attConfig]);
    var typeString = " * Plotly @type: " + (gs.gp(attConfig,"valType")) + "";
    if (gs.bool(gs.gp(attConfig,"itemTypes"))) {
      typeString += " (" + (gs.gp(attConfig,"itemTypes")) + ")";
    };
    content = gs.mc(gSobject,"appendLine",[typeString, depth, content]);
    content = gs.mc(gSobject,"appendLine",[" */", depth, content]);
    content = gs.mc(gSobject,"appendLine",["" + (attName) + "?: " + (tsType) + "" + (terminator) + "", depth, content]);
    return content;
  }
  gSobject['buildNestedObjectContent'] = function(attName, attributes, depth) {
    var content = "";
    var terminator = (depth > 2 ? "," : ";");
    var isAxis = false;
    if (gs.mc(gs.list(["xaxis" , "yaxis" , "zaxis"]),"contains",[attName])) {
      isAxis = true;
      if (gs.equals(gSobject.mergedAxis, null)) {
        gSobject.mergedAxis = attributes;
      } else {
        gSobject.mergedAxis = (gs.plus(gSobject.mergedAxis, attributes));
      };
    };
    if (gs.bool(gs.gp(attributes,"description"))) {
      content = gs.mc(gSobject,"appendLine",["/**", depth, content]);
      content = gs.mc(gSobject,"appendLine",[" * " + (gs.mc(gs.gp(attributes,"description"),"replace",["*/*", "/"])) + "", depth, content]);
      content = gs.mc(gSobject,"appendLine",[" */", depth, content]);
    };
    if (gs.bool(isAxis)) {
      content = gs.mc(gSobject,"appendLine",["" + (attName) + "?: PlotlyAxis" + (terminator) + "", depth, content]);
      if (gs.equals(depth, 2)) {
        content = gs.mc(gSobject,"appendLine",["" + (attName) + "2?: PlotlyAxis" + (terminator) + "", depth, content]);
        content = gs.mc(gSobject,"appendLine",["" + (attName) + "3?: PlotlyAxis" + (terminator) + "", depth, content]);
        content = gs.mc(gSobject,"appendLine",["" + (attName) + "4?: PlotlyAxis" + (terminator) + "", depth, content]);
      };
    } else {
      if ((((gs.equals((attributes["role"]), "object")) && (gs.instanceOf((attributes["items"]), "Map"))) && (gs.equals(gs.mc(attributes,"size",[]), 2))) && (gs.equals(gs.mc(attributes["items"],"size",[]), 1))) {
        content = gs.mc(gSobject,"appendLine",["" + (attName) + "?: {", depth, content]);
        content += gs.mc(gSobject,"buildAttributeMapContent",[gs.mc(gs.mc(attributes["items"],"values",[]),"first",[]), gs.plus(depth, 1)]);
        content = gs.mc(gSobject,"appendLine",["}[]" + (terminator) + "", depth, content]);
      } else {
        content = gs.mc(gSobject,"appendLine",["" + (attName) + "?: {", depth, content]);
        content += gs.mc(gSobject,"buildAttributeMapContent",[attributes, gs.plus(depth, 1)]);
        content = gs.mc(gSobject,"appendLine",["}" + (terminator) + "", depth, content]);
      };
    };
    return content;
  }
  gSobject['writeToDefinition'] = function(value, depth) {
    if (depth === undefined) depth = 0;
    return gs.mc(gSobject.definitionFile,"withWriterAppend",["UTF-8", function(writer) {
      return gs.mc(writer,'leftShift', gs.list([(gs.plus((gs.plus((gs.multiply("  ", depth)), value)), "\n"))]));
    }]);
  }
  gSobject['appendLine'] = function(newText, depth, originalText) {
    return gs.plus((gs.plus((gs.plus(originalText, (gs.multiply("  ", depth)))), newText)), "\n");
  }
  gSobject['formatCommentText'] = function(comment) {
    var result = "";
    if (gs.bool(comment)) {
      result += gs.mc(gs.mc(comment,"replaceAll",["<(.|\n)*?>", ""]),"replaceAll",["[\n\t]", " "]);
    };
    return result;
  }
  if (arguments.length == 1) {gs.passMapToObject(arguments[0],gSobject);};
  
  return gSobject;
};
