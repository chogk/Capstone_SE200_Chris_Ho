'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Post } from './post';

export function PostsTable({
  posts,
}: {
  posts: any[];
}) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts</CardTitle>
        <CardDescription>
          View all your posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Body</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
