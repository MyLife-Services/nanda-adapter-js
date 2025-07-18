// types/nandaIndex.ts
/* imports */
import type { Agent, AgentListing, } from './agent'
import type { User, } from './user'
/* exports */
// passthroughs
export { Agent, AgentListing, User, }
// interfaces
export interface GetAgentsFn {
  (): Promise<AgentListing[]>
}
export interface NandaIndexOptions {
  getAgents: GetAgentsFn
}