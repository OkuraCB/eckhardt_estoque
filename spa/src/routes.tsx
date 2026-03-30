import { isBefore } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { JSX } from "react";
import {
  Location,
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Home } from "./features/home";
import { Login } from "./features/login";
import { login, selectUser } from "./features/users/usersSlice";
import { DefaultLayout } from "./layout/default.layout";

export interface Payload {
  exp: number;
  sub: number;
  name: string;
  email: string;
  role: string;
  saloonId: number;
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <CheckLogin>
            <Login />
          </CheckLogin>
        }
      />

      <Route
        path="/"
        element={
          <RequireAuth>
            <DefaultLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
      </Route>

      <Route
        path="*"
        element={
          <RequireAuth>
            <Navigate to="/" />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

const CheckLogin = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const location: Location = useLocation();
  const [searchParams] = useSearchParams();

  if (user.logged)
    return (
      <Navigate
        to={searchParams.get("redirect") || "/home"}
        state={{ from: location }}
        replace
      />
    );

  const envToken = localStorage.getItem(process.env.REACT_TOKEN!);

  if (envToken) {
    try {
      const token = jwtDecode<Payload>(envToken);

      const now = new Date();
      const expDate = new Date(token.exp * 1000);

      if (isBefore(now, expDate)) {
        dispatch(
          login({
            id: token.sub,
            email: token.email,
            name: token.name,
            role: token.role,
          })
        );
      } else {
        enqueueSnackbar("Sua sessão expirou, por favor entre novamente", {
          variant: "info",
        });
        localStorage.removeItem(process.env.REACT_TOKEN!);
        return <Navigate to="login" state={{ from: location }} replace />;
      }
    } catch (e) {
      localStorage.removeItem(process.env.REACT_TOKEN!);
      return <Navigate to="login" state={{ from: location }} replace />;
    }
  }

  return children;
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!user.logged) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );
  }

  return children;
};

const RequireAccess = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: any;
}) => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  for (const role of roles) {
    if (user.role !== role) {
      enqueueSnackbar(
        "Você não possui permissões o suficiente para acessar essa página",
        { variant: "error" }
      );
      return (
        <Navigate
          to={`/unauthorized?redirect=${encodeURIComponent(location.pathname)}`}
          state={{ from: location }}
          replace
        />
      );
    }
  }

  return children;
};
