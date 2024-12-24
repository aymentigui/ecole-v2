"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableRowComponent from "./table-row-component";

interface InscriptionsTableProps {
  inscriptions: any[];
}

export default function InscriptionsTable({ inscriptions }: InscriptionsTableProps) {
  
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date d'inscription</TableHead>
            <TableHead>Formation/Collaboration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inscriptions.map((inscription) => (
            <TableRowComponent key={inscription.id} inscription={inscription} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
