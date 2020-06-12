import groovy.json.JsonSlurper

class TsdGenerator {

    Config config
    Map events
    def schema

    def generate() {
        events = readPlotlyEvents()
        return readJson()
    }

    def readJson() {
        def slurper = new JsonSlurper()
        schema = slurper.parseText( config.jsonSchema.text )
        SchemaParser schemaParser = new SchemaParser( schema: schema )
        schemaParser.parseSchema()

        TsdWriter tsdWriter = new TsdWriter( config: config, schemaParser: schemaParser, events: events )
        tsdWriter.writeTsd()
        return schema
    }

    def readPlotlyEvents() {
        Map events = [:]

        // Known "data" event names. If new data events are added to Plotly, you can add them to the list.
        events.dataEventNames = [ "plotly_click", "plotly_hover", "plotly_unhover", "plotly_selecting", "plotly_selected" ]

        // Known "update" event names. If new update events are added to Plotly, you can add them to the list.
        events.updateEventNames = [ "plotly_restyle", "plotly_relayout" ]

        events.allEvents = []
        events.dataEvents = []
        events.updateEvents = []
        events.otherEvents = []
        def matcher

        config.jsSourceFile.eachLine { line ->
            if( ( matcher = line =~ /(emit\(')([^']+)'/ ) ) {
                events.allEvents << matcher[0][2]
            }
            else if( ( matcher = line =~ /(triggerHandler\(.*')([^']+)'/ ) ) {
                events.allEvents << matcher[0][2]
            }
        }

        events.allEvents = events.allEvents.unique()
        events.allEvents.each { thisEvent ->
            if( events.dataEventNames.contains( thisEvent ) ) {
                events.dataEvents << thisEvent
            }
            else if( events.updateEventNames.contains( thisEvent ) ) {
                events.updateEvents << thisEvent
            }
            else {
                events.otherEvents << thisEvent
            }
        }


        println " "
        println "Events found in plotly.js source file. Manually copy into plotly-events.model.ts:"

        println " "
        println "/**"
        println " * Plotly events that typically handle event data of type {CartesianEventPoint}."
        println " */"
        println "export class PlotlyDataEvents {"
        events.dataEvents.each { thisEvent ->
            println "  static ${ thisEvent } = \"${ thisEvent }\";"
        }
        println "}"
        println " "

        println "/**"
        println " * Plotly update events."
        println " * Event data includes an array containing an object of updated attributes and an array of the trace numbers that were updated."
        println " */"
        println "export class PlotlyUpdateEvents {"
        events.updateEvents.each { thisEvent ->
            println "  static ${ thisEvent } = \"${ thisEvent }\";"
        }
        println "}"
        println " "

        println "/**"
        println " * Other Plotly events that either have no event data, or have custom event data (see Plotly docs or source code)."
        println " */"
        println "export class PlotlySimpleEvents {"
        events.otherEvents.each { thisEvent ->
            println "  static ${ thisEvent } = \"${ thisEvent }\";"
        }
        println "}"
        println " "
        
        return events
    }

}
