import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config.dev';

const devServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        "*": "http://localhost:8080"
    },
    stats: {
        colors: true
    }
});

devServer.listen(3000, 'localhost', (err, result) => {
    if (err) { console.log(err); }

    console.log('Listening at localhost:3000');
});
