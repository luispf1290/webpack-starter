const htmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizerWebpack = require('css-minimizer-webpack-plugin');
const TerserWebpack = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /style\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /style\.css$/,
                use: [MiniCssExtract.loader, 'css-loader'],

            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    minimize: false,
                    sources: false
                }
            },

            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerWebpack(),
            new TerserWebpack(),
        ]
    },

    plugins: [
        new htmlWebPack({
            title: 'Mi webpack app',
            //filename: 'index.html',
            template: './src/index.html'
        }),

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns:[
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ],
}