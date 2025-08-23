const path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const targetBrowser = process.env.TARGET_BROWSER || "firefox";

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "production",
  entry: {
    content: "./src/content.ts",
    popup: "./src/popup.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "static",
          to: ".",
        },
      ],
    }),
    ...(process.env.NODE_ENV === "development"
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
        ]
    ),
  ],
};
