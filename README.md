## Steps to run this project:


1. Create a `.env` file on root directory
2. Add  `REACT_APP_PLAYER_SERVER_ORIGIN` key with the player service addredd to it 

> ```REACT_APP_PLAYER_SERVER_ORIGIN=http://192.168.25.3:3333```

3. Run `yarn install`

4. Run `yarn typeorm migration:run`
5. Run `yarn dev`