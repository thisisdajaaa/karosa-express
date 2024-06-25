import { createContainer, InjectionMode, Lifetime } from "awilix";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.loadModules(
  ["../api/services/*.{ts,js}", "../api/models/*.{ts,js}"],
  {
    cwd: __dirname,
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
    },
  }
);

// console.log('Modules loaded:', Object.keys(container.registrations));

export { container };
