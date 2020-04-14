#!/usr/bin/env bash

## sudo npm install -g truffle

cd node_modules/pointxio-contracts/
## npm i
truffle compile
truffle migrate
## truffle test
