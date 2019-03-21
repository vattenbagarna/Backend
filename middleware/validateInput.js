/*
 *  Filter - Filters user input to not contain anything bad
 *  Looks att all URL parameters and filters all that are deemed bad
 *  This filter function calls other functions that validate for different things
*/

/**
 * Check string for any illegal characters
 *
 * @param {string} String to check for illegal characters
 * @return {bool} If string has illegal characters or not
 */
const checkIllegalChars = (string) => {
    if (
        string.includes("'") ||
		string.includes('"') ||
		string.includes("´") ||
		string.includes(":") ||
		string.includes(";") ||
		string.includes("{") ||
		string.includes("}") ||
		string.includes("/") ||
		string.includes("\\")||
		string.includes("$") ||
		string.includes("<") ||
		string.includes(">") ||
		string.includes("&")
    ) {return true;}
    return false;
};

/**
 * Check if variable is anything but string, number, array and json
 * String will also check for illegal characters
 *
 * @param {any} Variable to check variable type
 * @return {bool} If variable has illegal variables or not
 */
const isInvalidVariable = (variable) => {
    //Check if string, int, float, array and json
    let con = variable.constructor;

    //check for string
    if (con === "".constructor) {
        console.log("found string");
        //check if string has illegal characters
        return checkIllegalChars(variable);
    }

    //check for number
    if (!isNaN(variable)) {
        console.log("found number");
        return false;
    }

    //check for array
    if (con === [].constructor) {
        for (let i = 0; i < variable.length; i++) {
            //check array values for type
            if (isInvalidVariable(variable[i])) {
                return true;
            }
        }
        return false;
    }

    //Check for JSON object
    if (con === {}.constructor) {
        let keys = Object.keys(variable);

        for (let i = 0; i < keys.length; i++) {
            //check JSON object values for type
            if (isInvalidVariable(variable[keys[i]])) {
                return true;
            }
        }
        return false;
    }

    return true;
};

const filter = (req, res, next) => {
    if (req.params  != undefined) {
        console.log("=== FOUND PARAMETERS ===");
        // Itterate all parameters
        for (let value in req.params) {
            console.log(value, ":", req.params[value]);

            //perform check for illegal variable types
            if (isInvalidVariable(req.params[value])) {
                console.log("BAD VARIABLE FOUND");
                break;
            }
        }
    }
    // Continue forward
    next();
};


module.exports = {
    filter
};
