// module.exports = [
//   {
//       target: 'node',
//       entry: './server.js',
//       // Other server-specific configurations
//   },
//   {
//       target: 'web', // Set target to web to polyfill Node.js built-in modules
//       node: {
//           fs: 'empty', // Provide an empty module for fs
//           path: 'empty', // Provide an empty module for path
//           tty: 'empty', // Provide an empty module for tty
//           stream: 'empty', // Provide an empty module for stream
//           os: 'empty', // Provide an empty module for os
//           events: 'empty', // Provide an empty module for events
//           // Add other built-in modules here if needed
//       },
//       entry: './client.js',
//       // Other client-specific configurations
//   },
// ];
// webpack.config.js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
import sanityClient from '@sanity/client';


module.exports = {
    target: 'node',
	// Other rules...
	plugins: [
        new NodePolyfillPlugin({
			excludeAliases: ['tty']
		})
	]
};