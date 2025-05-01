import { Typography, Link as MuiLink, List, ListItem, Box, Paper, Divider } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const components: Record<string, React.ComponentType<any>> = {
  p: ({ node, ...props }) => <Typography variant="body1" sx={{ my: 1 }} {...props} />,
  h1: ({ node, ...props }) => <Typography variant="h3" sx={{ my: 1, mt: 3 }} {...props} />,
  h2: ({ node, ...props }) => <Typography variant="h4" sx={{ my: 1, mt: 3 }} {...props} />,
  h3: ({ node, ...props }) => <Typography variant="h5" sx={{ my: 1, mt: 3 }} {...props} />,
  h4: ({ node, ...props }) => <Typography variant="h6" sx={{ my: 1, mt: 3 }} {...props} />,
  h5: ({ node, ...props }) => <Typography variant="subtitle1" sx={{ my: 1, mt: 3 }} {...props} />,
  h6: ({ node, ...props }) => <Typography variant="subtitle2" sx={{ my: 1, mt: 3 }} {...props} />,
  hr: ({ node, ...props }) => <Divider sx={{ my: 3 }} {...props} />,
  a: ({ node, href, ...props }) => <MuiLink href={href} target="_blank" rel="noopener noreferrer" {...props} />,
  strong: ({ node, ...props }) => <Typography component="strong" fontWeight="bold" display="inline" {...props} />,
  em: ({ node, ...props }) => <Typography component="em" fontStyle="italic" display="inline" {...props} />,
  del: ({ node, ...props }) => (
    <Typography component="del" sx={{ textDecoration: "line-through" }} display="inline" {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <Box
      component="blockquote"
      sx={{
        pl: 2,
        py: 2,
        borderLeft: 4,
        borderColor: "divider",
        bgcolor: "action.hover",
        color: "text.secondary",
        borderRadius: 1,
        m: 0,
      }}
      {...props}
    />
  ),
  ul: ({ node, ordered, ...props }) => <List sx={{ listStyleType: "disc", pl: 4 }} {...props} />,
  ol: ({ node, ordered, ...props }) => <List sx={{ listStyleType: "decimal", pl: 4 }} {...props} />,
  li: ({ node, ...props }) => <ListItem sx={{ display: "list-item", pl: 0 }} {...props} />,
  code: ({ node, inline, className, children, ...props }) => (
    <Box
      component="code"
      sx={{
        fontFamily: "CascadiaCode",
        p: 1,
        bgcolor: "action.hover",
        borderRadius: 1,
        "pre &": { bgcolor: "transparent" },
        fontSize: "0.875rem",
      }}
      {...props}
    >
      {children}
    </Box>
  ),
  pre: ({ node, ...props }) => (
    <Box component="pre" sx={{ bgcolor: "action.hover", p: 2, borderRadius: 2, overflowX: "auto", my: 2 }} {...props} />
  ),
  table: ({ node, ...props }) => (
    <TableContainer component={Paper} variant="outlined" sx={{ my: 2 }}>
      <Table {...props} />
    </TableContainer>
  ),
  thead: ({ node, ...props }) => <TableHead {...props} />,
  tbody: ({ node, ...props }) => <TableBody {...props} />,
  tr: ({ node, ...props }) => <TableRow {...props} />,
  th: ({ node, ...props }) => <TableCell component="th" scope="col" {...props} />,
  td: ({ node, ...props }) => <TableCell {...props} />,
};
