class TypeUtils {

    Map typeMap = [
        string: "string",
        number: "number",
        integer: "number",
        any: "any",
        colorscale: "string|any[]",
        angle: "number",
        boolean: "boolean",
        flaglist: "string[]|string",
        data_array: "any[]",
        subplotid: "string",
        color: "string",
        enumerated: "string",
        info_array: "any[]",
        colorlist: "string[]",
        dimensions: "number"
    ]

    Map traceNameMap = [
        "scattergl": "ScatterGL",
        "area": "Area",
        "bar": "Bar",
        "box": "Box",
        "candlestick": "Candlestick",
        "choropleth": "Choropleth",
        "cone": "Cone",
        "contour": "Contour",
        "heatmap": "Heatmap",
        "heatmapgl": "HeatmapGL",
        "histogram": "Histogram",
        "histogram2d": "Histogram2D",
        "histogram2dcontour": "Histogram2DContour",
        "mesh3d": "Mesh3D",
        "ohlc": "OHLC",
        "pie": "Pic",
        "pointcloud": "PointCloud",
        "scatter": "Scatter",
        "scatter3d": "Scatter3D",
        "scattergeo": "ScatterGeo",
        "scattermapbox": "ScatterMapBox",
        "scatterternary": "ScatterTernary",
        "surface": "Surface",
        "sankey": "Sankey",
        "scattercarpet": "ScatterCarpet",
        "carpet": "Carpet",
        "contourcarpet": "ContourCarpet",
        "parcoords": "ParCoords",
        "table": "Table",
        "scatterpolar": "ScatterPolar",
        "scatterpolargl": "ScatterPolarGL",
        "violin": "Violin",
        "splom": "Splom",
        "streamtube": "Streamtube",
        "barpolar": "BarPolar"
    ]

    def getTraceName( jsonName ) {
        if( !traceNameMap[ jsonName ] ) {
            println "No table name mapping found for '${ jsonName }'. Add it to 'traceNameMap' array in TypeUtils.groovy."
            return jsonName
        }
        return traceNameMap[ jsonName ]
    }

    def getTraceNamesTSLiteral() {
        return traceNameMap.collect { k,v -> "'$k'" }.join('|')
    }

    def getTSType( AttributeConfig attConfig ) {
        if( !typeMap[ attConfig.valType ] ) {
            println "No type mapping for '${ attConfig.valType }'. Add it to 'typeMap' array in TypeUtils.groovy."
            return attConfig.valType
        }
        def result = typeMap[ attConfig.valType ]

        if( attConfig.arrayOk && ( result == "string" || result == "number" ) ) {
            result += "|${ result }[]"
        }

        if( attConfig.valType == "info_array" && attConfig.items && attConfig.items.size() ) {
            attConfig.itemTypes = attConfig.items.toString()
            result = "["
            attConfig.items.each { it ->
                result += "${ typeMap[ it.valType ] }, "
            }
            result = removeLastChar( result )
            result = removeLastChar( result )
            result += "]"
        }

        if( attConfig.valType == "enumerated" && attConfig.values && attConfig.values.size() ) {
            def containsRegex = false;
            result = ""
            attConfig.values.each { it ->
                result += "${ quoteIfString( it ) }|"
                if( !containsRegex && isRegexString( it ) ) containsRegex = true
            }
            result = removeLastChar( result )

            if( attConfig.arrayOk ) {
                result += "|string|string[]"
            }
            else if( containsRegex ) {
                result += "|string"
            }
        }

        if( attConfig.valType == "flaglist" && attConfig.flags && attConfig.flags.size() ) {
            result = ""
            attConfig.flags.each { it ->
                result += "${ quoteIfString( it ) }|"
            }

            if( attConfig.extras ) {
                attConfig.extras.each { it ->
                    result += "${ quoteIfString( it ) }|"
                }
            }

            result = result.substring( 0, result.length() - 1 )
        }

        return result
    }

    private removeLastChar( val ) {
        return val.substring( 0, val.length() - 1 )
    }

    def quoteIfString( val ) {
        def result = val
        if( isString( val ) ) {
            result = '"' + val + '"'
        }
        return result
    }

    def isString( val ) {
        return val instanceof String
    }

    def isRegexString( val ) {
        return isString( val ) && val.contains( "/" )
    }

}
