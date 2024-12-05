import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>Pokedex</h1>
        </div>
      </header>
      
      <main className="container">
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;