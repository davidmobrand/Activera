import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Media, MediaType } from '@/lib/types'
import { mockDb } from '@/lib/mockData'
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Default to localhost in development
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:3000'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as MediaType

    if (!file || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Determine media type based on file type
    const typeDetermined = file.type.startsWith('image/')
      ? MediaType.IMAGE
      : file.type.startsWith('audio/')
      ? MediaType.AUDIO
      : null

    if (!typeDetermined) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const urlPath = typeDetermined === MediaType.IMAGE ? 'images' : 'audio';
    const fileName = file.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const url = `${STORAGE_URL}/exercises/${params.id}/${urlPath}/${fileName}`;

    const mediaInput = {
      exerciseId: params.id,
      type: typeDetermined,
      name: file.name,
      url,
      updatedAt: new Date().toISOString()
    }

    const media = await mockDb.media.create(mediaInput)

    return NextResponse.json(media)
  } catch (error) {
    console.error('Error uploading media:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const media = await mockDb.media.findByExerciseId(params.id)
    return NextResponse.json(media)
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const mediaId = searchParams.get('mediaId')

    if (!mediaId) {
      return NextResponse.json(
        { error: 'Media ID is required' },
        { status: 400 }
      )
    }

    await mockDb.media.delete(mediaId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    )
  }
} 