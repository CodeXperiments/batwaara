import pino from "pino";

import pretty from "pino-pretty";

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: "time,hostname,pid",
});

export const logger = pino(
    {
      name: "logs",
      level: "debug"
    },
    stream
);
