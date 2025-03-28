#!/bin/bash

dfx identity new dev

dfx identity use dev

dfx deploy --playground

npm run build
