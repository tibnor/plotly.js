export interface PlotSchema {
  defs: Defs;
  traces: Traces;
  layout: PlotSchemaLayout;
  transforms: PlotSchemaTransforms;
  frames: Frames;
  animation: Animation;
  config: Config;
}

export interface Traces {
  [name: string]: Trace;
}

export interface Trace {
  meta: Meta;
  type: string;
  attributes: {
    [id: string]: AttributeConfig | string | { [id: string]: AttributeConfig };
  };
}

export interface AttributeConfig {
  _deprecated?: boolean;
  _noTemplating?: boolean;
  anim?: boolean;
  arrayOk?: boolean;
  dflt?:
    | Array<Array<number | string> | number>
    | boolean
    | number
    | null
    | string;
  description?: string;
  dimensions?: string;
  editType?: EditTypeElement;
  extras?: Extra[];
  flags?: string[];
  freeLength?: boolean;
  max?: number;
  min?: number;
  noBlank?: boolean;
  impliedEdits?: DoubleClickDelayImpliedEdits;
  items?: ItemsElement[];
  regex?: Regex;
  role?: Role;
  values?: Array<boolean | number | string>;
  valType?: ValType;
}

export interface Animation {
  mode: Direction;
  direction: Direction;
  fromcurrent: Fromcurrent;
  frame: Frame;
  transition: AnimationTransition;
}

export interface Direction {
  valType?: ValType;
  role?: Role;
  values?: Array<boolean | number | string>;
  dflt?:
    | Array<Array<number | string> | number | string>
    | boolean
    | number
    | null
    | string;
  description?: string;
  editType?: EditTypeElement;
  min?: number;
  impliedEdits?: AutosizeImpliedEdits;
  items?: AutosizeItem[];
  max?: number;
  arrayOk?: boolean;
  anim?: boolean;
  flags?: string[];
  extras?: Extra[];
  regex?: Regex;
  strict?: boolean;
  noBlank?: boolean;
}

export enum EditTypeElement {
  Arraydraw = "arraydraw",
  Axrange = "axrange",
  Calc = "calc",
  CalcArraydraw = "calc+arraydraw",
  CalcClearAxisTypes = "calc+clearAxisTypes",
  Camera = "camera",
  ClearAxisTypes = "clearAxisTypes",
  Colorbars = "colorbars",
  Layoutstyle = "layoutstyle",
  Legend = "legend",
  MarkerSize = "markerSize",
  Modebar = "modebar",
  None = "none",
  Plot = "plot",
  Style = "style",
  StyleColorbars = "style+colorbars",
  Ticks = "ticks",
  TicksLayoutstyle = "ticks+layoutstyle",
}

export enum Extra {
  All = "all",
  Even = "even",
  None = "none",
  Normal = "normal",
  Odd = "odd",
  Skip = "skip",
}

export interface AutosizeImpliedEdits {
  cauto?: boolean;
  tickmode?: TickmodeElement;
  autocolorscale?: boolean;
  zauto?: boolean;
  "^autocontour"?: boolean;
}

export enum TickmodeElement {
  Array = "array",
  Auto = "auto",
  Linear = "linear",
}

export interface AutosizeItem {
  valType: ValType;
  editType: EditTypeElement;
  min?: number;
  max?: number;
}

export enum ValType {
  Angle = "angle",
  Any = "any",
  Boolean = "boolean",
  Color = "color",
  Colorlist = "colorlist",
  Colorscale = "colorscale",
  DataArray = "data_array",
  Enumerated = "enumerated",
  Flaglist = "flaglist",
  InfoArray = "info_array",
  Integer = "integer",
  Number = "number",
  String = "string",
  Subplotid = "subplotid",
}

export enum Regex {
  Coloraxis291909$ = "/^coloraxis([2-9]|[1-9][0-9]+)?$/",
}

export enum Role {
  Data = "data",
  Info = "info",
  Object = "object",
  Style = "style",
}

export interface Frame {
  duration: DoubleClickDelay;
  redraw: Fromcurrent;
  role: Role;
}

export interface DoubleClickDelay {
  valType?: ValType;
  role?: Role;
  min?: number;
  dflt?: number[] | boolean | number | null | string;
  description?: string;
  editType?: EditTypeElement;
  max?: number;
  values?: Array<boolean | number | string>;
  arrayOk?: boolean;
  impliedEdits?: DoubleClickDelayImpliedEdits;
  items?: ItemsElement[];
  _noTemplating?: boolean;
  regex?: Regex;
  flags?: string[];
  extras?: Extra[];
  strict?: boolean;
  noBlank?: boolean;
}

export interface DoubleClickDelayImpliedEdits {
  tickmode?: TickmodeElement;
  "^aspectmode"?: string;
  zauto?: boolean;
  ytype?: XtypeEnum;
  cauto?: boolean;
  autocolorscale?: boolean;
}

export enum XtypeEnum {
  Array = "array",
  Scaled = "scaled",
}

export interface ItemsElement {
  valType: ValType;
  editType: EditTypeElement;
}

export interface Fromcurrent {
  valType?: ValType;
  role?: Role;
  dflt?:
    | Array<Array<number | string> | number>
    | boolean
    | number
    | null
    | string;
  description?: string;
  editType?: EditTypeElement;
  min?: number;
  max?: number;
  items?: FromcurrentItem[];
  values?: Array<boolean | number | string>;
  impliedEdits?: FromcurrentImpliedEdits;
  flags?: string[];
  _noTemplating?: boolean;
  arrayOk?: boolean;
  anim?: boolean;
  extras?: Extra[];
  regex?: Regex;
}

export interface FromcurrentImpliedEdits {
  autocolorscale?: boolean;
  tickmode?: TickmodeElement;
  zauto?: boolean;
  "^autocontour"?: boolean;
  xtype?: XtypeEnum;
  cauto?: boolean;
}

export interface FromcurrentItem {
  valType: ValType;
  dflt?: number;
  editType: EditTypeElement;
  min?: number;
  max?: number;
}

export interface AnimationTransition {
  duration: Duration;
  easing: Easing;
  ordering?: Direction;
  role: Role;
  editType?: EditTypeElement;
}

export interface Duration {
  valType: ValType;
  role: Role;
  min: number | number;
  dflt: number | number | null;
  editType: EditTypeElement;
  description: string;
}

export interface Easing {
  valType: ValType;
  dflt: string;
  values: string[];
  role: Role;
  editType: EditTypeElement;
  description: string;
}

export interface Config {
  staticPlot: Fromcurrent;
  plotlyServerURL: DoubleClickDelay;
  editable: Fromcurrent;
  edits: Edits;
  autosizable: Fromcurrent;
  responsive: DoubleClickDelay;
  fillFrame: Fromcurrent;
  frameMargins: DoubleClickDelay;
  scrollZoom: ScrollZoom;
  doubleClick: DisplayModeBar;
  doubleClickDelay: DoubleClickDelay;
  showAxisDragHandles: Fromcurrent;
  showAxisRangeEntryBoxes: Fromcurrent;
  showTips: Fromcurrent;
  showLink: Fromcurrent;
  linkText: DisplayModeBar;
  sendData: Fromcurrent;
  showSources: Fromcurrent;
  displayModeBar: DisplayModeBar;
  showSendToCloud: Fromcurrent;
  showEditInChartStudio: Fromcurrent;
  modeBarButtonsToRemove: DoubleClickDelay;
  modeBarButtonsToAdd: DoubleClickDelay;
  modeBarButtons: DoubleClickDelay;
  toImageButtonOptions: Locales;
  displaylogo: Fromcurrent;
  watermark: Fromcurrent;
  plotGlPixelRatio: DoubleClickDelay;
  setBackground: DisplayModeBar;
  topojsonURL: DisplayModeBar;
  mapboxAccessToken: DoubleClickDelay;
  logging: DoubleClickDelay;
  notifyOnLogging: DoubleClickDelay;
  queueLength: DoubleClickDelay;
  globalTransforms: GlobalTransforms;
  locale: DisplayModeBar;
  locales: Locales;
}

export interface DisplayModeBar {
  valType: ValType;
  values?: Array<boolean | string>;
  dflt: string;
  description: string;
  noBlank?: boolean;
}

export interface Edits {
  annotationPosition: Fromcurrent;
  annotationTail: Fromcurrent;
  annotationText: Fromcurrent;
  axisTitleText: Fromcurrent;
  colorbarPosition: Fromcurrent;
  colorbarTitleText: Fromcurrent;
  legendPosition: Fromcurrent;
  legendText: Fromcurrent;
  shapePosition: Fromcurrent;
  titleText: Fromcurrent;
  role: Role;
}

export interface GlobalTransforms {
  valType: ValType;
  dflt: any[];
  description: string;
}

export interface Locales {
  valType: ValType;
  dflt: CategoriesElement;
  description: string;
}

export interface CategoriesElement {}

export interface ScrollZoom {
  valType: ValType;
  flags: string[];
  extras: boolean[];
  dflt: string;
  description: string;
}

export interface Defs {
  valObjects: { [key: string]: ValObject };
  metaKeys: string[];
  editType: EditType;
  impliedEdits: ImpliedEdits;
}

export interface EditType {
  traces: TracesClass;
  layout: TracesClass;
}

export interface TracesClass {
  valType: ValType;
  extras: EditTypeElement[];
  flags: EditTypeElement[];
  description: string;
}

export interface ImpliedEdits {
  description: string;
}

export interface ValObject {
  description: string;
  requiredOpts: string[];
  otherOpts: string[];
}

export interface ValAttr {
  valType: string;
  values?: any[];
  role: string;
  dflt: any;
  editType: "calc";
  description: "Determines whether or not this trace is visible. If *legendonly*, the trace is not drawn, but can appear as a legend item (provided that the legend itself is visible).";
}

export interface Frames {
  items: FramesItems;
  role: Role;
}

export interface FramesItems {
  frames_entry: FramesEntry;
}

export interface FramesEntry {
  group: Fromcurrent;
  name: Fromcurrent;
  traces: Fromcurrent;
  baseframe: Fromcurrent;
  data: Fromcurrent;
  layout: Fromcurrent;
  role: Role;
}

export interface PlotSchemaLayout {
  layoutAttributes: LayoutLayoutAttributes;
}

export interface LayoutLayoutAttributes {
  font: LayoutAttributesFont;
  title: LayoutAttributesTitle;
  uniformtext: Uniformtext;
  autosize: Direction;
  width: Selectdirection;
  height: Direction;
  margin: Margin;
  paper_bgcolor: Fromcurrent;
  plot_bgcolor: Fromcurrent;
  separators: Selectdirection;
  hidesources: Direction;
  showlegend: Showlegend;
  colorway: Direction;
  datarevision: Direction;
  uirevision: DoubleClickDelay;
  editrevision: Direction;
  selectionrevision: Selectdirection;
  template: Selectdirection;
  modebar: Modebar;
  newshape: Newshape;
  activeshape: Activeshape;
  meta: DoubleClickDelay;
  transition: LayoutAttributesTransition;
  _deprecated: LayoutAttributesDeprecated;
  clickmode: Clickmode;
  dragmode: Direction;
  hovermode: Fromcurrent;
  hoverdistance: Direction;
  spikedistance: Selectdirection;
  hoverlabel: LayoutAttributesHoverlabel;
  selectdirection: Selectdirection;
  grid: Grid;
  calendar: Direction;
  xaxis: LayoutAttributesXaxis;
  yaxis: LayoutAttributesXaxis;
  ternary: Ternary;
  scene: Scene;
  geo: Geo;
  mapbox: MapboxClass;
  polar: Polar;
  radialaxis: Radialaxis;
  angularaxis: Angularaxis;
  direction: Direction;
  orientation: Fromcurrent;
  editType: EditTypeElement;
  legend: Legend;
  annotations: Annotations;
  shapes: Shapes;
  images: Images;
  updatemenus: Updatemenus;
  sliders: Sliders;
  colorscale: LayoutAttributesColorscale;
  coloraxis: LayoutAttributesColoraxis;
  metasrc: DoubleClickDelay;
}

export interface LayoutAttributesDeprecated {
  title: CustomdataClass;
  titlefont: TitlefontClass;
}

export interface CustomdataClass {
  valType: ValType;
  role: Role;
  editType: EditTypeElement;
  description: string;
}

export interface TitlefontClass {
  family: Family;
  size: TitlefontSize;
  color: CopyYstyleClass;
  editType: EditTypeElement;
  description: string;
  role?: Role;
}

export interface CopyYstyleClass {
  valType: ValType;
  role: EditTypeElement;
  editType: EditTypeElement;
}

export interface Family {
  valType: ValType;
  role: Role;
  noBlank: boolean;
  strict: boolean;
  editType: EditTypeElement;
  description: string;
  dflt?: string;
  arrayOk?: boolean;
}

export interface TitlefontSize {
  valType: ValType;
  role: EditTypeElement;
  min: number;
  editType: EditTypeElement;
}

export interface Activeshape {
  fillcolor: Direction;
  opacity: DoubleClickDelay;
  editType: EditTypeElement;
  role: Role;
}

