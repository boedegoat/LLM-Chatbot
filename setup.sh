#!/bin/bash

dfx stop

dfx start --clean --background

dfx identity new dev

dfx identity use dev

dfx deploy --playground

npm run build

# Check if VITE_CANISTER_ID_BACKEND already exists in .env
if ! grep -q "VITE_CANISTER_ID_BACKEND" .env; then
    CANISTER_ID_BACKEND=$(dfx canister --playground id backend)
    echo "" >> .env
    echo "VITE_CANISTER_ID_BACKEND='$CANISTER_ID_BACKEND'" >> .env
fi
