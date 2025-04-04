import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Media, MediaType } from '@/lib/types'
import { mockDb } from '@/lib/mockData'

// Default to localhost in development
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:3000'

interface Props {
  params: {
    id: string
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as MediaType

    if (!file || !type) {
      return new Response('Missing required fields', { status: 400 })
    }

    // Determine media type based on file type
    const typeDetermined = file.type.startsWith('image/')
      ? MediaType.IMAGE
      : file.type.startsWith('audio/')
      ? MediaType.AUDIO
      : null

    if (!typeDetermined) {
      return new Response('Invalid file type', { status: 400 })
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

    return Response.json(media)
  } catch (error) {
    console.error('Error uploading media:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const media = await mockDb.media.findByExerciseId(params.id)
    return Response.json(media)
  } catch (error) {
    console.error('Error fetching media:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get('mediaId')

    if (!mediaId) {
      return new Response(
        'Media ID is required',
        { status: 400 }
      )
    }

    await mockDb.media.delete(mediaId)
    return new Response('Success', { status: 200 })
  } catch (error) {
    console.error('Error deleting media:', error)
    return new Response(
      'Failed to delete media',
      { status: 500 }
    )
  }
} 