export interface Angularaxis {
  range: Fromcurrent;
  domain: Showlegend;
  showline: Direction;
  showticklabels: Direction;
  tickorientation: Direction;
  ticklen: Direction;
  tickcolor: Direction;
  ticksuffix: Direction;
  endpadding: Fromcurrent;
  visible: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface Showlegend {
  valType?: ValType;
  role?: Role;
  items?: AutosizeItem[];
  dflt?:
    | Array<Array<number | string> | number>
    | boolean
    | number
    | null
    | string;
  editType: EditTypeElement;
  description?: string;
  impliedEdits?: OceancolorImpliedEdits;
  min?: number;
  values?: Array<boolean | number | string>;
  max?: number;
  arrayOk?: boolean;
  _noTemplating?: boolean;
  anim?: boolean;
  flags?: string[];
  extras?: Extra[];
  regex?: Regex;
}

export interface OceancolorImpliedEdits {
  cauto?: boolean;
  tickmode?: TickmodeElement;
  "^aspectmode"?: string;
  autocolorscale?: boolean;
  xtype?: XtypeEnum;
  ytype?: XtypeEnum;
  zauto?: boolean;
}

export interface Annotations {
  items: AnnotationsItems;
  role: Role;
}

export interface AnnotationsItems {
  annotation: Annotation;
}

export interface Annotation {
  visible: Reversescale;
  text: Fromcurrent;
  textangle: Fromcurrent;
  font: TitlefontClass;
  width: Duration;
  height: Duration;
  opacity: Boxgap;
  align: Easing;
  valign: Easing;
  bgcolor: Featureidkey;
  bordercolor: Featureidkey;
  borderpad: Duration;
  borderwidth: Duration;
  showarrow: Fromcurrent;
  arrowcolor: CustomdataClass;
  arrowhead: Boxgap;
  startarrowhead: Boxgap;
  arrowside: Clickmode;
  arrowsize: Duration;
  startarrowsize: Duration;
  arrowwidth: SizeClass;
  standoff: Duration;
  startstandoff: Duration;
  ax: CustomdataClass;
  ay: CustomdataClass;
  axref?: Direction;
  ayref?: Direction;
  xref?: Direction;
  x: CustomdataClass;
  xanchor: Easing;
  xshift: Offset;
  yref?: Direction;
  y: CustomdataClass;
  yanchor: Easing;
  yshift: Offset;
  clicktoshow?: Selectdirection;
  xclick?: Direction;
  yclick?: Direction;
  hovertext: Fromcurrent;
  hoverlabel: AnnotationHoverlabel;
  captureevents: CustomdataClass;
  editType: EditTypeElement;
  _deprecated?: AnnotationDeprecated;
  name: Fromcurrent;
  templateitemname: Fromcurrent;
  role: Role;
  z?: Fromcurrent;
}

export interface AnnotationDeprecated {
  ref: Fromcurrent;
}

export interface Boxgap {
  valType: ValType;
  min: number;
  max: number | number;
  dflt: number | number;
  role: Role;
  editType: EditTypeElement;
  description: string;
}

export interface Clickmode {
  valType?: ValType;
  flags?: string[];
  extras?: Extra[];
  dflt?: number[] | boolean | number | null | string;
  role?: Role;
  editType: EditTypeElement;
  description?: string;
  arrayOk?: boolean;
  values?: Array<boolean | number | string>;
  impliedEdits?: ClickmodeImpliedEdits;
  regex?: Regex;
  min?: number;
  items?: AutosizeItem[];
  max?: number;
  anim?: boolean;
}

export interface ClickmodeImpliedEdits {
  cauto?: boolean;
  tickmode?: TickmodeElement;
  autocolorscale?: boolean;
  xtype?: XtypeEnum;
  ytype?: XtypeEnum;
  zauto?: boolean;
}

export interface SizeClass {
  valType: ValType;
  min: number | number;
  role: EditTypeElement;
  editType: EditTypeElement;
  description: string;
}

export interface Featureidkey {
  valType: ValType;
  dflt?: boolean | FlagElement | number | null;
  role: Role;
  editType: EditTypeElement;
  description: string;
}

export enum FlagElement {
  Auto = "auto",
  DfltRGBA0000 = "rgba(0, 0, 0, 0)",
  Eee = "#eee",
  Empty = "",
  Ff4136 = "#FF4136",
  ID = "id",
  Mapbox = "mapbox",
  RGBA0000 = "rgba(0,0,0,0)",
  Scene = "scene",
  The3D9970 = "#3D9970",
  The444 = "#444",
  X = "x",
  Y = "y",
}

export interface Selectdirection {
  valType?: ValType;
  values?: Array<boolean | number | string>;
  dflt?: number[] | boolean | CategoriesElement | number | null | string;
  role?: Role;
  editType: EditTypeElement;
  description?: string;
  min?: number;
  impliedEdits?: SelectdirectionImpliedEdits;
  max?: number;
  items?: AutosizeItem[];
  _noTemplating?: boolean;
  freeLength?: boolean;
  arrayOk?: boolean;
  regex?: Regex;
  anim?: boolean;
  flags?: string[];
  extras?: Extra[];
  dimensions?: string;
  _compareAsJSON?: boolean;
}

export interface SelectdirectionImpliedEdits {
  tickmode?: TickmodeElement;
  cauto?: boolean;
  autocolorscale?: boolean;
  zauto?: boolean;
  "^autocontour"?: boolean;
  xtype?: XtypeEnum;
  ytype?: XtypeEnum;
}

export interface AnnotationHoverlabel {
  bgcolor: Fromcurrent;
  bordercolor: Fromcurrent;
  font: TitlefontClass;
  editType: EditTypeElement;
  role: Role;
}

export interface Reversescale {
  valType: ValType;
  role: Role;
  dflt: boolean;
  editType: EditTypeElement;
  description: string;
}

export interface Offset {
  valType: ValType;
  dflt: number;
  role: Role;
  editType: EditTypeElement;
  description: string;
}

export interface LayoutAttributesColoraxis {
  _isSubplotObj: boolean;
  editType: EditTypeElement;
  description: string;
  cauto: Direction;
  cmin: Showlegend;
  cmax: Direction;
  cmid: Showlegend;
  colorscale: Fromcurrent;
  autocolorscale: Direction;
  reversescale: Selectdirection;
  showscale: Selectdirection;
  colorbar: Colorbar;
  role: Role;
}

export interface Colorbar {
  thicknessmode: Easing;
  thickness: Duration;
  lenmode: Easing;
  len: Duration;
  x: Boxgap;
  xanchor: Easing;
  xpad: Duration;
  y: Boxgap;
  yanchor: Easing;
  ypad: Duration;
  outlinecolor: Featureidkey;
  outlinewidth: Duration;
  bordercolor: Featureidkey;
  borderwidth: Duration;
  bgcolor: Featureidkey;
  tickmode: TickmodeClass;
  nticks: Duration;
  tick0: Dtick;
  dtick: Dtick;
  tickvals: CustomdataClass;
  ticktext: CustomdataClass;
  ticks: Easing;
  ticklen: Duration;
  tickwidth: Duration;
  tickcolor: Featureidkey;
  showticklabels: Reversescale;
  tickfont: TitlefontClass;
  tickangle: Featureidkey;
  tickformat: Featureidkey;
  tickformatstops: Tickformatstops;
  tickprefix: Featureidkey;
  showtickprefix: Easing;
  ticksuffix: Featureidkey;
  showticksuffix: Easing;
  separatethousands: Reversescale;
  exponentformat: Easing;
  showexponent: Easing;
  title: ColorbarTitle;
  _deprecated: ColorbarDeprecated;
  editType: EditTypeElement;
  role: Role;
  tickvalssrc: CustomdataClass;
  ticktextsrc: CustomdataClass;
}

export interface ColorbarDeprecated {
  title: CustomdataClass;
  titlefont: TitlefontClass;
  titleside: Easing;
}

export interface Dtick {
  valType: ValType;
  role: EditTypeElement;
  editType: EditTypeElement;
  impliedEdits: PurpleImpliedEdits;
  description: string;
}

export interface PurpleImpliedEdits {
  tickmode: TickmodeElement;
}

export interface Tickformatstops {
  items: TickformatstopsItems;
  role: Role;
}

export interface TickformatstopsItems {
  tickformatstop: Tickformatstop;
}

export interface Tickformatstop {
  enabled: Reversescale;
  dtickrange: BoundsClass;
  value: Featureidkey;
  editType: EditTypeElement;
  name: CustomdataClass;
  templateitemname: CustomdataClass;
  role: Role;
}

export interface BoundsClass {
  valType: ValType;
  role: Role;
  items: ItemsElement[];
  editType: EditTypeElement;
  description: string;
}

export interface TickmodeClass {
  valType: ValType;
  values: TickmodeElement[];
  role: Role;
  editType: EditTypeElement;
  impliedEdits: CategoriesElement;
  description: string;
}

export interface ColorbarTitle {
  text: CustomdataClass;
  font: TitlefontClass;
  side?: Easing;
  editType: EditTypeElement;
  role: Role;
  standoff?: Fromcurrent;
  align?: Clickmode;
}

export interface LayoutAttributesColorscale {
  editType: EditTypeElement;
  sequential: Direction;
  sequentialminus: Direction;
  diverging: Direction;
  role: Role;
}

export interface LayoutAttributesFont {
  family: Family;
  size: TracerefClass;
  color: PurpleColor;
  editType: EditTypeElement;
  description: string;
  role: Role;
}

export interface PurpleColor {
  valType: ValType;
  role: EditTypeElement;
  editType: EditTypeElement;
  dflt: FlagElement;
}

export interface TracerefClass {
  valType: ValType;
  role: Role;
  min: number;
  editType: EditTypeElement;
  dflt: number;
}

export interface Geo {
  domain: GeoDomain;
  fitbounds: Fromcurrent;
  resolution: Resolution;
  scope: Selectdirection;
  projection: GeoProjection;
  center: RotationClass;
  visible: Selectdirection;
  showcoastlines: Selectdirection;
  coastlinecolor: Selectdirection;
  coastlinewidth: Selectdirection;
  showland: Selectdirection;
  landcolor: Fromcurrent;
  showocean: Selectdirection;
  oceancolor: Showlegend;
  showlakes: Selectdirection;
  lakecolor: Fromcurrent;
  showrivers: Selectdirection;
  rivercolor: Selectdirection;
  riverwidth: Selectdirection;
  showcountries: Selectdirection;
  countrycolor: Selectdirection;
  countrywidth: Selectdirection;
  showsubunits: Selectdirection;
  subunitcolor: Selectdirection;
  subunitwidth: Selectdirection;
  showframe: Selectdirection;
  framecolor: Fromcurrent;
  framewidth: Fromcurrent;
  bgcolor: Fromcurrent;
  lonaxis: LataxisClass;
  lataxis: LataxisClass;
  editType: EditTypeElement;
  uirevision: Selectdirection;
  _isSubplotObj: boolean;
  role: Role;
}

export interface RotationClass {
  lon: CustomdataClass;
  lat: CustomdataClass;
  editType: EditTypeElement;
  role: Role;
  roll?: Direction;
}

export interface GeoDomain {
  x: DomainX;
  y: DomainX;
  row: Duration;
  column: Duration;
  editType: EditTypeElement;
  role: Role;
}

export interface DomainX {
  valType: ValType;
  role: Role;
  items: AutosizeItem[];
  dflt: number[];
  description: string;
  editType: EditTypeElement;
}

export interface LataxisClass {
  range: Showlegend;
  showgrid: Showlegend;
  tick0: Showlegend;
  dtick: Showlegend;
  gridcolor: Showlegend;
  gridwidth: Showlegend;
  editType: EditTypeElement;
  role: Role;
}

export interface GeoProjection {
  type: Direction;
  rotation: RotationClass;
  parallels: Direction;
  scale: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface Resolution {
  valType?: ValType;
  values?: Array<boolean | number | string>;
  role: Role;
  dflt?: boolean | number | null | string;
  coerceNumber?: boolean;
  description?: string;
  editType: EditTypeElement;
  arrayOk?: boolean;
  min?: number;
  flags?: FlagElement[];
  anim?: boolean;
  max?: number;
}

export interface Grid {
  rows: Fromcurrent;
  roworder: Fromcurrent;
  columns: DoubleClickDelay;
  subplots: Subplots;
  xaxes: Subplots;
  yaxes: Subplots;
  pattern: Fromcurrent;
  xgap: Showlegend;
  ygap: Direction;
  domain: GridDomain;
  xside: Showlegend;
  yside: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface GridDomain {
  x: Fromcurrent;
  y: Fromcurrent;
  editType: EditTypeElement;
  role: Role;
}

export interface Subplots {
  valType: ValType;
  freeLength: boolean;
  dimensions?: number;
  items: SubplotsItems;
  role: Role;
  editType: EditTypeElement;
  description: string;
}

export interface SubplotsItems {
  valType: ValType;
  values: string[];
  editType: EditTypeElement;
}

export interface LayoutAttributesHoverlabel {
  bgcolor: Selectdirection;
  bordercolor: Selectdirection;
  font: PurpleFont;
  align: Selectdirection;
  namelength: Fromcurrent;
  editType: EditTypeElement;
  role: Role;
}

export interface PurpleFont {
  family: Family;
  size: Fromcurrent;
  color: Fromcurrent;
  editType: EditTypeElement;
  description: string;
  role: Role;
}

export interface Images {
  items: ImagesItems;
  role: Role;
}

export interface ImagesItems {
  image: ItemsImage;
}

export interface ItemsImage {
  visible: Showlegend;
  source: Showlegend;
  layer: Showlegend;
  sizex: Showlegend;
  sizey: Showlegend;
  sizing: Showlegend;
  opacity: Showlegend;
  x: Showlegend;
  y: Showlegend;
  xanchor: Showlegend;
  yanchor: Showlegend;
  xref: Showlegend;
  yref: Showlegend;
  editType: EditTypeElement;
  name: Showlegend;
  templateitemname: Showlegend;
  role: Role;
}

export interface Legend {
  bgcolor: DoubleClickDelay;
  bordercolor: DoubleClickDelay;
  borderwidth: DoubleClickDelay;
  font: TitlefontClass;
  orientation: DoubleClickDelay;
  traceorder: Clickmode;
  tracegroupgap: Direction;
  itemsizing: DoubleClickDelay;
  itemclick: DoubleClickDelay;
  itemdoubleclick: DoubleClickDelay;
  x: Direction;
  xanchor: Direction;
  y: Direction;
  yanchor: Direction;
  uirevision: Direction;
  valign: Direction;
  title: LegendTitle;
  editType: EditTypeElement;
  role: Role;
}

export interface LegendTitle {
  text: Featureidkey;
  font: TitlefontClass;
  side?: Direction;
  editType: EditTypeElement;
  role: Role;
  offset?: Offset;
}

export interface MapboxClass {
  _arrayAttrRegexps: CategoriesElement[];
  domain: GeoDomain;
  accesstoken: Family;
  style: Showlegend;
  center: MapboxCenter;
  zoom: Showlegend;
  bearing: Selectdirection;
  pitch: Showlegend;
  layers: Layers;
  editType: EditTypeElement;
  uirevision: Showlegend;
  _isSubplotObj: boolean;
  role: Role;
}

export interface MapboxCenter {
  lon: Fromcurrent;
  lat: Fromcurrent;
  editType: EditTypeElement;
  role: Role;
}

export interface Layers {
  items: LayersItems;
  role: Role;
}

export interface LayersItems {
  layer: Layer;
}

export interface Layer {
  visible: Showlegend;
  sourcetype: Selectdirection;
  source: Selectdirection;
  sourcelayer: Selectdirection;
  sourceattribution: Selectdirection;
  type: Showlegend;
  coordinates: DoubleClickDelay;
  below: Showlegend;
  color: DoubleClickDelay;
  opacity: Selectdirection;
  minzoom: Selectdirection;
  maxzoom: Selectdirection;
  circle: Circle;
  line: LayerLine;
  fill: LayerFill;
  symbol: LayerSymbol;
  name: Selectdirection;
  templateitemname: Showlegend;
  editType: EditTypeElement;
  role: Role;
}

export interface Circle {
  radius: DoubleClickDelay;
  editType: EditTypeElement;
  role: Role;
}

export interface LayerFill {
  outlinecolor: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface LayerLine {
  width: Selectdirection;
  dash: Selectdirection;
  editType: EditTypeElement;
  role: Role;
  dashsrc: Selectdirection;
}

export interface LayerSymbol {
  icon: Fromcurrent;
  iconsize: Fromcurrent;
  text: Fromcurrent;
  placement: Fromcurrent;
  textfont: TitlefontClass;
  textposition: Showlegend;
  editType: EditTypeElement;
  role: Role;
}

export interface Margin {
  l: DoubleClickDelay;
  r: DoubleClickDelay;
  t: DoubleClickDelay;
  b: DoubleClickDelay;
  pad: DoubleClickDelay;
  autoexpand: DoubleClickDelay;
  editType: EditTypeElement;
  role: Role;
}

export interface Modebar {
  orientation: Direction;
  bgcolor: Direction;
  color: Direction;
  activecolor: Direction;
  uirevision: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface Newshape {
  line: NewshapeLine;
  fillcolor: Selectdirection;
  fillrule: Selectdirection;
  opacity: Fromcurrent;
  layer: Selectdirection;
  drawdirection: Selectdirection;
  editType: EditTypeElement;
  role: Role;
}

export interface NewshapeLine {
  color?: Featureidkey;
  width?: Duration;
  dash?: Easing;
  role: Role;
  editType: EditTypeElement;
  opacity?: Fromcurrent;
  colorsrc?: Direction;
  smoothing?: Boxgap;
  shape?: Easing;
}

export interface Polar {
  domain: GeoDomain;
  sector: DoubleClickDelay;
  hole: Showlegend;
  bgcolor: Showlegend;
  radialaxis: AngularaxisClass;
  angularaxis: AngularaxisClass;
  gridshape: Showlegend;
  uirevision: DoubleClickDelay;
  editType: EditTypeElement;
  _isSubplotObj: boolean;
  role: Role;
}

export interface AngularaxisClass {
  visible?: Reversescale;
  type?: TypeClass;
  categoryorder?: Showlegend;
  categoryarray?: Showlegend;
  thetaunit?: Showlegend;
  period?: Showlegend;
  direction?: Showlegend;
  rotation?: Showlegend;
  hoverformat: Featureidkey;
  uirevision: CustomdataClass;
  editType: EditTypeElement;
  color: Featureidkey;
  showline: Reversescale;
  linecolor: Featureidkey;
  linewidth: Duration;
  showgrid: Reversescale;
  gridcolor: Featureidkey;
  gridwidth: Duration;
  tickmode: TickmodeClass;
  nticks: Duration;
  tick0: Dtick;
  dtick: Dtick;
  tickvals: CustomdataClass;
  ticktext: CustomdataClass;
  ticks: Xtype;
  ticklen: Duration;
  tickwidth: Duration;
  tickcolor: Featureidkey;
  showticklabels: Reversescale;
  showtickprefix: Easing;
  tickprefix: Featureidkey;
  showticksuffix: Easing;
  ticksuffix: Featureidkey;
  showexponent: Easing;
  exponentformat: Easing;
  separatethousands: Reversescale;
  tickfont: TitlefontClass;
  tickangle: Featureidkey;
  tickformat: Featureidkey;
  tickformatstops: Tickformatstops;
  layer: Easing;
  role: Role;
  categoryarraysrc?: Showlegend;
  tickvalssrc: CustomdataClass;
  ticktextsrc: CustomdataClass;
  autorange?: Showlegend;
  rangemode?: DoubleClickDelay;
  range?: AngularaxisRange;
  angle?: Showlegend;
  side?: DoubleClickDelay;
  title?: AngularaxisTitle;
  _deprecated?: LayoutAttributesDeprecated;
  calendar?: Showlegend;
  min?: Fromcurrent;
}

export interface AngularaxisRange {
  valType: ValType;
  role: Role;
  items: PurpleItem[];
  editType: EditTypeElement;
  impliedEdits: FluffyImpliedEdits;
  anim?: boolean;
  description: string;
}

export interface FluffyImpliedEdits {
  autorange: boolean;
}

export interface PurpleItem {
  valType: ValType;
  editType: EditTypeElement;
  impliedEdits: ItemImpliedEdits;
  anim?: boolean;
}

export interface ItemImpliedEdits {
  "^autorange": boolean;
}

export interface Xtype {
  valType: ValType;
  values: string[];
  role: Role;
  editType: EditTypeElement;
  description: string;
}

export interface AngularaxisTitle {
  text: Featureidkey;
  font: TitlefontClass;
  editType: EditTypeElement;
  role: Role;
}

export interface TypeClass {
  valType: ValType;
  values: string[];
  dflt: string;
  role: Role;
  editType: EditTypeElement;
  _noTemplating: boolean;
  description: string;
}

export interface Radialaxis {
  range: Direction;
  domain: Direction;
  orientation: Direction;
  showline: Direction;
  showticklabels: Direction;
  tickorientation: Direction;
  ticklen: Direction;
  tickcolor: Direction;
  ticksuffix: Direction;
  endpadding: Direction;
  visible: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface Scene {
  _arrayAttrRegexps: CategoriesElement[];
  bgcolor: DoubleClickDelay;
  camera: Camera;
  domain: GeoDomain;
  aspectmode: Fromcurrent;
  aspectratio: Aspectratio;
  xaxis: ZaxisClass;
  yaxis: ZaxisClass;
  zaxis: ZaxisClass;
  dragmode: Direction;
  hovermode: Direction;
  uirevision: Direction;
  editType: EditTypeElement;
  _deprecated: SceneDeprecated;
  annotations: Annotations;
  _isSubplotObj: boolean;
  role: Role;
}

export interface SceneDeprecated {
  cameraposition: Selectdirection;
}

export interface Aspectratio {
  x: Showlegend;
  y: DoubleClickDelay;
  z: DoubleClickDelay;
  editType: EditTypeElement;
  impliedEdits: TentacledImpliedEdits;
  description: string;
  role: Role;
}

export interface TentacledImpliedEdits {
  aspectmode: string;
  role: Role;
}

export interface Camera {
  up: EyeClass;
  center: EyeClass;
  eye: EyeClass;
  projection: CameraProjection;
  editType: EditTypeElement;
  role: Role;
}

export interface EyeClass {
  x: CenterX;
  y: CenterX;
  z: CenterX;
  editType: EditTypeElement;
  description: string;
  role: Role;
}

export interface CenterX {
  valType: ValType;
  role: Role;
  dflt: number;
  editType: EditTypeElement;
}

export interface CameraProjection {
  type: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface ZaxisClass {
  visible: Selectdirection;
  showspikes: Selectdirection;
  spikesides: Selectdirection;
  spikethickness: Selectdirection;
  spikecolor: Selectdirection;
  showbackground: Selectdirection;
  backgroundcolor: Selectdirection;
  showaxeslabels: Selectdirection;
  color: Selectdirection;
  categoryorder: Selectdirection;
  categoryarray: Selectdirection;
  title: ColorbarTitle;
  type: Selectdirection;
  autorange: Selectdirection;
  rangemode: Selectdirection;
  range: AngularaxisRange;
  tickmode: Selectdirection;
  nticks: Selectdirection;
  tick0: Selectdirection;
  dtick: Selectdirection;
  tickvals: Selectdirection;
  ticktext: Selectdirection;
  ticks: Selectdirection;
  mirror: Selectdirection;
  ticklen: Selectdirection;
  tickwidth: Selectdirection;
  tickcolor: Selectdirection;
  showticklabels: Selectdirection;
  tickfont: TitlefontClass;
  tickangle: Selectdirection;
  tickprefix: Selectdirection;
  showtickprefix: Selectdirection;
  ticksuffix: Selectdirection;
  showticksuffix: Selectdirection;
  showexponent: Selectdirection;
  exponentformat: Selectdirection;
  separatethousands: Selectdirection;
  tickformat: Selectdirection;
  tickformatstops: Tickformatstops;
  hoverformat: Selectdirection;
  showline: Selectdirection;
  linecolor: Selectdirection;
  linewidth: Selectdirection;
  showgrid: Selectdirection;
  gridcolor: Selectdirection;
  gridwidth: Selectdirection;
  zeroline: Selectdirection;
  zerolinecolor: Selectdirection;
  zerolinewidth: Selectdirection;
  _deprecated: LayoutAttributesDeprecated;
  editType: EditTypeElement;
  calendar: Selectdirection;
  role: Role;
  categoryarraysrc: Selectdirection;
  tickvalssrc: Selectdirection;
  ticktextsrc: Selectdirection;
}

export interface Shapes {
  items: ShapesItems;
  role: Role;
}

export interface ShapesItems {
  shape: Shape;
}

export interface Shape {
  visible: Showlegend;
  type: Showlegend;
  layer: Fromcurrent;
  xref: Showlegend;
  xsizemode: Showlegend;
  xanchor: Showlegend;
  x0: Showlegend;
  x1: Showlegend;
  yref: Showlegend;
  ysizemode: Showlegend;
  yanchor: Showlegend;
  y0: Showlegend;
  y1: Showlegend;
  path: Showlegend;
  opacity: Showlegend;
  line: ShapeLine;
  fillcolor: Fromcurrent;
  fillrule: Fromcurrent;
  editable: Fromcurrent;
  editType: EditTypeElement;
  name: Showlegend;
  templateitemname: Showlegend;
  role: Role;
}

export interface ShapeLine {
  color: Showlegend;
  width: Showlegend;
  dash: Showlegend;
  role: Role;
  editType: EditTypeElement;
}

export interface Sliders {
  items: SlidersItems;
  role: Role;
}

export interface SlidersItems {
  slider: Slider;
}

export interface Slider {
  visible: Selectdirection;
  active: DoubleClickDelay;
  steps: SliderSteps;
  lenmode: Direction;
  len: Direction;
  x: Selectdirection;
  pad: SliderPad;
  xanchor: Selectdirection;
  y: Selectdirection;
  yanchor: Selectdirection;
  transition: AnimationTransition;
  currentvalue: Currentvalue;
  font: TitlefontClass;
  activebgcolor: DoubleClickDelay;
  bgcolor: DoubleClickDelay;
  bordercolor: DoubleClickDelay;
  borderwidth: DoubleClickDelay;
  ticklen: Selectdirection;
  tickcolor: Selectdirection;
  tickwidth: Selectdirection;
  minorticklen: Direction;
  name: Direction;
  templateitemname: Selectdirection;
  editType: EditTypeElement;
  role: Role;
}

export interface Currentvalue {
  visible: Alignmentgroup;
  xanchor: Direction;
  offset: Alignmentgroup;
  prefix: Alignmentgroup;
  suffix: Alignmentgroup;
  font: TitlefontClass;
  editType: EditTypeElement;
  role: Role;
}

export interface Alignmentgroup {
  valType?: ValType;
  dflt?: boolean | number | null | string;
  editType: EditTypeElement;
  role?: Role;
  min?: number;
  description?: string;
  values?: Array<boolean | number | string>;
  max?: number;
  arrayOk?: boolean;
  anim?: boolean;
  impliedEdits?: SelectdirectionImpliedEdits;
  regex?: Regex;
  items?: ItemsElement[];
  flags?: string[];
  extras?: Extra[];
  strict?: boolean;
  noBlank?: boolean;
}

export interface SliderPad {
  t: Offset;
  r: Offset;
  b: Offset;
  l: Offset;
  editType: EditTypeElement;
  description: string;
  role: Role;
}

export interface SliderSteps {
  items: PurpleItems;
  role: Role;
}

export interface PurpleItems {
  step: PurpleStep;
}

export interface PurpleStep {
  visible: Selectdirection;
  method: Selectdirection;
  args: Selectdirection;
  label: Selectdirection;
  value: Selectdirection;
  execute: Selectdirection;
  name: Selectdirection;
  templateitemname: Selectdirection;
  editType: EditTypeElement;
  role: Role;
}

export interface Ternary {
  domain: GeoDomain;
  bgcolor: Fromcurrent;
  sum: Fromcurrent;
  aaxis: AngularaxisClass;
  baxis: AngularaxisClass;
  caxis: AngularaxisClass;
  editType: EditTypeElement;
  uirevision: Fromcurrent;
  _isSubplotObj: boolean;
  role: Role;
}

export interface LayoutAttributesTitle {
  text: Showlegend;
  font: TitlefontClass;
  xref: Showlegend;
  yref: Showlegend;
  x: Showlegend;
  y: Showlegend;
  xanchor: Showlegend;
  yanchor: Showlegend;
  pad: SliderPad;
  editType: EditTypeElement;
  role: Role;
}

export interface LayoutAttributesTransition {
  duration: DoubleClickDelay;
  easing: DoubleClickDelay;
  ordering: DoubleClickDelay;
  description: string;
  editType: EditTypeElement;
  role: Role;
}

export interface Uniformtext {
  mode: Direction;
  minsize: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface Updatemenus {
  items: UpdatemenusItems;
  role: Role;
}

export interface UpdatemenusItems {
  updatemenu: Updatemenu;
}

export interface Updatemenu {
  _arrayAttrRegexps: CategoriesElement[];
  visible: Selectdirection;
  type: Selectdirection;
  direction: Selectdirection;
  active: Alignmentgroup;
  showactive: Selectdirection;
  buttons: UpdatemenuButtons;
  x: Selectdirection;
  xanchor: Selectdirection;
  y: Selectdirection;
  yanchor: Selectdirection;
  pad: SliderPad;
  font: TitlefontClass;
  bgcolor: Alignmentgroup;
  bordercolor: Alignmentgroup;
  borderwidth: Alignmentgroup;
  name: Selectdirection;
  templateitemname: Selectdirection;
  editType: EditTypeElement;
  role: Role;
}

export interface UpdatemenuButtons {
  items: FluffyItems;
  role: Role;
}

export interface FluffyItems {
  button: PurpleButton;
}

export interface PurpleButton {
  visible: Selectdirection;
  method: Selectdirection;
  args: Selectdirection;
  args2: Selectdirection;
  label: Selectdirection;
  execute: Selectdirection;
  name: Selectdirection;
  templateitemname: Selectdirection;
  editType: EditTypeElement;
  role: Role;
}

export interface LayoutAttributesXaxis {
  visible: Fromcurrent;
  color: Fromcurrent;
  title: ColorbarTitle;
  type: Fromcurrent;
  autorange: Fromcurrent;
  rangemode: Easing;
  range: AngularaxisRange;
  fixedrange: Fromcurrent;
  scaleanchor: Fromcurrent;
  scaleratio: Fromcurrent;
  constrain: Fromcurrent;
  constraintoward: Fromcurrent;
  matches: Fromcurrent;
  rangebreaks: Rangebreaks;
  tickmode: Fromcurrent;
  nticks: Fromcurrent;
  tick0: Fromcurrent;
  dtick: Fromcurrent;
  tickvals: Fromcurrent;
  ticktext: Fromcurrent;
  ticks: Fromcurrent;
  tickson: Fromcurrent;
  mirror: Fromcurrent;
  ticklen: Fromcurrent;
  tickwidth: Fromcurrent;
  tickcolor: Fromcurrent;
  showticklabels: Fromcurrent;
  automargin: Fromcurrent;
  showspikes: Fromcurrent;
  spikecolor: Fromcurrent;
  spikethickness: Fromcurrent;
  spikedash: Fromcurrent;
  spikemode: Fromcurrent;
  spikesnap: Fromcurrent;
  tickfont: TitlefontClass;
  tickangle: Fromcurrent;
  tickprefix: Fromcurrent;
  showtickprefix: Fromcurrent;
  ticksuffix: Fromcurrent;
  showticksuffix: Fromcurrent;
  showexponent: Fromcurrent;
  exponentformat: Fromcurrent;
  separatethousands: Fromcurrent;
  tickformat: Fromcurrent;
  tickformatstops: Tickformatstops;
  hoverformat: Fromcurrent;
  showline: Fromcurrent;
  linecolor: Fromcurrent;
  linewidth: Fromcurrent;
  showgrid: Fromcurrent;
  gridcolor: Fromcurrent;
  gridwidth: Fromcurrent;
  zeroline: Fromcurrent;
  zerolinecolor: Fromcurrent;
  zerolinewidth: Fromcurrent;
  showdividers: Fromcurrent;
  dividercolor: Fromcurrent;
  dividerwidth: Fromcurrent;
  anchor: Fromcurrent;
  side: Fromcurrent;
  overlaying: Fromcurrent;
  layer: Fromcurrent;
  domain: Fromcurrent;
  position: Fromcurrent;
  categoryorder: Fromcurrent;
  categoryarray: Fromcurrent;
  uirevision: Fromcurrent;
  editType: EditTypeElement;
  _deprecated: PurpleDeprecated;
  rangeslider?: Rangeslider;
  rangeselector?: Rangeselector;
  calendar: Fromcurrent;
  _isSubplotObj: boolean;
  role: Role;
  tickvalssrc: Fromcurrent;
  ticktextsrc: Fromcurrent;
  categoryarraysrc: Fromcurrent;
}

export interface PurpleDeprecated {
  autotick: Fromcurrent;
  title: Fromcurrent;
  titlefont: TitlefontClass;
}

export interface Rangebreaks {
  items: RangebreaksItems;
  role: Role;
}

export interface RangebreaksItems {
  rangebreak: Rangebreak;
}

export interface Rangebreak {
  enabled: Reversescale;
  bounds: BoundsClass;
  pattern: Xtype;
  values: Values;
  dvalue: Duration;
  editType: EditTypeElement;
  name: CustomdataClass;
  templateitemname: CustomdataClass;
  role: Role;
}

export interface Values {
  valType: ValType;
  freeLength: boolean;
  role: Role;
  editType: EditTypeElement;
  items: ItemsElement;
  description: string;
}

export interface Rangeselector {
  visible: Alignmentgroup;
  buttons: RangeselectorButtons;
  x: Alignmentgroup;
  xanchor: Alignmentgroup;
  y: Alignmentgroup;
  yanchor: Alignmentgroup;
  font: TitlefontClass;
  bgcolor: Direction;
  activecolor: Direction;
  bordercolor: Direction;
  borderwidth: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface RangeselectorButtons {
  items: TentacledItems;
  role: Role;
}

export interface TentacledItems {
  button: FluffyButton;
}

export interface FluffyButton {
  visible: Alignmentgroup;
  step: Alignmentgroup;
  stepmode: Alignmentgroup;
  count: Alignmentgroup;
  label: Alignmentgroup;
  editType: EditTypeElement;
  description: string;
  name: Alignmentgroup;
  templateitemname: Alignmentgroup;
  role: Role;
}

export interface Rangeslider {
  bgcolor: Selectdirection;
  bordercolor: Selectdirection;
  borderwidth: Selectdirection;
  autorange: Selectdirection;
  range: AngularaxisRange;
  thickness: Selectdirection;
  visible: Selectdirection;
  editType: EditTypeElement;
  yaxis: Yaxis;
  role: Role;
}

export interface Yaxis {
  _isSubplotObj: boolean;
  rangemode: Fromcurrent;
  range: Fromcurrent;
  editType: EditTypeElement;
  role: Role;
}

export interface Meta {
  description: string;
}

export interface Area {
  meta: CategoriesElement;
  categories: CategoriesElement;
  animatable: boolean;
  type: string;
  attributes: AreaAttributes;
}

export interface AreaAttributes {
  type: string;
  visible: Fromcurrent;
  showlegend: Showlegend;
  legendgroup: Direction;
  opacity: Showlegend;
  name: Showlegend;
  uid: Fromcurrent;
  ids: Direction;
  customdata: Showlegend;
  meta: Showlegend;
  hoverinfo: Showlegend;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Fromcurrent;
  r: Showlegend;
  t: Selectdirection;
  marker: PurpleMarker;
  idssrc: Direction;
  customdatasrc: Showlegend;
  metasrc: Showlegend;
  hoverinfosrc: Showlegend;
  rsrc: Showlegend;
  tsrc: Fromcurrent;
}

export interface AttributesHoverlabel {
  bgcolor: BgcolorClass;
  bordercolor: BgcolorClass;
  font: InsidetextfontClass;
  align: Textposition;
  namelength: Namelength;
  editType: EditTypeElement;
  role: Role;
  bgcolorsrc: CustomdataClass;
  bordercolorsrc: CustomdataClass;
  alignsrc: CustomdataClass;
  namelengthsrc: CustomdataClass;
  split?: Reversescale;
}

export interface Textposition {
  valType: ValType;
  values: string[];
  dflt: TextpositionDfltEnum;
  role: EditTypeElement;
  editType: EditTypeElement;
  description: string;
  arrayOk: boolean;
}

export enum TextpositionDfltEnum {
  Auto = "auto",
  Center = "center",
  MiddleCenter = "middle center",
  None = "none",
}

export interface BgcolorClass {
  valType: ValType;
  role: Role;
  editType: EditTypeElement;
  description: string;
  arrayOk: boolean;
}

export interface InsidetextfontClass {
  family: Family;
  size: InsidetextfontSize;
  color: InsidetextfontColor;
  editType: EditTypeElement;
  description?: string;
  role: Role;
  familysrc?: CustomdataClass;
  sizesrc: CustomdataClass;
  colorsrc: CustomdataClass;
}

export interface InsidetextfontColor {
  valType: ValType;
  role: EditTypeElement;
  editType: EditTypeElement;
  arrayOk: boolean;
}

export interface InsidetextfontSize {
  valType: ValType;
  role: EditTypeElement;
  min: number;
  editType: EditTypeElement;
  arrayOk: boolean;
}

export interface Namelength {
  valType: ValType;
  min: number;
  dflt?: number | number;
  role: EditTypeElement;
  editType: EditTypeElement;
  description: string;
  arrayOk?: boolean;
}

export interface PurpleMarker {
  color: Alignmentgroup;
  size: Alignmentgroup;
  symbol: Showlegend;
  opacity: Alignmentgroup;
  editType: EditTypeElement;
  role: Role;
  colorsrc: Alignmentgroup;
  sizesrc: Alignmentgroup;
  symbolsrc: Showlegend;
  opacitysrc: Alignmentgroup;
}

export interface Stream {
  token: Family;
  maxpoints: Boxgap;
  editType: EditTypeElement;
  role: Role;
}

export interface AttributesTransforms {
  items: TransformsItems;
  role: Role;
}

export interface TransformsItems {
  transform: Transform;
}

export interface Transform {
  editType: EditTypeElement;
  description: string;
  role: Role;
}

export interface TracesBar {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: BarAttributes;
  layoutAttributes: BarLayoutAttributes;
}

export interface BarAttributes {
  type: string;
  visible: Alignmentgroup;
  showlegend: Fromcurrent;
  legendgroup: Direction;
  opacity: Selectdirection;
  name: Selectdirection;
  uid: Fromcurrent;
  ids: Direction;
  customdata: Alignmentgroup;
  meta: Selectdirection;
  selectedpoints: Fromcurrent;
  hoverinfo: Clickmode;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Fromcurrent;
  x: Alignmentgroup;
  x0: Alignmentgroup;
  dx: Alignmentgroup;
  y: Alignmentgroup;
  y0: Alignmentgroup;
  dy: Alignmentgroup;
  text: Fromcurrent;
  texttemplate: Fromcurrent;
  hovertext: Direction;
  hovertemplate: Direction;
  textposition: Fromcurrent;
  insidetextanchor: Direction;
  textangle: Fromcurrent;
  textfont: InsidetextfontClass;
  insidetextfont: InsidetextfontClass;
  outsidetextfont: InsidetextfontClass;
  constraintext: Alignmentgroup;
  cliponaxis: Alignmentgroup;
  orientation: Selectdirection;
  base: Alignmentgroup;
  offset: Selectdirection;
  width: Alignmentgroup;
  marker: LineClass;
  offsetgroup: Selectdirection;
  alignmentgroup: Alignmentgroup;
  selected: PurpleSelected;
  unselected: PurpleSelected;
  r: Selectdirection;
  t: Fromcurrent;
  _deprecated: FluffyDeprecated;
  error_x: Error;
  error_y: Error;
  xcalendar: Alignmentgroup;
  ycalendar: Alignmentgroup;
  xaxis: Alignmentgroup;
  yaxis: Alignmentgroup;
  idssrc: Direction;
  customdatasrc: Alignmentgroup;
  metasrc: Selectdirection;
  hoverinfosrc: Direction;
  xsrc: Alignmentgroup;
  ysrc: Alignmentgroup;
  textsrc: Fromcurrent;
  texttemplatesrc: Fromcurrent;
  hovertextsrc: Direction;
  hovertemplatesrc: Direction;
  textpositionsrc: Fromcurrent;
  basesrc: Alignmentgroup;
  offsetsrc: Selectdirection;
  widthsrc: Alignmentgroup;
  rsrc: Selectdirection;
  tsrc: Fromcurrent;
}

export interface FluffyDeprecated {
  bardir: Xtype;
}

export interface Error {
  visible: CustomdataClass;
  type: Xtype;
  symmetric: CustomdataClass;
  array: CustomdataClass;
  arrayminus: CustomdataClass;
  value: Duration;
  valueminus: Duration;
  traceref: TracerefClass;
  tracerefminus: TracerefClass;
  copy_ystyle?: CopyYstyleClass;
  color: CustomdataClass;
  thickness: Duration;
  width: SizeClass;
  editType: EditTypeElement;
  _deprecated: ErrorXDeprecated;
  role: Role;
  arraysrc: CustomdataClass;
  arrayminussrc: CustomdataClass;
  copy_zstyle?: DoubleClickDelay;
}

export interface ErrorXDeprecated {
  opacity: CustomdataClass;
}

export interface LineClass {
  line?: LineLine;
  editType: EditTypeElement;
  color?: BgcolorClass;
  cauto: Autocolorscale;
  cmin: Cmax;
  cmax: Cmax;
  cmid: Autocolorscale;
  colorscale: MarkerColorscale;
  autocolorscale: Autocolorscale;
  reversescale: Reversescale;
  showscale?: Reversescale;
  colorbar?: Colorbar;
  coloraxis: MarkerColoraxis;
  opacity?: Selectdirection;
  role: Role;
  colorsrc?: CustomdataClass;
  opacitysrc?: Selectdirection;
  shape?: Selectdirection;
  hovertemplate?: Selectdirection;
  width?: Namelength;
  dash?: DoubleClickDelay;
  widthsrc?: CustomdataClass;
  colors?: Direction;
  colorssrc?: Direction;
  pad?: MarkerPad;
  depthfade?: Direction;
}

export interface Autocolorscale {
  valType: ValType;
  role: Role;
  dflt: boolean | null;
  editType: EditTypeElement;
  impliedEdits: CategoriesElement;
  description: string;
}

export interface Cmax {
  valType: ValType;
  role: Role;
  dflt: null;
  editType: EditTypeElement;
  impliedEdits: StickyImpliedEdits;
  description: string;
}

export interface StickyImpliedEdits {
  cauto: boolean;
}

export interface MarkerColoraxis {
  valType: ValType;
  role: Role;
  regex: Regex;
  dflt: null;
  editType: EditTypeElement;
  description: string;
}

export interface MarkerColorscale {
  valType: ValType;
  role: EditTypeElement;
  editType: EditTypeElement;
  dflt: null;
  impliedEdits: IndigoImpliedEdits;
  description: string;
}

export interface IndigoImpliedEdits {
  autocolorscale: boolean;
}

export interface LineLine {
  width: PurpleWidth;
  editType: EditTypeElement;
  color: Hovertemplate;
  cauto?: Selectdirection;
  cmin?: Selectdirection;
  cmax?: Selectdirection;
  cmid?: Selectdirection;
  colorscale?: Selectdirection;
  autocolorscale?: Selectdirection;
  reversescale?: Selectdirection;
  coloraxis?: Selectdirection;
  role: Role;
  widthsrc: CustomdataClass;
  colorsrc: CustomdataClass;
}

export interface Hovertemplate {
  valType: ValType;
  arrayOk: boolean;
  role: Role;
  editType: EditTypeElement;
  description: string;
  dflt?: HovertemplateDfltEnum | null;
}

export enum HovertemplateDfltEnum {
  Empty = "",
  The444 = "#444",
  White = "white",
}

export interface PurpleWidth {
  valType: ValType;
  min: number;
  arrayOk: boolean;
  role: EditTypeElement;
  editType: EditTypeElement;
  anim?: boolean;
  description: string;
  dflt: number;
}

export interface MarkerPad {
  t: Resolution;
  l: Resolution;
  r: Resolution;
  b: Resolution;
  editType: EditTypeElement;
  role: Role;
}

export interface PurpleSelected {
  marker: SelectedMarker;
  textfont: Textfont;
  editType: EditTypeElement;
  role: Role;
}

export interface SelectedMarker {
  opacity: LineOpacity;
  color: CustomdataClass;
  editType: EditTypeElement;
  role: Role;
}

export interface LineOpacity {
  valType: ValType;
  min: number;
  max: number;
  role: EditTypeElement;
  editType: EditTypeElement;
  description: string;
}

export interface Textfont {
  color: CustomdataClass;
  editType: EditTypeElement;
  role: Role;
}

export interface BarLayoutAttributes {
  barmode: DoubleClickDelay;
  barnorm: DoubleClickDelay;
  bargap: DoubleClickDelay;
  bargroupgap: DoubleClickDelay;
}

export interface Barpolar {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: BarpolarAttributes;
  layoutAttributes: BarpolarLayoutAttributes;
}

export interface BarpolarAttributes {
  type: string;
  visible: Showlegend;
  showlegend: Showlegend;
  legendgroup: Direction;
  opacity: Showlegend;
  name: Showlegend;
  uid: Showlegend;
  ids: Direction;
  customdata: Direction;
  meta: Showlegend;
  selectedpoints: Showlegend;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Showlegend;
  r: Showlegend;
  theta: Showlegend;
  r0: Showlegend;
  dr: Direction;
  theta0: Showlegend;
  dtheta: Direction;
  thetaunit: Showlegend;
  base: Clickmode;
  offset: Showlegend;
  width: Showlegend;
  text: Showlegend;
  hovertext: Direction;
  marker: FluffyMarker;
  hoverinfo: Direction;
  hovertemplate: Direction;
  selected: PurpleSelected;
  unselected: PurpleSelected;
  subplot: Showlegend;
  idssrc: Direction;
  customdatasrc: Direction;
  metasrc: Showlegend;
  rsrc: Showlegend;
  thetasrc: Showlegend;
  basesrc: Direction;
  offsetsrc: Showlegend;
  widthsrc: Showlegend;
  textsrc: Showlegend;
  hovertextsrc: Direction;
  hoverinfosrc: Direction;
  hovertemplatesrc: Direction;
}

export interface FluffyMarker {
  line: PurpleLine;
  editType: EditTypeElement;
  color: BgcolorClass;
  cauto: Autocolorscale;
  cmin: Cmax;
  cmax: Cmax;
  cmid: Autocolorscale;
  colorscale: MarkerColorscale;
  autocolorscale: Autocolorscale;
  reversescale: Reversescale;
  showscale: Reversescale;
  colorbar: Colorbar;
  coloraxis: MarkerColoraxis;
  opacity: PurpleOpacity;
  role: Role;
  colorsrc: CustomdataClass;
  opacitysrc: CustomdataClass;
}

export interface PurpleLine {
  width: Namelength;
  editType: EditTypeElement;
  color: BgcolorClass;
  cauto: Autocolorscale;
  cmin: Cmax;
  cmax: Cmax;
  cmid: Autocolorscale;
  colorscale: MarkerColorscale;
  autocolorscale: Autocolorscale;
  reversescale: Reversescale;
  coloraxis: MarkerColoraxis;
  role: Role;
  widthsrc: CustomdataClass;
  colorsrc: CustomdataClass;
}

export interface PurpleOpacity {
  valType: ValType;
  arrayOk: boolean;
  dflt: number;
  min: number;
  max: number;
  role: EditTypeElement;
  editType: EditTypeElement;
  description: string;
}

export interface BarpolarLayoutAttributes {
  barmode: Selectdirection;
  bargap: Selectdirection;
}

export interface BarpolarMeta {
  hrName: string;
  description: string;
}

export interface TracesBox {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: BoxAttributes;
  layoutAttributes: BoxLayoutAttributes;
}

export interface BoxAttributes {
  type: string;
  visible: Direction;
  showlegend: Direction;
  legendgroup: Fromcurrent;
  opacity: DoubleClickDelay;
  uid: Direction;
  ids: Fromcurrent;
  customdata: Fromcurrent;
  meta: DoubleClickDelay;
  selectedpoints: Direction;
  hoverinfo: Fromcurrent;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Direction;
  y: Direction;
  x: Direction;
  x0: Direction;
  y0: Direction;
  dx: Fromcurrent;
  dy: Fromcurrent;
  name: DoubleClickDelay;
  q1: DoubleClickDelay;
  median: DoubleClickDelay;
  q3: DoubleClickDelay;
  lowerfence: Fromcurrent;
  upperfence: Direction;
  notched: DoubleClickDelay;
  notchwidth: DoubleClickDelay;
  notchspan: DoubleClickDelay;
  boxpoints: Fromcurrent;
  jitter: Fromcurrent;
  pointpos: DoubleClickDelay;
  boxmean: Fromcurrent;
  mean: DoubleClickDelay;
  sd: DoubleClickDelay;
  orientation: DoubleClickDelay;
  quartilemethod: DoubleClickDelay;
  width: Direction;
  marker: TentacledMarker;
  line: NewshapeLine;
  fillcolor: Fromcurrent;
  whiskerwidth: Direction;
  offsetgroup: DoubleClickDelay;
  alignmentgroup: Fromcurrent;
  selected: FluffySelected;
  unselected: FluffySelected;
  text: Direction;
  hovertext: Fromcurrent;
  hovertemplate: Fromcurrent;
  hoveron: Fromcurrent;
  xcalendar: Direction;
  ycalendar: Direction;
  xaxis: Direction;
  yaxis: Direction;
  idssrc: Fromcurrent;
  customdatasrc: Fromcurrent;
  metasrc: DoubleClickDelay;
  hoverinfosrc: Fromcurrent;
  ysrc: Direction;
  xsrc: Direction;
  q1src: DoubleClickDelay;
  mediansrc: DoubleClickDelay;
  q3src: DoubleClickDelay;
  lowerfencesrc: Fromcurrent;
  upperfencesrc: Direction;
  notchspansrc: DoubleClickDelay;
  meansrc: DoubleClickDelay;
  sdsrc: DoubleClickDelay;
  textsrc: Direction;
  hovertextsrc: Fromcurrent;
  hovertemplatesrc: Fromcurrent;
}

export interface TentacledMarker {
  outliercolor: Featureidkey;
  symbol: MarkerSymbol;
  opacity: PurpleOpacity;
  size: Namelength;
  color: BgcolorClass;
  line: FluffyLine;
  editType: EditTypeElement;
  role: Role;
}

export interface FluffyLine {
  color: Hovertemplate;
  width: Namelength;
  outliercolor: CustomdataClass;
  outlierwidth: Duration;
  editType: EditTypeElement;
  role: Role;
}

export interface MarkerSymbol {
  valType: ValType;
  values: Array<number | string>;
  dflt: string;
  arrayOk: boolean;
  role: EditTypeElement;
  editType: EditTypeElement;
  description: string;
}

export interface FluffySelected {
  marker: LeafClass;
  editType: EditTypeElement;
  role: Role;
  textfont?: LeafClass;
}

export interface LeafClass {
  opacity?: LineOpacity;
  color?: CustomdataClass;
  editType: EditTypeElement;
  role: Role;
  size?: SizeClass;
  width?: Showlegend;
  visible?: Showlegend;
}

export interface BoxLayoutAttributes {
  boxmode: Easing;
  boxgap: Boxgap;
  boxgroupgap: Boxgap;
}

export interface Candlestick {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: CandlestickAttributes;
  layoutAttributes: BoxLayoutAttributes;
}

export interface CandlestickAttributes {
  type: string;
  visible: Fromcurrent;
  showlegend: Fromcurrent;
  legendgroup: Fromcurrent;
  opacity: Fromcurrent;
  name: Fromcurrent;
  uid: Fromcurrent;
  ids: Fromcurrent;
  customdata: Showlegend;
  meta: Fromcurrent;
  selectedpoints: Fromcurrent;
  hoverinfo: Fromcurrent;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Fromcurrent;
  x: Fromcurrent;
  open: Fromcurrent;
  high: Fromcurrent;
  low: Fromcurrent;
  close: Showlegend;
  line: NewshapeLine;
  increasing: PurpleCreasing;
  decreasing: PurpleCreasing;
  text: Fromcurrent;
  hovertext: Fromcurrent;
  whiskerwidth: Fromcurrent;
  hoverlabel: AttributesHoverlabel;
  xcalendar: Fromcurrent;
  xaxis: Fromcurrent;
  yaxis: Fromcurrent;
  idssrc: Fromcurrent;
  customdatasrc: Showlegend;
  metasrc: Fromcurrent;
  hoverinfosrc: Fromcurrent;
  xsrc: Fromcurrent;
  opensrc: Fromcurrent;
  highsrc: Fromcurrent;
  lowsrc: Fromcurrent;
  closesrc: Showlegend;
  textsrc: Fromcurrent;
  hovertextsrc: Fromcurrent;
}

export interface PurpleCreasing {
  line: DecreasingClass;
  fillcolor: CustomdataClass;
  editType: EditTypeElement;
  role: Role;
}

export interface DecreasingClass {
  color: Featureidkey;
  width?: Duration;
  editType: EditTypeElement;
  role: Role;
  dash?: Easing;
  symbol?: Showlegend;
}

export interface Carpet {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: CarpetAttributes;
}

export interface CarpetAttributes {
  type: string;
  visible: Direction;
  opacity: Direction;
  name: Direction;
  uid: Direction;
  ids: Direction;
  customdata: Direction;
  meta: Direction;
  stream: Stream;
  uirevision: Direction;
  carpet: Direction;
  x: Direction;
  y: Direction;
  a: Alignmentgroup;
  a0: Alignmentgroup;
  da: Direction;
  b: DoubleClickDelay;
  b0: DoubleClickDelay;
  db: Direction;
  cheaterslope: Direction;
  aaxis: AttributesAaxis;
  baxis: AttributesAaxis;
  font: LayoutAttributesFont;
  color: Direction;
  xaxis: Direction;
  yaxis: Direction;
  idssrc: Direction;
  customdatasrc: Direction;
  metasrc: Direction;
  xsrc: Direction;
  ysrc: Direction;
  asrc: DoubleClickDelay;
  bsrc: Direction;
}

export interface AttributesAaxis {
  color: CustomdataClass;
  smoothing: Smoothing;
  title: LegendTitle;
  type: Easing;
  autorange: Visible;
  rangemode: Easing;
  range: BoundsClass;
  fixedrange: Reversescale;
  cheatertype: Cheatertype;
  tickmode: Cheatertype;
  nticks: Duration;
  tickvals: CustomdataClass;
  ticktext: CustomdataClass;
  showticklabels: Easing;
  tickfont: TitlefontClass;
  tickangle: Featureidkey;
  tickprefix: Featureidkey;
  showtickprefix: Easing;
  ticksuffix: Featureidkey;
  showticksuffix: Easing;
  showexponent: Easing;
  exponentformat: Easing;
  separatethousands: Reversescale;
  tickformat: Featureidkey;
  tickformatstops: Tickformatstops;
  categoryorder: Easing;
  categoryarray: CustomdataClass;
  labelpadding: Offset;
  labelprefix: CustomdataClass;
  labelsuffix: Featureidkey;
  showline: Reversescale;
  linecolor: Featureidkey;
  linewidth: Duration;
  gridcolor: CustomdataClass;
  gridwidth: Duration;
  showgrid: Reversescale;
  minorgridcount: Duration;
  minorgridwidth: Duration;
  minorgridcolor: Featureidkey;
  startline: CustomdataClass;
  startlinecolor: CustomdataClass;
  startlinewidth: Offset;
  endline: CustomdataClass;
  endlinewidth: Offset;
  endlinecolor: CustomdataClass;
  tick0: Duration;
  dtick: Duration;
  arraytick0: Duration;
  arraydtick: Duration;
  _deprecated: TentacledDeprecated;
  editType: EditTypeElement;
  role: Role;
  tickvalssrc: CustomdataClass;
  ticktextsrc: CustomdataClass;
  categoryarraysrc: CustomdataClass;
}

export interface TentacledDeprecated {
  title: CustomdataClass;
  titlefont: TitlefontClass;
  titleoffset: Offset;
}

export interface Visible {
  valType: ValType;
  values: Array<boolean | ValueEnum>;
  dflt: boolean;
  role: Role;
  editType: EditTypeElement;
  description: string;
}

export enum ValueEnum {
  Legendonly = "legendonly",
  Reversed = "reversed",
}

export interface Cheatertype {
  valType: ValType;
  values: string[];
  dflt: string;
  role: Role;
  editType: EditTypeElement;
}

export interface Smoothing {
  valType: ValType;
  dflt: number;
  min: number;
  max: number;
  role: Role;
  editType: EditTypeElement;
}

export interface Choropleth {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ChoroplethAttributes;
}

export interface ChoroplethAttributes {
  type: string;
  visible: Visible;
  legendgroup: Featureidkey;
  name: CustomdataClass;
  uid: CustomdataClass;
  ids: CustomdataClass;
  customdata: CustomdataClass;
  meta: BgcolorClass;
  selectedpoints?: CustomdataClass;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: CustomdataClass;
  locations?: CustomdataClass;
  locationmode?: Clickmode;
  z: CustomdataClass;
  geojson?: CustomdataClass;
  featureidkey?: Featureidkey;
  text: Hovertemplate;
  hovertext: Hovertemplate;
  marker?: StickyMarker;
  selected?: TentacledSelected;
  unselected?: TentacledSelected;
  hoverinfo: Hoverinfo;
  hovertemplate: Hovertemplate;
  showlegend: Reversescale;
  zauto: Autocolorscale;
  zmin: Zmax;
  zmax: Zmax;
  zmid: Autocolorscale;
  colorscale: MarkerColorscale;
  autocolorscale: Autocolorscale;
  reversescale: Reversescale;
  showscale: Reversescale;
  colorbar: Colorbar;
  coloraxis: MarkerColoraxis;
  geo?: Clickmode;
  idssrc: CustomdataClass;
  customdatasrc: CustomdataClass;
  metasrc: CustomdataClass;
  locationssrc?: CustomdataClass;
  zsrc: CustomdataClass;
  textsrc: CustomdataClass;
  hovertextsrc: CustomdataClass;
  hoverinfosrc: CustomdataClass;
  hovertemplatesrc: CustomdataClass;
  below?: Alignmentgroup;
  subplot?: Featureidkey;
  opacity?: Alignmentgroup;
  lon?: Alignmentgroup;
  lat?: Alignmentgroup;
  radius?: Alignmentgroup;
  lonsrc?: Alignmentgroup;
  latsrc?: Alignmentgroup;
  radiussrc?: Alignmentgroup;
}

export interface Hoverinfo {
  valType: ValType;
  role: Role;
  flags: string[];
  extras: Extra[];
  arrayOk: boolean;
  dflt: string;
  editType: EditTypeElement;
  description: string;
}

export interface StickyMarker {
  line: LinkLine;
  opacity: PurpleOpacity;
  editType: EditTypeElement;
  role: Role;
  opacitysrc: CustomdataClass;
}

export interface LinkLine {
  color: Hovertemplate;
  width: Namelength;
  editType: EditTypeElement;
  role: Role;
  colorsrc: CustomdataClass;
  widthsrc: CustomdataClass;
}

export interface TentacledSelected {
  marker: LeafClass;
  editType: EditTypeElement;
  role: Role;
}

export interface Zmax {
  valType: ValType;
  role: Role;
  dflt: null;
  editType: EditTypeElement;
  impliedEdits: IndecentImpliedEdits;
  description: string;
}

export interface IndecentImpliedEdits {
  zauto: boolean;
}

export interface ChoroplethmapboxClass {
  meta: ChoroplethmapboxMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ChoroplethAttributes;
}

export interface ChoroplethmapboxMeta {
  hr_name: string;
  description: string;
}

export interface Cone {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ConeAttributes;
}

export interface ConeAttributes {
  type: string;
  visible: Visible;
  legendgroup: Featureidkey;
  name: CustomdataClass;
  uid: CustomdataClass;
  ids: CustomdataClass;
  customdata: CustomdataClass;
  meta: BgcolorClass;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  uirevision: CustomdataClass;
  x: CustomdataClass;
  y: CustomdataClass;
  z: CustomdataClass;
  u?: Alignmentgroup;
  v?: Alignmentgroup;
  w?: Alignmentgroup;
  sizemode?: Alignmentgroup;
  sizeref?: Alignmentgroup;
  anchor?: Direction;
  text: Hovertemplate;
  hovertext: Hovertemplate;
  hovertemplate: Hovertemplate;
  showlegend: Reversescale;
  cauto: Autocolorscale;
  cmin: Cmax;
  cmax: Cmax;
  cmid: Autocolorscale;
  colorscale: MarkerColorscale;
  autocolorscale: Autocolorscale;
  reversescale: Reversescale;
  showscale: Reversescale;
  colorbar: Colorbar;
  coloraxis: MarkerColoraxis;
  opacity: Boxgap;
  lightposition: Lightposition;
  lighting: Lighting;
  hoverinfo: Hoverinfo;
  scene: Featureidkey;
  idssrc: CustomdataClass;
  customdatasrc: CustomdataClass;
  metasrc: CustomdataClass;
  xsrc: CustomdataClass;
  ysrc: CustomdataClass;
  zsrc: CustomdataClass;
  usrc?: Alignmentgroup;
  vsrc?: Alignmentgroup;
  wsrc?: Alignmentgroup;
  textsrc: CustomdataClass;
  hovertextsrc: CustomdataClass;
  hovertemplatesrc: CustomdataClass;
  hoverinfosrc: CustomdataClass;
  value?: CustomdataClass;
  isomin?: CustomdataClass;
  isomax?: CustomdataClass;
  surface?: AttributesSurface;
  spaceframe?: Spaceframe;
  slices?: Slices;
  caps?: Caps;
  flatshading?: Reversescale;
  contour?: AttributesContour;
  valuesrc?: CustomdataClass;
  opacityscale?: Direction;
}

export interface Caps {
  x: Spaceframe;
  y: Spaceframe;
  z: Spaceframe;
  editType: EditTypeElement;
  role: Role;
}

export interface Spaceframe {
  show: Reversescale;
  fill: Boxgap;
  editType: EditTypeElement;
  role: Role;
}

export interface AttributesContour {
  show: Reversescale;
  color: Featureidkey;
  width: Boxgap;
  editType: EditTypeElement;
  role: Role;
}

export interface Lighting {
  vertexnormalsepsilon?: Boxgap;
  facenormalsepsilon?: Boxgap;
  editType: EditTypeElement;
  ambient: Boxgap;
  diffuse: Boxgap;
  specular: Boxgap;
  roughness: Boxgap;
  fresnel: Boxgap;
  role: Role;
}

export interface Lightposition {
  x: Boxgap;
  y: Boxgap;
  z: Boxgap;
  editType: EditTypeElement;
  role: Role;
}

export interface Slices {
  x: SlicesX;
  y: SlicesX;
  z: SlicesX;
  editType: EditTypeElement;
  role: Role;
}

export interface SlicesX {
  show: Reversescale;
  locations: Format;
  fill: Boxgap;
  editType: EditTypeElement;
  role: Role;
  locationssrc: CustomdataClass;
}

export interface Format {
  valType: ValType;
  dflt: any[];
  role: Role;
  description: string;
  editType: EditTypeElement;
}

export interface AttributesSurface {
  show: Reversescale;
  count: Duration;
  fill: Boxgap;
  pattern: Mode;
  editType: EditTypeElement;
  role: Role;
}

export interface Mode {
  valType: ValType;
  flags: string[];
  extras: Extra[];
  dflt: string;
  role: Role;
  description: string;
  editType: EditTypeElement;
}

export interface HeatmapClass {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ContourAttributes;
}

export interface ContourAttributes {
  type: string;
  visible: Visible;
  showlegend?: Reversescale;
  legendgroup?: Featureidkey;
  opacity: Boxgap;
  name: CustomdataClass;
  uid: CustomdataClass;
  ids: CustomdataClass;
  customdata: CustomdataClass;
  meta: BgcolorClass;
  hoverinfo: Hoverinfo;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: CustomdataClass;
  z: CustomdataClass;
  x: AttributesX;
  x0: Dx;
  dx: Dx;
  y: Y;
  y0: Dy;
  dy: Dy;
  text: CustomdataClass;
  hovertext?: CustomdataClass;
  transpose: Reversescale;
  xtype: Xtype;
  ytype: Xtype;
  zhoverformat?: Featureidkey;
  hovertemplate?: Hovertemplate;
  hoverongaps?: Reversescale;
  connectgaps?: Showlegend;
  fillcolor?: Direction;
  autocontour?: Showlegend;
  ncontours?: Clickmode;
  contours?: PurpleContours;
  line?: TentacledLine;
  zauto: Autocolorscale;
  zmin: Zmax;
  zmax: Zmax;
  zmid: Autocolorscale;
  colorscale: MarkerColorscale;
  autocolorscale: Autocolorscale;
  reversescale: Reversescale;
  showscale: Reversescale;
  colorbar: Colorbar;
  coloraxis: MarkerColoraxis;
  xcalendar?: Easing;
  ycalendar?: Easing;
  xaxis: Featureidkey;
  yaxis: Featureidkey;
  idssrc: CustomdataClass;
  customdatasrc: CustomdataClass;
  metasrc: CustomdataClass;
  hoverinfosrc: CustomdataClass;
  zsrc: CustomdataClass;
  xsrc: CustomdataClass;
  ysrc: CustomdataClass;
  textsrc: CustomdataClass;
  hovertextsrc?: CustomdataClass;
  hovertemplatesrc?: CustomdataClass;
  zsmooth?: Showlegend;
  xgap?: Showlegend;
  ygap?: Showlegend;
}

export interface PurpleContours {
  type: Easing;
  start: End;
  end: End;
  size: ContoursSize;
  coloring: Easing;
  showlines: Reversescale;
  showlabels: Reversescale;
  labelfont: TitlefontClass;
  labelformat: Featureidkey;
  operation: Easing;
  value: Offset;
  editType: EditTypeElement;
  impliedEdits: ContoursImpliedEdits;
  role: Role;
}

export interface End {
  valType: ValType;
  dflt: null;
  role: EditTypeElement;
  editType: EditTypeElement;
  impliedEdits: EndImpliedEdits;
  description: string;
}

export interface EndImpliedEdits {
  "^autocontour": boolean;
}

export interface ContoursImpliedEdits {
  autocontour: boolean;
  role: Role;
}

export interface ContoursSize {
  valType: ValType;
  dflt: null;
  min: number;
  role: EditTypeElement;
  editType: EditTypeElement;
  impliedEdits: EndImpliedEdits;
  description: string;
}

export interface Dx {
  valType: ValType;
  dflt: number;
  role: Role;
  editType: EditTypeElement;
  description: string;
  impliedEdits: HilariousImpliedEdits;
}

export interface HilariousImpliedEdits {
  xtype: XtypeEnum;
}

export interface Dy {
  valType: ValType;
  dflt: number;
  role: Role;
  editType: EditTypeElement;
  description: string;
  impliedEdits: AmbitiousImpliedEdits;
}

export interface AmbitiousImpliedEdits {
  ytype: XtypeEnum;
}

export interface TentacledLine {
  color: CustomdataClass;
  width: SizeClass;
  dash: Easing;
  smoothing: Boxgap;
  editType: EditTypeElement;
  role: Role;
}

export interface AttributesX {
  valType: ValType;
  editType: EditTypeElement;
  description: string;
  impliedEdits: HilariousImpliedEdits;
  role: Role;
}

export interface Y {
  valType: ValType;
  editType: EditTypeElement;
  description: string;
  impliedEdits: AmbitiousImpliedEdits;
  role: Role;
}

export interface Contourcarpet {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ContourcarpetAttributes;
}

export interface ContourcarpetAttributes {
  type: string;
  visible: Alignmentgroup;
  showlegend: Alignmentgroup;
  legendgroup: Alignmentgroup;
  opacity: Alignmentgroup;
  name: Alignmentgroup;
  uid: Alignmentgroup;
  ids: Alignmentgroup;
  customdata: Alignmentgroup;
  meta: Alignmentgroup;
  stream: Stream;
  uirevision: Alignmentgroup;
  carpet: Alignmentgroup;
  z: Alignmentgroup;
  a: Alignmentgroup;
  a0: Alignmentgroup;
  da: Alignmentgroup;
  b: Alignmentgroup;
  b0: Alignmentgroup;
  db: Alignmentgroup;
  text: Alignmentgroup;
  hovertext: Alignmentgroup;
  transpose: Alignmentgroup;
  atype: Alignmentgroup;
  btype: Alignmentgroup;
  fillcolor: Alignmentgroup;
  autocontour: Alignmentgroup;
  ncontours: Alignmentgroup;
  contours: PurpleContours;
  line: TentacledLine;
  zauto: Alignmentgroup;
  zmin: Alignmentgroup;
  zmax: Alignmentgroup;
  zmid: Alignmentgroup;
  colorscale: Alignmentgroup;
  autocolorscale: Alignmentgroup;
  reversescale: Alignmentgroup;
  showscale: Alignmentgroup;
  colorbar: Colorbar;
  coloraxis: Alignmentgroup;
  xaxis: Alignmentgroup;
  yaxis: Alignmentgroup;
  idssrc: Alignmentgroup;
  customdatasrc: Alignmentgroup;
  metasrc: Alignmentgroup;
  zsrc: Alignmentgroup;
  asrc: Alignmentgroup;
  bsrc: Alignmentgroup;
  textsrc: Alignmentgroup;
  hovertextsrc: Alignmentgroup;
}

export interface Funnel {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: FunnelAttributes;
  layoutAttributes: FunnelLayoutAttributes;
}

export interface FunnelAttributes {
  type: string;
  visible: Showlegend;
  showlegend: Showlegend;
  legendgroup: Showlegend;
  opacity: Showlegend;
  name: Showlegend;
  uid: Showlegend;
  ids: Showlegend;
  customdata: Showlegend;
  meta: Showlegend;
  selectedpoints: Showlegend;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Showlegend;
  x: Showlegend;
  x0: Showlegend;
  dx: Showlegend;
  y: Showlegend;
  y0: Showlegend;
  dy: Showlegend;
  hovertext: Showlegend;
  hovertemplate: Showlegend;
  hoverinfo: Showlegend;
  textinfo: Showlegend;
  texttemplate: Showlegend;
  text: Showlegend;
  textposition: Showlegend;
  insidetextanchor: Showlegend;
  textangle: Showlegend;
  textfont: InsidetextfontClass;
  insidetextfont: InsidetextfontClass;
  outsidetextfont: InsidetextfontClass;
  constraintext: Showlegend;
  cliponaxis: Alignmentgroup;
  orientation: Showlegend;
  offset: Showlegend;
  width: Showlegend;
  marker: FluffyMarker;
  connector: Connector;
  offsetgroup: Showlegend;
  alignmentgroup: Alignmentgroup;
  xaxis: Showlegend;
  yaxis: Showlegend;
  idssrc: Showlegend;
  customdatasrc: Showlegend;
  metasrc: Showlegend;
  xsrc: Showlegend;
  ysrc: Showlegend;
  hovertextsrc: Showlegend;
  hovertemplatesrc: Showlegend;
  hoverinfosrc: Showlegend;
  texttemplatesrc: Showlegend;
  textsrc: Showlegend;
  textpositionsrc: Showlegend;
}

export interface Connector {
  fillcolor?: Showlegend;
  line: ConnectorLine;
  visible: Reversescale;
  editType: EditTypeElement;
  role: Role;
  mode?: Fromcurrent;
}

export interface ConnectorLine {
  color: Featureidkey;
  width: Duration;
  dash: Easing;
  editType: EditTypeElement;
  role: Role;
}

export interface FunnelLayoutAttributes {
  funnelmode: Selectdirection;
  funnelgap: Selectdirection;
  funnelgroupgap: Selectdirection;
}

export interface Funnelarea {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: FunnelareaAttributes;
  layoutAttributes: FunnelareaLayoutAttributes;
}

export interface FunnelareaAttributes {
  type: string;
  visible: Clickmode;
  showlegend: Direction;
  legendgroup: Fromcurrent;
  opacity: Direction;
  name: Direction;
  uid: Clickmode;
  ids: Fromcurrent;
  customdata: Fromcurrent;
  meta: Direction;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Clickmode;
  labels: Fromcurrent;
  label0: Fromcurrent;
  dlabel: Fromcurrent;
  values: Clickmode;
  marker: IndigoMarker;
  text: Direction;
  hovertext: Fromcurrent;
  scalegroup: Direction;
  textinfo: Direction;
  texttemplate: Direction;
  hoverinfo: Fromcurrent;
  hovertemplate: Fromcurrent;
  textposition: Direction;
  textfont: InsidetextfontClass;
  insidetextfont: InsidetextfontClass;
  title: PurpleTitle;
  domain: GeoDomain;
  aspectratio: Fromcurrent;
  baseratio: Fromcurrent;
  idssrc: Fromcurrent;
  customdatasrc: Fromcurrent;
  metasrc: Direction;
  labelssrc: Fromcurrent;
  valuessrc: Clickmode;
  textsrc: Direction;
  hovertextsrc: Fromcurrent;
  texttemplatesrc: Direction;
  hoverinfosrc: Fromcurrent;
  hovertemplatesrc: Fromcurrent;
  textpositionsrc: Direction;
}

export interface IndigoMarker {
  colors: DoubleClickDelay;
  line: StickyLine;
  editType: EditTypeElement;
  role: Role;
  colorssrc: DoubleClickDelay;
}

export interface StickyLine {
  color: Hovertemplate;
  width: Direction;
  editType: EditTypeElement;
  role: Role;
  colorsrc: Direction;
  widthsrc: Direction;
}

export interface PurpleTitle {
  text: Clickmode;
  font: InsidetextfontClass;
  position: Clickmode;
  editType: EditTypeElement;
  role: Role;
}

export interface FunnelareaLayoutAttributes {
  hiddenlabels: Alignmentgroup;
  funnelareacolorway: Alignmentgroup;
  extendfunnelareacolors: Alignmentgroup;
  hiddenlabelssrc: Alignmentgroup;
}

export interface Histogram {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: HistogramAttributes;
  layoutAttributes: BarLayoutAttributes;
}

export interface HistogramAttributes {
  type: string;
  visible: Fromcurrent;
  showlegend: Fromcurrent;
  legendgroup: Fromcurrent;
  opacity: Fromcurrent;
  name: Fromcurrent;
  uid: Fromcurrent;
  ids: Fromcurrent;
  customdata: Fromcurrent;
  meta: Fromcurrent;
  selectedpoints: Fromcurrent;
  hoverinfo: Fromcurrent;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Fromcurrent;
  x: Fromcurrent;
  y: DoubleClickDelay;
  text: Fromcurrent;
  hovertext: Fromcurrent;
  orientation: Fromcurrent;
  histfunc: Fromcurrent;
  histnorm: Fromcurrent;
  cumulative: Cumulative;
  nbinsx: Fromcurrent;
  xbins: Bins;
  nbinsy: Fromcurrent;
  ybins: Bins;
  autobinx: Selectdirection;
  autobiny: Selectdirection;
  bingroup: Selectdirection;
  hovertemplate: Fromcurrent;
  marker: FluffyMarker;
  offsetgroup: Fromcurrent;
  alignmentgroup: Selectdirection;
  selected: PurpleSelected;
  unselected: PurpleSelected;
  _deprecated: FluffyDeprecated;
  error_x: Error;
  error_y: Error;
  xcalendar: DoubleClickDelay;
  ycalendar: DoubleClickDelay;
  xaxis: Fromcurrent;
  yaxis: DoubleClickDelay;
  idssrc: Fromcurrent;
  customdatasrc: Fromcurrent;
  metasrc: Fromcurrent;
  hoverinfosrc: Fromcurrent;
  xsrc: DoubleClickDelay;
  ysrc: DoubleClickDelay;
  textsrc: Fromcurrent;
  hovertextsrc: Fromcurrent;
  hovertemplatesrc: Fromcurrent;
}

export interface Cumulative {
  enabled: Fromcurrent;
  direction: Fromcurrent;
  currentbin: Fromcurrent;
  editType: EditTypeElement;
  role: Role;
}

export interface Bins {
  start: CustomdataClass;
  end: CustomdataClass;
  size: CustomdataClass;
  editType: EditTypeElement;
  role: Role;
}

export interface Histogram2D {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: Histogram2DAttributes;
}

export interface Histogram2DAttributes {
  type: string;
  visible: Direction;
  legendgroup: Direction;
  opacity: Direction;
  name: Direction;
  uid: Direction;
  ids: Direction;
  customdata: Direction;
  meta: Direction;
  hoverinfo: Direction;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Direction;
  x: Direction;
  y: Direction;
  z: Direction;
  marker: NewshapeLine;
  histnorm: Direction;
  histfunc: Direction;
  nbinsx: Direction;
  xbins: Bins;
  nbinsy: Direction;
  ybins: Bins;
  autobinx: Direction;
  autobiny: Direction;
  bingroup: Direction;
  xbingroup: Direction;
  ybingroup: Direction;
  xgap?: Direction;
  ygap?: Direction;
  zsmooth?: Direction;
  zhoverformat: Direction;
  hovertemplate: Direction;
  showlegend: Direction;
  zauto: Direction;
  zmin: Direction;
  zmax: Direction;
  zmid: Direction;
  colorscale: Direction;
  autocolorscale: Direction;
  reversescale: Direction;
  showscale: Direction;
  colorbar: Colorbar;
  coloraxis: Direction;
  xcalendar: Direction;
  ycalendar: Direction;
  xaxis: Direction;
  yaxis: Direction;
  idssrc: Direction;
  customdatasrc: Direction;
  metasrc: Direction;
  hoverinfosrc: Direction;
  xsrc: Direction;
  ysrc: Direction;
  zsrc: Direction;
  hovertemplatesrc: Direction;
  autocontour?: Direction;
  ncontours?: Direction;
  contours?: PurpleContours;
  line?: NewshapeLine;
}

export interface TracesImage {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  type: string;
  visible: Clickmode;
  opacity: Clickmode;
  name: Clickmode;
  uid: Clickmode;
  ids: Clickmode;
  customdata: Clickmode;
  meta: Clickmode;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  uirevision: Clickmode;
  z: Clickmode;
  colormodel: Clickmode;
  zmin: Clickmode;
  zmax: Clickmode;
  x0: Clickmode;
  y0: Clickmode;
  dx: Clickmode;
  dy: Clickmode;
  text: Clickmode;
  hovertext: Clickmode;
  hoverinfo: Clickmode;
  hovertemplate: Clickmode;
  xaxis: Clickmode;
  yaxis: Clickmode;
  idssrc: Clickmode;
  customdatasrc: Clickmode;
  metasrc: Clickmode;
  zsrc: Clickmode;
  textsrc: Clickmode;
  hovertextsrc: Clickmode;
  hoverinfosrc: Clickmode;
  hovertemplatesrc: Clickmode;
}

export interface Indicator {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: IndicatorAttributes;
}

export interface IndicatorAttributes {
  type: string;
  visible: Clickmode;
  name: Direction;
  uid: Clickmode;
  ids: Direction;
  customdata: Alignmentgroup;
  meta: Direction;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Clickmode;
  mode: Direction;
  value: Clickmode;
  align: Alignmentgroup;
  domain: GeoDomain;
  title: ColorbarTitle;
  number: Number;
  delta: Delta;
  gauge: Gauge;
  idssrc: Direction;
  customdatasrc: Alignmentgroup;
  metasrc: Direction;
}

export interface Delta {
  reference: Showlegend;
  position: Showlegend;
  relative: Showlegend;
  valueformat: Showlegend;
  increasing: DecreasingClass;
  decreasing: DecreasingClass;
  font: TitlefontClass;
  editType: EditTypeElement;
  role: Role;
}

export interface Gauge {
  shape: Fromcurrent;
  bar: GaugeBar;
  bgcolor: Fromcurrent;
  bordercolor: Fromcurrent;
  borderwidth: Fromcurrent;
  axis: GaugeAxis;
  steps: GaugeSteps;
  threshold: Threshold;
  description: string;
  editType: EditTypeElement;
  role: Role;
}

export interface GaugeAxis {
  range: Selectdirection;
  visible: Selectdirection;
  tickmode: Selectdirection;
  nticks: Selectdirection;
  tick0: Selectdirection;
  dtick: Selectdirection;
  tickvals: Selectdirection;
  ticktext: Selectdirection;
  ticks: Selectdirection;
  ticklen: Selectdirection;
  tickwidth: Selectdirection;
  tickcolor: Selectdirection;
  showticklabels: Selectdirection;
  tickfont: TitlefontClass;
  tickangle: Selectdirection;
  tickformat: Selectdirection;
  tickformatstops: Tickformatstops;
  tickprefix: Selectdirection;
  showtickprefix: Selectdirection;
  ticksuffix: Selectdirection;
  showticksuffix: Selectdirection;
  separatethousands: Selectdirection;
  exponentformat: Selectdirection;
  showexponent: Selectdirection;
  editType: EditTypeElement;
  role: Role;
  tickvalssrc: Selectdirection;
  ticktextsrc: Selectdirection;
}

export interface GaugeBar {
  color: Fromcurrent;
  line: NewshapeLine;
  thickness: Fromcurrent;
  editType: EditTypeElement;
  description: string;
  role: Role;
}

export interface GaugeSteps {
  items: StickyItems;
  role: Role;
}

export interface StickyItems {
  step: FluffyStep;
}

export interface FluffyStep {
  color: DoubleClickDelay;
  line: NewshapeLine;
  thickness: DoubleClickDelay;
  editType: EditTypeElement;
  range: DoubleClickDelay;
  name: DoubleClickDelay;
  templateitemname: DoubleClickDelay;
  role: Role;
}

export interface Threshold {
  line: NewshapeLine;
  thickness: Direction;
  value: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface Number {
  valueformat: Clickmode;
  font: TitlefontClass;
  prefix: Clickmode;
  suffix: Clickmode;
  editType: EditTypeElement;
  role: Role;
}

export interface Mesh3D {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: Mesh3DAttributes;
}

export interface Mesh3DAttributes {
  type: string;
  visible: Direction;
  legendgroup: Direction;
  name: Direction;
  uid: Direction;
  ids: Direction;
  customdata: Direction;
  meta: Direction;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  uirevision: Direction;
  x: Direction;
  y: Direction;
  z: Direction;
  i: Direction;
  j: Direction;
  k: Direction;
  text: Direction;
  hovertext: Direction;
  hovertemplate: Direction;
  delaunayaxis: Direction;
  alphahull: DoubleClickDelay;
  intensity: Direction;
  intensitymode: Direction;
  color: DoubleClickDelay;
  vertexcolor: Direction;
  facecolor: Direction;
  cauto: DoubleClickDelay;
  cmin: DoubleClickDelay;
  cmax: DoubleClickDelay;
  cmid: DoubleClickDelay;
  colorscale: Direction;
  autocolorscale: DoubleClickDelay;
  reversescale: Direction;
  showscale: Direction;
  colorbar: Colorbar;
  coloraxis: DoubleClickDelay;
  opacity: Direction;
  flatshading: Direction;
  contour: AttributesContour;
  lightposition: Lightposition;
  lighting: Lighting;
  hoverinfo: Direction;
  showlegend: Direction;
  xcalendar: Direction;
  ycalendar: Direction;
  zcalendar: Direction;
  scene: Direction;
  idssrc: Direction;
  customdatasrc: Direction;
  metasrc: Direction;
  xsrc: Direction;
  ysrc: Direction;
  zsrc: Direction;
  isrc: Direction;
  jsrc: Direction;
  ksrc: Direction;
  textsrc: Direction;
  hovertextsrc: Direction;
  hovertemplatesrc: Direction;
  intensitysrc: Direction;
  vertexcolorsrc: Direction;
  facecolorsrc: Direction;
  hoverinfosrc: Direction;
}

export interface Ohlc {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: OhlcAttributes;
}

export interface OhlcAttributes {
  type: string;
  visible: Alignmentgroup;
  showlegend: Alignmentgroup;
  legendgroup: Alignmentgroup;
  opacity: Alignmentgroup;
  name: Alignmentgroup;
  uid: Alignmentgroup;
  ids: Alignmentgroup;
  customdata: Clickmode;
  meta: Alignmentgroup;
  selectedpoints: Alignmentgroup;
  hoverinfo: Alignmentgroup;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Alignmentgroup;
  x: Alignmentgroup;
  open: Alignmentgroup;
  high: Alignmentgroup;
  low: Alignmentgroup;
  close: Clickmode;
  line: NewshapeLine;
  increasing: FluffyCreasing;
  decreasing: FluffyCreasing;
  text: Alignmentgroup;
  hovertext: Alignmentgroup;
  tickwidth: Alignmentgroup;
  hoverlabel: AttributesHoverlabel;
  xcalendar: Alignmentgroup;
  xaxis: Alignmentgroup;
  yaxis: Alignmentgroup;
  idssrc: Alignmentgroup;
  customdatasrc: Clickmode;
  metasrc: Alignmentgroup;
  hoverinfosrc: Alignmentgroup;
  xsrc: Alignmentgroup;
  opensrc: Alignmentgroup;
  highsrc: Alignmentgroup;
  lowsrc: Alignmentgroup;
  closesrc: Clickmode;
  textsrc: Alignmentgroup;
  hovertextsrc: Alignmentgroup;
}

export interface FluffyCreasing {
  line: IndigoLine;
  editType: EditTypeElement;
  role: Role;
}

export interface IndigoLine {
  color: Alignmentgroup;
  width: Alignmentgroup;
  dash: Alignmentgroup;
  editType: EditTypeElement;
  role: Role;
}

export interface Parcats {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ParcatsAttributes;
}

export interface ParcatsAttributes {
  type: string;
  visible: Selectdirection;
  name: Selectdirection;
  uid: Selectdirection;
  meta: Selectdirection;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Selectdirection;
  domain: GeoDomain;
  hoverinfo: Selectdirection;
  hoveron: Selectdirection;
  hovertemplate: Selectdirection;
  arrangement: Showlegend;
  bundlecolors: Showlegend;
  sortpaths: Selectdirection;
  labelfont: TitlefontClass;
  tickfont: TitlefontClass;
  dimensions: PurpleDimensions;
  line: LineClass;
  counts: Showlegend;
  metasrc: Selectdirection;
  countssrc: Showlegend;
}

export interface PurpleDimensions {
  items: IndigoItems;
  role: Role;
}

export interface IndigoItems {
  dimension: PurpleDimension;
}

export interface PurpleDimension {
  label: Selectdirection;
  categoryorder: Selectdirection;
  categoryarray: Selectdirection;
  ticktext: Selectdirection;
  values: Selectdirection;
  displayindex: Selectdirection;
  editType: EditTypeElement;
  description: string;
  visible: Selectdirection;
  role: Role;
  categoryarraysrc: Selectdirection;
  ticktextsrc: Selectdirection;
  valuessrc: Selectdirection;
}

export interface Parcoords {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ParcoordsAttributes;
}

export interface ParcoordsAttributes {
  type: string;
  visible: Fromcurrent;
  name: Fromcurrent;
  uid: Fromcurrent;
  ids: Selectdirection;
  customdata: DoubleClickDelay;
  meta: Fromcurrent;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Fromcurrent;
  domain: GeoDomain;
  labelangle: Selectdirection;
  labelside: Selectdirection;
  labelfont: TitlefontClass;
  tickfont: TitlefontClass;
  rangefont: TitlefontClass;
  dimensions: FluffyDimensions;
  line: IndecentLine;
  idssrc: Selectdirection;
  customdatasrc: DoubleClickDelay;
  metasrc: Fromcurrent;
}

export interface FluffyDimensions {
  items: IndecentItems;
  role: Role;
}

export interface IndecentItems {
  dimension: FluffyDimension;
}

export interface FluffyDimension {
  label: Selectdirection;
  tickvals: Selectdirection;
  ticktext: Selectdirection;
  tickformat: Selectdirection;
  visible: Selectdirection;
  range: Selectdirection;
  constraintrange: Selectdirection;
  multiselect: Selectdirection;
  values: Selectdirection;
  editType: EditTypeElement;
  description: string;
  name: Selectdirection;
  templateitemname: Selectdirection;
  role: Role;
  tickvalssrc: Selectdirection;
  ticktextsrc: Selectdirection;
  valuessrc: Selectdirection;
}

export interface IndecentLine {
  editType: EditTypeElement;
  color: Fromcurrent;
  cauto: Fromcurrent;
  cmin: Fromcurrent;
  cmax: Fromcurrent;
  cmid: Fromcurrent;
  colorscale: Fromcurrent;
  autocolorscale: Fromcurrent;
  reversescale: Fromcurrent;
  showscale: Fromcurrent;
  colorbar: Colorbar;
  coloraxis: Fromcurrent;
  role: Role;
  colorsrc: Fromcurrent;
}

export interface Pie {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: PieAttributes;
  layoutAttributes: PieLayoutAttributes;
}

export interface PieAttributes {
  type: string;
  visible: Showlegend;
  showlegend: Alignmentgroup;
  legendgroup: Clickmode;
  opacity: Alignmentgroup;
  name: Alignmentgroup;
  uid: Showlegend;
  ids: Clickmode;
  customdata: Clickmode;
  meta: Alignmentgroup;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Showlegend;
  labels: Clickmode;
  label0: Clickmode;
  dlabel: Clickmode;
  values: Showlegend;
  marker: IndecentMarker;
  text: Alignmentgroup;
  hovertext: Clickmode;
  scalegroup: Alignmentgroup;
  textinfo: Alignmentgroup;
  hoverinfo: Clickmode;
  hovertemplate: Clickmode;
  texttemplate: Alignmentgroup;
  textposition: Alignmentgroup;
  textfont: InsidetextfontClass;
  insidetextorientation: Clickmode;
  insidetextfont: InsidetextfontClass;
  outsidetextfont: InsidetextfontClass;
  automargin: Clickmode;
  title: FluffyTitle;
  domain: GeoDomain;
  hole: Clickmode;
  sort: Alignmentgroup;
  direction: Clickmode;
  rotation: Alignmentgroup;
  pull: Alignmentgroup;
  _deprecated: StickyDeprecated;
  idssrc: Clickmode;
  customdatasrc: Clickmode;
  metasrc: Alignmentgroup;
  labelssrc: Clickmode;
  valuessrc: Showlegend;
  textsrc: Alignmentgroup;
  hovertextsrc: Clickmode;
  hoverinfosrc: Clickmode;
  hovertemplatesrc: Clickmode;
  texttemplatesrc: Alignmentgroup;
  textpositionsrc: Alignmentgroup;
  pullsrc: Alignmentgroup;
}

export interface StickyDeprecated {
  title: Direction;
  titlefont: Titlefont;
  titleposition: Clickmode;
}

export interface Titlefont {
  family: Family;
  size: Clickmode;
  color: Clickmode;
  editType: EditTypeElement;
  description: string;
}

export interface IndecentMarker {
  colors: Alignmentgroup;
  line: LinkLine;
  editType: EditTypeElement;
  role: Role;
  colorssrc: Alignmentgroup;
}

export interface FluffyTitle {
  text: Showlegend;
  font: InsidetextfontClass;
  position: Showlegend;
  editType: EditTypeElement;
  role: Role;
}

export interface PieLayoutAttributes {
  hiddenlabels: DoubleClickDelay;
  piecolorway: DoubleClickDelay;
  extendpiecolors: DoubleClickDelay;
  hiddenlabelssrc: DoubleClickDelay;
}

export interface Pointcloud {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: PointcloudAttributes;
}

export interface PointcloudAttributes {
  type: string;
  visible: Direction;
  showlegend: Direction;
  legendgroup: Selectdirection;
  opacity: Direction;
  name: Direction;
  uid: Direction;
  ids: Selectdirection;
  customdata: Selectdirection;
  meta: Direction;
  hoverinfo: Selectdirection;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  uirevision: Direction;
  x: Direction;
  y: Direction;
  xy: Direction;
  indices: Selectdirection;
  xbounds: Direction;
  ybounds: Direction;
  text: Direction;
  marker: HilariousMarker;
  xaxis: Direction;
  yaxis: Direction;
  idssrc: Selectdirection;
  customdatasrc: Selectdirection;
  metasrc: Direction;
  hoverinfosrc: Selectdirection;
  xsrc: Direction;
  ysrc: Direction;
  xysrc: Direction;
  indicessrc: Selectdirection;
  xboundssrc: Direction;
  yboundssrc: Direction;
  textsrc: Direction;
}

export interface HilariousMarker {
  color: Direction;
  opacity: Direction;
  blend: Fromcurrent;
  sizemin: Direction;
  sizemax: Direction;
  border: Border;
  editType: EditTypeElement;
  role: Role;
}

export interface Border {
  color: BgcolorClass;
  arearatio?: Direction;
  editType: EditTypeElement;
  role: Role;
  line?: Border;
  width?: Clickmode;
}

export interface Sankey {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: SankeyAttributes;
}

export interface SankeyAttributes {
  type: string;
  visible: Selectdirection;
  name: Showlegend;
  uid: Selectdirection;
  ids: Clickmode;
  customdata: Clickmode;
  meta: Showlegend;
  selectedpoints: Selectdirection;
  stream: Stream;
  uirevision: Selectdirection;
  hoverinfo: Clickmode;
  hoverlabel: AttributesHoverlabel;
  domain: GeoDomain;
  orientation: Selectdirection;
  valueformat: Selectdirection;
  valuesuffix: Selectdirection;
  arrangement: Clickmode;
  textfont: TitlefontClass;
  node: Node;
  link: Link;
  idssrc: Clickmode;
  customdatasrc: Clickmode;
  metasrc: Showlegend;
}

export interface Link {
  label: Showlegend;
  color: Alignmentgroup;
  customdata: Showlegend;
  line: LinkLine;
  source: Showlegend;
  target: Showlegend;
  value: Showlegend;
  hoverinfo: Showlegend;
  hoverlabel: AttributesHoverlabel;
  hovertemplate: Showlegend;
  colorscales: Colorscales;
  description: string;
  role: Role;
  editType: EditTypeElement;
  labelsrc: Showlegend;
  colorsrc: Showlegend;
  customdatasrc: Showlegend;
  sourcesrc: Showlegend;
  targetsrc: Showlegend;
  valuesrc: Showlegend;
  hovertemplatesrc: Showlegend;
}

export interface Colorscales {
  items: ColorscalesItems;
  role: Role;
}

export interface ColorscalesItems {
  concentrationscales: Concentrationscales;
}

export interface Concentrationscales {
  editType: EditTypeElement;
  label: Showlegend;
  cmax: Showlegend;
  cmin: Showlegend;
  colorscale: Showlegend;
  name: Showlegend;
  templateitemname: Showlegend;
  role: Role;
}

export interface Node {
  label: Selectdirection;
  groups: Groups;
  x: Selectdirection;
  y: Selectdirection;
  color: DoubleClickDelay;
  customdata: DoubleClickDelay;
  line: LinkLine;
  pad: Selectdirection;
  thickness: Selectdirection;
  hoverinfo: Selectdirection;
  hoverlabel: AttributesHoverlabel;
  hovertemplate: Selectdirection;
  description: string;
  editType: EditTypeElement;
  role: Role;
  labelsrc: Selectdirection;
  xsrc: Selectdirection;
  ysrc: Selectdirection;
  colorsrc: DoubleClickDelay;
  customdatasrc: DoubleClickDelay;
  hovertemplatesrc: Selectdirection;
}

export interface Groups {
  valType: ValType;
  impliedEdits: CunningImpliedEdits;
  dimensions: number;
  freeLength: boolean;
  dflt: any[];
  items: ItemsElement;
  role: Role;
  description: string;
  editType: EditTypeElement;
}

export interface CunningImpliedEdits {
  x: any[];
  y: any[];
}

export interface ScatterClass {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ScatterAttributes;
}

export interface ScatterAttributes {
  type: string;
  visible: Showlegend;
  showlegend: Showlegend;
  legendgroup: Fromcurrent;
  opacity: Showlegend;
  name: Showlegend;
  uid: Showlegend;
  ids: Fromcurrent;
  customdata: Fromcurrent;
  meta: Showlegend;
  selectedpoints: Showlegend;
  hoverinfo: Fromcurrent;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Showlegend;
  x: Showlegend;
  x0: Showlegend;
  dx: Fromcurrent;
  y: Showlegend;
  y0: Showlegend;
  dy: Fromcurrent;
  stackgroup: Showlegend;
  orientation: Showlegend;
  groupnorm: Fromcurrent;
  stackgaps: Showlegend;
  text: Showlegend;
  texttemplate: Showlegend;
  hovertext: Fromcurrent;
  mode: Showlegend;
  hoveron: Fromcurrent;
  hovertemplate: Fromcurrent;
  line: HilariousLine;
  connectgaps: Fromcurrent;
  cliponaxis: Fromcurrent;
  fill: Fromcurrent;
  fillcolor: Fromcurrent;
  marker: AmbitiousMarker;
  selected: FluffySelected;
  unselected: FluffySelected;
  textposition: Showlegend;
  textfont: InsidetextfontClass;
  r: Showlegend;
  t: Showlegend;
  error_x: Error;
  error_y: Error;
  xcalendar: Showlegend;
  ycalendar: Showlegend;
  xaxis: Showlegend;
  yaxis: Showlegend;
  idssrc: Fromcurrent;
  customdatasrc: Fromcurrent;
  metasrc: Showlegend;
  hoverinfosrc: Fromcurrent;
  xsrc: Showlegend;
  ysrc: Showlegend;
  textsrc: Showlegend;
  texttemplatesrc: Showlegend;
  hovertextsrc: Fromcurrent;
  hovertemplatesrc: Fromcurrent;
  textpositionsrc: Showlegend;
  rsrc: Showlegend;
  tsrc: Showlegend;
}

export interface HilariousLine {
  color: Direction;
  width: Direction;
  shape: Direction;
  smoothing: Direction;
  dash: Direction;
  simplify: Direction;
  editType: EditTypeElement;
  role: Role;
}

export interface AmbitiousMarker {
  symbol: Showlegend;
  opacity: Showlegend;
  size: Showlegend;
  maxdisplayed: Showlegend;
  sizeref: Showlegend;
  sizemin: Showlegend;
  sizemode: Showlegend;
  line: AmbitiousLine;
  gradient: Gradient;
  editType: EditTypeElement;
  color: Clickmode;
  cauto: Clickmode;
  cmin: Clickmode;
  cmax: Clickmode;
  cmid: Clickmode;
  colorscale: Clickmode;
  autocolorscale: Clickmode;
  reversescale: Showlegend;
  showscale: Showlegend;
  colorbar: Colorbar;
  coloraxis: Clickmode;
  role: Role;
  symbolsrc: Showlegend;
  opacitysrc: Showlegend;
  sizesrc: Showlegend;
  colorsrc: Clickmode;
}

export interface Gradient {
  type: Textposition;
  color: BgcolorClass;
  editType: EditTypeElement;
  role: Role;
  typesrc: CustomdataClass;
  colorsrc: CustomdataClass;
}

export interface AmbitiousLine {
  width: Showlegend;
  editType: EditTypeElement;
  color: Showlegend;
  cauto: Showlegend;
  cmin: Showlegend;
  cmax: Showlegend;
  cmid: Showlegend;
  colorscale: Showlegend;
  autocolorscale: Showlegend;
  reversescale: Showlegend;
  coloraxis: Showlegend;
  role: Role;
  widthsrc: Showlegend;
  colorsrc: Showlegend;
}

export interface Scatter3D {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: Scatter3DAttributes;
}

export interface Scatter3DAttributes {
  type: string;
  visible: Fromcurrent;
  showlegend: Fromcurrent;
  legendgroup: DoubleClickDelay;
  opacity: Selectdirection;
  name: Selectdirection;
  uid: Fromcurrent;
  ids: DoubleClickDelay;
  customdata: DoubleClickDelay;
  meta: Selectdirection;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Fromcurrent;
  x: Fromcurrent;
  y: Fromcurrent;
  z: Fromcurrent;
  text: Fromcurrent;
  texttemplate: Fromcurrent;
  hovertext: DoubleClickDelay;
  hovertemplate: DoubleClickDelay;
  mode: Selectdirection;
  surfaceaxis: Resolution;
  surfacecolor: Fromcurrent;
  projection: AttributesProjection;
  connectgaps: DoubleClickDelay;
  line: LineClass;
  marker: CunningMarker;
  textposition: Fromcurrent;
  textfont: InsidetextfontClass;
  hoverinfo: DoubleClickDelay;
  error_x: Error;
  error_y: Error;
  error_z: Error;
  xcalendar: Fromcurrent;
  ycalendar: Fromcurrent;
  zcalendar: Fromcurrent;
  scene: Fromcurrent;
  idssrc: DoubleClickDelay;
  customdatasrc: DoubleClickDelay;
  metasrc: Selectdirection;
  xsrc: Fromcurrent;
  ysrc: Fromcurrent;
  zsrc: Fromcurrent;
  textsrc: Fromcurrent;
  texttemplatesrc: Fromcurrent;
  hovertextsrc: DoubleClickDelay;
  hovertemplatesrc: DoubleClickDelay;
  textpositionsrc: Fromcurrent;
  hoverinfosrc: DoubleClickDelay;
}

export interface CunningMarker {
  symbol: Selectdirection;
  size: Selectdirection;
  sizeref: Selectdirection;
  sizemin: Selectdirection;
  sizemode: Selectdirection;
  opacity: Selectdirection;
  colorbar: Colorbar;
  line: LineClass;
  color: Selectdirection;
  cauto: Selectdirection;
  cmin: Selectdirection;
  cmax: Selectdirection;
  cmid: Selectdirection;
  colorscale: Selectdirection;
  autocolorscale: Selectdirection;
  reversescale: Selectdirection;
  showscale: Selectdirection;
  coloraxis: Selectdirection;
  editType: EditTypeElement;
  role: Role;
  symbolsrc: Selectdirection;
  sizesrc: Selectdirection;
  colorsrc: Selectdirection;
}

export interface AttributesProjection {
  x: ProjectionX;
  y: ProjectionX;
  z: ProjectionX;
  editType: EditTypeElement;
  role: Role;
}

export interface ProjectionX {
  show: Fromcurrent;
  opacity: Fromcurrent;
  scale: Fromcurrent;
  editType: EditTypeElement;
  role: Role;
}

export interface ScattercarpetClass {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ScattercarpetAttributes;
}

export interface ScattercarpetAttributes {
  type: string;
  visible: Visible;
  showlegend: Reversescale;
  legendgroup: Fromcurrent;
  opacity: Boxgap;
  name: CustomdataClass;
  uid: CustomdataClass;
  ids: Fromcurrent;
  customdata: Fromcurrent;
  meta: BgcolorClass;
  selectedpoints: CustomdataClass;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: CustomdataClass;
  carpet?: Fromcurrent;
  a: Fromcurrent;
  b: Fromcurrent;
  mode: Mode;
  text: Hovertemplate;
  texttemplate: Hovertemplate;
  hovertext: Fromcurrent;
  line: NewshapeLine;
  connectgaps: Fromcurrent;
  fill: Fromcurrent;
  fillcolor: Fromcurrent;
  marker: MagentaMarker;
  textfont: InsidetextfontClass;
  textposition: Textposition;
  selected: FluffySelected;
  unselected: FluffySelected;
  hoverinfo: Fromcurrent;
  hoveron: Fromcurrent;
  hovertemplate: Fromcurrent;
  xaxis?: Direction;
  yaxis?: Direction;
  idssrc: Fromcurrent;
  customdatasrc: Fromcurrent;
  metasrc: CustomdataClass;
  asrc: Fromcurrent;
  bsrc: Fromcurrent;
  textsrc: CustomdataClass;
  texttemplatesrc: CustomdataClass;
  hovertextsrc: Fromcurrent;
  textpositionsrc: CustomdataClass;
  hoverinfosrc: Fromcurrent;
  hovertemplatesrc: Fromcurrent;
  c?: Fromcurrent;
  sum?: Fromcurrent;
  cliponaxis?: Fromcurrent;
  subplot?: Fromcurrent;
  csrc?: Fromcurrent;
}

export interface MagentaMarker {
  symbol: MarkerSymbol;
  opacity: FluffyOpacity;
  maxdisplayed?: Duration;
  size: Namelength;
  sizeref: Offset;
  sizemin: Duration;
  sizemode: Easing;
  line: LineClass;
  gradient?: Gradient;
  editType: EditTypeElement;
  color: BgcolorClass;
  cauto: Autocolorscale;
  cmin: Cmax;
  cmax: Cmax;
  cmid: Autocolorscale;
  colorscale: MarkerColorscale;
  autocolorscale: Autocolorscale;
  reversescale: Reversescale;
  showscale: Reversescale;
  colorbar: Colorbar;
  coloraxis: MarkerColoraxis;
  role: Role;
  symbolsrc: CustomdataClass;
  opacitysrc: CustomdataClass;
  sizesrc: CustomdataClass;
  colorsrc: CustomdataClass;
}

export interface FluffyOpacity {
  valType: ValType;
  min: number;
  max: number;
  arrayOk: boolean;
  role: EditTypeElement;
  editType: EditTypeElement;
  description: string;
}

export interface Scattergeo {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ScattergeoAttributes;
}

export interface ScattergeoAttributes {
  type: string;
  visible: Clickmode;
  showlegend: Clickmode;
  legendgroup: Clickmode;
  opacity: Clickmode;
  name: Clickmode;
  uid: Clickmode;
  ids: Clickmode;
  customdata: Clickmode;
  meta: Clickmode;
  selectedpoints: Clickmode;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Clickmode;
  lon: Clickmode;
  lat: Clickmode;
  locations: Clickmode;
  locationmode: Clickmode;
  geojson: Clickmode;
  featureidkey: Clickmode;
  mode: Clickmode;
  text: Clickmode;
  texttemplate: Clickmode;
  hovertext: Clickmode;
  textfont: InsidetextfontClass;
  textposition: Clickmode;
  line: NewshapeLine;
  connectgaps: Clickmode;
  marker: MagentaMarker;
  fill: Clickmode;
  fillcolor: Clickmode;
  selected: FluffySelected;
  unselected: FluffySelected;
  hoverinfo: Clickmode;
  hovertemplate: Clickmode;
  geo: Clickmode;
  idssrc: Clickmode;
  customdatasrc: Clickmode;
  metasrc: Clickmode;
  lonsrc: Clickmode;
  latsrc: Clickmode;
  locationssrc: Clickmode;
  textsrc: Clickmode;
  texttemplatesrc: Clickmode;
  hovertextsrc: Clickmode;
  textpositionsrc: Clickmode;
  hoverinfosrc: Clickmode;
  hovertemplatesrc: Clickmode;
}

export interface Scattergl {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ScatterglAttributes;
}

export interface ScatterglAttributes {
  type: string;
  visible: Alignmentgroup;
  showlegend: Alignmentgroup;
  legendgroup: Alignmentgroup;
  name: Alignmentgroup;
  uid: Alignmentgroup;
  ids: Alignmentgroup;
  customdata: Alignmentgroup;
  meta: Alignmentgroup;
  selectedpoints: Alignmentgroup;
  hoverinfo: Alignmentgroup;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Alignmentgroup;
  x: Alignmentgroup;
  x0: Alignmentgroup;
  dx: Alignmentgroup;
  y: Alignmentgroup;
  y0: Alignmentgroup;
  dy: Alignmentgroup;
  text: Alignmentgroup;
  hovertext: Alignmentgroup;
  textposition: Alignmentgroup;
  textfont: InsidetextfontClass;
  mode: Alignmentgroup;
  line: NewshapeLine;
  marker: MagentaMarker;
  connectgaps: Alignmentgroup;
  fill: Alignmentgroup;
  fillcolor: Alignmentgroup;
  selected: FluffySelected;
  unselected: FluffySelected;
  opacity: Alignmentgroup;
  hovertemplate: Alignmentgroup;
  texttemplate: Alignmentgroup;
  error_x: Error;
  error_y: Error;
  xcalendar: Alignmentgroup;
  ycalendar: Alignmentgroup;
  xaxis: Alignmentgroup;
  yaxis: Alignmentgroup;
  idssrc: Alignmentgroup;
  customdatasrc: Alignmentgroup;
  metasrc: Alignmentgroup;
  hoverinfosrc: Alignmentgroup;
  xsrc: Alignmentgroup;
  ysrc: Alignmentgroup;
  textsrc: Alignmentgroup;
  hovertextsrc: Alignmentgroup;
  textpositionsrc: Alignmentgroup;
  hovertemplatesrc: Alignmentgroup;
  texttemplatesrc: Alignmentgroup;
}

export interface Scattermapbox {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ScattermapboxAttributes;
}

export interface ScattermapboxAttributes {
  type: string;
  visible: DoubleClickDelay;
  showlegend: DoubleClickDelay;
  legendgroup: Showlegend;
  opacity: DoubleClickDelay;
  name: DoubleClickDelay;
  uid: DoubleClickDelay;
  ids: Showlegend;
  customdata: Showlegend;
  meta: DoubleClickDelay;
  selectedpoints: DoubleClickDelay;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: DoubleClickDelay;
  lon: Showlegend;
  lat: Showlegend;
  mode: DoubleClickDelay;
  text: DoubleClickDelay;
  texttemplate: DoubleClickDelay;
  hovertext: Showlegend;
  line: LeafClass;
  connectgaps: Showlegend;
  marker: FriskyMarker;
  fill: Showlegend;
  fillcolor: Showlegend;
  textfont: TitlefontClass;
  textposition: DoubleClickDelay;
  below: Showlegend;
  selected: FluffySelected;
  unselected: FluffySelected;
  hoverinfo: Showlegend;
  hovertemplate: Showlegend;
  subplot: DoubleClickDelay;
  idssrc: Showlegend;
  customdatasrc: Showlegend;
  metasrc: DoubleClickDelay;
  lonsrc: Showlegend;
  latsrc: Showlegend;
  textsrc: DoubleClickDelay;
  texttemplatesrc: DoubleClickDelay;
  hovertextsrc: Showlegend;
  hoverinfosrc: Showlegend;
  hovertemplatesrc: Showlegend;
}

export interface FriskyMarker {
  symbol: DoubleClickDelay;
  angle: DoubleClickDelay;
  allowoverlap: DoubleClickDelay;
  opacity: DoubleClickDelay;
  size: DoubleClickDelay;
  sizeref: DoubleClickDelay;
  sizemin: DoubleClickDelay;
  sizemode: DoubleClickDelay;
  color: DoubleClickDelay;
  cauto: DoubleClickDelay;
  cmin: DoubleClickDelay;
  cmax: DoubleClickDelay;
  cmid: DoubleClickDelay;
  colorscale: DoubleClickDelay;
  autocolorscale: DoubleClickDelay;
  reversescale: DoubleClickDelay;
  showscale: DoubleClickDelay;
  colorbar: Colorbar;
  coloraxis: DoubleClickDelay;
  editType: EditTypeElement;
  role: Role;
  symbolsrc: DoubleClickDelay;
  anglesrc: DoubleClickDelay;
  opacitysrc: DoubleClickDelay;
  sizesrc: DoubleClickDelay;
  colorsrc: DoubleClickDelay;
}

export interface Scatterpolar {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ScatterpolarAttributes;
}

export interface ScatterpolarAttributes {
  type: string;
  visible: Selectdirection;
  showlegend: Selectdirection;
  legendgroup: Selectdirection;
  opacity: Selectdirection;
  name: Selectdirection;
  uid: Selectdirection;
  ids: Selectdirection;
  customdata: Selectdirection;
  meta: Selectdirection;
  selectedpoints: Selectdirection;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Selectdirection;
  mode: Selectdirection;
  r: Selectdirection;
  theta: Selectdirection;
  r0: Selectdirection;
  dr: Selectdirection;
  theta0: Selectdirection;
  dtheta: Selectdirection;
  thetaunit: Selectdirection;
  text: Selectdirection;
  texttemplate: Selectdirection;
  hovertext: Selectdirection;
  line: NewshapeLine;
  connectgaps: Selectdirection;
  marker: MagentaMarker;
  cliponaxis: Selectdirection;
  textposition: Selectdirection;
  textfont: InsidetextfontClass;
  fill: Selectdirection;
  fillcolor: Selectdirection;
  hoverinfo: Selectdirection;
  hoveron: Selectdirection;
  hovertemplate: Selectdirection;
  selected: FluffySelected;
  unselected: FluffySelected;
  subplot: Selectdirection;
  idssrc: Selectdirection;
  customdatasrc: Selectdirection;
  metasrc: Selectdirection;
  rsrc: Selectdirection;
  thetasrc: Selectdirection;
  textsrc: Selectdirection;
  texttemplatesrc: Selectdirection;
  hovertextsrc: Selectdirection;
  textpositionsrc: Selectdirection;
  hoverinfosrc: Selectdirection;
  hovertemplatesrc: Selectdirection;
}

export interface Scatterpolargl {
  meta: BarpolarMeta;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ScatterpolarglAttributes;
}

export interface ScatterpolarglAttributes {
  type: string;
  visible: Direction;
  showlegend: Direction;
  legendgroup: Direction;
  opacity: Direction;
  name: Direction;
  uid: Direction;
  ids: Direction;
  customdata: Direction;
  meta: Direction;
  selectedpoints: Direction;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Direction;
  mode: Direction;
  r: Direction;
  theta: Direction;
  r0: Direction;
  dr: Direction;
  theta0: Direction;
  dtheta: Direction;
  thetaunit: Direction;
  text: Direction;
  texttemplate: Direction;
  hovertext: Direction;
  hovertemplate: Direction;
  line: NewshapeLine;
  connectgaps: Direction;
  marker: MagentaMarker;
  fill: Direction;
  fillcolor: Direction;
  textposition: Direction;
  textfont: InsidetextfontClass;
  hoverinfo: Direction;
  selected: FluffySelected;
  unselected: FluffySelected;
  subplot: Direction;
  idssrc: Direction;
  customdatasrc: Direction;
  metasrc: Direction;
  rsrc: Direction;
  thetasrc: Direction;
  textsrc: Direction;
  texttemplatesrc: Direction;
  hovertextsrc: Direction;
  hovertemplatesrc: Direction;
  textpositionsrc: Direction;
  hoverinfosrc: Direction;
}

export interface Splom {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: SplomAttributes;
}

export interface SplomAttributes {
  type: string;
  visible: DoubleClickDelay;
  showlegend: DoubleClickDelay;
  legendgroup: DoubleClickDelay;
  name: DoubleClickDelay;
  uid: DoubleClickDelay;
  ids: DoubleClickDelay;
  customdata: Clickmode;
  meta: DoubleClickDelay;
  selectedpoints: DoubleClickDelay;
  hoverinfo: DoubleClickDelay;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: DoubleClickDelay;
  dimensions: TentacledDimensions;
  text: DoubleClickDelay;
  hovertext: DoubleClickDelay;
  hovertemplate: DoubleClickDelay;
  marker: MagentaMarker;
  xaxes: Axes;
  yaxes: Axes;
  diagonal: Diagonal;
  showupperhalf: DoubleClickDelay;
  showlowerhalf: DoubleClickDelay;
  selected: FluffySelected;
  unselected: FluffySelected;
  opacity: DoubleClickDelay;
  idssrc: DoubleClickDelay;
  customdatasrc: Clickmode;
  metasrc: DoubleClickDelay;
  hoverinfosrc: DoubleClickDelay;
  textsrc: DoubleClickDelay;
  hovertextsrc: DoubleClickDelay;
  hovertemplatesrc: DoubleClickDelay;
}

export interface Diagonal {
  visible: Alignmentgroup;
  editType: EditTypeElement;
  role: Role;
}

export interface TentacledDimensions {
  items: HilariousItems;
  role: Role;
}

export interface HilariousItems {
  dimension: TentacledDimension;
}

export interface TentacledDimension {
  visible: DoubleClickDelay;
  label: DoubleClickDelay;
  values: DoubleClickDelay;
  axis: DimensionAxis;
  editType: EditTypeElement;
  name: DoubleClickDelay;
  templateitemname: DoubleClickDelay;
  role: Role;
  valuessrc: DoubleClickDelay;
}

export interface DimensionAxis {
  type: DoubleClickDelay;
  matches: DoubleClickDelay;
  editType: EditTypeElement;
  role: Role;
}

export interface Axes {
  valType: ValType;
  freeLength: boolean;
  role: Role;
  editType: EditTypeElement;
  items: AmbitiousItems;
  description: string;
}

export interface AmbitiousItems {
  valType: ValType;
  regex: string;
  editType: EditTypeElement;
}

export interface Streamtube {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: StreamtubeAttributes;
}

export interface StreamtubeAttributes {
  type: string;
  visible: Selectdirection;
  legendgroup: Showlegend;
  name: Showlegend;
  uid: Selectdirection;
  ids: Showlegend;
  customdata: Showlegend;
  meta: Showlegend;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  uirevision: Selectdirection;
  x: Selectdirection;
  y: Selectdirection;
  z: Selectdirection;
  u: Selectdirection;
  v: Selectdirection;
  w: Selectdirection;
  starts: Starts;
  maxdisplayed: Showlegend;
  sizeref: Showlegend;
  text: Selectdirection;
  hovertext: Showlegend;
  hovertemplate: Showlegend;
  showlegend: Showlegend;
  cauto: Showlegend;
  cmin: Showlegend;
  cmax: Showlegend;
  cmid: Showlegend;
  colorscale: Showlegend;
  autocolorscale: Showlegend;
  reversescale: Showlegend;
  showscale: Showlegend;
  colorbar: Colorbar;
  coloraxis: Showlegend;
  opacity: Showlegend;
  lightposition: Lightposition;
  lighting: Lighting;
  hoverinfo: Showlegend;
  scene: Showlegend;
  idssrc: Showlegend;
  customdatasrc: Showlegend;
  metasrc: Showlegend;
  xsrc: Selectdirection;
  ysrc: Selectdirection;
  zsrc: Selectdirection;
  usrc: Selectdirection;
  vsrc: Selectdirection;
  wsrc: Selectdirection;
  hovertemplatesrc: Showlegend;
  hoverinfosrc: Showlegend;
}

export interface Starts {
  x: Selectdirection;
  y: Selectdirection;
  z: Selectdirection;
  editType: EditTypeElement;
  role: Role;
  xsrc: Selectdirection;
  ysrc: Selectdirection;
  zsrc: Selectdirection;
}

export interface Sunburst {
  meta: ImpliedEdits;
  categories: any[];
  animatable: boolean;
  type: string;
  attributes: SunburstAttributes;
  layoutAttributes: SunburstLayoutAttributes;
}

export interface SunburstAttributes {
  type: string;
  visible: Direction;
  opacity: Direction;
  name: Direction;
  uid: Direction;
  ids: Direction;
  customdata: Direction;
  meta: Direction;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Direction;
  labels: Direction;
  parents: Direction;
  values: Direction;
  branchvalues: Direction;
  count: Direction;
  level: Direction;
  maxdepth: Direction;
  marker: LineClass;
  leaf: LeafClass;
  text: Direction;
  textinfo: Direction;
  texttemplate: Direction;
  hovertext: Direction;
  hoverinfo: Direction;
  hovertemplate: Direction;
  textfont: InsidetextfontClass;
  insidetextorientation: Direction;
  insidetextfont: InsidetextfontClass;
  outsidetextfont: InsidetextfontClass;
  domain: GeoDomain;
  idssrc: Direction;
  customdatasrc: Direction;
  metasrc: Direction;
  labelssrc: Direction;
  parentssrc: Direction;
  valuessrc: Direction;
  textsrc: Direction;
  texttemplatesrc: Direction;
  hovertextsrc: Direction;
  hoverinfosrc: Direction;
  hovertemplatesrc: Direction;
}

export interface SunburstLayoutAttributes {
  sunburstcolorway: Resolution;
  extendsunburstcolors: Resolution;
}

export interface TracesSurface {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: SurfaceAttributes;
}

export interface SurfaceAttributes {
  type: string;
  visible: Alignmentgroup;
  legendgroup: Alignmentgroup;
  name: Alignmentgroup;
  uid: Alignmentgroup;
  ids: Alignmentgroup;
  customdata: Alignmentgroup;
  meta: Alignmentgroup;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  uirevision: Alignmentgroup;
  z: Alignmentgroup;
  x: Alignmentgroup;
  y: Alignmentgroup;
  text: Alignmentgroup;
  hovertext: Alignmentgroup;
  hovertemplate: Alignmentgroup;
  connectgaps: Fromcurrent;
  surfacecolor: Alignmentgroup;
  cauto: Fromcurrent;
  cmin: Fromcurrent;
  cmax: Fromcurrent;
  cmid: Fromcurrent;
  colorscale: Fromcurrent;
  autocolorscale: Fromcurrent;
  reversescale: Alignmentgroup;
  showscale: Alignmentgroup;
  colorbar: Colorbar;
  coloraxis: Fromcurrent;
  contours: FluffyContours;
  hidesurface: Alignmentgroup;
  lightposition: Lightposition;
  lighting: Lighting;
  opacity: Alignmentgroup;
  opacityscale: Alignmentgroup;
  _deprecated: IndigoDeprecated;
  hoverinfo: Alignmentgroup;
  showlegend: Alignmentgroup;
  xcalendar: Alignmentgroup;
  ycalendar: Alignmentgroup;
  zcalendar: Alignmentgroup;
  scene: Alignmentgroup;
  idssrc: Alignmentgroup;
  customdatasrc: Alignmentgroup;
  metasrc: Alignmentgroup;
  zsrc: Alignmentgroup;
  xsrc: Alignmentgroup;
  ysrc: Alignmentgroup;
  textsrc: Alignmentgroup;
  hovertextsrc: Alignmentgroup;
  hovertemplatesrc: Alignmentgroup;
  surfacecolorsrc: Alignmentgroup;
  hoverinfosrc: Alignmentgroup;
}

export interface IndigoDeprecated {
  zauto: Zauto;
  zmin: Zauto;
  zmax: Zauto;
}

export interface Zauto {
  description: string;
  editType: EditTypeElement;
}

export interface FluffyContours {
  x: ContoursX;
  y: ContoursX;
  z: ContoursX;
  editType: EditTypeElement;
  role: Role;
}

export interface ContoursX {
  show: Alignmentgroup;
  start: Alignmentgroup;
  end: Featureidkey;
  size: Alignmentgroup;
  project: Project;
  color: Featureidkey;
  usecolormap: Alignmentgroup;
  width: Alignmentgroup;
  highlight: Featureidkey;
  highlightcolor: Featureidkey;
  highlightwidth: Boxgap;
  editType: EditTypeElement;
  role: Role;
}

export interface Project {
  x: Alignmentgroup;
  y: Alignmentgroup;
  z: Alignmentgroup;
  editType: EditTypeElement;
  role: Role;
}

export interface Table {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: TableAttributes;
}

export interface TableAttributes {
  type: string;
  visible: Selectdirection;
  name: Selectdirection;
  uid: Selectdirection;
  ids: Selectdirection;
  customdata: Selectdirection;
  meta: Selectdirection;
  hoverinfo: Selectdirection;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  uirevision: Selectdirection;
  domain: GeoDomain;
  columnwidth: Selectdirection;
  columnorder: Selectdirection;
  header: Cells;
  cells: Cells;
  editType: EditTypeElement;
  idssrc: Selectdirection;
  customdatasrc: Selectdirection;
  metasrc: Selectdirection;
  hoverinfosrc: Selectdirection;
  columnwidthsrc: Selectdirection;
  columnordersrc: Selectdirection;
}

export interface Cells {
  values: Selectdirection;
  format: Format;
  prefix: Selectdirection;
  suffix: Selectdirection;
  height: Featureidkey;
  align: Textposition;
  line: CellsLine;
  fill: CellsFill;
  font: InsidetextfontClass;
  editType: EditTypeElement;
  role: Role;
  valuessrc: Selectdirection;
  formatsrc: CustomdataClass;
  prefixsrc: Selectdirection;
  suffixsrc: Selectdirection;
  alignsrc: CustomdataClass;
}

export interface CellsFill {
  color: Hovertemplate;
  editType: EditTypeElement;
  role: Role;
  colorsrc: CustomdataClass;
}

export interface CellsLine {
  width: Selectdirection;
  color: Selectdirection;
  editType: EditTypeElement;
  role: Role;
  widthsrc: Selectdirection;
  colorsrc: Selectdirection;
}

export interface Treemap {
  meta: ImpliedEdits;
  categories: any[];
  animatable: boolean;
  type: string;
  attributes: TreemapAttributes;
  layoutAttributes: TreemapLayoutAttributes;
}

export interface TreemapAttributes {
  type: string;
  visible: Resolution;
  opacity: Fromcurrent;
  name: Resolution;
  uid: Resolution;
  ids: Direction;
  customdata: Direction;
  meta: Resolution;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Resolution;
  labels: Direction;
  parents: Fromcurrent;
  values: Resolution;
  branchvalues: Direction;
  count: Direction;
  level: Direction;
  maxdepth: Resolution;
  tiling: Tiling;
  marker: LineClass;
  pathbar: Pathbar;
  text: Clickmode;
  textinfo: Clickmode;
  texttemplate: Clickmode;
  hovertext: Direction;
  hoverinfo: Direction;
  hovertemplate: Direction;
  textfont: InsidetextfontClass;
  insidetextfont: InsidetextfontClass;
  outsidetextfont: InsidetextfontClass;
  textposition: Clickmode;
  domain: GeoDomain;
  idssrc: Direction;
  customdatasrc: Direction;
  metasrc: Resolution;
  labelssrc: Direction;
  parentssrc: Fromcurrent;
  valuessrc: Resolution;
  textsrc: Clickmode;
  texttemplatesrc: Clickmode;
  hovertextsrc: Direction;
  hoverinfosrc: Direction;
  hovertemplatesrc: Direction;
}

export interface Pathbar {
  visible: Resolution;
  side: Resolution;
  edgeshape: Resolution;
  thickness: Resolution;
  textfont: InsidetextfontClass;
  editType: EditTypeElement;
  role: Role;
}

export interface Tiling {
  packing: Resolution;
  squarifyratio: Resolution;
  flip: Resolution;
  pad: Resolution;
  editType: EditTypeElement;
  role: Role;
}

export interface TreemapLayoutAttributes {
  treemapcolorway: Alignmentgroup;
  extendtreemapcolors: Alignmentgroup;
}

export interface Violin {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: ViolinAttributes;
  layoutAttributes: ViolinLayoutAttributes;
}

export interface ViolinAttributes {
  type: string;
  visible: Showlegend;
  showlegend: Showlegend;
  legendgroup: Showlegend;
  opacity: Showlegend;
  uid: Showlegend;
  ids: Showlegend;
  customdata: Showlegend;
  meta: Showlegend;
  selectedpoints: Showlegend;
  hoverinfo: Showlegend;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Showlegend;
  y: Showlegend;
  x: Showlegend;
  x0: Showlegend;
  y0: Showlegend;
  name: Showlegend;
  orientation: Showlegend;
  bandwidth: DoubleClickDelay;
  scalegroup: Showlegend;
  scalemode: Showlegend;
  spanmode: Showlegend;
  span: Showlegend;
  line: LeafClass;
  fillcolor: Showlegend;
  points: Showlegend;
  jitter: Showlegend;
  pointpos: Showlegend;
  width: Showlegend;
  marker: TentacledMarker;
  text: Showlegend;
  hovertext: Showlegend;
  hovertemplate: Showlegend;
  box: AttributesBox;
  meanline: LeafClass;
  side: Showlegend;
  offsetgroup: Showlegend;
  alignmentgroup: DoubleClickDelay;
  selected: FluffySelected;
  unselected: FluffySelected;
  hoveron: Showlegend;
  xaxis: Showlegend;
  yaxis: Showlegend;
  idssrc: Showlegend;
  customdatasrc: Showlegend;
  metasrc: Showlegend;
  hoverinfosrc: Showlegend;
  ysrc: Showlegend;
  xsrc: Showlegend;
  textsrc: Showlegend;
  hovertextsrc: Showlegend;
  hovertemplatesrc: Showlegend;
}

export interface AttributesBox {
  visible: Showlegend;
  width: Showlegend;
  fillcolor: Showlegend;
  line: LeafClass;
  editType: EditTypeElement;
  role: Role;
}

export interface ViolinLayoutAttributes {
  violinmode: Selectdirection;
  violingap: Selectdirection;
  violingroupgap: Selectdirection;
}

export interface Waterfall {
  meta: ImpliedEdits;
  categories: string[];
  animatable: boolean;
  type: string;
  attributes: WaterfallAttributes;
  layoutAttributes: WaterfallLayoutAttributes;
}

export interface WaterfallAttributes {
  type: string;
  visible: Clickmode;
  showlegend: Clickmode;
  legendgroup: Clickmode;
  opacity: Clickmode;
  name: Clickmode;
  uid: Clickmode;
  ids: Clickmode;
  customdata: Fromcurrent;
  meta: Clickmode;
  selectedpoints: Clickmode;
  hoverlabel: AttributesHoverlabel;
  stream: Stream;
  transforms: AttributesTransforms;
  uirevision: Clickmode;
  measure: Clickmode;
  base: Fromcurrent;
  x: Clickmode;
  x0: Clickmode;
  dx: Clickmode;
  y: Clickmode;
  y0: Clickmode;
  dy: Clickmode;
  hovertext: Clickmode;
  hovertemplate: Clickmode;
  hoverinfo: Clickmode;
  textinfo: Clickmode;
  texttemplate: Clickmode;
  text: Clickmode;
  textposition: Clickmode;
  insidetextanchor: Clickmode;
  textangle: Clickmode;
  textfont: InsidetextfontClass;
  insidetextfont: InsidetextfontClass;
  outsidetextfont: InsidetextfontClass;
  constraintext: Fromcurrent;
  cliponaxis: Fromcurrent;
  orientation: Clickmode;
  offset: Clickmode;
  width: Clickmode;
  increasing: Decreasing;
  decreasing: Decreasing;
  totals: Decreasing;
  connector: Connector;
  offsetgroup: Clickmode;
  alignmentgroup: Fromcurrent;
  xaxis: Clickmode;
  yaxis: Clickmode;
  idssrc: Clickmode;
  customdatasrc: Fromcurrent;
  metasrc: Clickmode;
  measuresrc: Clickmode;
  xsrc: Clickmode;
  ysrc: Clickmode;
  hovertextsrc: Clickmode;
  hovertemplatesrc: Clickmode;
  hoverinfosrc: Clickmode;
  texttemplatesrc: Clickmode;
  textsrc: Clickmode;
  textpositionsrc: Clickmode;
  offsetsrc: Clickmode;
  widthsrc: Clickmode;
}

export interface Decreasing {
  marker: Border;
  editType: EditTypeElement;
  role: Role;
}

export interface WaterfallLayoutAttributes {
  waterfallmode: Resolution;
  waterfallgap: Resolution;
  waterfallgroupgap: Resolution;
}

export interface PlotSchemaTransforms {
  aggregate: Aggregate;
  filter: Filter;
  groupby: Groupby;
  sort: Sort;
}

export interface Aggregate {
  attributes: AggregateAttributes;
}

export interface AggregateAttributes {
  enabled: Alignmentgroup;
  groups: Alignmentgroup;
  aggregations: Aggregations;
  editType: EditTypeElement;
  groupssrc: Alignmentgroup;
}

export interface Aggregations {
  items: AggregationsItems;
  role: Role;
}

export interface AggregationsItems {
  aggregation: Aggregation;
}

export interface Aggregation {
  target: Alignmentgroup;
  func: Alignmentgroup;
  funcmode: Alignmentgroup;
  enabled: Alignmentgroup;
  editType: EditTypeElement;
  role: Role;
}

export interface Filter {
  attributes: FilterAttributes;
}

export interface FilterAttributes {
  enabled: DoubleClickDelay;
  target: DoubleClickDelay;
  operation: DoubleClickDelay;
  value: DoubleClickDelay;
  preservegaps: DoubleClickDelay;
  editType: EditTypeElement;
  valuecalendar: DoubleClickDelay;
  targetcalendar: DoubleClickDelay;
  targetsrc: DoubleClickDelay;
}

export interface Groupby {
  attributes: GroupbyAttributes;
}

export interface GroupbyAttributes {
  enabled: Showlegend;
  groups: Showlegend;
  nameformat: Showlegend;
  styles: Styles;
  editType: EditTypeElement;
  groupssrc: Showlegend;
}

export interface Styles {
  items: StylesItems;
  role: Role;
}

export interface StylesItems {
  style: Style;
}

export interface Style {
  target: Selectdirection;
  value: Selectdirection;
  editType: EditTypeElement;
  role: Role;
}

export interface Sort {
  attributes: SortAttributes;
}

export interface SortAttributes {
  enabled: Direction;
  target: Direction;
  order: Direction;
  editType: EditTypeElement;
  targetsrc: Direction;
}
