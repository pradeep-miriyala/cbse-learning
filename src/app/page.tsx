// The lab is the front door.
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/learning/cbse')
}
