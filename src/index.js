import React from "react";
import t from 'prop-types';
import getMissingRoles from "./utils/getMissingRoles";

const { Consumer, Provider } = React.createContext("authorizator");

class AuthProvider extends React.Component {
  render() {
    const { roles, children } = this.props;
    return (
      <Provider value={{ roles }}>
        {children}
      </Provider>
    );
  }
}

AuthProvider.propTypes = {
  roles: t.arrayOf(t.string),
  children: t.node,
}

class Authorize extends React.Component {
  render() {
    const { neededRoles, children } = this.props;
    return (
      <Consumer>
        {({ roles }) => {
          const missingRoles = getMissingRoles(neededRoles, roles);
          const isAuthorized = !missingRoles.length;
          const lacksRole = role => missingRoles.indexOf(role) >= 0;
          return children({ isAuthorized, missingRoles, lacksRole });
        }}
      </Consumer>
    );
  }
}

Authorize.propTypes = {
  children: t.func,
  neededRoles: t.arrayOf(t.string).isRequired,
}

export {
  AuthProvider,
  Authorize,
}