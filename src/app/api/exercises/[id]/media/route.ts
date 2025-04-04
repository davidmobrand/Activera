import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { MediaType } from '@/lib/types'
import type { CreateMedia } from '@/lib/validation'

interface Props {
  params: {
    id: string
  }
}

export async function POST(
  request: NextRequest,
  { params }: Props
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Determine media type based on file type
    const type = file.type.startsWith('image/')
      ? MediaType.IMAGE
      : file.type.startsWith('audio/')
      ? MediaType.AUDIO
      : null

    if (!type) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Create a URL that matches our mock data pattern
    const urlPath = type === MediaType.IMAGE ? 'images' : 'audio';
    const fileName = file.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const url = `https://storage.activera.com/exercises/${params.id}/${urlPath}/${fileName}`;

    const createMediaData: CreateMedia = {
      exerciseId: params.id,
      type,
      url,
      name: file.name
    }

    const media = mockDb.createMedia(createMediaData)

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

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get('mediaId')

    if (!mediaId) {
      return NextResponse.json(
        { error: 'Media ID is required' },
        { status: 400 }
      )
    }

    mockDb.deleteMedia(mediaId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    )
  }
} 