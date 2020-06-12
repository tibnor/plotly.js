class TsdWriter {

    Config config
    File definitionFile
    TsdTemplates tsdTemplates
    SchemaParser schemaParser
    TypeUtils typeUtils
    Map mergedAxis = [:]
    String currentStep
    Map events

    def writeTsd() {
        init()

        println " "
        println "Writing TSD to: ${ definitionFile.canonicalPath }"
        println " "

        writeTsdHeader()
        writeEventHelperComments()
        writePlotlyDiv()
        writePlotlyEvents()
        writeLayout()
        writeTraces()
        writePlotlyObject()
        writeTsdFooter()
    }

    private init() {
        config.outputPath.deleteDir()
        config.outputPath.mkdirs()
        typeUtils = new TypeUtils()
        tsdTemplates = new TsdTemplates()
        definitionFile = new File( "${ config.outputPath }/${ config.fileName}" )
        definitionFile.createNewFile()
    }
    
    private writeTsdHeader() {
        currentStep = "header"
        writeToDefinition( "// Generated from Plotly.js version ${config.libraryVersion}", 0 )
        writeToDefinition( "", 0 )
        writeToDefinition( tsdTemplates.tsdHeader(), 0 )
        writeToDefinition( "", 0 )
    }
    
    private writeEventHelperComments() {
        writeToDefinition( tsdTemplates.tsdEventHelperComments( events ), 0 )
        writeToDefinition( "", 0 )
    }
    
    private writeTsdFooter() {
        currentStep = "footer"
        writeToDefinition( tsdTemplates.tsdFooter(), 0 )
    }

    private writePlotlyDiv() {
        currentStep = "plotlyDiv"
        writeToDefinition( tsdTemplates.plotlyDiv(), 0 )
        writeToDefinition( "", 0 )
    }

    private writePlotlyEvents() {
        currentStep = "plotlyEvents"
        writeToDefinition( tsdTemplates.plotlyEvents(), 0 )
        writeToDefinition( "", 0 )
    }

    private writePlotlyObject() {
        currentStep = "plotlyObject"
        writeToDefinition( tsdTemplates.plotlyObj(), 0 )
        writeToDefinition( "", 0 )
    }

    private writeLayout() {
        currentStep = "layout"
        writeToDefinition( tsdTemplates.moduleStart( "plotly.layout" ), 0 )

        // Add layout config items missing from Plotly schema JSON:
        def bargap = new AttributeConfig( [
            name: "bargap", "valType": "number",
            "min": 0, "max": 1,
            "role": "style", "editType": "calc",
            "description": "Sets the gap (in plot fraction) between bars of adjacent location coordinates."
        ] )
        schemaParser.layout[ "bargap" ] = bargap

        String layoutContent = buildAttributeMapContent( schemaParser.layout, 2 )
        writeToDefinition( buildAxisContent(), 1 )
        writeToDefinition( tsdTemplates.interfaceStart( "Layout" ), 1 )
        writeToDefinition( layoutContent, 0 )
        writeToDefinition( tsdTemplates.interfaceEnd(), 1 )
        writeToDefinition( tsdTemplates.moduleEnd(), 0 )
        writeToDefinition( "", 0 )
    }

    private writeTraces() {
        currentStep = "traces"
        writeToDefinition( tsdTemplates.moduleStart( "plotly.traces" ), 0 )
        writeToDefinition( tsdTemplates.baseTrace(), 1 )
        writeToDefinition( "", 1 )

        schemaParser.traces.each { traceKey, traceConfig ->

            writeToDefinition( "/**", 1 )
            if( traceConfig.meta && traceConfig.meta.description ) {
                writeToDefinition( " * ${ traceKey }: ${ traceConfig.meta.description }", 1 )
            }
            else {
                writeToDefinition( " * ${ traceKey }", 1 )
            }
            writeToDefinition( " */", 1 )

            writeToDefinition( tsdTemplates.interfaceStart( "${ typeUtils.getTraceName( traceKey ) }", "BaseTrace" ), 1 )
            writeToDefinition( buildAttributeMapContent( traceConfig.attributes, 2 ), 0 )
            writeToDefinition( tsdTemplates.interfaceEnd(), 1 )
        }
        writeToDefinition( tsdTemplates.moduleEnd(), 0 )
        writeToDefinition( "", 0 )
    }

    private buildAxisContent() {
        currentStep = "axis"
        mergedAxis = mergedAxis.sort()
        def result = tsdTemplates.interfaceStart( "PlotlyAxis" )
        result += buildAttributeMapContent( mergedAxis, 2 )
        result += tsdTemplates.interfaceEnd()
        return result
    }

    private buildAttributeMapContent( Map attributes, depth ) {
        def content = ""

        attributes.each { attName, attConfig ->
            // attribute
            if( attConfig instanceof AttributeConfig ) {
                //content = appendLine( "// ATTRIBUTE ${attName} - Depth: ${depth}", depth, content )
                content += buildAttributeContent( attName, attConfig, depth )
            }
            // nested object
            else if( attConfig instanceof Map ) {
                //content = appendLine( "// NESTED OBJECT ${attName} - Depth: ${depth}", depth, content )
                content += buildNestedObjectContent( attName, attConfig, depth )
            }
            else {
                // writeToDefinition( "//standalone property: ${ attName }", depth )
            }
        }

        return content
    }

    private buildAttributeContent( String attName, AttributeConfig attConfig, depth ) {
        def content = ""
        def terminator = ( depth > 2 ? "," : ";" )

        content = appendLine( "/**", depth, content )
        if( attConfig.description ) content = appendLine( " * ${ attConfig.description }", depth, content )
        if( attConfig.dflt ) content = appendLine(  " * @default: ${ typeUtils.quoteIfString( attConfig.dflt ) }", depth, content )

        def tsType = typeUtils.getTSType( attConfig )
        def typeString = " * Plotly @type: ${ attConfig.valType }"
        if( attConfig.itemTypes ) typeString += " (${ attConfig.itemTypes })"
        content = appendLine(  typeString, depth, content )

        content = appendLine( " */", depth, content )
        content = appendLine( "${ attName }?: ${ tsType }${ terminator }", depth, content )
        return content
    }

    private buildNestedObjectContent( String attName, Map attributes, depth ) {
        def content = ""
        def terminator = ( depth > 2 ? "," : ";" )

        def isAxis = false
        // Special handling for axis attributes, to reference separate PlotlyAxis type.
        if( [ "xaxis", "yaxis", "zaxis" ].contains( attName ) ) {
            isAxis = true
            mergedAxis << attributes
        }

        if( attributes.description ) {
            content = appendLine( "/**", depth, content )
            content = appendLine( " * ${ attributes.description }", depth, content )
            content = appendLine( " */", depth, content )
        }
        if( isAxis ) {
            content = appendLine( "${ attName }?: PlotlyAxis${ terminator }", depth, content )

            // Add additional x/y axes on layout config to allow for multiple axes.
            if( depth == 2 ) {
                content = appendLine( "${ attName }2?: PlotlyAxis${ terminator }", depth, content )
                content = appendLine( "${ attName }3?: PlotlyAxis${ terminator }", depth, content )
                content = appendLine( "${ attName }4?: PlotlyAxis${ terminator }", depth, content )
            }
        }
        // Special handling for item arrays that need to be flattened
        else if( attributes[ "role" ] == "object" && attributes[ "items" ] instanceof Map
                 && attributes.size() == 2 && attributes[ "items" ].size() == 1 ) {
            content = appendLine( "${ attName }?: {", depth, content )
            content += buildAttributeMapContent( attributes[ "items" ].values().first(), depth + 1 )
            content = appendLine( "}[]${ terminator }", depth, content )
        }
        else {
            content = appendLine( "${ attName }?: {", depth, content )
            content += buildAttributeMapContent( attributes, depth + 1 )
            content = appendLine( "}${ terminator }", depth, content )
        }

        return content
    }

    private writeToDefinition( value, depth=0 ) {
      definitionFile.withWriterAppend( "UTF-8" ) { writer ->
          writer << ( "  " * depth ) + value + "\n"
      }
    }

    private appendLine( newText, depth, originalText ) {
        return originalText + ( "  " * depth ) + newText + "\n"
    }

    private formatCommentText( comment ) {
      def result = ""
      if( comment ) result += comment.replaceAll("<(.|\n)*?>", "").replaceAll( "[\\n\\t]", " " )
      return result
    }

}
