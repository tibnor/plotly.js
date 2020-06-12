class TsdTemplates {

    TypeUtils typeUtils

    TsdTemplates() {
        typeUtils = new TypeUtils()
    }

    def moduleStart( moduleName ) {
        return "declare module ${ moduleName } {"
    }

    def moduleEnd() {
        return "}"
    }

    def interfaceStart( interfaceName, extendsFrom=null ) {
        def result = "export interface ${ interfaceName }"
        if( extendsFrom ) result += " extends ${ extendsFrom }"
        return "${ result } {"
    }

    def interfaceEnd() {
        return "}"
    }
    
    def tsdHeader() {
        return """
/* tslint:disable:max-line-length */
/* tslint:disable:member-ordering */
        """.trim()
    }
    
    def tsdFooter() {
        return """
/* tslint:enable */
        """.trim()
    }
    
    def tsdEventHelperComments( Map events ) {
        def dataEventContent = ""
        events.dataEvents.each { thisEvent ->
            dataEventContent += "  static ${ thisEvent } = \"${ thisEvent }\";" + "\n"
        }
        
        def updateEventContent = ""
        events.updateEvents.each { thisEvent ->
            updateEventContent += "  static ${ thisEvent } = \"${ thisEvent }\";" + "\n"
        }
        
        def otherEventContent = ""
        events.otherEvents.each { thisEvent ->
            otherEventContent += "  static ${ thisEvent } = \"${ thisEvent }\";" + "\n"
        }
        
        return """
/*
 The classes below contain all event types found in the plotly.js source code.
 You can manually copy these into a file in your source tree (e.g.: plotly-events.model.ts) if you'd like to
 be able to look up event names via static properties (e.g.: PlotlyDataEvents.plotly_click) instead of remembering the event name strings.

// Plotly events that typically handle event data of type {CartesianEventPoint}.
export class PlotlyDataEvents {
${ dataEventContent }
}

// Plotly update events.
// Event data includes an array containing an object of updated attributes and an array of the trace numbers that were updated.
export class PlotlyUpdateEvents {
${ updateEventContent }
}

// Other Plotly events that either have no event data, or have custom event data (see Plotly docs or source code).
export class PlotlySimpleEvents {
${ otherEventContent }
}
 */
        """.trim()
    }

    def plotlyDiv() {
        return """
declare module plotly {
  /**
   * An HTML div element with additional properties added by Plotly.
   */
  export interface PlotlyDiv extends HTMLDivElement {
    data?: plotly.traces.BaseTrace[];
    
    /** User-defined layout config */
    layout?: plotly.layout.Layout;
    
    /** Full layout config (including user-defined config) */
    _fullLayout?: plotly.layout.Layout;
    
    /** Context seems to map to additionalConfig */
    _context?: any;

    emit?( event: any, data: any ): void;
    
    /**
     * To get full type checking on the event, you need to specify a type like this. It's overly verbose, but it's the only way to ensure
     * that all the generic types within the event can be determined:
     *
     * type eventType = plotly.event.DataEventData<plotly.event.CartesianEventPoint<plotly.traces.ScatterGL>, plotly.traces.ScatterGL>;
     * plotElement.on( PlotlyDataEvents.plotly_selected, ( eventData: eventType ) => {
     *   // Your code
     * });
     *
     * @param event {string} Event name
     * @param fn {( eventData: any ) => void} For event data type checking, specify data type and generics like:
     * plotly.event.DataEventData&lt;plotly.event.CartesianEventPoint&lt;plotly.traces.ScatterGL&gt;, plotly.traces.ScatterGL&gt;
     */
    on?( event: string, fn: ( eventData: any ) => void ): void;
  }
}
        """.trim()
    }

    def plotlyEvents() {
        return """
declare module plotly.event {
  
  export type PlotlyRestyleEventData = [
    /** Object of updated attributes */
    any,
    /** Array of the trace numbers that were updated */
    number[]
  ];
  
  interface PlotlyRelayoutEventData {}

  interface PlotlyCartesianRelayoutEventData extends PlotlyRelayoutEventData {
    xaxis: {
      range: [number, number],
      autorange: boolean
    };
    yaxis: {
      range: [number, number],
      autorange: boolean
    };
  }

  interface Plotly3DRelayoutEventData extends PlotlyRelayoutEventData {
    scene: {
      center: {x: number, y: number, z: number },
      eye: {x: number, y: number, z: number },
      up: {x: number, y: number, z: number }
    };
  }

  interface BaseDataEventPoint<T extends plotly.traces.BaseTrace> {
    /** index in data of the trace associated with the selected point */
    curveNumber: number;
    
    /** index of the selected point */
    pointNumber: number;
    
    /** ref to the trace as sent to Plotly.plot associated with the selected point */
    data: T;
    
    /** ref to the trace including all of the default attributes */
    fullData: T;
    
    /** ref to associated custom data object */
    customdata?: any;
  }

  interface CartesianEventPoint<T extends plotly.traces.BaseTrace> extends BaseDataEventPoint<T> {
    
    /** x value */
    x: number;
    
    /** y value */
    y: number;
    
    /** ref to x-axis object (i.e layout.xaxis) associated with the selected point */
    xaxis: plotly.layout.PlotlyAxis;
    
    /** ref to y-axis object */
    yaxis: plotly.layout.PlotlyAxis;
  }

  interface ThreeDEventPoint<T extends plotly.traces.BaseTrace> extends BaseDataEventPoint<T> {
    
    /** x value */
    x: number;
    
    /** y value */
    y: number;
    
    /** z value */
    z: number;
    
    /** ref to x-axis object (i.e layout.xaxis) associated with the selected point */
    xaxis: plotly.layout.PlotlyAxis;
    
    /** ref to y-axis object */
    yaxis: plotly.layout.PlotlyAxis;
    
    /** ref to z-axis object */
    zaxis: plotly.layout.PlotlyAxis;
  }

  interface MapEventPoint<T extends plotly.traces.BaseTrace> extends BaseDataEventPoint<T> {
    
    /** lat value */
    lat: number;
    
    /** lon value */
    lon: number;
    
    location: any;  
  }
  
  interface PlotlyEventData {
    /** Actual type may vary, but is typically MouseEvent */
    event?: Event;
  }
  
  interface DataEventData<E extends BaseDataEventPoint<T>, T> extends PlotlyEventData {
    /** Array of CartesianEventPoint, ThreeDEventPoint, or MapEventPoint */
    points: E[];
  }
}
        """.trim()
    }

    def baseTrace() {
        return """
  interface BaseTrace {
    type?: ${ typeUtils.traceNamesTSLiteral };
  }
        """.trim()
    }

    def plotlyObj() {
        // from: https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_api.js

        return """
declare module plotly {

  export type ReturnStringFunction = ( plotElement: PlotlyDiv ) => string;

  export interface PlotlyModeBarButton {
    // See Plotly /components/modebar/buttons.js for configs of built-in buttons.

    /**
     * name / id of the buttons (for tracking)
     */
    name?: string;

    /**
     * Text that appears while hovering over the button, enter null, false or '' for no hover text
     */
    title?: string | ReturnStringFunction;

    /**
     * SVG path associated with the button. Can be linked to Plotly.Icons to use the default plotly icons
     */
    icon?: { ascent?: number, descent?: number, path?: string, width?: number };

    /**
     * Icon positioning. No idea what this does. Plotly only sets this to "ne".
     */
    gravity?: string;

    /**
     * Click handler associated with the button
     * @param gd The main graph object
     * @param event
     */
    click?: ( gd?: any, event?: any ) => void;

    /**
     * Attribute associated with button, use this with 'val' to keep track of the state
     */
    attr?: string;

    /**
     * Initial 'attr' value, can be a function of gd
     */
    val?: string | ReturnStringFunction;

    /**
     * Is the button a toggle button?
     */
    toggle?: boolean;
  }
  
  /**
   * Plot config options
   */
  export interface PlotConfig {
    staticPlot?: boolean;
    editable?: boolean;
    edits?: {
      annotationPosition?: boolean,
      annotationTail?: boolean,
      annotationText?: boolean,
      axisTitleText?: boolean,
      colorbarPosition?: boolean,
      colorbarTitleText?: boolean,
      legendPosition?: boolean,
      legendText?: boolean,
      shapePosition?: boolean,
      titleText?: boolean
    };
    /**
     * Do autosize once regardless of layout.autosize
     */
    autosizable?: boolean;
    /**
     * Set the length of the undo/redo queue
     */
    queueLength?: number;
    /**
     * If we do autosize, do we fill the container or the screen?
     */
    fillFrame?: boolean;
    /**
     * If we do autosize, set the frame margins in percents of plot size
     */
    frameMargins?: boolean;
    /**
     * Mousewheel or two-finger scroll zooms the plot
     */
    scrollZoom?: boolean;
    /**
     * Double click interaction (false, 'reset', 'autosize' or 'reset+autosize')
     */
    doubleClick?: false|'reset'|'autosize'|'reset+autosize';
    /**
     * New users see some hints about interactivity
     */
    showTips?: boolean;
    /**
     * Enable axis pan/zoom drag handles
     */
    showAxisDragHandles?: boolean;
    /**
     * Enable direct range entry at the pan/zoom drag points. drag handles must be enabled
     */
    showAxisRangeEntryBoxes?: boolean;
    /**
     * Link to open this plot in plotly
     */
    showLink?: boolean;
    /**
     * If we show a link, does it contain data or just link to a plotly file?
     */
    sendData?: boolean;
    /**
     * Text appearing in the sendData link
     */
    linkText?: string;
    /**
     * false or function adding source(s) to linkText
     */
    showSources?: boolean;
    /**
     * Display the mode bar (true, false, or 'hover')
     */
    displayModeBar?: boolean|'hover';
    /**
     * Remove mode bar button by name
     */
    modeBarButtonsToRemove?: string[];
    /**
     * Add mode bar button using config objects
     */
    modeBarButtonsToAdd?: plotly.PlotlyModeBarButton[];
    /**
     * Fully custom mode bar buttons as nested array, where the outer arrays represents button groups, 
     * and the inner arrays have buttons config objects or names of default buttons
     */
    modeBarButtons?: Array<(string|plotly.PlotlyModeBarButton)[]>;
    displaylogo?: boolean;
    /**
     * Increase the pixel ratio for Gl plot images
     */
    plotGlPixelRatio?: number;
    /**
     * Background setting function
     * 'transparent' sets the background `layout.paper_color`
     * 'opaque' blends bg color with white ensuring an opaque background
     */
    setBackground?: 'transparent'|'opaque';
    /**
     * URL to topojson files used in geo charts
     */
    topojsonURL?: string;
    /**
     * Mapbox access token (required to plot mapbox trace types). Set this option to ''
     * to prevent plotly.js from authenticating to the public Mapbox server.
     */
    mapboxAccessToken?: string;
    /**
     * Turn all console logging on or off (errors will be thrown)
     * This should ONLY be set via Plotly.setPlotConfig
     * 0: no logs
     * 1: warnings and errors, but not informational messages
     * 2: verbose logs
     */
    logging?: 0|1|2;
    /**
     * Set global transform to be applied to all traces with no specification needed
     */
    globalTransforms?: any[];
    /**
     * Should be a string like 'en' or 'en-US'.
     */
    locale?: string;
    /*
     * Localization definitions
     * Locales can be provided either here (specific to one chart) or globally
     * by registering them as modules.
     * Should be an object of objects {locale: {dictionary: {...}, format: {...}}}
     * {
     *     da: {
     *         dictionary: {'Reset axes': 'Nulstil aksler', ...},
     *         format: {months: [...], shortMonths: [...]}
     *     },
     *     ...
     * }
     * All parts are optional. When looking for translation or format fields, we
     * look first for an exact match in a config locale, then in a registered
     * module. If those fail, we strip off any regionalization ('en-US' -> 'en')
     * and try each (config, registry) again. The final fallback for translation
     * is untranslated (which is US English) and for formats is the base English
     * (the only consequence being the last fallback date format %x is DD/MM/YYYY
     * instead of MM/DD/YYYY). Currently `grouping` and `currency` are ignored
     * for our automatic number formatting, but can be used in custom formats.
     */
    locales?: boolean;
  }

  /**
   * Global Plotly object.
   */
  export interface Plotly {
    /**
     * Plotly.react:
     * A plot/update method that takes the full plot state (same API as plot/newPlot)
     * and diffs to determine the minimal update pathway.
     *
     * Diffing is done on fullData and fullLayout, not on data and layout, for a few reasons:
     * 
     * We don't copy data and layout, so there's nothing to diff there if the user modifies them in place. But _full* get regenerated as 
     * new objects with every supplyDefaults call (which must happen on every update regardless).
     * No need to worry about the data types we're diffing, as supplyDefaults cleans that up. Also we won't diff user attributes that 
     * don't go into the plot, or irrelevant leftovers of old plot types.
     * 
     * We do NOT dive into data arrays (valType: 'data_array' or arrayOk: true) in the diffing algorithm. There are two ways to tell 
     * Plotly.react that the data have changed:
     * 
     * layout.datarevision: can take any value - string, number, whatever - and if it is not === its previous value, we treat the data 
     * as changed. Data arrays themselves are ignored during diffing. Note that right now there's no difference in the pathway we'd take 
     * for one vs all data arrays changing, but in the future if we implement partial recalc we can make a similar flag for each array, 
     * or perhaps each trace.
     * 
     * If you omit datarevision, we assume data arrays are being used as immutable and compare them with === to determine if anything 
     * changed. This has some known issues (resulting in slow recalc when it wouldn't be needed) that we should fix:
     * At least one trace type (surface) fills in index arrays for missing dimensions. These are never === each other. We should provide 
     * these later in the pipeline, not attached to _fullData, or fill them in as _private attributes which do not get diffed.
     * At least one trace type (scatter) will slice uneven arrays to the same length, which will also make them compare unequal. 
     * We should just record a private _length or something instead.
     *
     * @param {string id or DOM element} gd
     *      the id or DOM element of the graph container div
     * @param {array of objects} data
     *      array of traces, containing the data and display information for each trace
     * @param {object} layout
     *      object describing the overall display of the plot,
     *      all the stuff that doesn't pertain to any individual trace
     * @param {object} config
     *      configuration options (see ./plot_config.js for more info)
     *
     * OR
     *
     * @param {string id or DOM element} gd
     *      the id or DOM element of the graph container div
     * @param {object} figure
     *      object containing `data`, `layout`, `config`, and `frames` members
     *
     */
    react(gd: string|HTMLDivElement, data?: plotly.traces.BaseTrace[], layout?: plotly.layout.Layout, config?: plotly.PlotConfig): Promise<plotly.PlotlyDiv>;
  
    /**
     * Main plot-creation function
     *
     * @param {string id or DOM element} gd
     *    the id or DOM element of the graph container div
     * @param {array of objects} data
     *    array of traces, containing the data and display information for each trace
     * @param {object} layout
     *    object describing the overall display of the plot,
     *    all the stuff that doesn't pertain to any individual trace
     * @param {object} config
     *    configuration options (see ./plot_config.js for more info)
     *
     */
    plot(gd: string|HTMLDivElement, data: plotly.traces.BaseTrace[], layout?: plotly.layout.Layout, config?: plotly.PlotConfig): Promise<plotly.PlotlyDiv>;
    
    /**
     * Convenience function to force a full redraw.
     */
    redraw(gd: string|HTMLDivElement): Promise<plotly.PlotlyDiv>;
    
    /**
     * Convenience function to make idempotent plot option obvious to users.
     *
     * @param {string id or DOM element} gd
     *    the id or DOM element of the graph container div
     * @param {array of objects} data
     *    array of traces, containing the data and display information for each trace
     * @param {object} layout
     *    object describing the overall display of the plot,
     *    all the stuff that doesn't pertain to any individual trace
     * @param {object} config
     *    configuration options (see ./plot_config.js for more info)
     *
     */
    newPlot(gd: string|HTMLDivElement, data: plotly.traces.BaseTrace[], layout?: plotly.layout.Layout, config?: plotly.PlotConfig): Promise<plotly.PlotlyDiv>;
    
    /**
     * Extend && prepend traces at indices with update arrays, window trace lengths to maxPoints
     *
     * Extend and Prepend have identical APIs. Prepend inserts an array at the head while Extend
     * inserts an array off the tail. Prepend truncates the tail of the array - counting maxPoints
     * from the head, whereas Extend truncates the head of the array, counting backward maxPoints
     * from the tail.
     *
     * If maxPoints is undefined, nonNumeric, negative or greater than extended trace length no
     * truncation / windowing will be performed. If its zero, well the whole trace is truncated.
     *
     * @param {Object|HTMLDivElement} gd The graph div
     * @param {Object} update The key:array map of target attributes to extend
     * @param {Number|Number[]} indices The locations of traces to be extended
     * @param {Number|Object} [maxPoints] Number of points for trace window after lengthening.
     *
     */
    extendTraces(gd: any|HTMLDivElement, update: any, indices: number|number[], maxPoints: number|any): Promise<plotly.PlotlyDiv>;
    
    /**
     * Extend && prepend traces at indices with update arrays, window trace lengths to maxPoints
     *
     * Extend and Prepend have identical APIs. Prepend inserts an array at the head while Extend
     * inserts an array off the tail. Prepend truncates the tail of the array - counting maxPoints
     * from the head, whereas Extend truncates the head of the array, counting backward maxPoints
     * from the tail.
     *
     * If maxPoints is undefined, nonNumeric, negative or greater than extended trace length no
     * truncation / windowing will be performed. If its zero, well the whole trace is truncated.
     *
     * @param {Object|HTMLDivElement} gd The graph div
     * @param {Object} update The key:array map of target attributes to extend
     * @param {Number|Number[]} indices The locations of traces to be extended
     * @param {Number|Object} [maxPoints] Number of points for trace window after lengthening.
     *
     */
    prependTraces(gd: any|HTMLDivElement, update: any, indices: number|number[], maxPoints: number|any): Promise<plotly.PlotlyDiv>;
    
    /**
     * Add data traces to an existing graph div.
     *
     * @param {Object|HTMLDivElement} gd The graph div
     * @param {Object[]} gd.data The array of traces we're adding to
     * @param {Object[]|Object} traces The object or array of objects to add
     * @param {Number[]|Number} [newIndices=[gd.data.length]] Locations to add traces
     *
     */
    addTraces(gd: any|HTMLDivElement, traces: plotly.traces.BaseTrace|plotly.traces.BaseTrace[], newIndices: number|number[]): Promise<plotly.PlotlyDiv>;
    
    /**
     * Delete traces at `indices` from gd.data array.
     *
     * @param {Object|HTMLDivElement} gd The graph div
     * @param {Object[]} gd.data The array of traces we're removing from
     * @param {Number|Number[]} indices The indices
     */
    deleteTraces(gd: any|HTMLDivElement, indices: number|number[]): Promise<plotly.PlotlyDiv>;
    
    /**
     * Move traces at currentIndices array to locations in newIndices array.
     *
     * If newIndices is omitted, currentIndices will be moved to the end. E.g.,
     * these are equivalent:
     *
     * Plotly.moveTraces(gd, [1, 2, 3], [-3, -2, -1])
     * Plotly.moveTraces(gd, [1, 2, 3])
     *
     * @param {Object|HTMLDivElement} gd The graph div
     * @param {Object[]} gd.data The array of traces we're removing from
     * @param {Number|Number[]} currentIndices The locations of traces to be moved
     * @param {Number|Number[]} [newIndices] The locations to move traces to
     *
     * Example calls:
     *
     *    // move trace i to location x
     *    Plotly.moveTraces(gd, i, x)
     *
     *    // move trace i to end of array
     *    Plotly.moveTraces(gd, i)
     *
     *    // move traces i, j, k to end of array (i != j != k)
     *    Plotly.moveTraces(gd, [i, j, k])
     *
     *    // move traces [i, j, k] to [x, y, z] (i != j != k) (x != y != z)
     *    Plotly.moveTraces(gd, [i, j, k], [x, y, z])
     *
     *    // reorder all traces (assume there are 5--a, b, c, d, e)
     *    Plotly.moveTraces(gd, [b, d, e, a, c])  // same as 'move to end'
     */
    moveTraces(gd: any|HTMLDivElement, currentIndices: number|number[], newIndices: number|number[]): Promise<plotly.PlotlyDiv>;
    
    /**
     * restyle: update trace attributes of an existing plot
     *
     * Can be called two ways.
     *
     * Signature 1:
     * @param {String | HTMLDivElement} gd
     *  the id or DOM element of the graph container div
     * @param {String} astr
     *  attribute string (like `'marker.symbol'`) to update
     * @param {*} val
     *  value to give this attribute
     * @param {Number[] | Number} [traces]
     *  integer or array of integers for the traces to alter (all if omitted)
     *
     * Signature 2:
     * @param {String | HTMLDivElement} gd
     *  (as in signature 1)
     * @param {Object} aobj
     *  attribute object `{astr1: val1, astr2: val2 ...}`
     *  allows setting multiple attributes simultaneously
     * @param {Number[] | Number} [traces]
     *  (as in signature 1)
     *
     * `val` (or `val1`, `val2` ... in the object form) can be an array,
     * to apply different values to each trace.
     *
     * If the array is too short, it will wrap around (useful for
     * style files that want to specify cyclical default values).
     */
    restyle(gd: string|HTMLDivElement, val: any, traces?: number|number[]): Promise<plotly.PlotlyDiv>;
    
    /**
     * relayout: update layout attributes of an existing plot
     *
     * Can be called two ways:
     *
     * Signature 1:
     * @param {String | HTMLDivElement} gd
     *  the id or dom element of the graph container div
     * @param {String} astr
     *  attribute string (like `'xaxis.range[0]'`) to update
     * @param {*} val
     *  value to give this attribute
     *
     * Signature 2:
     * @param {String | HTMLDivElement} gd
     *  (as in signature 1)
     * @param {Object} aobj
     *  attribute object `{astr1: val1, astr2: val2 ...}`
     *  allows setting multiple attributes simultaneously
     */
    relayout(gd: string|HTMLDivElement, astr: string|{[key: string]: any}, val?: any): Promise<plotly.PlotlyDiv>;
    
    /**
     * update: update trace and layout attributes of an existing plot
     *
     * @param {String | HTMLDivElement} gd
     *  the id or DOM element of the graph container div
     * @param {Object} traceUpdate
     *  attribute object `{astr1: val1, astr2: val2 ...}`
     *  corresponding to updates in the plot's traces
     * @param {Object} layoutUpdate
     *  attribute object `{astr1: val1, astr2: val2 ...}`
     *  corresponding to updates in the plot's layout
     * @param {Number[] | Number} [traces]
     *  integer or array of integers for the traces to alter (all if omitted)
     *
     */
    update(gd: string|HTMLDivElement, traceUpdate?: {[key: string]: any}, layoutUpdate?: {[key: string]: any}, traces?: number|number[]): Promise<plotly.PlotlyDiv>;
    
    /**
     * Animate to a frame, sequence of frame, frame group, or frame definition
     *
     * @param {string id or DOM element} gd
     *    the id or DOM element of the graph container div
     *
     * @param {string or object or array of strings or array of objects} frameOrGroupNameOrFrameList
     *    a single frame, array of frames, or group to which to animate. The intent is
     *    inferred by the type of the input. Valid inputs are:
     *
     *    - string, e.g. 'groupname': animate all frames of a given `group` in the order
     *      in which they are defined via `Plotly.addFrames`.
     *
     *    - array of strings, e.g. ['frame1', frame2']: a list of frames by name to which
     *      to animate in sequence
     *
     *    - object: {data: ...}: a frame definition to which to animate. The frame is not
     *      and does not need to be added via `Plotly.addFrames`. It may contain any of
     *      the properties of a frame, including `data`, `layout`, and `traces`. The
     *      frame is used as provided and does not use the `baseframe` property.
     *
     *    - array of objects, e.g. [{data: ...}, {data: ...}]: a list of frame objects,
     *      each following the same rules as a single `object`.
     *
     * @param {object} animationOpts
     *    configuration for the animation
     */
    animate(gd: string|HTMLDivElement, frameOrGroupNameOrFrameList: string|string[]|any|any[], animationOpts: any): Promise<plotly.PlotlyDiv>;
    
    /**
     * Register new frames
     *
     * @param {string id or DOM element} gd
     *    the id or DOM element of the graph container div
     *
     * @param {array of objects} frameList
     *    list of frame definitions, in which each object includes any of:
     *    - name: {string} name of frame to add
     *    - data: {array of objects} trace data
     *    - layout {object} layout definition
     *    - traces {array} trace indices
     *    - baseframe {string} name of frame from which this frame gets defaults
     *
     *  @param {array of integers) indices
     *    an array of integer indices matching the respective frames in `frameList`. If not
     *    provided, an index will be provided in serial order. If already used, the frame
     *    will be overwritten.
     */
    addFrames(gd: string|HTMLDivElement, frameList: any[], indices?: number[]): Promise<plotly.PlotlyDiv>;
    
    /**
     * Delete frame
     *
     * @param {string id or DOM element} gd
     *    the id or DOM element of the graph container div
     *
     * @param {array of integers} frameList
     *    list of integer indices of frames to be deleted
     */
    deleteFrames(gd: string|HTMLDivElement, frameList: number[]): Promise<plotly.PlotlyDiv>;
    
    /**
     * Purge a graph container div back to its initial pre-Plotly.plot state
     *
     * @param {string id or DOM element} gd
     *    the id or DOM element of the graph container div
     */
    purge(gd: string|HTMLDivElement): void;
    
    /**
     * Create a plot image
     *
     * @param {string id or DOM element} gd
     *    the id or DOM element of the graph container div
     *
     * @param opts
     *    Image export options
     *
     * @param opts.format
     *    Image export format (png, jpeg, webp, or svg)
     *
     * @param opts.width
     *    Image width in pixels
     *
     * @param opts.height
     *    Image height in pixels
     *
     * @param opts.setBackground
     *    Sets the image background mode. By default, the image background is determined by `layout.paper_bgcolor`, the *transparent* mode.
     *    One might consider setting `setBackground` to *opaque* when exporting a *jpeg* image as JPEGs do not support opacity.'
     *
     * @param opts.imageDataOnly
     *    Determines whether or not the return value is prefixed by the image format\'s corresponding \'data:image;\' spec.
     */
    toImage(gd: string|HTMLDivElement, opts: { format: "png"|"jpeg"|"webp"|"svg", width: number, height: number, setBackground?: boolean|string, imageDataOnly?: boolean }): void;
    
    /**
     * Download plot image
     *
     * @param {string id or DOM element} gd
     *    the id or DOM element of the graph container div
     *
     * @param opts
     *    Image export options
     *
     * @param opts.format
     *    Image export format (png, jpeg, webp, or svg)
     *
     * @param opts.width
     *    Image width in pixels
     *
     * @param opts.height
     *    Image height in pixels
     *
     * @param opts.filename
     *    File name for the image
     *
     * @param opts.setBackground
     *    Sets the image background mode. By default, the image background is determined by `layout.paper_bgcolor`, the *transparent* mode.
     *    One might consider setting `setBackground` to *opaque* when exporting a *jpeg* image as JPEGs do not support opacity.'
     *
     * @param opts.imageDataOnly
     *    Determines whether or not the return value is prefixed by the image format\'s corresponding \'data:image;\' spec.
     */
    downloadImage(gd: string|HTMLDivElement, opts: { format: "png"|"jpeg"|"webp"|"svg", width: number, height: number, filename: string, setBackground?: boolean|string, imageDataOnly?: boolean }): void;
    
    /**
     * D3 object
     */
    d3: any;
    
    /**
     * Underlying plot-related functions not exposed via Plotly object for various reasons.
     */
    Plots: {
      /**
       * Trigger resize of the Plotly chart div.
       *
       * @param {string id or DOM element} gd
       *    the id or DOM element of the graph container div
       */
      resize(gd: string|HTMLDivElement): Promise<plotly.PlotlyDiv>;
      
      /**
       * JSONify the graph data and layout
       *
       * This function needs to recurse because some src can be inside
       * sub-objects.
       *
       * It also strips out functions and private (starts with _) elements.
       * Therefore, we can add temporary things to data and layout that don't
       * get saved.
       *
       * @param gd The graphDiv
       * @param {Boolean} dataonly If true, don't return layout.
       * @param {'keepref'|'keepdata'|'keepall'} [mode='keepref'] Filter what's kept
       *      keepref: remove data for which there's a src present
       *          eg if there's xsrc present (and xsrc is well-formed,
       *          ie has : and some chars before it), strip out x
       *      keepdata: remove all src tags, don't remove the data itself
       *      keepall: keep data and src
       * @param {String} output If you specify 'object', the result will not be stringified
       * @param {Boolean} useDefaults If truthy, use _fullLayout and _fullData
       * @returns {Object|String}
       */
      graphJson(gd: string|HTMLDivElement, dataonly?: boolean, mode?: 'keepref'|'keepdata'|'keepall', output?: string, useDefaults?: boolean ): string|any;
    };
    
    /**
     * Plotly mode icons
     */
    Icons: {
      [key: string]: {
        ascent: number,
        descent: number,
        path: string,
        width: number
      }
    };
    
  }
}

declare var Plotly: plotly.Plotly;
        """.trim()
    }

}
