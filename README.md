# NANDA Universal Agent Adaptor

This repo is intended to be the root repo for all npm implementation of the NANDA Adaptor technology, which compels incorporation of numerous adaptor technologies.

**NOTE**: it should, as best possible, be built with the idea that new "adaptors" would be accessible dynamically, until none but NANDA-specific should be hardcoded here

## javascript npm Project

Taken from original repository written to act as a stand-alone python server

* [Universal Agent Adaptor](https://github.com/projnanda/nanda-sdk), see [@mariagorskikh](https://github.com/mariagorskikh)
* [Universal Adaptor with Agent](https://github.com/aidecentralized/adapter-agent-sdk)

## requirements.txt

In the original python, the following npm packages are utilized. We are handling `mcp` and `A2A` with custom code, so I may need to build javascript packages to accommodate.

```
flask → Express
flask-cors → cors
requests → fetch
anthropic → @anthropic-ai/sdk
python-dotenv → dotenv
pymongo → mongodb
mcp → ??
python-a2a==0.5.6 → ??
```
