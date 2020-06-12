class Config
{
    // Library info
    def libraryName

    // Path to save definition into
    def outputPath = new File("../../dist" )

    def fileName = "index.d.ts"

    // Path to JSON schema
    def jsonSchema

    def jsSourceFile = new File("../../dist/plotly.js" )
}
