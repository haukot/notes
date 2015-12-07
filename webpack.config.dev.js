import path from 'path';
import webpack from 'webpack';

module.exports = {
    resolve: {
        root: path.join(__dirname, 'src')
    },
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            path.join(__dirname, 'src', 'client.js')
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['react-hot', 'babel'] }
        ]
    }
};
