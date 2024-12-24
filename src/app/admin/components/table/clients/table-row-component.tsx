"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Inscription } from "@/util/types";
import { updateStatusInscription } from "@/actions/requetes";

interface TableRowComponentProps {
  inscription: Inscription
}

export default function TableRowComponent({ inscription }: TableRowComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState(inscription.status);
  

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  // Récupérer le nom de la formation ou collaboration
  const entityName = inscription.Formation.name 

  const companyName = inscription.Formation.company || "Non spécifié"

  const handlerChange= async (e:any)=>{
    inscription.status=e.target.value;
    setStatus(e.target.value)
    const respone=await updateStatusInscription(inscription.id,e.target.value)
    if(!respone.success)
      alert(respone.error )
  }

  return (
    <>
      <TableRow
      className={
        inscription.status === "annule"
          ? "bg-red-50 hover:bg-red-100"
          : inscription.status === "confirme"
          ? "bg-green-50 hover:bg-green-100"
          : "hover:bg-slate-50"
      }>
        <TableCell className="font-medium">{inscription.nom}</TableCell>
        <TableCell>{inscription.prenom}</TableCell>
        <TableCell>{inscription.email}</TableCell>
        <TableCell>{format(inscription.createdAt, "dd/MM/yyyy")}</TableCell>
        <TableCell>{entityName}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
            {/* Select pour modifier le statut */}
            <select
              value={status}
              /* @ts-ignore*/
              onChange={(e) => {  handlerChange(e)}}
              className="border p-1 rounded"
            >
              <option value="en attente">En attente</option>
              <option value="confirme">Confirmé</option>
              <option value="annule">Annulé</option>
            </select>

            {/* Bouton Voir */}
            <Button variant="ghost" size="icon" onClick={handleOpenDialog}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Dialog avec toutes les informations */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Informations de l'inscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              <strong>Nom : </strong>
              {inscription.nom}
            </p>
            <p>
              <strong>Prénom : </strong>
              {inscription.prenom}
            </p>
            <p>
              <strong>Email : </strong>
              {inscription.email}
            </p>
            <p>
              <strong>Date d'inscription : </strong>
              {format(inscription.createdAt, "dd/MM/yyyy")}
            </p>
            {inscription.adresse && (
              <p>
                <strong>Adresse client : </strong>
                {inscription.adresse }
              </p>
            )}
            <p>
              <strong>Type : </strong>
              {(inscription.Formation.company === "" || inscription.Formation.company === null) ? "Formation" : "Collaboration"}
            </p>
            <p>
              <strong>Nom : </strong>
              {entityName}
            </p>
            {companyName && (
              <p>
                <strong>Entreprise : </strong>
                {companyName}
              </p>
            )}
            <p>
              <strong>Statut : </strong>
              {status}
            </p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={handleCloseDialog}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
