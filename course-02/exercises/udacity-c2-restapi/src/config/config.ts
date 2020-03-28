export const config = {
  dev: {
    username: process.env.CONFIG_DEV_USERNAME,
    password: process.env.CONFIG_DEV_PASSWORD,
    database: process.env.CONFIG_DEV_DATABASE,
    host: process.env.CONFIG_DEV_HOST,
    dialect: "postgres",
    aws_region: "",
    aws_profile: "",
    aws_media_bucket: ""
  },
  prod: {
    username: "",
    password: "",
    database: "udagram_prod",
    host: "",
    dialect: "postgres"
  }
};
