class Config
{
    // Library info
    def libraryName
    def libraryVersion

    // Path to save definition into
    def outputPath = new File("./tsd/plotly.js" )

    def fileName = "index.d.ts"

    // Path to JSON schema
    def jsonSchema

    def jsSourceFile = new File("./js/plotly.js" )
}
