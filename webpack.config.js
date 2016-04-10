var BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );

module.exports = {
	entry: "./src/index.js",
	
	output: {
		path: __dirname,
		filename: "./public/bundle.js"
	},
	node: {
		fs: "empty"
	},
	plugins:[
		new BrowserSyncPlugin( {
			host: 'localhost',
			port: 3000,
			server: {
				baseDir: [
					'public'
				]
			}
		})
	]
};