import { NextResponse } from 'next/server'
import { auth } from '../../../auth'
import { getQuota, incrementQuota, LIMITS } from '../../../lib/quotaStore'

export async function POST(request) {
  try {
    const session = await auth()
    const email = session?.user?.email
    if (!email) {
      return NextResponse.json({ error: 'Sign in with Google to use this tool', requiresAuth: true }, { status: 401 })
    }

    let body
    try { body = await request.json() }
    catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }) }

    const tool = body?.tool
    if (!tool || !LIMITS[tool]) {
      return NextResponse.json({ error: 'Unknown tool' }, { status: 400 })
    }

    const quota = getQuota(email, tool)
    if (quota.remaining <= 0) {
      return NextResponse.json({ error: 'Daily limit reached' }, { status: 429 })
    }

    return NextResponse.json({ success: true, quota: incrementQuota(email, tool) })
  } catch {
    return NextResponse.json({ error: 'Could not update quota' }, { status: 500 })
  }
}
