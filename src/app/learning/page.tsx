// The lab has one front door.
import { redirect } from 'next/navigation'

export default function LearningIndex() {
  redirect('/learning/cbse')
}
