export class NandaUniversalAdapter {
    constructor({ registryClient, agentId }){
        this.registryClient = registryClient
        this.agentId = agentId
    }

    async editAgent(patch){
        return this.registryClient.editAgent(this.agentId, patch)
    }

    async getAgent(){
        return this.registryClient.getAgent(this.agentId)
    }

    async listAgents() {
        return this.registryClient.listAgents()
    }

    async register(agentData) {
        return this.registryClient.register(agentData)
    }
}