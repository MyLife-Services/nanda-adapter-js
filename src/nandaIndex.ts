import type { AgentListing } from './types/agent'
import type { GetAgentsFn, NandaIndexOptions } from './types/nandaIndex'

const DEFAULT_REGISTRY_URL = 'https://chat.nanda-registry.com:6900'

export class NandaIndex {
  private getAgentsFn: GetAgentsFn
  constructor(options?: Partial<NandaIndexOptions>) {
    this.getAgentsFn = options?.getAgents
      ?? (async () => {
        const res = await fetch(`${ DEFAULT_REGISTRY_URL }/list`)
        if(!res.ok) throw new Error(`Failed to fetch agents: ${ res.status }`)
        const data = await res.json()
        const response = Object.entries(data)
          .map(([id, value]) => {
            const agent_url = typeof value === 'string'
              ? value
              : (value as any)?.agent_url ?? null
            return { agent_id: id, agent_url }
          })
          .filter(agent => agent.agent_url)
        return response as AgentListing[]
      })
  }
  /* public functions */
  async listAgents(): Promise<AgentListing[]> {
    return this.getAgentsFn()
  }
}
