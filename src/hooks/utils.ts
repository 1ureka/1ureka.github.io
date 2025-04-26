import { useCallback, useMemo, useState } from "react";

const useAnchorEl = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => setAnchorEl((prev) => (prev ? null : event.currentTarget)),
    []
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);

  return { anchorEl, handleOpen, handleClose };
};

type State = string | number | boolean | object | undefined | null;

const useStateWithPrev = <T extends State>(initialValue: T) => {
  const [value, setValue] = useState<{ current: T; prev: T | null }>({ current: initialValue, prev: null });

  const setState = useCallback((update: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const prevValue = prev.current;
      const newValue = typeof update === "function" ? update(prevValue) : update;
      return { current: newValue, prev: prevValue };
    });
  }, []);

  const state = useMemo(() => value.current, [value]);
  const prevState = useMemo(() => value.prev, [value]);

  return [state, setState, prevState] as const;
};

const useStateWithHistory = <T extends State>(initialValue: T, maxLength: number) => {
  const [value, setValue] = useState<T[]>([initialValue]);

  // 透過反轉陣列順序，來讓整段代碼更不容易出bug, 更好懂, 不須 validate maxLength
  const setState = useCallback(
    (update: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const prevValue = prev[0];
        const newValue = typeof update === "function" ? update(prevValue) : update;
        return [newValue, ...prev].slice(0, maxLength);
      });
    },
    [maxLength]
  );

  const state = useMemo(() => value[0], [value]);
  const history = useMemo(() => value.slice(1), [value]);
  const prevState = useMemo(() => value[1], [value]);

  return [state, setState, history, prevState] as const;
};

export { useAnchorEl, useStateWithPrev, useStateWithHistory };
