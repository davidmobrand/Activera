'use client'

import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

export default function ApiDocs() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ACTivera API Documentation</h1>
      <div className="bg-white rounded-lg shadow">
        <SwaggerUI url="/api/docs/swagger" />
      </div>
    </div>
  )
} 