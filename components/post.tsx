import { TableCell, TableRow } from '@/components/ui/table';

export function Post({ post }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{post.userId}</TableCell>
      <TableCell>{post.id}</TableCell>
      <TableCell>{post.title}</TableCell>
      <TableCell>{post.body}</TableCell>
    </TableRow>
  );
}