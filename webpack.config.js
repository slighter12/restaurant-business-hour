const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientConfig = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    target: 'web',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_module/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            },
        },
        {
            test: /\.pug$/,
            use: [ 'html-loader',
                {
                    loader: 'pug-html-loader',
                    options: {
                        pretty: true
                    }
                }],
        },
        {
            test: /\.(scss|sass)$/,
            use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ],
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css'
        })
    ]
};

module.exports = [ clientConfig ];
