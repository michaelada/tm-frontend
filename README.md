# Intro

# Build

Need to set URL

```shell
# On Mac
cd /Users/michaeladams/Work/Esker/Development/TomMartinPhase2/tm-frontend ; npm run buildtest ; tar -cvf tmweb.tar dist ;gzip -f tmweb.tar ; scp  tmweb.tar.gz tmtest:~
```


```shell
# on server
ssh tmtest
tar -xvf tmweb.tar.gz ; pm2 delete 29 ; mv tmweb archive/tmweb.18 ; mv dist tmweb ; pm2 serve tmweb 4445 --spa ; pm2 save
```


