export const config = {
  dev: {
    username: process.env.CONFIG_DEV_USERNAME,
    password: process.env.CONFIG_DEV_PASSWORD,
    database: process.env.CONFIG_DEV_DATABASE,
    host: process.env.CONFIG_DEV_HOST,
    dialect: 'postgres',
    aws_region: process.env.CONFIG_DEV_AWS_REGION,
    aws_profile: process.env.CONFIG_DEV_AWS_PROFILE,
    aws_media_bucket: process.env.CONFIG_DEV_AWS_MEDIA_BUCKET,
    jwt: { secret: 'helloworld' },
  },
  prod: {
    username: '',
    password: '',
    database: 'udagram_prod',
    host: '',
    dialect: 'postgres',
  },
}
