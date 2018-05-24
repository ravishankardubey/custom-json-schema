# JSON Schema Form for SODA
In Order to create custom JSON Schema for every product we need to follow certain guidelines based on the input elements present in FORM.

## Structure: 
```json
{
    "type": "object",
    "title": "<form title >",
    "style": {
        "<CSS property >": "< Value >"
    },
    "properties": {
        "<keyName >": {
            "title": "< Title of the field >",
            "fieldType": "< input types: text / date / textarea >",
            "required": "< Boolean >",
            "disabled": "< Boolean >",
            "pattern": "< regEx pattern >",
            "style": {
                "<CSS property >": "< Value >"
            }
        },
        "<keyName_1 >": {
            "title": "< Title of the field >",
            "fieldType": "< input types: text / date / textarea >",
            "required": "< Boolean >",
            "disabled": "< Boolean >",
            "pattern": "< regEx pattern >",
            "style": {
                "<CSS property >": "< Value >"
            }
        }
    }
}
```
The elements of the form will be confined in the properties of the JSON Object. Inside Properties, schema for all the elements will be written. 

## Child Elements:
In Case if there is any child element in the form, then the child element itself will have the same property as an individual FORM.

### For example:  
checkout **<keyName_1>** in given schema
```json
{
    "type": "object",
    "title": "<form title >",
    "style": {
        "<CSS property >": "< Value >"
    },
    "properties": {
        "<keyName >": {
            "title": "< Title of the field >",
            "fieldType": "< input types: text / date / textarea >",
            "required": "< Boolean >",
            "disabled": "< Boolean >",
            "pattern": "< regEx pattern >",
            "style": {
                "<CSS property >": "< Value >"
            }
        },
        "<keyName_1 >": {
            "type": "object",
            "title": "<form title >",
            "style": {
                "<CSS property >": "< Value >"
            },
            "properties": {
                "<keyName_2>": {
                    "title": "< Title of the field >",
                    "fieldType": "< input types: text / date / textarea >",
                    "required": "< Boolean >",
                    "disabled": "< Boolean >",
                    "pattern": "< regEx pattern >",
                    "style": {
                        "<CSS property >": "< Value >"
                    }
                }
            }
        }
    }
}
```

## Schema Structure for Different input types:
### Text
```json
{
    "<keyName >": {
        "title": "< Title of the field >",
        "fieldType": "text",
        "required": true / false,
        "disabled": true / false,
        "pattern": "< regEx pattern >",
        "style": {
            "<CSS property >": "< Value >"
        }
    }
}
```
### Textarea
```json
{
    "<keyName >": {
        "title": "< Title of the field >",
        "fieldType": "textarea",
        "required": true / false,
        "disabled": true / false,
        "cols": "<number>",
        "rows": "<number>",
        "style": {
            "<CSS property >": "< Value >"
        }
    }
}
```

### Checkbox
```json
{
    "<keyName>": {
        "title": "< Title of the field >",
        "fieldType": "checkbox",
        "required": true / false,
        "style": {
            "<CSS property >": "< Value >"
        }
    }
}
```


### Select
```json
{
    "<keyName>": {
        "title": "< Title of the field >",
        "fieldType": "select",
        "LOVS": ["<value_1>", "<value_2>", "<value_3>", ....],
        "required": true / false,
        "disabled": true / false,
        "style": {
            "<CSS property >": "< Value >"
        }
    }
}
```


### Date
```json
{
    "<keyName >": {
        "title": "< Title of the field >",
        "fieldType": "date",
        "required": true / false,
        "disabled": true / false,
        "style": {
            "<CSS property >": "< Value >"
        }
    }
}
```

