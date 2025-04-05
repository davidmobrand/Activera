import { readFileSync } from 'fs'
import { NextResponse } from 'next/server'
import { join } from 'path'

export async function GET() {
  try {
    const swaggerPath = join(process.cwd(), 'src', 'lib', 'api', 'swagger.yaml')
    const swaggerContent = readFileSync(swaggerPath, 'utf8')
    
    return new NextResponse(swaggerContent, {
      headers: {
        'Content-Type': 'application/yaml',
      },
    })
  } catch (error) {
    console.error('Error reading swagger file:', error)
    return new NextResponse('Error loading API documentation', { status: 500 })
  }
} 