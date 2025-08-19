/** biome-ignore-all lint/nursery/useConsistentTypeDefinitions: <explanation> */
/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
import './App.css';
import {
  createRouter,
  RouterProvider as TanstackRouterProvider,
} from '@tanstack/react-router';
import { Route } from './routes/not-found';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import useAuthStore from './store/AuthStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
// Create a new router instance
const tanstackRouter = createRouter({
  routeTree,
  scrollRestoration: true,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
    queryClient,
  },
  notFoundRoute: Route,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof tanstackRouter;
  }
}

function App() {
  const auth = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <TanstackRouterProvider context={{ auth }} router={tanstackRouter} />
    </QueryClientProvider>
  );
}

export default App;
