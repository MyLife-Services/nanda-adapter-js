// types/datamanager.ts
/* imports */
import type { Agent, AgentListing, } from './agent'
import type { User } from './user'
/* exports */
// interfaces
export interface NandaDatamanager {
    getAgent(agent_id: string): Promise<Agent | null>
    listAgents(): Promise<AgentListing[]>
    registerAgent(agent: Agent): Promise<Agent>
    assignAgentToUser(agent_id: string, user_id: string): Promise<boolean>
    getUser(email: string): Promise<User | null>
    createUser(user: User): Promise<User>
}
