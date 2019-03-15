const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Graph contest',
			filename: 'index.html',
			meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
		})
	],
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]'
					}
				},
			}
		]
	},
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		watchContentBase: true
	}
};