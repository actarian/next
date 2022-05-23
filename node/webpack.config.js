const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './mock.build.ts',
    output: {
        filename: 'mock.build.js',
        libraryTarget: 'this',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    externals: [nodeExternals()]
};
