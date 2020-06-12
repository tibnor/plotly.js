class SchemaParser {

    def schema
    Map<String, ValObject> valObjects = [:]
    def layout = [:]
    def traces = [:]
    def traceTypes = []
    def valTypes = []
    def editTypes = [ traces: [], layout: [] ]
    def roles = []
    def standardKeys = []
    def debug = false

    def parseSchema() {
        println "Parsing value objects..."
        parseValObjects()
        println "Parsing reference lists..."
        buildReferenceLists()
        println "Parsing layout attributes..."
        parseLayout()
        println "Parsing trace attributes..."
        parseTraces()
    }

    def parseValObjects() {
        schema.defs.valObjects.each { key, value ->
            valObjects[ key ] = new ValObject(
                description: value.description,
                otherOpts: value.otherOpts,
                requiredOpts: value.requiredOpts
            )
        }
    }

    def parseLayout() {
        def layoutConfigObjects = [:]
        parseAttributes( schema.layout.layoutAttributes, layoutConfigObjects, "layout" )
        layout = layoutConfigObjects
    }

    def parseTraces() {
        schema.traces.each { traceKey, traceConfig ->
            def thisTraceConfigObjects = [ attributes: [:], meta: traceConfig.meta ]
            parseAttributes( traceConfig.attributes, thisTraceConfigObjects.attributes, traceKey )
            traces[ traceKey ] = thisTraceConfigObjects
        }
        //println "Trace types found:"
        //println traces.keySet()
    }

    def mapToList( Map val ) {
        List l = []
        l.add( val )
        return l
    }

    def parseAttributes( Map attributes, Map configObjects, String parentKey ) {
        attributes.each { attName, attConfig ->

            debug = false
            // Match a specific attribute name and/or parentKey to debug only specific attributes
            if( attName == "xyz" ) {
                println "Debugging ${ parentKey }.${ attName }"
                debug = true
            }

            if( debug && attConfig instanceof Map && attConfig[ "role" ] == "object" && attConfig[ "items" ] instanceof Map
                && attConfig.size() == 2 && attConfig[ "items" ].size() == 1 ) {
                println "$attName (parent is $parentKey) is an object with an items map (with one key) and AttConfig.size of ${ attConfig.size() }"
            }

            // Item isn't an attribute
            if( !( attConfig instanceof Map ) ) {
                if( debug ) println "${ parentKey }: setting non-map attribute: ${ attName }"
                configObjects[ attName ] = attConfig
                //println attConfig
                //println " "
            }

            // Item is a standard attribute
            else if( attName != "_deprecated" && attConfig[ "role" ] && attConfig[ "role" ] != "object" ) {
                try {
                    def isItemsMap = false
                    // Some plotly `items` are an object instead of an array. Convert these to a List so they
                    // can be properly processed later.
                    if( attConfig.items instanceof Map ) {
                        isItemsMap = true
                        attConfig.items.keySet()
                        attConfig.items = mapToList( attConfig.items )
                    }

                    if( debug ) println "building AttributeConfig for: ${ parentKey }.${ attName }"
                    configObjects[ attName ] = new AttributeConfig(
                        attConfig
                    )
                    configObjects[ attName ].name = attName
                    configObjects[ attName ].parent = parentKey
                }
                catch( e ) {
                    println " "
                    println "error parsing: ${ parentKey }.${ attName }"
                    if( debug ) println " "; println attConfig; println " ";
                    println e
                    println " "
                }
            }

            // Item is a nested config object
            else if( attName != "_deprecated" ) {
                if( debug ) println "${ parentKey }.${ attName } is a nested object"
                configObjects[ attName ] = [:]
                parseAttributes( attConfig, configObjects[ attName ], attName )
            }
        }
    }


    // REFERENCE / LOOKUP VALUES

    def buildReferenceLists() {
        schema.layout.layoutAttributes.each { key, value ->
            if( key == "editType" ) {
                editTypes.layout << value
            }
            else if( !( value instanceof Map ) || !value[ "role" ] ) {
                println "Value for layout key ${ key } has no role: ${ value }"
            }
            else {
                if( value.role != 'object' && !roles.contains( value.role ) ) {
                    roles << value.role
                }
                if( !valTypes.contains( value.valType ) ) {
                    valTypes << value.valType
                }
            }
        }

        schema.traces.each { traceName, traceConfig ->
            traceConfig.attributes.each { key, value ->
                /*
                if( value instanceof String ) {
                    println "Value for schema ${ schemaName } trace key ${ key } has no role: ${ value }"
                }
                */

                if( key == "editType" && !editTypes.traces.contains( value ) ) {
                    editTypes.traces << value
                }
                else if( key == "type" && !traceTypes.contains( value ) ) {
                    traceTypes << value
                }
                else if( !( value instanceof Map ) || !value[ "role" ] ) {
                    if( debug ) println "Value for ${ traceName } key ${ key } has no role: ${ value }"
                }
                else {
                    if( value.role != 'object' && !roles.contains( value.role ) ) {
                        roles << value.role

                        value.each { key2, value2 ->
                            if( !standardKeys.contains( key2 ) ) {
                                standardKeys << key2
                            }
                        }

                    }

                    if( !valTypes.contains( value.valType ) ) {
                        valTypes << value.valType
                    }
                }
            }
        }
    }
}
