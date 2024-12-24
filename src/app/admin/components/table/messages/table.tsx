"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableRowComponent from "./table-row-component";

interface MessagesTableProps {
  messages: any[];
}

export default function MessagesTable({ messages }: MessagesTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message,index) => (
            <TableRowComponent key={index} message={message} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
