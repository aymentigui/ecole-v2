import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collaboration } from "@/util/types"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface CollaborationCardProps {
  collaboration: Collaboration
}

export function CollaborationCard({ collaboration }: CollaborationCardProps) {
  return (
    <Link href={`/collaborations/${collaboration.id}`}>
      <Card className="h-full overflow-hidden transition-transform duration-300 hover:scale-105">
        {collaboration.photo && <Image
          src={collaboration.photo}
          alt={collaboration.company}
          width={400}
          height={200}
          className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90"
        />}
        <CardHeader>
          <CardTitle>{collaboration.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            Compagne : {collaboration.company}
          </p>
          <p className="text-sm text-muted-foreground mb-2">
          {`Du ${format(collaboration.startDate, 'dd MMMM yyyy', { locale: fr })} au ${format(collaboration.endDate, 'dd MMMM yyyy', { locale: fr })}`}
          </p>
          <p className="font-bold text-lg mb-2">{collaboration.price} DA</p>
          <p className="text-sm text-muted-foreground">
            {collaboration.remarks && collaboration.remarks.slice(0, 100)}...
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

