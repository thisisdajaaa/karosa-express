import { env } from "@app/config/environment";
import expressStatusMonitor from "express-status-monitor";

// https://www.npmjs.com/package/express-status-monitor#health-checks
interface IHealthCheckItem {
  protocol: string;
  host: string;
  path: string;
  port: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const expressMonitor = () => {
  const options: expressStatusMonitor.ExpressStatusMonitorConfig = {
    healthChecks: [
      {
        protocol: "http",
        host: "localhost",
        port: `${env.port}`,
        path: "/v1/maintenance",
      },
    ] as IHealthCheckItem[],
  };

  return expressStatusMonitor(options);
};
