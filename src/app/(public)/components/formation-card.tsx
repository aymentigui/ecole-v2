import Image from "next/image"
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
    <Link href={`/collaborations/${formation.id}`}>
      <Card className="h-full overflow-hidden transition-transform duration-300 hover:scale-105">
        {formation.photo && <Image
          src={formation.photo}
          alt={formation.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90"
        />}
        <CardHeader>
          <CardTitle>{formation.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
          {`Du ${format(formation.startDate, 'dd MMMM yyyy', { locale: fr })} au ${format(formation.endDate, 'dd MMMM yyyy', { locale: fr })}`}
          </p>
          <p className="font-bold text-lg mb-2">{formation.price} DA</p>
          <p className="text-sm text-muted-foreground">
            {formation.remarks && formation.remarks.slice(0, 100)}...
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

