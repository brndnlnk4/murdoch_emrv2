  module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ],
  	plugins: [
      "react-hot-loader/babel",
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-proposal-class-properties",
  		"@babel/plugin-transform-async-to-generator",
      // "@babel/plugin-proposal-export-default-from",
  	]
  };
