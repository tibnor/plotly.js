@Grab('org.grooscript:grooscript:1.2.2')

import org.grooscript.GrooScript

def conversionOptions = [:]
conversionOptions['initialText'] = "var gs = require('grooscript');"
conversionOptions['includeDependencies'] = true

GrooScript.convert 'AttributeConfig.groovy', 'js', conversionOptions
GrooScript.convert 'SchemaParser.groovy', 'js', conversionOptions
GrooScript.convert 'TsdGenerator.groovy', 'js', conversionOptions
GrooScript.convert 'TsdTemplates.groovy', 'js', conversionOptions
GrooScript.convert 'TsdWriter.groovy', 'js', conversionOptions
GrooScript.convert 'TypeUtils.groovy', 'js', conversionOptions
GrooScript.convert 'ValObject.groovy', 'js', conversionOptions