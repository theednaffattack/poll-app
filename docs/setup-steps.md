Setup

1. npm init -y

2. npm i -D tslint-config-prettier typescript tslint

3. npx tslint --init

4.  npm i graphql-yoga

5. mkdir tsconfig.json

6. paste:

7. ```javascript
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "moduleResolution": "node",
       "lib": ["dom", "es2017", "esnext.asynciterable"],
       "sourceMap": true,
       "outDir": "./dist",
       "removeComments": true,
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true,
       "strictFunctionTypes": true,
       "strictPropertyInitialization": true,
       "noImplicitThis": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noImplicitReturns": true,
       "noFallthroughCasesInSwitch": true,
       "esModuleInterop": true,
       "allowSyntheticDefaultImports": false
     },
     "exclude": ["node_modules"],
     "include": ["./src/**/*.tsx", "./src/**/*.ts"]
   }
   ```

8. npm -D ts-node

9. Add:

10. ```json
    "scripts": {
        "start": "nodemon --exec ts-node src/index.ts"
      }
    ```

11. npm i -D typeorm

12. npm install typeorm --save reflect-metadata pg

13. npm i -D @types/node

14. Adjust ormconfig to be;

    1. ``` javascript
       {
         "type": "postgres",
         "host": "localhost",
         "port": 5432,
         "username": "postgres",
         "password": "postgres",
         "database": "tester2",
         "synchronize": true,
         "logging": false,
         "entities": ["src/entity/**/*.ts"],
         "migrations": ["src/migration/**/*.ts"],
         "subscribers": ["src/subscriber/**/*.ts"],
         "cli": {
           "entitiesDir": "src/entity",
           "migrationsDir": "src/migration",
           "subscribersDir": "src/subscriber"
         }
       }
       ```

15. `brew install postgresql` you can initialize or stop the daemon with these commands: `brew services start postgresql` or `brew services stop postgresql`

16. createdb tester2

17. psql tester2

18. \d

19. ​