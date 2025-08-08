const path = require("node:path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const targetBrowser = process.env.TARGET_BROWSER || "firefox";

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
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
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
        targetBrowser === "firefox"
          ? {
              from: "icons/firefox",
              to: "icons",
            }
          : {
              from: "icons/chrome",
              to: "icons",
            },
      ],
    }),
  ],
};
