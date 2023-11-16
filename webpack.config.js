const webpack = require('webpack');
const path = require('path');
module.exports = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							"@babel/preset-react"
						
						]
					}
				},
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js'],
	},
	plugins: [
		new webpack.CleanPlugin(),
	],
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist')
	},

}

