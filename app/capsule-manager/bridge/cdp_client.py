import asyncio
import json
import websockets
import urllib.request
import urllib.error

CDP_URL = 'http://localhost:9222'

class CDPClient:
    def __init__(self):
        self.ws  = None
        self.msg_id = 0

    async def connect(self):
        try:
            with urllib.request.urlopen(f'{CDP_URL}/json', timeout=2) as r:
                tabs = json.loads(r.read())
        except urllib.error.URLError as e:
            raise Exception('Browser debug port is not available. Click Open Browser in Capsule Manager first, wait for it to open, then try saving again.') from e

        page = next((t for t in tabs if t.get('type') == 'page'), None)
        if not page:
            raise Exception('No open tab found. Open browser first via Capsule Manager.')
        self.ws = await websockets.connect(page['webSocketDebuggerUrl'])

    async def send(self, method, params={}):
        self.msg_id += 1
        await self.ws.send(json.dumps({ 'id': self.msg_id, 'method': method, 'params': params }))
        while True:
            data = json.loads(await self.ws.recv())
            if data.get('id') == self.msg_id:
                return data.get('result', {})

    async def get_active_tab(self):
        result = await self.send('Runtime.evaluate', { 'expression': 'window.location.href' })
        return { 'url': result.get('result', {}).get('value', '') }

    async def evaluate(self, expression):
        result = await self.send('Runtime.evaluate', { 'expression': expression })
        return result.get('result', {}).get('value', '')

    async def disconnect(self):
        if self.ws:
            await self.ws.close()
