const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = () => {
    const config = require(IS_DEVELOPMENT ? './development' : './production');

    return [config()]
};
