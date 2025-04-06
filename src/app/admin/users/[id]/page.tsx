import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { UserForm } from '@/components/admin/UserForm'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditUserPage({ params }: Props) {
  const [resolvedParams, session] = await Promise.all([
    params,
    getServerSession(authOptions)
  ])

  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const user = await mockDb.users.findById(resolvedParams.id)
  if (!user) {
    return notFound()
  }

  return (
    <div className="p-6 bg-gradient-to-b from-act-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-act-100 p-8">
          <UserForm user={user} />
        </div>
      </div>
    </div>
  )
} 