var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

config.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve('../src/main/resources/index.html')
}));
