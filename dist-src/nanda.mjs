// src/nanda.mjs
/* imports */
/* modular constants */
const NANDA_REGISTRY_URL = 'https://chat.nanda-registry.com:6900'

export class NandaRegistryClient {
    #apiKey
    #registryUrl
    constructor({ registryUrl=NANDA_REGISTRY_URL, apiKey, }){
        this.#registryUrl = registryUrl.replace(/\/$/, '')
        this.#apiKey = apiKey
    }
    /**
     * Assigns a specific agent to a user.
     * @param {string} email
     * @param {string} username
     * @param {string} agent_id - Must be an existing "service" agent, i.e., agents000000
     * @returns {Promise<object>} - Assignment result or error
     */
    async assignAgent(email, username, agent_id) {
        const url = `${ this.#registryUrl }/api/setup`
        const payload = {
            agent_id,
            email,
            username,
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, agent_id })
        })
        const data = await res.json()
        if (!res.ok || data.status === 'error') {
        throw new Error(data.message || data.error || `setupUserWithAgent failed: ${res.status} ${res.statusText}`)
        }
        return data
    }
    /**
     * Get the status of a specific agent. 
     * @todo - **note**: currently seems broken, always returns false.
     * @param {string} agentId - The ID of the agent to check
     * @returns {Promise<boolean>} - The agent status
     */
    async checkAgentStatus(agentId) {
        let res = await fetch(`${ this.#registryUrl }/status/${ encodeURIComponent(agentId) }`)
        if(!res.ok) throw new Error(`Registry error: { status: ${ res.status }, agentId: ${ agentId }, url: ${ url }, message: ${ await res?.text() } }`)
        res = await res.json()
        return res
    }
    /**
     * Check if a user exists in the Nanda registry.
     * @param {string} email - The email address to check
     * @returns {Promise<Object>} - Returns an object with user information { exists, user, }
     */
    async checkUser(email){
        const url = `${ this.#registryUrl }/api/check-user`
        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        if(!res.ok) throw new Error(`Registry error: { status: ${ res.status }, email: ${ email }, url: ${ url }, message: ${ await res?.text() } }`)
        res = await res.json()
        return res
    }
    async editAgent(agentId, patch) {
        const url = `${ this.#registryUrl }/agents/${ encodeURIComponent(agentId) }/edit`
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${ this.#apiKey }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patch)
        })
        if(!res.ok) throw new Error(`Registry error: ${ res.status }`)
        return res.json()
    }
    /**
     * Get information about a specific agent.
     * @param {string} agentId - The ID of the agent to retrieve
     * @returns {Promise<Object>} - The agent information { agent_id, agent_url, api_url }
     */
    async getAgent(agentId){
        const url = `${ this.#registryUrl }/lookup/${ encodeURIComponent(agentId) }`
        let res = await fetch(url)
        if(!res.ok) throw new Error(`Registry error: { status: ${ res.status }, agentId: ${ agentId }, url: ${ url }, message: ${ await res?.text() } }`)
        res = await res.json()
        return res
    }
    /**
     * List all agents registered in the Nanda registry.
     * @param {Object} [options] - Options for listing agents
     * @returns {Promise<Array>} - List of agents
     */
    async listAgents(options={}){
        const url = `${ this.#registryUrl }/list`
        let res = await fetch(url)
        if(!res.ok) throw new Error(`Registry error: { status: ${ res.status }, agentId: ${ agentId }, url: ${ url }, message: ${ await res?.text() } }`)
        res = await res.json()
        if(typeof res === 'object' && !Array.isArray(res))
            res = Object.entries(res)
                .map(([key, value]) => ({ id: key, value, }))
        return res
    }
    async registerAgent(agent_id, agent_url, api_url) {
        const payload = {
            agent_id,
            agent_url,
            api_url,
        }
        let res = await fetch(`${ this.#registryUrl }/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        if(!res.ok) throw new Error(`Registry error: { status: ${ res.status }, agentId: ${ agent_id }, url: ${ url }, message: ${ await res?.text() } }`)
        res = await res.json()
        return res
    }
    /**
     * Registers a new user (client) with the NANDA registry, if they do not already exist.
     * @param {string} email - The user's email address
     * @param {string} username - The username to register
     * @returns {Promise<object>} - The registry response (success or error)
     */
    async registryJoin(email, username){
        const { exists, user, } = await this.checkUser(email)
        if(exists)
            return user
        username = username ?? email.split('@')[0]
        const url = `${ this.#registryUrl }/api/signup`
        const payload = {
            email,
            username, // use email prefix as username if not provided
        }
        console.log('registryJoin payload:', payload)
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        if(!res.ok) throw new Error(`Registry error: { status: ${ res.status }, url: ${ url }, message: ${ await res?.text() } }`)
        const data = await res.json()
        return data
    }
    /**
     * Assigns a specific agent to a user via /api/setup
     * @param {string} email - The user's email address
     * @param {string} username - The user's username
     * @param {string} agent_id - The agent ID to assign
     * @returns {Promise<object>} Registry response { status, message, user, }
     */
    async setupUserWithAgent(email, username, agent_id){
        const url = `${ this.#registryUrl }/api/setup`
        const payload = {
            email,
            username,
            agent_id,
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        if(!res.ok) throw new Error(`Registry error: { status: ${ res.status }, url: ${ url }, message: ${ await res?.text() } }`)
        const data = await res.json()
        return data
    }
}