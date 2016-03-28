import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config.dev';

const devServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        "*": "http://0.0.0.0:8080"
    },
    stats: {
        colors: true
    }
});

devServer.listen(4444, '0.0.0.0', (err, result) => {
    if (err) { console.log(err); }

    console.log('Listening at 0.0.0.0:4444');
});
