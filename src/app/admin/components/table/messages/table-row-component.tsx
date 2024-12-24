"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface TableRowComponentProps {
  message: {
    id: number;
    name: string;
    email: string;
    content: string;
    createdAt: Date;
    openedAt: Date | undefined;
  };
}

export default function TableRowComponent({ message }: TableRowComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = async () => {
    try {
      const data={id:message.id}
      const jsonData=JSON.stringify(data)
      const response = await fetch('/api/message', {
        method: 'PATCH',
        body: jsonData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur inconnue');
      }
  
      await response.json();
      message.openedAt=new Date()
      setIsDialogOpen(true);
    } catch (error:any) {
      console.error('Erreur lors de la modification de la formation:', error);
      alert(error.message || 'Une erreur est survenue lors de la modification de la formation.');
    } 
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <TableRow
        className={
          !message.openedAt
            ? "bg-red-100 hover:bg-red-50"
            : "hover:bg-slate-50"
        }
      >
        <TableCell className="font-medium">{message.name}</TableCell>
        <TableCell>{message.email}</TableCell>
        <TableCell>{format(message.createdAt, "dd/MM/yyyy")}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={handleOpenDialog}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <DialogHeader>
            <h2 className="text-lg font-medium">{message.name}</h2>
          </DialogHeader>
          <p>{message.content}</p>
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
