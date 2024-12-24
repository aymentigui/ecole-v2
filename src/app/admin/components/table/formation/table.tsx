"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableRowComponent from "./table-row-component";

interface FormationsTableProps {
  formations: any[];
  onDlt:any;
}

export default function FormationTable({ formations,onDlt }: FormationsTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Détails</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formations.map((formation) => (
            <TableRowComponent key={formation.id} formation={formation} onDlt={onDlt} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
