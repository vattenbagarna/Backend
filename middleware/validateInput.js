/*
 *  Filter - Filters user input to not contain anything bad
 *  Looks att all URL parameters and filters all that are deemed bad
 *  This filter function calls other functions that validate for different things
*/
const filter = (req, res, next) => {
    if (req.params  != undefined) {
        console.log("=== FOUND PARAMETERS ===");
        // Itterate all parameters
        for (let value in req.params) {
            console.log(value, ":", req.params[value]);

            //preform check for illegal characters.
            if (
                req.params[value].includes("'") ||
                req.params[value].includes("$") ||
                req.params[value].includes("<")
            ) {
                console.log("BAD CHARACTER FOUND");
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
