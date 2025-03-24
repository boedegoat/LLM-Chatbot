#!/bin/bash

dfx stop

dfx start --clean --background

dfx identity new dev

dfx identity use dev

dfx deploy

npm run build
