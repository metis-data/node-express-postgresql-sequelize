FROM public.ecr.aws/o2c0x5x8/application-base:node-express-postgres-sequelize

WORKDIR /usr/src/app

COPY . ./

CMD OTEL_TRACES_EXPORTER="otlp" \
    OTEL_EXPORTER_OTLP_PROTOCOL=http/json \
    OTEL_NODE_RESOURCE_DETECTORS="all" \
    OTEL_EXPORTER_OTLP_ENDPOINT="http://127.0.0.1:4318/" \
    OTEL_SERVICE_NAME="sequelize" \
    NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register --require @opentelemetry/exporter-trace-otlp-http" \npm start
