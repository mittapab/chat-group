exports.success = async (message,data) => {
   return {status:'ok',message,data}
};
exports.error = async (message,data) => {
    return {status:'nok',message,data}
};