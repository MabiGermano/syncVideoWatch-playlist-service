## Steps to run this project:


1. Create a `.env` file on root directory
2. Add  `PLAYER_SERVER_ORIGIN` key with the player service addredd to it 

> ```PLAYER_SERVER_ORIGIN=http://192.168.25.3:3333```

1. Run `yarn install`

2. Run `yarn typeorm migration:run`
3. Run `yarn dev`