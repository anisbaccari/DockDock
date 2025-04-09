// src/router.ts
export class Router {
    // Add a new route with its corresponding handler
    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    // Navigate to a route
    navigate(path) {
        if (this.routes[path]) {
            // Update the browser history
            history.pushState({ path }, "", path);
            this.routes[path]();
        }
        else {
            console.error(`Route for path ${path} not found`);
        }
    }
    // Initialize listening to popstate for back/forward navigation
    constructor() {
        this.routes = {};
        window.addEventListener("popstate", (event) => {
            const state = event.state;
            if (state && state.path && this.routes[state.path]) {
                this.routes[state.path]();
            }
            else {
                // Fallback to home route if state is undefined
                this.routes["/"]();
            }
        });
    }
}
