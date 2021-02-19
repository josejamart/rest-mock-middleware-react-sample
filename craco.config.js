const restMockMiddleware = require('@devaway/rest-mock-middleware');
const { resolve } = require('path');
const cors = require('cors');

module.exports = {
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
        devServerConfig.setup = function (app, server) {
            app.use(
                '/api',
                cors(),
                restMockMiddleware({
                    root_dir: resolve(__dirname, "./mocks"),
                    logger: {
                      level: "debug"
                    }
                }),
            );
        };
        return devServerConfig;
    },
}