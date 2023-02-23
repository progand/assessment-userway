import path from "path";

export default {
  root: path.resolve(__dirname, "./"),
  resolve: {
    alias: {},
  },
  server: {
    port: 8080,
    hot: true,
  },
};
