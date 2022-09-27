const htmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true,
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
            }
        ]
    },

    optimization: {

    },

    plugins: [
        new htmlWebPack({
            title: 'Mi webpack app',
            //filename: 'index.html',
            template: './src/index.html'
        }),

        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns:[
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ],
}