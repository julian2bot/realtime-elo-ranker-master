# TP Note JS
Julian Marques  

## Installation du projet   
```bash
git clone https://github.com/julian2bot/realtime-elo-ranker-master.git

pnpm install

pnpm run build

# migration joueur / match si rien dans migrations
pnpm run apps:server:db:generate -- src/migrations/InitialSchema
pnpm run apps:server:db:migrate

# sinon utilisé la migration joueur / match deja realiser (option plus sur)
pnpm run apps:server:db:migrate
```  


## Lancer le serveur
```bash
# lancer le client
pnpm run apps:client:dev  # lance en localhost:3001

# Puis sur un second terminal 

# lancer le serveur
pnpm run apps:server:dev 

# Puis sur un troisieme terminal

# lancer le simulator
pnpm run apps:simulator:dev
```



## Fonctionnalités

- [X] Un joueur peut etre créer avec un elo initial de qui est la moyen de tous les elos des joueurs existants.
- [X] Un match peut etre créer entre deux joueurs.
- [X] Visualisé les joueurs et leurs elos.
- [X] Un historique des matchs est stocké.
- [X] Les elos des joueurs sont mis à jour en temps réel.
- [X] Les joueurs sont stocké en mémoire cache et en base de données.
- [X] match aleatoire entre deux joueurs toutes les XX secondes.
- [ ] interface belle et moderne.
- [ ] 



## Tests
ouaiiissssssss c'est fait (on y croit)




