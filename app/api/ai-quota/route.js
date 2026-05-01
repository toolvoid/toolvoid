import { NextResponse } from 'next/server'
import { auth } from '../../../auth'
import { getQuota, LIMITS } from '../../../lib/quotaStore'

export async function GET(request) {
  try {
    const session = await auth()
    const email = session?.user?.email
    const { searchParams } = new URL(request.url)
    const tool = searchParams.get('tool')

    if (!tool || !LIMITS[tool]) {
      return NextResponse.json({ error: 'Unknown tool' }, { status: 400 })
    }
    if (!email) {
      return NextResponse.json({ error: 'Sign in with Google to use this tool', requiresAuth: true }, { status: 401 })
    }

    const quota = await getQuota(email, tool)
    return NextResponse.json({ quota })

  } catch {
    return NextResponse.json({ error: 'Could not load quota' }, { status: 500 })
  }
}