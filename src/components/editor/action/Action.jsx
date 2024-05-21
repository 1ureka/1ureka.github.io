function useAction() {
  const [loading, setLoading] = useRecoilState(CONVERT_PROCESSING);
  const [input, setInput] = useRecoilState(CONVERT_INPUT);
  const type = useRecoilValue(CONVERT_TYPE);
  const size = useRecoilValue(CONVERT_SIZE);

  const action = async () => {
    setLoading(true);

    /** @type {string[]} */
    const names = input.map((file) => file.name);
    const results = await Promise.all(input.map((file) => compressImage(gg)));

    setInput([]);
    const list = results.map((result, i) => ({ name: names[i], ...result }));
    list.forEach(({ dataUrl, name }) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${name.substring(0, name.lastIndexOf("."))}.${type}`;
      link.click();
    });

    setLoading(false);
  };

  return { action, loading };
}

export default function SplitButton() {
  const type = useRecoilValue(CONVERT_TYPE);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const { action, loading } = useAction();
  const handleClick = () => {
    setOpen(false);
    action();
  };

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (e) => {
    if (!anchorRef.current) {
      return;
    } else if (!e) {
      setOpen(false);
    } else if (!anchorRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        size="small"
        disabled={loading}
        sx={{ position: "relative" }}
      >
        <Button
          onClick={handleClick}
          sx={(theme) => ({ ...theme.typography.caption, flex: 1 })}
        >
          {`To ${type}`}
        </Button>
        <Button onClick={handleToggle} size="small">
          <ArrowDropDownRoundedIcon fontSize="small" />
        </Button>
        {loading && <Progress />}
      </ButtonGroup>
      <Menu open={open} onClose={handleClose} anchorEl={anchorRef.current} />
    </React.Fragment>
  );
}
