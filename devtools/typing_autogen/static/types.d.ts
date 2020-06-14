declare module plotly.types {
  export type PlotlyColorScaleArray = [number[], string[]];
  export type PlotlyColorScale = string | PlotlyColorScaleArray;
}

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

    emit?(event: any, data: any): void;

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
    on?(event: string, fn: (eventData: any) => void): void;
  }
}

/// <reference path="./index.d.ts" />
/**
 * Copyright 2012-2020, Plotly, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
declare module plotly.Plotly {
  /**
   * Main plot-creation export function
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
  export function plot(
    gd: string | HTMLDivElement,
    data: plotly.traces.BaseTrace[],
    layout?: plotly.layout.Layout,
    config?: plotly.PlotConfig
  ): Promise<plotly.PlotlyDiv>;

  // convenience export function to force a full redraw, mostly for use by plotly.js
  export function redraw(
    gd: string | HTMLDivElement
  ): Promise<plotly.PlotlyDiv>;

  /**
   * Convenience export function to make idempotent plot option obvious to users.
   *
   * @param gd
   * @param {Object[]} data
   * @param {Object} layout
   * @param {Object} config
   */
  export function newPlot(
    gd: string | HTMLDivElement,
    data: plotly.traces.BaseTrace[],
    layout?: plotly.layout.Layout,
    config?: plotly.PlotConfig
  ): Promise<plotly.PlotlyDiv>;

  /**
   * extend && prepend traces at indices with update arrays, window trace lengths to maxPoints
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
  export function extendTraces(
    gd: any | HTMLDivElement,
    update: any,
    indices: number | number[],
    maxPoints: number | any
  ): Promise<plotly.PlotlyDiv>;

  /**
   * extend && prepend traces at indices with update arrays, window trace lengths to maxPoints
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
  export function prependTraces(
    gd: any | HTMLDivElement,
    update: any,
    indices: number | number[],
    maxPoints: number | any
  ): Promise<plotly.PlotlyDiv>;

  /**
   * Add data traces to an existing graph div.
   *
   * @param {Object|HTMLDivElement} gd The graph div
   * @param {Object[]} gd.data The array of traces we're adding to
   * @param {Object[]|Object} traces The object or array of objects to add
   * @param {Number[]|Number} [newIndices=[gd.data.length]] Locations to add traces
   *
   */
  export function addTraces(
    gd: any | HTMLDivElement,
    traces: plotly.traces.BaseTrace | plotly.traces.BaseTrace[],
    newIndices: number | number[]
  ): Promise<plotly.PlotlyDiv>;

  /**
   * Delete traces at `indices` from gd.data array.
   *
   * @param {Object|HTMLDivElement} gd The graph div
   * @param {Object[]} gd.data The array of traces we're removing from
   * @param {Number|Number[]} indices The indices
   */
  export function deleteTraces(
    gd: any | HTMLDivElement,
    indices: number | number[]
  ): Promise<plotly.PlotlyDiv>;

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
   *      // move trace i to location x
   *      Plotly.moveTraces(gd, i, x)
   *
   *      // move trace i to end of array
   *      Plotly.moveTraces(gd, i)
   *
   *      // move traces i, j, k to end of array (i != j != k)
   *      Plotly.moveTraces(gd, [i, j, k])
   *
   *      // move traces [i, j, k] to [x, y, z] (i != j != k) (x != y != z)
   *      Plotly.moveTraces(gd, [i, j, k], [x, y, z])
   *
   *      // reorder all traces (assume there are 5--a, b, c, d, e)
   *      Plotly.moveTraces(gd, [b, d, e, a, c])  // same as 'move to end'
   */
  export function moveTraces(
    gd: any | HTMLDivElement,
    currentIndices: number | number[],
    newIndices: number | number[]
  ): Promise<plotly.PlotlyDiv>;

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
  export function restyle(
    gd: string | HTMLDivElement,
    val: any,
    traces?: number | number[]
  ): Promise<plotly.PlotlyDiv>;

  /**
   * storeDirectGUIEdit: for routines that skip restyle/relayout and mock it
   * by emitting a plotly_restyle or plotly_relayout event, this routine
   * keeps track of the initial state in _preGUI for use by uirevision
   * Does *not* apply these changes to data/layout - that's the responsibility
   * of the calling routine.
   *
   * @param {object} container: the input attributes container (eg `layout` or a `trace`)
   * @param {object} preGUI: where original values should be stored, either
   *     `layout._preGUI` or `layout._tracePreGUI[uid]`
   * @param {object} edits: the {attr: val} object as normally passed to `relayout` etc
   */
  export function _storeDirectGUIEdit(container, preGUI, edits);

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
  export function relayout(
    gd: string | HTMLDivElement,
    astr: string | { [key: string]: any },
    val?: any
  ): Promise<plotly.PlotlyDiv>;

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
  export function update(
    gd: string | HTMLDivElement,
    traceUpdate?: { [key: string]: any },
    layoutUpdate?: { [key: string]: any },
    traces?: number | number[]
  ): Promise<plotly.PlotlyDiv>;

  /**
   * internal-use-only restyle/relayout/update variants that record the initial
   * values in (fullLayout|fullTrace)._preGUI so changes can be persisted across
   * Plotly.react data updates, dependent on uirevision attributes
   */
  export function guiEdit(func);

  /**
   * Plotly.react:
   * A plot/update method that takes the full plot state (same API as plot/newPlot)
   * and diffs to determine the minimal update pathway
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
  export function react(gd, data, layout, config);

  /**
   * Animate to a frame, sequence of frame, frame group, or frame definition
   *
   * @param {string id or DOM element} gd
   *      the id or DOM element of the graph container div
   *
   * @param {string or object or array of strings or array of objects} frameOrGroupNameOrFrameList
   *      a single frame, array of frames, or group to which to animate. The intent is
   *      inferred by the type of the input. Valid inputs are:
   *
   *      - string, e.g. 'groupname': animate all frames of a given `group` in the order
   *            in which they are defined via `Plotly.addFrames`.
   *
   *      - array of strings, e.g. ['frame1', frame2']: a list of frames by name to which
   *            to animate in sequence
   *
   *      - object: {data: ...}: a frame definition to which to animate. The frame is not
   *            and does not need to be added via `Plotly.addFrames`. It may contain any of
   *            the properties of a frame, including `data`, `layout`, and `traces`. The
   *            frame is used as provided and does not use the `baseframe` property.
   *
   *      - array of objects, e.g. [{data: ...}, {data: ...}]: a list of frame objects,
   *            each following the same rules as a single `object`.
   *
   * @param {object} animationOpts
   *      configuration for the animation
   */
  export function animate(
    gd: string | HTMLDivElement,
    frameOrGroupNameOrFrameList: string | string[] | any | any[],
    animationOpts: any
  ): Promise<plotly.PlotlyDiv>;

  /**
   * Register new frames
   *
   * @param {string id or DOM element} gd
   *      the id or DOM element of the graph container div
   *
   * @param {array of objects} frameList
   *      list of frame definitions, in which each object includes any of:
   *      - name: {string} name of frame to add
   *      - data: {array of objects} trace data
   *      - layout {object} layout definition
   *      - traces {array} trace indices
   *      - baseframe {string} name of frame from which this frame gets defaults
   *
   *  @param {array of integers} indices
   *      an array of integer indices matching the respective frames in `frameList`. If not
   *      provided, an index will be provided in serial order. If already used, the frame
   *      will be overwritten.
   */
  export function addFrames(
    gd: string | HTMLDivElement,
    frameList: any[],
    indices?: number[]
  ): Promise<plotly.PlotlyDiv>;

  /**
   * Delete frame
   *
   * @param {string id or DOM element} gd
   *      the id or DOM element of the graph container div
   *
   * @param {array of integers} frameList
   *      list of integer indices of frames to be deleted
   */
  export function deleteFrames(gd, frameList);

  /**
   * Purge a graph container div back to its initial pre-Plotly.plot state
   *
   * @param {string id or DOM element} gd
   *      the id or DOM element of the graph container div
   */
  export function purge(gd: string | HTMLDivElement): void;

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
   *    Determines whether or not the return value is prefixed by the image format's corresponding 'data:image;' spec.
   */
  export function toImage(
    gd: string | HTMLDivElement,
    opts: {
      format: "png" | "jpeg" | "webp" | "svg";
      width: number;
      height: number;
      setBackground?: boolean | string;
      imageDataOnly?: boolean;
    }
  ): void;

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
   *    Determines whether or not the return value is prefixed by the image format's corresponding 'data:image;' spec.
   */
  export function downloadImage(
    gd: string | HTMLDivElement,
    opts: {
      format: "png" | "jpeg" | "webp" | "svg";
      width: number;
      height: number;
      filename: string;
      setBackground?: boolean | string;
      imageDataOnly?: boolean;
    }
  ): void;
}
