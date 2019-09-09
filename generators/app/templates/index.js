const { ETHExporter } = require('@santiment-network/eth-exporter')

const exporter = new ETHExporter("erc20-transfers")

const transferEventAbi = [{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "from",
      "type": "address"
    },
    {
      "indexed": true,
      "name": "to",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "Transfer",
  "type": "event"
},
]

exporter.extractEventsWithAbi(transferEventAbi)
