import path from 'path';
import webpack from 'webpack';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssColorFunction from 'postcss-color-function';
import postcssMixins from 'postcss-mixins';
import postcssClearfix from 'postcss-clearfix';
import autoprefixer from 'autoprefixer';

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
    //devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel',
                query: {
                    "plugins": [
                        ["react-transform", {
                            "transforms": [{
                                "transform": "react-transform-hmr",
                                "imports": ["react"],
                                "locals": ["module"]
                            },{
                                "transform": "react-transform-catch-errors",
                                "imports": ["react", "redbox-react"]
                            }]
                        }]
                    ]
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    postcss: function () {
        return [
            postcssImport({addDependencyTo: webpack}),
            postcssMixins,
            postcssNested,
            postcssSimpleVars,
            postcssColorFunction,
            postcssClearfix,
            autoprefixer({ browsers: ['last 2 versions'] })
        ];
    }
};
