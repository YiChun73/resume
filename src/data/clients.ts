import client1 from '@/assets/images/client-1.svg'
import client2 from '@/assets/images/client-2.svg'
import client3 from '@/assets/images/client-3.svg'
import client4 from '@/assets/images/client-4.svg'
import client5 from '@/assets/images/client-5.svg'
import client6 from '@/assets/images/client-6.svg'
import client7 from '@/assets/images/client-7.svg'
import client8 from '@/assets/images/client-8.svg'

export interface Client {
  name: string
  logo: string
}

export const clients: Client[] = [
  { name: 'Orbit', logo: client1 },
  { name: 'Vertex', logo: client2 },
  { name: 'Quadra', logo: client3 },
  { name: 'Rhombus', logo: client4 },
  { name: 'Metric', logo: client5 },
  { name: 'Arch', logo: client6 },
  { name: 'Duo Rings', logo: client7 },
  { name: 'Em Studio', logo: client8 },
]
