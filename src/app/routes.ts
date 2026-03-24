import { createBrowserRouter } from "react-router";
import Landing from "./components/Landing";
import Question from "./components/Question";
import Loading from "./components/Loading";
import Result from "./components/Result";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/question",
    Component: Question,
  },
  {
    path: "/loading",
    Component: Loading,
  },
  {
    path: "/result",
    Component: Result,
  },
]);