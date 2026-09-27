


import { useAuth } from "./AuthContext";

// Obiect care conține Higher-Order Components (HOC-uri)
const hocs = {
  // HOC pentru gestionarea sesiunii de autentificare
  withAuthSession: (PageComponent) => {
    const Component = (props) => {
      const { currentUser } = useAuth();

      if (!currentUser) {
        return <p>Nu ești autentificat.</p>;
      }

      return <PageComponent {...props} />;
    };

    return Component;
  },
};

export default hocs;