const { ETHExporter } = require('@santiment-network/eth-exporter')

const exporter = new ETHExporter("compound-events")

const compoundAbi = require("./compound_abi.json")

exporter.extractEventsWithAbi(
  compoundAbi,
  null,
  [
    "0xf5dce57282a584d2746faf1593d3121fcac444dc",
    "0x39aa39c021dfbae8fac545936693ac917d5e7563",
    "0xc11b1268c1a384e55c48c2391d8d480264a3a7f4"
  ]
)
