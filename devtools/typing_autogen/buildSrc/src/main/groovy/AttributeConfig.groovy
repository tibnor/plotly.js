class AttributeConfig {
    def _deprecated

    String description
    String role
    String valType
    String editType
    String impliedEdits
    String dflt // default
    List<String> values
    List<String> flags
    List<String> extras
    List items
    Boolean freeLength // related to info_array
    String dimensions


    String itemTypes // for tracking type info of info_array elements

    // TODO: Conditionally add to comment for better JSDoc documentation?
    String min
    String max
    Boolean _isSubplotObj
    Boolean noBlank
    Boolean arrayOk //(also allow array of values)
    Boolean strict //(???? see 'titlefont')
    Boolean coerceNumber
    Boolean _noTemplating

    String name // attribute name
    String parent // parent attribute name
}