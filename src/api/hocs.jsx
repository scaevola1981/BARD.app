
import hooks from "./hooks";

const hocs = {
  withAuthSession: (PageComponent) => {
    const Component = (props) => {
      // Tip: Get the actual user session if exists
      const session = hooks.useAuthSession();

      // Tip: e.g. Show a circle loader in the center of the screen
      if (session.isLoading) {
        return <p>Loading...</p>;
      }

      // Tip: Show a message to login or not authenticated
      if (!session.isAuthenticated) {
        return <p>You are not authenticated.</p>;
      }

      // Tip: Show the page where authentication and authorisation is needed
      return <PageComponent {...props} />;
    };
    return <Component />;
  },
};

export default hocs;
