import hooks from "./hooks"; // Importăm hook-uri personalizate

// Obiect care conține Higher-Order Components (HOC-uri)
const hocs = {
  // HOC pentru gestionarea sesiunii de autentificare
  withAuthSession: (PageComponent) => {
    // Returnăm un nou component care încapsulează logica de autentificare
    const Component = (props) => {
      // Folosim hook-ul personalizat pentru a obține starea sesiunii
      const session = hooks.useAuthSession();

      // Afișăm loading indicator dacă datele se încarcă
      if (session.isLoading) {
        return <p>Loading...</p>; // În practică, poate fi înlocuit cu un component de loading mai elaborat
      }

      // Verificăm dacă utilizatorul este autentificat
      if (!session.isAuthenticated) {
        return <p>You are not authenticated.</p>; // Mesaj pentru utilizatorii neautentificați
      }

      // Dacă totul este în regulă, randăm componenta originală cu props-urile ei
      return <PageComponent {...props} />;
    };
    
    // Returnăm componenta creată (atenție la sintaxa JSX aici)
    return Component; // Corectare: ar trebui să returnăm Component, nu <Component />
  },
};

export default hocs;