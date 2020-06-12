# Gradle Plotly.js TSD Generator

This Gradle build reads in Plotly.js files (`plotly.js` and `plot-schema.json`) and generates an ambient TypeScript TSD file for the Plotly.js charting library. 

# Running the Generator

To run the generator, open a command line in this folder and run `gradlew`. This will download the correct Gradle distribution and run the generator. The TSD is output to `/tsd/plotly.js/index.d.ts`.

# Handling new versions of Plotly.js

If you want to build a TSD for a new version of Plotly.js:
  1. Copy the updated `plotly.js` file to `/js`. The source code is needed in order to scan for event names.
  2. Copy the updated `plot-schema.json` to `/json/plot-schema-x.xx.x.json`.
  3. Edit the `build.gradle` file to add a new version as a static property in the `ConfigGroups` object, and update the `currentConfigGroup` value to point to the static property for the new version.
  
(This could probably be automated to some degree, but the current setup allows for easier testing, using trimmed-down versions of the files, and allows you to easily target different Plotly releases.)

The console will output some useful information. It should also log unknown plot types, which is useful when new plot types are added. If the console warns you about an unknown plot type, you can add it to the list of plots in `TypeUtils.groovy`.

# File structure

The main source for the generator is in a child Gradle project under `buildSrc/src/main/groovy`. Here's a quick summary of what these files do:

  - `Config.groovy`: Holds info related to the current build configuration, such as version number and file paths.
  - `TsdGenerator.groovy`: The main control class for running the generator.
  - `TsdWriter.groovy`: Responsible for writing out the TSD file. 
  - `SchemaParser.groovy`: Parses the schema JSON and builds up an object graph of objects, methods, properties and type information. 
  - `AttributeConfig.groovy`: Contains data for each schema attribute. 
  - `ValObject.groovy`: Contains global value (type) information used by the rest of the Plotly schema JSON.   
  - `TypeUtils.groovy`: Used to map schema JSON types to TS types, and plot names to TS interface names. 
  - `TsdTemplates.groovy`: Template strings for various parts of the TSD. 
