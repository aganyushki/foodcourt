'use strict';

const path = require('path');
const webpack = require('webpack');

const config = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, "../src/main/javascript/far/galaxy/foodcourt/web/index.js")
    },
    output: {
        path: path.resolve(__dirname, "../build/out"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            "transform-class-properties",
                            "transform-function-bind",
                            "transform-object-rest-spread",
                        ],
                        presets: [
                            'babel-preset-env',
                            'react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            "node_modules"
        ]
    },
    plugins: [

    ]
};

module.exports = config;

config.plugins.push(new webpack.DefinePlugin({
    "X": "\"x_entry\""
}));

const HtmlWebpackPlugin = require('html-webpack-plugin');
config.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/main/resources/index.html')
}));
