"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableRowComponent from "./table-row-component";

interface EventsTableProps {
  events: any[];
  onDlt:any
}

export default function EventsTable({ events,onDlt }: EventsTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Société</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Détails</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRowComponent key={event.id} event={event} onDlt={onDlt}  />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
