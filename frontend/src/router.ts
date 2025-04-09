// src/router.ts

export type RouteHandler = () => void;

export class Router {
  private routes: { [path: string]: RouteHandler } = {};

  // Add a new route with its corresponding handler
  public addRoute(path: string, handler: RouteHandler): void {
    this.routes[path] = handler;
  }

  // Navigate to a route
  public navigate(path: string): void {
    if (this.routes[path]) {
      // Update the browser history
      history.pushState({ path }, "", path);
      this.routes[path]();
    } else {
      console.error(`Route for path ${path} not found`);
    }
  }

  // Initialize listening to popstate for back/forward navigation
  constructor() {
    window.addEventListener("popstate", (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.path && this.routes[state.path]) {
        this.routes[state.path]();
      } else {
        // Fallback to home route if state is undefined
        this.routes["/"]();
      }
    });
  }
}
