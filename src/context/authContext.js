import { createContext, useState, useEffect, useCallback } from 'react';
import fb from '../utils/fb';
import api from '../utils/api';

export const AuthContext = createContext({
  isLogin: false,
  user: {},
  loading: false,
  jwtToken: '',
  login: () => {},
  logout: () => {},
  role: 0,
});

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState();
  const [role, setRole] = useState(0);

  const handleLoginResponse = useCallback(async (response) => {
    const accessToken = response.authResponse.accessToken;
    const { data } = await api.signin({
      provider: 'facebook',
      access_token: accessToken,
    });
    const { access_token: tokenFromServer, user: userData } = data;
    setUser(userData);
    setJwtToken(tokenFromServer);
    window.localStorage.setItem('jwtToken', tokenFromServer);
    setIsLogin(true);
    return tokenFromServer;
  }, []);

  useEffect(() => {
    if (jwtToken) {
      fetch(`https://side-project2023.online/api/1.0/user/getuserrole`, {
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(`your role is`, data.data.role_id);
          setRole(data.data.role_id);
        });
    }
  }, [jwtToken]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await fb.init();
      const response = await fb.getLoginStatus();

      if (response.status === 'connected') {
        handleLoginResponse(response);
        setLoading(false);
      } else {
        window.localStorage.removeItem('jwtToken');
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, [handleLoginResponse]);

  const login = async () => {
    setLoading(true);
    const response = await fb.login();
    if (response.status === 'connected') {
      const tokenFromServer = handleLoginResponse(response);
      setLoading(false);

      return tokenFromServer;
    } else {
      window.localStorage.removeItem('jwtToken');
      setLoading(false);
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    await fb.logout();
    setIsLogin(false);
    setUser({});
    setJwtToken();
    window.localStorage.removeItem('jwtToken');
    setLoading(false);
    setRole(0);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        loading,
        jwtToken,
        login,
        logout,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
