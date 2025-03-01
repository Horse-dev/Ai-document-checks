const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    blocks: "./src/blocks/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-react-jsx"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => {
        return chunk.name === "blocks" ? "blocks.css" : "[name].css";
      },
    }),
  ],
  externals: {
    "wp-blocks": "wp.blocks",
    "wp-element": "wp.element",
    "wp-editor": "wp.editor",
    "wp-components": "wp.components",
    "wp-i18n": "wp.i18n",
    "wp-data": "wp.data",
    "wp-compose": "wp.compose",
    "wp-block-editor": "wp.blockEditor",
  },
};
