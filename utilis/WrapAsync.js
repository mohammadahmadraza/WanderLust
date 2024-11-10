module.exports = WrapAsync = (fn) => {
    new function (req, res, next) {

        fn(req, res, next).catch(next);
    }
}