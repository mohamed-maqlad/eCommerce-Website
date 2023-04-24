const Ajv = require("ajv").default;


const ajv = new Ajv();

const Schema = {
    "type":"object",
    "properties":{
        "name":{"type":"string","pattern":"^[A-Z][a-z]*$","minLength":4,"maxLength":30},
        "email":{"type":"string","pattern":".+\@.+\..+"},
        "password":{"type":"string","minLength":5,"maxLength":30},
        "address":{"type":"string","minLength":5,"maxLength":30},
        

    },
    "required":["address","email"]
}

module.exports = ajv.compile(Schema)