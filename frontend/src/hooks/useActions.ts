import { bindActionCreators } from "@reduxjs/toolkit";
import { rootActions } from "@store/root-actions";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
