import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Formation } from "@/util/types"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface FormationCardProps {
  formation: Formation
}

export function FormationCard({ formation }: FormationCardProps) {
  return (
    <Link href={`/formations/${formation.id}`}>
      <Card className="h-full overflow-hidden transition-transform duration-300 hover:scale-105">
        {formation.photo && <img
          src={formation.photo}
          alt={formation.name}
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90"
        />}
        <CardHeader>
          <CardTitle>{formation.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {formation.startDate && formation.endDate && new Date(formation.startDate) >= new Date() && <p className="text-sm text-muted-foreground mb-2">
          {`Du ${format(formation.startDate, 'dd MMMM yyyy', { locale: fr })} au ${format(formation.endDate, 'dd MMMM yyyy', { locale: fr })}`}
          </p>}
          {(formation.price || formation.price!=0) &&
            <p className="font-bold text-lg mb-2">{formation.price} DA</p>}
          <p className="text-sm text-muted-foreground">
            {formation.remarks && formation.remarks.slice(0, 100)}...
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

