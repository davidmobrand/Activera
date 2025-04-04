import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'

interface Props {
  params: {
    id: string
  }
}

export async function POST(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as 'IMAGE' | 'AUDIO'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Mock file upload - in a real app, we would upload to a storage service
    const mockUrl = type === 'IMAGE' 
      ? `https://placekitten.com/800/400?${Date.now()}`
      : `https://example.com/audio-${Date.now()}.mp3`

    const media = mockDb.createMedia(params.id, {
      type,
      url: mockUrl,
      name: file.name
    })

    return NextResponse.json(media)
  } catch (error) {
    console.error('Error uploading media:', error)
    return NextResponse.json(
      { error: 'Failed to upload media' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const media = mockDb.findMediaByExerciseId(params.id)
    return NextResponse.json(media)
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get('mediaId')

    if (!mediaId) {
      return NextResponse.json(
        { error: 'No media ID provided' },
        { status: 400 }
      )
    }

    const success = mockDb.deleteMedia(params.id, mediaId)
    if (!success) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      )
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    )
  }
} 