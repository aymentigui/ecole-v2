"use client";

import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, User, Phone } from "lucide-react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableRowComponentProps {
  formation: any;
  onDlt:any;
}
const FetchDelete= async (id:any,onDlt:any)=>{
  const data={id:id}
  const jsonData=await JSON.stringify(data)
  const response = await fetch('/api/collaboration', {
    method: 'DELETE',
    body: jsonData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur inconnue');
  }

  await response.json();
  alert('Événement supprimé avec succès !');
  onDlt()
}

export default function TableRowComponent({ formation,onDlt }: TableRowComponentProps) {
  return (
    <TableRow
      className={
        (formation.endDate < new Date()
          ? "bg-red-50 hover:bg-red-100"
          : formation.startDate > new Date()
          ? "bg-green-50 hover:bg-green-100"
          : "hover:bg-slate-50")
      }
    >
      <TableCell className="font-medium">{formation.name}</TableCell>
      <TableCell>{format(formation.startDate, "dd/MM/yyyy")}</TableCell>
      <TableCell>{format(formation.endDate, "dd/MM/yyyy")}</TableCell>
      <TableCell>{formation.price.toLocaleString("fr-FR")} DA</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div>
                  <Phone className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formation.phone1}</p>
                {formation.phone2 && <p>{formation.phone2}</p>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Autres Tooltips */}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Link href={`/admin/formations/${formation.id}`}>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/admin/formations/${formation.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
                FetchDelete(formation.id,onDlt)
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          {formation.isRegistrationAllowed && (
            <Link href={`/admin/clients/?id=${formation.id}`}>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
