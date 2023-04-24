const Ajv = require("ajv").default
const ajv = new Ajv()

const Schema = {
    "type":"object",
    "properties":{
        "amount":{"type":"number","minimum":1,"maximum":10}
    },
    "required":["amount"]
}


module.exports= ajv.compile(Schema)
