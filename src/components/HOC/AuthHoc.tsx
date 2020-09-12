import React from "react";

export const AuthHoc = ({ auth, children, checkAuth }) => {
  React.useEffect(() => {
    checkAuth();
  }, []);
  return !auth.isInitialized || auth.isFetching ? (
    <LoadingPage />
  ) : auth.isInitialized && !auth.isSignedIn ? (
    <AuthPage />
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};