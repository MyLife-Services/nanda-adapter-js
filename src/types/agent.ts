// src/types/agent.ts
interface AgentBase {
    agent_id: string
    agent_url: string
    api_url?: string
    alive?: boolean
    assigned_to?: string | null
    last_update?: string
}
/* exports */
export interface Agent extends AgentBase {
    api_url: string
}
export interface AgentListing extends AgentBase {}