let opentelemetry = require('@opentelemetry/api');
let { registerInstrumentations } = require('@opentelemetry/instrumentation');
let { Resource } = require('@opentelemetry/resources');
let {
  BasicTracerProvider,
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} = require('@opentelemetry/sdk-trace-base');
let { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
let { getMetisExporter, MetisHttpInstrumentation, MetisPgInstrumentation } = require('@metis-data/pg-interceptor');
let { AsyncHooksContextManager } = require('@opentelemetry/context-async-hooks');

let tracerProvider;
let metisExporter;

const shudownhook = async () => {
  console.log('Shutting down tracer provider and exporter...');
  await tracerProvider?.shutdown();
  await metisExporter?.shutdown();
  console.log('Tracer provider and exporter were shut down.');
}

process.on('SIGINT', () => {
  shudownhook().finally(() => process.exit(0));
});
process.on('SIGTERM', () => {
  shudownhook().finally(() => process.exit(0));
});

const connectionString = process.env.DATABASE_URL;

const startMetisInstrumentation = () => {
  tracerProvider = new BasicTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: process.env.METIS_SERVICE_NAME,
      [SemanticResourceAttributes.SERVICE_VERSION]: process.env.METIS_SERVICE_VERSION,
    }),
  });

  metisExporter = getMetisExporter(process.env.METIS_API_KEY);

  tracerProvider.addSpanProcessor(new BatchSpanProcessor(metisExporter));
  
  if (process.env.OTEL_DEBUG === "true") {
    tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  }

  const contextManager = new AsyncHooksContextManager();

  contextManager.enable();
  opentelemetry.context.setGlobalContextManager(contextManager);

  tracerProvider.register();

  const excludeUrls = [/favicon.ico/];
  registerInstrumentations({
    instrumentations: [new MetisPgInstrumentation({ connectionString }), new MetisHttpInstrumentation(excludeUrls)],
  });
};

module.exports = {
  startMetisInstrumentation,
  shudownhook,
};
